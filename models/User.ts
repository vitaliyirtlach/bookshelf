import { Schema, model, Types} from "mongoose"

const UserSchema = new Schema ({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    books: [{
        type: Types.ObjectId,
        ref: "Book"
    }],
    cover: String
})

export const User = model("User", UserSchema)