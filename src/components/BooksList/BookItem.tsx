import { IBook } from "../../../interfaces/IBook"
import React from "react"
import styles from "@styles/BooksList.module.scss"
import { NavLink } from "react-router-dom"
import { gql, useQuery } from "@apollo/client"
import { fromBufferToImage } from "../../../utils/fromBufferToImage"

interface Props{
    book: IBook
    author: string
}

const GET_BOOK_INFO = gql`
    query GETINFO($id: ID!) {
        getUser(id: $id) {
            username
        }
    }
`

export const BookItem: React.FC<Props> = ({book, author}) => {
    const {data, loading, error} = useQuery(GET_BOOK_INFO, { variables: {id: author} })
    
    if (loading) return <div className={styles.book}> Loading... </div>
    if (error) return <div>Error</div>  
    
    return (
        <div className={styles.book}>
                <div className={styles.cover}>
                    <img src={fromBufferToImage(book.cover.data, book.cover.contentType)} />
                </div>
                <div className={styles.information}>
                    <NavLink className={styles.name} to={`/book/${book.id}`}>{book.name}</NavLink>
                    <NavLink className={styles.author} to={`/author/${author}`}>{data.getUser.username}</NavLink>
                    <div className={styles.plot}>{book.plot}</div>
                </div>
        </div>
    )
}