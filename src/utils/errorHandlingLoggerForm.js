import timeInMinutes from './timeInMinutes'
import isNumeric from './checkNumeric'

export default function findError(formData, gg) {
    if (formData.type.length === 0) {
        return "Task Type can't be empty"
    }
    if (formData.type.length > 30) {
        return "Task Type can't be more than 30 Characters"
    }

    if (formData.name.length === 0) {
        return "Task Name can't be empty"
    }
    if (formData.name.length > 30) {
        return "Task Name can't be more than 30 Characters"
    }

    if (formData.startTime.hour.length === 0) {
        return "Start Hour can't be empty"
    }
    if (!isNumeric(formData.startTime.hour)) {
        return 'Start Hour should be a Positive Integer'
    }
    if (Number(formData.startTime.hour) > 23) {
        return 'Start Hour has to be in range [0, 23]'
    }

    if (formData.startTime.minute.length === 0) {
        return "Start Minute can't be empty"
    }
    if (!isNumeric(formData.startTime.minute)) {
        return 'Start Minute should be a Positive Integer'
    }
    if (Number(formData.startTime.minute) > 59) {
        return 'Start Minute has to be in range [0, 59]'
    }

    if (formData.endTime.hour.length === 0) {
        return "End Hour can't be empty"
    }
    if (!isNumeric(formData.endTime.hour)) {
        return 'End Hour should be a Positive Integer'
    }
    if (Number(formData.endTime.hour) > 23) {
        return 'End Hour has to be in range [0, 23]'
    }

    if (formData.endTime.minute.length === 0) {
        return "End Minute can't be empty"
    }
    if (!isNumeric(formData.endTime.minute)) {
        return 'End Minute should be a Positive Integer'
    }
    if (Number(formData.endTime.minute) > 59) {
        return 'End Minute has to be in range [0, 59]'
    }

    if (timeInMinutes(formData.startTime, formData.endTime) < 0) {
        return "Start Time can't be after End Time"
    }
    return gg
}
