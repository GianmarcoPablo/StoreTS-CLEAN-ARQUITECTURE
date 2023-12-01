import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        default: 0
    },
    description: {
        type: String
    },
    img:
    {
        type: String
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    is_active: {
        type: Boolean,
        default: true
    },
    outstanding: {
        type: Boolean,
        default: false
    },
    coupons: [{
        code: {
            type: String,
        },
        discount: {
            type: Number,
        },
        expire_date: {
            type: Date,
        },
        is_active: {
            type: Boolean,
            default: true
        },
    }]
})

export const ProductModel = mongoose.model("Product", ProductSchema);

