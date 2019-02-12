<template>
  <div class="navMenu">
    <vue-scroll>
      <el-menu
        :default-active="activeMenu"
        class="db-menu-bar"
        :collapse="isCollapse"
        active-text-color="#8898C0"
        router :unique-opened="true">
        <template v-for="(route, index) in $router.options.routes[1].children">
          <template v-if="!route.meta.hideInMenu">
            <el-submenu v-if="route.children && !route.meta.isLeaf" :index="route.name" :key="index">
              <template slot="title">
                <i :class="route.meta.icon"></i><span>{{route.meta.title}}</span>
              </template>
              <template v-for="(cRoute, cIndex) in route.children">
                <el-menu-item v-if="!cRoute.meta.hideInMenu" :key="cIndex" :index="cRoute.name" :route="cRoute">
                  <span style="margin-left: 9px;">{{cRoute.meta.title}}</span>
                </el-menu-item>
              </template>
            </el-submenu>
            <el-menu-item v-if="!route.children || route.meta.isLeaf" :index="route.name" :key="index" :route="route">
              <i :class="route.meta.icon"></i><span slot="title">{{route.meta.title}}</span>
            </el-menu-item>
          </template>
        </template>
      </el-menu>
    </vue-scroll>
  </div>
</template>

<script>
// import { mapState } from 'vuex'

export default {
  name: 'navMenu',
  data () {
    return {
    }
  },
  props: {
    isCollapse: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    // ...mapState({
    //   menuData: state => state.util.menuData
    // }),
    activeMenu: function () {
      return this.$route.name
    }
  }
}
</script>

<style lang="scss">
.db-menu-bar:not(.el-menu--collapse) {
  width: 200px;
}

.el-menu--popup {
  min-width: 100px;
}

.el-menu-item {
  color: #515a6e;
}
.el-submenu__title {
  color: #515a6e;
}

.el-menu-item:focus, .el-menu-item:hover, .el-submenu__title:focus, .el-submenu__title:hover{
  background-color: inherit;
  color: #8898C0;
}
.el-menu-item, .el-submenu__title{
  height: 50px;
  line-height: 50px;
}
.el-submenu .el-menu-item {
  height: 40px;
  line-height: 40px;
  border-color: #8898C0;
}
.el-menu--popup-right-start .el-menu-item {
  height: 40px;
  line-height: 40px;
}

.el-menu-item.is-active {
  background-color:#F1F2F4;
  border-right: 4px solid #8898C0;
}

.el-menu-item i.fa, .el-submenu__title i.fa{
  margin-right: 6px;
  width: 24px;
  text-align: center;
  font-size: 18px;
  vertical-align: middle;
  color: inherit;
}

.navMenu {
  flex: 1;
  width: 100%;
  overflow: hidden;
  .db-menu-bar {
    border: none;
  }
}
</style>
