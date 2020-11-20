import React from "react"
import {render} from "react-dom"
import { BrowserRouter } from "react-router-dom"
import "./index.scss"
import { Routers } from "./Routers"
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client"

const client = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    cache: new InMemoryCache()
})
render(
    <ApolloProvider client={client}>
        <BrowserRouter>
            <Routers />
        </BrowserRouter>
    </ApolloProvider>,
     document.querySelector("#root")
)