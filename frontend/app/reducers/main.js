import * as actions from '~/actions'

const defaultState = {
  gameStarted: Date.now(),
  buildMenu: {
    x: null,
    y: null,
    state: 'hidden'
  },
  resources: {
    sun: 0,
    minerals: 0,
  },
  units: {},
  structures: {},
  delta: 40,
  time: 0,
}

const reduceStructure = (structure) => {
  var state = null;
  const now = Date.now();

  switch (structure.state) {
    case 'ready':
      break;
  }

  return {
    ...structure,
    state: state || structure.state,
    updatedAt: now
  }
}

const reduceUnit = (unit) => {
  return unit
}


const reduceoObjectCollection = (collection, reducer) => {
  const newCollection = {}
  Object.keys(collection).map((key) => {
    newCollection[key] = reducer(collection[key])
  })
  return newCollection
}


export default (state = defaultState, action) => {
  switch (action.type) {
    case actions.TIME_TICK:
      return {
        ...state,
        structures: [],
        units: [],
        time: state.time + action.value
      }
  }

  return state
};

