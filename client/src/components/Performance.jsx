import React from "react";

export default function Performance({ todos }) {
    let perf = 0;
    let time = 0;

    todos.forEach((todo) => {
        perf += Number(todo.time) * Number(todo.percentageComplete);
        time += Number(todo.time);
    });

    perf /= time;
    perf = Math.round(perf);

    return <div className="sub-heading">Today's Performance: {perf}%</div>;
}
