import React from "react";

export default function TaskType({taskElement, deleteTaskElement}){
    return (
        <div className="task-element">
            <p>{taskElement.name}</p>
            <div>
                <p>{taskElement.startTime.hour}:</p>
                <p>{taskElement.startTime.minute}</p>
            </div>
            <div>
                <p>{taskElement.endTime.hour}:</p>
                <p>{taskElement.endTime.minute}</p>
            </div>
            <p>{taskElement.type}</p>
            <p className="deleteTaskElementButton" onClick={deleteTaskElement}>Delete</p>
        </div>
    )
}