import React from 'react'
import { nanoid } from 'nanoid'
import PropType from 'prop-types'

import '../styles/form.css'

import logSchema from '../Schema/logSchema'
import todoSchema from '../Schema/todoSchema'
import emptyTodoFormData from '../data/emptyTodoFormData'
import givePercentageComplete from '../utils/givePercentageComplete'
import findError from '../utils/errorHandlingSchedulerForm'

function SchedulerForm({ logs, todos, setTodos }) {
    const [formData, setFormData] = React.useState(emptyTodoFormData)
    const gg = 'Great Going!'
    const [error, setError] = React.useState(gg)

    function handleChange(event) {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [event.target.name]: event.target.value,
        }))
    }

    function handleSubmit(event) {
        event.preventDefault()

        const err = findError(formData, todos, gg)
        setError(err)

        if (err === gg) {
            setTodos((prevTodos) => {
                const percentageComplete = givePercentageComplete(
                    formData.type,
                    formData.time,
                    logs
                )

                return [
                    ...prevTodos,
                    {
                        type: formData.type,
                        time: formData.time,
                        percentageComplete,
                        id: nanoid(),
                    },
                ]
            })

            setFormData(emptyTodoFormData)
        }
    }

    return (
        <div>
            <form className="scheduler-form" onSubmit={(e) => handleSubmit(e)} autoComplete="off">
                <input
                    type="text"
                    placeholder="Add New Task"
                    onChange={handleChange}
                    name="type"
                    value={formData.type}
                />
                <input
                    type="text"
                    placeholder="Enter Time"
                    onChange={handleChange}
                    name="time"
                    value={formData.time}
                />
                <input
                    className="not-applicable"
                    type="text"
                    placeholder="Not Applicable"
                    onChange={handleChange}
                    name="percentageComplete"
                    disabled="disabled"
                />
                <button type="button" onClick={handleSubmit}>
                    Add
                </button>
            </form>
            <div className={`error-box ${error === gg ? 'no-error' : 'error'}`}>{error}</div>
        </div>
    )
}

SchedulerForm.propTypes = {
    logs: PropType.arrayOf(logSchema).isRequired,
    todos: PropType.arrayOf(todoSchema).isRequired,
    setTodos: PropType.func.isRequired,
}

export default SchedulerForm
