import React from 'react'
import PropType from 'prop-types'

import '../styles/logger.css'

import Performance from './Performance'
import LoggerForm from './LoggerForm'
import LoggerTable from './LoggerTable'
import logSchema from '../Schema/logSchema'
import todoSchema from '../Schema/todoSchema'

function Logger({ logs, todos, typeOptions, setLogs }) {
    return (
        <div className="logger table-container main">
            <h1 className="center-vertically heading">Log Today's Tasks</h1>
            <Performance todos={todos} />
            <LoggerTable logs={logs} setLogs={setLogs} />
            <LoggerForm typeOptions={typeOptions} setLogs={setLogs} />
        </div>
    )
}

Logger.propTypes = {
    logs: PropType.arrayOf(logSchema).isRequired,
    todos: PropType.arrayOf(todoSchema).isRequired,
    typeOptions: PropType.arrayOf(String).isRequired,
    setLogs: PropType.func.isRequired,
}

export default Logger
