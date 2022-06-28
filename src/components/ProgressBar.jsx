/* eslint-disable react/self-closing-comp */
import React from 'react'
import PropType from 'prop-types'

import '../styles/progress-bar.css'

function ProgressBar({ barLevel }) {
    const widthStyle = {
        width: `${barLevel}%`,
    }

    return (
        <div className="progress-container">
            <div className="progress-bar" style={widthStyle}></div>
            <div className="progress-value center-vertically">{barLevel}%</div>
        </div>
    )
}

ProgressBar.propTypes = {
    barLevel: PropType.string.isRequired,
}

export default ProgressBar
