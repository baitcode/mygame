import React from 'react';

import { StyleSheet, css } from 'aphrodite/no-important'

import {connect} from 'react-redux';


const styles = StyleSheet.create({
  base: {
    position: 'relative',
    background: 'gray',
    top: 0,
    left: 0,
  }
});


@connect(state => state.map)
export default class Map extends React.Component {
  render() {
    const style = {
      width: this.props.width,
      height: this.props.height,
    };

    return (
      <div className={css(styles.base)} style={style} {...this.props}>
        {this.props.children}
      </div>
    )
  }
}
