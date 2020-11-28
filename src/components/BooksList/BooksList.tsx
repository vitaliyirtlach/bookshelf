import { gql, useQuery } from "@apollo/client"
import { IBook } from "../../../interfaces/IBook"
import React from "react"
import { MainLoader } from "../Loaders/MainLoader"
import { BookItem } from "./BookItem"

interface Props {
    name?: string | null,
    author?: string | null
}

interface BooksData {
    getBooks: [IBook]
}

const BOOKS = gql`
    query {
	    getBooks {
            name
            author
            cover {
                data
                contentType
            }
            plot
            id
        }
    }   
`

const BOOKS_BY_PARAMETRS = gql`
    query GETBOOKS($name: String, $author: String) {
        getBooks(name: $name, author: $author) {
            name
            author
            cover {
                data
                contentType
            }
            plot
            id
        }
    } 
`


export const BooksList: React.FC<Props> = ({author, name}) => {
    const QUERY =  author || name ? BOOKS_BY_PARAMETRS : BOOKS 

    const {data, loading, error} = useQuery<BooksData>(QUERY, {
        variables: { author, name },
        fetchPolicy: "cache-first",
        pollInterval: 500
    })
    
    if (loading) return <MainLoader />
    if (error) return <div>Something went wrong</div>

    return (
    <>
    {data?.getBooks.length ? 
    data?.getBooks.map(book => <BookItem author={book.author} key={book.id} book={book}/> ) :
    <div>Nothing was found</div>}
    </>)
}