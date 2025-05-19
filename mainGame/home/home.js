// home.js - Handles displaying the welcome message with the username

document.addEventListener('DOMContentLoaded', function() {
    const username = localStorage.getItem('username');
    if (username) {
        document.getElementById('welcome-user').textContent = `Welcome, ${username}!`;
    }
});
