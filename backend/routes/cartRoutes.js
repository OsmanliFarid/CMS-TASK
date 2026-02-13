import express from "express";
import pool from "../db.js";

const cartRoutes = express.Router();

// Get all cart items
cartRoutes.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM cartlist");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
// get filter status cart items
cartRoutes.get("/filter", async (req, res) => {
  const { status } = req.query; // query param

  try {
    let result;

    if (status && status !== "All Status") {
      // Statusa görə filter
      result = await pool.query(
        "SELECT * FROM cartlist WHERE status = $1 ORDER BY id DESC",
        [status],
      );
    } else {
      // Hamısını qaytar
      result = await pool.query("SELECT * FROM cartlist ORDER BY id DESC");
    }

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
// put cart item by id
cartRoutes.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const result = await pool.query(
      "UPDATE cartlist SET status = $1 WHERE id = $2 RETURNING *",
      [status, id],
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Cart item not found" });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
export default cartRoutes;
