import React from 'react'
import PropType from 'prop-types'

import logSchema from '../Schema/logSchema'

function Log({ log, deleteLog }) {
    return (
        <div className="task-element">
            <p>{log.name}</p>
            <div>
                <p>{log.startTime.hour}:</p>
                <p>{log.startTime.minute}</p>
            </div>
            <div>
                <p>{log.endTime.hour}:</p>
                <p>{log.endTime.minute}</p>
            </div>
            <p>{log.type}</p>
            <button type="button" className="deleteTaskElementButton" onClick={deleteLog}>
                Delete
            </button>
        </div>
    )
}

Log.propTypes = {
    log: logSchema.isRequired,
    deleteLog: PropType.func.isRequired,
}

export default Log
