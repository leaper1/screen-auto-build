<template>
  <div class="preview-content" :style="createStyles(data.basic)">
      <el-carousel v-if="data.value.length" indicator-position="none" :autoplay="false" class="carousel-box">
        <el-carousel-item v-for="(item, index) in data.value" :key="index">
          <video controls autoplay>
            <source :src="item.url" type="video/mp4" />
            <source :src="item.url" type="video/ogg" />
            <source :src="item.url" type="video/webm" />
            您的浏览器不支持 HTML5 video 标签。
          </video>
        </el-carousel-item>
      </el-carousel>
      <!-- <video controls autoplay>
        <source :src="data.value[0].url" type="video/mp4" />
        <source :src="data.value[0].url" type="video/ogg" />
        <source :src="data.value[0].url" type="video/webm" />
        您的浏览器不支持 HTML5 video 标签。
      </video> -->
      <img v-if="!data.value.length" :src="data.coverUrl" alt="">
  </div>
</template>

<script>
export default {
  name: 'preview-vdo',
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
  img, video {
    width: 100%;
    height: 100%;
  }
  .carousel-box {
    width: 100%;
    height: 100%;
  }
}
</style>
