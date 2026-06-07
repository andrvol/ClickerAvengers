import { Monster } from "./monster.js";

export class Boss extends Monster {
    static bossBonusCoins = 2.0;
    static millisecondsToKill = 30000;

    constructor(name, passiveImg, onHitImg, deathImg, deathSound, hp, coinsFromKilling) {
        super(name, passiveImg, onHitImg, deathImg, deathSound, hp, coinsFromKilling * Boss.bossBonusCoins);
    }
}
