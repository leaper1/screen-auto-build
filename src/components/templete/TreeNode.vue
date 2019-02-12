<template>
  <div class="tree-node">
    <div class="tree-node_content" @click="nodeClick(item)" :class="{'is-focus': currentModule === item}">
      <span class="tree-node_expand-icon el-icon-caret-right" @click.stop="nodeIconClick(item)"
        :class="{'expanded' : expanded, 'is-leaf' : !(item.components && item.components.length)}">
      </span>
      <span class="tree-node_label" v-if="item.type === 'Containter'">布局</span>
      <span class="tree-node_label" v-else>{{item.alias || moduleMap[item.type]}}</span>
    </div>
    <el-collapse-transition>
      <div class="tree-node_children" v-if="item.components && item.components.length && expanded">
        <slot></slot>
      </div>
    </el-collapse-transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      expanded: true,
      moduleMap: {
        'Txt': '文本',
        'Poster': '图片',
        'Vdo': '视频',
        'Lottie': '动画',
        'Carousel': '轮播',
        'BarCode': '条形码',
        'QrCode': '二维码'
      }
    }
  },
  props: ['item'],
  computed: {
    ...mapGetters({
      currentModule: 'currentModule'
    })
  },
  methods: {
    nodeIconClick (item) {
      if (item.components && item.components.length) {
        this.expanded = !this.expanded
      }
    },
    nodeClick (item) {
      // if (item.components && item.components.length) {
      //   this.expanded = !this.expanded
      // }
      this.$emit('nodeClick', item)
    }
  }
}
</script>

<style lang="scss" scoped>
.tree-node {
  white-space: nowrap;
  outline: none;
  &.sortable-chosen {
    // border: 1px solid darkgoldenrod;
    &.sortable-ghost {
      border: 1px dashed #d3d3d3;
      .tree-node_content {
        &:hover, &.is-focus {
          background-color: #f5f7fa;
        }
      }
    }
  }

  .tree-node_content {
    display: flex;
    align-items: center;
    height: 30px;
    cursor: pointer;
    &:hover, &.is-focus {
      background-color: #f0f2f7;
    }
    .tree-node_expand-icon {
      cursor: pointer;
      color: #c0c4cc;
      font-size: 14px;
      transform: rotate(0deg);
      transition: transform .3s ease-in-out;
      padding: 6px;
      &.expanded {
        transform: rotate(90deg);
      }
      &.is-leaf {
        color: transparent;
        cursor: default;
      }
    }
  }
  &:focus > .tree-node_content {
    background-color: #e4e7ed;
  }
  .tree-node_children {
    overflow: hidden;
    background-color: transparent;
    .tree-node_content {
      padding-left: 18px;
    }
  }
}
</style>
