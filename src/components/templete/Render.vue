<template>
  <split-pane name="splitPane" :split-data="items" @on-del="handleDel"></split-pane>
</template>

<script>
import SplitPane from '@c/split-pane/index'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Render',
  data () {
    return {

    }
  },
  components: {
    SplitPane
  },
  computed: {
    ...mapGetters({
      items: 'renderItems'
    })
  },
  methods: {
    ...mapActions([
      'editRenderItem',
      'blurRenderItem',
      'editDragModule'
    ]),
    handleDel () {
      this.$message.warning('就剩一个屏啦！')
    }
  }
}
</script>
