import React, { Suspense } from "react"
import styles from "@styles/MainLayout.module.scss"
import { NavLink, Redirect } from "react-router-dom"
import { gql, useQuery } from "@apollo/client"
import { MainLoader } from "../components/Loaders/MainLoader"

const AUTH = gql`
    query CurrentUserForLayout  {
        me {
          username
          id
          email
        }
    }
`
export const MainLayout: React.FC = ({children}) => {
    const {data, loading, error} = useQuery(AUTH, {
        fetchPolicy: "cache-first", 
    }) 

    if (loading) return <div>Loading</div>
    if (error) return <div>Something went wrong</div>
    if (!data?.me) {
        return <Redirect to="/signup" />
    }
    return( 
    <Suspense fallback={<MainLoader />}>
        <header>
            <div>Bookshelf</div>
            <input type="text" placeholder="Search a book"/>
            <div>
                <NavLink to="/signup">Sign Up</NavLink>
                <NavLink to="/login">Login</NavLink>
            </div>
        </header>
        <div className={styles.container}>
            {children}
        </div>
    </Suspense>
)}