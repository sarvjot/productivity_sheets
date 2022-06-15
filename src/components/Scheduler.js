import React from "react";
import Header from "./Header";
import TaskType from "./TaskType";
import { nanoid } from "nanoid";

export default function Scheduler(props) {
	const [formData, setFormData] = React.useState({
		type: "",
		time: "",
		donePercentage: "",
	});

	function handleChange(event){
		setFormData(prevFormData => {
			return {
				...prevFormData,
				[event.target.name]: event.target.value
			}
		})
	}

	function minutes(time_1, time_2) {
		return (time_2.hour - time_1.hour) * 60 + (time_2.minute - time_1.minute);
	}

	function handleSubmit(event) {
		event.preventDefault();

		props.setTaskTypes(prevTaskTypes => {

			let donePercentage = 0;
			props.taskList.forEach((task) => {
				if (task.type === formData.type) {
					donePercentage += minutes(task.startTime, task.endTime);
				}
			});
			donePercentage = Number((donePercentage / formData.time) * 100);
			donePercentage = Math.min(100, donePercentage);

			return [
				...prevTaskTypes,
				{
					type: formData.type,
					time: formData.time,
					donePercentage: donePercentage,
				}
			]
		})

		setFormData({
			type: "",
			time: "",
			donePercentage: "",
		});
	}

	function handleDelete(id){
		props.setTaskTypes(prevTaskTypes => {
			return prevTaskTypes.filter(taskType => taskType.id !== id)
		})
	}

	const taskTypeElements = props.taskTypes.map((taskType) => {
		return <TaskType key={nanoid()} taskType={taskType} deleteTaskType={() => handleDelete(taskType.id)}/>;
	});

	return (
		<div>
			<Header />
			<div className="scheduler-body">
				<h1 className="scheduler-title">Categorize Today's Tasks</h1>
				<h3 className="scheduler-subtitle">Fill up how much time you want to invest in different types of tasks</h3>
				<div className="scheduler-heading">
					<p>Type of Task</p>
					<p>Target Time in Minutes</p>
					<p>Percentage of Target Achieved</p>
					<p>Add/Delete Tasks</p>
				</div>
				<div className="scheduler-list">{taskTypeElements}</div>
				<form className="scheduler-form" onSubmit={(e) => handleSubmit(e)}>
					<input type="text" placeholder="Add New Task" onChange={handleChange} name="type" value={formData.type}/>
					<input type="text" placeholder="Enter Time" onChange={handleChange} name="time" value={formData.time}/>
					<input type="text" placeholder="Not Applicable" onChange={handleChange} name="donePercentage" disabled="disabled"/>
					<button>Add</button>
				</form>
			</div>
		</div>
	);
}
