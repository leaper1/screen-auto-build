<template>
  <div ref="drag" :style="dragStyle" @click="bindMousedown" class="drag-move" @contextmenu.stop.prevent="showMenu">
    <slot></slot>
    <div class="resize resize-top top"></div>
    <div class="resize resize-right right"></div>
    <div class="resize resize-bottom bottom"></div>
    <div class="resize resize-left left"></div>
    <div class="resize tl resize-top resize-left"></div>
    <div class="resize tr resize-top resize-right"></div>
    <div class="resize bl resize-bottom resize-left"></div>
    <div class="resize br resize-bottom resize-right"></div>
  </div>
</template>

<script>
import interact from 'interactjs'
import { mapGetters, mapActions } from 'vuex'

window.interact = interact
export default {
  data () {
    return {
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
    onStyle: Object,
    allowKeyMove: Boolean,
    restriction: String,
    items: Array,
    item: Object,
    parentData: Object
  },
  computed: {
    ...mapGetters({
      scale: 'scale'
    }),
    dragStyle () {
      return {
        width: this.onStyle.width + 'px',
        height: this.onStyle.height + 'px',
        left: this.onStyle.left + 'px',
        top: this.onStyle.top + 'px'
        // transform: 'rotate(' + this.onStyle.rotate + 'deg)'
      }
    }
  },
  methods: {
    ...mapActions([
      'blurRenderItem',
      'backupRenderItem',
      'editContextMenu'
    ]),
    bindMousedown (event) {
      if (event) event.preventDefault()
      this.$emit('mousedown')
      if (event) event.stopPropagation()
    },
    getPosition (event) {
      let style = event.target.style
      return {
        width: parseInt(style.width),
        height: parseInt(style.height),
        top: parseInt(style.top),
        left: parseInt(style.left)
      }
    },

    setPosition (el, type, value) {
      let typeMap = {
        left: ['left', 'data-x'],
        top: ['top', 'data-y']
      }
      let curMap = typeMap[type]

      el.style[curMap[0]] = `${value}px`
      el.setAttribute(curMap[1], value)
    },

    getPositionStyle (target) {
      let style = null

      if (getComputedStyle(target).position === 'fixed') {
        style = target.getBoundingClientRect()
      } else {
        let left = target.offsetLeft
        let top = target.offsetTop
        let width = target.offsetWidth
        let height = target.offsetHeight
        style = {
          left, top, width, height
        }
      }

      return style
    },

    showMenu (event = window.event) {
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
      this.item.data.basic.width = this.parentData.w
      this.item.data.basic.height = this.parentData.h
      this.item.data.basic.top = 0
      this.item.data.basic.left = 0
      this.blurRenderItem()
      this.backupRenderItem()
    },
    handleRotate (deg) {
      this.item.data.basic.rotate += deg
    },
    // 加载缩放
    init () {
      let that = this
      interact(this.$refs.drag)
        // 拖动
        .draggable({
          autoScroll: true,
          restrict: {
            restriction: that.restriction,
            elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
          },
          onstart: function (event) {
            let target = event.target
            let style = that.getPositionStyle(target)
            let x = style.left
            let y = style.top
            target.setAttribute('data-x', x)
            target.setAttribute('data-y', y)
          },
          // call this function on every dragmove event
          onmove: function (event) {
            let target = event.target
            let style = that.getPositionStyle(target)

            let x = (parseFloat(target.getAttribute('data-x')) || style.left)
            let y = (parseFloat(target.getAttribute('data-y')) || style.top)
            x += event.dx / that.scale
            y += event.dy / that.scale

            that.setPosition(target, 'left', x.toFixed())
            that.setPosition(target, 'top', y.toFixed())
          },
          onend: function (event) {
            that.$emit('update', that.getPosition(event))
          }
        })
        // 变形
        .resizable({
          edges: {
            left: '.resize-left',
            right: '.resize-right',
            bottom: '.resize-bottom',
            top: '.resize-top'
          },
          restrictEdges: {
            outer: that.restriction,
            endOnly: true
          },
          // minimum size
          restrictSize: {
            min: { width: 40, height: 20 }
          },
          // 缩放动画
          inertia: true,
          onstart: function (event) {
            let target = event.target
            let style = that.getPositionStyle(target)
            let x = style.left
            let y = style.top
            target.setAttribute('data-x', x)
            target.setAttribute('data-y', y)
          },
          onmove: function (event) {
            let target = event.target
            let style = that.getPositionStyle(target)

            // update the element's style
            target.style.width = (event.rect.width / that.scale).toFixed() + 'px'
            target.style.height = (event.rect.height / that.scale).toFixed() + 'px'

            let x = (parseFloat(target.getAttribute('data-x')) || style.left)
            let y = (parseFloat(target.getAttribute('data-y')) || style.top)
            x += event.deltaRect.left / that.scale
            y += event.deltaRect.top / that.scale
            that.setPosition(target, 'left', x.toFixed())
            that.setPosition(target, 'top', y.toFixed())
          },
          onend: function (event) {
            that.$emit('update', that.getPosition(event))
          }
        })
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style lang="scss" scoped>
  .drag-move {
    position: absolute;
    z-index: 10;
    // transition: transform 0.2s;
    .resize {
      position: absolute;
      display: none;
      width: 12px;
      height: 12px;
      background-color: #ffffff;
      border: 1px solid #2196F3;
      border-radius: 50%;
      &.top {
        top: -8px;
        left: 50%;
        margin-left: -8px;
      }
      &.bottom {
        bottom: -8px;
        left: 50%;
        margin-left: -8px;
      }
      &.left {
        top: 50%;
        left: -8px;
        margin-top: -8px;
      }
      &.right {
        top: 50%;
        right: -8px;
        margin-top: -8px;
      }
      &.tl {
        top: -7px;
        left: -7px;
      }
      &.tr {
        top: -7px;
        right: -7px;
      }
      &.bl {
        bottom: -7px;
        left: -7px;
      }
      &.br {
        bottom: -7px;
        right: -7px;
      }
    }
    &.current {
      z-index: 11;
      outline: 2px solid #2196F3;
      .resize {
        display: block;
      }
    }
    .component {
      width: 100%;
      height: 100%;
    }
    // &>* {
    //   transition: transform 0.2s;
    // }
  }
</style>
