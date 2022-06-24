import React from 'react'
import PropType from 'prop-types'

import Log from './Log'
import LoggerForm from './LoggerForm'
import logSchema from '../Schema/logSchema'

function Logger({ logs, setLogs }) {
    function handleDelete(id) {
        setLogs((prevLogs) => prevLogs.filter((prevLog) => prevLog.id !== id))
    }

    const logElements = logs.map((log) => (
        <Log key={log.id} log={log} deleteLog={() => handleDelete(log.id)} />
    ))

    return (
        <div className="logger main">
            <h1 className="logger-title">Log Today's Tasks</h1>
            <h3 className="logger-subtitle">See how you're performing based on your schedule</h3>
            <div className="logger-heading">
                <p>Task Name</p>
                <p>Start Time</p>
                <p>End Time</p>
                <p>Type of Task</p>
                <p>Add/Delete Tasks</p>
            </div>
            <div className="logger-list">{logElements}</div>
            <LoggerForm setLogs={setLogs} />
        </div>
    )
}

Logger.propTypes = {
    logs: PropType.arrayOf(logSchema).isRequired,
    setLogs: PropType.func.isRequired,
}

export default Logger
