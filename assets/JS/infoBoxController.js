import { Player } from "./Entities/player.js";
import { formatNumber } from "./heroShopController.js";

export function UpdateInfoBox() {
    updateAmountOfKilledMonsters();
    UpdateHitDamage();
    updatePassiveDps();
}
export function updateAmountOfKilledMonsters() {
    document.getElementById("DPS-Box").textContent = "Monsters killed: " + Player.monstersKilledByPlayer;
}

export function UpdateHitDamage() {
    document.getElementById("hit-Damage").textContent = "Hit Damage: " + Player.damagePerHit;
}

export function updatePassiveDps() {
    const mmS = document.getElementById('mainMenuPassiveDPS');
    mmS.textContent = 'Passive damage: ' + formatNumber(Player.passiveDps);
}