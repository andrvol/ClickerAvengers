import { Platform } from "./Entities/platform.js";

export function updatePlatform() {
    const canvas = document.getElementById('playingField');

    setPlatform(canvas);
    positionPlatformHUD(canvas);

    window.onresize = () => {
        positionPlatformHUD(canvas);
    };
}

function setPlatform(canvas) {
    const hud = ensureHUD(canvas);
    hud.textContent = `${Platform.name}, lvl. ${Platform.level}`;

    canvas.style.backgroundImage = `url(${Platform.img})`;
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