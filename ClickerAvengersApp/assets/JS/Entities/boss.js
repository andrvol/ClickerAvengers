import { Monster } from "./monster.js";

export class Boss extends Monster {
    static bossBonusCoins = 1.0 // множитель монет

    constructor(name, passiveImg, onHitImg, deathImg, deathSound, hp, coinsFromKilling,secondsToKill) {
        super(name, passiveImg, onHitImg, deathImg, deathSound, hp, coinsFromKilling * Boss.bossBonusCoins);

        this.secondsToKill = secondsToKill; // float
    }
}
