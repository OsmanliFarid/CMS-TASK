import express from "express";
const cartRoutes = express.Router();
cartRoutes.get("/", (req, res) => {
  res.json({ message: "Cart route works" });
});
export default cartRoutes;
