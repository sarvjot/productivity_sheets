import React from 'react'
import PropType from 'prop-types'

import Todo from './Todo'
import todoSchema from '../Schema/todoSchema'

import '../styles/table.css'

function SchedulerTable({ setTodos, todos }) {
    function handleDelete(id) {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id))
    }

    const todoElements = todos.map((todo) => (
        <Todo key={todo.id} todo={todo} deleteTodo={() => handleDelete(todo.id)} />
    ))

    return (
        <table>
            <thead>
                <tr>
                    <td>Task Type</td>
                    <td>Target Time (in Minutes)</td>
                    <td>Percentage Achieved</td>
                    <td>Add/Delete Tasks</td>
                </tr>
            </thead>
            <tbody>{todoElements}</tbody>
        </table>
    )
}

SchedulerTable.propTypes = {
    todos: PropType.arrayOf(todoSchema).isRequired,
    setTodos: PropType.func.isRequired,
}

export default SchedulerTable
