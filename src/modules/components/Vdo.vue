<template>
  <img :src="data.coverUrl" alt="">
</template>

<script>
export default {
  name: 'VideoModule',
  data () {
    return {
    }
  },
  props: {
    data: Object
  }
}
</script>

<style lang="scss" scoped>
img {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
