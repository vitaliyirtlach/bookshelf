import React from "react"
import { Route, Switch } from "react-router-dom"
import { Custom404 } from "./components/404/404"
import { App } from "./App"

interface Props {}

const Routers: React.FC<Props> = () => {
    return (
        <Switch>
            <Route component={App} path="/" exact/>
            <Route component={Custom404} />
        </Switch>
    )
}

export { Routers }