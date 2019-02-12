<template>
  <el-carousel class="carousel-box" arrow="never" :loop="data.style.loop" :interval="interval" :autoplay="data.style.autoplay">
    <template v-for="(item, index) in data.value">
      <el-carousel-item v-show="item.type !== 'lottie'" :key="index">
        <img v-if="item.type === 'img'" :src="item.value" alt="">
        <img v-if="item.type === 'video'" :src="item.thumb" alt="">
      </el-carousel-item>
      <lottie v-if="item.type === 'lottie'" :key="'lottie'+ index" :options="item"></lottie>
    </template>
    <img v-if="!data.value.length" :src="data.coverUrl" alt="">
  </el-carousel>
</template>

<script>
import Lottie from '@ct/Lottie'

export default {
  name: 'CarouselModule',
  data () {
    return {

    }
  },
  props: {
    data: Object
  },
  components: {
    'lottie': Lottie
  },
  computed: {
    interval () {
      return parseInt(this.data.style.interval)
    }
  }
}
</script>

<style lang="scss" scoped>
.carousel-box {
  width: 100%;
  height: 100%;
  img {
    display: block;
    width: 100%;
    height: 100%;
  }
}
</style>
