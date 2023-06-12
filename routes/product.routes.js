const express = require("express");
const router = express.Router();

const Product = require("../models/Product.model");

const isLoggedIn = require("../middleware/isLoggedIn");

////------------- ROUTES------------------

// SHOW PRODUCTS
// // GET /products/list
router.get("/list", isLoggedIn, async (req, res, next) => {
  try {
    const listOfProducts = await Product.find();
    console.log("PRODUCTS LIST", listOfProducts);
    res.render("product/products", { listOfProducts });
  } catch (e) {
    console.log("error display list of products", e);
    next(e);
  }
});

// CREATE PRODUCT
// // GET /products/create
router.get("/create", isLoggedIn, async (req, res, next) => {
  try {
    res.render("product/product-create");
  } catch (e) {
    console.log("error display form to create product(s)", e);
    next(e);
  }
});
// // POST /products/create
router.post("/create", isLoggedIn, async (req, res, next) => {
  const { name, ref, stock, image, category, keywords, manufacture } = req.body;
  const location = {
    row: req.body.row,
    lane: req.body.lane,
    shelf: req.body.shelf,
  };
  console.log(name, ref, stock, image, category, keywords, manufacture, location);
  try {
    await Product.create({
      name,
      ref,
      stock,
      image,
      location,
      category,
      keywords,
      manufacture,
    });
    res.redirect("/products/list");
  } catch (e) {
    console.log("error to post request when creating new product", e);
    next(e);
  }
});

// CREATE PRODUCT
// // GET /products/create
router.get("/create", isLoggedIn, (req, res, next) => {
  res.render("product/product-create");
});
module.exports = router;
