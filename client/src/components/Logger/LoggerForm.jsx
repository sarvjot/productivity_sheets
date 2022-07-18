import axios from "axios";
import React from "react";
import { nanoid } from "nanoid";

import "../../styles/form.css";

import emptyLogFormData from "../../placeholderData/emptyLogFormData.js";

const baseURL = "http://localhost:5000";

export default function LoggerForm({ logOptions, getLogsFromServer }) {
    const [error, setError] = React.useState(null);
    const [formData, setFormData] = React.useState(emptyLogFormData);

    function handleChange(event) {
        if (event.target.name === "hour" || event.target.name === "minute") {
            const parentName = event.target.parentElement.attributes.name.nodeValue;
            setFormData((prevformdata) => ({
                ...prevformdata,
                [parentName]: {
                    ...prevformdata[parentName],
                    [event.target.name]: event.target.value,
                },
            }));
        } else {
            setFormData((prevformdata) => ({
                ...prevformdata,
                [event.target.name]: event.target.value,
            }));
        }
    }

    function handleSubmit(event) {
        event.preventDefault();

        axios
            .post(`${baseURL}/api/logs`, {
                type: formData.type,
                name: formData.name,
                startTime: formData.startTime,
                endTime: formData.endTime,
            })
            .then(() => {
                getLogsFromServer();
                setFormData(emptyLogFormData);
                setError(null);
            })
            .catch((err) => {
                setError(err.response.data);
            });
    }

    const logOptionElements = logOptions.map((logOption) => {
        return <option key={nanoid()}>{logOption}</option>;
    });

    return (
        <div>
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
                    {logOptionElements}
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

            <div className={`error-box ${error === null ? "no-error" : "error"}`}>
                {error === null ? "Great Going!" : error}
            </div>
        </div>
    );
}
