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
    static monstersToKill = 15;

    static get amountOfMonstersKilled() {
        return Number(localStorage.getItem('monstersKilledOnLvl') || 0);
    }

    static set amountOfMonstersKilled(value) {
        localStorage.setItem('monstersKilledOnLvl', value);
    }

    static get img() {
        return `./assets/images/platforms/level${Math.ceil(Platform.level / 5)}.svg`;
    }

    static get level() {
        return Number(localStorage.getItem('platformLevel') || 1);
    }

    static set level(value) {
        if (Platform.level < 40) {
            localStorage.setItem('platformLevel', value);
        }
        else {
            localStorage.setItem('platformLevel', 40);
        }
    }

    static get name() {
        return Platform.names[Math.ceil(Platform.level / 5) - 1];
    }
}