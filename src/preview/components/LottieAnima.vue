<template>
  <div class="lottie-content" :style="createStyles(data.basic)">
    <lottie :options="options" :data="data.value" :height="height" :width="width" v-on:animCreated="handleAnimation"/>
  </div>
</template>

<script>
import Lottie from '@ct/Lottie'

export default {
  name: 'preview-lottie',
  data () {
    return {
      anim: null
    }
  },
  computed: {
    width () {
      return this.data.basic.width * this.scale
    },
    height () {
      return this.data.basic.height * this.scale
    },
    options () {
      return {
        ...this.data.style,
        animationData: this.data.value || require('../../assets/pinjump.json')
      }
    }
  },
  props: ['data', 'scale'],
  components: {
    'lottie': Lottie
  },
  methods: {
    createStyles (style) {
      let width = style.width * this.scale + 'px'
      let height = style.height * this.scale + 'px'
      let left = style.left * this.scale + 'px'
      let top = style.top * this.scale + 'px'
      let transform = 'rotate(' + style.rotate + 'deg)'
      return { width, height, left, top, transform }
    },
    handleAnimation: function (anim) {
      this.anim = anim
    }
  }
}
</script>

<style lang="scss" scoped>
.lottie-content {
  position: absolute;
}
</style>
