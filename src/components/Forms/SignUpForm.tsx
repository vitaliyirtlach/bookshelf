import React from "react"
import styles from "@styles/Form.module.scss"
import { NavLink, useHistory } from "react-router-dom"
import { gql, useMutation } from "@apollo/client"
import { useFormik } from "formik"
import * as Yup from "yup"

const SIGNUP_USER = gql`
    mutation SignUpUser($username: String, $email: String, $password: String) {
        signup(username:$username, email:$email, password:$password) {
            username
            id
        }
    }
`

export const SignUpForm: React.FC = () => {
    const [ signup, { data, error } ] = useMutation( SIGNUP_USER )
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
        },
        validationSchema: Yup.object().shape({
            username: Yup.string()
            .min(2, "Too Short!")
            .max(20, "Too Long!")
            .required("The username is required!"),
            email: Yup.string()
            .email("Invalid email!")
            .required("The email is required!"),
            password: Yup.string()
            .min(6, "Password must be longer than 6 symbols!")
            .max(18, "Password must be less than 18 symbols!")
            .required("The password is required!")
        })
    })
    
    return( 
    <>
    <form onSubmit={form.handleSubmit} className={styles["form"]}>
        <div className={styles["title"]}>Bookshelf</div>
        {form.errors && form.touched ? <pre className={styles.errors}>{JSON.stringify(form.errors, null, 2)}</pre> : null}
        {error ? <div className={styles.errors}>This username or email was registered previous!</div> : null}
        <input name="username" onChange={form.handleChange} value={form.values.username} type="text" className={styles["input-text"]} placeholder="Enter your username" />
        <input name="email" onChange={form.handleChange} value={form.values.email} type="email" className={styles["input-text"]} placeholder="Enter your email" />
        <input name="password" onChange={form.handleChange} value={form.values.password} type="password" className={styles["input-text"]} placeholder="Enter your password" />
        
        <NavLink to="/login" className={styles["note"]}>Do you have an account?</NavLink>
        <button type="submit" className={styles["submit"]}>Sign Up</button>
    </form>
    </>)
}