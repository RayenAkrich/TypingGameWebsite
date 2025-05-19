function showPassword() {
    const pwd = document.getElementById('password');
    const toggle = document.getElementById('togglePassword');
    pwd.type = toggle.checked ? 'text' : 'password';
}

function validateForm(e) {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const error = document.getElementById('error');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!username || !email || !password) {
        error.textContent = 'All fields are required!';
        error.style.display = 'block';
        return false;
    }
    if (!emailPattern.test(email)) {
        error.textContent = 'Please enter a valid email address!';
        error.style.display = 'block';
        return false;
    }
    error.style.display = 'none';

    // Send data to backend
    fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById('signup-form').reset();
            document.getElementById('success').style.display = 'block';
            setTimeout(() => {
                window.location.href = '../signin/SignIn.html';
            }, 1200);
        } else {
            error.textContent = data.message || 'Signup failed!';
            error.style.display = 'block';
        }
    })
    .catch(() => {
        error.textContent = 'Server error. Please try again later!';
        error.style.display = 'block';
    });
    return true;
}
