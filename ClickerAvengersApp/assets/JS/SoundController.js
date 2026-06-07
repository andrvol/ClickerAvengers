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
export function RandomDeathSound() {
    const deathSound = ['./assets/audio/death-sound.mp3', './assets/audio/death-sound2.mp3','./assets/audio/kill-sound3.mp3','./assets/audio/kill-sound4.mp3'];
    const randomSound = deathSound[Math.floor(Math.random() * deathSound.length)];
    const audio = new Audio(randomSound);
    audio.play();
}
export function BossKillSound() {
    const bossKillSound = new Audio ('./assets/audio/boss-kill-sound.mp3');
    bossKillSound.play();

}
export function FirstBloodSound() {
    const fb = new Audio('./assets/audio/firstblood.mp3');
    fb.play();
}