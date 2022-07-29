import axios from "axios";

axios.defaults.withCredentials = true;

const baseURL = process.env.REACT_APP_API_BASE_URL;

// Helper Functions

function timeInMinutes(t1, t2) {
    return (t2.hour - t1.hour) * 60 + (t2.minute - t1.minute);
}

function givePercentageComplete(type, time, logs) {
    let percentageComplete = 0;

    logs.forEach((log) => {
        if (log.type === type) {
            percentageComplete += timeInMinutes(log.startTime, log.endTime);
        }
    });

    percentageComplete = (percentageComplete / time) * 100;
    percentageComplete = Math.round(Math.min(100, percentageComplete));

    return percentageComplete.toString();
}

// API Functions

export const checkUser = (setUser, setUserName) => {
    axios
        .get(`${baseURL}/api/auth/check`)
        .then((res) => {
            if (res.status === 200) {
                setUser(res.data);
                setUserName(res.data ? res.data.user : null);
            }
        })
        .catch((e) => {
            console.log(e);
        });
};

export const getTodosFromServer = (userId, setTodos, setTodosFetched) => {
    let date = new Date();
    date = new Date(date.getFullYear(), date.getMonth(), date.getDate());

    axios
        .get(`${baseURL}/api/todos/${userId}/${date}`)
        .then((res) => {
            const todosFromServer = [];
            res.data.forEach((todoFromServer) => {
                todosFromServer.push({
                    type: todoFromServer.type,
                    time: todoFromServer.time,
                    percentageComplete: "0",
                    // eslint-disable-next-line no-underscore-dangle
                    id: todoFromServer._id,
                });
            });
            setTodos(todosFromServer);
        })
        .then(() => {
            setTodosFetched((prevTodosFetched) => prevTodosFetched + 1);
        })
        .catch((e) => {
            console.log(e);
        });
};

export const setTodoPercentageComplete = (logs, setTodos) => {
    setTodos((prevTodos) => {
        const newTodos = [];

        prevTodos.forEach((prevTodo) => {
            const percentageComplete = givePercentageComplete(prevTodo.type, prevTodo.time, logs);

            newTodos.push({
                ...prevTodo,
                percentageComplete,
            });
        });

        return newTodos;
    });
};

export const getLogsFromServer = (userId, setLogs, inp = new Date()) => {
    const date = new Date(inp.getFullYear(), inp.getMonth(), inp.getDate());

    axios
        .get(`${baseURL}/api/logs/${userId}/${date}`)
        .then((res) => {
            const logsFromServer = [];
            res.data.forEach((logFromServer) => {
                logsFromServer.push({
                    type: logFromServer.type,
                    name: logFromServer.name,
                    startTime: logFromServer.startTime,
                    endTime: logFromServer.endTime,
                    // eslint-disable-next-line no-underscore-dangle
                    id: logFromServer._id,
                });
            });
            setLogs(logsFromServer);
        })
        .catch((e) => {
            console.log(e);
        });
};

export const getAnalyticsData = (forUser, month, setAnalytics) => {
    const date = new Date(month.getFullYear(), month.getMonth());

    axios
        .get(`${baseURL}/api/perf/${forUser.id}/${date}`)
        .then((res) => {
            setAnalytics(res.data[0].perf);
        })
        .catch((err) => {
            console.log(err);
        });
};

export const postAnalyticsData = (user, perf) => {
    axios
        .post(`${baseURL}/api/perf`, {
            perf,
            date: new Date(),
            userId: user.id,
        })
        .catch((err) => {
            console.log(err);
        });
};
