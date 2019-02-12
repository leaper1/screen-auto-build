<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view ></router-view>
    </transition>
    <context-menu :contextMenuData="contextMenuData"></context-menu>
  </div>
</template>

<script>
import ContextMenu from '@ct/ContextMenu'
import { mapGetters } from 'vuex'
export default {
  name: 'app',
  components: {
    ContextMenu
  },
  computed: {
    ...mapGetters({
      contextMenuData: 'contextMenuData'
    })
  }
}
</script>

<style lang="scss">
#app {
  position: relative;
  height: 100%;
  width: 100%;
  min-width: 1024px;
}
.fade-enter-active,
.fade-leave-active {
  transition: all .2s ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
