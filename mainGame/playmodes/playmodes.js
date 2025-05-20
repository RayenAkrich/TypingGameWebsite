// playmodes.js - Show mode descriptions on hover

const descBox = document.getElementById('mode-desc');
const descriptions = {
    race: '<b>Race Against the Words:</b> Type the words before they fade out from the screen.',
    time: '<b>Time Attack:</b> Type as many words as you can within a set time limit.'
};

window.showDesc = function(mode) {
    descBox.innerHTML = descriptions[mode];
    descBox.style.opacity = 1;
};

window.hideDesc = function() {
    descBox.innerHTML = '';
    descBox.style.opacity = 0;
};
