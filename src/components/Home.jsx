import React from 'react'
import { nanoid } from 'nanoid'

import analysisImg from '../assets/analysis.jpg'
import logImg from '../assets/log.jpg'
import scheduleImg from '../assets/schedule.jpg'
import recordsImg from '../assets/records.jpg'

export default function Home() {
    const [feature, setFeature] = React.useState(0)

    function handleClick(index) {
        setFeature(index)
    }

    const images = [analysisImg, logImg, scheduleImg, recordsImg]

    const options = [
        'Analyse Your Performance',
        'Log today’s Activities',
        'Schedule todos for the day',
        'Have a look at your past records',
    ]

    const descriptions = [
        'Extensive graphical analysis of your performances over the time.',
        'Log your activities and see how you’re performing.',
        'Schedule your todos for the day and see how you’re performing.',
        'Have a look at your past records and see how you’re performing.',
    ]

    const featureOptions = options.map((option, index) => (
        <button
            type="button"
            key={nanoid()}
            onClick={() => handleClick(index)}
            className={`feature-option ${feature === index ? 'selected-option' : ''}`}
        >
            {option}
        </button>
    ))

    const featureDescriptions = descriptions.map((description, index) => (
        <div
            key={nanoid()}
            style={{
                backgroundImage: `url(${images[index]})`,
            }}
            className={`feature-block feature-description ${
                feature === index ? 'selected-description' : ''
            }`}
        >
            {description}
        </div>
    ))

    return (
        <div className="main">
            <h1 className="heading-1 center-vertically">What A Productive Day!</h1>
            <div className="feature-container">
                <div className="feature-block feature-options">{featureOptions}</div>
                {featureDescriptions}
            </div>
        </div>
    )
}
