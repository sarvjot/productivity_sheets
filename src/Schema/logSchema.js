import PropType from 'prop-types'

const logSchema = PropType.shape({
    name: PropType.string,
    startTime: PropType.shape({
        hour: PropType.string,
        minute: PropType.string,
    }),
    endTime: PropType.shape({
        hour: PropType.string,
        minute: PropType.string,
    }),
    type: PropType.string,
    id: PropType.string,
})

export default logSchema
