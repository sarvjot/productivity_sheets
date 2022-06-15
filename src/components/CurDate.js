import React from "react";

export default function CurDate() {
	return <div className="cur-date-container">{new Date().toDateString()}</div>;
}
