import React from "react"
import {render} from "react-dom"
import { BrowserRouter } from "react-router-dom"
import "./index.scss"
import { Routers } from "./Routers"

const container = document.querySelector("#root")

render(
    <BrowserRouter>
        <Routers />
    </BrowserRouter>,
    container
)