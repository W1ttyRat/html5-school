const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET;
const DATABASE_URL = process.env.DATABASE_URL;

if (!JWT_SECRET) {
    console.error('JWT_SECRET is not defined in .env');
    process.exit(1);
}

if (!DATABASE_URL) {
    console.error('DATABASE_URL is not defined in .env');
    process.exit(1);
}

const pool = new Pool({
    connectionString: DATABASE_URL,
});

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

app.use(cors({
    origin: ['http://localhost:5500', 'http://localhost:3000'],
    credentials: true,
}));

app.get('/api/health', async (req, res) => {
    try {
        await pool.query('SELECT 1');
        return res.json({ ok: true, db: "connected" });
    } catch (err) {
        console.error("health check failed:", err);
        return res.status(500).json({ ok: false, db: "disconnected" });
    }
});

app.post('/api/register', async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const normalizedEmail = email.trim().toLowerCase();
        const exists = await pool.query('SELECT * FROM users WHERE email = $1', [normalizedEmail]);

        if (exists.rows.length) {
            return res.status(409).json({ message: 'Email already in use' });
        }

        const passwordHash = await bcrypt.hash(password, 10);

        await pool.query(
            'INSERT INTO users (first_name, last_name, email, password_hash) VALUES ($1, $2, $3, $4)',
            [firstName.trim(), lastName.trim(), normalizedEmail, passwordHash]
        );

        return res.status(201).json({ message: 'User registered successfully' });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
});

app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const normalizedEmail = String(email).trim().toLowerCase();
        const result = await pool.query('SELECT id, email, password_hash FROM users WHERE email = $1', [normalizedEmail]);

        if (!result.rows.length) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const user = result.rows[0];
        const ok = await bcrypt.compare(password, user.password_hash);

        if (!ok) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ sub: user.id, email: user.email }, JWT_SECRET, { expiresIn: '12h' });

        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'lax',
            secure: false, // Set to true in production with HTTPS
        });

        return res.json({ message: 'Login successful' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
});

app.post('/api/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({ message: 'Logout successful' });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});