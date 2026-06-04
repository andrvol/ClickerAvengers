import { heroes } from './heroesData.js';

let buyAmount = 1;

const heroContainer = document.getElementById('inner-Container');
const levelButtons = document.querySelectorAll('.levelBtn');

export function initHeroShop() {
    renderHeroes();
    setupLevelButtons();
}

function renderHeroes() {
    heroContainer.innerHTML = '';

    heroes.forEach(hero => {
        const card = document.createElement('div');
        card.className = 'heroCard';
        card.dataset.level = hero.level;
        card.dataset.basePrice = hero.basePrice;

        card.innerHTML = `
            <button class="buyBtn">
                <span class="buyCount">x1</span>
                <span class="coin"></span>
                <span class="price">${formatNumber(hero.basePrice)}</span>
            </button>

            <div class="heroInfo">
                <div class="heroName">${hero.name}</div>
            </div>

            <div class="heroRight">
                <div class="heroLevel">Lvl.${hero.level}</div>
                <div class="heroImg"></div>
            </div>
        `;

        card.querySelector('.buyBtn').addEventListener('click', () => {
            buyHero(card);
        });

        heroContainer.appendChild(card);
    });

    updateBuyButtons();
}

function setupLevelButtons() {
    levelButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const value = btn.textContent.toLowerCase();

            buyAmount = value === 'max'
                ? 'max'
                : Number(value.replace('x', ''));

            updateBuyButtons();
        });
    });
}

function buyHero(card) {
    const amount = buyAmount === 'max' ? 100 : buyAmount;

    let level = Number(card.dataset.level);
    level += amount;

    card.dataset.level = level;
    card.querySelector('.heroLevel').textContent = `Lvl.${level}`;

    updateCardPrice(card);
}

function updateBuyButtons() {
    document.querySelectorAll('.heroCard').forEach(card => {
        card.querySelector('.buyCount').textContent =
            buyAmount === 'max' ? 'MAX' : `x${buyAmount}`;

        updateCardPrice(card);
    });
}

function updateCardPrice(card) {
    const level = Number(card.dataset.level);
    const basePrice = Number(card.dataset.basePrice);
    const amount = buyAmount === 'max' ? 100 : buyAmount;

    const price = Math.floor(
        (basePrice + level * basePrice * 0.15) * amount
    );

    card.querySelector('.price').textContent = price;
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