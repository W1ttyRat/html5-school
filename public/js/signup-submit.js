const signupForm = document.getElementById('signupForm');
const API_URL = 'http://localhost:3000';
if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const firstName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const terms = document.getElementById('terms').checked;

        if (!firstName || !lastName || !email || !password) {
            alert('All fields are required');
            return;
        }

        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        if (!terms) {
            alert('You must agree to the terms and conditions');
            return;
        }

        try {
            const res = await fetch(`${API_URL}/api/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ firstName, lastName, email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.message || 'Registration failed');
                return;
            }

            alert('Registration successful');
            window.location.href = '/login.html';
        } catch (err) {
            console.error('Registration error:', err);
            alert('Registration failed');
        }
    });
}



