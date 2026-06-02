export class Player {
    static get secondsPlayed() {
        return Number(localStorage.getItem('secondsPlayed') || 0);
    }

    static set secondsPlayed(value) {
        localStorage.setItem('secondsPlayed', value);
    }

    static get damagePerHit() {
        return Number(localStorage.getItem('damagePerHit') || 1);
    }

    static set damagePerHit(value) {
        if (value > 0) {
            localStorage.setItem('damagePerHit', value);
        }
    }

    static get balanceCoins() {
        return Number(localStorage.getItem('balanceCoins') || 20);
    }

    static set balanceCoins(value) {
        if (value >= 0) {
            localStorage.setItem('balanceCoins', value);
        }
    }

    static get monstersKilledByPlayer() {
        return Number(localStorage.getItem('monstersKilledByPlayer') || 0);
    }

    static set monstersKilledByPlayer(value) {
        if (value >= 0) {
            localStorage.setItem('monstersKilledByPlayer', value);
        }
    }

    static get bossesKilledByPlayer() {
        return Number(localStorage.getItem('bossesKilledByPlayer') || 0);
    }

    static set bossesKilledByPlayer(value) {
        if (value >= 0) {
            localStorage.setItem('bossesKilledByPlayer', value);
        }
    }

    static get weapons() {
        return JSON.parse(localStorage.getItem('weapons') || '[]');
    }

    static set weapons(value) {
        localStorage.setItem('weapons', JSON.stringify(value));
    }
}