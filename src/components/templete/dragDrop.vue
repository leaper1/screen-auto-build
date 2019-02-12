<template>
  <div v-show="show" :class="{'miss-drop': hitDrop, 'can-drop': dragInfo.dragTag}" class="drag-module" :style="style">
    <component v-if="!currentModule.data" :is="currentModule.type"></component>
    <component v-else :data="currentModule.data" :is="currentModule.type"></component>
  </div>
</template>

<script>
import _ from 'lodash'
import { mapGetters, mapActions } from 'vuex'
import { components } from '@/modules'

export default {
  name: 'drag-module',
  data () {
    return {
      show: false,
      hitDrop: false,
      currentModule: {},
      left: null,
      top: null
    }
  },
  props: ['startEvent'],
  components: {
    ...components
  },
  computed: {
    ...mapGetters({
      dragInfo: 'dragInfo',
      dragModule: 'dragModule',
      draging: 'draging'
    }),
    style () {
      if (!this.currentModule.type) {
        return null
      }
      return {
        width: this.currentModule.data.basic.width + 'px',
        height: this.currentModule.data.basic.height + 'px',
        left: this.left,
        top: this.top
      }
    }
  },
  watch: {
    dragModule: function (newVal) {
      this.currentModule = newVal
      let isEmpty = (_.isEmpty(newVal))
      if (isEmpty) {
        this.show = false
      }
      if (!isEmpty && !this.draging) {
        this.editDraging(true)
        this.hitDrop = false
        this.startDrag(newVal)
      }
    }
  },
  methods: {
    ...mapActions([
      'activeRenderItem',
      'dropRenderItem',
      'blurRenderItem',
      'editDragModule',
      'editDraging'
    ]),
    startDrag () {
      let that = this

      this.blurRenderItem()

      // 设置点击时初始位置，防止延迟渲染上一次操作的位置
      that.$nextTick(() => {
        that.left = `${that.startEvent.clientX - this.currentModule.data.basic.width / 2}px`
        that.top = `${that.startEvent.clientY - this.currentModule.data.basic.height / 2}px`
      })
      that.show = true

      window.addEventListener('mousemove', onMove)
      window.addEventListener('mouseup', function upEvent (event) {
        window.removeEventListener('mousemove', onMove)
        window.removeEventListener('mouseup', upEvent)
        that.stopDrag(event)
      })

      function onMove (event = window.event) {
        let el = that.$el

        that.activeRenderItem(event)
        that.$nextTick(() => {
          that.left = `${event.clientX - el.clientWidth / 2}px`
          that.top = `${event.clientY - el.clientHeight / 2}px`
        })
      }
    },

    stopDrag (event) {
      setTimeout(() => {
        this.hitDrop = this.dropRenderItem(event)
        this.editDragModule({})
        this.editDraging(false)
      }, 0)
    }
  }
}
</script>

<style lang="scss" scoped>
.drag-module {
  display: block;
  position: fixed;
  left: 0;
  top: 0;
  cursor: pointer;
  opacity: 0.8;
  pointer-events: none;
  transform: scale(0.7);
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.50);
  z-index: 999;
  background: #fff;
}
</style>
