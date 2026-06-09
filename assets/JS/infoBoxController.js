import { Player } from "./Entities/player.js";
import { formatNumber } from "./heroShopController.js";

export function UpdateInfoBox() {
    updateAmountOfKilledMonsters();
    UpdateHitDamage();
    updatePassiveDps();
}

export function updateAmountOfKilledMonsters() {
    document.getElementById("DPS-Box").textContent = formatNumber(Player.monstersKilledByPlayer);
}

export function UpdateHitDamage() {
    document.getElementById("hit-Damage").textContent = formatNumber(Player.damagePerHit);
}

export function updatePassiveDps() {
    document.getElementById("passive-Damage").textContent = formatNumber(Player.passiveDps);
}