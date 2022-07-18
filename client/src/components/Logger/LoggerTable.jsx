import axios from "axios";
import React from "react";

import "../../styles/table.css";

import Log from "./Log.jsx";

const baseURL = "http://localhost:5000";

export default function LoggerTable({ logs, getLogsFromServer }) {
    function handleDelete(id) {
        axios
            .delete(`${baseURL}/api/logs/${id}`)
            .then(() => {
                getLogsFromServer();
            })
            .catch((e) => console.log(e));
    }

    const logElements = logs.map((log) => (
        <Log key={log.id} log={log} deleteLog={() => handleDelete(log.id)} />
    ));

    return (
        <table>
            <thead>
                <tr>
                    <td>Task Type</td>
                    <td>Task Name</td>
                    <td>Start Time</td>
                    <td>End Time</td>
                    <td>Add/Delete Tasks</td>
                </tr>
            </thead>
            <tbody>{logElements}</tbody>
        </table>
    );
}
