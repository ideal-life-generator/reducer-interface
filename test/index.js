import {
  ok,
  throws,
  strictEqual,
  deepEqual,
  ifError
} from 'assert'
import reducerInterface from '../src'

const ADD_ITEM_MANUALLY = 'ADD_ITEM_MANUALLY'
const ADD_ITEM_IN_METHOD = 'ADD_ITEM_IN_METHOD'
const MERGING_MANUALLY = 'MERGING_MANUALLY'
const MERGING_IN_METHOD = 'MERGING_IN_METHOD'

class Interface {
  constructor() {
    this.items = []
  }

  addItem(item) {
    this.items.push(item)
  }

  merging(data) {
    this.merge(data)
  }
}

const cases = {
  [ADD_ITEM_MANUALLY]({ item }) {
    this.items.push(item)
  },

  [ADD_ITEM_IN_METHOD]({ item }) {
    this.addItem(item)
  },

  [MERGING_MANUALLY]({ data }) {
    this.merge(data)
  },

  [MERGING_IN_METHOD]({ data }) {
    this.merging(data)
  }
}

describe('Initializing', () => {
  it('Success', () => {
    ok(typeof reducerInterface(Interface, cases) === 'function')
  })

  describe('Errors', () => {
    it('Miss first argument', () => {
      throws(() => {
        reducerInterface()
      }, /First argument is not a class./)
    })

    it('Miss second argument', () => {
      throws(() => {
        reducerInterface(Interface)
      }, /Second argument is not an object./)
    })
  })
})

describe('Process', () => {
  const interfaceReducer = reducerInterface(Interface, cases)

  describe('Update', () => {
    it('Manually', () => {
      const item = {
        id: 0
      }
      const state = interfaceReducer({
        items: []
      }, {
        type: ADD_ITEM_MANUALLY,
        item
      })

      deepEqual(state.items[0], item)
    })

    it('In method', () => {
      const item = {
        id: 0
      }
      const state = interfaceReducer({
        items: []
      }, {
        type: ADD_ITEM_IN_METHOD,
        item
      })

      deepEqual(state.items[0], item)
    })
  })

  describe('Unique', () => {
    it('Manually', () => {
      const firstState = interfaceReducer({
        items: []
      }, {
        type: ADD_ITEM_MANUALLY,
        item: {
          id: 0
        }
      })
      const secondState = interfaceReducer(firstState, {
        type: ADD_ITEM_MANUALLY,
        item: {
          id: 1
        }
      })

      ifError(firstState.items[0] === secondState.items[0])
    })

    it('In method', () => {
      const firstState = interfaceReducer({
        items: []
      }, {
        type: ADD_ITEM_IN_METHOD,
        item: {
          id: 0
        }
      })
      const secondState = interfaceReducer(firstState, {
        type: ADD_ITEM_IN_METHOD,
        item: {
          id: 1
        }
      })

      ifError(firstState.items[0] === secondState.items[0])
    })
  })


  describe('Merge', () => {
    it('Manually', () => {
      const item = {
        id: 0
      }
      const data = {
        items: [item]
      }
      const state = interfaceReducer({
        items: []
      }, {
        type: MERGING_MANUALLY,
        data
      })

      deepEqual(state, data)
    })

    it('In method', () => {
      const item = {
        id: 0
      }
      const data = {
        items: [item]
      }
      const state = interfaceReducer({
        items: []
      }, {
        type: MERGING_IN_METHOD,
        data
      })

      deepEqual(state, data)
    })
  })
})