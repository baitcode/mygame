import React from 'react'
import { StyleSheet, css } from 'aphrodite/no-important'


const styles = StyleSheet.create({
  header: {
    height: '50px',
    fontSize: '40px',
  },
  app: {
    position: 'absolute',
    overflow: 'auto',
    border: '10px solid black',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
});


export default class App extends React.Component {
  render() {
    return (
      <div className={css(styles.app)}>
        {this.props.children}
      </div>
    )
  }
}
