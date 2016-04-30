import uniqueState from 'unique-state'
import superMerge from 'super-merge'

const MISS_INTERFACE_ERROR = new Error('First argument is not a class.')
const MISS_CASES_ERROR = new Error('Second argument is not an object.')

export default function reducerInterface(Expand, cases) {
  if (!Expand || typeof Expand !== 'function') throw MISS_INTERFACE_ERROR
  if (!cases || typeof cases !== 'object') throw MISS_CASES_ERROR

  class Interface extends Expand {
    constructor(state) {
      super()

      Object.assign(this, uniqueState(state))
    }

    merge(data) {
      return superMerge(this, data)
    }
  }

  return function InterfaceReducer(state = new Interface(new Expand()), action) {
    const { type, ...data } = action
    const { [type]: currentCase } = cases

    if (currentCase) {
      state = new Interface(state)

      currentCase.call(state, data)
    }

    return state
  }
}