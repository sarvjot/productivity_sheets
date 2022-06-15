import React from "react";
import Header from "./Header";
import TaskElement from "./TaskElement";
import { nanoid } from "nanoid";

export default function Logger(props) {
	const [formData, setFormData] = React.useState({
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
	});

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

		props.setTaskList((prevTaskList) => {
			return [
				...prevTaskList,
				{
					name: formData.name,
					startTime: formData.startTime,
					endTime: formData.endTime,
					type: formData.type,
				},
			];
		});

		setFormData({
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
		});
	}

	function handleDelete(id) {
		props.setTaskList((prevTaskList) => {
			return prevTaskList.filter((taskList) => taskList.id !== id);
		});
	}

	const taskListElements = props.taskList.map((taskElement) => {
		return <TaskElement key={nanoid()} taskElement={taskElement} deleteTaskElement={() => handleDelete(taskElement.id)} />;
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
				<div className="logger-list">{taskListElements}</div>
				<form className="logger-form" onSubmit={handleSubmit}>
					<input type="text" placeholder="Add New Task" name="name" onChange={handleChange} value={formData.name}/>
					<div name="startTime">
						<input type="text" placeholder="Hour" name="hour" onChange={handleChange} value={formData.startTime.hour}/>
						<input type="text" placeholder="Minutes" name="minute" onChange={handleChange} value={formData.startTime.minute}/>
					</div>
					<div name="endTime">
						<input type="text" placeholder="Hour" name="hour" onChange={handleChange} value={formData.endTime.hour}/>
						<input type="text" placeholder="Minutes" name="minute" onChange={handleChange} value={formData.endTime.minute}/>
					</div>
					<input type="text" placeholder="Type of Task" name="type" onChange={handleChange} value={formData.type}/>
					<button>Add</button>
				</form>
			</div>
		</div>
	);
}
