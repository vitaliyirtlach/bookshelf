import mongoose from "mongoose"

const BookSchema = new mongoose.Schema({
    name: String,
    plot: String,
    author: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    cover: String
})

export const Book = mongoose.model("Book", BookSchema) 