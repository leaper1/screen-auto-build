<template>
  <div class="edit-group">
    <div class="group-item">
      <div class="lab">模板名称</div>
      <div class="group-item-content"><el-input v-model="data.tempName" placeholder=""></el-input></div>
    </div>
    <div class="group-item">
      <div class="lab">模板分组</div>
      <div class="group-item-content">
        <el-select v-model="data.tempGrooup" placeholder="请选择">
          <el-option
            v-for="item in tempGroups"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="group-item">
      <div class="lab">屏幕尺寸</div>
      <div class="group-item-content">
        <p style="line-height: 32px;">{{scanSize}}</p>
        <!-- <el-input v-model="scanSize" placeholder="" disabled></el-input> -->
        <!-- <el-select v-model="scan" placeholder="请选择">
          <el-option
            v-for="item in scanOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select> -->
      </div>
    </div>
    <div class="group-item">
      <div class="lab">背景填充</div>
      <div class="group-item-content">
        <div class="row">
          <span>颜色</span>
          <div class="fr">
            <el-color-picker class="db" v-model="data.style.backgroundColor"></el-color-picker>
          </div>
        </div>
        <!-- <div class="row">
          <span>图片</span>
          <div class="dib tr">
            <el-color-picker v-model="data.style.backgroundColor"></el-color-picker>
          </div>
        </div> -->
      </div>
    </div>
    <div class="group-item">
      <div class="lab">屏幕边框</div>
      <div class="group-item-content">
        <div class="row">
          <span>颜色</span>
          <div class="fr">
            <el-color-picker class="db" v-model="data.style.borderColor"></el-color-picker>
          </div>
        </div>
        <div class="row">
          <span>宽度</span>
          <el-input-number class="fr"  v-model="borderWidth" controls-position="right" :min="0" :max="5"></el-input-number>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import common from '../common.js'

export default {
  name: 'edit-htmlStyle',
  mixins: [common],
  data () {
    return {
      tempGroups: [],
      scan: '1',
      scanOptions: [{
        label: '1920 * 480',
        value: '1'
      }, {
        label: '820 * 300',
        value: '2'
      }],
      borderWidth: 0
    }
  },
  computed: {
    scanSize () {
      return this.data.style.width + ' * ' + this.data.style.height
    }
  },
  watch: {
    // scan (newVal) {
    //   if (newVal === '1') {
    //     this.data.style.width = '1920px'
    //     this.data.style.height = '480px'
    //   } else if (newVal === '2') {
    //     this.data.style.width = '820px'
    //     this.data.style.height = '300px'
    //   }
    // },
    borderWidth (newVal) {
      this.data.style.borderWidth = newVal + 'px'
    }
  },
  created () {
    this.borderWidth = +(this.data.style.borderWidth.replace('px', ''))
    // if (this.data.style.width === '1920px') {
    //   this.scan = '1'
    // } else {
    //   this.scan = '2'
    // }
  }
}
</script>

<style lang="scss" scoped>
.edit-group {
  .group-item {
    margin-bottom: 15px;
    .lab {
      line-height: 32px;
      color: #0B7FF7;
    }
    .group-item-content {
      .row {
        line-height: 32px;
        margin-bottom: 5px;
      }
    }
  }
}
</style>
