<template>
  <img :src="data.coverUrl" alt="">
</template>

<script>
export default {
  name: 'ImgModule',
  data () {
    return {
      imgUrl: ''
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
  // transition: transform 0.2s;
}
</style>
