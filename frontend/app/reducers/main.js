import * as actions from '~/actions'

const defaultState = {
  gameStarted: Date.now(),
  buildMenu: {
    x: null,
    y: null,
    state: 'hidden'
  },
  map: {
    width: 10000,
    height: 10000,
    tileWidth: 16,
    tileHeight: 16,
  },
  viewport: {
    clientPosition: {
      x: 150,
      y: 10,
    },
    position: {
      x: 250,
      y: 250,
    },
    size: {
      width: 800,
      height: 500,
    }
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
    case 'spawned':
      state = 'building';
      break;
    case 'building':
      if (now - structure.createdAt > structure.buildTime) {
        state = 'ready';
      }
      break;
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
        structures: reduceoObjectCollection(state.structures, reduceStructure),
        units: reduceoObjectCollection(state.units, reduceUnit),
        time: state.time + action.value
      }
      // check all structures
      // check all units
    case actions.MENU_BUILD_SHOW:
      return {
        ...state,
        buildMenu: action.data
      }
    case actions.MENU_BUILD_HIDE:
      return {
        ...state,
        buildMenu: action.data
      }
    case actions.SPAWN_SHIT:
      var structures = {
        ...state.structures,
      }
      structures[action.data.id] = action.data
      return {
        ...state,
        structures
      }
    case actions.MOVE_VIEWPORT:
      const position = state.viewport.position

      position.x += action.data.dx
      position.y += action.data.dy

      position.x = Math.max(0, position.x)
      position.y = Math.max(0, position.y)

      const map = state.map;
      const viewport = state.viewport;

      position.x = Math.min(map.width - viewport.size.width, position.x)
      position.y = Math.min(map.height - viewport.size.height, position.y)

      return {
        ...state,
        viewport: {
          ...state.viewport,
          position: position,
        },
      }

  }

  return state
};

