/**
 * 取得rect中心点
 * @param  {[type]} box [description]
 */
function getConterPoint (box) {
  return {
    x: box.offsetLeft + box.offsetWidth / 2,
    y: box.offsetTop + box.offsetHeight / 2
  }
}

/**
 * 取得鼠标释放点在rect8点坐标中的对应点及其对角线点
 * @param  {[type]} point [description]
 * @param  {[type]} ex    [description]
 * @param  {[type]} ey    [description]
 */
function getPointAndOpposite (point, ex, ey) {
  let oppositePoint = {}
  let currentPoint = {}

  let minDelta = 1000
  let currentIndex = 0
  let oppositeIndex = 0

  point.forEach((p, index) => {
    const delta = Math.sqrt(Math.pow(p.x - ex, 2) + Math.pow(p.y - ey, 2))
    // 求出最小值对应的index
    if (delta < minDelta) {
      currentPoint = p
      currentIndex = index
      minDelta = delta
      // 对角线点index相差4
      let offset = 4
      let oIndex = index - offset
      if (oIndex < 0) {
        oIndex = index + offset
      }
      // 取对角线点坐标
      oppositePoint = point.slice(oIndex, oIndex + 1)[0]
      oppositeIndex = oIndex
    }
  })

  return {
    current: {
      index: currentIndex,
      point: currentPoint
    },
    opposite: {
      index: oppositeIndex,
      point: oppositePoint
    }
  }
}

/**
 * 根据缩放基点和缩放比例取得新的rect
 * @param  {[type]} oPoint               [description]
 * @param  {[type]} scale            [description]
 * @param  {[type]} oTransformedRect [description]
 * @param  {[type]} baseIndex        [description]
 * @return {[type]}                  [description]
 */
function getNewRect (oPoint, scale, oTransformedRect, baseIndex) {
  var scaledRect = getScaledRect({
    x: oPoint.x,
    y: oPoint.y,
    width: oPoint.width,
    height: oPoint.height,
    scale: scale
  })
  var transformedRotateRect = transform(scaledRect, oPoint.rotate)
  // 计算到平移后的新坐标
  var translatedX = oTransformedRect.point[baseIndex].x - transformedRotateRect.point[baseIndex].x + transformedRotateRect.left
  var translatedY = oTransformedRect.point[baseIndex].y - transformedRotateRect.point[baseIndex].y + transformedRotateRect.top

  // 计算平移后元素左上角的坐标
  var newX = translatedX + transformedRotateRect.width / 2 - scaledRect.width / 2
  var newY = translatedY + transformedRotateRect.height / 2 - scaledRect.height / 2

  // 缩放后元素的高宽
  var newWidth = scaledRect.width
  var newHeight = scaledRect.height

  return {
    x: newX,
    y: newY,
    width: newWidth,
    height: newHeight
  }
}

/**
 * 取得缩放指定倍数后的坐标
 * @param  {[type]} params    rect
 * @param  {[type]} baseIndex 基点索引
 */
function getScaledRect (params, baseIndex) {
  var { x, y, width, height, scale } = params
  var offset = {
    x: 0,
    y: 0
  }
  var deltaXScale = scale.x - 1
  var deltaYScale = scale.y - 1
  var deltaWidth = width * deltaXScale
  var deltaHeight = height * deltaYScale
  var newWidth = width + deltaWidth
  var newHeight = height + deltaHeight
  var newX = x - deltaWidth / 2
  var newY = y - deltaHeight / 2
  if (baseIndex) {
    var points = [{ x, y }, { x: x + width, y }, { x: x + width, y: y + height }, { x, y: y + height }]
    var newPoints = [{ x: newX, y: newY }, { x: newX + newWidth, y: newY }, { x: newX + newWidth, y: newY + newHeight }, { x: newX, y: newY + newHeight }]
    offset.x = points[baseIndex].x - newPoints[baseIndex].x
    offset.y = points[baseIndex].y - newPoints[baseIndex].y
  }
  return {
    x: newX + offset.x,
    y: newY + offset.y,
    width: newWidth,
    height: newHeight
  }
}

/**
 * 获取旋转指定角度后的rect
 * @param  {[type]} options rect
 * @param  {[type]} angle   旋转角度
 * @return {[type]}
 */
function transform (options, angle) {
  var x = options.x
  var y = options.y
  var width = options.width
  var height = options.height

  var r = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2)) / 2
  var a = Math.round(Math.atan(height / width) * 180 / Math.PI)
  var tlbra = 180 - angle - a
  var trbla = a - angle
  var ta = 90 - angle
  var ra = angle

  var halfWidth = width / 2
  var halfHeight = height / 2

  var middleX = x + halfWidth
  var middleY = y + halfHeight

  var topLeft = {
    x: middleX + r * Math.cos(tlbra * Math.PI / 180),
    y: middleY - r * Math.sin(tlbra * Math.PI / 180)
  }
  var top = {
    x: middleX + halfHeight * Math.cos(ta * Math.PI / 180),
    y: middleY - halfHeight * Math.sin(ta * Math.PI / 180)
  }
  var topRight = {
    x: middleX + r * Math.cos(trbla * Math.PI / 180),
    y: middleY - r * Math.sin(trbla * Math.PI / 180)
  }
  var right = {
    x: middleX + halfWidth * Math.cos(ra * Math.PI / 180),
    y: middleY + halfWidth * Math.sin(ra * Math.PI / 180)
  }
  var bottomRight = {
    x: middleX - r * Math.cos(tlbra * Math.PI / 180),
    y: middleY + r * Math.sin(tlbra * Math.PI / 180)
  }
  var bottom = {
    x: middleX - halfHeight * Math.sin(ra * Math.PI / 180),
    y: middleY + halfHeight * Math.cos(ra * Math.PI / 180)
  }
  var bottomLeft = {
    x: middleX - r * Math.cos(trbla * Math.PI / 180),
    y: middleY + r * Math.sin(trbla * Math.PI / 180)
  }
  var left = {
    x: middleX - halfWidth * Math.cos(ra * Math.PI / 180),
    y: middleY - halfWidth * Math.sin(ra * Math.PI / 180)
  }
  var minX = Math.min(topLeft.x, topRight.x, bottomRight.x, bottomLeft.x)
  var maxX = Math.max(topLeft.x, topRight.x, bottomRight.x, bottomLeft.x)
  var minY = Math.min(topLeft.y, topRight.y, bottomRight.y, bottomLeft.y)
  var maxY = Math.max(topLeft.y, topRight.y, bottomRight.y, bottomLeft.y)
  return {
    point: [topLeft, top, topRight, right, bottomRight, bottom, bottomLeft, left],
    width: maxX - minX,
    height: maxY - minY,
    left: minX,
    right: maxX,
    top: minY,
    bottom: maxY
  }
}

export { getConterPoint, getPointAndOpposite, getNewRect, getScaledRect, transform }
