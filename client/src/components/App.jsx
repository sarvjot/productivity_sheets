import axios from "axios";
import React, { useEffect, useCallback } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Home.jsx";
import Navbar from "./Navbar.jsx";
import Logger from "./Logger/Logger.jsx";
import Scheduler from "./Scheduler/Scheduler.jsx";

const baseURL = "http://localhost:5000";

function timeInMinutes(t1, t2) {
    return (t2.hour - t1.hour) * 60 + (t2.minute - t1.minute);
}

function givePercentageComplete(type, time, logs) {
    let percentageComplete = 0;

    logs.forEach((log) => {
        if (log.type === type) {
            percentageComplete += timeInMinutes(log.startTime, log.endTime);
        }
    });

    percentageComplete = (percentageComplete / time) * 100;
    percentageComplete = Math.round(Math.min(100, percentageComplete));

    return percentageComplete.toString();
}

export default function App() {
    const [todos, setTodos] = React.useState([]);
    const [logs, setLogs] = React.useState([]);
    const [todosUpdated, setTodosUpdated] = React.useState(0);

    const getTodosFromServer = () => {
        axios
            .get(`${baseURL}/api/todos`)
            .then((res) => {
                const todosFromServer = [];
                res.data.forEach((todoFromServer) => {
                    todosFromServer.push({
                        type: todoFromServer.type,
                        time: todoFromServer.time,
                        percentageComplete: "0",
                        // eslint-disable-next-line no-underscore-dangle
                        id: todoFromServer._id,
                    });
                });
                setTodos(todosFromServer);
            })
            .then(() => {
                setTodosUpdated((prevTodosUpdated) => prevTodosUpdated + 1);
            })
            .catch((e) => console.log(e));
    };

    const getLogsFromServer = () => {
        axios
            .get(`${baseURL}/api/logs`)
            .then((res) => {
                const logsFromServer = [];
                res.data.forEach((logFromServer) => {
                    logsFromServer.push({
                        type: logFromServer.type,
                        name: logFromServer.name,
                        startTime: logFromServer.startTime,
                        endTime: logFromServer.endTime,
                        // eslint-disable-next-line no-underscore-dangle
                        id: logFromServer._id,
                    });
                });
                setLogs(logsFromServer);
            })
            .catch((e) => console.log(e));
    };

    const setTodoPercentageComplete = useCallback(() => {
        setTodos((prevTodos) => {
            const newTodos = [];

            prevTodos.forEach((prevTodo) => {
                const percentageComplete = givePercentageComplete(
                    prevTodo.type,
                    prevTodo.time,
                    logs
                );

                newTodos.push({
                    ...prevTodo,
                    percentageComplete,
                });
            });

            return newTodos;
        });
    }, [logs]);

    useEffect(() => {
        getTodosFromServer();
        getLogsFromServer();
    }, []);

    useEffect(() => {
        setTodoPercentageComplete();
    }, [setTodoPercentageComplete, todosUpdated]);

    return (
        <div>
            <BrowserRouter basename={process.env.PUBLIC_URL}>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route
                        path="/logger"
                        element={
                            <Logger
                                logs={logs}
                                todos={todos}
                                getLogsFromServer={getLogsFromServer}
                            />
                        }
                    />
                    <Route
                        path="/scheduler"
                        element={
                            <Scheduler
                                logs={logs}
                                todos={todos}
                                getTodosFromServer={getTodosFromServer}
                            />
                        }
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}
