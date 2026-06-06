import { weapons } from "./weaponsData.js";
export function GenerateWeapons() {
    const container = document.getElementById("weapons-container");
    container.innerHTML = "";
    weapons.forEach(weapon => {
        const card = document.createElement('div');
        card.classList.add('weapon-div');
        card.innerHTML = `
        <img src="${weapon.image}" alt="${weapon.name}">
        
        <div class="describing">
            <span>${weapon.name}</span>
            <span>Rarity: ${weapon.rarity}</span>
            <span>Damage: ${weapon.damage}</span>
            <span class="price-weapon">${weapon.price}</span>
        </div>

        <button class="buyWeapon">Buy</button>
    `;
        container.appendChild(card);
    });
}
