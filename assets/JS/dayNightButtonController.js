export function updateDayNightBtn() {
    const btn = document.getElementById('dayNightBtn');

    let isNight = false;

    btn.addEventListener('click', () => {
        isNight = !isNight;

        if (isNight) {
            setNightTheme(btn);
        } else {
            setDayTheme(btn);
        }
    });
}

function setNightTheme(btn) {
    document.body.style.backgroundImage = 'url("./assets/images/background-night.webp")';

    btn.style.backgroundColor = 'aliceblue';
    btn.style.color = 'black';
    btn.style.borderColor = 'aliceblue';
    btn.textContent = '☀';
}

function setDayTheme(btn) {
    document.body.style.backgroundImage = 'url("./assets/images/background.webp")';

    btn.style.backgroundColor = 'black';
    btn.style.color = 'aliceblue';
    btn.style.borderColor = 'black';
    btn.textContent = '☽';
}