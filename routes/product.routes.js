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
    // console.log("PRODUCTS LIST", listOfProducts);
    res.render("product/product-list", { listOfProducts });
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
  // console.log(
  //   "THIS IS NEW CREATED PRODUCT",
  //   name,
  //   ref,
  //   stock,
  //   image,
  //   category,
  //   keywords,
  //   manufacture,
  //   location
  // );
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

// EDIT PRODUCT
// // GET /products/:productId/edit
router.get("/:productId/edit", isLoggedIn, async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const productToEdit = await Product.findById(productId);
    // console.log("THIS IS THE PRODUCT TO EDIT", productToEdit);
    res.render("product/product-edit", { productToEdit });
  } catch (e) {
    console.log("error to show update product form", e);
    next(e);
  }
});
// // PUT /products/:productId/edit
router.post("/:productId/edit", isLoggedIn, async (req, res, next) => {
  const productId = req.params.productId;
  const { name, ref, stock, image, category, keywords, manufacture } = req.body;
  const location = {
    row: req.body.row,
    lane: req.body.lane,
    shelf: req.body.shelf,
  };
  console.log(
    "THIS IS THE ID",
    productId,
    "THIS IS UPDATED PRODUCT",
    name,
    ref,
    stock,
    image,
    category,
    keywords,
    manufacture,
    location
  );
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        name,
        ref,
        stock,
        image,
        location,
        category,
        keywords,
        manufacture,
      },
      { new: true }
    );
    console.log("THIS IS UPDATED PRODUCT ", updatedProduct);
    res.redirect("/products/list");
  } catch (e) {
    console.log("error to put update product", e);
    next(e);
  }
});
module.exports = router;
