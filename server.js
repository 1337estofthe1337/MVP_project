import express from 'express';
import userRoutes from './src/bookmarks/routes.js'
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 8000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.use('/api/v1/users', userRoutes);

//////////////////////////// GET ROUTES /////////////////////
// Login page
app.get('/', (req, res) => {
    // Hangle login prompt for specific user
    res.send('Login Page');
});

// Display user's games
app.get('/:username', (req, res) => {
    // Display information for the logged user
    res.send(`Welcome, ${req.params.username}! You can create new bookmarks
        or visit your previous bookmarks`);
});

// Display user's game's info
app.get('/:username/:gametitle', (req, res) => {
    // Display information for the specific game
    res.send(`Displaying info for ${req.params.gametitle} belonging to ${req.params.username}`);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
