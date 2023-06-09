const { mongoose, Schema, model} = require("mongoose");

const ProductSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        stock: {
            type: Number,
            required: true,
        },
        img: {
            type: String,
            required: true,
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
            } 
        }
    },
    {
        timestamps: true
    }
);
const Product = model("Product", productSchema);

module.exports = Product;
