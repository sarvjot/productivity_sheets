import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { nanoid } from "nanoid";

import Home from "./Home";
import Logger from "./Logger";
import Scheduler from "./Scheduler";

export default function App() {
	const [taskTypes, setTaskTypes] = React.useState([
		{
			type: "Maths",
			time: 120,
			donePercentage: 0,
			id: nanoid(),
		},
		{
			type: "Science",
			time: 100,
			donePercentage: 0,
			id: nanoid(),
		},
	]);

	const [taskList, setTaskList] = React.useState([
		{
			name: "Trigonometry",
			startTime: {
				hour: 9,
				minute: 30,
			},
			endTime: {
				hour: 10,
				minute: 30,
			},
			type: "Maths",
			id: nanoid(),
		},
		{
			name: "Object Oriented Programming",
			startTime: {
				hour: 10,
				minute: 30,
			},
			endTime: {
				hour: 12,
				minute: "00",
			},
			type: "Computer Science",
			id: nanoid(),
		},
		{
			name: "Newton's Laws of Motion",
			startTime: {
				hour: 12,
				minute: 30,
			},
			endTime: {
				hour: 13,
				minute: 30,
			},
			type: "Science",
			id: nanoid(),
		},
	]);

	function minutes(time_1, time_2) {
		return (time_2.hour - time_1.hour) * 60 + (time_2.minute - time_1.minute);
	}

	useEffect(() => {
		console.log("Task List changed, update completion percentage of each task-type based on this new task list");

		setTaskTypes((prevTaskTypes) => {
			let newTaskTypes = [];

			prevTaskTypes.forEach((t) => {
				let donePercentage = 0;
				taskList.forEach((task) => {
					if (task.type === t.type) {
						donePercentage += minutes(task.startTime, task.endTime);
					}
				});
				donePercentage = Number((donePercentage / t.time) * 100);
				donePercentage = Math.min(100, donePercentage);
				newTaskTypes.push({
					...t,
					donePercentage: donePercentage,
				});
			});

			return newTaskTypes;
		});
	}, [taskList]);

	useEffect(() => {
		console.log("Task Types changed, update task-type based on existing task list");
	}, [taskTypes]);

	return (
		<BrowserRouter basename={process.env.PUBLIC_URL}>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/logger" element={<Logger taskList={taskList} setTaskList={setTaskList} />} />
				<Route path="/scheduler" element={<Scheduler taskList={taskList} taskTypes={taskTypes} setTaskTypes={setTaskTypes} />} />
			</Routes>
		</BrowserRouter>
	);
}
