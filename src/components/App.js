import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Home";
import Logger from "./Logger";
import Scheduler from "./Scheduler";

import todoData from "../data/todoData";
import logData from "../data/logData";

import givePercentageComplete from "../utils/givePercentageComplete";

export default function App() {
	const [todos, setTodos] = React.useState(todoData);
	const [logs, setLogs] = React.useState(logData);

	useEffect(() => {
		setTodos((prevTodos) => {
			let newTodo = [];

			prevTodos.forEach((prevTodo) => {
				let percentageComplete = givePercentageComplete(prevTodo.type, prevTodo.time, logs);

				newTodo.push({
					...prevTodo,
					percentageComplete: percentageComplete,
				});
			});

			return newTodo;
		});
	}, [logs]);

	return (
		<BrowserRouter basename={process.env.PUBLIC_URL}>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/logger" element={<Logger logs={logs} setLogs={setLogs} />} />
				<Route path="/scheduler" element={<Scheduler logs={logs} todos={todos} setTodos={setTodos} />} />
			</Routes>
		</BrowserRouter>
	);
}
