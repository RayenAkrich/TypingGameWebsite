# Typing Game Web App<br>

<b>Project Complete!</b><br>

This project is a modern, full-featured Typing Game web application with user authentication, multiple game modes, leaderboard, and backend integration using Flask and MySQL.<br>

---<br>

<b>Features</b><br>
<ul>
<li><b>User Authentication:</b> Signup and Signin with validation, secure session management, and password visibility toggle.</li>
<li><b>Navigation:</b> Consistent, modern navigation bar across all pages.</li>
<li><b>Game Modes:</b>
  <ul>
    <li><b>Time Attack:</b> Choose your time, type a random paragraph, real-time highlighting, win/lose logic, and score calculation (chars/sec).</li>
    <li><b>Race Against Words:</b> Continuous word spawning, fast-paced, robust word matching (case/punctuation-insensitive), and score calculation (words/sec and chars/sec).</li>
  </ul>
</li>
<li><b>Leaderboard:</b> Displays top 20 users’ best scores, highlights current user, and congratulates #1.</li>
<li><b>Backend:</b> Flask server with endpoints for signup, signin, saving scores, and leaderboard. MySQL integration for users and scoreboard tables.</li>
<li><b>Session Management:</b> User id and username stored in localStorage for session and leaderboard updates.</li>
<li><b>Consistent UI:</b> All pages use separate CSS/JS files for maintainability and a visually consistent, modern design.</li>
<li><b>Contact & Source:</b> Contact and Source pages include styled links and setup instructions.</li>
</ul>

---<br>

<b>Setup Instructions</b><br>
<ol>
<li><b>Clone the repository</b> and navigate to the project folder.</li>
<li><b>Install Python dependencies:</b><br>
<pre><code>pip install flask flask-cors mysql-connector-python</code></pre></li>
<li><b>Set up the MySQL database:</b><br>
Use the <code>Connection/creationsSQL.sql</code> file to create the required tables (<code>users</code>, <code>scoreboard</code>).</li>
<li><b>Run the backend server:</b><br>
<pre><code>cd Connection
python serverManipulation.py</code></pre></li>
<li><b>Open the frontend:</b><br>
Open <code>mainGame/home/index.html</code> in your browser, or serve the <code>mainGame</code> folder using a local web server for best results.</li>
</ol>

---<br>

<b>File Structure</b><br>
<ul>
<li><code>Connection/</code>
  <ul>
    <li><code>serverManipulation.py</code> — Main backend (Flask + MySQL)</li>
    <li><code>creationsSQL.sql</code> — SQL for database setup</li>
    <li><code>signup/</code>, <code>signin/</code> — Auth forms and scripts</li>
  </ul>
</li>
<li><code>mainGame/</code>
  <ul>
    <li><code>home/</code>, <code>about/</code>, <code>contact/</code>, <code>disconnect/</code>, <code>source/</code> — Main pages</li>
    <li><code>playmodes/</code> — Game mode selection and logic
      <ul>
        <li><code>RaceAgainstWords/</code>, <code>TimeAttack/</code> — Game implementations</li>
      </ul>
    </li>
    <li><code>leaderboard/</code> — Leaderboard page</li>
  </ul>
</li>
</ul>

---<br>

<b>Credits</b><br>
Developed by Rayen Akriche.<br>
For questions or contributions, see the Contact and Source pages in the app.<br>

---<br>

<b>Demo link</b><br>
[All major requirements and requested refinements are complete. The project is ready for review, polish, or optional enhancements!](https://www.linkedin.com/feed/update/urn:li:activity:7330940085946765312/)<br>
