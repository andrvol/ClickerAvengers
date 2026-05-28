import { updateDayNightBtn } from "./dayNightButtonController.js";
import { clickAnimation } from "./playingFieldOnClickAnimationController.js";
import { updateBackgroundMusicBtn } from './backgroundMusicButtonController.js';
import { updateSoundEffectsBtn } from "./soundEffectsButtonController.js";
import { initLoadingScreen } from "./loadingScreenController.js"

initLoadingScreen();

updateBackgroundMusicBtn();
updateSoundEffectsBtn();

updateDayNightBtn();
clickAnimation();