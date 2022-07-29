import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { getLogsFromServer as getRecordsFromServer } from "../../api.js";

export default function RecordsForm({ setRecords, user }) {
    const [day, setDay] = useState(
        localStorage.getItem("day") ? new Date(localStorage.getItem("day")) : new Date()
    );

    useEffect(() => {
        localStorage.setItem("day", day.toString());
    }, [day]);

    useEffect(() => {
        if (user) {
            getRecordsFromServer(user.id, setRecords, day);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    const handleSubmit = (e) => {
        e.preventDefault();

        getRecordsFromServer(user.id, setRecords, day);
    };

    return (
        <form className="records-form">
            <div className="records-form-text">Pick a date to query your logs</div>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    openTo="year"
                    views={["year", "month", "day"]}
                    value={day}
                    onChange={(newDay) => {
                        setDay(newDay);
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            helperText={null}
                            sx={{
                                height: "60px",
                                width: "25%",
                                background: "white",
                                borderRadius: "20px",
                                border: "4px solid black",
                                "& *": {
                                    fontFamily: "'Anek Latin' !important",
                                },
                                "& .MuiOutlinedInput-notchedOutline": {
                                    border: "0px !important",
                                },
                                "& .MuiInputBase-input.MuiOutlinedInput-input": {
                                    textAlign: "center",
                                    fontSize: "22px",
                                    height: "100%",
                                },
                                "& .MuiInputBase-root.MuiOutlinedInput-root": {
                                    height: "100%",
                                },
                                "& .MuiSvgIcon-root": {
                                    color: "black",
                                },
                            }}
                        />
                    )}
                />
            </LocalizationProvider>
            <button type="button" onClick={handleSubmit}>
                Submit
            </button>
        </form>
    );
}
