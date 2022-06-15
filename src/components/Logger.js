import React from "react";
import Header from "./Header";
import Log from "./Log";
import { nanoid } from "nanoid";

import emptyLogFormData from "../data/emptyLogFormData";

export default function Logger({ logs, setLogs }) {
	const [formData, setFormData] = React.useState(emptyLogFormData);

	function handleChange(event) {
		if (event.target.name === "hour" || event.target.name === "minute") {
			let parentName = event.target.parentElement.attributes.name.nodeValue;
			setFormData((prevformdata) => {
				return {
					...prevformdata,
					[parentName]: {
						...prevformdata[parentName],
						[event.target.name]: event.target.value,
					},
				};
			});
		} else {
			setFormData((prevformdata) => {
				return {
					...prevformdata,
					[event.target.name]: event.target.value,
				};
			});
		}
	}

	function handleSubmit(event) {
		event.preventDefault();

		setLogs((prevLogs) => {
			return [
				...prevLogs,
				{
					name: formData.name,
					startTime: formData.startTime,
					endTime: formData.endTime,
					type: formData.type,
				},
			];
		});

		setFormData(emptyLogFormData);
	}

	function handleDelete(id) {
		setLogs((prevLogs) => {
			return prevLogs.filter((prevLog) => prevLog.id !== id);
		});
	}

	const logElements = logs.map((log) => {
		return <Log key={nanoid()} log={log} deleteLog={() => handleDelete(log.id)} />;
	});

	return (
		<div>
			<Header />
			<div className="logger-body">
				<h1 className="logger-title">Log Today's Tasks</h1>
				<h3 className="logger-subtitle">See how you're performing based on your schedule</h3>
				<div className="logger-heading">
					<p>Task Name</p>
					<p>Start Time</p>
					<p>End Time</p>
					<p>Type of Task</p>
					<p>Add/Delete Tasks</p>
				</div>
				<div className="logger-list">{logElements}</div>
				<form className="logger-form" onSubmit={handleSubmit}>
					<input type="text" placeholder="Add New Task" name="name" onChange={handleChange} value={formData.name} />
					<div name="startTime">
						<input type="text" placeholder="Hour" name="hour" onChange={handleChange} value={formData.startTime.hour} />
						<input type="text" placeholder="Minutes" name="minute" onChange={handleChange} value={formData.startTime.minute} />
					</div>
					<div name="endTime">
						<input type="text" placeholder="Hour" name="hour" onChange={handleChange} value={formData.endTime.hour} />
						<input type="text" placeholder="Minutes" name="minute" onChange={handleChange} value={formData.endTime.minute} />
					</div>
					<input type="text" placeholder="Type of Task" name="type" onChange={handleChange} value={formData.type} />
					<button>Add</button>
				</form>
			</div>
		</div>
	);
}
