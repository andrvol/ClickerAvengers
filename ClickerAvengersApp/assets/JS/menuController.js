import { Player } from "./Entities/player.js";
export function initMenu() {

    const boosterBtn = document.getElementById('booster-Btn');
    const statBtn = document.getElementById('stat-Btn');
    const analBtn = document.getElementById('anal-Btn');

    boosterBtn.addEventListener('click', () => showPage('boosterPage'));
    statBtn.addEventListener('click', () => showPage('statisticsPage'));
    analBtn.addEventListener('click', () => showPage('analyticsPage'));
}
function GetInfo() {
    document.getElementById("totalGold").textContent = Player.balanceCoins;
    document.getElementById("monstersKilled").textContent = Player.monstersKilledByPlayer;
    document.getElementById("bossesKilled").textContent = Player.bossesKilledByPlayer;
    document.getElementById("clickDamageStat").textContent = Player.damagePerHit;
    document.getElementById("totalClicks").textContent = Player.totalClicks;
}
export function updateAmountOfClicks() {
    Player.totalClicks = Player.totalClicks + 1;
    document.getElementById("totalClicks").textContent = Player.totalClicks;
}


function showPage(id) {
    if(id === 'statisticsPage') {
        GetInfo();
    }
    document
        .querySelectorAll('.page')
        .forEach(page => page.classList.remove('active'));

    document.getElementById(id).classList.add('active');
}