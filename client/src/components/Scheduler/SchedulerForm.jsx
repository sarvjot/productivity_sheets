import axios from "axios";
import React from "react";
import { nanoid } from "nanoid";

import "../../styles/form.css";

import emptyTodoFormData from "../../placeholderData/emptyTodoFormData.js";

const baseURL = "http://localhost:5000";

export default function SchedulerForm({ todoOptions, getTodosFromServer }) {
    const [error, setError] = React.useState(null);
    const [formData, setFormData] = React.useState(emptyTodoFormData);

    function handleChange(event) {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [event.target.name]: event.target.value,
        }));
    }

    function handleSubmit(event) {
        event.preventDefault();

        axios
            .post(`${baseURL}/api/todos`, {
                type: formData.type,
                time: formData.time,
            })
            .then(() => {
                getTodosFromServer();
                setFormData(emptyTodoFormData);
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
