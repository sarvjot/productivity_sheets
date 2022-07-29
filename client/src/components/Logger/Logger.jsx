import React, { useState, useEffect } from "react";

import "../../styles/logger.css";

import Performance from "../Performance.jsx";
import LoggerForm from "./LoggerForm.jsx";
import LoggerTable from "./LoggerTable.jsx";

export default function Logger({ user, logs, todos, month, setLogs, setAnalytics }) {
    const [logOptions, setLogOptions] = useState([]);

    useEffect(() => {
        setLogOptions(() => {
            const options = new Set();

            logs.forEach((log) => {
                options.add(log.type);
            });

            todos.forEach((todo) => {
                options.add(todo.type);
            });

            return [...options];
        });
    }, [todos, logs]);

    return (
        <div className="logger table-container main">
            <h1 className="center-vertically heading">Log Today's Tasks</h1>
            <Performance user={user} todos={todos} month={month} setAnalytics={setAnalytics} />
            <LoggerTable user={user} logs={logs} setLogs={setLogs} />
            <LoggerForm user={user} logOptions={logOptions} setLogs={setLogs} />
        </div>
    );
}
