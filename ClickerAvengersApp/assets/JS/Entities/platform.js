export class Platform {
    static names = [
        'Pond',
        'Stone Forest',
        'Ice Forest',
        'Hell',
        'Desert',
        'Shiny Mines',
        'Fall',
        'Paradise'
    ];

    static level = 1; // max - 40
    static amountOfMonstersKilled = 0;
    static monstersToKill = 15;

    static get img() {
        return `./assets/images/platforms/level${Math.ceil(Platform.level / 5)}.svg`;
    }

    static get name() {
        return Platform.names[Math.ceil(Platform.level / 5) - 1];
    }
}