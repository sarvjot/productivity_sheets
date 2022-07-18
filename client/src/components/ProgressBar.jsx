/* eslint-disable react/self-closing-comp */
import React from "react";

import "../styles/progress-bar.css";

export default function ProgressBar({ barLevel }) {
    const widthStyle = {
        width: `${barLevel}%`,
    };

    return (
        <div className="progress-container">
            <div className="progress-bar" style={widthStyle}></div>
            <div className="progress-value center-vertically">{barLevel}%</div>
        </div>
    );
}
