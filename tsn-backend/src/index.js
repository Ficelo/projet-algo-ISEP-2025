const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
});

// Test DB connection
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('DB connection error', err);
    } else {
        console.log('DB connected at:', res.rows[0]);
    }
});

app.get('/api/tests', async (req, res) => {
    const result = await pool.query('SELECT * FROM test');
    res.json(result.rows);
});

// Get all users
app.get('/api/users', async (req, res) => {
    try {
        const result = await pool.query('SELECT username, displayname, last_connection_date, settings FROM users');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Get user by username
app.get('/api/users/:username', async (req, res) => {
    const { username } = req.params;
    try {
        const result = await pool.query('SELECT username, displayname, password, last_connection_date, settings FROM users WHERE username = $1', [username]);
        if (result.rows.length === 0) return res.status(404).json({ error: 'User not found' });
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Get all the posts
app.get('/api/posts', async (req, res) => {
    try {
        const result = await pool.query('SELECT username, text, image, date FROM posts');
        const posts = result.rows.map(post => ({
            ...post,
            image: post.image
                ? `data:image/png;base64,${post.image.toString('base64')}`
                : ''
        }));
        res.json(posts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Get all the posts from a user
app.get('/api/posts/:username', async (req, res) => {
    const { username } = req.params;

    try {
        const result = await pool.query(
            'SELECT username, text, image, date FROM posts WHERE username = $1',
            [username]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'No Posts found' });
        }

        const posts = result.rows.map(post => ({
            ...post,
            image: post.image
                ? `data:image/png;base64,${post.image.toString('base64')}`
                : ''
        }));

        res.json(posts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Create a new user
app.post('/api/users', async (req, res) => {
    const { username, displayname, password, settings } = req.body;
    const dateNow = new Date();
    if (!username || !displayname || !password) return res.status(400).json({ error: 'Missing fields' });
    // TODO: hash password before storing
    try {
        await pool.query(
            'INSERT INTO users (username, displayname, password, settings, last_connection_date) VALUES ($1, $2, $3, $4, $5)',
            [username, displayname, password, settings || {}, dateNow]
        );
        res.status(201).json({ message: 'User created'});
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Could not create user' });
    }
});

// Add a friend
app.post('/api/users/:username/friends', async (req, res) => {
    const { username } = req.params;
    const { friendUsername } = req.body;
    if (!friendUsername) return res.status(400).json({ error: 'Friend username required' });

    try {
        await pool.query(
            'INSERT INTO friends (user_username, friend_username) VALUES ($1, $2)',
            [username, friendUsername]
        );
        res.status(201).json({ message: 'Friend added' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Could not add friend' });
    }
});

// Get all of a users friends
app.get('/api/users/:username/friends', async (req, res) => {
    const { username } = req.params;

    try {
        const result = await pool.query('SELECT user_username, friend_username FROM friends WHERE user_username = $1', [username]);
        if (result.rows.length === 0) return res.status(404).json({ error: 'Friends not found' });
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({error : 'Server error'})
    }
})

// Create a new post
app.post('/api/posts', async (req, res) => {
    const { username, text, image } = req.body;

    if (!username) return res.status(400).json({ error: 'Username required' });

    try {
        const imageBuffer = image ? Buffer.from(image, 'base64') : null;
        await pool.query(
            'INSERT INTO posts (username, text, image, date) VALUES ($1, $2, $3, $4)',
            [username, text, imageBuffer || null, new Date()]
        );
        res.status(201).json({ message: 'Post created' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Could not create post' });
    }
});

// Like a post
app.post('/api/posts/:id/like', async (req, res) => {
    const postId = req.params.id;
    const { username } = req.body;
    if (!username) return res.status(400).json({ error: 'Username required' });

    try {
        await pool.query(
            'INSERT INTO post_likes (post_id, username) VALUES ($1, $2) ON CONFLICT DO NOTHING',
            [postId, username]
        );
        res.status(201).json({ message: 'Post liked' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Could not like post' });
    }
});


app.listen(process.env.PORT, () => {
    console.log(`Backend running on http://localhost:${process.env.PORT}`);
});
