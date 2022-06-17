import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { nanoid } from 'nanoid'
import CurDate from './CurDate'

export default function Navbar() {
    const location = useLocation()

    const pages = ['', 'Logger', 'Scheduler']
    const pageElements = pages.map((page) => (
        <Link
            to={`/${page}`}
            key={nanoid()}
            className={`${location.pathname === `/${page}` ? 'selected' : ''}`}
        >
            {page === '' ? 'Home' : page}
        </Link>
    ))

    const home = pageElements[0]
    const others = pageElements.slice(1)

    return (
        <header>
            <div className="link-container-1">{home}</div>
            <div className="link-container-2">{others}</div>
            <CurDate />
        </header>
    )
}
