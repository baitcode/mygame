export const guid = () => {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}


export const xyClient2Viewport = (oX, oY, viewport) => {
  return {
    x: oX - viewport.clientPosition.x - 1,
    y: oY - viewport.clientPosition.y - 1
  }
}

export const xyViewport2Map = (oX, oY, viewport) => {
  return {
    x: oX + viewport.position.x - 1,
    y: oY + viewport.position.y - 1
  }
}

export const xyClient2Map = (oX, oY, viewport) => {
  var viewportXY = xyClient2Viewport(oX, oY, viewport);
  return xyViewport2Map(
    viewportXY.x, viewportXY.y, viewport
  )
}
