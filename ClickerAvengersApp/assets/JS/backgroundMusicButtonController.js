const music = new Audio('./assets/audio/background-music.mp3');

music.loop = true;
music.volume = Number(localStorage.getItem('musicVolume')) || 0.2;
music.muted = localStorage.getItem('musicMuted') === 'true';


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
    music.play();
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