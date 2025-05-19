let seconds = 5;
function updateTimer() {
    const timer = document.getElementById('timer');
    if (seconds > 0) {
        timer.textContent = seconds;
        seconds--;
        setTimeout(updateTimer, 1000);
    } else {
        window.location.href = '../../mainGame/home/index.html';
    }
}
window.onload = updateTimer;
