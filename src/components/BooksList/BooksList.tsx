import { gql, useQuery } from "@apollo/client"
import { IBook } from "interfaces/IBook"
import React from "react"
import styles from "@styles/BooksList.module.scss"
import { NavLink } from "react-router-dom"

interface Props {
    author?: string
    name?: string  
}

interface BooksData {
    listOfBooks: [IBook]
}

const LIST_QUERY = gql`
    query {   
        listOfBooks{
            name
            id
            author
            cover
            plot
        }
    }
`

export const BooksList: React.FC<Props> = ({}) => {
    const {data, loading, error} = useQuery<BooksData>(LIST_QUERY, {
        fetchPolicy: "cache-first",
    })

    if (loading) return <div>Loading...</div>
    if (error) return <div>Something went wrong</div>

    return (
    <>
    {data?.listOfBooks.map(book => (
            <div key={book.id} className={styles.book}>
                <div className={styles.cover}>
                    <img src={book.cover} />
                </div>
                <div className={styles.information}>
                    <NavLink className={styles.name} to={`/${book.name}`}>{book.name}</NavLink>
                    <div className={styles.author}>{book.author}</div>
                    <div className={styles.plot}>{book.plot}</div>
                </div>
            </div>
        ))}
    </>)
}