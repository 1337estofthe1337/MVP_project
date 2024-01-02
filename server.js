import express from 'express';
import pool from './db.js';

const app = express();
const port = process.env.PORT || 8000;

app.use(express.static('public'));
app.use(express.json());

//////////////////////////// GET ROUTES /////////////////////
app.get('/', (req, res) => {
    // Hangle login prompt for specific user
    res.send('Login Page');
});

app.get('/:username', (req, res) => {
    // Display information for the logged user
    res.send(`Welcome, ${req.params.username}! You can create new bookmarks
        or visit your previous bookmarks`);
});

app.get('/:username/:gametitle', (req, res) => {
    // Display information for the specific game
    res.send(`Displaying info for ${req.params.gametitle} belonging to ${req.params.username}`);
});

//////////////////////////// POST ROUTES /////////////////////
app.post('/:username', async (req, res) => {
    // Add username to the database
    const { username } = req.params;
    try {
        const result = await pool.query(
            'INSERT INTO users (username) VALUES ($1)', [username]);
        res.send(`Username ${username} added successfully`);
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Error inserting username');
    }
});

app.post('/:username/:gametitle', async (req, res) => {
    // Add gametitle for username to the database
    const { username, gametitle } = req.params;
    try {
        await pool.query(
            'INSERT INTO games (gametitle, userid) VALUES ($1, (SELECT id FROM users WHERE username = $2))',
            [gametitle, username]
        );
        res.send(`Gametitle ${gametitle} added successfully for ${username}`);
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Error inserting gametitle');
    }
});

app.post('/:username/:gametitle/:infoid', async (req, res) => {
    // Add info for gametitle for username to the database
    const { username, gametitle } = req.params;
    try {
        await pool.query(
            'INSERT INTO info (url, description, map, category, gameid) VALUES ($1, $2, $3, $4, (SELECT id FROM games WHERE gametitle = $5 AND userid = (SELECT id FROM users WHERE username = $6)))',
            [req.body.url, req.body.description, req.body.map, req.body.category, gametitle, username]
        );
        res.send(`Info added successfully for ${gametitle}`);
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Error inserting info');
    }
});

//////////////////////////// PUT ROUTES /////////////////////
app.put('/:username', (req,res) => {
    // Change username info
    res.send(`Changing info for ${req.params.username}`);
});

app.put('/:username/:gametitle', (req, res) => {
    // Change gametitle for username
    res.send(`Changing gametitle for ${req.params.username}`);
});

app.put('/:username/:gametitle/:infoid', async (req, res) => {
    // Change url, description, map, or category information
    const { username, gametitle, infoid } = req.params;
    try {
        await pool.query(
            'UPDATE info SET url = $1, description = $2, map = $3, category = $4 WHERE gameid = (SELECT id FROM games WHERE gametitle = $5 AND userid = (SELECT id FROM users WHERE username = $6)) AND id = $7',
            [req.body.url, req.body.description, req.body.map, req.body.category, gametitle, username, infoid]
        );
        res.send(`Info updated successfully for ${gametitle} with ID: ${infoid}`);
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Error updating info');
    }
});

//////////////////////////// DELETE ROUTES /////////////////////
app.delete('/:username', async (req, res) => {
    // Delete user (prompt before delete)
    const { username } = req.params;
    try {
        await pool.query('DELETE FROM users WHERE username = $1', [username]);
        res.send(`Prompting to delete user ${username}`);
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Error deleting user');
    }
});

app.delete('/:username/:gametitle', async (req, res) => {
    // Delete gametitle for username
    const { username, gametitle } = req.params;
    try {
        await pool.query(
            'DELETE FROM games WHERE gametitle = $1 AND userid = (SELECT id FROM users WHERE username = $2)',
            [gametitle, username]
        );
        res.send(`Deleting gametitle ${gametitle} for ${username}`);
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Error deleting gametitle');
    }
});

app.delete('/:username/:gametitle/:infoid', async (req, res) => {
    const { username, gametitle, infoid } = req.params;
    try {
        await pool.query(
            'DELETE FROM info WHERE id = $1 AND gameid = (SELECT id FROM games WHERE gametitle = $2 AND userid = SELECT id FROM users WHERE username = $3))',
            [infoid, gametitle, username]
        );
        res.send(`Deleting info entry with ID: ${infoid}`);
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Error deleting info entry');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
