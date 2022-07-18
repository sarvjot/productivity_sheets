import React from "react";
import { nanoid } from "nanoid";

import "../styles/home.css";

import logImg from "../images/log.jpg";
import recordsImg from "../images/records.jpg";
import scheduleImg from "../images/schedule.jpg";
import analysisImg from "../images/analysis.jpg";

export default function Home() {
    const [feature, setFeature] = React.useState(0);

    function handleClick(index) {
        setFeature(index);
    }

    const images = [scheduleImg, logImg, analysisImg, recordsImg];

    const options = [
        "Schedule todos for the day",
        "Log today’s Activities",
        "Analyse Your Performance",
        "Have a look at your past records",
    ];

    const descriptions = [
        "Describe what all you want to accomplish today",
        "Log what you got done and get a performance score!",
        "Analyse your past performances to track your progress",
        "Cherish memories of that day in past when you absolutely nailed it!",
    ];

    const featureOptions = options.map((option, index) => (
        <button
            type="button"
            key={nanoid()}
            onClick={() => handleClick(index)}
            className={`feature-option ${feature === index ? "selected-option" : ""}`}
        >
            {option}
        </button>
    ));

    const featureDescriptions = descriptions.map((description, index) => (
        <div
            key={nanoid()}
            style={{
                backgroundImage: `url(${images[index]})`,
            }}
            className={`feature-block feature-description ${
                feature === index ? "selected-description" : ""
            }`}
        >
            {description}
        </div>
    ));

    return (
        <div className="main">
            <h1 className="heading center-vertically">What A Productive Day!</h1>
            <div className="feature-container">
                <div className="feature-block feature-options">{featureOptions}</div>
                {featureDescriptions}
            </div>
        </div>
    );
}
