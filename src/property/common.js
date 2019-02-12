import { mapActions } from 'vuex'
import Basic from './components/basic.vue'

export default {
  props: ['data', 'item'],
  components: {
    Basic
  },
  // watch: {
  //   'data': {
  //     deep: true,
  //     handler: function (newVal, oldVal) {
  //       if (!newVal) return
  //       this.backupRenderItem()
  //     }
  //   }
  // },
  methods: {
    ...mapActions([
      'backupRenderItem'
    ])
  }
}
