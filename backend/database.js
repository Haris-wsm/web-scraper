const { Pool } = require("pg");

class PostgressDatabase {
  static pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  static async connect() {
    try {
      await this.pool.connect();

      console.log("Connected to database sucess");
    } catch (error) {
      console.log(error);
    }
  }

  static async disconnect() {
    try {
      await this.pool.end();
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = PostgressDatabase;
