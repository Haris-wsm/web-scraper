const router = require("express").Router();

const { pool } = require("../database");

router.post("/products", async (req, res) => {
  const { category } = req.body;

  const quertString = "SELECT * from products WHERE product_type = $1";

  try {
    const { rows: data } = await pool.query(quertString, [category]);
    res.send(data);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

router.get("/categories", async (req, res) => {
  const queryString = "SELECT DISTINCT(product_type) from products;";

  try {
    const { rows: data } = await pool.query(queryString);
    res.send(data);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = router;
