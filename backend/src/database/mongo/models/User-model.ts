import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name is required"]
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "password is required"]
    },
    emailValidated: {
        type: Boolean,
        default: false,
    },
    img: {
        type: String,
    }
})

export const UserModel = mongoose.model("User", UserSchema)