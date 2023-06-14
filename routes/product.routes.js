const fs = require("fs");
const mongoose = require("mongoose");
const csv = require("csv-parser");
const express = require("express");
const fileUploader = require("../config/cloudinary.config");
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
  const { name, ref, stock, image, category, keywords, manufacturer } =
    req.body;
  const location = {
    row: req.body.row,
    lane: req.body.lane,
    shelf: req.body.shelf,
  };

  //Validate if all required fields are provided
  if (!name || !ref || !stock || !manufacturer) {
    res.render("product/product-create", {
      errorMessage: "All fields (*) are mandatory.",
    });
    return;
  }

  try {
    await Product.create({
      name,
      ref,
      stock,
      image,
      location,
      category,
      keywords,
      manufacturer,
    });
    res.redirect("/products/list");
  } catch (e) {
    console.log("error to post request when creating new product", e);
    if (e instanceof mongoose.Error.ValidationError) {
      console.log("this is a mongoose validator error");
      res
        .status(400)
        .render("product/product-create", { errorMessage: e.message });
    } else if (e.code === 11000) {
      res.status(400).render("product/product-create", {
        errorMessage: "Product Reference needs to be unique.",
      });
    } else {
      console.log("this is NOT a mongoose validator error");
      next(e);
    }
  }
});

// IMPORT PRODUCTS
// // POST /products/create
router.post("/import", upload.single("product-list"), async (req, res) => {
  // console.log(
  // "REQUEST DETAILS OF THE UPLOAD....req.file",
  // req.file,
  // "REQUEST DETAILS OF THE UPLOAD....req.body",
  // req.body
  // );
  const results = [];
  if (!req.file) {
    res.render("product/product-create", {
      errorMessage: "No file was uploaded.",
    });
    return;
  }
  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on("data", (data) => {
      // Check if all required fields exist in the data row
      if (!data.name || !data.ref || !data.stock) {
        res.render("product/product-create", {
          errorMessage:
            "Product Name, Product Ref., and Stock are mandatory fields.",
        });
        return;
      }

      results.push(data);
    })
    .on("end", async () => {
      // Check if any data is present
      if (results.length === 0) {
        res.render("product/product-create", {
          errorMessage: "The uploaded CSV file is empty.",
        });
        return;
      }
      try {
        const products = await Product.create(results);
        res.render("product/product-import", { products });
      } catch (
        e
        // handle error
      ) {
        console.log("error when creating new product by importing from csv", e);
        if (e instanceof mongoose.Error.ValidationError) {
          console.log("this is a mongoose validator error");
          res
            .status(400)
            .render("product/product-create", { errorMessage: e.message });
        } else if (e.code === 11000) {
          res.status(400).render("product/product-create", {
            errorMessage: "Product Reference needs to be unique.",
          });
        } else {
          console.log("this is NOT a mongoose validator error");
          next(e);
        }
      }
    });
});

// EDIT PRODUCT
// // GET /products/:productId/edit
router.get("/:productId/edit", isLoggedIn, async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const productToEdit = await Product.findById(productId);
    console.log("productToEdit.id", productToEdit.id);
    res.render("product/product-edit", { productToEdit });
  } catch (e) {
    console.log("error to show update product form", e);
    next(e);
  }
});
// // POST /products/:productId/edit
router.post("/:productId/edit", isLoggedIn, async (req, res, next) => {
  const productId = req.params.productId;
  const {
    name,
    ref,
    stock,
    image,
    category,
    keywords,
    manufacturer,
    "location.row": row,
    "location.lane": lane,
    "location.shelf": shelf,
  } = req.body;

  try {
    if (!name || !ref || !stock || !manufacturer) {
      res.render("product/product-edit", {
        productToEdit: {
          name,
          ref,
          stock,
          image,
          category,
          keywords,
          manufacturer,
          id: productId,
        },
        errorMessage: "All fields (*) are mandatory.",
      });
      return;
    }
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        name,
        ref,
        stock,
        image,
        row,
        lane,
        shelf,
        category,
        keywords,
        manufacturer,
      },
      { new: true }
    );
    res.redirect("/products/list");
  } catch (e) {
    console.log("error when editing product with the post request", e);
    if (e instanceof mongoose.Error.ValidationError) {
      console.log("this is a mongoose validator error");
      res.status(400).render("product/product-edit", {
        productToEdit: {
          name,
          ref,
          stock,
          image,
          category,
          keywords,
          manufacturer,
          id: productId,
        },
        errorMessage: e.message,
      });
    } else if (e.code === 11000) {
      res.status(400).render("product/product-edit", {
        productToEdit: {
          name,
          ref,
          stock,
          image,
          category,
          keywords,
          manufacturer,
          id: productId,
        },
        errorMessage: "Product Reference needs to be unique.",
      });
    } else {
      console.log("this is NOT a mongoose validator error");
      next(e);
    }
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

// SHOW PRODUCT DETAILS
// // GET /products/:productId
router.get("/:productId", isLoggedIn, async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const productToView = await Product.findById(productId);
    res.render("product/product-details", { productToView });
  } catch (e) {
    console.log("error to show product details", e);
    next(e);
  }
});

module.exports = router;

//Search with filters

router.post("/search", isLoggedIn, async (req, res, next) => {
  console.log("route called");
  try {
    //building the query in JSON format
    const { filter, input } = req.body;

    const query = {};
    query[filter] = { $regex: new RegExp(input, "i") }; //regex to make it case insensitive

    console.log("query: ", query);
    const listOfProducts = await Product.find(query);
    console.log("product list: ", listOfProducts);

    res.render("product/product-list", { listOfProducts });
  } catch (error) {
    console.log(error);
    
    next(error);
  }
});
