import { Monster } from "./monster.js";

class Boss extends Monster {
    constructor(passiveImg, onHitImg, deathImg, deathSound, hp, secondsToKill) {
        super(passiveImg, onHitImg, deathImg, deathSound, hp);

        this.secondsToKill = secondsToKill; // float
    }
}
