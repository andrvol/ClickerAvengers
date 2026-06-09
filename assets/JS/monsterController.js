import { Monster } from './Entities/monster.js';
import { Platform } from './Entities/platform.js';
import { showPlatformNameLvl, showMonstersToKill } from './platformController.js';
import { Player } from './Entities/player.js';
import { isSoundEffectOn } from './soundEffectsButtonController.js';
import { createBoss } from './bossController.js';
import { Boss } from './Entities/boss.js';
import { updateAmountOfClicks } from './menuController.js';
import { updateMonsterKillData } from './monsterStatsController.js';
import { updateAmountOfCoins } from './HUDController.js';
import { updateAllAffordability } from './heroShopController.js';
import { RandomDeathSound, FirstBloodSound, BossKillSound } from './SoundController.js';
import { UpdateInfoBox } from './infoBoxController.js';

let bossInterval = null;
let currentMonster = null;
let totalHit = null;
export function updateMonster() {
    const canvas = document.getElementById('playingField');

    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    Monster.setCenterPosition(canvas);

    currentMonster = respawnMonster(canvas);

    window.addEventListener('resize', () => {
        Monster.setCenterPosition(canvas);

        const enemy = document.querySelector('#enemy');

        if (enemy) {
            enemy.style.left = Monster.onFieldPositionX;
            enemy.style.top = Monster.onFieldPositionY;
        }

        positionHpBar(canvas);
        positionMonsterNameHUD(canvas);
        positionBossTimer(canvas);
    });

    let hitTimeout;
    hitMonster(hitTimeout, canvas);
}

function addMonsterOnField(monster, canvas) {
    const enemy = document.createElement('img');
    enemy.id = 'enemy';

    enemy.src = monster.passiveImg;

    enemy.style.left = Monster.onFieldPositionX;
    enemy.style.top = Monster.onFieldPositionY;

    canvas.parentElement.appendChild(enemy);

    const hpContainer = document.createElement('div');
    hpContainer.id = 'hpContainer';

    const hpBar = document.createElement('div');
    hpBar.id = 'hpBar';
    const randomColor = `hsl(${Math.random() * 360}, 80%, 50%)`;
    hpBar.style.backgroundColor = randomColor;

    const hpText = document.createElement('span');
    hpText.id = 'hpText';
    hpText.textContent = monster.hp;

    hpContainer.appendChild(hpBar);
    hpContainer.appendChild(hpText);

    canvas.parentElement.appendChild(hpContainer);

    positionHpBar(canvas);
}

function respawnMonster(canvas) {
    clearMonster();

    currentMonster = createMonster();

    const killBar = document.getElementById('killBar');
    if (currentMonster instanceof Boss) {
        killBar.style.display = 'none';
        startBossTimer(currentMonster, canvas);
    }
    else {
        killBar.style.display = 'flex';
        stopBossTimer();
    }

    addMonsterOnField(currentMonster, canvas);
    showMonsterNameHUD(currentMonster, canvas);

    return currentMonster;
}

function clearMonster() {
    document.querySelector('#enemy')?.remove();
    document.querySelector('#hpContainer')?.remove();
}

function killMonster(monster, canvas) {
    if (monster instanceof Boss) {
        stopBossTimer();
    }

    monster.hp = 0;
    updateHpBar(monster);

    const enemy = document.querySelector('#enemy');
    enemy.src = monster.deathImg;

    if (isSoundEffectOn()) {
        if (monster instanceof Boss) {
            BossKillSound();
        } else {
            RandomDeathSound();
        }

        if (Player.monstersKilledByPlayer === 0) {
            FirstBloodSound();
        }
    }

    Player.monstersKilledByPlayer += 1;
    Platform.amountOfMonstersKilled += 1;
    Player.balanceCoins += monster.coinsFromKilling;
    updateMonsterKillData();
    updateAmountOfCoins(monster.coinsFromKilling);
    updateAllAffordability();
    UpdateInfoBox();

    if (monster instanceof Boss && Platform.amountOfMonstersKilled === 1) {
        Player.bossesKilledByPlayer += 1;
        Platform.level += 1;
        Platform.amountOfMonstersKilled = 0;
        setTimeout(() => showPlatformNameLvl(canvas), 400);
    }


    if (Platform.amountOfMonstersKilled === Platform.monstersToKill) {
        Platform.level += 1;
        Platform.amountOfMonstersKilled = 0;
        setTimeout(() => showPlatformNameLvl(canvas), 400);
    }

    showMonstersToKill(canvas);
}

function hitMonster(hitTimeout, canvas) {
    setInterval(() => {
        const monster = currentMonster;

        if (!monster || monster.hp <= 0)
            return;

        if (monster.hp - Player.passiveDps <= 0) {
            killMonster(monster, canvas);

            clearTimeout(hitTimeout);

            setTimeout(() => {
                respawnMonster(canvas);
            }, 400);

            return;
        }

        monster.hp -= Player.passiveDps;
        updateHpBar(monster);
    }, 1000);

    canvas.onclick = () => {
        const monster = currentMonster;
        const enemy = document.querySelector('#enemy');

        if (!monster || monster.hp <= 0)
            return;

        if (monster.hp - Player.damagePerHit <= 0) {
            killMonster(monster, canvas);

            clearTimeout(hitTimeout);

            setTimeout(() => {
                respawnMonster(canvas);
            }, 400);

            return;
        }

        monster.hp -= Player.damagePerHit;


        updateHpBar(monster);

        enemy.src = monster.onHitImg;

        clearTimeout(hitTimeout);

        hitTimeout = setTimeout(() => {
            enemy.src = monster.passiveImg;
        }, 180);
        updateAmountOfClicks();
    };
}

function createMonster() {
    if (Platform.level % 5 === 0) {
        return createBoss();
    }

    const monsterIndex = Math.floor(Math.random() * (12 - 1 + 1)) + 1;

    const coinsFromKilling = Platform.level * (Math.floor(Math.random() * (200 - 100 + 1)) + 100);
    const passiveImg = `./assets/images/enemies/monsters-passive/${monsterIndex}.webp`;
    const onHitImg = `./assets/images/enemies/monsters-hit/${monsterIndex}.webp`;
    const deadImg = `./assets/images/enemies/monsters-dead/${monsterIndex}.webp`;
    const monsterName = getMonsterName(monsterIndex);
    const monsterHp = Math.floor(100 * Math.pow(1.8, Platform.level - 1) / 2);
    const monsterDeathSound = './assets/audio/death-sound.mp3';

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

function showMonsterNameHUD(monster, canvas) {
    const nameHud = ensureMonsterNameHUD(canvas);
    positionMonsterNameHUD(canvas);

    nameHud.textContent = monster.name;
}

function ensureMonsterNameHUD(canvas) {
    let hud = document.getElementById('mosterNameHud');

    if (!hud) {
        hud = document.createElement('div');
        hud.id = 'mosterNameHud';
        canvas.parentElement.appendChild(hud);
    }

    return hud;
}

function positionMonsterNameHUD(canvas) {
    const hud = ensureMonsterNameHUD(canvas);
    const rect = canvas.getBoundingClientRect();

    hud.style.left = `${rect.left + 50}px`;
    hud.style.top = `${rect.bottom - 65}px`;

    hud.style.transform = 'translateX(-50%)';
}

function startBossTimer(monster, canvas) {
    stopBossTimer();

    const timerHud = ensureBossTimer(canvas);

    let timeLeft = Boss.millisecondsToKill / 1000;

    updateBossTimerText(timerHud, timeLeft);
    positionBossTimer(canvas);

    bossInterval = setInterval(() => {
        timeLeft--;

        updateBossTimerText(timerHud, timeLeft);

        if (timeLeft <= 0) {
            stopBossTimer();

            updateHpBar(currentMonster);

            setTimeout(() => {
                respawnMonster(canvas);
            }, 100);
        }
    }, 1000);
}

function stopBossTimer() {
    clearInterval(bossInterval);

    const timerHud = document.getElementById('bossTimer');

    if (timerHud) {
        timerHud.remove();
    }
}

function updateBossTimerText(timerHud, timeLeft) {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    timerHud.textContent =
        `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function ensureBossTimer(canvas) {
    let timerHud = document.getElementById('bossTimer');

    if (!timerHud) {
        timerHud = document.createElement('div');
        timerHud.id = 'bossTimer';

        canvas.parentElement.appendChild(timerHud);
    }

    return timerHud;
}

function positionBossTimer(canvas) {
    const timerHud = ensureBossTimer(canvas);
    const rect = canvas.getBoundingClientRect();

    timerHud.style.left = `${rect.left + rect.width / 2}px`;
    timerHud.style.top = `${rect.top + 80}px`;

    timerHud.style.transform = 'translateX(-50%)';
}