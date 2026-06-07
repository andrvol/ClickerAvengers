export function updateSoundEffectsBtn(){
    const seBtn = document.getElementById('soundEffectsBtn');

    seBtn.addEventListener('click', () => {
        if(seBtn.src.includes('effects-on.webp')){
            turnEffectsOff(seBtn);
        }
        else{
            turnEffectsOn(seBtn);
        }
    });
}

export function isSoundEffectOn(){
    const seBtn = document.getElementById('soundEffectsBtn');

    return seBtn.src.includes('effects-on.webp');
}

function turnEffectsOn(btn){
    btn.src = './assets/images/icons-elements/effects-on.webp';
}

function turnEffectsOff(btn){
    btn.src = './assets/images/icons-elements/effects-off.webp';
}