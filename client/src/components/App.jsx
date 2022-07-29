import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Home.jsx";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import Navbar from "./Navbar.jsx";
import Logger from "./Logger/Logger.jsx";
import Records from "./Records/Records.jsx";
import Analyser from "./Analyser/Analyser.jsx";
import PrivateRoutes from "./PrivateRoutes.jsx";
import Scheduler from "./Scheduler/Scheduler.jsx";

import { checkUser, setTodoPercentageComplete } from "../api.js";

export default function App() {
    // states and variables

    const [user, setUser] = useState(null);
    const [userName, setUserName] = useState(JSON.parse(localStorage.getItem("userName")) || null);
    const [logs, setLogs] = useState([]);
    const [todos, setTodos] = useState([]);
    const [todosFetched, setTodosFetched] = useState(0);
    const [analytics, setAnalytics] = useState(JSON.parse(localStorage.getItem("analytics")) || []);
    const [month, setMonth] = useState(
        localStorage.getItem("month") ? new Date(localStorage.getItem("month")) : new Date()
    );

    // hooks

    useEffect(() => {
        localStorage.setItem("userName", JSON.stringify(userName));
    }, [userName]);

    useEffect(() => {
        localStorage.setItem("analytics", JSON.stringify(analytics));
    }, [analytics]);

    useEffect(() => {
        localStorage.setItem("month", month.toString());
    }, [month]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => checkUser(setUser, setUserName), []);

    useEffect(() => {
        setTodoPercentageComplete(logs, setTodos);
    }, [logs, todosFetched]);

    // return component

    return (
        <div>
            <BrowserRouter basename={process.env.PUBLIC_URL}>
                <Navbar user={userName} setUser={setUser} setUserName={setUserName} />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route
                        element={
                            <PrivateRoutes
                                user={user}
                                userName={userName}
                                setLogs={setLogs}
                                setTodos={setTodos}
                                setTodosFetched={setTodosFetched}
                            />
                        }
                    >
                        <Route
                            path="/logger"
                            element={
                                <Logger
                                    user={user}
                                    logs={logs}
                                    todos={todos}
                                    month={month}
                                    setLogs={setLogs}
                                    setAnalytics={setAnalytics}
                                />
                            }
                        />
                        <Route
                            path="/scheduler"
                            element={
                                <Scheduler
                                    user={user}
                                    logs={logs}
                                    todos={todos}
                                    month={month}
                                    setTodos={setTodos}
                                    setAnalytics={setAnalytics}
                                    setTodosFetched={setTodosFetched}
                                />
                            }
                        />
                        <Route path="/records" element={<Records user={user} />} />
                        <Route
                            path="/analyse"
                            element={
                                <Analyser
                                    user={user}
                                    month={month}
                                    analytics={analytics}
                                    setMonth={setMonth}
                                    setAnalytics={setAnalytics}
                                />
                            }
                        />
                    </Route>
                    <Route
                        path="/login"
                        element={<Login setUser={setUser} setUserName={setUserName} />}
                    />
                    <Route
                        path="/signup"
                        element={<Signup setUser={setUser} setUserName={setUserName} />}
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}
