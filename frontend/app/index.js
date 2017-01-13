import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import App from './containers/app'
import GameScene from './containers/GameScene'
import mainReducer from './reducers'
import * as actions from './actions'

const store = createStore(
  mainReducer
)

const timeStep = 10

const loop = () => {
  store.dispatch(actions.tick(timeStep))
  setTimeout(loop, timeStep)
}

loop()

ReactDOM.render(
  (
    <Provider store={store}>
      <App>
        <GameScene></GameScene>
      </App>
    </Provider>
  ),
  document.getElementById('application')
)
