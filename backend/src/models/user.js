import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    googleId: {
        type: String
    },
    mobileNumber: {
        type: String
    },
    role: {
        type: String,
        enum: ['visitor', 'admin'],
        default: 'visitor'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export const User = mongoose.model("User", userSchema);