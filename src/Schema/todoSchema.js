import PropType from 'prop-types'

const todoSchema = PropType.shape({
    type: PropType.string,
    time: PropType.string,
    percentageComplete: PropType.string,
    id: PropType.string,
})

export default todoSchema
