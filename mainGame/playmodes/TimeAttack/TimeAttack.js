// TimeAttack.js - Handles the Time Attack game logic

let selectedTime = 30;
let timerInterval = null;
let timeLeft = 0;
let currentParagraph = '';
let currentIndex = 0;
let isGameActive = false;
let startTime = 0;
let endTime = 0;
let userScore = 0;
let recordScore = 0;

const timeBtns = document.querySelectorAll('.time-btn');
const startBtn = document.getElementById('start-btn');
const timerDisplay = document.getElementById('timer');
const paragraphBox = document.getElementById('paragraph-box');
const inputBox = document.getElementById('input-box');
const resultMessage = document.getElementById('result-message');
const scoreMessage = document.getElementById('score-message');
const recordMessage = document.getElementById('record-message');

// --- Time selection ---
timeBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        timeBtns.forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        selectedTime = parseInt(btn.getAttribute('data-seconds'));
    });
});

// --- Start game ---
startBtn.addEventListener('click', startGame);

function startGame() {
    // Reset UI
    resultMessage.textContent = '';
    scoreMessage.textContent = '';
    recordMessage.textContent = '';
    inputBox.value = '';
    inputBox.style.display = 'block';
    inputBox.disabled = false;
    inputBox.focus();
    currentIndex = 0;
    isGameActive = true;
    // Pick random paragraph
    currentParagraph = paragraphs[Math.floor(Math.random() * paragraphs.length)];
    renderParagraph();
    // Start timer
    timeLeft = selectedTime;
    timerDisplay.textContent = `Time: ${formatTime(timeLeft)}`;
    startTime = Date.now();
    timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `Time: ${formatTime(timeLeft)}`;
        if (timeLeft <= 0) {
            endGame(false);
        }
    }, 1000);
}

function renderParagraph() {
    paragraphBox.innerHTML = '';
    for (let i = 0; i < currentParagraph.length; i++) {
        const span = document.createElement('span');
        span.textContent = currentParagraph[i];
        span.className = 'char';
        paragraphBox.appendChild(span);
    }
}

inputBox.addEventListener('input', function() {
    if (!isGameActive) return;
    const val = inputBox.value;
    const chars = paragraphBox.querySelectorAll('.char');
    let correct = true;
    for (let i = 0; i < chars.length; i++) {
        if (val[i] == null) {
            chars[i].className = 'char';
            correct = false;
        } else if (val[i] === currentParagraph[i]) {
            chars[i].className = 'char correct';
        } else {
            chars[i].className = 'char';
            correct = false;
        }
    }
    if (val === currentParagraph) {
        endGame(true);
    }
});

function endGame(isWin) {
    isGameActive = false;
    clearInterval(timerInterval);
    inputBox.disabled = true;
    endTime = Date.now();
    let timeUsed = (selectedTime - timeLeft);
    if (isWin) {
        resultMessage.textContent = 'WIN!';
        timeUsed = (endTime - startTime) / 1000;
    } else {
        resultMessage.textContent = 'TIME IS UP';
    }
    // Calculate score (characters typed per second)
    let charsTyped = 0;
    const val = inputBox.value;
    for (let i = 0; i < val.length; i++) {
        if (val[i] === currentParagraph[i]) charsTyped++;
    }
    userScore = (charsTyped / timeUsed).toFixed(2);
    scoreMessage.textContent = `Score: ${userScore} chars/sec`;
    // Save score to backend and check for record
    saveScore(userScore, function(brokeRecord) {
        if (brokeRecord) {
            recordMessage.textContent = 'YOU BROKE YOUR RECORD!';
        }
    });
}

function formatTime(sec) {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m > 0 ? m + ':' : ''}${s.toString().padStart(2, '0')}`;
}

// --- Backend integration ---
function saveScore(score, cb) {
    const userId = localStorage.getItem('userId');
    const username = localStorage.getItem('username');
    if (!userId || !username) return;
    fetch('http://localhost:5000/api/timeattack/score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, username, score })
    })
    .then(res => res.json())
    .then(data => {
        cb && cb(data.brokeRecord);
    })
    .catch(() => {
        // ignore errors for now
    });
}
