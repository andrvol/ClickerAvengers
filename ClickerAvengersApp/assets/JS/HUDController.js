import { Player } from "./Entities/player.js";

export function updateAmountOfCoins() {
    document.getElementById("goldAmount").textContent = Player.balanceCoins;
}