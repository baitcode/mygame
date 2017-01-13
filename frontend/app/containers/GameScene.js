import React from 'react';

import { StyleSheet, css } from 'aphrodite/no-important'

import {connect} from 'react-redux';

import DebugPanel from '~/components/DebugPanel'
import BuildMenu from '~/components/BuildMenu'
import Structure from '~/components/Structure'
import Map from '~/components/Map'
import Viewport from '~/components/Viewport'
import * as actions from '~/actions'


const styles = StyleSheet.create({
  scene: {
    position: 'absolute',
    overflow: 'auto',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  }
});


@connect(state => {
  return state
})
export default class GameScene extends React.Component {

  buildShit = (e) => {
    e.stopPropagation()

    const {dispatch} = this.props;

    dispatch(
      actions.showBuildMenu(
        e.nativeEvent.offsetX,
        e.nativeEvent.offsetY
      )
    )
  }

  render() {
    var structureKeys = Object.keys(this.props.structures);
    const structures = structureKeys.map((key) => {
      const structure = this.props.structures[key];
      return (<Structure key={key} {...structure} />)
    })

    return (
      <div className={css(styles.scene)} >
        <DebugPanel />
        <Viewport>
          <BuildMenu />
          <Map onClick={this.buildShit}>
            {structures}
          </Map>
        </Viewport>
      </div>
    )
  }

}
