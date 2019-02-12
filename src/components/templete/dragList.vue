<template>
  <ul class="drag-list cf">
    <li v-for="(item, index) in modules" :key="index" title="按住拖拽" @mousedown="handleDrag(item)">
      <i :class="'icon-'+item.icon"></i>
      {{item.alias}}
    </li>
    <drag-drop :start-event="event"></drag-drop>
  </ul>
</template>

<script>
import { mapActions } from 'vuex'
import { modules } from '@/modules'
import DragDrop from './dragDrop'

export default {
  name: 'DragList',
  data () {
    return {
      modules,
      event: null
    }
  },
  components: {
    DragDrop
  },
  methods: {
    ...mapActions([
      'editDragModule'
    ]),
    handleDrag (item) {
      let that = this
      // 解决火狐下 window.enevt 获取不到事件
      window.addEventListener('mousedown', function downEvent (event) {
        that.event = event || window.event
        window.removeEventListener('mousedown', downEvent)
        that.editDragModule(item)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.drag-list li{
  float: left;
  display: flex;
  align-items: center;
  margin: 0 5px;
  color: #505050;
  border-radius: 4px;
  padding: 0 8px;
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  &:hover {
    background-color: #dcf3fb;
    color: #1882df;
  }
  i {
    display: block;
    width: 30px;
    height: 30px;
    margin-right: 5px;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: center center;
    &.icon-text {
      background-image: url('../../assets/icon-text.png')
    }
    &.icon-qrcode {
      background-image: url('../../assets/icon-qrcode.png')
    }
    &.icon-txcode {
      background-image: url('../../assets/icon-txcode.png')
    }
    &.icon-image {
      background-image: url('../../assets/icon-image.png')
    }
    &.icon-video {
      background-image: url('../../assets/icon-video.png')
    }
    &.icon-gif {
      background-image: url('../../assets/icon-gif.png')
    }
    &.icon-carousel {
      background-image: url('../../assets/icon-slide.png')
    }
  }
}
</style>
