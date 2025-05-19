// Clear user session data on disconnect
localStorage.removeItem('username');
localStorage.removeItem('user_id');

let seconds = 5;
function updateTimer() {
    const timer = document.getElementById('timer');
    if (seconds > 0) {
        timer.textContent = seconds;
        seconds--;
        setTimeout(updateTimer, 1000);
    } else {
        window.location.href = '../../Connection/signin/SignIn.html';
    }
}
window.onload = updateTimer;
