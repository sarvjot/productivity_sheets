import axios from "axios";
import React, { useState } from "react";
import { nanoid } from "nanoid";

import { getTodosFromServer } from "../../api.js";

import "../../styles/form.css";

const baseURL = process.env.REACT_APP_API_BASE_URL;

const emptyFormData = {
    type: "",
    time: "",
    percentageComplete: "",
};

export default function SchedulerForm({ setTodos, setServerFetched, todoOptions }) {
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState(emptyFormData);

    function handleChange(event) {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [event.target.name]: event.target.value,
        }));
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
                `${baseURL}/api/todos`,
                {
                    type: formData.type,
                    time: formData.time,
                    creationTime,
                },
                {
                    withCredentials: true,
                }
            )
            .then(() => {
                getTodosFromServer(setTodos, setServerFetched);
                setFormData(emptyFormData);
                setError(null);
            })
            .catch((err) => {
                setError(err.response.data);
            });
    }

    const todoOptionElements = todoOptions.map((todoOption) => {
        return <option key={nanoid()}>{todoOption}</option>;
    });

    return (
        <div>
            <form
                className="content-form scheduler-form"
                onSubmit={(e) => handleSubmit(e)}
                autoComplete="off"
            >
                <input
                    type="text"
                    placeholder="Add New Task"
                    onChange={handleChange}
                    list="type"
                    name="type"
                    value={formData.type}
                />
                <datalist type="text" id="type">
                    {todoOptionElements}
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

            <div className={`error-box ${error === null ? "no-error" : "error"}`}>
                {error === null ? "Great Going!" : error}
            </div>
        </div>
    );
}
