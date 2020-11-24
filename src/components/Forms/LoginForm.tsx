import React from "react"
import styles from "@styles/Form.module.scss"
import { NavLink, useHistory } from "react-router-dom"
import {useFormik} from "formik"
import { gql, useMutation } from "@apollo/client"

const LOGIN_USER = gql`
    mutation LoginUser($email: String!, $password: String!) {
        login(email:$email, password:$password) {
            username
            id
        }   
    }
`

export const LoginForm: React.FC = () => {
    const [ login ] = useMutation( LOGIN_USER )
    const routing = useHistory()
    const form = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        onSubmit: async ({email, password}) => {
            const res = await login({variables: { email, password }})
            if (res.data) {
                routing.push("/")
            }
        }
    })

    return(
    <>
    <form onSubmit={form.handleSubmit} className={styles.form}>
        <div className={styles["title"]}>Bookshelf</div>
        <input name="email" value={form.values.email} onChange={form.handleChange} type="text" className={styles["input-text"]} placeholder="Enter your email" />
        <input name="password" value={form.values.password} onChange={form.handleChange} type="password" className={styles["input-text"]} placeholder="Enter your password" />
        
        <NavLink to="/signup" className={styles["note"]}>You don't have an account?</NavLink>
        <button type="submit" className={styles["submit"]}>Login</button>
    </form>
    </>)
}