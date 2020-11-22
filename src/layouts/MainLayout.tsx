import React, { Suspense } from "react"
import styles from "@styles/MainLayout.module.scss"
import { NavLink, Redirect } from "react-router-dom"
import { gql, useQuery } from "@apollo/client"
import { MainLoader } from "../components/Loaders/MainLoader"

const AUTH = gql`
    query {
        me {
            username
            id
            email
            books {
                name
                plot
                author
                id
                cover
            }
        }
    }
`
export const MainLayout: React.FC = ({children}) => {
    const {data} = useQuery(AUTH) 
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