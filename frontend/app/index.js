import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import App from './containers/app'
import GameScene from './containers/GameScene'
import mainReducer from './reducers'
import * as actions from './actions'

import generator from './utils/map/SpacePartitioningGenerator'


const hueta = (matrix) => {
  var output = ''
  for (var i = 0, l = matrix.length; i < l; i++) {
    output += matrix[i].join(',') + '\n';
  }
  console.log('\n' + output)
}


// hueta(generator(30, 30))


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
        <GameScene></GameScene>
      </App>
    </Provider>
  ),
  document.getElementById('application')
)
