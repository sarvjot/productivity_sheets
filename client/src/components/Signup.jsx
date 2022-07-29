import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { checkUser } from "../api.js";

const baseURL = process.env.REACT_APP_API_BASE_URL;

const emptyFormData = {
    userName: "",
    email: "",
    password: "",
};

function Signup({ setUser, setUserName }) {
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
                `${baseURL}/api/auth/signup`,
                {
                    userName: formData.userName,
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
            <h1 className="center-vertically heading">Signup</h1>
            <form className="auth-form signup-form">
                <input
                    type="text"
                    name="userName"
                    placeholder="Username"
                    onChange={handleChange}
                    value={formData.userName}
                />
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
                <button type="submit" onClick={handleClick}>
                    Signup
                </button>
                <div className="auth-switch">
                    <div>Already have account:</div>
                    <Link to="/login">Login</Link>
                </div>
            </form>

            <div className={`error-box ${error === null ? "no-error" : "error"}`}>
                {error === null ? "Great Going!" : error}
            </div>
        </div>
    );
}

export default Signup;
