import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { nanoid } from 'nanoid'

export default function Navbar() {
    const location = useLocation()

    const routes = ['', 'analyse', 'logger', 'scheduler', 'records']
    const pages = ['Home', 'Analyse', 'Log', 'Schedule', 'Records']
    const pageElements = routes.map((route, index) => (
        <Link
            to={`/${route}`}
            key={nanoid()}
            className={`nav-element ${location.pathname === `/${route}` ? 'selected-nav' : ''}`}
        >
            {pages[index]}
        </Link>
    ))

    return (
        <nav>
            <div className="nav-block nav-left">{pageElements}</div>
            <div className="nav-block nav-right">
                <div className="nav-element">{new Date().toDateString()}</div>
                <div className="nav-element">Login/Logout</div>
            </div>
        </nav>
    )
}
