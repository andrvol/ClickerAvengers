import { updateDayNightBtn } from "./dayNightButtonController.js";
import { clickAnimation } from "./playingFieldOnClickAnimationController.js";
import { updateBackgroundMusicBtn } from './backgroundMusicButtonController.js';
import { updateSoundEffectsBtn } from "./soundEffectsButtonController.js";
import { initLoadingScreen } from "./loadingScreenController.js";
import { updateMonster } from "./monsterController.js";
import { updatePlatform } from "./platformController.js";
import { Player } from "./Entities/player.js";
import { initHeroShop } from './heroShopController.js';
import { initMenu } from './menuController.js';
import { updateAmountOfCoins } from './HUDController.js';
import { UpdateInfoBox } from "./infoBoxController.js";
import { MatchReady } from "./SoundController.js";
import { GenerateWeapons } from "./weaponPageController.js";
import { initRestartBtn } from "./restartBtnController.js";
import { initLanguage } from "./translationController.js";

initLanguage();
initMenu();
GenerateWeapons();
initHeroShop();
initRestartBtn();

initLoadingScreen(() => {
    setInterval(() => {
        Player.secondsPlayed += 1;
    }, 1000);
    MatchReady();
    updateBackgroundMusicBtn();
    updateSoundEffectsBtn();

    updateDayNightBtn();

    clickAnimation();

    UpdateInfoBox();
    updatePlatform();
    updateMonster();
    updateAmountOfCoins(0);
    if (Player.selectedCursor) {
        document.getElementById('playingField').style.cursor =
            `url('${Player.selectedCursor}'), auto`;
    }
});