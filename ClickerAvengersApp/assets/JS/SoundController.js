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