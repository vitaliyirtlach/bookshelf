import React, { useEffect } from "react"
import { BooksList } from "./components/BooksList/BooksList"
import { MainLayout } from "./layouts/MainLayout"
interface Props {}

export const App: React.FC<Props> = ()  => {
    return( 
    <MainLayout>    
        <BooksList />
    </MainLayout>)
}