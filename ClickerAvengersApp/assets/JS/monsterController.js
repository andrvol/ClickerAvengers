import { Monster } from './Entities/monster.js'
import { Platform } from './Entities/platform.js'
import { Player } from './Entities/player.js'

export function updateMonster() {
    const canvas = document.getElementById('playingField');

    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    Monster.setCenterPosition(canvas);

    const monster = createMonster();
    addMonsterOnField(monster, canvas);

    window.addEventListener('resize', () => {
        Monster.setCenterPosition(canvas);

        const enemy = document.querySelector('#enemy');

        if (enemy) {
            enemy.style.left = Monster.onFieldPositionX;
            enemy.style.top = Monster.onFieldPositionY;
        }

        positionHpBar(canvas);
    });

    let hitTimeout;
    hitMonster(monster, hitTimeout, canvas);
}

function addMonsterOnField(monster, canvas) {
    const enemy = document.createElement('img');
    enemy.id = 'enemy';

    enemy.src = monster.passiveImg;

    enemy.style.left = Monster.onFieldPositionX;
    enemy.style.top = Monster.onFieldPositionY;

    canvas.parentElement.appendChild(enemy);

    // полоска hp
    const hpContainer = document.createElement('div');
    hpContainer.id = 'hpContainer';

    const hpBar = document.createElement('div');
    hpBar.id = 'hpBar';

    const hpText = document.createElement('span');
    hpText.id = 'hpText';
    hpText.textContent = monster.hp;

    hpContainer.appendChild(hpBar);
    hpContainer.appendChild(hpText);

    canvas.parentElement.appendChild(hpContainer);

    positionHpBar(canvas);
}

function hitMonster(monster, hitTimeout, canvas) {
    const enemy = document.querySelector('#enemy');

    canvas.addEventListener('click', () => {
        if (monster.hp > 0) {
            monster.hp -= Player.damagePerHit;

            updateHpBar(monster);
        }

        enemy.src = monster.onHitImg;

        clearTimeout(hitTimeout);

        hitTimeout = setTimeout(() => {
            enemy.src = monster.passiveImg;
        }, 180);
    });
}

function createMonster() {
    if (Platform.level % 5 === 0) {
        // дописать логику на вызов босса
    }

    const monsterIndex = Math.floor(Math.random() * (12 - 1 + 1)) + 1;

    const coinsFromKilling = monsterIndex * (Math.floor(Math.random() * (200 - 100 + 1)) + 100);
    const passiveImg = `./assets/images/enemies/monsters-passive/${monsterIndex}.svg`;
    const onHitImg = `./assets/images/enemies/monsters-hit/${monsterIndex}.png`;
    const deadImg = '';
    const monsterName = getMonsterName(monsterIndex);
    const monsterHp = monsterIndex * (Math.floor(Math.random() * (200 - 100 + 1)) + 100);
    const monsterDeathSound = './assets/audio/death-sound.mp3'

    return new Monster(monsterName, passiveImg,
        onHitImg, deadImg, monsterDeathSound,
        monsterHp, coinsFromKilling);
}

function getMonsterName(index) {
    const lang = localStorage.getItem('language');
    let name = '';

    switch (lang) {
        case 'ru':
            name = getMonsterRuName(index);
            break;
        case 'en':
            name = getMonsterEngName(index);
            break;
        case 'ua':
            name = getMonsterUaName(index);
            break;
    }

    return name;
}

function getMonsterRuName(index) {
    index = String(index);
    let name = '';

    switch (index) {
        case '1':
            name = 'Мохорыл';
            break;
        case '2':
            name = 'Слизняк Глотун';
            break;
        case '3':
            name = 'Тыквик';
            break;
        case '4':
            name = 'Ночнокрыл';
            break;
        case '5':
            name = 'Корнепрах';
            break;
        case '6':
            name = 'Ледозев';
            break;
        case '7':
            name = 'Грибун';
            break;
        case '8':
            name = 'Цветослиз';
            break;
        case '9':
            name = 'Жужжик';
            break;
        case '10':
            name = 'Гнилоглаз';
            break;
        case '11':
            name = 'Булькозар'
            break;
        case '12':
            name = 'Крысоклык';
            break;
    }

    return name;
}

function getMonsterEngName(index) {
    index = String(index);
    let name = '';

    switch (index) {
        case '1':
            name = 'Mosssnout';
            break;
        case '2':
            name = 'Glutton Slug';
            break;
        case '3':
            name = 'Pumpkinkin';
            break;
        case '4':
            name = 'Nightwing';
            break;
        case '5':
            name = 'Rootdust';
            break;
        case '6':
            name = 'Frostmaw';
            break;
        case '7':
            name = 'Mushroomer';
            break;
        case '8':
            name = 'Bloomslime';
            break;
        case '9':
            name = 'Buzzling';
            break;
        case '10':
            name = 'Roteye';
            break;
        case '11':
            name = 'Bubblemaw';
            break;
        case '12':
            name = 'Ratfang';
            break;
    }

    return name;
}

function getMonsterUaName(index) {
    index = String(index);
    let name = '';

    switch (index) {
        case '1':
            name = 'Мохорил';
            break;
        case '2':
            name = 'Слизняк Ковтун';
            break;
        case '3':
            name = 'Гарбузик';
            break;
        case '4':
            name = 'Нічнокрил';
            break;
        case '5':
            name = 'Коренепрах';
            break;
        case '6':
            name = 'Льодозів';
            break;
        case '7':
            name = 'Грибун';
            break;
        case '8':
            name = 'Квіткослиз';
            break;
        case '9':
            name = 'Дзижчик';
            break;
        case '10':
            name = 'Гнилоок';
            break;
        case '11':
            name = 'Булькозуб';
            break;
        case '12':
            name = 'Щуроклик';
            break;
    }

    return name;
}

function updateHpBar(monster) {
    const hpBar = document.getElementById('hpBar');
    const hpText = document.getElementById('hpText');

    hpBar.style.width = ((monster.hp / monster.maxHp) * 100) + '%';
    hpText.textContent = monster.hp;
}

function positionHpBar(canvas) {
    const hpContainer = document.getElementById('hpContainer');

    const rect = canvas.getBoundingClientRect();

    hpContainer.style.width = `${rect.width}px`;
    hpContainer.style.left = `${rect.left}px`;
    hpContainer.style.top = `${rect.bottom - 40}px`;
}