import React from "react"
import styles from "@styles/Form.module.scss"
import { NavLink, useHistory } from "react-router-dom"
import { gql, useMutation } from "@apollo/client"
import { useFormik } from "formik"


const SIGNUP_USER = gql`
    mutation SignUpUser($username: String, $email: String, $password: String) {
        signup(username:$username, email:$email, password:$password) {
            username
            id
        }
    }
`

export const SignUpForm: React.FC = () => {
    const [ signup ] = useMutation( SIGNUP_USER )
    const routing = useHistory()
    const form = useFormik({
        initialValues: {
            email: "",
            username: "",
            password: "",
        },
        onSubmit: async ({email, password, username}) => {
            const res = await signup({variables: { email, password, username }})
            if (res.data) {
                routing.push("/")
            }
        }
    })
    return( 
    <>
    <form onSubmit={form.handleSubmit} className={styles["form"]}>
        <div className={styles["title"]}>Bookshelf</div>
        
        <input name="username" onChange={form.handleChange} value={form.values.username} type="text" className={styles["input-text"]} placeholder="Enter your username" />
        <input name="email" onChange={form.handleChange} value={form.values.email} type="text" className={styles["input-text"]} placeholder="Enter your email" />
        <input name="password" onChange={form.handleChange} value={form.values.password} type="password" className={styles["input-text"]} placeholder="Enter your password" />
        
        <NavLink to="/login" className={styles["note"]}>Do you have an account?</NavLink>
        <button type="submit" className={styles["submit"]}>Sign Up</button>
    </form>
    </>)
}