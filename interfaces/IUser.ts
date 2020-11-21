import { IBook } from "./IBook";

export interface IUser {
    username: string
    email: string
    id: string
    books: Array<IBook>
}