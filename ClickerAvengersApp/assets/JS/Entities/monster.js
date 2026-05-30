import { Platform } from './platform.js'

export class Monster {
    static levelBonusCoins = 1.0 * Platform.level; // множитель монет
    static levelHealthIncrease = 1.0 * Platform.level; // множитель хп

    static onFieldPositionX = 0;
    static onFieldPositionY = 0;

    static setCenterPosition(canvas) {
        const rect = canvas.getBoundingClientRect();

        Monster.onFieldPositionX = rect.left + rect.width / 2 - 51 + 'px';
        Monster.onFieldPositionY = rect.top + rect.height / 2 - 65 + 'px';
    }

    constructor(name, passiveImg, onHitImg, deathImg, deathSound, hp, coinsFromKilling) {
        this.name = name;
        this.passiveImg = passiveImg;
        this.onHitImg = onHitImg;
        this.deathImg = deathImg;
        this.deathSound = deathSound;

        this.hp = hp * Monster.levelHealthIncrease;
        this.coinsFromKilling = coinsFromKilling * Monster.levelBonusCoins;
    }
}