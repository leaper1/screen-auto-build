<template>
  <div class="dragmove-box" ref="drag" :style="style" @click="bindMousedown" @contextmenu.stop.prevent="showContextMenu">
    <div class="rotate" ref="rotate">
      <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSItNzE5MyA0MjM2IDQ0IDQ0Ij4KICA8ZGVmcz4KICAgIDxzdHlsZT4KICAgICAgLmNscy0xIHsKICAgICAgICBmaWxsOiAjM2EzYTNhOwogICAgICB9CgogICAgICAuY2xzLTIgewogICAgICAgIGZpbGw6ICNmZmY7CiAgICAgIH0KCiAgICAgIC5jbHMtMyB7CiAgICAgICAgZmlsdGVyOiB1cmwoI2VsbGlwc2UtMTQpOwogICAgICB9CiAgICA8L3N0eWxlPgogICAgPGZpbHRlciBpZD0iZWxsaXBzZS0xNCIgeD0iLTcxOTMiIHk9IjQyMzYiIHdpZHRoPSI0NCIgaGVpZ2h0PSI0NCIgZmlsdGVyVW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KICAgICAgPGZlT2Zmc2V0IGR5PSIzIiBpbnB1dD0iU291cmNlQWxwaGEiLz4KICAgICAgPGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj0iMyIgcmVzdWx0PSJibHVyIi8+CiAgICAgIDxmZUZsb29kIGZsb29kLW9wYWNpdHk9IjAuMTYxIi8+CiAgICAgIDxmZUNvbXBvc2l0ZSBvcGVyYXRvcj0iaW4iIGluMj0iYmx1ciIvPgogICAgICA8ZmVDb21wb3NpdGUgaW49IlNvdXJjZUdyYXBoaWMiLz4KICAgIDwvZmlsdGVyPgogIDwvZGVmcz4KICA8ZyBpZD0iR3JvdXBfMTY4IiBkYXRhLW5hbWU9Ikdyb3VwIDE2OCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTgwNzMgNDAwOCkiPgogICAgPGcgY2xhc3M9ImNscy0zIiB0cmFuc2Zvcm09Im1hdHJpeCgxLCAwLCAwLCAxLCA4MDczLCAtNDAwOCkiPgogICAgICA8Y2lyY2xlIGlkPSJlbGxpcHNlLTE0LTIiIGRhdGEtbmFtZT0iZWxsaXBzZS0xNCIgY2xhc3M9ImNscy0xIiBjeD0iMTMiIGN5PSIxMyIgcj0iMTMiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC03MTg0IDQyNDIpIi8+CiAgICA8L2c+CiAgICA8ZyBpZD0iZ3JvdXAtMTMiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDg5NS40OTIgMjQwLjMwNikiPgogICAgICA8ZyBpZD0iZ3JvdXAiPgogICAgICAgIDxwYXRoIGlkPSJwYXRoIiBjbGFzcz0iY2xzLTIiIGQ9Ik0xMi44Myw4Ljg2N2E2LjYxNSw2LjYxNSwwLDEsMS0xLjc4NC03LjE2aDBMMTIuMzM3LjQxM2MuMjMtLjIzLjQxNi0uMTUzLjQxNS4xNzNMMTIuNzM5LDMuODZhLjYuNiwwLDAsMS0uNTkyLjU5MmwtMy4yNTYuMDA2Yy0uMzI2LDAtLjQtLjE4Ni0uMTczLS40MTZsMS4zMjctMS4zMjhBNS4xOTUsNS4xOTUsMCwxLDAsMTEuNSw4LjM2N2guMDA2YS43MDkuNzA5LDAsMSwxLDEuMzIxLjVaIi8+CiAgICAgIDwvZz4KICAgIDwvZz4KICA8L2c+Cjwvc3ZnPgo=">
    </div>
    <div class="draggable" ref="draggable">
      <slot></slot>
    </div>
    <div class="resizable" ref="resizable">
      <span class="tl" draggable="true"></span>
      <span class="t" draggable="true"></span>
      <span class="tr" draggable="true"></span>
      <span class="r" draggable="true"></span>
      <span class="br" draggable="true"></span>
      <span class="b" draggable="true"></span>
      <span class="bl" draggable="true"></span>
      <span class="l" draggable="true"></span>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { getConterPoint, getPointAndOpposite, getNewRect, transform } from '@/utils/dragMoveUtil.js'

export default {
  name: 'DragMove',
  data () {
    return {
      box: null,
      resizable: null,
      boxLeft: 0,
      boxTop: 0,
      contextMenuData: {
        axios: {
          x: null,
          y: null
        },
        menulists: []
      }
    }
  },
  props: {
    point: Object,
    restriction: String,
    items: Array,
    item: Object,
    parentData: Object
  },
  computed: {
    ...mapGetters({
      scale: 'scale'
    }),
    style () {
      return {
        left: this.point.left + 'px',
        top: this.point.top + 'px',
        width: this.point.width + 'px',
        height: this.point.height + 'px',
        transform: 'rotate(' + this.point.rotate + 'deg)'
      }
    }
  },
  watch: {
    scale (val) {
      this.init()
    }
  },
  methods: {
    ...mapActions([
      'blurRenderItem',
      'backupRenderItem',
      'editContextMenu',
      'pushCopyData'
    ]),

    init () {
      let that = this
      this.box = this.$refs.drag
      // 父元素的 X Y
      this.boxTop = this.box.parentNode.getBoundingClientRect().top
      this.boxLeft = this.box.parentNode.getBoundingClientRect().left
      let rotateHandler = this.$refs.rotate
      let draggable = this.$refs.draggable
      this.resizable = this.$refs.resizable
      let resizeHandlers = Array.prototype.slice.call(this.resizable.childNodes, 0)
      this.setCursorStyle(0)
      this.bindMoveEvents(draggable)
      this.bindRotateEvents(rotateHandler, this.box)
      resizeHandlers.map(handler => {
        that.bindResizeEvents(handler)
      })
    },

    bindMousedown (event) {
      if (event) event.preventDefault()
      this.$emit('mousedown')
      if (event) event.stopPropagation()
    },

    // 绑定旋转事件
    bindRotateEvents (node, box) {
      let that = this
      node.onmousedown = function (event = window.event) {
        event.preventDefault()
        // 旋转开始
        var point = getConterPoint(box)
        var ex = (event.pageX - that.boxLeft) / that.scale
        var ey = (event.pageY - that.boxTop) / that.scale

        var prevAngle = Math.atan2(ey - point.y, ex - point.x) - that.point.rotate * Math.PI / 180
        document.onmousemove = function (event = window.event) {
          var nex = (event.pageX - that.boxLeft) / that.scale
          var ney = (event.pageY - that.boxTop) / that.scale
          // 旋转
          var angle = Math.atan2(ney - point.y, nex - point.x)
          that.point.rotate = Math.floor((angle - prevAngle) * 180 / Math.PI)
          // that.draw()
          document.onmouseup = function () {
            that.backupRenderItem()
            document.onmousemove = null
            document.onmouseup = null
          }
        }
        document.onmouseup = function () {
          // 旋转结束
          document.onmousemove = null
          document.onmouseup = null
          that.setCursorStyle(that.point.rotate)
        }
      }
      node.ondragstart = function (event = window.event) {
        event.preventDefault()
        return false
      }
    },

    // 绑定缩放事件
    bindResizeEvents (node) {
      let that = this
      node.onmousedown = function (event = window.event) {
        // 缩放开始
        event.preventDefault()
        var { left, top, width, height, rotate } = that.point
        // 相对于父元素的 left， top
        var ex = (event.pageX - that.boxLeft) / that.scale
        var ey = (event.pageY - that.boxTop) / that.scale

        // 计算初始状态旋转后的rect
        var transformedRect = transform({
          x: left,
          y: top,
          width,
          height
        }, rotate)
        // 取得旋转后的8点坐标
        var { point } = transformedRect

        // 获取当前点和对角线点
        var pointAndOpposite = getPointAndOpposite(point, ex, ey)

        var { opposite } = pointAndOpposite

        // 对角线点的索引即为缩放基点索引
        var baseIndex = opposite.index

        var oppositeX = opposite.point.x
        var oppositeY = opposite.point.y

        // console.log(baseIndex)

        // 鼠标释放点距离当前点对角线点的偏移量
        var offsetWidth = Math.abs(ex - oppositeX)
        var offsetHeight = Math.abs(ey - oppositeY)

        // 记录最原始的状态
        var oPoint = {
          x: left,
          y: top,
          width,
          height,
          rotate
        }

        document.onmousemove = function (event = window.event) {
          // 移动后相对于父元素的 x y
          var nex = (event.pageX - that.boxLeft) / that.scale
          var ney = (event.pageY - that.boxTop) / that.scale

          var scale = { x: 1, y: 1 }
          // var realScale = 1
          var realScaleX = 1
          var realScaleY = 1
          // 随意缩放
          realScaleX = Math.abs(nex - oppositeX) / offsetWidth
          realScaleY = Math.abs(ney - oppositeY) / offsetHeight

          // 等比缩放--判断是根据x方向的偏移量来计算缩放比还是y方向的来计算
          // if (offsetWidth > offsetHeight) {
          //   realScale = realScaleX
          // } else {
          //   realScale = realScaleY
          // }

          if ([0, 2, 4, 6].indexOf(baseIndex) >= 0) {
            scale.x = realScaleX
            scale.y = realScaleY
            // 等比缩放
            // scale.x = scale.y = realScale
          } else if ([1, 5].indexOf(baseIndex) >= 0) {
            scale.y = realScaleY
          } else if ([3, 7].indexOf(baseIndex) >= 0) {
            scale.x = realScaleX
          }

          var newRect = getNewRect(oPoint, scale, transformedRect, baseIndex)
          that.point.left = Math.round(newRect.x)
          that.point.top = Math.round(newRect.y)
          that.point.width = Math.round(newRect.width)
          that.point.height = Math.round(newRect.height)
          // that.draw()
          document.onmouseup = function () {
            that.backupRenderItem()
            document.onmousemove = null
            document.onmouseup = null
          }
        }
        document.onmouseup = function () {
          document.onmousemove = null
          document.onmouseup = null
        }
      }
    },

    // 绑定拖动事件
    bindMoveEvents (box) {
      let that = this
      box.onmousedown = function (event = window.event) {
        event.preventDefault()

        var deltaX = event.pageX
        var deltaY = event.pageY
        var oldLeft = that.point.left
        var oldTop = that.point.top
        var width = that.parentData.w
        var height = that.parentData.h
        document.onmousemove = function (event = window.event) {
          let enx = (event.pageX - that.boxLeft) / that.scale
          let eny = (event.pageY - that.boxTop) / that.scale
          if (enx <= 0 || enx >= width || eny <= 0 || eny >= height) {
            document.onmousemove = null
          } else {
            that.point.left = oldLeft + Math.round((event.pageX - deltaX) / that.scale)
            that.point.top = oldTop + Math.round((event.pageY - deltaY) / that.scale)
          }
          // that.draw()
          document.onmouseup = function () {
            that.backupRenderItem()
            document.onmousemove = null
            document.onmouseup = null
          }
        }
        document.onmouseup = function () {
          document.onmousemove = null
          document.onmouseup = null
        }
      }
      box.ondragstart = function (event) {
        event.preventDefault()
        return false
      }
    },

    /**
     * 重绘视图
     */
    draw () {
      this.css(this.box, {
        left: this.point.left + 'px',
        top: this.point.top + 'px',
        width: this.point.width + 'px',
        height: this.point.height + 'px',
        transform: 'rotate(' + this.point.rotate + 'deg)'
      })
    },
    setCursorStyle (degree) {
      var top = this.resizable.querySelector('.t')

      var topRight = this.resizable.querySelector('.tr')

      var right = this.resizable.querySelector('.r')

      var bottomRight = this.resizable.querySelector('.br')

      var bottom = this.resizable.querySelector('.b')

      var bottomLeft = this.resizable.querySelector('.bl')

      var left = this.resizable.querySelector('.l')

      var topLeft = this.resizable.querySelector('.tl')

      var cursorStyle = this.getNewCursorArray(degree)
      this.css(top, { 'cursor': cursorStyle[0] })
      this.css(topRight, { 'cursor': cursorStyle[1] })
      this.css(right, { 'cursor': cursorStyle[2] })
      this.css(bottomRight, { 'cursor': cursorStyle[3] })
      this.css(bottom, { 'cursor': cursorStyle[4] })
      this.css(bottomLeft, { 'cursor': cursorStyle[5] })
      this.css(left, { 'cursor': cursorStyle[6] })
      this.css(topLeft, { 'cursor': cursorStyle[7] })
    },
    /**
     * 获取点的鼠标手势
     * @param  {[type]} degree [description]
     * @return {[type]}        [description]
     */
    getNewCursorArray (degree) {
      const cursorStyleArray = ['ns-resize', 'nesw-resize', 'ew-resize', 'nwse-resize', 'ns-resize', 'nesw-resize', 'ew-resize', 'nwse-resize']

      const ARR_LENGTH = 8
      const STEP = 45

      let startIndex = 0

      if (degree) {
        startIndex = Math.floor(degree / STEP)
        if (degree % STEP > (STEP / 2)) {
          startIndex += 1
        }
      }

      if (startIndex > 1) {
        const len = ARR_LENGTH - startIndex
        return (cursorStyleArray.slice(startIndex, startIndex + len))
          .concat(cursorStyleArray.slice(0, startIndex))
      }

      return cursorStyleArray
    },
    css (node, ops) {
      for (var index in ops) {
        node['style'][index] = ops[index]
      }
    },

    // 右键菜单
    showContextMenu (event = window.event) {
      event.preventDefault()
      var x = event.clientX
      var y = event.clientY
      // Get the current location
      this.contextMenuData.axios = {
        x, y
      }
      let menulists = [
        {
          fnHandler: this.handleCover,
          icoName: 'el-icon-rank',
          btnName: '平铺'
        },
        {
          fnHandler: this.handleDelete,
          icoName: 'el-icon-delete',
          btnName: '删除'
        },
        {
          fnHandler: this.handleCopy,
          icoName: 'fa fa-clone',
          btnName: '复制'
        },
        {
          separtor: true // 分割线
        },
        {
          fnHandler: null,
          icoName: 'el-icon-refresh',
          btnName: '旋转',
          subMenu: [{
            fnHandler: this.handleRotate,
            // icoName: 'el-icon-rank',
            btnName: '顺时针 30°',
            param: 30
          }, {
            fnHandler: this.handleRotate,
            // icoName: 'el-icon-rank',
            btnName: '顺时针 90°',
            param: 90
          }, {
            fnHandler: this.handleRotate,
            // icoName: 'el-icon-rank',
            btnName: '逆时针 30°',
            param: -30
          }, {
            fnHandler: this.handleRotate,
            // icoName: 'el-icon-rank',
            btnName: '逆时针 90°',
            param: -90
          }]
        }
      ]
      this.contextMenuData.menulists = menulists
      // 根据模块类型更改右键菜单内容
      if (this.item.type === 'Txt') {
        this.contextMenuData.menulists.splice(0, 1)
      }
      this.editContextMenu(this.contextMenuData)
    },
    handleDelete () {
      this.items.splice(this.items.findIndex(element => element === this.item), 1)
      this.blurRenderItem()
      this.backupRenderItem()
    },
    handleCover () {
      this.item.data.basic.width = parseInt(this.parentData.w)
      this.item.data.basic.height = parseInt(this.parentData.h)
      this.item.data.basic.top = 0
      this.item.data.basic.left = 0
      this.item.data.basic.rotate = 0
      this.blurRenderItem()
      this.backupRenderItem()
    },
    handleRotate (deg) {
      this.item.data.basic.rotate = (this.item.data.basic.rotate + deg) % 360
      this.backupRenderItem()
    },
    handleCopy () {
      this.pushCopyData(this.item)
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style lang="scss" scoped>
.dragmove-box {
  position: absolute;
  user-select: none;
  z-index: 10;
  &.current {
    z-index: 11;
    box-shadow: 0 0 0 2px #2196F3;
    // outline: 2px solid #2196F3;
    .resizable, .rotate {
      display: block;
    }

  }
  .draggable {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    cursor: move;
  }
  .resizable, .rotate {
    display: none;
  }
}

.dragmove-box .rotate {
  width: 40px;
  height: 40px;
  position: absolute;
  top: -40px;
  left: 50%;
  margin-left: -20px;
  cursor: pointer;
  img{
    width: 100%;
    height: 100%;
  }
}

.dragmove-box .resizable > span {
  width: 12px;
  height: 12px;
  position: absolute;
  border: 1px solid #2196F3;
  background: #fff;
  border-radius: 50%;
  cursor: pointer;
}
.tl {
  top: -8px;
  left: -8px;
}
.t {
  top: -8px;
  left: 50%;
  margin-left: -8px;
}
.tr {
  top: -8px;
  right: -8px;
}
.r {
  top: 50%;
  margin-top: -8px;
  right: -8px;
}
.br {
  bottom: -8px;
  right: -8px;
}
.b {
  bottom: -8px;
  left: 50%;
  margin-left: -8px;
}
.bl {
  bottom: -8px;
  left: -8px;
}
.l {
  left: -8px;
  top: 50%;
  margin-top: -8px;
}

</style>
