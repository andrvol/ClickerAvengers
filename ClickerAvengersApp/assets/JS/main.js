import { updateDayNightBtn } from "./dayNightButtonController.js";
import { clickAnimation } from "./playingFieldOnClickAnimationController.js";
import {startMusic,toggleMusic,updateIcon } from './musicManager.js';

const musicBtn = document.getElementById('musicBtn');

updateIcon(musicBtn);

document.addEventListener('click', () => {
    startMusic();
}, { once: true });

musicBtn.addEventListener('click', () => {
    toggleMusic(musicBtn);
});
updateDayNightBtn();
clickAnimation();