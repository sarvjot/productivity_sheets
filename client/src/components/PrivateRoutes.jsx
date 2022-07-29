import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { getTodosFromServer, getLogsFromServer } from "../api.js";

export default function PrivateRoutes({ user, userName, setTodos, setLogs, setTodosFetched }) {
    useEffect(() => {
        if (user) {
            getTodosFromServer(user.id, setTodos, setTodosFetched);
            getLogsFromServer(user.id, setLogs);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    return userName !== null ? <Outlet /> : <Navigate to="/login" />;
}
