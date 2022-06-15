import React from "react";

export default function TaskType({taskType, deleteTaskType}){
    return (
        <div className="task-type">
            <p>{taskType.type}</p>
            <p>{taskType.time}</p>
            <p>{taskType.donePercentage}</p>
            <p className="deleteTaskButton" onClick={deleteTaskType}>Delete</p>
        </div>
    )
}