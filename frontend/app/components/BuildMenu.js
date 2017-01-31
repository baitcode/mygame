import React from 'react';

import { StyleSheet, css } from 'aphrodite/no-important'

import {connect} from 'react-redux';

import * as actions from '~/actions'
import * as utils from '~/utils'


const styles = StyleSheet.create({
  base: {
    position: 'absolute',
    overflow: 'auto',
    width: '100px',
    height: '200px',
    'z-index': '100',
  },
  hidden: {
    display: 'none'
  },
  shown: {

  }
});


@connect(state => {
  return {
    settings: state.buildMenu,
  }
})
export default class BuildMenu extends React.Component {

  onSelect = (e, item) => {
    e.stopPropagation()
    const {dispatch, settings} = this.props;

    dispatch(
      actions.spawnShit(settings.x, settings.y, item)
    )
    dispatch(
      actions.hideBuildMenu()
    )
  }

  render() {
    var settings = this.props.settings;
    var state = settings.state;
    var style = {
      left: settings.x,
      top: settings.y,
    }

    return (
      <div onClick={(e) => e.stopPropagation()}
           className={css(styles.base, styles[state])}
           style={style}>
        <input type="button" value="Build shit" onClick={(e) => this.onSelect(e, 'shit')} />
      </div>
    )
  }

}
