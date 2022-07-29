import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { checkUser } from "../api.js";

const baseURL = process.env.REACT_APP_API_BASE_URL;

const emptyFormData = {
    email: "",
    password: "",
};

function Login({ setUser, setUserName }) {
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState(emptyFormData);
    const navigate = useNavigate();

    function handleChange(event) {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [event.target.name]: event.target.value,
        }));
    }

    function handleClick(e) {
        e.preventDefault();

        axios
            .post(
                `${baseURL}/api/auth/login`,
                {
                    email: formData.email,
                    password: formData.password,
                },
                {
                    withCredentials: true,
                }
            )
            .then(() => {
                checkUser(setUser, setUserName);
            })
            .then(() => {
                setFormData(emptyFormData);
                navigate("/");
            })
            .catch((err) => {
                setError(err.response.data);
            });
    }

    return (
        <div className="main">
            <h1 className="center-vertically heading">Login</h1>
            <form className="auth-form login-form">
                <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    value={formData.email}
                />
                <input
                    type="text"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    value={formData.password}
                />
                <button type="button" onClick={handleClick}>
                    Login
                </button>
                <div className="auth-switch">
                    <div>Don't have a account:</div>
                    <Link to="/signup">Signup</Link>
                </div>
            </form>

            <div className={`error-box ${error === null ? "no-error" : "error"}`}>
                {error === null ? "Great Going!" : error}
            </div>
        </div>
    );
}

export default Login;
