import pool from '../../db.js';
import { queries } from './queries.js';

export const getUsers = (req, res) => {
    pool.query(queries.users, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

export const getGames = (req, res) => {
    const username = req.params.username;
    pool.query(queries.games, [username], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

export const addUser = (req, res) => {
    const { username, website_title } = req.body;

    // check if username exists
    pool.query(queries.checkUsername, [username], (error, results) => {
        if (results.rows.length) {
            res.send("Username already exists.");
        }
        else {
            // allow post if username doesn't exist
            pool.query(queries.addUser, [username, website_title], (error, results) => {
                if (error) throw error;
                else {
                    res.redirect(`/api/v1/users/${username}`);
                }
                // res.status(201).send("User created successfully!");
            });
        }
    });
};

export const removeUser = (req, res) => {
    const username = req.params.username;
    
    pool.query(queries.checkUsername, [username], (error, results) => {
        const noUser = !results.rows.length;
        if (noUser) {
            res.send("User does not exist");
        }

        pool.query(queries.removeUser, [username], (error, results) => {
            if (error) throw error;
            res.status(200).send("Student removed successfully.");
        });
    });
};

export const updateUser = (req, res) => {
    const oldUsername = req.params.username;
    const { newUsername } = req.body;

    pool.query(queries.checkUsername, [oldUsername], (error, results) => {
        const noUser = !results.rows.length;
        if (noUser) {
            res.send("User does not exist");
        }

        pool.query(queries.updateUser, [newUsername, oldUsername], (error, results) => {
            if (error) throw error;
            res.status(200).send("Student updated successfully.");
        });
    });
};
