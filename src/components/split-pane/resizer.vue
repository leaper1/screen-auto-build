<template>
  <div :class="classes">
    <!-- <span class="trigger-bar-con">
      <i class="trigger-bar"></i>
      <i class="trigger-bar"></i>
      <i class="trigger-bar"></i>
      <i class="trigger-bar"></i>
      <i class="trigger-bar"></i>
      <i class="trigger-bar"></i>
    </span> -->
  </div>
</template>

<script>
export default {
  props: {
    split: {
      type: String,
      default: ''
      // validator(value) {
      //   return ['vertical', 'horizontal'].indexOf(value) >= 0
      // },
      // required: true
    },
    className: String
  },
  computed: {
    classes () {
      const classes = ['splitter-pane-resizer', this.split, this.className]
      return classes.join(' ')
    }
  }
}
</script>

<style lang="scss" scoped>
.splitter-pane-resizer {
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  // background: #dcdee2;
  position: absolute;
  background: #000000;
  opacity: 0.2;
  z-index: 12;
  -moz-background-clip: padding;
  -webkit-background-clip: padding;
  background-clip: padding-box;
  .trigger-bar-con {
    position: absolute;
    display: inline-block;
    i {
      display: block;
    }
  }
}

.splitter-pane-resizer.horizontal {
  height: 8px;
  margin: -4px 0;
  border-top: 3px solid rgba(255, 255, 255, 0);
  border-bottom: 3px solid rgba(255, 255, 255, 0);
  cursor: row-resize;
  width: 100%;
  &>.trigger-bar-con {
    height: 100%;
    left: 50%;
    transform: translateX(-50%);
    &>.trigger-bar {
      float: left;
      height: 6px;
      width: 1px;
      background: rgba(23,35,61,.25);
      margin: 0 2px;
    }
  }
}

.splitter-pane-resizer.vertical {
  width: 8px;
  height: 100%;
  margin: 0 -4px;
  border-left: 3px solid rgba(255, 255, 255, 0);
  border-right: 3px solid rgba(255, 255, 255, 0);
  cursor: col-resize;
  &>.trigger-bar-con {
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
    &>.trigger-bar {
      width: 6px;
      height: 1px;
      background: rgba(23,35,61,.25);
      float: left;
      margin: 2px 0;
    }
  }
}
</style>
