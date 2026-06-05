import { Player } from "./Entities/player.js";
export function UpdateInfoBox() {
    updateAmountOfKilledMonsters();
    UpdateHitDamage();
}
export function updateAmountOfKilledMonsters() {
    document.getElementById("DPS-Box").textContent = "Monsters killed: " + Player.monstersKilledByPlayer;
}

export function UpdateHitDamage() {
    document.getElementById("hit-Damage").textContent = "Hit Damage: " + Player.damagePerHit;
}