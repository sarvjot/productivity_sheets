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
import { checkUser, setPerf, calcPerfAndPost } from "../api.js";

export default function App() {
    // states and variables

    const [logs, setLogs] = useState([]);
    const [todos, setTodos] = useState([]);
    const [serverFetched, setServerFetched] = useState(0);
    const [userName, setUserName] = useState(JSON.parse(localStorage.getItem("userName")) || null);

    // hooks

    useEffect(() => {
        localStorage.setItem("userName", JSON.stringify(userName));
    }, [userName]);

    useEffect(() => {
        setPerf(logs, setTodos, calcPerfAndPost);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [serverFetched]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => checkUser(setUserName), []);

    // return component

    return (
        <div>
            <BrowserRouter basename={process.env.PUBLIC_URL}>
                <Navbar userName={userName} setUserName={setUserName} />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route
                        element={
                            <PrivateRoutes
                                userName={userName}
                                setTodos={setTodos}
                                setLogs={setLogs}
                                setServerFetched={setServerFetched}
                            />
                        }
                    >
                        <Route
                            path="/logger"
                            element={
                                <Logger
                                    logs={logs}
                                    todos={todos}
                                    setLogs={setLogs}
                                    setServerFetched={setServerFetched}
                                />
                            }
                        />
                        <Route
                            path="/scheduler"
                            element={
                                <Scheduler
                                    logs={logs}
                                    todos={todos}
                                    setTodos={setTodos}
                                    setServerFetched={setServerFetched}
                                />
                            }
                        />
                        <Route path="/records" element={<Records />} />
                        <Route path="/analyse" element={<Analyser />} />
                    </Route>
                    <Route path="/login" element={<Login setUserName={setUserName} />} />
                    <Route path="/signup" element={<Signup setUserName={setUserName} />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}
