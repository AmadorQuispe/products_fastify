import { Pool, PoolClient, QueryResult } from 'pg';
import { envConfig } from '../env-config';

const pool = new Pool({
  user: envConfig.db_user,
  host: envConfig.db_host,
  database: envConfig.db_database,
  password: envConfig.db_password,
  port: Number(envConfig.db_port),
  ssl: process.env.NODE_ENV !== 'production' ? false : { rejectUnauthorized: false },
});

const initDatabase = async (): Promise<void> => {
  await pool.connect();
};

const executeQuery = async (text: string, params?: any[]): Promise<QueryResult> => {
  return await pool.query(text, params);
};
const getClient = async (): Promise<PoolClient> => {
  return await pool.connect();
};

export const AppDataSource = {
  initDatabase,
  getClient,
  executeQuery,
};
