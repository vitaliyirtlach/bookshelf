import mongoose from "mongoose"

const BookSchema = new mongoose.Schema({
    name: String,
    plot: String,
    author: String,
    cover: String
})

export const Book = mongoose.model("Book", BookSchema) 