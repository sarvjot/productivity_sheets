import React from "react";
import Chart from "./Chart.jsx";

export default function AnalyserTable({ month, analytics }) {
    const days = new Date(month.getFullYear(), month.getMonth() - 1, 0).getDate();
    const bgColor = Array(days).fill("#fe5f55");
    const label = Array(days)
        .fill(1)
        .map((v, i) => i + 1);

    return (
        <Chart
            chartData={{
                labels: label,
                datasets: [
                    {
                        xAxisID: "xAxis",
                        yAxisID: "yAxis",
                        data: analytics,
                        backgroundColor: bgColor,
                    },
                ],
            }}
        />
    );
}
