import React from "react";

import ProgressBar from "../ProgressBar.jsx";

export default function Todo({ todo, deleteTodo }) {
    return (
        <tr>
            <td>{todo.type}</td>
            <td>{todo.time}</td>
            <td>
                <ProgressBar barLevel={todo.percentageComplete} />
            </td>
            <td>
                <button type="button" onClick={deleteTodo}>
                    Delete
                </button>
            </td>
        </tr>
    );
}
