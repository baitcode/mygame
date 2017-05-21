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
