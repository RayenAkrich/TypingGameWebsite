// RaceAgainstWords.js - Handles the Race Against the Words game logic

let isGameActive = false;
let words = [];
let wordObjs = [];
let spawnInterval = null;
let moveInterval = null;
let inputBox, gameArea, startBtn, resultMessage, scoreMessage, recordMessage;
let userScore = 0;
let recordScore = 0;
let startTime = 0;
let endTime = 0;

function pickWords() {
    // Pick a random paragraph and split into words
    const para = paragraphs[Math.floor(Math.random() * paragraphs.length)];
    return para.split(/\s+/).filter(w => w.length > 0);
}

function resetGame() {
    isGameActive = false;
    words = [];
    wordObjs = [];
    clearInterval(spawnInterval);
    clearInterval(moveInterval);
    gameArea.innerHTML = '';
    inputBox.value = '';
    inputBox.style.display = 'none';
    inputBox.disabled = true;
    resultMessage.textContent = '';
    scoreMessage.textContent = '';
    recordMessage.textContent = '';
}

function startGame() {
    resetGame();
    isGameActive = true;
    inputBox.style.display = 'block';
    inputBox.disabled = false;
    inputBox.focus();
    words = pickWords();
    startTime = Date.now();
    spawnInterval = setInterval(spawnWord, 900); // spawn a word every 0.9s (faster)
    moveInterval = setInterval(moveWords, 40); // move words every 40ms (faster)
}

function spawnWord() {
    if (!isGameActive || words.length === 0) return;
    const word = words.shift();
    const span = document.createElement('span');
    span.className = 'word';
    span.textContent = word;
    // Random vertical position
    const top = Math.random() * (gameArea.offsetHeight - 36);
    span.style.top = `${top}px`;
    span.style.left = `${gameArea.offsetWidth}px`;
    // Random speed (pixels per move interval)
    const speed = 2 + Math.random() * 2.5;
    gameArea.appendChild(span);
    wordObjs.push({span, word, x: gameArea.offsetWidth, speed, matched: false});
}

function moveWords() {
    for (let i = 0; i < wordObjs.length; i++) {
        const obj = wordObjs[i];
        if (obj.matched) continue;
        obj.x -= obj.speed;
        obj.span.style.left = `${obj.x}px`;
        if (obj.x + obj.span.offsetWidth < 0) {
            endGame(false);
            return;
        }
    }
}

function checkInput() {
    if (!isGameActive) return;
    const val = inputBox.value.trim();
    for (let i = 0; i < wordObjs.length; i++) {
        const obj = wordObjs[i];
        // Normalize both input and word: remove surrounding punctuation, normalize apostrophes/quotes
        const normalize = s => s.replace(/[’‘‛`´]/g, "'").replace(/[“”]/g, '"').replace(/^[^\w']+|[^\w']+$/g, '').toLowerCase();
        if (!obj.matched && normalize(val) === normalize(obj.word)) {
            obj.matched = true;
            obj.span.classList.add('correct');
            userScore++;
            inputBox.value = '';
            break;
        }
    }
    // If all words matched and none left on screen, load a new paragraph
    if (words.length === 0 && wordObjs.every(obj => obj.matched)) {
        // Remove all matched word spans
        wordObjs.forEach(obj => { if (obj.matched) obj.span.remove(); });
        wordObjs = [];
        words = pickWords();
    }
}

function endGame(isWin) {
    isGameActive = false;
    clearInterval(spawnInterval);
    clearInterval(moveInterval);
    inputBox.disabled = true;
    endTime = Date.now();
    if (!isWin) {
        resultMessage.textContent = 'A word escaped! Game Over!';
    }
    // Score: words per second and chars per second
    let timeUsed = (endTime - startTime) / 1000;
    let wordsTyped = userScore;
    let charsTyped = wordObjs.filter(obj => obj.matched).reduce((sum, obj) => sum + obj.word.length, 0);
    let wps = (wordsTyped / timeUsed).toFixed(2);
    let cps = (charsTyped / timeUsed).toFixed(2);
    scoreMessage.innerHTML = `Score: <b>${wps}</b> words/sec &nbsp; | &nbsp; <b>${cps}</b> chars/sec`;
    saveScore(cps, function(brokeRecord) {
        if (brokeRecord) {
            recordMessage.textContent = 'YOU BROKE YOUR RECORD!';
        }
    });
}

function saveScore(score, cb) {
    const userId = localStorage.getItem('userId');
    const username = localStorage.getItem('username');
    if (!userId || !username) return;
    fetch('http://localhost:5000/api/racewords/score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, username, score })
    })
    .then(res => res.json())
    .then(data => {
        cb && cb(data.brokeRecord);
    })
    .catch(() => {});
}

document.addEventListener('DOMContentLoaded', function() {
    inputBox = document.getElementById('input-box');
    gameArea = document.getElementById('game-area');
    startBtn = document.getElementById('start-btn');
    resultMessage = document.getElementById('result-message');
    scoreMessage = document.getElementById('score-message');
    recordMessage = document.getElementById('record-message');
    startBtn.addEventListener('click', startGame);
    inputBox.addEventListener('input', checkInput);
});
