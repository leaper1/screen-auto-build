<template>
  <div class="panel-body" :style="panelStyle" ref="canvasDom">
    <preview-item :data="items"></preview-item>
  </div>
</template>

<script>
import html2canvas from 'html2canvas'
import PreviewItem from '@c/PreviewItem'
import { mapGetters } from 'vuex'
export default {
  name: 'SavePerview',
  data () {
    return {

    }
  },
  components: {
    PreviewItem
  },
  computed: {
    ...mapGetters({
      items: 'renderItems'
    }),
    panelStyle () {
      return {
        width: this.items.data.w + 'px',
        height: this.items.data.h + 'px'
      }
    }
  },
  methods: {
    drawCanvas () {
      // 前端绘图
      let mycanvas = this.$refs.canvasDom
      let width = mycanvas.offsetWidth
      let height = mycanvas.offsetHeight
      let canvas = document.createElement('canvas') // 创建一个canvas节点
      let scale = 0.5 // 定义任意放大倍数 支持小数
      canvas.width = width * scale // 定义canvas 宽度 * 缩放
      canvas.height = height * scale // 定义canvas高度 *缩放
      canvas.getContext('2d').scale(scale, scale) // 获取context,设置scale
      let opts = {
        scale: scale, // 添加的scale 参数
        canvas: canvas, // 自定义 canvas
        logging: false, // 日志开关，便于查看html2canvas的内部执行流程
        width: width, // dom 原始宽度
        height: height,
        useCORS: true
      }
      html2canvas(mycanvas, opts).then(canvas => {
        let imgData = canvas.toDataURL('image/png')
        console.log(imgData)
      })
    }
  },
  mounted () {
    this.drawCanvas()
  }
}
</script>

<style lang="scss" scoped>
.panel-body {
  margin: 0 auto;
  border: 2px dashed #dcdcdc;
}
</style>
