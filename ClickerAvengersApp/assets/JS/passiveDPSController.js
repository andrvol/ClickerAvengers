import { Player } from './Entities/player.js';

let passiveInterval = null;
let getCurrentMonsterFn = null;
let onMonsterKilledFn = null;

export function initPassiveDps(getCurrentMonster, onMonsterKilled) {
    getCurrentMonsterFn = getCurrentMonster;
    onMonsterKilledFn = onMonsterKilled;
}

export function updatePassiveDps() {
    const dps = calcTotalPassiveDps();

    if (dps <= 0) {
        stopPassiveDps();
        return;
    }

    if (passiveInterval) return;

    passiveInterval = setInterval(() => {
        const monster = getCurrentMonsterFn?.();

        if (!monster || monster.hp <= 0) return;

        const damage = calcTotalPassiveDps();

        if (monster.hp - damage <= 0) {
            onMonsterKilledFn?.();
        } else {
            monster.hp -= damage;
            dispatchHpUpdate(monster);
        }
    }, 1000);
}

export function stopPassiveDps() {
    clearInterval(passiveInterval);
    passiveInterval = null;
}

function calcTotalPassiveDps() {
    const passive = Player.passiveDps ?? 0;
    const maxAllowed = Player.damagePerHit * 0.5;
    return Math.min(passive, maxAllowed);
}
function dispatchHpUpdate(monster) {
    window.dispatchEvent(new CustomEvent('passiveHpUpdate', { detail: { monster } }));
}