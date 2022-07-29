import React, { useState, useEffect } from "react";

import { postAnalyticsData, getAnalyticsData } from "../api.js";

export default function Performance({ user, todos, month, setAnalytics }) {
    const [perf, setPerf] = useState(0);

    useEffect(() => {
        let x = 0;
        let time = 0;

        todos.forEach((todo) => {
            x += Number(todo.time) * Number(todo.percentageComplete);
            time += Number(todo.time);
        });

        if (time === 0) {
            x = 0;
        } else {
            x /= time;
            x = Math.round(x);
        }

        setPerf(x);
    }, [todos]);

    useEffect(() => {
        if (user) {
            postAnalyticsData(user, perf);
            getAnalyticsData(user, month, setAnalytics);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, perf]);

    return <div className="sub-heading">Today's Performance: {perf}%</div>;
}
