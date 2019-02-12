<template>
  <basic :data="data.basic" :item="item">
    <div class="group-item">
      <div class="lab">文字内容</div>
      <div class="group-item-content">
        <el-input type="textarea" resize="none" rows="3" v-model="data.value" placeholder></el-input>
      </div>
    </div>
    <!-- 基础属性 -->
    <template slot="basic">
      <el-collapse-item title="背景填充" name="3">
        <div class="group-item-content">
          <div class="inline-row cf">
            <span>颜色</span>
            <div class="fr">
              <el-color-picker class="db" v-model="data.style.backgroundColor"></el-color-picker>
            </div>
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item title="字体样式" name="4">
        <div class="group-item-content">
          <div class="inline-row cf">
            <span>大小</span>
            <div class="row-content">
              <el-input v-model="data.style.fontSize" placeholder></el-input>
            </div>
          </div>
          <div class="row">
            <div class="style-list">
              <div class="item" :class="{active: isBold}" @click="isBold = !isBold">B</div>
              <div class="item italic" :class="{active: isItalic}" @click="isItalic = !isItalic">I</div>
              <div
                class="item underLine"
                :class="{active: isUnderLine}"
                @click="isUnderLine = !isUnderLine">U</div>
              <div
                class="item capi"
                :class="{active: isCapitalize}"
                @click="isCapitalize = !isCapitalize">Aa</div>
              <div class="item">
                <el-color-picker size="mini" v-model="data.style.color"></el-color-picker>
              </div>
            </div>
          </div>
        </div>
      </el-collapse-item>
    </template>
  </basic>
</template>

<script>
import common from '../common.js'
export default {
  name: 'edit-txt',
  mixins: [common],
  data () {
    return {
      isBold: false,
      isItalic: false,
      isUnderLine: false,
      isCapitalize: false
    }
  },
  watch: {
    isBold (newVal) {
      if (newVal) {
        this.data.style.fontWeight = 'bold'
      } else {
        this.data.style.fontWeight = ''
      }
    },
    isItalic (newVal) {
      if (newVal) {
        this.data.style.fontStyle = 'italic'
      } else {
        this.data.style.fontStyle = ''
      }
    },
    isUnderLine (newVal) {
      if (newVal) {
        this.data.style.textDecoration = 'underline'
      } else {
        this.data.style.textDecoration = ''
      }
    },
    isCapitalize (newVal) {
      if (newVal) {
        this.data.style.textTransform = 'capitalize'
      } else {
        this.data.style.textTransform = ''
      }
    }
  },
  methods: {
    submitUpload () {
      this.$refs.upload.submit()
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
    handleChange (file) {
      var reader = new FileReader()
      reader.readAsText(file.raw, 'gb2312')
      let _this = this
      reader.onload = function () {
        _this.data.value = this.result
      }
    }
  },
  created () {
    let style = this.data.style
    this.isBold = !!style.fontWeight
    this.isItalic = !!style.fontStyle
    this.isUnderLine = !!style.textDecoration
    this.isCapitalize = !!style.textTransform
  }
}
</script>

<style lang="scss" scoped>
.style-list {
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  .item {
    cursor: pointer;
    width: 25px;
    height: 28px;
    line-height: 28px;
    font-weight: bold;
    text-align: center;
    border-radius: 4px;
    &.italic {
      font-style: italic;
    }
    &.capi {
      text-transform: capitalize;
    }
    &.underLine {
      text-decoration: underline;
    }
    &.active {
      background-color: #d3d3d3;
    }
  }
}
</style>
