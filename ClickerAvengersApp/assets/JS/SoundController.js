export function PlayClickSound() {
    const click = new Audio('./assets/audio/justClick.mp3');
    click.play();
}
export function PlayBuySound() {
    const buySound = new Audio('./assets/audio/purchase-sound.mp3');
    buySound.play();
}
export function CancelSound() {
    const cancelSound = new Audio('./assets/audio/typing-error.mp3');
    cancelSound.play();
}
export function MatchReady() {
    const Match = new Audio('./assets/audio/match-ready.mp3');
    Match.volume = 0.2;

    Match.play();
}