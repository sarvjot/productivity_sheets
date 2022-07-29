import React from "react";

export default function Record({ record }) {
    return (
        <tr>
            <td>{record.type}</td>
            <td>{record.name}</td>
            <td>
                <div className="time">
                    <p>{record.startTime.hour}:</p>
                    <p>{record.startTime.minute}</p>
                </div>
            </td>
            <td>
                <div className="time">
                    <p>{record.endTime.hour}:</p>
                    <p>{record.endTime.minute}</p>
                </div>
            </td>
        </tr>
    );
}
