import React from 'react'
import PropType from 'prop-types'

import '../styles/scheduler.css'

import Performance from './Performance'
import SchedulerForm from './SchedulerForm'
import SchedulerTable from './SchedulerTable'
import logSchema from '../Schema/logSchema'
import todoSchema from '../Schema/todoSchema'

function Scheduler({ logs, todos, typeOptions, setTodos }) {
    return (
        <div className="scheduler table-container main">
            <h1 className="center-vertically heading">Categorize Today's Tasks</h1>
            <Performance todos={todos} />
            <SchedulerTable todos={todos} setTodos={setTodos} />
            <SchedulerForm typeOptions={typeOptions} logs={logs} setTodos={setTodos} />
        </div>
    )
}

Scheduler.propTypes = {
    logs: PropType.arrayOf(logSchema).isRequired,
    todos: PropType.arrayOf(todoSchema).isRequired,
    typeOptions: PropType.arrayOf(String).isRequired,
    setTodos: PropType.func.isRequired,
}

export default Scheduler
