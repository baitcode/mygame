import React from 'react';

import { StyleSheet, css } from 'aphrodite/no-important'

import {connect} from 'react-redux';

import * as actions from '~/actions'


const styles = StyleSheet.create({
  viewport: {
    position: 'absolute',
    top: 0,
    left: 0,
    overflow: 'hidden',
    'z-index': '50',
  }
});


@connect(state => {
  return {
    viewport: state.viewport
  }
})
export default class Viewport extends React.Component {
  static propTypes = {
    onClick: React.PropTypes.func
  }

  onWheel = (e) => {
    const {dispatch} = this.props;

    dispatch(
      actions.moveViewPort(e.deltaX, e.deltaY)
    );
  }

  render() {
    const viewport = this.props.viewport;

    const style = {
      width: viewport.size.width,
      height: viewport.size.height,
      left: viewport.clientPosition.x,
      top: viewport.clientPosition.y,
    };

    return (
      <div className={css(styles.viewport)}
          style={style}
          onClick={this.props.onClick}
          onWheel={this.onWheel}>
        {this.props.children}
      </div>
    )
  }
}
