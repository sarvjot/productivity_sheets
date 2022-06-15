import React from "react";
import Header from "./Header";
import Todo from "./Todo";
import { nanoid } from "nanoid";

import emptyTodoFormData from "../data/emptyTodoFormData";
import givePercentageComplete from "../utils/givePercentageComplete";

export default function Scheduler({ logs, todos, setTodos }) {
	const [formData, setFormData] = React.useState(emptyTodoFormData);

	function handleChange(event) {
		setFormData((prevFormData) => {
			return {
				...prevFormData,
				[event.target.name]: event.target.value,
			};
		});
	}

	function handleSubmit(event) {
		event.preventDefault();

		setTodos((prevTodos) => {
			let percentageComplete = givePercentageComplete(formData.type, formData.time, logs);

			return [
				...prevTodos,
				{
					type: formData.type,
					time: formData.time,
					percentageComplete: percentageComplete,
				},
			];
		});

		setFormData(emptyTodoFormData);
	}

	function handleDelete(id) {
		setTodos((prevTodos) => {
			return prevTodos.filter((todo) => todo.id !== id);
		});
	}

	const todoElements = todos.map((todo) => {
		return <Todo key={nanoid()} todo={todo} deleteTodo={() => handleDelete(todo.id)} />;
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
				<div className="scheduler-list">{todoElements}</div>
				<form className="scheduler-form" onSubmit={(e) => handleSubmit(e)}>
					<input type="text" placeholder="Add New Task" onChange={handleChange} name="type" value={formData.type} />
					<input type="text" placeholder="Enter Time" onChange={handleChange} name="time" value={formData.time} />
					<input type="text" placeholder="Not Applicable" onChange={handleChange} name="percentageComplete" disabled="disabled" />
					<button>Add</button>
				</form>
			</div>
		</div>
	);
}
