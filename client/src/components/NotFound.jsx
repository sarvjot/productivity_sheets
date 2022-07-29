import React from "react";

export default function NotFound({ text }) {
    return (
        <div
            style={{
                marginTop: "50px",
            }}
            className="error-box no-error"
        >
            No {text} found for given time period
        </div>
    );
}
