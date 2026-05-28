export function initLoadingScreen() {
    const progressBar = document.getElementById('progressBar');
    const playBtn = document.getElementById('playBtn');
    const loadingScreen = document.getElementById('loadingScreen');
    const languageSelect = document.getElementById('languageSelect');

    let progress = 0;

    const interval = setInterval(() => {
        progress += 10;

        progressBar.style.width = progress + '%';

        if (progress >= 100) {
            clearInterval(interval);

            playBtn.style.display = 'block';
            languageSelect.style.display = 'block';
        }

    }, 200);

    playBtn.addEventListener('click', () => {
        localStorage.setItem('language', languageSelect.value);

        loadingScreen.style.display = 'none';
    });
}