import React from "react"

export const SearchContext = React.createContext({
    name: "",
    setName: (newName: string) => {}
})