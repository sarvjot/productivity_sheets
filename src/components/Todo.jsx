import React from 'react'
import PropType from 'prop-types'

import ProgressBar from './ProgressBar'
import todoSchema from '../Schema/todoSchema'

function Todo({ todo, deleteTodo }) {
    return (
        <tr>
            <td>{todo.type}</td>
            <td>{todo.time}</td>
            <td>
                <ProgressBar barLevel={todo.percentageComplete} />
            </td>
            <td>
                <button type="button" onClick={deleteTodo}>
                    Delete
                </button>
            </td>
        </tr>
    )
}

Todo.propTypes = {
    todo: todoSchema.isRequired,
    deleteTodo: PropType.func.isRequired,
}

export default Todo
