import { isSoundEffectOn } from "./soundEffectsButtonController.js";
import { Monster } from "./Entities/monster.js";

export function clickAnimation() {
    const canvas = document.getElementById('playingField');
    const clickSound = new Audio('./assets/audio/click-sound.mp3');

    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    canvas.addEventListener('click', () => {
        if (isSoundEffectOn()) {
            clickSound.currentTime = 0;
            clickSound.play();
        }
    });

    canvas.addEventListener('click', (e) => {
        const rect = canvas.getBoundingClientRect();

        const slash = document.createElement('div');
        slash.className = 'slash';

        const x = rect.left + rect.width / 2 - 20;
        const y = rect.top + rect.height / 2 - 25;

        slash.style.left = x + 'px';
        slash.style.top = y + 'px';

        document.body.appendChild(slash);

        setTimeout(() => slash.remove(), 250);
    });
}