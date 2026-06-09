import { Player } from "./Entities/player.js";
import { PlayClickSound } from "./SoundController.js";
import { isSoundEffectOn } from "./soundEffectsButtonController.js";
import { GenerateWeapons } from "./weaponPageController.js";
import { formatNumber } from "./heroShopController.js";
export function initMenu() {

    const boosterBtn = document.getElementById('booster-Btn');
    const statBtn = document.getElementById('stat-Btn');
    const weaponsBtn = document.getElementById('weapons-Btn');

    boosterBtn.addEventListener('click', () => showPage('boosterPage'));
    statBtn.addEventListener('click', () => showPage('statisticsPage'));
    weaponsBtn.addEventListener('click', () => showPage('weaponsPage'));
}
function GetInfo() {
    document.getElementById('totalDps').textContent = formatNumber(Player.passiveDps);
    document.getElementById("totalGold").textContent = formatNumber(Player.balanceCoins);
    document.getElementById("monstersKilled").textContent = Player.monstersKilledByPlayer;
    document.getElementById("bossesKilled").textContent = Player.bossesKilledByPlayer;
    document.getElementById("clickDamageStat").textContent = formatNumber(Player.damagePerHit);
    document.getElementById("totalClicks").textContent = formatNumber(Player.totalClicks);
}
export function updateAmountOfClicks() {
    Player.totalClicks = Player.totalClicks + 1;
    document.getElementById("totalClicks").textContent = Player.totalClicks;
}


function showPage(id) {
    if (isSoundEffectOn())
        PlayClickSound();
    if (id === 'statisticsPage')
        GetInfo();
    
    document
        .querySelectorAll('.page')
        .forEach(page => page.classList.remove('active'));

    document.getElementById(id).classList.add('active');
}