import axios from "axios";
import React from "react";
import { nanoid } from "nanoid";
import { Link, useLocation } from "react-router-dom";

import { checkUser } from "../api.js";

import "../styles/navbar.css";

const baseURL = process.env.REACT_APP_API_BASE_URL;

export default function Navbar({ user, setUser, setUserName }) {
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

    function handleLogout() {
        axios
            .post(`${baseURL}/api/auth/logout`)
            .then(() => {
                checkUser(setUser, setUserName);
            })
            .catch((err) => {
                console.log(err);
                // setError(err.response.data);
            });
    }

    return (
        <nav>
            <div className="nav-block nav-left">{pageElements}</div>
            {user === null ? (
                <div className="nav-block nav-right">
                    <div className="nav-element">
                        <Link to="/login">Login</Link>
                    </div>
                    <div className="nav-element">
                        <Link to="/signup">Signup</Link>
                    </div>
                </div>
            ) : (
                <div className="nav-block nav-right">
                    <div className="nav-element">
                        {user.charAt(0).toUpperCase() + user.slice(1)}
                    </div>
                    <button type="button" className="nav-element" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            )}
        </nav>
    );
}
