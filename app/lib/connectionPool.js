import pg from "pg";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";
const { Pool } = pg;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, "../../.env.local") });

const connectionPool = new Pool({
  host: process.env.DB_URL,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
  ssl: {
    rejectUnauthorized: true,
    ca: process.env.DB_CA,
    key: process.env.DB_CLIENT_KEY,
    cert: process.env.DB_CLIENT_CERT,
  },
});

export default connectionPool;
