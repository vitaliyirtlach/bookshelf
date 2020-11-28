import React from "react"
import styles from "@styles/404.module.scss"
import { Link } from "react-router-dom"

export const Custom404: React.FC<any> = () => {
    return <div className={styles["container"]}>
        <div>
            <h1>404</h1>
            <div>Page not found :(</div>
            <Link to="/">Back to home</Link>
        </div>
    </div>
}

