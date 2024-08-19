const { Pool } = require("pg");
const dotenv = require("dotenv");

dotenv.config();

class PgInit {
  constructor() {
    this.pool = new Pool({
      user: process.env.POSTGRES_USER,
      host: process.env.POSTGRES_HOST,
      database: process.env.POSTGRES_DB,
      password: process.env.POSTGRES_PASSWORD,
      port: process.env.POSTGRES_PORT,
      ssl: {
        rejectUnauthorized: true,
      },
    });
  }

  getPool() {
    return this.pool;
  }

  async connect() {
    try {
      await this.pool.connect();
      console.log("Connected to PostgreSQL database successfully.");
    } catch (error) {
      console.error("Error connecting to PostgreSQL database:", error);
    }
  }
}

module.exports = new PgInit();
