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
        const result = await pool.query('SELECT id, username, text, image, date FROM posts');
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

app.get('/api/posts/likes/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT post_id, username FROM post_likes WHERE post_id = $1', [id]);
        res.json(result.rows);
    } catch (err) {
        res.status(500)
        console.error(err);
    }
});

// Get all the posts from a user
app.get('/api/posts/:username', async (req, res) => {
    const { username } = req.params;

    try {
        const result = await pool.query(
            'SELECT id, username, text, image, date FROM posts WHERE username = $1',
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
});

app.put('/api/users/:username', async (req, res) => {
    const { username } = req.params;
    const { displayname, password, settings } = req.body;

    if (!displayname && !password && !settings) {
        return res.status(400).json({ error: 'At least one field (displayname, password, settings) required' });
    }

    const fields = [];
    const values = [];
    let idx = 1;

    if (displayname) {
        fields.push(`displayname = $${idx++}`);
        values.push(displayname);
    }
    if (password) {
        fields.push(`password = $${idx++}`);
        values.push(password);
    }
    if (settings) {
        fields.push(`settings = $${idx++}`);
        values.push(settings);
    }

    values.push(username);

    const query = `UPDATE users SET ${fields.join(', ')} WHERE username = $${idx}`;

    try {
        await pool.query(query, values);
        res.status(200).json({ message: 'User updated' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Could not update user' });
    }
});



// O(log(f)) avec f le nombre d'amis
// Get all the recommended friends based on who they are friends with
app.get("/api/users/:username/recommended-foaf", async (req , res) => {
    const { username } = req.params;

    try {
        const result = await pool.query(`
            SELECT DISTINCT f2.friend_username AS suggestion
            FROM friends f1
            JOIN friends f2 ON f1.friend_username = f2.user_username
            WHERE f1.user_username = $1
              AND f2.friend_username != $1
              AND f2.friend_username NOT IN (
                  SELECT friend_username FROM friends WHERE user_username = $1
              )
        `, [username]);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// probablement O(log(f)) aussi du coup
// Get all the recommended friends based on interests
app.get("/api/users/:username/recommended-interests", async (req , res) => {
    const { username } = req.params;

    try {
        const result = await pool.query(`
            SELECT DISTINCT u.username as suggestion
            FROM users u
                     JOIN user_interests ui1 ON ui1.username = u.username
            WHERE ui1.interest IN (
                SELECT interest FROM user_interests WHERE username = $1
            )
              AND u.username != $1
              AND u.username NOT IN (
                SELECT friend_username FROM friends WHERE user_username = $1);
        `, [username]);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Create a new post
app.post('/api/posts', async (req, res) => {
    const { username, text, image } = req.body;

    if (!username) return res.status(400).json({ error: 'Username required' });

    try {
        const imageBuffer = image ? Buffer.from(image, 'base64') : null;
        const result = await pool.query(
            'INSERT INTO posts (username, text, image, date) VALUES ($1, $2, $3, $4) RETURNING id',
            [username, text, imageBuffer || null, new Date()]
        );

        const createdId = result.rows[0].id;

        res.status(201).json({ message: 'Post created', id: createdId});
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

app.post('/api/posts/:id/tags', async (req, res) => {
    const postId = req.params.id;
    const {tag} = req.body;

    try {
        await pool.query(
            'INSERT INTO post_tags (post_id, tag) VALUES ($1, $2)', [postId, tag]
        );
        res.status(201).json({message : "Tag added"});
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Could not like post' });
    }

});

app.get('/api/posts/:id/tags', async (req, res) => {
    const postId = req.params.id;
    //const {tag} = req.body;

    try {
        const result = await pool.query(
            'SELECT post_id, tag FROM post_tags');
        res.json(result.rows)
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Could not like post' });
    }

});

app.get('/api/users/:username/tags', async (req, res) => {

    const username = req.params.username;

    console.log(username);

    try {
        const result = await pool.query('SELECT username, interest FROM user_interests WHERE username = $1', [username]);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Could not find tags' });
    }

});

app.put('/api/users/:username/interests', async (req, res) => {
    const { username } = req.params;
    const { interests } = req.body; // expected to be an array of strings

    if (!Array.isArray(interests)) {
        return res.status(400).json({ error: 'Interests should be an array' });
    }

    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        await client.query('DELETE FROM user_interests WHERE username = $1', [username]);

        for (const interest of interests) {
            await client.query(
                'INSERT INTO user_interests (username, interest) VALUES ($1, $2)',
                [username, interest]
            );
        }

        await client.query('COMMIT');

        res.json({ message: 'Interests updated' });
    } catch (err) {
        await client.query('ROLLBACK');
        console.error(err);
        res.status(500).json({ error: 'Could not update interests' });
    } finally {
        client.release();
    }
});


app.get('/api/posts/search/:search', async (req, res) => {
    const search = req.params.search;

    try {
        const result = await pool.query(`
            SELECT DISTINCT p.id, p.username, p.text, p.image, p.date
            FROM posts p
            LEFT JOIN post_tags pt ON p.id = pt.post_id
            WHERE p.text ILIKE $1 OR pt.tag ILIKE $1
        `, [`%${search}%`]);

        const posts = result.rows.map(post => ({
            ...post,
            image: post.image
                ? `data:image/png;base64,${post.image.toString('base64')}`
                : ''
        }));

        res.json(posts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error during search' });
    }
});

app.delete('/api/users/:username/interests/:interest', async (req, res) => {
    const { username, interest } = req.params;

    try {
        const result = await pool.query(
            'DELETE FROM user_interests WHERE username = $1 AND interest = $2',
            [username, interest]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Interest not found for user' });
        }

        res.json({ message: 'Interest deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Could not delete interest' });
    }
});

// Add an interest for a user
app.post('/api/users/:username/interests', async (req, res) => {
    const { username } = req.params;
    const { interest } = req.body;

    if (!interest) {
        return res.status(400).json({ error: 'Interest is required' });
    }

    try {
        await pool.query(
            'INSERT INTO user_interests (username, interest) VALUES ($1, $2) ON CONFLICT DO NOTHING',
            [username, interest]
        );

        res.status(201).json({ message: 'Interest added' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Could not add interest' });
    }
});


app.listen(process.env.PORT, () => {
    console.log(`Backend running on http://localhost:${process.env.PORT}`);
});

