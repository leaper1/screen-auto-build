<template>
  <div class="preview-content" :style="createStyles(data.basic)">
    <p :style="customStyle()" v-html="formatValue"></p>
  </div>
</template>

<script>
export default {
  name: 'preview-txt',
  props: ['data', 'scale'],
  computed: {
    formatValue () {
      return this.data.value.replace(/\n|\r\n/g, '<br/>')
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
    },
    customStyle () {
      let style = {
        ...this.data.style
      }
      style.fontSize = parseInt(style.fontSize) * this.scale + 'px'
      return style
    }
  }
}
</script>

<style lang="scss" scoped>
.preview-content {
  position: absolute;
  p {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
}
</style>
