<template>
  <ul class="context-menu-list" ref="contentmenu">
    <li
      v-for="(item, index) in contextMenuData.menulists" :key="index"
      class="context-menu-item"
      :class="{'context-menu-submenu': item.subMenu, 'context-menu-separator': item.separtor}"
      @click.stop="!item.subMenu && fnHandler(item)">
      <template v-if="!item.separtor">
        <i v-if="item.icoName" class="font-icon" :class="item.icoName"></i>
        <span>{{item.btnName}}</span>
      </template>
      <ul class="context-menu-list" v-if="item.subMenu" :class="{left: subMenuLeft}">
        <li
          v-for="(subItem, subIndex) in item.subMenu" :key="subIndex"
          class="context-menu-item"
          :class="{'context-menu-separator': item.separtor}"
          @click.stop="fnHandler(subItem)">
          <template v-if="!subItem.separtor">
            <i v-if="subItem.icoName" class="font-icon" :class="subItem.icoName"></i>
            <span>{{subItem.btnName}}</span>
          </template>
        </li>
      </ul>
    </li>
  </ul>
</template>

<script>
export default {
  data () {
    return {
      subMenuLeft: false
    }
  },
  props: {
    contextMenuData: {
      type: Object,
      requred: false,
      default () {
        return {
          axios: {
            x: null,
            y: null
          },
          menulists: []
        }
      }
    }
  },
  watch: {
    'contextMenuData.axios' (val) {
      var x = val.x
      var y = val.y
      var menu = this.$refs.contentmenu
      menu.style.display = 'block'
      menu.style.left = x + 'px'
      menu.style.top = y + 'px'
      // 判断menu距离浏览器可视窗口底部距离,以免距离底部太近的时候，会导致menu被遮挡
      var menuHeight = this.contextMenuData.menulists.length * 32 + 16 // 不能用scrollHeight,获取到的menu是上一次的menu宽高
      var menuWidth = 140 // 不能用scrollWidth,同理
      var distanceToBottm = document.body.clientHeight - menu.offsetTop
      // 同理判断距离右侧距离
      var distanceToRight = document.body.clientWidth - menu.offsetLeft
      if (distanceToBottm < menuHeight) {
        menu.style.top = y - menuHeight + 'px'
      }
      if (distanceToRight < menuWidth) {
        menu.style.left = x - menuWidth + 'px'
      }
      // // 判断二级菜单出现位置
      // if (distanceToRight - menuWidth <= 135) {
      //   this.subMenuLeft = true
      // } else {
      //   this.subMenuLeft = false
      // }
      document.addEventListener('mousedown', function (e) {
        // 解决mac电脑在鼠标右键后会执行mouseup事件
        if (e.button === 0) {
          if (!menu.contains(e.target)) {
            menu.style.display = 'none'
          }
        }
      }, false)
    }
  },
  methods: {
    fnHandler (item) {
      if (item.fnHandler) {
        item.fnHandler(item.param)
        // 调用点击时间，关闭菜单
        this.$refs.contentmenu.style.display = 'none'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.context-menu-list {
  display: none;
  cursor: pointer;
  width: 130px;
  font-size: 1em;
  position: absolute;
  list-style-type: none;
  padding: 8px 0px;
  border: none;
  border-radius: 4px;
  background: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  z-index: 11;
  .context-menu-item {
    display: block;
    cursor: pointer;
    white-space: nowrap;
    clear: both;
    line-height: 32px;
    height: 30px;
    position: relative;
    border: none;
    padding: 0px 15px;
    color: #222;
    -webkit-transition: background-color .1s;
    -moz-transition: background-color .1s;
    -o-transition: background-color .1s;
    -ms-transition: background-color .1s;
    transition: background-color .1s;
    .font-icon {
      display: inline-block;
      width: 16px;
      height: 16px;
      text-align: center;
      font-size: 1.2em;
      color: #aaa;
      margin-right: 10px;
      vertical-align: middle;
      margin-top: -2px;
      padding: 0;
    }
    &.context-menu-submenu:after {
      content: "";
      display: block;
      float: right;
      margin-right: 0px;
      right: 10px;
      top: 11px;
      width: 0;
      height: 0;
      border-style:solid;
      border-width: 5px 0 5px 5px;
      border-color: transparent transparent transparent #222;
      position: absolute;
    }
    &.context-menu-separator {
      height: 1px;
      line-height: 0;
      border-bottom: 1px solid #eee;
      margin: 2px 0 4px;
      &:hover {
          background: none;
        }
    }
    &:hover {
      cursor: pointer;
      color: #fff;
      background: #63acff;
      &>.font-icon {
        color: #fff;
      }
      &>.context-menu-list {
        display: block;
      }
      &.context-menu-submenu:after {
        border-color: transparent transparent transparent #ffffff;
      }
    }
    &>.context-menu-list {
      display: none;
      left: 100%;
      top: -8px;
      width: 120px;
      text-align: center;
      &.left {
        left: -130px;
      }
    }
  }
}
.fa-minus-square-o.rt {
  transform: rotate(90deg);
}
</style>
