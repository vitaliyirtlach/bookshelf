import React from "react"
import { Link } from "react-router-dom"

interface Props {}

export const App: React.FC<Props> = ()  => {
    return <div>
        <Link to="/404">Page is not defined</Link>
        Hello
    </div>
}