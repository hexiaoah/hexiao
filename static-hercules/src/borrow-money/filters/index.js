import maths from '../utils/maths'

export default {
  fen2yuan(value, decimals = 2) {
    return maths.divide(value, 100, decimals)
  },
  number(value, decimals = 2) {
    return maths.number(value, decimals)
  }
}
