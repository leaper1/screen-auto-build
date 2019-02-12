<template>
  <div :style="style" ref="lavContainer"></div>
</template>

<script>
import lottie from 'lottie-web'
export default {
  props: {
    options: {
      type: Object,
      required: true
    },
    height: Number,
    width: Number,
    loop: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      anim: null
    }
  },
  computed: {
    style () {
      return {
        width: this.width ? `${this.width}px` : '100%',
        height: this.height ? `${this.height}px` : '100%',
        overflow: 'hidden'
      }
    }
  },
  watch: {
    options: {
      handler: function (newVal) {
        this.anim.destroy()
        this.anim = lottie.loadAnimation({
          container: this.$refs.lavContainer,
          renderer: 'canvas',
          loop: this.options.loop !== false,
          autoplay: this.options.autoplay !== false,
          animationData: this.options.animationData,
          rendererSettings: this.options.rendererSettings
        })
        this.anim.setSpeed(this.options.speed)
        this.$emit('animCreated', this.anim)
      },
      deep: true
    }
  },
  mounted () {
    this.anim = lottie.loadAnimation({
      container: this.$refs.lavContainer,
      renderer: 'canvas',
      loop: this.options.loop !== false,
      autoplay: this.options.autoplay !== false,
      animationData: this.options.animationData,
      rendererSettings: this.options.rendererSettings
    })
    this.anim.setSpeed(this.options.speed)
    this.$emit('animCreated', this.anim)
  }
}
</script>
