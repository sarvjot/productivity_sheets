import React from "react";

import Record from "./Record.jsx";
import NotFound from "../NotFound.jsx";

import "../../styles/table.css";

export default function RecordsTable({ records }) {
    const recordElements = records.map((record) => <Record key={record.id} record={record} />);

    return records.length !== 0 ? (
        <table className="records-table">
            <thead>
                <tr>
                    <td>Task Type</td>
                    <td>Task Name</td>
                    <td>Start Time</td>
                    <td>End Time</td>
                </tr>
            </thead>
            <tbody>{recordElements}</tbody>
        </table>
    ) : (
        <NotFound text="record" />
    );
}
