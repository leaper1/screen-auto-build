<template>
  <div class="properties flex-dc">
    <div class="properties-bar">属性</div>
    <div v-show="!currentModule.type" class="no-current tc">
      <i class="el-icon-warning"></i>
      <br>请选择一个模块
    </div>
    <div v-if="currentModule.type" class="flex-1">
      <component v-if="currentModule.type === 'Containter'" :is="currentModule.type" :data="currentModule"></component>
      <component v-else :is="currentModule.type" :data="currentModule.data" :item="currentModule"></component>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import components from '@/property'

export default {
  data () {
    return {
      parentBasic: {
        width: '',
        height: '',
        borderWidth: ''
      }
    }
  },
  components: {
    ...components
  },
  computed: {
    ...mapGetters({
      currentModule: 'currentModule'
    })
  }
}
</script>

<style lang="scss" scoped>
.properties {
  height: 100%;
  // overflow-y: auto;
}
.no-current {
  font-size: 20px;
  margin-top: 30px;
  color: #ddd;
  i {
    font-size: 60px;
    margin-bottom: 10px;
  }
}
.properties-bar {
  height: 40px;
  line-height: 40px;
  padding: 0 15px;
  color: #505050;
  font-size: 16px;
  box-shadow: #dcf3fb 1px 1px 1px 1px;
  margin-bottom: 10px;
}
</style>
