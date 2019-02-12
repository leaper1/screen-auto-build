<template>
  <div class="nav-tabs">
    <div class="tabs-header">
      <div class="tabs__nav-wrap">
        <div class="tabs__nav-scroll">
          <div class="tabs__nav">
            <div class="tabs__active-bar" :style="barStyle"></div>
            <template v-for="(item, index) in navList">
              <div class="tabs__item" :key="index" :class="{'is-active': currentIndex === index}" @click="tabClick(index)">{{item}}</div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavTabs',
  data () {
    return {
      currentIndex: null,
      navList: ['基本信息', '今日播放', '播放计划', '设备日志']
    }
  },
  props: {
    defaultIndex: Number,
    list: Array
  },
  computed: {
    barStyle () {
      let style = {}
      let offset = 0
      if (this.currentIndex !== null) {
        offset = 96 * this.currentIndex
        style.width = '96px'
        style.transform = `translateX(${offset}px)`
      }
      return style
    }
  },
  methods: {
    tabClick (index) {
      this.currentIndex = index
      this.$emit('tabClick', index)
    }
  },
  created () {
    this.currentIndex = this.defaultIndex
  }
}
</script>

<style lang="scss" scoped>
.nav-tabs {
  .tabs-header {
    padding: 0;
    position: relative;
    margin: 0 0 15px;
    .tabs__nav-wrap {
      overflow: hidden;
      margin-bottom: -1px;
      position: relative;
      &::after {
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 2px;
        background-color: #e4e7ed;
        z-index: 1;
      }
      .tabs__nav-scroll {
        overflow: hidden;
        .tabs__active-bar {
          position: absolute;
          bottom: 0;
          left: 0;
          height: 3px;
          background-color: #7948ea;
          z-index: 1;
          -webkit-transition: -webkit-transform .3s cubic-bezier(.645,.045,.355,1);
          transition: -webkit-transform .3s cubic-bezier(.645,.045,.355,1);
          transition: transform .3s cubic-bezier(.645,.045,.355,1);
          transition: transform .3s cubic-bezier(.645,.045,.355,1),-webkit-transform .3s cubic-bezier(.645,.045,.355,1);
          list-style: none;
        }
        .tabs__nav {
          white-space: nowrap;
          position: relative;
          transition: transform .3s,-webkit-transform .3s;
          float: left;
          z-index: 2;
          cursor: pointer;
          .tabs__item {
            padding: 0 20px;
            height: 40px;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            line-height: 40px;
            display: inline-block;
            list-style: none;
            font-size: 14px;
            font-weight: 500;
            color: #303133;
            position: relative;
            &.is-active {
              color: #7948ea;
              background-color: #F1ECFD;
            }
          }
        }
      }
    }
  }
}
</style>
