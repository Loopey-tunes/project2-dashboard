const express = require("express");
const router = express.Router();

const Product = require("../models/Product.model");

const isLoggedIn = require("../middleware/isLoggedIn");

////------------- ROUTES------------------

// SHOW PRODUCTS
// // GET /products/list
router.get("/list", isLoggedIn, async (req, res, next) => {
  const listOfProducts = await Product.find();
  res.render("product/products", { listOfProducts });
});

// CREATE PRODUCT
// // GET /products/create
router.get("/create", isLoggedIn, (req, res, next) => {
  res.render("product/product-create");
});
// // POST /products/create
router.post("/create", isLoggedIn, async (req, res, next) => {
  const { name, stock, image, category, keywords, manufacture } = req.body;
  const location = {
    row: req.body.row,
    lane: req.body.lane,
    shelf: req.body.shelf,
  };
  console.log(name, stock, image, category, keywords, manufacture, location);
  try {
    await Product.create({
      name,
      stock,
      image,
      location,
      category,
      keywords,
      manufacture,
    });
    res.redirect("/products/list");
  } catch (e) {
    console.log("error to post when creating new product", e);
    next(e);
  }
});
module.exports = router;
