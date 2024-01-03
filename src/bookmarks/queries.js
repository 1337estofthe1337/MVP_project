export const queries = {
    users: 'SELECT * FROM users',
    games: 'SELECT games.gametitle, info.url, info.description, info.category FROM users JOIN games ON users.id = games.userid LEFT JOIN info ON games.id = info.gameid WHERE users.username = $1',
    checkUsername: "SELECT u FROM users u WHERE u.username = $1",
    addUser: "INSERT INTO users (username, website_title) VALUES ($1, $2)",
    removeUser: "DELETE FROM users WHERE username = $1",
    updateUser: "UPDATE users SET username = $1 WHERE username = $2",
};
