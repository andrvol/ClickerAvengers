import { Platform } from './platform.js'

export class Monster {
    static levelBonusCoins = 1.0 * Platform.level; // множитель монет
    static levelHealthIncrease = 1.0 * Platform.level; // множитель хп

        constructor(name, passiveImg, onHitImg, deathImg, deathSound, hp, coinsFromKilling) {
    this.name = name;
    this.passiveImg = passiveImg;
    this.onHitImg = onHitImg;
    this.deathImg = deathImg;
    this.deathSound = deathSound;

    this.hp = hp * Monster.levelHealthIncrease; // string
    this.coinsFromKilling = coinsFromKilling * Monster.levelBonusCoins;
    }
}