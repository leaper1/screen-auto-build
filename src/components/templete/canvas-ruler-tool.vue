<template>
  <canvas ref="canvas" width="2000" height="2000"></canvas>
</template>

<script>
export default {
  name: 'CanvasRuler',
  data () {
    return {
      canvas: null,
      ctx: null
    }
  },
  props: {
    rulerConfig: {
      type: Object,
      default: function () {
        return {
          width: 1920,
          height: 1920,
          origin: 40, // 刻度尺x坐标位置
          w: 10, // 刻度线的间隔
          h: 7 // 刻度线基础长度
        }
      }
    }
  },
  watch: {
    rulerConfig: {
      handler (newValue, oldValue) {
        this.canvas.width = newValue.width + 40
        this.canvas.height = newValue.height + 40
        // 画之前清空画布
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.drawX(this.ctx, newValue)
        this.drawY(this.ctx, newValue)
      },
      deep: true
    }
  },
  methods: {
    drawX (ctx, config) {
      var x = config.origin || 0
      var y = config.origin - 1 || 0
      var w = config.w || 5
      var h = config.h || 10
      var size = (config.width || 100) / w
      var offset// 上面数字的偏移量
      // 设置画笔属性
      ctx.strokeStyle = '#000'
      ctx.lineWidth = 1
      ctx.font = 10
      // 底部横线
      ctx.beginPath()
      ctx.moveTo(x, y)
      ctx.lineTo(size * w + x, y)
      ctx.stroke()
      for (var i = 0; i < size; i++) {
        // 开始一条路径
        ctx.beginPath()
        // 移动到指定位置
        ctx.moveTo(x + i * w, y)
        // 满10刻度时刻度线长一些 并且在上方表明刻度
        if (i % 10 === 0) {
          // 计算偏移量
          offset = (String(i * w / 10).length * 8 / 2)
          ctx.fillText(i * w, x + i * w - offset, y - h * 2.3)
          ctx.lineTo(x + i * w, y - h * 2)
        } else {
          // 满5刻度时的刻度线略长于1刻度的
          ctx.lineTo(x + i * w, y - (i % 5 === 0 ? 1.4 : 1) * h)
        }
        // 画出路径
        ctx.stroke()
      }
    },
    drawY (ctx, config) {
      var x = config.origin - 1 || 0
      var y = config.origin || 0
      var w = config.w || 5
      var h = config.h || 10
      var size = (config.height || 100) / w
      var offset = 10 // 上面数字的偏移量
      // 设置画笔属性
      ctx.strokeStyle = '#000'
      ctx.lineWidth = 1
      ctx.font = 10
      // 底部横线
      ctx.beginPath()
      ctx.moveTo(x, y)
      ctx.lineTo(x, size * w + y)
      ctx.stroke()
      for (var i = 0; i < size; i++) {
        // 开始一条路径
        ctx.beginPath()
        // 移动到指定位置
        ctx.moveTo(x, y + i * w)
        // 满10刻度时刻度线长一些 并且在左方表明刻度
        if (i % 10 === 0) {
          // 计算偏移量
          offset = (String(i * w / 10).length * 8 / 2) - 3
          let stringText = String(i * w)
          for (let n = 0; n < stringText.length; n++) {
            ctx.fillText(stringText[n], x - h * 3, y + i * w + 10 * n - offset)
          }
          ctx.lineTo(x - h * 2, y + i * w)
        } else {
          // 满5刻度时的刻度线略长于1刻度的
          ctx.lineTo(x - (i % 5 === 0 ? 1.4 : 1) * h, y + i * w)
        }
        // 画出路径
        ctx.stroke()
      }
    }
  },
  mounted () {
    this.canvas = this.$refs.canvas
    this.ctx = this.canvas.getContext('2d')
    this.drawX(this.ctx, this.rulerConfig)
    this.drawY(this.ctx, this.rulerConfig)
  }
}
</script>
