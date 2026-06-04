import { Player } from "./Entities/player.js";

export function updateAmountOfCoins(earnedGold) {
    document.getElementById("goldAmount").textContent = Player.balanceCoins;
    document.getElementById('totalGold').textContent = Player.balanceCoins;

    if (earnedGold)
        document.getElementById('earnedGold').textContent = Number(document.getElementById('earnedGold').textContent) + earnedGold;
}