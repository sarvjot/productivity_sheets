import React from 'react'
import { nanoid } from 'nanoid'
import PropType from 'prop-types'

import logSchema from '../Schema/logSchema'
import emptyTodoFormData from '../data/emptyTodoFormData'
import givePercentageComplete from '../utils/givePercentageComplete'

function SchedulerForm({ logs, setTodos }) {
    const [formData, setFormData] = React.useState(emptyTodoFormData)

    function handleChange(event) {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [event.target.name]: event.target.value,
        }))
    }

    function handleSubmit(event) {
        event.preventDefault()

        setTodos((prevTodos) => {
            const percentageComplete = givePercentageComplete(formData.type, formData.time, logs)

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

    return (
        <form className="scheduler-form" onSubmit={(e) => handleSubmit(e)}>
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
    )
}

SchedulerForm.propTypes = {
    logs: PropType.arrayOf(logSchema).isRequired,
    setTodos: PropType.func.isRequired,
}

export default SchedulerForm
