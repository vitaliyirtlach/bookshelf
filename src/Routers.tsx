import React from "react"
import { Route, Switch } from "react-router-dom"
import { Custom404 } from "./components/404/404"
import { App } from "./App"
import { LoginForm } from "./components/Forms/LoginForm"
import { SignUpForm } from "./components/Forms/SignUpForm"
import { AuthorDetails } from "./components/Details/AuthorDetails"
import { BookDetails } from "./components/Details/BookDetails"
import { Add } from "./components/Add/Add"

interface Props {}

const Routers: React.FC<Props> = () => {
    return (
        <Switch>
            <Route component={App} path="/" exact />
            <Route component={LoginForm} path="/login" exact/>
            <Route component={SignUpForm} path="/signup" exact/>
            <Route component={AuthorDetails} path="/author/:id" exact />
            <Route component={BookDetails} path="/book/:id" exact />
            <Route component={Add} path="/add" exact />
            <Route component={Custom404} />
        </Switch>
    )
}

export { Routers }