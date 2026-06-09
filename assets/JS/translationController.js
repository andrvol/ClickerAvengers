import { translations } from "./translation.js";

let currentLang = localStorage.getItem("language") || "en";

export function initTranslations() {
    const select = document.getElementById("languageSelect");

    if (select) {
        select.value = currentLang;

        select.addEventListener("change", () => {
            currentLang = select.value;
            localStorage.setItem("language", currentLang);
            applyTranslation();
        });
    }

    applyTranslation();
}

export function applyTranslation() {
    const t = translations[currentLang];

    document.querySelectorAll("[data-i18n]").forEach(element => {
        const key = element.dataset.i18n;

        if (t[key]) {
            element.textContent = t[key];
        }
    });
}

export function translate(key) {
    return translations[currentLang]?.[key] || key;
}