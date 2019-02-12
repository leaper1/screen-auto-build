<template>
  <div :style="{ cursor, userSelect}" class="vue-splitter-container clearfix" @mousemove="onMouseMove">
    <template v-if="data.children && data.children.length">
      <template v-for="(item, index) in data.children">
        <pane :key="item.key" :split="data.direction" :style="{ [type]: item.percent+'%', [floatType]: calculateSize(index) + '%'}">
          <split-pane name="splitPane" :split-data="item" @on-del="handleDelChild"></split-pane>
        </pane>

        <resizer
          :key="index + 50"
          v-if="data.children.length !== index+1"
          :split="data.direction"
          :className="className"
          :style="{ [floatType]: calculateSize(index+1) + '%'}"
          @mousedown.native="onMouseDown(index)"
          @mouseup.native="onMouseUp">
        </resizer>
      </template>
    </template>
    <div
      v-else class="full-pane" :style="onStyle"
      :class="{'active': activeModule.dragTag === data.key, 'current': currentModule === data}"
      @click.stop.prevent="editRenderItem(data)"
      :drag-tag="data.key"
      @contextmenu.stop.prevent="showContextMenu">
      <drag-move
        v-for="(item, index) in data.components" :key="index"
        :items="data.components" :item="item" :parent-data="data.data"
        :class="{'current': currentModule === item}"
        :point="item.data.basic"
        @mousedown.native="editRenderItem(item)">
        <component :data="item.data" :is="item.type"></component>
      </drag-move>
    </div>
    <el-dialog
      :visible.sync="definedVisible"
      :append-to-body="true"
      :show-close="false"
      :modal="false"
      top="30vh"
      @close="closeDialog"
      width="240px"
      custom-class="defined-pane-dialog">
      <div class="head-title">
        <i class="el-icon-news"></i><span>{{defindType === 'vertical' ? '水平分屏' : '垂直分屏'}}</span>
      </div>
      <div class="input-md">
        <el-input v-model="customInput" placeholder="请输入分屏比例（例：1:2:1）"></el-input>
        <div class="tip">
          <span>提示：</span>
          <div>
            中间用英文“:”隔开；<br/>
            分屏数必须大于1；
          </div>
        </div>
      </div>
      <div class="dialog-bd">
        <el-button @click="definedVisible = false" round size="mini">取消</el-button>
        <el-button @click="handleDefinedSplit" type="primary" plain round size="mini">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { RndString } from '@/utils'
import _ from 'lodash'
import Resizer from './resizer.vue'
import Pane from './pane.vue'
import { mapGetters, mapActions } from 'vuex'
import DragMove from '@ct/DragMove.vue'
import { components } from '@/modules'

export default {
  name: 'splitPane',
  data () {
    return {
      data: this.splitData,
      currentIndex: -1,
      active: false,
      hasMoved: false,
      contextMenuData: {
        axios: {
          x: null,
          y: null
        },
        menulists: []
      },
      definedVisible: false,
      defindType: '',
      customInput: ''
    }
  },
  components: {
    ...components, Resizer, Pane, DragMove
  },
  props: {
    minPercent: {
      type: Number,
      default: 10
    },
    splitData: {
      type: Object
    },
    className: String
  },
  computed: {
    ...mapGetters({
      scale: 'scale',
      activeModule: 'activeModule',
      currentModule: 'currentModule',
      copyItem: 'copyItem'
    }),
    userSelect () {
      return this.active ? 'none' : ''
    },
    cursor () {
      return this.active ? 'col-resize' : ''
    },
    type () {
      return this.data.direction === 'vertical' ? 'width' : 'height'
    },
    floatType () {
      return this.data.direction === 'vertical' ? 'left' : 'top'
    },
    onStyle () {
      return {
        backgroundColor: this.data.bg
      }
    }
  },
  watch: {
    // data (val){
    //   this.$emit('input', val)
    // },
    splitData (val) {
      this.data = val
    },
    'data.data.w': {
      handler (newValue, oldValue) {
        let scale = oldValue / newValue
        let type = 'vertical'
        this.data.components.forEach(el => {
          this.setCompSize(el.data, type, scale)
        })
      },
      deep: true
    },
    'data.data.h': {
      handler (newValue, oldValue) {
        let scale = oldValue / newValue
        let type = 'horizontal'
        this.data.components.forEach(el => {
          this.setCompSize(el.data, type, scale)
        })
      },
      deep: true
    }
  },
  methods: {
    ...mapActions([
      'editRenderItem',
      'backupRenderItem',
      'blurRenderItem',
      'editRenderWh',
      'editContextMenu',
      'pasteRenderItem'
    ]),
    // updateStyle (item, position) {
    //   item.data.basic = {
    //     ...item.data.basic,
    //     ...position
    //   }
    //   this.backupRenderItem()
    // },
    setCompSize (item, type, scale) {
      if (type === 'vertical') {
        item.basic.left = parseInt(item.basic.left / scale)
        item.basic.width = parseInt(item.basic.width / scale)
      }
      if (type === 'horizontal') {
        item.basic.top = parseInt(item.basic.top / scale)
        item.basic.height = parseInt(item.basic.height / scale)
      }
    },
    // 计算位置
    calculateSize (index) {
      let percent = 0
      if (index !== 0) {
        for (let i = 0; i < index; i++) {
          percent += this.data.children[i].percent
        }
      }
      return percent
    },

    onMouseDown (index) {
      this.blurRenderItem()
      this.currentIndex = index
      this.active = true
      this.hasMoved = false
    },
    onMouseUp () {
      // 动态设置宽高
      this.currentIndex = -1
      this.active = false
      this.editRenderWh()
      this.backupRenderItem()
    },
    onMouseMove (e) {
      if (e.buttons === 0 || e.which === 0) {
        this.active = false
      }

      if (this.active) {
        let offset = 0
        let target = e.currentTarget
        if (this.data.direction === 'vertical') {
          while (target) {
            offset += target.offsetLeft / this.scale
            target = target.offsetParent
          }
        } else {
          while (target) {
            offset += target.offsetTop / this.scale
            target = target.offsetParent
          }
        }

        const currentSize = this.calculateSize(this.currentIndex)
        const rightSize = this.calculateSize(this.currentIndex + 1)

        const currentPage = this.data.direction === 'vertical' ? e.pageX / this.scale : e.pageY / this.scale
        const targetOffset = this.data.direction === 'vertical' ? e.currentTarget.offsetWidth : e.currentTarget.offsetHeight
        const percent = Math.floor((((currentPage - offset) / targetOffset) - currentSize / 100) * 10000) / 100

        if (percent >= this.minPercent && percent + currentSize <= rightSize + this.data.children[this.currentIndex + 1].percent - this.minPercent) {
          let totalPrecent = this.data.children[this.currentIndex].percent + this.data.children[this.currentIndex + 1].percent
          this.data.children[this.currentIndex].percent = percent
          this.data.children[this.currentIndex + 1].percent = totalPrecent - percent
        }

        // this.$emit('resize', this.percent)
        this.hasMoved = true
      }
    },
    // 传出删除事件
    handleDel () {
      this.$emit('on-del', this.data.key)
    },
    handleClear () {
      this.data.components = []
    },
    // 删除子分屏
    handleDelChild (key) {
      if (!this.data.children || !this.data.children.length) {
        return
      }
      let temp
      let len = this.data.children.length
      for (let i = 0; i < len; i++) {
        if (this.data.children[i].key === key) {
          temp = i
          break
        }
      }
      const type = this.data.direction
      // 删除第一屏，并且分屏数大于1
      if (temp === 0 && len !== 1) {
        let originPercent = this.data.children[temp + 1].percent
        this.data.children[temp + 1].percent += this.data.children[temp].percent
        // 原组件的宽高随之缩放
        let scale = originPercent / this.data.children[temp + 1].percent
        this.data.children[temp + 1].components.forEach(item => {
          this.setCompSize(item.data, type, scale)
        })
      }
      // 删除最后一屏，并且分屏数大于1
      if (temp !== 0 && temp === len - 1) {
        let originPercent = this.data.children[temp - 1].percent
        this.data.children[temp - 1].percent += this.data.children[temp].percent
        let scale = originPercent / this.data.children[temp - 1].percent
        this.data.children[temp - 1].components.forEach(item => {
          this.setCompSize(item.data, type, scale)
        })
      }
      // 删除中间屏
      if (temp !== 0 && temp !== len - 1) {
        let originPercent1 = this.data.children[temp - 1].percent
        let originPercent2 = this.data.children[temp + 1].percent
        this.data.children[temp - 1].percent += this.data.children[temp].percent / 2
        this.data.children[temp + 1].percent += this.data.children[temp].percent / 2
        let scale1 = originPercent1 / this.data.children[temp - 1].percent
        let scale2 = originPercent2 / this.data.children[temp + 1].percent
        this.data.children[temp - 1].components.forEach(item => {
          this.setCompSize(item.data, type, scale1)
        })
        this.data.children[temp + 1].components.forEach(item => {
          this.setCompSize(item.data, type, scale2)
        })
      }

      this.data.children.splice(temp, 1)
      // console.log(this.data)
      // 当分屏数等于2时，
      if (len === 2) {
        let child = _.cloneDeep(this.data.children[0])
        this.data.bg = child.bg
        this.data.direction = child.direction
        this.data.components = _.cloneDeep(child.components)
        this.data.children = _.cloneDeep(child.children)
      }

      this.backupRenderItem()
    },
    // 等分屏
    handleEquleSplit ([type, num]) {
      let children = []
      let percent = Math.floor((100 / num) * 100) / 100
      let sum = 0
      for (let i = 0; i < num; i++) {
        if (i === num - 1) {
          percent = 100 - sum
        }
        let data = {
          w: type === 'vertical' ? parseInt(this.data.data.w * (percent / 100)) : parseInt(this.data.data.w),
          h: type === 'horizontal' ? parseInt(this.data.data.h * (percent / 100)) : parseInt(this.data.data.h)
        }

        children.push({
          key: RndString(6),
          type: 'Containter',
          bg: '#ffffff',
          data: data,
          percent: percent,
          direction: '',
          components: [],
          children: []
        })
        sum += percent
      }
      children[0].bg = this.data.bg
      children[0].components = _.cloneDeep(this.data.components)
      children[0].components.forEach(item => {
        this.setCompSize(item.data, type, num)
      })
      this.$set(this.data, 'direction', type)
      this.data.children = children
      this.backupRenderItem()
    },
    handleDefined (type) {
      this.defindType = type
      this.definedVisible = true
    },
    handleDefinedSplit () {
      let type = this.defindType
      let numList = this.customInput.split(':').map(item => parseInt(item) || 1)
      if (numList.length <= 1) {
        this.$message.warning('输入有误，请重新输入！')
        return
      }
      let total = numList.reduce((acc, cur) => {
        return acc + cur
      })
      let children = []
      for (let i = 0; i < numList.length; i++) {
        let data = {
          w: type === 'vertical' ? Math.floor(this.data.data.w * numList[i] / total) : this.data.data.w,
          h: type === 'horizontal' ? Math.floor(this.data.data.h * numList[i] / total) : this.data.data.h
        }
        children.push({
          key: RndString(6),
          type: 'Containter',
          bg: '#ffffff',
          data: data,
          percent: Math.floor(numList[i] / total * 10000) / 100,
          direction: '',
          components: [],
          children: []
        })
      }
      children[0].bg = this.data.bg
      children[0].components = _.cloneDeep(this.data.components)
      children[0].components.forEach(item => {
        // this.setCompSize(item.data, type, num)
        if (type === 'vertical') {
          console.log(item.data.basic.left, numList[0], total)
          item.data.basic.left = parseInt(item.data.basic.left * numList[0] / total)
          item.data.basic.width = parseInt(item.data.basic.width * numList[0] / total)
        } else {
          item.data.basic.top = parseInt(item.data.basic.top * numList[0] / total)
          item.data.basic.height = parseInt(item.data.basic.height * numList[0] / total)
        }
      })
      this.$set(this.data, 'direction', type)
      this.data.children = children
      this.backupRenderItem()
      this.definedVisible = false
    },
    // 关闭自定义分屏回调
    closeDialog () {
      this.defindType = ''
      this.customInput = ''
    },
    showContextMenu (event = window.event) {
      event.preventDefault()
      var x = event.clientX
      var y = event.clientY
      // Get the current location
      this.contextMenuData.axios = {
        x, y
      }
      let menulists = [
        {
          fnHandler: this.handleClear,
          icoName: 'fa fa-eraser',
          btnName: '清空分屏'
        },
        {
          fnHandler: this.handleDel,
          icoName: 'el-icon-delete',
          btnName: '删除分屏'
        },
        {
          fnHandler: this.handlePaste,
          icoName: 'fa fa-clipboard',
          btnName: '黏贴',
          param: event
        },
        {
          separtor: true // 分割线
        },
        {
          fnHandler: null,
          icoName: 'fa fa-minus-square-o rt',
          btnName: '水平分屏',
          subMenu: [{
            fnHandler: this.handleEquleSplit,
            // icoName: 'el-icon-rank',
            btnName: '二分屏',
            param: ['vertical', 2]
          }, {
            fnHandler: this.handleEquleSplit,
            // icoName: 'el-icon-rank',
            btnName: '三分屏',
            param: ['vertical', 3]
          }, {
            fnHandler: this.handleDefined,
            // icoName: 'el-icon-rank',
            btnName: '自定义分屏',
            param: 'vertical'
          }]
        },
        {
          separtor: true // 分割线
        },
        {
          fnHandler: null,
          icoName: 'fa fa-minus-square-o',
          btnName: '垂直分屏',
          subMenu: [{
            fnHandler: this.handleEquleSplit,
            // icoName: 'el-icon-rank',
            btnName: '二分屏',
            param: ['horizontal', 2]
          }, {
            fnHandler: this.handleEquleSplit,
            // icoName: 'el-icon-rank',
            btnName: '三分屏',
            param: ['horizontal', 3]
          }, {
            fnHandler: this.handleDefined,
            // icoName: 'el-icon-rank',
            btnName: '自定义分屏',
            param: 'horizontal'
          }]
        }
      ]
      this.contextMenuData.menulists = menulists
      this.editContextMenu(this.contextMenuData)
    },
    handlePaste (event) {
      if (this.copyItem.empty) {
        return
      }
      this.pasteRenderItem(event)
    }
  },
  mounted () {
    // console.log(this.currentModule)
  }
}
</script>

<style lang="scss" scoped>
.clearfix:after {
  visibility: hidden;
  display: block;
  font-size: 0;
  content: " ";
  clear: both;
  height: 0;
}

.vue-splitter-container {
  width: 100%;
  height: 100%;
  position: relative;
}

.full-pane {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.full-pane.active, .full-pane.current {
  z-index: 10;
  box-shadow: 0 0 0 2px #2196F3;
  // outline: 2px solid #2196F3;
}

.defined-pane-dialog {
  .head-title {
    display: -webkit-flex;
    display: flex;
    align-items: center;
    height: 38px;
    justify-content: center;
    background-color: #f9f9f9;
    i {
      margin-right: 5px;
    }
  }
  .input-md {
    padding: 15px 20px 10px;
    .tip {
      display: -webkit-flex;
      display: flex;
      padding: 3px 5px;
      font-size: 12px;
      line-height: 1.4;
    }
  }
  .dialog-bd {
    display: -webkit-flex;
    display: flex;
    padding: 0 20px 15px;
    justify-content: space-between;
    &> *{
      width: 70px;
    }
  }
}
</style>
