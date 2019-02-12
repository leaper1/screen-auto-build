<template>
  <lottie :options="options" :height="height" :width="width" v-on:animCreated="handleAnimation"/>
</template>

<script>
import Lottie from '@ct/Lottie'

export default {
  name: 'LottieAnima',
  data () {
    return {
      anim: null,
      reload: false
    }
  },
  computed: {
    width () {
      return parseInt(this.data.basic.width)
    },
    height () {
      return parseInt(this.data.basic.height)
    },
    options () {
      return {
        ...this.data.style,
        animationData: this.data.value || require('../../assets/pinjump.json')
      }
    }
  },
  props: {
    data: Object
  },
  components: {
    'lottie': Lottie
  },
  watch: {
    'data.style.speed': function (newval) {
      this.onSpeedChange(newval)
    }
  },
  methods: {
    handleAnimation: function (anim) {
      this.anim = anim
    },
    onSpeedChange: function (speed) {
      this.anim.setSpeed(speed)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
