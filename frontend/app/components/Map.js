import React from 'react';

import { StyleSheet, css } from 'aphrodite/no-important'

import {connect} from 'react-redux';

import spritesheet from '~/assets/roguelikeSheet_transparent.png';

const styles = StyleSheet.create({
  map: {
    position: 'relative',
    top: 0,
    left: 0,
  },
});


const getSprite = (x, y) => {
  return [-x * (17), -y * 17].map( v => v+'px').join(' ')
}

@connect(state => {
  return {
    map: state.map,
    viewport: state.viewport,
  }
})
export default class Map extends React.Component {
  zzz = {
    topIndex: null,
    leftIndex: null,
    rightIndex: null,
    bottomIndex: null,
  }

  render() {

    const map = this.props.map;
    const viewport = this.props.viewport;

    var width = map.width;
    var height = map.height;

    var tileWidth = map.tileWidth;
    var tileHeight = map.tileHeight;

    const style = {
      width,
      height,
      top: -viewport.position.y,
      left: -viewport.position.x
    };

    const horizontalTileCount = width / tileWidth;
    const verticalTileCount = height / tileHeight;

    const areInsideViewport = (edge, idx, arr) => {
      return (
        viewport.position.x < edge.x
        && viewport.position.y < edge.y
        && viewport.position.x + viewport.size.width > edge.x
        && viewport.position.y + viewport.size.height > edge.y
      )
    }

    const {topIndex, leftIndex, rightIndex, bottomIndex} = this.zzz;

    const topStart = Math.max(0, (topIndex || 0) - 5);
    const topEnd = Math.min(verticalTileCount, (bottomIndex || verticalTileCount) + 5);

    const leftStart = Math.max(0, (leftIndex || 0) - 5);
    const leftEnd = Math.min(horizontalTileCount, (rightIndex || horizontalTileCount) + 5);


    const tiles = [];
    for (var i = topStart; i < topEnd; i++) {
      for (var j = leftStart; j < leftEnd; j++) {

        const edges = [
          {
            x: tileWidth * i,
            y: tileHeight * j,
          },
          {
            x: tileWidth * (i + 1),
            y: tileHeight * j,
          },
          {
            x: tileWidth * i,
            y: tileHeight * (j + 1),
          },
          {
            x: tileWidth * (i + 1),
            y: tileHeight * (j + 1),
          }
        ]

        if (edges.some(areInsideViewport)) {
          tiles.push([i, j]);
        }
      }
    }

    const tileDivs = [];

    var newTopIndex = null
    var newLeftIndex = null
    var newRightIndex = null
    var newBottomIndex = null

    for (var idx in tiles) {
      const tile = tiles[idx]
      const tileStyle = {
        position: 'absolute',
        width: tileWidth,
        height: tileHeight,
        left: tileWidth * tile[0],
        top: tileHeight * tile[1],
        'backgroundImage': 'url(' + spritesheet + ')',
        'backgroundPosition': getSprite(3, 16)
      }
      newTopIndex = Math.min(newTopIndex || tile[0], tile[0]);
      newLeftIndex = Math.min(newLeftIndex || tile[1], tile[1]);
      newRightIndex = Math.max(newRightIndex || tile[1], tile[1]);
      newBottomIndex = Math.max(newBottomIndex || tile[0], tile[0]);

      tileDivs.push(
        <div key={tile[0] + " " + tile[1]} style={tileStyle}></div>
      )
    }

    this.zzz = {
      topIndex: newTopIndex,
      leftIndex: newLeftIndex,
      rightIndex: newRightIndex,
      bottomIndex: newBottomIndex,
    }

    return (
      <div className={css(styles.map)} style={style}>
        {this.props.children}
        {tileDivs}
      </div>
    )
  }
}
