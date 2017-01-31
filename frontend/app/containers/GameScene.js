import React from 'react';

import { StyleSheet, css } from 'aphrodite/no-important'

import {connect} from 'react-redux';

import DebugPanel from '~/components/DebugPanel'
import BuildMenu from '~/components/BuildMenu'
import Structure from '~/components/Structure'
import Map from '~/components/Map'
import Viewport from '~/components/Viewport'
import * as actions from '~/actions'
import * as utils from '~/utils'


const styles = StyleSheet.create({
  scene: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    overflow: 'hidden',
  }
});


@connect(state => {
  return state
})
export default class GameScene extends React.Component {

  buildShit = (e) => {
    e.stopPropagation()

    const {dispatch} = this.props;

    const viewportPoint = utils.xyClient2Map(
      e.clientX,
      e.clientY,
      this.props.viewport
    )

    dispatch(
      actions.showBuildMenu(viewportPoint.x, viewportPoint.y)
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
        <Viewport onClick={this.buildShit}>
          <Map >
            <BuildMenu/>
            {structures}
          </Map>
        </Viewport>
      </div>
    )
  }

}
