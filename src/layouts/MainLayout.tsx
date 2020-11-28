import React, { Suspense, useContext, useState, KeyboardEvent } from "react"
import styles from "@styles/MainLayout.module.scss"
import { NavLink, Redirect } from "react-router-dom"
import { gql, useQuery } from "@apollo/client"
import { MainLoader } from "../components/Loaders/MainLoader"
import { SearchContext } from "../context/SearchContext"

const AUTH = gql`
    query CurrentUserForLayout  {
        me {
            username
		    id
        }
    }
`
export const MainLayout: React.FC = ({ children }) => {
    const {name, setName} = useContext(SearchContext)
    const [bookName, setBookName] = useState<string>(name)
    const submitHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            setName(bookName)
        }
    }
    
    const {data, loading, error} = useQuery(AUTH) 
    console.log(`
        Error: ${error},
        Data: ${data}
    `)
    if (loading) return <MainLoader />
    if (error) return <div>Something went wrong</div>
    if (!data?.me) return <Redirect to="/signup" />
    
    return( 
    <Suspense fallback={<MainLoader />}>
        <header>
            <NavLink to="/">Bookshelf</NavLink>
            <input type="text" value={bookName}
            onKeyPress={submitHandler} 
            onChange={(e) => setBookName(e.target.value)} 
            placeholder="Search a book"
            />
            <div className={styles["header-list"]}>
                {data.me ? 
                <>
                    <NavLink to={`/author/${data.me.id}`}>My books</NavLink>
                    <NavLink to="/add">Add</NavLink>
                    <div>{data.me.username}</div>
                </> : 
                <>
                    <NavLink to="/signup">Sign Up</NavLink>
                    <NavLink to="/login">Login</NavLink>
                </>}
            </div>
        </header>
        <div className={styles.container}>
            {children}
        </div>
    </Suspense>
)}