import React from 'react'
import PropType from 'prop-types'

import todoSchema from '../Schema/todoSchema'

function Todo({ todo, deleteTodo }) {
    return (
        <div className="todo">
            <p>{todo.type}</p>
            <p>{todo.time}</p>
            <p>{todo.percentageComplete}</p>
            <button type="button" className="deleteTodoButton" onClick={deleteTodo}>
                Delete
            </button>
        </div>
    )
}

Todo.propTypes = {
    todo: todoSchema.isRequired,
    deleteTodo: PropType.func.isRequired,
}

export default Todo
