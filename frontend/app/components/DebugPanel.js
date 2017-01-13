import React from 'react';

import { StyleSheet, css } from 'aphrodite/no-important'

import {connect} from 'react-redux';


const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '200px',
  },
  normal: {
    position: 'relative',
    overflow: 'auto',
  },
  hidden: {
    display: 'none'
  },
});


@connect(state => {
  return state
})
export default class DebugPanel extends React.Component {

  state = {
    isHidden: false
  }

  hide = (e) => {
    e.stopPropagation()
    this.setState({ isHidden: !this.state.isHidden })
  }

  render() {

    var content = null;

    var isHidden = this.state.isHidden;

    if (!isHidden) {
      content = (
        <pre>
          {JSON.stringify(this.props, null, 2)}
        </pre>
      )
    }

    return (
      <div className={css(styles.container)}>
        <input
          onClick={this.hide}
          type="button"
          value="Debug"/>
        {content}
      </div>
    )
  }

}
