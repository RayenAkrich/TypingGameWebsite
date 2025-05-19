function showPassword() {
    const pwd = document.getElementById('password');
    const toggle = document.getElementById('togglePassword');
    pwd.type = toggle.checked ? 'text' : 'password';
}

function validateSignIn(e) {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const error = document.getElementById('error');
    const welcome = document.getElementById('welcome');
    if (!username || !password) {
        error.textContent = 'All fields are required!';
        error.style.display = 'block';
        welcome.style.display = 'none';
        return false;
    }
    error.style.display = 'none';
    // Send data to backend for authentication
    fetch('http://localhost:5000/api/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Store user id and username in localStorage
            localStorage.setItem('userId', data.id);
            localStorage.setItem('username', data.username);
            // Show wait page with loader and timer
            window.location.href = 'wait.html?username=' + encodeURIComponent(data.username);
        } else {
            error.textContent = data.message || 'Invalid username or password!';
            error.style.display = 'block';
            welcome.style.display = 'none';
        }
    })
    .catch(() => {
        error.textContent = 'Server error. Please try again later!';
        error.style.display = 'block';
        welcome.style.display = 'none';
    });
    return true;
}
