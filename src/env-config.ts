import * as dotenv from 'dotenv';

dotenv.config();

export const envConfig = {
  port: Number(process.env.PORT) ?? 3000,
  db_host: process.env.DB_HOST ?? 'localhost',
  db_port: process.env.DB_PORT ?? 5432,
  db_user: process.env.DB_USER ?? 'postgres',
  db_password: process.env.DB_PASSWORD ?? 'postgres',
  db_database: process.env.DB_DATABASE ?? 'postgres',
};
