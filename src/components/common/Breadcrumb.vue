<template>
  <el-breadcrumb class="app-breadcrumb" separator-class="el-icon-arrow-right">
    <template v-for="(item, index) in levelList">
      <el-breadcrumb-item v-if="!item.meta.hideInBread" :key="item.name">
        <template v-if="!item.meta.notLink">
          <router-link v-if="index !== levelList.length-1" :to="item.path || '/home'">{{item.meta.title}}</router-link>
          <span v-else>{{item.meta.title}}</span>
        </template>
        <span v-else>{{item.meta.title}}</span>
      </el-breadcrumb-item>
    </template>
  </el-breadcrumb>
</template>

<script>
export default {
  created () {
    this.getBreadcrumb()
  },
  data () {
    return {
      levelList: null
    }
  },
  watch: {
    $route () {
      this.getBreadcrumb()
    }
  },
  methods: {
    getBreadcrumb () {
      let matched = this.$route.matched
      this.levelList = matched
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.app-breadcrumb.el-breadcrumb {
  font-size: 14px;
  line-height: 24px;
  padding: 0 10px;
  .el-breadcrumb__item:last-child {
    .el-breadcrumb__inner {
      cursor: text;
      font-size: 16px;
      font-weight: bold;
      color: #333;
    }
  }
  .el-breadcrumb__inner a, .el-breadcrumb__inner.is-link {
    font-weight: normal;
  }
  .el-breadcrumb__separator[class*=icon] {
    font-weight: 700;
    color: #606266;
  }
}
</style>
