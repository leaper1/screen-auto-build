<template>
  <div class="panel-body" :style="panelStyle">
    <preview-item :data="items"></preview-item>
  </div>
</template>

<script>
import PreviewItem from './PreviewItem'
import { mapGetters } from 'vuex'
export default {
  name: 'Preview',
  props: ['scale'],
  components: {
    PreviewItem
  },
  computed: {
    ...mapGetters({
      items: 'renderItems'
    }),
    panelStyle () {
      return {
        transform: 'scale(' + this.scale + ')',
        transformOrigin: '0 0',
        width: this.items.data.w + 'px',
        height: this.items.data.h + 'px'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.panel-body {
  margin: 0 auto;
  border: 2px dashed #dcdcdc;
  overflow: hidden;
}
</style>
