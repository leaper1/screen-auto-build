<template>
  <el-container style="height: 100%;">
    <el-header class="db-header">
      <div class="logo-con">
        <img src="../assets/logo.png" alt="">
        <!-- <img src="../assets/logo-min.png" alt="" v-else> -->
      </div>
      <div class="db-header-left">
        <breadcrumb></breadcrumb>
      </div>
      <div class="db-header-right">
        <!-- <span class="header-item">
          <i class="el-icon-search"></i>
        </span> -->
        <toggle-search v-model="search" :on-search="handleSearch" placeholder="输入搜索内容"></toggle-search>
        <el-tooltip effect="dark" content="全屏" placement="bottom">
          <span class="header-item" @click="handleFullScreen">
            <i class="fa fa-arrows-alt" aria-hidden="true"></i>
          </span>
        </el-tooltip>
        <el-dropdown>
          <span class="header-item">
            主题 <i class="el-icon-arrow-down drop-icon"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="handleChangeColor('409EFF')">优雅蓝（默认）</el-dropdown-item>
            <el-dropdown-item @click.native="handleChangeColor('F44336')">烈焰红</el-dropdown-item>
            <el-dropdown-item @click.native="handleChangeColor('7B7DE5')">贵族紫</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <!-- <span class="header-item">
          <i class="fa fa-language" aria-hidden="true"></i>
        </span> -->
        <span class="header-item">
          <i class="el-icon-upload" aria-hidden="true"></i>
        </span>
        <el-tooltip effect="dark" :disabled="!messageCount" :content="messageCount +`条未读消息`" placement="bottom">
          <span class="header-item">
            <el-badge is-dot :value="messageCount" :hidden="!messageCount" class="badge">
              <i class="fa fa-bell" aria-hidden="true"></i>
            </el-badge>
          </span>
        </el-tooltip>
        <el-dropdown trigger="click" @visible-change="handleDropChange">
          <span class="header-item dropdown-link" :class="{'drop-show': isDrop}">
            <img class="avatar" src="../assets/head.png" alt="">
            <i class="el-icon-arrow-down drop-icon"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item><router-link to="/user">个人信息</router-link></el-dropdown-item>
            <el-dropdown-item><router-link to="/setting">设置</router-link></el-dropdown-item>
            <el-dropdown-item @click.native="logout">注销</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
    <el-container style="min-height: 0">
      <el-aside :class="{'collapse': isCollapse}" v-if="$route.name !== 'AddTemplet'">
        <nav-menu :isCollapse="isCollapse"></nav-menu>
        <div class="toggle-sidebar" @click="isCollapse = !isCollapse">
          <template v-if="!isCollapse">
            <i class="el-icon-d-arrow-left" ></i>
            <span>Collapse sidebar</span>
          </template>
          <i class="el-icon-d-arrow-right" v-else></i>
        </div>
      </el-aside>
      <el-main :style="$route.name === 'AddTemplet' ? 'padding: 0' : ''">
        <!-- <vue-scroll> -->
          <router-view></router-view>
        <!-- </vue-scroll> -->
      </el-main>
    </el-container>
  </el-container>

</template>

<script>
// import { mapState } from 'vuex'
import NavMenu from '@/components/common/NavMenu'
import Breadcrumb from '@/components/common/Breadcrumb'
import screenfull from 'screenfull'
import changeTheme from '../utils/changeTheme.js'
import ToggleSearch from '@c/toggle-search'

export default {
  name: 'home',
  data () {
    return {
      children: null,
      menus: [],
      isCollapse: false,
      isDrop: false,
      fileUrl: '',
      user: {
        username: 'Dreity',
        avatar: ''
      },
      messageCount: 1,
      search: ''
    }
  },
  // computed: {
  //   ...mapState({
  //     fileUrl: state => state.util.fileUrl,
  //     user: state => state.user.info,
  //     messageCount: state => state.message.count
  //   })
  // },
  components: {
    NavMenu,
    Breadcrumb,
    ToggleSearch
  },
  methods: {
    handleCollapse () {
      this.isCollapse = !this.isCollapse
    },
    handleFullScreen () {
      if (!screenfull.enabled) {
        this.$message({
          message: 'you browser can not work',
          type: 'warning'
        })
        return false
      }
      screenfull.toggle()
    },
    handleChangeColor (color) {
      changeTheme(color)
    },
    handleDropChange (drop) {
      this.isDrop = drop
    },
    handleSearch () {
      console.log(this.search)
    },
    logout () {
      this.$confirm('确定要注销吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        this.$emit('logout')
      }).catch(() => {})
    }
  },
  mounted () {
    const that = this
    window.addEventListener('resize', function () {
      let clientWidth = document.body.clientWidth
      if (clientWidth <= 1024) {
        that.isCollapse = true
      } else {
        that.isCollapse = false
      }
    })
  }
}
</script>

<style lang="scss" scoped>
// 主题色
$--head-color: #FFFFFF;
$--head-text-color: #515a6e;
$--head-hov-color: #F1F2F4;
$--head-text-hov-color: #8898C0;
$--aside-color: #ffffff;

.el-aside {
  display: -webkit-flex;
  display: flex;
  flex-direction: column;
  width: 200px !important;
  background-color: $--aside-color;
  transition: width 0.3s;
  box-sizing: border-box;
  &.collapse {
    width: 64px !important;
  }
  &::-webkit-scrollbar {
    display:none
  }
}
.db-header {
  display: flex;
  align-items: center;
  width: 100%;
  height: 60px;
  padding: 5px 10px;
  box-sizing: border-box;
  color: $--head-text-color;
  background-color: $--head-color;
  box-shadow: rgba(99, 99, 99, 0.1) 1px 1px 1px 1px;
  z-index: 11;
  .header-item {
    display: -webkit-flex;
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 4px 8px;
    margin: 5px 3px;
    border-radius: 4px;
    height: 32px;
    font-size: 14px;
    font-weight: 600;
    i {
      text-align: center;
      width: 24px;
      font-size: 18px;
    }
    &:hover {
      color: $--head-text-hov-color;
      background-color: $--head-hov-color;
    }
  }
  &-left {
    flex: 1;
  }
  &-right {
    display: -webkit-flex;
    display: flex;
    align-items: center;
    .el-dropdown {
      .dropdown-link {
        &.drop-show {
          background-color: #ffffff;
          color: $--head-text-color;
        }
      }
      .drop-icon {
        font-size: 14px;
      }
    }
    .avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
    }
  }
}

.el-main {
  background-color: #EBE6EB;
  padding: 15px;
}
.logo-con {
  // width: 100%;
  width: 200px;
  text-align: center;
  padding: 8px;
  box-sizing: border-box;
  overflow: hidden;
  transition: width 0.3s;
  background-color: $--head-color;
  img {
    display: block;
    height: 44px;
    width: auto;
    margin: 0 auto;
    cursor: pointer;
  }
}
.toggle-sidebar {
  cursor: pointer;
  height: 40px;
  padding: 0 20px;
  background-color: $--aside-color;
  border: 0;
  border-top: 1px solid #e5e5e5;
  color: #707070;
  display: flex;
  align-items: center;
  overflow: hidden;
  i {
    font-size: 16px;
    font-weight: 800;
    margin-right: 8px;
  }
  span {
    white-space: nowrap;
    overflow: hidden;
  }
}

</style>
