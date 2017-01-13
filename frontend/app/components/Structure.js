import React from 'react';

import { StyleSheet, css } from 'aphrodite/no-important'

import {connect} from 'react-redux';

import * as actions from '~/actions'


const styles = StyleSheet.create({
  base: {
    position: 'absolute',
    overflow: 'auto',
    width: '10px',
    height: '20px',
    background: 'black'
  },
  hidden: {
    display: 'none'
  },
  shown: {

  }
});


export default class Structure extends React.Component {
  static propTypes = {
    x: React.PropTypes.number,
    y: React.PropTypes.number,
    type: React.PropTypes.string,
    state: React.PropTypes.string,
  };

  render() {
    var state = this.props.state;
    var style = {
      left: this.props.x,
      top: this.props.y,
    }

    return (
      <div className={css(styles.base, styles[state])} style={style}>
      </div>
    )
  }

}
