import React from "react";

export default function Log({ log, deleteLog }) {
	return (
		<div className="task-element">
			<p>{log.name}</p>
			<div>
				<p>{log.startTime.hour}:</p>
				<p>{log.startTime.minute}</p>
			</div>
			<div>
				<p>{log.endTime.hour}:</p>
				<p>{log.endTime.minute}</p>
			</div>
			<p>{log.type}</p>
			<p className="deleteTaskElementButton" onClick={deleteLog}>
				Delete
			</p>
		</div>
	);
}
