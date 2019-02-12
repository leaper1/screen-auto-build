<template>
  <section style="height: 100%;">
    <div class="section-body flex-dc">
      <div class="header-bar">
        <div class="bar-item">
          <div class="item-btn" :class="{'no-cursor': step === 0}" @click="handleRecall">
            <i class="arrow-left"></i>撤销
          </div>
          <span class="line"></span>
          <div class="item-btn" :class="{'no-cursor': !nextFlag}" @click="handleNext">
            <i class="arrow-right"></i>重做
          </div>
        </div>
        <div class="dib">
          <drag-list></drag-list>
        </div>
        <ul class="opt-list">
          <li class="opt-item" @click="handleCancel">
            <i class="cancel"></i>
            取消
          </li>
          <li class="opt-item">
            <i class="draft"></i>
            存草稿
          </li>
          <li class="opt-item" @click="handleSave">
            <i class="save"></i>
            保存
          </li>
          <li class="opt-item"  @click="handlePreview">
            <i class="preview"></i>
            预览
          </li>
        </ul>
      </div>
      <div class="flex-1">
        <div class="body-center">
          <div class="left-wrap">
            <additions></additions>
          </div>
          <div class="render df-c" ref="renders" @click="blurRenderItem">
            <div class="render-content">
              <div :style="{height: renderHeight + 'px', width: renderWidth + 'px'}">
                <div class="scale-box" :style="setStyle">
                  <canvas-ruler-tool class="canvas-ruler" :ruler-config="canvasConfig"></canvas-ruler-tool>
                  <!-- <ruler-tool :width="2000" type="horizontal"></ruler-tool> -->
                  <!-- <ruler-tool :width="2000" type="vertical"></ruler-tool> -->
                  <div class="render-body" ref="canvasDom">
                    <render></render>
                  </div>
                </div>
              </div>
            </div>
            <div class="slide-bar">
              <el-slider class="slide" :min="25" :max="100" v-model="renderScale"></el-slider>{{renderScale + '%'}}
            </div>
          </div>
          <div class="right-wrap">
            <property></property>
          </div>
        </div>
      </div>
    </div>
    <!-- :fullscreen="true" :modal="false" :show-close="false" -->
    <el-dialog title="预览" custom-class="preview-dialog" :visible.sync="previewVisible" top="0" width="auto">
      <!-- <div slot="title" class="dialog-title">
        <i class="el-icon-error" @click="previewVisible = false"></i>
      </div> -->
      <div class="preview-dialog-body df-c" ref="previewBody">
        <div class="preview-body">
          <div :style="{ width: `${previewWidth}px`, height: `${previewHeight}px` }">
            <preview v-if="previewVisible" :scale="previewScale / 100"></preview>
          </div>
        </div>
        <div class="preview-scale df">
          <el-slider class="slide" :min="25" v-model="previewScale" ></el-slider>
          <div class="tip">{{previewScale}}%</div>
        </div>
      </div>
    </el-dialog>
    <el-dialog title="保存" :visible.sync="saveDialog" width="640px">
      <img :src="imgUrl" alt="" style="width: 100%; outline: 1px dashed #ddd;">
    </el-dialog>
    <!-- 添加模板 -->
    <el-dialog :visible.sync="addDialog"
      width="1000px" class="new-templete-dialog"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false">
      <div class="add-dialog-content">
        <div class="dialog-con-left">
          <div class="hd-title">
            新建选项
          </div>
          <el-form :model="form" ref="newDisplayForm" :rules="fromRules" label-position="left" class="new-templete-form">
            <el-form-item label="名称：" label-width="80px" prop="name">
              <el-input placeholder="请输入模板名称" v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="设备类型：" label-width="120px" required>
              <el-radio v-model="form.screenType" label="ips">优显屏</el-radio>
              <el-radio v-model="form.screenType" label="lnk">墨屏</el-radio>
            </el-form-item>
            <el-form-item label="基准分辨率" prop="ratio">
              <div class="full-item-content">
                <div class="con-row df">
                  <div class="row-label">
                    <el-radio v-model="ratioType" label="predefined">预定义</el-radio>
                  </div>
                  <div class="felx-1" v-if="ratioType === 'predefined'">
                    <el-select v-model="selectRatio" placeholder="选择分辨率" style="width: 120px;">
                      <el-option
                        v-for="item in ratioOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                    <!-- <el-radio-group v-model="form.ratio">
                      <el-row :gutter="10" class="form-radio-row">
                        <el-col :span="12" v-for="item in ratioOptions" :key="item.value">
                          <el-radio :label="item.value">{{item.label}}</el-radio>
                        </el-col>
                      </el-row>
                    </el-radio-group> -->
                  </div>
                </div>
                <div class="con-row df">
                  <div class="row-label">
                    <el-radio v-model="ratioType" label="custome">自定义</el-radio>
                  </div>
                  <div class="df felx-1" v-if="ratioType === 'custome'">
                    <el-form-item prop="customWidth">
                     <el-input v-model="form.customWidth" style="width: 90px;"></el-input>
                    </el-form-item>
                    <span class="input-center-div"> x </span>
                    <el-form-item prop="customHeight">
                      <el-input v-model="form.customHeight" style="width: 90px;"></el-input>
                    </el-form-item>
                  </div>
                </div>
              </div>
            </el-form-item>
            <el-form-item label="设备类型：" label-width="120px" required>
              <el-radio v-model="form.direction" label="horizontal">横屏</el-radio>
              <el-radio v-model="form.direction" label="vertical">竖屏</el-radio>
            </el-form-item>
          </el-form>
        </div>
        <div class="dialog-con-right">
          <el-tabs v-model="activeName" class="cus-tabs">
            <el-tab-pane label="空白页" name="first">
              <div class="empty-page df-c">
                以空白页新建
              </div>
            </el-tab-pane>
            <el-tab-pane label="历史模板" name="second">
              <vue-scroll>
                <div class="pane-section-list">
                  <div class="sc-hd">昨天</div>
                  <el-row class="sc-md" :gutter="30">
                    <el-col :span="12">
                      <div class="item-img-wrap df-c">
                        <img src="../../assets/a.jpg" alt="">
                      </div>
                    </el-col>
                  </el-row>
                </div>
                <div class="pane-section-list">
                  <div class="sc-hd">以时间排序</div>
                  <el-row class="sc-md" :gutter="30">
                    <el-col :span="12">
                      <div class="item-img-wrap df-c">
                        <img src="../../assets/a.jpg" alt="">
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="item-img-wrap df-c">
                        <img src="../../assets/a.jpg" alt="">
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="item-img-wrap df-c">
                        <img src="../../assets/a.jpg" alt="">
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </vue-scroll>
            </el-tab-pane>
            <el-tab-pane label="官方模板" name="third">
              <vue-scroll>
                <div class="pane-section-list">
                  <div class="sc-hd">二分屏</div>
                  <el-row class="sc-md" :gutter="30">
                    <el-col :span="12">
                      <div class="item-img-wrap df-c">
                        <img src="../../assets/a.jpg" alt="">
                      </div>
                    </el-col>
                  </el-row>
                </div>
                <div class="pane-section-list">
                  <div class="sc-hd">三分屏</div>
                  <el-row class="sc-md" :gutter="30">
                    <el-col :span="12">
                      <div class="item-img-wrap df-c">
                        <img src="../../assets/a.jpg" alt="">
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="item-img-wrap df-c">
                        <img src="../../assets/a.jpg" alt="">
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="item-img-wrap df-c">
                        <img src="../../assets/a.jpg" alt="">
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="item-img-wrap df-c">
                        <img src="../../assets/a.jpg" alt="">
                      </div>
                    </el-col>
                  </el-row>
                </div>
                <div class="pane-section-list">
                  <div class="sc-hd">墨屏</div>
                  <el-row class="sc-md" :gutter="30">
                    <el-col :span="8">
                      <div class="item-img-wrap df-c">
                        <img src="../../assets/a.jpg" alt="">
                      </div>
                    </el-col>
                    <el-col :span="8">
                      <div class="item-img-wrap df-c">
                        <img src="../../assets/a.jpg" alt="">
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </vue-scroll>
            </el-tab-pane>
            <el-tab-pane label="更多设置" name="fourth">更多设置</el-tab-pane>
          </el-tabs>
          <div class="dialog-footer">
            <el-button @click="handleBack()" style="margin-right: 50px;">返 回</el-button>
            <el-button type="primary" @click="handleEditRender('newDisplayForm')">确 定</el-button>
          </div>
        </div>
      </div>
    </el-dialog>
  </section>
</template>

<script>
import _ from 'lodash'
import html2canvas from 'html2canvas'
import DragList from '@ct/dragList'
import Render from '@ct/Render'
import Property from '@ct/Property'
import Additions from '@ct/Additions'
import Preview from '@ct/Preview'
import { mapGetters, mapActions } from 'vuex'
import defaultItems from '../../utils/default.js'
import CanvasRulerTool from '@ct/canvas-ruler-tool'
export default {
  name: 'Program',
  data () {
    return {
      renderScale: 100, // 缩放
      renderWidth: 0,
      renderHeight: 0,
      // 监听数据变化
      changed: false,
      watchItems: null,
      // 撤回
      rollback: '',
      nextFlag: false,
      // 预览弹窗
      previewVisible: false,
      previewScale: 0,
      previewWidth: 0,
      previewHeight: 0,
      saveDialog: false,
      imgUrl: '',
      // 新建弹窗
      addDialog: true,
      ratioType: 'predefined',
      ratioOptions: [{
        label: '1920 x 480',
        value: '1920x480'
      }, {
        label: '1280 x 720',
        value: '1280x720'
      }, {
        label: '1024 x 600',
        value: '1024x600'
      }],
      selectRatio: '',
      customWidth: '',
      customHeight: '',
      form: {
        screenType: 'ips',
        direction: 'horizontal',
        ratio: '',
        customWidth: '',
        customHeight: ''
      },
      fromRules: {
        name: [
          { required: true, message: '请输入模板名称', trigger: 'blur' }
        ],
        ratio: [
          { required: true, message: '基准分辨率不能为空', trigger: 'blur' }
        ],
        customWidth: [
          { required: true, message: '当前项不能为空', trigger: 'blur' }
        ],
        customHeight: [
          { required: true, message: '当前项不能为空', trigger: 'blur' }
        ]
      },
      activeName: 'first',
      canvasConfig: {
        width: 1920,
        height: 480,
        origin: 40, // 刻度尺x坐标位置
        w: 10, // 刻度线的间隔
        h: 7 // 刻度线基础长度
      }
    }
  },
  components: {
    DragList, Render, Property, Additions, Preview, CanvasRulerTool
  },
  computed: {
    ...mapGetters({
      items: 'renderItems',
      renderData: 'render',
      rollbackData: 'rollbackData',
      step: 'step',
      scale: 'scale'
    }),
    setScale () {
      return {
        transform: 'scale(' + this.scale + ')',
        transformOrigin: '0 0'
      }
    },
    setStyle () {
      let width, height
      if (this.items.data) {
        width = this.items.data.w + 'px'
        height = this.items.data.h + 'px'
      }
      return {
        ...this.setScale,
        width: width,
        height: height
      }
    }
  },
  watch: {
    renderScale (newVal) {
      this.$store.commit('updateScale', newVal)
      let width = parseInt(this.items.data.w) + 45
      let height = parseInt(this.items.data.h) + 45
      this.renderWidth = Math.ceil(width * newVal / 100)
      this.renderHeight = Math.ceil(height * newVal / 100)
    },
    step (newVal) {
      if (newVal + 1 === this.rollbackData.length) {
        this.nextFlag = false
      } else {
        this.nextFlag = true
      }
    },
    previewScale (val) {
      let width = parseInt(this.items.data.w) + 4
      let height = parseInt(this.items.data.h) + 4
      this.previewWidth = Math.ceil(width * val / 100)
      this.previewHeight = Math.ceil(height * val / 100)
    }
  },
  methods: {
    ...mapActions([
      'blurRenderItem',
      'resetRenderState',
      'editRenderData',
      'recallRenderItem',
      'nextRenderItem',
      'initRenderItem',
      'editModuleData',
      'blurCopyData'
    ]),
    addDataWatcher () {
      this.watchItems = this.$watch('renderData.items', function (val) {
        console.log('watch items change', val)
        this.changed = true
        this.removeDataWatcher()
      }, {
        deep: true
      })
    },
    beforeunload (e) {
      if (!this.changed) return

      var confirmationMessage = '可能有数据未保存'
      e.returnValue = confirmationMessage
      return confirmationMessage
    },
    removeDataWatcher () {
      if (this.changed) {
        // unwatch
        this.watchItems && this.watchItems()
      }
    },

    handleRecall () {
      if (!this.step) return
      this.recallRenderItem()
      // 拷贝问题，items内存地址改变
      this.blurRenderItem()
    },
    handleNext () {
      if (!this.nextFlag) return
      this.nextRenderItem()
      // 拷贝问题，items内存地址改变
      this.blurRenderItem()
    },

    // 上一步
    handleBack () {
      this.$router.go(-1)
    },
    handleCancel () {
      if (this.changed) {
        this.$confirm('你即将离开当前页面，未保存的数据将会丢失, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.changed = false
          this.$router.go(-1)
        })
      } else {
        this.$router.go(-1)
      }
    },
    handlePreview () {
      this.previewVisible = true
      this.$nextTick(() => {
        let previewBody = this.$refs.previewBody

        let pw = previewBody.offsetWidth - 2
        let ph = previewBody.offsetHeight - 42

        let width = this.items.data.w
        let height = this.items.data.h

        let scaleW = (pw / width) >= 1 ? 1 : pw / width
        let scaleH = (ph / height) >= 1 ? 1 : ph / height

        let scale = scaleW <= scaleH ? scaleW : scaleH
        this.previewScale = Math.floor(scale * 100)
      })
    },
    handleSave () {
      this.blurRenderItem()
      this.changed = false
      this.saveDialog = true
      console.log(this.items)
      this.$nextTick(() => {
        this.drawCanvas()
      })
    },
    drawCanvas () {
      // 前端绘图
      let mycanvas = this.$refs.canvasDom
      // 计算相应的实际的宽高
      let width = mycanvas.offsetWidth * this.renderScale / 100
      let height = mycanvas.offsetHeight * this.renderScale / 100
      let canvas = document.createElement('canvas') // 创建一个canvas节点
      let scale = 1 // 定义任意放大倍数 支持小数
      canvas.width = width * scale // 定义canvas 宽度 * 缩放
      canvas.height = height * scale // 定义canvas高度 *缩放
      canvas.getContext('2d').scale(scale, scale) // 获取context,设置scale
      let opts = {
        scale: scale, // 添加的scale 参数
        canvas: canvas, // 自定义 canvas
        logging: false, // 日志开关，便于查看html2canvas的内部执行流程
        width: width, // dom 原始宽度
        height: height,
        useCORS: true
      }
      html2canvas(mycanvas, opts).then(canvas => {
        let imgData = canvas.toDataURL('image/png')
        this.imgUrl = imgData
      })
    },
    handleEditRender (formName) {
      if (this.ratioType === 'predefined') {
        this.form.ratio = this.selectRatio
      } else {
        this.form.ratio = this.form.customWidth + 'x' + this.form.customHeight
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let w = this.form.ratio.split('x')[0]
          let h = this.form.ratio.split('x')[1]
          let items = _.cloneDeep(defaultItems)

          items.data.w = this.form.direction === 'horizontal' ? w : h
          items.data.h = this.form.direction === 'horizontal' ? h : w

          this.setScaleRatio(parseInt(items.data.w), parseInt(items.data.h))
          this.editRenderData(items)
          this.initRenderItem()
          this.canvasConfig = {
            width: parseInt(items.data.w),
            height: parseInt(items.data.h),
            origin: 40, // 刻度尺x坐标位置
            w: 10, // 刻度线的间隔
            h: 7 // 刻度线基础长度
          }
          this.addDialog = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    fetchData () {
      this.resetRenderState()
    },
    // 设置缩放比
    setScaleRatio (width, height) {
      width = width + 45
      height = height + 45
      let renderWidth = this.$refs.renders.offsetWidth - 50
      let scaleWidth = (renderWidth / width) >= 1 ? 1 : (renderWidth / width)
      let renderHeight = this.$refs.renders.offsetHeight - 50
      let scaleHeight = (renderHeight / height) >= 1 ? 1 : (renderHeight / height)
      let scale = scaleWidth <= scaleHeight ? scaleWidth : scaleHeight
      this.renderScale = parseInt(scale * 100)
      if (scale === 1) {
        this.$store.commit('updateScale', 100)
      }
      this.renderWidth = Math.ceil(width * scale)
      this.renderHeight = Math.ceil(height * scale)
    }
  },
  created () {
    // 初始化数据
    this.fetchData()
  },
  mounted () {
    this.addDataWatcher()
    window.addEventListener('beforeunload', this.beforeunload)
  },
  beforeDestroy () {
    this.removeDataWatcher()
    window.removeEventListener('beforeunload', this.beforeunload)
  },
  beforeRouteLeave (to, from, next) {
    this.blurCopyData()
    // 判断是否有数据变更
    if (this.changed) {
      this.$confirm('你即将离开当前页面，未保存的数据将会丢失, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        next()
      }).catch(() => {
        next(false)
      })
    } else {
      next()
    }
  }
}
</script>

<style lang="scss" scoped>
.section-body {
  width: 100%;
  height: 100%;
  .header-bar {
    height: 38px;
    line-height: 38px;
    background-color: #ffffff;
    // border: 1px solid #dcdcdc;
    margin-bottom: 1px;
    padding: 10px 0;
    .bar-item {
      display: inline-block;
      vertical-align: top;
      padding: 9px 10px;
      line-height: 20px;
      width: 140px;
      .item-btn {
        display: -webkit-inline-flex;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        width: 65px;
        color: #4f93db;
        vertical-align: top;
        i {
          display: block;
          width: 20px;
          height: 20px;
          margin-right: 2px;
          background-image: url('../../assets/icon-bg2.png');
          background-size: 80px 20px;
          &.arrow-left {
            background-position: 0 0;
          }
          &.arrow-right {
            background-position: -40px 0;
          }
        }
        &.no-cursor {
          cursor: not-allowed;
          color: #939393;
          i.arrow-left {
            background-position: -19px 0;
          }
          i.arrow-right {
            background-position: -61px 0;
          }
        }
      }
      .line {
        margin: 0 4px;
        display: inline-block;
        vertical-align: top;
        width: 2px;
        height: 20px;
        background-color: #999999;
      }
    }
    .header-btn-group {
      margin-right: 15px;
      button {
        width: 76px;
        padding: 5px 15px;
        text-align: justify;
        text-align-last: justify;
      }
    }
    .opt-list {
      float: right;
      padding-right: 10px;
      .opt-item {
        float: left;
        display: -webkit-flex;
        display: flex;
        align-items: center;
        padding: 0 8px;
        margin: 0 5px;
        cursor: pointer;
        border-radius: 4px;
        &:hover {
          background-color: #dcf3fb;
          color: #1882df;
        }
        i {
          display: block;
          width: 20px;
          height: 20px;
          margin-right: 5px;
          background-image: url('../../assets/icon-bg.png');
          background-size: 80px 20px;
          &.cancel {
            background-position: -20px 0;
          }
          &.draft {
            background-position: -0 0;
          }
          &.save {
            background-position: -60px 0;
          }
          &.preview {
            background-position: -40px 0;
          }
        }
      }
    }
  }
  .body-center {
    position: relative;
    width: 100%;
    height: 100%;
    .left-wrap {
      position: absolute;
      top: 0;
      left: 0;
      width: 160px;
      height: 100%;
      background-color: #ffffff;
      border: 1px solid #dcdcdc;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
    }
    .render {
      position: absolute;
      top: 0;
      left: 161px;
      right: 221px;
      padding: 15px;
      height: 100%;
      box-sizing: border-box;
      background-image: url('../../assets/render_bg.jpg');
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center center;
      .render-content {
        max-width: 100%;
        max-height: 100%;
        overflow: auto;
        .scale-box {
          position: relative;
          padding: 40px 5px 5px 40px;
          overflow: hidden;
          .canvas-ruler {
            position: absolute;
            left: 0;
            top: 0;
          }
        }
        .render-body {
          width: 100%;
          height: 100%;
          box-shadow: 0 0 0 1px #d1d1d1;
        }
      }
      .slide-bar {
        position: absolute;
        width: 180px;
        bottom: 10px;
        right: 20px;
        opacity: 0.7;
        .slide {
          display: inline-block;
          vertical-align: middle;
          width: 120px;
          margin-right: 15px;
        }
      }
    }
    .right-wrap {
      position: absolute;
      top: 0;
      right: 0;
      width: 220px;
      height: 100%;
      background-color: #ffffff;
      border: 1px solid #dcdcdc;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
    }
  }
}

.preview-dialog-body {
  position: relative;
  width: 100%;
  height: 100%;
  padding-bottom: 40px;
  box-sizing: border-box;
  .preview-body {
    max-width: 100%;
    max-height: 100%;
    overflow: auto;
  }
  .preview-scale {
    position: absolute;
    bottom: 10px;
    right: 20px;
    .slide {
      width: 200px;
    }
    .tip {
      margin-left: 20px;
      line-height: 38px;
    }
  }
}

.add-dialog-content {
  display: -webkit-flex;
  display: flex;
  .dialog-con-left {
    width: 400px;
    padding-right: 40px;
    .hd-title {
      padding: 20px 0 15px;
      font-size: 20px;
      line-height: 40px;
      color: #505050;
    }
    .new-templete-form {
      padding: 20px 0;
    }
  }
  .dialog-con-right {
    width: 500px;
    padding-left: 40px;
    border-left: 2px solid rgba(115, 203, 203, 0.4);
    .el-tab-pane {
      height: 380px;
      overflow: hidden;
      .pane-section-list {
        padding-bottom: 15px;
        .sc-hd {
          line-height: 28px;
        }
        .sc-md {
          .item-img-wrap {
            height: 60px;
            margin: 8px 0;
            img {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }
    .empty-page {
      border: 1px solid #c0c0c0;
      height: 160px;
      margin-top: 100px;
    }
    .dialog-footer {
      text-align: center;
      margin: 10px 0 20px;
      &>button {
        width: 70px;
      }
    }
  }
}

.full-item-content {
  padding-top: 32px;
  .con-row {
    padding: 4px 0;
    padding-left: 15px;
    .row-label {
      width: 70px;
      padding-right: 35px
    }
    .form-radio-row > div {
      margin: 10px 0;
    }
    .input-center-div {
      margin: 0 10px;
    }
  }
}

</style>
