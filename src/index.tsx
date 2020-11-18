import React from "react"
import {render} from "react-dom"
import { BrowserRouter } from "react-router-dom"
import "./index.scss"
import { Routers } from "./Routers"

render(
    <BrowserRouter>
        <Routers />
    </BrowserRouter>,
    document.querySelector("#root")
)