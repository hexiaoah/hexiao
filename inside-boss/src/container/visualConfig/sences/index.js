import { formatSenceDefinition } from '@src/container/visualConfig/store/formatters/definition'
import retail from './retail'
import union from './union'

const sences = [
    retail,
    union
]

export default sences.map(formatSenceDefinition)
