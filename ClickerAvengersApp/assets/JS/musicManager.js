const music = new Audio('./assets/audio/background-music.mp3');

music.loop = true;

music.volume = Number(localStorage.getItem('musicVolume')) || 0.2;

music.muted = localStorage.getItem('musicMuted') === 'true';

export function startMusic() {
    music.play();
}

export function toggleMusic(btn) {
    music.muted = !music.muted;

    localStorage.setItem('musicMuted', music.muted);

    updateIcon(btn);
}

export function updateIcon(btn) {
    btn.src = music.muted
        ? './assets/images/icons-elements/sound-off.svg'
        : './assets/images/icons-elements/sound-on.svg';
}