export class Platform {
    static level = 1;

    constructor(name, amountOfMonstersToKill, monster) {
        this.name = name;
        this.amountOfMonstersToKill = amountOfMonstersToKill;
        this.monster = monster;
    }
}