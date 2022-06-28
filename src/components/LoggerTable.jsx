import React from 'react'
import PropType from 'prop-types'

import Log from './Log'
import logSchema from '../Schema/logSchema'

import '../styles/table.css'

function LoggerTable({ logs, setLogs }) {
    function handleDelete(id) {
        setLogs((prevLogs) => prevLogs.filter((prevLog) => prevLog.id !== id))
    }

    const logElements = logs.map((log) => (
        <Log key={log.id} log={log} deleteLog={() => handleDelete(log.id)} />
    ))

    return (
        <table>
            <thead>
                <tr>
                    <td>Task Type</td>
                    <td>Task Name</td>
                    <td>Start Time</td>
                    <td>End Time</td>
                    <td>Add/Delete Tasks</td>
                </tr>
            </thead>
            <tbody>{logElements}</tbody>
        </table>
    )
}

LoggerTable.propTypes = {
    logs: PropType.arrayOf(logSchema).isRequired,
    setLogs: PropType.func.isRequired,
}

export default LoggerTable
