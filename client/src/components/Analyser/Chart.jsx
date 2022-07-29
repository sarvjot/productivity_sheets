import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

import "../../styles/chart.css";

Chart.register(...registerables);

export default function BarChart({ chartData }) {
    return (
        <Bar
            data={chartData}
            className="chart"
            options={{
                plugins: {
                    responsive: true,
                    title: {
                        display: false,
                    },
                    legend: {
                        display: false,
                    },
                },
                scales: {
                    xAxis: {
                        grid: {
                            borderColor: "black",
                            display: false,
                        },
                    },
                    yAxis: {
                        max: 100,
                        grid: {
                            borderColor: "black",
                        },
                    },
                },
            }}
        />
    );
}
