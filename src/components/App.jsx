import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navbar from './Navbar'
import Home from './Home'
import Logger from './Logger'
import Scheduler from './Scheduler'

import todoData from '../data/todoData'
import logData from '../data/logData'

import givePercentageComplete from '../utils/givePercentageComplete'

export default function App() {
    const [todos, setTodos] = React.useState(todoData)
    const [logs, setLogs] = React.useState(logData)
    const [typeOptions, setTypeOptions] = React.useState([])

    // Can't do without useEffect hook, because setTodos on its own will keep on re-rendering
    // the component and will loop infinitely
    useEffect(() => {
        setTodos((prevTodos) => {
            const newTodo = []

            prevTodos.forEach((prevTodo) => {
                const percentageComplete = givePercentageComplete(
                    prevTodo.type,
                    prevTodo.time,
                    logs
                )

                newTodo.push({
                    ...prevTodo,
                    percentageComplete,
                })
            })

            return newTodo
        })
    }, [logs])

    useEffect(() => {
        setTypeOptions(() => {
            const options = []

            todos.forEach((todo) => {
                options.push(todo.type)
            })

            logs.forEach((log) => {
                options.push(log.type)
            })

            return [...new Set(options)]
        })
    }, [todos, logs])

    return (
        <div>
            <BrowserRouter basename={process.env.PUBLIC_URL}>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route
                        path="/logger"
                        element={
                            <Logger
                                logs={logs}
                                todos={todos}
                                typeOptions={typeOptions}
                                setLogs={setLogs}
                            />
                        }
                    />
                    <Route
                        path="/scheduler"
                        element={
                            <Scheduler
                                logs={logs}
                                todos={todos}
                                typeOptions={typeOptions}
                                setTodos={setTodos}
                            />
                        }
                    />
                </Routes>
            </BrowserRouter>
        </div>
    )
}
