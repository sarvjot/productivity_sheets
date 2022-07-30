import React, { useState, useEffect } from "react";
import AnalyserForm from "./AnalyserForm.jsx";
import AnalyserChart from "./AnalyserChart.jsx";

import { getAnalyticsData } from "../../api.js";

export default function Analyser() {
    const [month, setMonth] = useState(
        localStorage.getItem("month") ? new Date(localStorage.getItem("month")) : new Date()
    );
    const [analytics, setAnalytics] = useState(JSON.parse(localStorage.getItem("analytics")) || []);

    useEffect(() => {
        localStorage.setItem("month", month.toString());
    }, [month]);

    useEffect(() => {
        localStorage.setItem("analytics", JSON.stringify(analytics));
    }, [analytics]);

    useEffect(() => {
        getAnalyticsData(month, setAnalytics);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [month]);

    return (
        <div className="main table-container">
            <h1 className="center-vertically heading">Analyse this month's progress</h1>
            <AnalyserForm month={month} setMonth={setMonth} />
            <AnalyserChart month={month} analytics={analytics} />
        </div>
    );
}
