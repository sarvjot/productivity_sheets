import React from "react";

export default function Log({ log, deleteLog }) {
    return (
        <tr>
            <td>{log.type}</td>
            <td>{log.name}</td>
            <td>
                <div className="time">
                    <p>{log.startTime.hour}:</p>
                    <p>{log.startTime.minute}</p>
                </div>
            </td>
            <td>
                <div className="time">
                    <p>{log.endTime.hour}:</p>
                    <p>{log.endTime.minute}</p>
                </div>
            </td>
            <td>
                <button type="button" onClick={deleteLog}>
                    Delete
                </button>
            </td>
        </tr>
    );
}
