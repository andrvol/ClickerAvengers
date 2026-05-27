export function updateDayNightBtn() {
    const btn = document.getElementById('dayNightBtn');

    btn.addEventListener('click', () => {
        if (btn.style.backgroundColor === 'black') {
            setNightTheme(btn);
        }
        else{
            setDayTheme(btn);
        }
    });
}

function setNightTheme(btn) {
    document.body.style.backgroundImage = 'url("assets/images/background-night.png")';

    btn.style.backgroundColor = 'aliceblue';
    btn.style.color = 'black';
    btn.style.borderColor = 'aliceblue';
    btn.textContent = '☀';
}

function setDayTheme(btn){
    document.body.style.backgroundImage = 'url("assets/images/background.png")';

    btn.style.backgroundColor = 'black';
    btn.style.color = 'aliceblue';
    btn.style.borderColor = 'black';
    btn.textContent = '☽';
}