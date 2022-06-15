import React from "react";

export default function Todo({todo, deleteTodo}){
    return (
        <div className="task-type">
            <p>{todo.type}</p>
            <p>{todo.time}</p>
            <p>{todo.percentageComplete}</p>
            <p className="deleteTaskButton" onClick={deleteTodo}>Delete</p>
        </div>
    )
}