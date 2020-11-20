import mongoose from "mongoose"

const schema = new mongoose.Schema({
    name: String,
    plot: String,
    author: String,
    cover: String
})

export const Book = mongoose.model("Book", schema) 