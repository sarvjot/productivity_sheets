import React, { useState, useEffect } from "react";

import "../../styles/scheduler.css";

import Performance from "../Performance.jsx";
import SchedulerForm from "./SchedulerForm.jsx";
import SchedulerTable from "./SchedulerTable.jsx";

export default function Scheduler({
    user,
    logs,
    todos,
    month,
    setTodos,
    setAnalytics,
    setTodosFetched,
}) {
    const [todoOptions, setTodoOptions] = useState([]);

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
            <Performance user={user} todos={todos} month={month} setAnalytics={setAnalytics} />
            <SchedulerTable
                user={user}
                todos={todos}
                setTodos={setTodos}
                setTodosFetched={setTodosFetched}
            />
            <SchedulerForm
                user={user}
                setTodos={setTodos}
                setTodosFetched={setTodosFetched}
                todoOptions={todoOptions}
            />
        </div>
    );
}
