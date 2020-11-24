import React from "react"
import {render} from "react-dom"
import { BrowserRouter } from "react-router-dom"
import "./index.scss"
import { Routers } from "./Routers"
import {ApolloClient, ApolloProvider, createHttpLink, InMemoryCache} from "@apollo/client"
import {setContext} from "@apollo/client/link/context"

const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: 'http://localhost:4000/graphql',
    credentials: "include"
});

render(
    <ApolloProvider client={client}>
        <BrowserRouter>
            <Routers />
        </BrowserRouter>
    </ApolloProvider>,
     document.querySelector("#root")
)