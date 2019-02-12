<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Pane',
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
  data () {
    // const classes = [this.$parent.split, this.className]
    return {
      // classes: classes.join(' '),
      // percent: 50
    }
  },
  computed: {
    classes () {
      const classes = ['splitter-pane', this.split, this.className]
      return classes.join(' ')
    }
  }
}
</script>

<style scoped>
.splitter-pane.vertical {
  position: absolute;
  height: 100%;
}

.splitter-pane.horizontal {
  position: absolute;
  width: 100%;
}
</style>
