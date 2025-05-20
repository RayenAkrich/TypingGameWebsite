// leaderboard.js - Fetch and display the leaderboard

document.addEventListener('DOMContentLoaded', function() {
    const firstMessage = document.getElementById('first-message');
    const tableBody = document.querySelector('#leaderboard-table tbody');
    const username = localStorage.getItem('username');

    fetch('http://localhost:5000/api/leaderboard')
        .then(res => res.json())
        .then(data => {
            if (!data.success) return;
            const scores = data.scores;
            tableBody.innerHTML = '';
            let userIsFirst = false;
            scores.forEach((row, i) => {
                const tr = document.createElement('tr');
                if (row.username === username && i === 0) userIsFirst = true;
                if (row.username === username) tr.classList.add('highlight');
                tr.innerHTML = `
                    <td>${i + 1}</td>
                    <td>${row.username}</td>
                    <td>${row.score}</td>
                `;
                tableBody.appendChild(tr);
            });
            if (userIsFirst) {
                firstMessage.textContent = 'You are currently #1! Amazing job!';
            }
        });
});
