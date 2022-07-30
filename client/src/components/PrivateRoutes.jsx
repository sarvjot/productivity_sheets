import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { getBothTodosAndLogsFromServer } from "../api.js";

export default function PrivateRoutes({ userName, setTodos, setLogs, setServerFetched }) {
    useEffect(() => {
        if (userName) {
            getBothTodosAndLogsFromServer(setTodos, setLogs, setServerFetched);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userName]);

    return userName !== null ? <Outlet /> : <Navigate to="/login" />;
}
