import mongoose from "mongoose"
import { User } from "./User"


const BookSchema = new mongoose.Schema({
    name: String,
    plot: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    cover: {
        data: Buffer,
        contentType: String
    }
})

export const Book = mongoose.model("Book", BookSchema) 