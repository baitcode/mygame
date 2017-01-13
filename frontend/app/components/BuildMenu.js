import React from 'react';

import { StyleSheet, css } from 'aphrodite/no-important'

import {connect} from 'react-redux';

import * as actions from '~/actions'


const styles = StyleSheet.create({
  base: {
    position: 'absolute',
    overflow: 'auto',
    width: '100px',
    height: '200px',
  },
  hidden: {
    display: 'none'
  },
  shown: {

  }
});


@connect(state => {
  return state.buildMenu
})
export default class BuildMenu extends React.Component {

  onSelect = (e, item) => {
    e.stopPropagation()
    const {dispatch, x, y} = this.props;
    dispatch(
      actions.spawnShit(x, y, item)
    )
    dispatch(
      actions.hideBuildMenu()
    )
  }

  render() {
    var state = this.props.state;
    var style = {
      left: this.props.x,
      top: this.props.y,
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
