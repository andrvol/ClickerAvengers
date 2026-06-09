export const translations = {
    en: {
        desktopOnly: "‼️This game is DESKTOP only‼️",
        play: "Play",

        heroes: "Heroes",
        weapons: "Weapons",
        statistics: "Statistics",

        dpsBox: "Monsters killed : ",
        hitDamage: "Hit damage : ",
        passiveDamage: "Passive damage: ",

        damage: "Damage",
        totalDps: "Total DPS",
        totalHeroLevels: "Total Hero Levels",

        clicks: "Clicks",
        totalClicks: "Total Clicks",
        clickDamage: "Click Damage",

        gold: "Gold",
        totalGold: "Total Gold",
        earnedGold: "Gold Earned",

        monsters: "Monsters",
        monstersKilled: "Monsters Killed",
        bossesKilled: "Bosses Killed",

        weaponsTitle: "Weapons"
    },

    ru: {
        desktopOnly: "‼️Игра доступна только на ПК‼️",
        play: "Играть",

        heroes: "Герои",
        weapons: "Оружие",
        statistics: "Статистика",

        dpsBox: "Убито монстров : ",
        hitDamage: "Урон за клик : ",
        passiveDamage: "Пассивный урон : ",

        damage: "Урон",
        totalDps: "Общий DPS",
        totalHeroLevels: "Суммарный уровень героев",

        clicks: "Клики",
        totalClicks: "Всего кликов",
        clickDamage: "Урон клика",

        gold: "Золото",
        totalGold: "Всего золота",
        earnedGold: "Заработано золота",

        monsters: "Монстры",
        monstersKilled: "Убито монстров",
        bossesKilled: "Убито боссов",

        weaponsTitle: "Оружие"
    },

    ua: {
        desktopOnly: "‼️Гра доступна лише на ПК‼️",
        play: "Грати",

        heroes: "Герої",
        weapons: "Зброя",
        statistics: "Статистика",

        dpsBox: "Вбито монстрів : ",
        hitDamage: "Шкода за клік : ",
        passiveDamage: "Пасивна шкода : ",

        damage: "Шкода",
        totalDps: "Загальний DPS",
        totalHeroLevels: "Сумарний рівень героїв",

        clicks: "Кліки",
        totalClicks: "Усього кліків",
        clickDamage: "Шкода кліку",

        gold: "Золото",
        totalGold: "Усього золота",
        earnedGold: "Зароблено золота",

        monsters: "Монстри",
        monstersKilled: "Вбито монстрів",
        bossesKilled: "Вбито босів",

        weaponsTitle: "Зброя"
    }
};

export function initLanguage() {
    const select = document.getElementById("languageSelect");
    const savedLang = localStorage.getItem("language") || "en";

    select.value = savedLang;
    setLanguage(savedLang);

    select.addEventListener("change", () => {
        const lang = select.value;

        localStorage.setItem("language", lang);
        setLanguage(lang);
    });
}

export function setLanguage(lang) {
    const t = translations[lang];

    document.getElementById("desktopOnly").textContent = t.desktopOnly;
    document.getElementById("playBtn").textContent = t.play;

    document.getElementById("booster-Btn").textContent = t.heroes;
    document.getElementById("weapons-Btn").textContent = t.weapons;
    document.getElementById("stat-Btn").textContent = t.statistics;

    document.getElementById("DPS-Box").textContent = t.dpsBox + "1";
    document.getElementById("hit-Damage").textContent = t.hitDamage + "1";
    document.getElementById("passive-Damage").textContent = t.passiveDamage + "0";

    const statsTitles = document.querySelectorAll("#statisticsPage h2");
    statsTitles[0].textContent = t.damage;
    statsTitles[1].textContent = t.clicks;
    statsTitles[2].textContent = t.gold;
    statsTitles[3].textContent = t.monsters;

    const statLabels = document.querySelectorAll("#statisticsPage .statRow span:first-child");
    statLabels[0].textContent = t.totalDps;
    statLabels[1].textContent = t.totalHeroLevels;
    statLabels[2].textContent = t.totalClicks;
    statLabels[3].textContent = t.clickDamage;
    statLabels[4].textContent = t.totalGold;
    statLabels[5].textContent = t.earnedGold;
    statLabels[6].textContent = t.monstersKilled;
    statLabels[7].textContent = t.bossesKilled;

    document.querySelector("#weaponsPage h2").textContent = t.weaponsTitle;
}