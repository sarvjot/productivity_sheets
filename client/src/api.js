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

export const checkUser = (setUserName) => {
    axios
        .get(`${baseURL}/api/auth/check`)
        .then((res) => {
            if (res.status === 200) {
                setUserName(res.data ? res.data.userName : null);
            }
        })
        .catch((e) => {
            console.log(e);
        });
};

export const getAnalyticsData = (month, setAnalytics) => {
    const date = new Date(month.getFullYear(), month.getMonth());

    axios
        .get(`${baseURL}/api/perf/${date}`)
        .then((res) => {
            setAnalytics(res.data[0].perf);
        })
        .catch((err) => {
            console.log(err);
        });
};

export const postAnalyticsData = (perf) => {
    axios
        .post(`${baseURL}/api/perf`, {
            perf,
            date: new Date(),
        })
        .catch((err) => {
            console.log(err);
        });
};

const postAnalyticsHelper = (perf) => {
    postAnalyticsData(perf);
};

export const calcPerfAndPost = (newTodos, callback) => {
    let perf = 0;
    let time = 0;

    newTodos.forEach((todo) => {
        perf += Number(todo.time) * Number(todo.percentageComplete);
        time += Number(todo.time);
    });

    if (time === 0) {
        perf = 0;
    } else {
        perf /= time;
        perf = Math.round(perf);
    }

    callback(perf);
};

// export const setPerf = (user, logs, setTodos) => {
export const setPerf = async (logs, setTodos, callback) => {
    const newTodos = [];

    setTodos((prevTodos) => {
        prevTodos.forEach((prevTodo) => {
            const percentageComplete = givePercentageComplete(prevTodo.type, prevTodo.time, logs);

            newTodos.push({
                ...prevTodo,
                percentageComplete,
            });
        });

        callback(newTodos, postAnalyticsHelper);
        return newTodos;
    });
};

export const getBothTodosAndLogsFromServer = (setTodos, setLogs, setServerFetched) => {
    let date = new Date();
    date = new Date(date.getFullYear(), date.getMonth(), date.getDate());

    axios
        .get(`${baseURL}/api/todos/${date}`)
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
            axios
                .get(`${baseURL}/api/logs/${date}`)
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
                .then(() => {
                    setServerFetched((p) => p + 1);
                })
                .catch((e) => {
                    console.log(e);
                });
        })
        .catch((e) => {
            console.log(e);
        });
};

export const getTodosFromServer = (setTodos, setServerFetched) => {
    let date = new Date();
    date = new Date(date.getFullYear(), date.getMonth(), date.getDate());

    axios
        .get(`${baseURL}/api/todos/${date}`)
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
            setServerFetched((p) => p + 1);
        })
        .catch((e) => {
            console.log(e);
        });
};

export const getLogsFromServer = (setLogs, setServerFetched = null, inp = new Date()) => {
    const date = new Date(inp.getFullYear(), inp.getMonth(), inp.getDate());

    axios
        .get(`${baseURL}/api/logs/${date}`)
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
        .then(() => {
            if (setServerFetched !== null) {
                setServerFetched((p) => p + 1);
            }
        })
        .catch((e) => {
            console.log(e);
        });
};
