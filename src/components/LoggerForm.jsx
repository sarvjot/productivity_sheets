import React from 'react'
import { nanoid } from 'nanoid'
import PropType from 'prop-types'

import '../styles/form.css'

import emptyLogFormData from '../data/emptyLogFormData'

function LoggerForm({ typeOptions, setLogs }) {
    const [formData, setFormData] = React.useState(emptyLogFormData)

    function handleChange(event) {
        if (event.target.name === 'hour' || event.target.name === 'minute') {
            const parentName = event.target.parentElement.attributes.name.nodeValue
            setFormData((prevformdata) => ({
                ...prevformdata,
                [parentName]: {
                    ...prevformdata[parentName],
                    [event.target.name]: event.target.value,
                },
            }))
        } else {
            setFormData((prevformdata) => ({
                ...prevformdata,
                [event.target.name]: event.target.value,
            }))
        }
    }

    function handleSubmit(event) {
        event.preventDefault()

        setLogs((prevLogs) => [
            ...prevLogs,
            {
                name: formData.name,
                startTime: formData.startTime,
                endTime: formData.endTime,
                type: formData.type,
                id: nanoid(),
            },
        ])

        setFormData(emptyLogFormData)
    }

    const typeOptionElements = typeOptions.map((typeOption) => {
        return <option key={nanoid()}>{typeOption}</option>
    })

    return (
        <form className="logger-form" onSubmit={handleSubmit} autoComplete="off">
            <input
                type="text"
                placeholder="Task Type"
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
                placeholder="Add New Task"
                name="name"
                onChange={handleChange}
                value={formData.name}
            />
            <div name="startTime">
                <input
                    type="text"
                    placeholder="Hour"
                    name="hour"
                    onChange={handleChange}
                    value={formData.startTime.hour}
                />
                <input
                    type="text"
                    placeholder="Minute"
                    name="minute"
                    onChange={handleChange}
                    value={formData.startTime.minute}
                />
            </div>
            <div name="endTime">
                <input
                    type="text"
                    placeholder="Hour"
                    name="hour"
                    onChange={handleChange}
                    value={formData.endTime.hour}
                />
                <input
                    type="text"
                    placeholder="Minute"
                    name="minute"
                    onChange={handleChange}
                    value={formData.endTime.minute}
                />
            </div>
            <button type="button" onClick={handleSubmit}>
                Add
            </button>
        </form>
    )
}

LoggerForm.propTypes = {
    typeOptions: PropType.arrayOf(String).isRequired,
    setLogs: PropType.func.isRequired,
}

export default LoggerForm
