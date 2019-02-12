<template>
  <div class="preview-content" :style="createStyles(data.basic)">
    <el-carousel v-if="data.value.length" indicator-position="none" class="carousel-box">
      <el-carousel-item v-for="(item, index) in data.value" :key="index">
        <img :src="item.value" alt="">
      </el-carousel-item>
    </el-carousel>
    <img v-else :src="data.coverUrl" alt="">
  </div>
</template>

<script>
export default {
  name: 'preview-poster',
  props: ['data', 'scale'],
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
.preview-content {
  position: absolute;
  img {
    width: 100%;
    height: 100%;
  }
  .carousel-box {
    width: 100%;
    height: 100%;
  }
}
</style>
