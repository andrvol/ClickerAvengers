import { Player } from "./Entities/player.js";
export function UpdateAmountOfCoins() {
    document.getElementById("goldAmount").textContent = Player.balanceCoins;
}