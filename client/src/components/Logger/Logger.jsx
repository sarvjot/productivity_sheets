import React, { useEffect } from "react";

import "../../styles/logger.css";

import Performance from "../Performance.jsx";
import LoggerForm from "./LoggerForm.jsx";
import LoggerTable from "./LoggerTable.jsx";

export default function Logger({ logs, todos, getLogsFromServer }) {
    const [logOptions, setLogOptions] = React.useState([]);

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
            <Performance todos={todos} />
            <LoggerTable logs={logs} getLogsFromServer={getLogsFromServer} />
            <LoggerForm logOptions={logOptions} getLogsFromServer={getLogsFromServer} />
        </div>
    );
}
