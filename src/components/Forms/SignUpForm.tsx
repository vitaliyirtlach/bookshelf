import React from "react"
import styles from "@styles/Form.module.scss"
import { NavLink } from "react-router-dom"

export const SignUpForm: React.FC = () => {
    return( 
    <>
    <form className={styles["form"]}>
        <div className={styles["title"]}>Bookshelf</div>
        <input type="text" className={styles["input-text"]} placeholder="Enter your username" />
        <input type="text" className={styles["input-text"]} placeholder="Enter your email" />
        <input type="password" className={styles["input-text"]} placeholder="Enter your password" />
        <NavLink to="/login" className={styles["note"]}>Do you have an account?</NavLink>
        <button className={styles["submit"]}>Sign Up</button>
    </form>
    </>)
}