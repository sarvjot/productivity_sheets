import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { getAnalyticsData } from "../../api.js";

export default function AnalyserForm({ user, setAnalytics, month, setMonth }) {
    const [formMonth, setFormMonth] = useState(month);

    useEffect(() => {
        if (user) {
            getAnalyticsData(user, month, setAnalytics);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMonth(formMonth);
        getAnalyticsData(user, formMonth, setAnalytics);
    };

    return (
        <form className="records-form">
            <div className="records-form-text">Choose a month to analyse</div>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    openTo="year"
                    views={["year", "month"]}
                    value={formMonth}
                    onChange={(x) => {
                        setFormMonth(x);
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