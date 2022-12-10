const format = require("pg-format");
const PostgressDatabase = require("./database");
const { pool } = PostgressDatabase;

exports.createProducts = async (data) => {
  const queryString =
    "INSERT INTO products (name, image, spec, price, discount, product_type) VALUES %L returning id";
  const query = format(queryString, data);

  try {
    await pool.query(query);
  } catch (error) {
    console.log(error);
  }
};

exports.resetALl = async () => {
  const queryString = "DELETE FROM products";
  try {
    await pool.query(queryString);
    console.log("Reset successful");
  } catch (error) {
    console.log(error);
  }
};
