import React from 'react'
import { nanoid } from 'nanoid'
import PropType from 'prop-types'

import '../styles/form.css'

import logSchema from '../Schema/logSchema'
import emptyTodoFormData from '../data/emptyTodoFormData'
import givePercentageComplete from '../utils/givePercentageComplete'

function SchedulerForm({ logs, typeOptions, setTodos }) {
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

    const typeOptionElements = typeOptions.map((typeOption) => {
        return <option key={nanoid()}>{typeOption}</option>
    })

    return (
        <form className="scheduler-form" onSubmit={(e) => handleSubmit(e)} autoComplete="off">
            <input
                type="text"
                placeholder="Add New Task"
                onChange={handleChange}
                list="type"
                name="type"
                value={formData.type}
            />
            <datalist type="text" id="type">
                {typeOptionElements}
            </datalist>
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
    )
}

SchedulerForm.propTypes = {
    logs: PropType.arrayOf(logSchema).isRequired,
    typeOptions: PropType.arrayOf(String).isRequired,
    setTodos: PropType.func.isRequired,
}

export default SchedulerForm
