<template>
  <txt-edit :style="onStyle" v-model="data.value"></txt-edit>
</template>

<script>
import TxtEdit from '@ct/TxtEdit'
export default {
  name: 'TxtModule',
  data () {
    return {
      editable: false
    }
  },
  props: {
    data: Object
  },
  components: {
    TxtEdit
  },
  computed: {
    onStyle () {
      return {
        ...this.data.style
      }
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
p {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
