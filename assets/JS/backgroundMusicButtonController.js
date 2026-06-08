let currenTrack = 1;

let music = new Audio();
music.loop = false;

const baseVolume = Number(localStorage.getItem('musicVolume')) || 0.2;
music.muted = localStorage.getItem('musicMuted') === 'true';

music.addEventListener('ended', playNextTrack);
music.addEventListener('timeupdate', handleFadeOut);

export function updateBackgroundMusicBtn() {
    const musicBtn = document.getElementById('musicBtn');

    updateIcon(musicBtn);

    document.addEventListener('click', () => {
        startMusic();
    }, { once: true });

    musicBtn.addEventListener('click', () => {
        toggleMusic(musicBtn);
    });
}

function startMusic() {
    playCurrentTrack();
}

function playCurrentTrack() {
    music.src = `./assets/audio/background-music${currenTrack}.mp3`;
    music.load();

    music.volume = 0;
    delete music.dataset.fadingOut;

    music.play().then(() => {
        fadeIn();
    });
}

function playNextTrack() {
    currenTrack = currenTrack === 1 ? 2 : 1;
    playCurrentTrack();
}

function toggleMusic(btn) {
    music.muted = !music.muted;

    localStorage.setItem('musicMuted', music.muted);

    updateIcon(btn);
}

function updateIcon(btn) {
    btn.src = music.muted
        ? './assets/images/icons-elements/sound-off.webp'
        : './assets/images/icons-elements/sound-on.webp';
}

function fadeIn() {
    const duration = 10000;
    const stepTime = 200;
    const steps = duration / stepTime;

    let step = 0;

    const interval = setInterval(() => {
        step++;

        const progress = step / steps;
        music.volume = baseVolume * progress;

        if (step >= steps) {
            music.volume = baseVolume;
            clearInterval(interval);
        }
    }, stepTime);
}

function handleFadeOut() {
    if (!music.duration) return;

    const timeLeft = music.duration - music.currentTime;

    if (timeLeft <= 10 && !music.dataset.fadingOut) {
        music.dataset.fadingOut = "true";

        const duration = 10000;
        const stepTime = 200;
        const steps = duration / stepTime;

        let step = 0;
        let startVolume = music.volume;

        const interval = setInterval(() => {
            step++;

            const progress = step / steps;
            music.volume = startVolume * (1 - progress);

            if (step >= steps) {
                music.volume = 0;
                clearInterval(interval);
            }
        }, stepTime);
    }
}