import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import App from './containers/app'
import mainReducer from './reducers'
import * as actions from './actions'

const store = createStore(
  mainReducer
)

const timeStep = 40

const loop = () => {
  store.dispatch(actions.tick(timeStep))
  setTimeout(loop, timeStep)
}

loop()

ReactDOM.render(
  (
    <Provider store={store}>
      <App>
      </App>
    </Provider>
  ),
  document.getElementById('application')
)
