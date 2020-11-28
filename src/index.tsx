import React from "react"
import {render} from "react-dom"
import { BrowserRouter } from "react-router-dom"
import "./index.scss"
import { Routers } from "./Routers"
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client"
import { createUploadLink } from "apollo-upload-client"

const link = createUploadLink({uri: "http://localhost:4000/graphql", credentials: "include"})

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link
});


render(
    <ApolloProvider client={client}>
        <BrowserRouter>
            <Routers />
        </BrowserRouter>
    </ApolloProvider>,
     document.querySelector("#root")
)