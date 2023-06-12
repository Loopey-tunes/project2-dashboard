const fs = require("fs");
const csv = require("csv-parser");
const express = require("express");
const upload = require("../middleware/upload");
const router = express.Router();

const Product = require("../models/Product.model");

const isLoggedIn = require("../middleware/isLoggedIn");

////------------- ROUTES------------------

// SHOW PRODUCTS
// // GET /products/list
router.get("/list", isLoggedIn, async (req, res, next) => {
  try {
    const listOfProducts = await Product.find();
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
    res.render("product/product-edit", { productToEdit });
  } catch (e) {
    console.log("error to show update product form", e);
    next(e);
  }
});

// IMPORT PRODUCTS
// // POST /products/create
router.post(
  "/import",
  upload.single("product-list"),
  async (req, res) => {
    // console.log(
      // "REQUEST DETAILS OF THE UPLOAD....req.file",
      // req.file,
      // "REQUEST DETAILS OF THE UPLOAD....req.body",
      // req.body
    // );
    const results = [];

    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", async () => {
        try {
          const products = await Product.create(results);
          console.log("THIS IS LIST OF PRODUCTS IMPORTED--------",products)
          res.render("product/product-import", { products });
        } catch (
          e
          // handle error
        ) {
          console.error(e);
          res.status(500).send("Error occurred when create products by imported");
        }
      });
  }
);

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

// DELETE PRODUCT
// // POST /products/:productId/edit
router.get("/:productId/delete", isLoggedIn, async (req, res, next) => {
  try {
    const productId = req.params.productId;
    await Product.findByIdAndDelete(productId);
    res.redirect("/products/list");
  } catch (e) {
    console.log("error to delete a product", e);
    next(e);
  }
});
module.exports = router;
