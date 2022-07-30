import axios from "axios";
import React from "react";

import Log from "./Log.jsx";
import { getLogsFromServer } from "../../api.js";

import "../../styles/table.css";

const baseURL = process.env.REACT_APP_API_BASE_URL;

export default function LoggerTable({ logs, setLogs, setServerFetched }) {
    function handleDelete(id) {
        axios
            .delete(`${baseURL}/api/logs/${id}`, {
                withCredentials: true,
            })
            .then(() => {
                getLogsFromServer(setLogs, setServerFetched);
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
