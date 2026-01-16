// index.js
import express from "express";
import pool from "./db.js";

const app = express();
app.use(express.json());

// GET /todo → bütün todo-ları gətirir
app.get("/todo", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM todo"); // table adı todo
    res.json(result.rows);
    console.log(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /todo → yeni todo əlavə edir
app.post("/todo", async (req, res) => {
  const { text } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO todo (text) VALUES ($1) RETURNING *",
      [text]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
