import { Boss } from './Entities/boss.js';
import { Platform } from './Entities/platform.js';

export function createBoss() {
    const bossIndex = Math.floor(Math.random() * (7 - 1 + 1)) + 1;

    const coinsFromKilling = bossIndex * (Math.floor(Math.random() * (200 - 100 + 1)) + 100)
    const passiveImg = `./assets/images/enemies/bosses-passive/${bossIndex}.webp`;
    const onHitImg = `./assets/images/enemies/bosses-hit/${bossIndex}.webp`;
    const deadImg = `./assets/images/enemies/bosses-dead/${bossIndex}.webp`;
    const name = getBossName(bossIndex);
    const bossHp = Math.floor(100 * Math.pow(1.8, Platform.level - 1)) * 5;
    const bossDeathSound = './assets/audio/death-sound.mp3';

    return new Boss(name, passiveImg, onHitImg,
        deadImg, bossDeathSound,
        bossHp, coinsFromKilling);
}

function getBossName(index) {
    const lang = localStorage.getItem('language');
    let name = '';

    switch (lang) {
        case 'ru':
            name = getBossRuName(index);
            break;
        case 'en':
            name = getBossEngName(index);
            break;
        case 'ua':
            name = getBossUaName(index);
            break;
    }

    return name;
}

function getBossEngName(index) {
    index = String(index);

    switch (index) {
        case '1':
            return 'Trihorn';
        case '2':
            return 'Rat King';
        case '3':
            return 'Mushroom Behemoth';
        case '4':
            return 'Dark Silkworm';
        case '5':
            return 'Lava Golem';
        case '6':
            return 'Darkskull';
        case '7':
            return 'Ice Worm';
        default:
            return '';
    }
}

function getBossRuName(index) {
    index = String(index);

    switch (index) {
        case '1':
            return 'Трирог';
        case '2':
            return 'Крысиный Король';
        case '3':
            return 'Мухоморище';
        case '4':
            return 'Тёмный Шелкопряд';
        case '5':
            return 'Лавовый Голем';
        case '6':
            return 'Темночереп';
        case '7':
            return 'Ледяной Червь';
        default:
            return '';
    }
}

function getBossUaName(index) {
    index = String(index);

    switch (index) {
        case '1':
            return 'Триріг';
        case '2':
            return 'Щурячий Король';
        case '3':
            return 'Мухоморище';
        case '4':
            return 'Темний Шовкопряд';
        case '5':
            return 'Лавовий Голем';
        case '6':
            return 'Темночереп';
        case '7':
            return 'Крижаний Червʼяк';
        default:
            return '';
    }
}