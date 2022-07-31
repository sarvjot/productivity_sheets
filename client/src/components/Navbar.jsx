import axios from "axios";
import React, { useState } from "react";
import { nanoid } from "nanoid";
import { Link, useLocation } from "react-router-dom";

import { checkUser } from "../api.js";

import hamburg from "../images/hamburg.svg";
import "../styles/navbar.css";

const baseURL = process.env.REACT_APP_API_BASE_URL;

export default function Navbar({ userName, setUserName }) {
    const [navExpanded, setNavExpanded] = useState(false);

    const location = useLocation();

    const routes = ["", "scheduler", "logger", "records", "analyse"];
    const pages = ["Home", "Schedule", "Log", "Records", "Analyse"];

    const pageElements = routes.map((route, index) => (
        <Link
            to={`/${route}`}
            key={nanoid()}
            className={`nav-element ${location.pathname === `/${route}` ? "selected-nav" : ""}`}
        >
            {pages[index]}
        </Link>
    ));

    function handleClick() {
        setNavExpanded((p) => !p);
    }

    function handleLogout() {
        axios
            .post(`${baseURL}/api/auth/logout`, {
                withCredentials: true,
            })
            .then(() => {
                checkUser(setUserName);
            })
            .then(() => {
                localStorage.clear();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <div className="nav-container">
            <button className="hamburg" type="button" onClick={handleClick}>
                <img src={hamburg} alt="" />
            </button>

            <nav className={navExpanded ? "expanded" : ""}>
                <div className="nav-block nav-left">{pageElements}</div>
                <div className="nav-block nav-right">
                    {userName === null ? (
                        <>
                            <div className="nav-element">
                                <Link to="/login">Login</Link>
                            </div>
                            <div className="nav-element">
                                <Link to="/signup">Signup</Link>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="nav-element">
                                {userName.charAt(0).toUpperCase() + userName.slice(1)}
                            </div>
                            <div className="nav-element">
                                <button
                                    className="logout-button"
                                    onClick={handleLogout}
                                    type="button"
                                >
                                    Logout
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </nav>
        </div>
    );
}
