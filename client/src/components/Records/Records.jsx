import React, { useState, useEffect } from "react";
import RecordsForm from "./RecordsForm.jsx";
import RecordsTable from "./RecordsTable.jsx";

export default function Records({ user }) {
    const [records, setRecords] = useState(JSON.parse(localStorage.getItem("records")) || []);

    useEffect(() => {
        localStorage.setItem("records", JSON.stringify(records));
    }, [records]);

    return (
        <div className="main table-container">
            <h1 className="center-vertically heading">Glance at Past Logs</h1>
            <RecordsForm setRecords={setRecords} user={user} />
            <RecordsTable records={records} />
        </div>
    );
}
