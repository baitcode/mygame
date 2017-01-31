import {guid} from '~/utils'

export const TIME_TICK = 'TIME_TICK'
export const MENU_BUILD_SHOW = 'MENU_BUILD_SHOW'
export const MENU_BUILD_HIDE = 'MENU_BUILD_HIDE'

export const MOVE_VIEWPORT = 'MOVE_VIEWPORT'

export const SPAWN_SHIT = 'SPAWN_SHIT'


export const tick = (time_passed) => {
  return {
    type: TIME_TICK,
    value: time_passed,
  }
}

export const showBuildMenu = (x, y) => {
  return {
    type: MENU_BUILD_SHOW,
    data: {
      x: x,
      y: y,
      state: 'shown'
    },
  }
}

export const hideBuildMenu = () => {
  return {
    type: MENU_BUILD_HIDE,
    data: {
      x: 0,
      y: 0,
      state: 'hidden'
    },
  }
}

export const spawnShit = (x, y, item) => {
  return {
    type: SPAWN_SHIT,
    data: {
      id: guid(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
      type: item,
      buildTime: 5000,
      x: x,
      y: y,
      state: 'spawned'
    },
  }
}

export const moveViewPort = (dx, dy) => {
  return {
    type: MOVE_VIEWPORT,
    data: {
      dx: dx,
      dy: dy,
    },
  }
}
