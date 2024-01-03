import pg from 'pg';
const { Pool } = pg;
import 'dotenv/config';

const user = process.env.PGUSER;
const database = process.env.PGDATABASE;
const password = process.env.PGPASS;

const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
    host: "localhost",
    user: user,
    database: database,
    password: password,
    port: 5432,
});

export default pool;
