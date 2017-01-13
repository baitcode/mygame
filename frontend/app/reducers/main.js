import * as actions from '~/actions'

const defaultState = {
  gameStarted: Date.now(),
  buildMenu: {
    x: null,
    y: null,
    state: 'hidden'
  },
  viewport: {
    position: [1000, 1000],
  },
  resources: {
    sun: 0,
    minerals: 0,
  },
  units: {},
  structures: {},
  time: 0,
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case actions.TIME_TICK:
      return {
        ...state,
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

  }

  return state
};

