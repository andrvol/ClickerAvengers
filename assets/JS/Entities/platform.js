export class Platform {
    static names = {
        'en': [
            'Pond',
            'Stone Forest',
            'Ice Forest',
            'Lava Dungeon',
            'Desert',
            'Shiny Mines',
            'Fall',
            'Paradise'
        ],
        'ru': [
            'Пруд',
            'Каменный Лес',
            'Ледяной Лес',
            'Лавовое Подземелье',
            'Пустыня',
            'Сияющие шахты',
            'Осень',
            'Рай'
        ],
        'ua': [
            'Ставок',
            'Кам\'яний Ліс',
            'Крижаний Ліс',
            'Лавове Підземелля',
            'Пустеля',
            'Сяючі шахти',
            'Осінь',
            'Рай'
        ]
    };
    static monstersToKill = 15;

    static get amountOfMonstersKilled() {
        return Number(localStorage.getItem('monstersKilledOnLvl') || 0);
    }

    static set amountOfMonstersKilled(value) {
        localStorage.setItem('monstersKilledOnLvl', value);
    }

    static get img() {
        return `./assets/images/platforms/level${Math.ceil(Platform.level / 5)}.webp`;
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
        const language = localStorage.getItem('language');

        return Platform.names[language][Math.ceil(Platform.level / 5) - 1];
    }
}