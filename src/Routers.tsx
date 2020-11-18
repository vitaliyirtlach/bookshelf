import React from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import { Custom404 } from "./404"
import { App } from "./App"

interface Props {}

const Routers: React.FC<Props> = () => {
    return (
        <Switch>
            <Route component={App} path="/" exact/>
            <Route component={Custom404} path="*"  />
        </Switch>
    )
}

export { Routers }