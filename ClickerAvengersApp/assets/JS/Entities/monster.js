import { Platform } from './platform.js'

export class Monster {
    static levelBonusCoins = 1.0 * Platform.level; // множитель монет
    static levelHealthIncrease = 1.0 * Math.ceil(Platform.level / 5); // множитель хп

    static onFieldPositionX = 0;
    static onFieldPositionY = 0;

    static setCenterPosition(canvas) {
        const rect = canvas.getBoundingClientRect();

        Monster.onFieldPositionX = rect.left + rect.width / 2 - 50 + 'px';
        Monster.onFieldPositionY = rect.top + rect.height / 2 - 100 + 'px';
    }

    constructor(name, passiveImg, onHitImg, deathImg, deathSound, hp, coinsFromKilling) {
        this.name = name;
        this.passiveImg = passiveImg;
        this.onHitImg = onHitImg;
        this.deathImg = deathImg;
        this.deathSound = deathSound;

        this.hp = hp * Monster.levelHealthIncrease;
        this.maxHp = this.hp;
        this.coinsFromKilling = coinsFromKilling * Monster.levelBonusCoins;
    }
}