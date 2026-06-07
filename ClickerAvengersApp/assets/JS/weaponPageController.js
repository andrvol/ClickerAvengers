import { weapons } from "./weaponsData.js";
import { Player } from "./Entities/player.js";
import { CancelSound, PlayBuySound } from "./SoundController.js";
import { UpdateInfoBox } from "./infoBoxController.js";

import { isSoundEffectOn } from "./soundEffectsButtonController.js";
import { updateAmountOfCoins } from "./HUDController.js";

export function GenerateWeapons() {
    const container = document.getElementById("weapons-container");
    container.innerHTML = "";

    weapons.forEach(weapon => {
        const card = document.createElement('div');
        card.classList.add('weapon-div');

        const owned = Player.weapons.includes(weapon.id);

        card.innerHTML = `
    <img src="${weapon.image}" alt="${weapon.name}">
    
    <div class="describing">
        <span>${weapon.name}</span>
        <span>Rarity: ${weapon.rarity}</span>
        <span>Damage: ${weapon.damage}</span>
        <span class="price-weapon">${weapon.price}</span>
    </div>

    <button class="buyWeapon" ${owned ? "disabled" : ""}>
        ${owned ? "Bought" : "Buy"}
    </button>
`;

        const buyBtn = card.querySelector(".buyWeapon");

        buyBtn.addEventListener("click", () => {
            buyWeapon(weapon, buyBtn);
        });

        container.appendChild(card);
    });
}
function buyWeapon(weapon, buyBtn) {
    const ownedWeapons = Player.weapons;

    if (ownedWeapons.includes(weapon.id)) {
        return;
    }
    if (Player.balanceCoins < weapon.price) {
        if (isSoundEffectOn()) {
            CancelSound();
        }
        return;
    }
    if (isSoundEffectOn()) {
        PlayBuySound();
    }
    ownedWeapons.push(weapon.id);
    Player.weapons = ownedWeapons;
    Player.balanceCoins -= weapon.price;
    Player.damagePerHit += weapon.damage;
    updateAmountOfCoins();
    buyBtn.textContent = "Bought";
    buyBtn.disabled = true;
    document.getElementById('playingField').style.cursor =
        `url('${weapon.cursor}'), auto`;
    localStorage.setItem('selectedCursor', weapon.cursor);
    UpdateInfoBox();
}
