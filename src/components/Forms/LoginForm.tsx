import React from "react"
import styles from "@styles/Form.module.scss"
import { NavLink, Redirect, useHistory } from "react-router-dom"
import {useFormik} from "formik"
import { gql, useMutation } from "@apollo/client"
import * as Yup from "yup"

const LOGIN_USER = gql`
    mutation LoginUser($email: String!, $password: String!) {
        login(email:$email, password:$password) {
            username
            id
        }   
    }
`

export const LoginForm: React.FC = () => {
    const [ login, {error, data} ] = useMutation( LOGIN_USER )
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
        },
        validationSchema: Yup.object().shape({
            email: Yup.string()
            .email("Invalid email!")
            .required("The email is required!"),
            password: Yup.string()
            .min(6, "Password must be longer than 6 symbols!")
            .max(18, "Password must be less than 18 symbols!")
            .required("The password is required!")
        })
    })
    if (data?.login) return <Redirect to="/" />
    return(
    <>
    <form onSubmit={form.handleSubmit} className={styles.form}>
        <div className={styles["title"]}>Bookshelf</div>
        {form.errors && form.touched ? <div className={styles.errors}>{JSON.stringify(form.errors, null, 2)}</div> : null}
        {error ? <div className={styles.errors}>Invalid password or email address</div> : null}
        
        <input name="email" value={form.values.email} onChange={form.handleChange} type="text" className={styles["input-text"]} placeholder="Enter your email" />
        <input name="password" value={form.values.password} onChange={form.handleChange} type="password" className={styles["input-text"]} placeholder="Enter your password" />
        
        <NavLink to="/signup" className={styles["note"]}>You don't have an account?</NavLink>
        <button type="submit" className={styles["submit"]}>Login</button>
    </form>
    </>)
}