import { Player } from "./Entities/player.js";
import { formatNumber } from "./heroShopController.js";

export function updateAmountOfCoins(earnedGold) {
    document.getElementById("goldAmount").textContent = formatNumber(Player.balanceCoins);
    document.getElementById('totalGold').textContent = formatNumber(Player.balanceCoins);

    if (earnedGold !== undefined) {
        const goldEarnedSpan = document.getElementById('earnedGold');

        let totalAmountOfGoldEarned = localStorage.getItem('totalAmountOfGoldEarned');
        if (totalAmountOfGoldEarned) {
            const totalGold = Number(totalAmountOfGoldEarned) + earnedGold;
            goldEarnedSpan.textContent = formatNumber(totalGold);
            localStorage.setItem('totalAmountOfGoldEarned', totalGold);
        }
        else {
            const totalGold = Number(document.getElementById('earnedGold').textContent) + earnedGold;
            goldEarnedSpan.textContent = formatNumber(totalGold);
            localStorage.setItem('totalAmountOfGoldEarned', totalGold);
        }
    }
}