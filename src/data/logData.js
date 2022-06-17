import { nanoid } from 'nanoid'

const logData = [
    {
        name: 'Trigonometry',
        startTime: {
            hour: '09',
            minute: '30',
        },
        endTime: {
            hour: '10',
            minute: '30',
        },
        type: 'Maths',
        id: nanoid(),
    },
    {
        name: 'Object Oriented Programming',
        startTime: {
            hour: '10',
            minute: '30',
        },
        endTime: {
            hour: '12',
            minute: '00',
        },
        type: 'Computer Science',
        id: nanoid(),
    },
    {
        name: "Newton's Laws of Motion",
        startTime: {
            hour: '12',
            minute: '30',
        },
        endTime: {
            hour: '13',
            minute: '30',
        },
        type: 'Science',
        id: nanoid(),
    },
]

export default logData
