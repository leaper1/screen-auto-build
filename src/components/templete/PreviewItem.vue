<template>
  <div class="panel-containter cf" :style="{'background-color': data.bg}">
    <template v-if="data.children && data.children.length">
        <div
          v-for="(item, index) in data.children" :key="index"
          class="panel-child-item"
          :class="data.direction"
          :style="{ [type]: item.percent+'%', [floatType]: calculateSize(index) + '%'}">
          <preview-item name="PreviewItem" :data="item"></preview-item>
        </div>
    </template>
    <template v-else>
      <component v-for="item in data.components" :key="item._timestamp" :data="item.data" :is="item.type" :scale='1'></component>
    </template>

  </div>
</template>

<script>
import components from '@/preview'
export default {
  name: 'PreviewItem',
  props: {
    data: Object
  },
  components: {
    ...components
  },
  computed: {
    type () {
      return this.data.direction === 'vertical' ? 'width' : 'height'
    },
    floatType () {
      return this.data.direction === 'vertical' ? 'left' : 'top'
    }
  },
  methods: {
    // 计算位置
    calculateSize (index) {
      let percent = 0
      if (index !== 0) {
        for (let i = 0; i < index; i++) {
          percent += this.data.children[i].percent
        }
      }
      return percent
    }
  }
}
</script>

<style lang="scss" scoped>
.panel-containter {
  position: relative;
  width: 100%;
  height: 100%;
}

.panel-child-item.vertical {
  position: absolute;
  height: 100%;
}

.panel-child-item.horizontal {
  position: absolute;
  width: 100%;
}
</style>
