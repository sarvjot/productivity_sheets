import timeInMinutes from './timeInMinutes'

export default function givePercentageComplete(type, time, logs) {
    let percentageComplete = 0

    logs.forEach((log) => {
        if (log.type === type) {
            percentageComplete += timeInMinutes(log.startTime, log.endTime)
        }
    })

    percentageComplete = (percentageComplete / time) * 100
    percentageComplete = Math.round(Math.min(100, percentageComplete))

    return percentageComplete.toString()
}
