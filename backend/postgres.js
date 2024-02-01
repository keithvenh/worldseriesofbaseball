import pg from "pg";
const { Pool } = pg;
import dotenv from 'dotenv';
  
dotenv.config();

const databaseConfig = { connectionString: process.env.PG_CONNECT_URI };
const postgresDB = new Pool(databaseConfig)

export default postgresDB;