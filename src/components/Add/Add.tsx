import { gql, useMutation } from "@apollo/client"
import { useFormik } from "formik"
import React, { useState } from "react"
import { MainLayout } from "../../layouts/MainLayout"
import * as Yup from "yup"
import { useHistory } from "react-router-dom"



const ADD_BOOK = gql`
    mutation ADDBOOK($name: String!, $plot: String!, $cover: Upload!) {
        createBook(name: $name, plot: $plot, cover: $cover) {
            cover {
                data
                contentType
            }
            name
            author
            plot
            id
        }
    }
`
export const Add: React.FC = ({}) => {
    const history = useHistory()
    const [ addBook, {error} ] = useMutation(ADD_BOOK)
    const [cover, setCover] = useState<any>(null)

    const form = useFormik({
        initialValues: {
            name: "",
            plot: "",
        }, 
        onSubmit({name, plot}) { 
            console.log(cover)
            addBook({ variables: { name, plot, cover } })
            history.push("/")
         },
        validationSchema: Yup.object().shape({
            name: Yup.string().required("Book name is required!"),
            plot: Yup.string()
            .min(50, "The length of plot must be longer than 50 symbols!")
            .max(500, "Plot length must be less than 500 characters!")
            .required("The plot is required!")
        })
    })

    return (
    <MainLayout> 
        <form onSubmit={form.handleSubmit}>
            <h2>Add new book</h2>
            {form.errors ? <div>{JSON.stringify(form.errors, null, 2)}</div> : null}
            
            <input type="file" onChange={(e) => setCover(e.target.files?.[0])}/>
            <input type="text" onChange={form.handleChange} name="name" />
            <input type="text" onChange={form.handleChange} name="plot" />

            <button type="submit">Add book!</button>
        </form>
    </MainLayout>)
} 