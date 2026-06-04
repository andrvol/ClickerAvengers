import { Player } from "./Entities/player.js";

export function updateMonsterKillData(){
    document.getElementById('monstersKilled').textContent = Player.monstersKilledByPlayer;
    document.getElementById('bossesKilled').textContent = Player.bossesKilledByPlayer;
}