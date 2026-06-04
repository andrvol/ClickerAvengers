import { Player } from "./Entities/player.js";

export function updateAmountOfCoins(earnedGold) {
    document.getElementById("goldAmount").textContent = Player.balanceCoins;
    document.getElementById('totalGold').textContent = Player.balanceCoins;

    if (earnedGold !== undefined) {
        const goldEarnedSpan = document.getElementById('earnedGold');

        let totalAmountOfGoldEarned = localStorage.getItem('totalAmountOfGoldEarned');
        if (totalAmountOfGoldEarned) {
            goldEarnedSpan.textContent = Number(totalAmountOfGoldEarned) + earnedGold;
            localStorage.setItem('totalAmountOfGoldEarned', goldEarnedSpan.textContent);
        }
        else {
            goldEarnedSpan.textContent = Number(document.getElementById('earnedGold').textContent) + earnedGold;
            localStorage.setItem('totalAmountOfGoldEarned', goldEarnedSpan.textContent);
        }
    }
}