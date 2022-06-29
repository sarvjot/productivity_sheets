import isNumeric from './checkNumeric'

export default function findError(formData, todos, gg) {
    let found = 0
    todos.forEach((todo) => {
        if (todo.type === formData.type) {
            found = 1
        }
    })

    if (found === 1) {
        return 'Task Type already present in Todos'
    }
    if (formData.type.length === 0) {
        return "Task Type can't be empty"
    }
    if (formData.type.length > 30) {
        return "Task Type can't be more than 30 Characters"
    }
    if (formData.time.length === 0) {
        return "Time can't be empty"
    }
    if (!isNumeric(formData.time)) {
        return 'Time should be a Positive Integer'
    }
    if (Number(formData.time) > 1440) {
        return "Time can't be more than 1440 minutes"
    }
    return gg
}
