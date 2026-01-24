import express from "express";
import pool from "./db.js";
import cartRoutes from "./routes/cartRoutes.js";

const app = express();
app.use(express.json());
app.use("/carts", cartRoutes);
app.get("/todo", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM todo");
    res.json(result.rows);
    console.log(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/todo-create", async (req, res) => {
  const { text } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO todo (text) VALUES ($1) RETURNING *",
      [text],
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3030, () => {
  console.log("Server running on port 3000");
});
