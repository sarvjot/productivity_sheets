import React from 'react'
import PropType from 'prop-types'

import '../styles/scheduler.css'

import Performance from './Performance'
import SchedulerForm from './SchedulerForm'
import SchedulerTable from './SchedulerTable'
import logSchema from '../Schema/logSchema'
import todoSchema from '../Schema/todoSchema'

function Scheduler({ logs, todos, setTodos }) {
    return (
        <div className="scheduler table-container main">
            <h1 className="center-vertically heading">Categorize Today's Tasks</h1>
            <Performance todos={todos} />
            <SchedulerTable todos={todos} setTodos={setTodos} />
            <SchedulerForm todos={todos} logs={logs} setTodos={setTodos} />
        </div>
    )
}

Scheduler.propTypes = {
    logs: PropType.arrayOf(logSchema).isRequired,
    todos: PropType.arrayOf(todoSchema).isRequired,
    setTodos: PropType.func.isRequired,
}

export default Scheduler
