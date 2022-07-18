import React, { useEffect } from "react";

import "../../styles/scheduler.css";

import Performance from "../Performance.jsx";
import SchedulerForm from "./SchedulerForm.jsx";
import SchedulerTable from "./SchedulerTable.jsx";

export default function Scheduler({ logs, todos, getTodosFromServer }) {
    const [todoOptions, setTodoOptions] = React.useState([]);

    useEffect(() => {
        setTodoOptions(() => {
            const options = new Set();

            logs.forEach((log) => {
                options.add(log.type);
            });

            todos.forEach((todo) => {
                options.delete(todo.type);
            });

            return [...options];
        });
    }, [todos, logs]);

    return (
        <div className="scheduler table-container main">
            <h1 className="center-vertically heading">Categorize Today's Tasks</h1>
            <Performance todos={todos} />
            <SchedulerTable todos={todos} getTodosFromServer={getTodosFromServer} />
            <SchedulerForm
                todoOptions={todoOptions}
                todos={todos}
                getTodosFromServer={getTodosFromServer}
            />
        </div>
    );
}
