import { heroes } from './heroesData.js';
import { Player } from './Entities/player.js';
import { updateAmountOfCoins } from './HUDController.js';
import { isSoundEffectOn } from './soundEffectsButtonController.js';
import { UpdateHitDamage } from './infoBoxController.js';
import { CancelSound, PlayBuySound, PlayClickSound } from './SoundController.js';
let buyAmount = 1;

function saveHeroLevels(heroContainer) {
    const levels = {};
    heroContainer.querySelectorAll('.heroCard').forEach(card => {
        levels[card.dataset.basePrice] = Number(card.dataset.level);
    });
    localStorage.setItem('heroLevels', JSON.stringify(levels));
}

function loadHeroLevel(basePrice, defaultLevel) {
    try {
        const saved = JSON.parse(localStorage.getItem('heroLevels') || '{}');
        return saved[basePrice] ?? defaultLevel;
    } catch {
        return defaultLevel;
    }
}

export function initHeroShop() {
    const heroContainer = document.getElementById('inner-Container');
    const levelButtons = document.querySelectorAll('.levelBtn');

    renderHeroes(heroContainer);
    setupLevelButtons(levelButtons, heroContainer);
    recalcPassiveDpsFromSave(heroContainer);
}

function recalcPassiveDpsFromSave(heroContainer) {
    heroContainer.querySelectorAll('.heroCard').forEach(card => {
        const passive = card.dataset.passive === 'true';
        if (!passive) return;

        const level = Number(card.dataset.level);
        const damageBonus = Number(card.dataset.damageBonus);
        const levelsAboveBase = level - 1;

        if (levelsAboveBase > 0) {
            Player.passiveDps += damageBonus * levelsAboveBase;
        }
    });
}

function renderHeroes(heroContainer) {
    heroContainer.innerHTML = '';

    heroes.forEach(hero => {
        const savedLevel = loadHeroLevel(hero.basePrice, hero.level);

        const card = document.createElement('div');
        card.className = 'heroCard';
        card.dataset.level = savedLevel;
        card.dataset.basePrice = hero.basePrice;
        card.dataset.damageBonus = hero.damageBonus;
        card.dataset.passive = hero.passive;

        card.innerHTML = `
            <button class="buyBtn">
                <span class="buyCount">x1</span>
                <span class="coin"></span>
                <span class="price">${formatNumber(hero.basePrice)}</span>
            </button>

            <div class="heroInfo">
                <div class="heroName">${hero.name}</div>
                ${hero.passive ? '<div class="heroBadge">AUTO</div>' : ''}
            </div>

            <div class="heroRight">
                <div class="heroLevel">Lvl.${savedLevel}</div>
                <div class="heroImg"></div>
            </div>
        `;

        card.querySelector('.buyBtn').addEventListener('click', () => {
            buyHero(card, heroContainer);
        });

        heroContainer.appendChild(card);
    });

    updateBuyButtons(heroContainer);
}

function setupLevelButtons(levelButtons, heroContainer) {
    levelButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            if (isSoundEffectOn())
                PlayClickSound();

            const value = btn.textContent.toLowerCase();

            buyAmount = value === 'max'
                ? 'max'
                : Number(value.replace('x', ''));

            updateBuyButtons(heroContainer);
        });
    });
}

function buyHero(card, heroContainer) {
    const level = Number(card.dataset.level);
    const basePrice = Number(card.dataset.basePrice);
    const damageBonus = Number(card.dataset.damageBonus);
    const passive = card.dataset.passive === 'true';
    const amount = resolveAmount(level, basePrice);
    const totalCost = calcTotalPrice(level, basePrice, amount);

    if (Player.balanceCoins < totalCost) {
        showNotEnoughCoins(card);
        if (isSoundEffectOn()) {
            CancelSound();
        }

        return;
    }

    Player.balanceCoins -= totalCost;

    if (passive) {
        Player.passiveDps = (Player.passiveDps) + damageBonus * amount;
    }

    const newLevel = level + amount;
    card.dataset.level = newLevel;
    card.querySelector('.heroLevel').textContent = `Lvl.${newLevel}`;

    if (isSoundEffectOn()) {
        PlayBuySound();
    }

    updateAmountOfCoins(Player.balanceCoins);
    updateCardPrice(card);
    updateAllAffordability();
    UpdateHitDamage();
    saveHeroLevels(heroContainer ?? document.getElementById('inner-Container'));
}

function calcTotalPrice(level, basePrice, amount) {
    let total = 0;
    for (let i = 1; i <= amount; i++) {
        total += basePrice + (level + i) * basePrice * 0.15;
    }
    return Math.floor(total);
}

function calcMaxAffordable(level, basePrice) {
    let total = 0;
    let count = 0;

    while (true) {
        const nextCost = basePrice + (level + count + 1) * basePrice * 0.15;
        if (total + nextCost > Player.balanceCoins) break;
        total += nextCost;
        count++;
        if (count >= 10000) break;
    }

    return count;
}

function resolveAmount(level, basePrice) {
    if (buyAmount !== 'max') return buyAmount;
    return calcMaxAffordable(level, basePrice);
}

function updateBuyButtons(heroContainer = document.getElementById('inner-Container')) {
    heroContainer.querySelectorAll('.heroCard').forEach(card => {
        card.querySelector('.buyCount').textContent =
            buyAmount === 'max' ? 'MAX' : `x${buyAmount}`;

        updateCardPrice(card);
    });

    updateAllAffordability();
}

function updateCardPrice(card) {
    const level = Number(card.dataset.level);
    const basePrice = Number(card.dataset.basePrice);
    const amount = resolveAmount(level, basePrice);

    const price = calcTotalPrice(level, basePrice, amount || 1);
    card.querySelector('.price').textContent = formatNumber(price);
}

export function updateAllAffordability() {
    document.querySelectorAll('.heroCard').forEach(card => {
        const level = Number(card.dataset.level);
        const basePrice = Number(card.dataset.basePrice);
        const amount = resolveAmount(level, basePrice);
        const cost = calcTotalPrice(level, basePrice, amount || 1);

        const btn = card.querySelector('.buyBtn');
        const canAfford = Player.balanceCoins >= cost;

        btn.classList.toggle('disabled', !canAfford);
    });
}

function showNotEnoughCoins(card) {
    card.classList.add('shake');
    card.addEventListener('animationend', () => {
        card.classList.remove('shake');
    }, { once: true });
}

function formatNumber(num) {
    if (num >= 1e18) return (num / 1e18).toFixed(2) + 'Qi';
    if (num >= 1e15) return (num / 1e15).toFixed(2) + 'Qa';
    if (num >= 1e12) return (num / 1e12).toFixed(2) + 'T';
    if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M';
    if (num >= 1e3) return (num / 1e3).toFixed(1) + 'K';
    return Math.floor(num).toString();
}