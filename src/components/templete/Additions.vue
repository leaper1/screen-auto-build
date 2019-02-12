<template>
  <div class="additions-containter flex-dc">
    <div class="addition-head"><span class=""></span>已添加组件</div>
    <div class="flex-1">
      <vue-scroll>
        <tree-node v-for="(item) in pageList" :key="item._timestamp" :item="item" @nodeClick="editRenderItem">
          <draggable v-model="item.components"  @start="drag=true" @end="drag=false">
            <tree-node v-for="(child) in item.components" :key="child._timestamp" :item="child" @nodeClick="editRenderItem"></tree-node>
          </draggable>
        </tree-node>
      </vue-scroll>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import draggable from 'vuedraggable'
import TreeNode from './TreeNode'

export default {
  name: 'additions',
  data () {
    return {

    }
  },
  components: {
    draggable, TreeNode
  },
  computed: {
    ...mapGetters({
      items: 'renderItems',
      currentModule: 'currentModule'
    }),
    pageList: function () {
      let arr = []
      let recursive = function (obj) {
        if (!obj.children.length) {
          arr.push(obj)
        } else {
          obj.children.forEach(element => {
            recursive(element)
          })
        }
      }
      if (this.items.children) {
        recursive(this.items)
      }
      return arr
    }
  },
  methods: {
    ...mapActions([
      'editRenderItem'
    ])
  }
}
</script>

<style lang="scss" scoped>
.additions-containter{
  display: -webkit-flex;
  display: flex;
  flex-direction: column;
  height: 100%;
  .addition-head {
    height: 40px;
    line-height: 40px;
    padding: 0 15px;
    color: #505050;
    font-size: 16px;
    margin-bottom: 5px;
    box-shadow: #dcf3fb 1px 1px 1px 1px;
  }
  .empty-tip {
    width: 100%;
    color: #6f7180;
    text-align: center;
    line-height: 60px;
  }
  .drag-tree {
    cursor: default;
    background: #ffffff;
    color: #606266;
  }
}
</style>
