export function initRestartBtn() {
    const resetBtn = document.getElementById('restart-BTN');

    resetBtn.onclick = () => {
        localStorage.clear();
        location.reload();
    }
}