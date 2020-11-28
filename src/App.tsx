import React, { useContext, useState } from "react"
import { BooksList } from "./components/BooksList/BooksList"
import { SearchContext } from "./context/SearchContext"
import { MainLayout } from "./layouts/MainLayout"
interface Props {}

export const App: React.FC<Props> = ()  => {
    
    const [name, setName] = useState<string>("")
    
    return(
    <SearchContext.Provider value={{name, setName}}> 
        <MainLayout>    
            <BooksList name={name} />
        </MainLayout>
    </SearchContext.Provider>)
}