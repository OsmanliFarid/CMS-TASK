import pkg from "pg";

const { Pool } = pkg;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "TodoTask",
  password: "wgumdemo6",
  port: 5432,
});
export default pool;
