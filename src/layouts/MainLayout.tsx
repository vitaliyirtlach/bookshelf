import React from "react"
import styles from "@styles/MainLayout.module.scss"

export const MainLayout: React.FC = ({children}) => {
    return( 
    <>
        <header>
            <div>Bookshelf</div>
        </header>
        <div className={styles.container}>
            {children}
        </div>
    </>
)}