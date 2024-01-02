import pg from 'pg';
const { Pool } = pg;
import 'dotenv/config';

const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
    connectionString: connectionString
});

export default pool;
