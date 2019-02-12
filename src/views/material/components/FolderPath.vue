<template>
  <el-breadcrumb class="breadcrumb" separator-class="el-icon-arrow-right">
    <el-breadcrumb-item v-for="(item, index) in path" :key="item"><a @click="(index !== path.length - 1) && handleSelect(index)">{{item}}</a></el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
import _ from 'lodash'
export default {
  name: 'FolderPath',
  props: {
    path: {
      type: Array,
      default: function () {
        return ['全部素材', '1', '2', '3']
      }
    }
  },
  methods: {
    handleSelect (index) {
      let folderPath = _.cloneDeep(this.path)
      let length = folderPath.length
      folderPath.splice(index + 1, length - index - 1)
      this.$emit('onSelect', folderPath)
    }
  }
}
</script>

<style lang="scss" scoped>
.breadcrumb {
  display: inline-block;
  vertical-align: middle;
  line-height: 32px;

}
</style>
