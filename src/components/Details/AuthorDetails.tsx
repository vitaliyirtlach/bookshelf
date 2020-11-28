import { gql, useQuery } from "@apollo/client"
import React from "react"
import { useParams } from "react-router-dom"
import { MainLayout } from "../../layouts/MainLayout"
import { BooksList } from "../BooksList/BooksList"
import { MainLoader } from "../Loaders/MainLoader"


const GET_AUTHOR = gql`
    # For user information like: username and list
    query GET_AUTHOR_INFO($id: ID!) {
        getUser(id: $id) {
            username
            email
        }
    }

`
export const AuthorDetails: React.FC = () => {
    const { id }: any = useParams()
    const { data, loading, error } = useQuery(GET_AUTHOR, {
        variables: { id }
    })
    if (loading) return <MainLoader />
    if (error) return <div>Something went wrong</div>
    
    return  (
    <MainLayout>
        <div>
            <div>Books of the user {data.getUser.username}</div>
            <div>Email: {data.getUser.email}</div>
        </div>
        <BooksList author={id} />
    </MainLayout>)
}