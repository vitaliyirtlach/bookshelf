import React from "react"
import { Link, useParams } from "react-router-dom"
import { MainLayout } from "../../layouts/MainLayout"
import { gql, useQuery } from "@apollo/client"
import { IBook } from "interfaces/IBook"
import { MainLoader } from "../Loaders/MainLoader"
import { fromBufferToImage } from "../../../utils/fromBufferToImage"
import styles from "@styles/BookDetails.module.scss"
import getUser from "../../../graphql/getUser.gql"
import { IUser } from "interfaces/IUser"

const GET_BOOK_QUERY = gql`
    query GETBOOK($id: ID!){
        getBook(id:$id) {
            name
            author
            cover{
                data
                contentType
            }
            plot
        }
    }
`

interface BookDetailsData {
    getBook: IBook
}

interface UserData {
    getUser: IUser
}


export const BookDetails: React.FC = () => {
    const { id }: any = useParams()
    const {data, loading, error} = useQuery<BookDetailsData>(GET_BOOK_QUERY, { variables: { id }})
    const Author = useQuery<UserData>(getUser, { variables: { id: data?.getBook.author } })
    if (error && Author.error) return <div>Something went wrong!</div>
    if (loading || Author.loading) return <MainLoader />

    const cover = fromBufferToImage(   
        data?.getBook.cover.data as Buffer, 
        data?.getBook.cover.contentType as string   
    )
    
    return (
    <MainLayout>
        <div className={styles.wrapper}>
            <div className={styles.details}>
                <img className={styles.cover} src={cover} />
                <div className={styles.info}>
                    <div>Name: {data?.getBook.name}</div>
                    <div>Author: <Link to={`/author/${data?.getBook.author}`}>{Author.data?.getUser.username}</Link> </div>
                    <div>Plot: {data?.getBook.plot}</div>
                </div>           
            </div>
        </div>
    </MainLayout>)
}


