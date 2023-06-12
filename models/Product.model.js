const { mongoose, Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      
    },
    ref: {
      type: String,
      required: true,
      unique: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      default: "/images/no-image.jpg",
    },
    location: {
      row: {
        type: String,
      },
      lane: {
        type: String,
      },
      shelf: {
        type: String,
      },
    },
    category: {
      type: String,
      default: "Uncategorized",
    },
    keywords: [String],

    manufacture: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);
const Product = model("Product", productSchema);

module.exports = Product;
