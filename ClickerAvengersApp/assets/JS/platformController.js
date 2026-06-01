import { Platform } from "./Entities/platform.js";

export function updatePlatform() {
    const canvas = document.getElementById('playingField');

    showPlatformNameLvl(canvas);
    positionPlatformHUD(canvas);

    showMonstersToKill(canvas);
    positionKillBar(canvas);

    window.addEventListener('resize', () => {
        positionPlatformHUD(canvas);
        positionKillBar(canvas);
    });
}

export function showPlatformNameLvl(canvas) {
    const hud = ensureHUD(canvas);
    hud.textContent = `${Platform.name}, lvl. ${Platform.level}`;

    canvas.style.backgroundImage = `url(${Platform.img})`;
}

export function showMonstersToKill(canvas) {
    const killBar = ensureKillBar(canvas);
    killBar.innerHTML = `
    <span>${Platform.amountOfMonstersKilled} / ${Platform.monstersToKill}</span>
    <img src="./assets/images/icons-elements/death-icon.svg" class="killIcon">`;
}

function ensureKillBar(canvas) {
    let killBar = document.getElementById('killBar');

    if (!killBar) {
        killBar = document.createElement('div');
        killBar.id = 'killBar';
        canvas.parentElement.appendChild(killBar);
    }

    return killBar;
}

function positionKillBar(canvas) {
    const killBar = ensureKillBar(canvas);
    const rect = canvas.getBoundingClientRect();

    killBar.style.left = `${rect.left + rect.width / 2}px`;
    killBar.style.top = `${rect.top + 45}px`;

    killBar.style.transform = 'translateX(-50%) translateX(12px)';
}

function ensureHUD(canvas) {
    let hud = document.getElementById('platformHUD');

    if (!hud) {
        hud = document.createElement('div');
        hud.id = 'platformHUD';
        canvas.parentElement.appendChild(hud);
    }

    return hud;
}

function positionPlatformHUD(canvas) {
    const hud = document.getElementById('platformHUD');
    const rect = canvas.getBoundingClientRect();

    hud.style.left = `${rect.left + rect.width / 2}px`;
    hud.style.top = `${rect.top + 10}px`;

    hud.style.transform = 'translateX(-50%)';
}