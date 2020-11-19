import React from "react"
import { Link, NavLink } from "react-router-dom"

interface Props {}

export const App: React.FC<Props> = ()  => {
    return <div>
        <NavLink to="/path">test</NavLink>
        Hello World!
    </div>
}