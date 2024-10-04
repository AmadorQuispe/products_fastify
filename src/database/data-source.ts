import { Pool, PoolClient, QueryResult } from 'pg';
import { envConfig } from '../env-config';
import fs from 'fs';
import path from 'path';

const pool = new Pool({
  user: envConfig.db_user,
  host: envConfig.db_host,
  database: envConfig.db_database,
  password: envConfig.db_password,
  port: Number(envConfig.db_port),
  ssl: process.env.NODE_ENV !== 'production' ? false : { rejectUnauthorized: false },
});

const initDatabase = async (): Promise<void> => {
  const client = await pool.connect();
  try {
    const filePath = path.join(__dirname, '../../schema.sql');
    const ddlQuery = fs.readFileSync(filePath, 'utf-8');    
    await client.query('BEGIN');
    await client.query(ddlQuery);
    await client.query('COMMIT');
    console.log('Database schema initialized successfully from schema.sql');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Failed to initialize database schema from schema.sql:', err);
    throw err;
  } finally {
    client.release();
  }
};

const checkConnection = async (): Promise<void> => {
  const client = await pool.connect();
  try {
    await client.query('SELECT NOW()');
    console.log('Database connection successful');
  } catch (err) {
    console.error('Database connection failed:', err);
    throw err;
  } finally {
    client.release();
  }
}

const executeQuery = async (text: string, params?: any[]): Promise<QueryResult> => {
  return await pool.query(text, params);
};
const getClient = async (): Promise<PoolClient> => {
  return await pool.connect();
};

export const dataSource = {
  checkConnection,
  initDatabase,
  getClient,
  executeQuery,
};
