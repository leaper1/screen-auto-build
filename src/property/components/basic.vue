<template>
<div class="property-edit-body flex-dc">
  <div class="flex-1">
    <vue-scroll :ops="ops">
      <div class="half-section">
          <div class="module-name df">
            <span>名称</span>
            <div class="flex-1">
              <el-input v-model="item.alias" placeholder=""></el-input>
            </div>
          </div>
          <el-collapse v-model="activeNames" class="property-collapse">
            <el-collapse-item title="大小" name="1">
              <div class="group-item-content">
                <div class="inline-row">
                  <span>宽度</span>
                  <div class="row-content">
                    <el-input v-model="data.width" @blur="changeInt(data.width, 'width')" type="number" min="0" placeholder=""></el-input>
                  </div>
                </div>
                <div class="inline-row">
                  <span>高度</span>
                  <div class="row-content">
                    <el-input v-model="data.height" @blur="changeInt(data.height, 'height')" type="number" min="0" placeholder=""></el-input>
                  </div>
                </div>
              </div>
            </el-collapse-item>
            <el-collapse-item title="位置" name="2">
              <div class="group-item-content">
                <div class="inline-row">
                  <span>水平位置</span>
                  <div class="row-content">
                    <el-input v-model="data.left" @blur="changeInt(data.left, 'left')" type="number" min="0" placeholder=""></el-input>
                  </div>
                </div>
                <div class="inline-row">
                  <span>垂直位置</span>
                  <div class="row-content">
                    <el-input v-model="data.top" @blur="changeInt(data.top, 'top')" type="number" min="0" placeholder=""></el-input>
                  </div>
                </div>
                <div class="inline-row">
                  <span>旋转角度</span>
                  <div class="row-content">
                    <el-input v-model="data.rotate" @blur="changeRotate(data.rotate)" type="number" min="0" placeholder="请输入旋转角度"></el-input>
                  </div>
                </div>
              </div>
            </el-collapse-item>
            <slot name="basic"></slot>
          </el-collapse>
      </div>
    </vue-scroll>
  </div>
  <div class="edit-bar">数据</div>
  <div class="flex-1">
    <vue-scroll :ops="ops">
      <div class="half-section">
        <div class="property-group-from">
          <slot></slot>
        </div>
      </div>
    </vue-scroll>
  </div>
</div>
</template>

<script>
// import common from '../common.js'

export default {
  data () {
    return {
      activeNames: ['1', '2', '3', '4', '5'],
      ops: {
        bar: {
          keepShow: true,
          size: '8px'
        }
      }
    }
  },
  props: {
    data: Object,
    item: Object
  },
  computed: {

  },
  methods: {
    changeInt (val, type) {
      this.data[type] = parseInt(val)
    },
    changeRotate (val) {
      this.data.rotate = parseInt(val) % 360
    }
  }
}
</script>

<style lang="scss">
.property-edit-body{
  height: 100%;
  .half-section {
    padding: 5px 15px;
    box-sizing: border-box;
  }
}
.edit-bar {
  height: 40px;
  line-height: 40px;
  padding: 0 15px;
  color: #ffffff;
  font-size: 16px;
  background-color: #7479F5;
  // box-shadow: 0px 2px 1px 1px #dcf3fb;
}
.module-name {
  height: 38px;
  line-height: 38px;
  color: #0b7ff7;
  margin-bottom: 5px;
  span {
    width: 50px;
  }
}
.property-group-from {
  .group-item {
    margin-bottom: 5px;
    .lab {
      font-size: 14px;
      line-height: 38px;
      color: #0b7ff7;
    }
  }
}
.group-item-content {
  .inline-row {
    line-height: 38px;
    margin-bottom: 5px;
    span {
      float: left;
    }
    .row-content {
      padding-left: 70px;
    }
  }
  .row {
    line-height: 32px;
    margin-bottom: 10px;
  }
}
</style>
