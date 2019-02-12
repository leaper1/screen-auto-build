<template>
  <div class="ruler-tool" :class="type">
    <span class="n" v-for="(item, index) in rulerScale" :key="index" :style="{[direction]: index * scaleSize + 2 + 'px'}">{{ item }}</span>
  </div>
</template>

<script>
export default {
  name: 'RulerTool',
  data () {
    return {
      rulerScale: []
    }
  },
  props: {
    width: {
      type: Number,
      default: 0
    },
    scaleSize: {
      type: Number,
      default: 50
    },
    type: {
      type: String,
      default: 'horizontal'
    }
  },
  computed: {
    direction () {
      return this.type === 'horizontal' ? 'left' : 'top'
    }
  },
  methods: {
    scaleCalc () {
      for (let i = 0; i < this.width; i += 1) {
        if (i % this.scaleSize === 0) {
          this.rulerScale.push(i)
        }
      }
    }
  },
  mounted () {
    this.scaleCalc()
  }
}
</script>

<style lang="scss" scoped>
.ruler-tool {
  position: absolute;
  opacity: 0.6;
  user-select: none;
  overflow: hidden;
  .n {
    position: absolute;
    font: 10px/1 Arial, sans-serif;
    color: #333;
    cursor: default;
  }
  &.horizontal {
    top: 0;
    left: 17px;
    width: 100%;
    height: 17px;
    background: url('../../assets/ruler-h.png') repeat-x;
    .n {
      top: 1px;
    }
  }
  &.vertical {
    left: 0;
    top: 30px;
    width: 17px;
    height: 100%;
    background: url('../../assets/ruler-v.png') repeat-y;
    .n {
      width: 8px;
      left: 3px;
      word-wrap: break-word;
    }
  }
}
</style>
