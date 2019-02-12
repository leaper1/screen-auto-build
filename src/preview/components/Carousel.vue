<template>
  <div class="carousel-content" :style="createStyles(data.basic)" :loop="data.style.loop" :interval="interval" :autoplay="data.style.autoplay">
    <el-carousel class="carousel-preview" indicator-position="none">
      <template v-for="(item, index) in data.value">
        <el-carousel-item v-show="item.type !== 'lottie'" :key="index">
          <img v-if="item.type === 'img'" :src="item.value" alt="">
          <img v-if="item.type === 'video'" :src="item.thumb" alt="">
        </el-carousel-item>
        <lottie v-if="item.type === 'lottie'" :key="'lottie' + index" :options="item"></lottie>
      </template>
    </el-carousel>
  </div>
</template>

<script>
import Lottie from '@ct/Lottie'

export default {
  name: 'preview-carousel',
  props: ['data', 'scale'],
  components: {
    'lottie': Lottie
  },
  computed: {
    interval () {
      return parseInt(this.data.style.interval)
    }
  },
  methods: {
    createStyles (style) {
      let width = style.width * this.scale + 'px'
      let height = style.height * this.scale + 'px'
      let left = style.left * this.scale + 'px'
      let top = style.top * this.scale + 'px'
      let transform = 'rotate(' + style.rotate + 'deg)'
      return { width, height, left, top, transform }
    }
  }
}
</script>

<style lang="scss" scoped>
.carousel-content {
  position: absolute;
}
.carousel-preview {
  width: 100%;
  height: 100%;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
