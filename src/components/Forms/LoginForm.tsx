import React from "react"
import styles from "@styles/Form.module.scss"
import { NavLink } from "react-router-dom"

export const LoginForm: React.FC = () => {
    return(
    <>
    <form className={styles.form}>
        <div className={styles["title"]}>Bookshelf</div>
        <input type="text" className={styles["input-text"]} placeholder="Enter your email" />
        <input type="password" className={styles["input-text"]} placeholder="Enter your password" />
        <NavLink to="/signup" className={styles["note"]}>You don't have an account?</NavLink>
        <button className={styles["submit"]}>Login</button>
    </form>
    </>)
}