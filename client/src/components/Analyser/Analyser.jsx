import React from "react";
import AnalyserForm from "./AnalyserForm.jsx";
import AnalyserChart from "./AnalyserChart.jsx";

export default function Analyser({ user, month, analytics, setMonth, setAnalytics }) {
    return (
        <div className="main table-container">
            <h1 className="center-vertically heading">Analyse this month's progress</h1>
            <AnalyserForm
                user={user}
                setAnalytics={setAnalytics}
                month={month}
                setMonth={setMonth}
            />
            <AnalyserChart month={month} analytics={analytics} />
        </div>
    );
}
