import React from 'react';

import { StyleSheet, css } from 'aphrodite/no-important'

import {connect} from 'react-redux';


const styles = StyleSheet.create({
  base: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'gray',
    overflow: 'hidden',
  }
});


@connect(state => state.viewport)
export default class Viewport extends React.Component {
  render() {
    const style = {
    };

    return (
      <div className={css(styles.base)}
           style={style} {...this.props}
            on>
        {this.props.children}
      </div>
    )
  }
}
