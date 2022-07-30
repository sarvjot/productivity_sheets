import axios from "axios";
import React from "react";

import "../../styles/table.css";

import Todo from "./Todo.jsx";
import { getTodosFromServer } from "../../api.js";

const baseURL = process.env.REACT_APP_API_BASE_URL;

export default function SchedulerTable({ todos, setTodos, setServerFetched }) {
    function handleDelete(id) {
        axios
            .delete(`${baseURL}/api/todos/${id}`)
            .then(() => {
                getTodosFromServer(setTodos, setServerFetched);
            })
            .catch((e) => console.log(e));
    }

    const todoElements = todos.map((todo) => (
        <Todo key={todo.id} todo={todo} deleteTodo={() => handleDelete(todo.id)} />
    ));

    return (
        <table>
            <thead>
                <tr>
                    <td>Task Type</td>
                    <td>Target Time (in Minutes)</td>
                    <td>Percentage Achieved</td>
                    <td>Add/Delete Tasks</td>
                </tr>
            </thead>
            <tbody>{todoElements}</tbody>
        </table>
    );
}
