import axios from "axios";
import React, { useState } from "react";
import { nanoid } from "nanoid";

import { getLogsFromServer } from "../../api.js";

import "../../styles/form.css";

const baseURL = process.env.REACT_APP_API_BASE_URL;

const emptyFormData = {
    name: "",
    startTime: {
        hour: "",
        minute: "",
    },
    endTime: {
        hour: "",
        minute: "",
    },
    type: "",
};

export default function LoggerForm({ setLogs, setServerFetched, logOptions }) {
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState(emptyFormData);

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

        let creationTime = new Date();
        creationTime = new Date(
            creationTime.getFullYear(),
            creationTime.getMonth(),
            creationTime.getDate()
        );

        axios
            .post(
                `${baseURL}/api/logs`,
                {
                    type: formData.type,
                    name: formData.name,
                    startTime: formData.startTime,
                    endTime: formData.endTime,
                    creationTime,
                },
                {
                    withCredentials: true,
                }
            )
            .then(() => {
                getLogsFromServer(setLogs, setServerFetched);
                setFormData(emptyFormData);
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
            <form className="content-form logger-form" onSubmit={handleSubmit} autoComplete="off">
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
