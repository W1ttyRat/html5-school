const loginForm = document.getElementById('loginForm');
const API_URL = 'http://localhost:3000';

if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;

        if (!email || !password) {
            alert('Palun täida kõik väljad');
            return;
        }

        try {
            const res = await fetch(`${API_URL}/api/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.message || 'Sisselogimine ebaõnnestus');
                return;
            }

            alert('Sisselogimine õnnestus');
            window.location.href = '/index.html';
        } catch (err) {
            console.error('Login error:', err);
            alert('Sisselogimine ebaõnnestus');
        }
    });
}