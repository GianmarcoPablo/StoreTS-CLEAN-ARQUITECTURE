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
    img: {
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
    coupons: [
        {
            code: { type: String, required: true, unique: true }, // Coupon code
            discount: { type: Number, required: true }, // Discount percentage or amount
            isActive: { type: Boolean, default: true }, // Indicates if the coupon is currently active
            expirationDate: { type: Date }, // Coupon expiration date
        },
    ],
})

export const ProductModel = mongoose.model("Product", ProductSchema);

