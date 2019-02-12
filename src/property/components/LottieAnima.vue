<template>
  <basic :data="data.basic" :item="item">
    <el-collapse-item slot="basic" title="参数设置" name="3">
      <div class="group-item-content">
        <div class="inline-row">
          <span>速度</span>
          <div class="row-content">
            <el-input-number v-model="data.style.speed" :step="0.5" :min="0" :max="3" size="mini" style="width: 98px;"></el-input-number>
          </div>
        </div>
        <div class="inline-row">
          <span>循环</span>
          <div class="row-content tr">
            <el-switch
              v-model="data.style .loop"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
          </div>
        </div>
      </div>
    </el-collapse-item>
    <!-- <div class="group-item">
      <div class="lab">参数设置</div>
      <div class="group-item-content">
        <div class="inline-row">
          <span>速度</span>
          <div class="row-content">
            <el-input-number v-model="data.value.speed" :step="0.5" :min="0" :max="3" size="mini" style="width: 98px;"></el-input-number>
          </div>
        </div>
        <div class="inline-row">
          <span>循环</span>
          <div class="row-content tr">
            <el-switch
              v-model="data.value.loop"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
          </div>
        </div>
      </div>
    </div> -->
    <div class="group-item">
      <upload
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-success="uploadSuccess"
        :before-upload="beforeAvatarUpload">
        <div class="lab" style="cursor: pointer;">上传内容</div>
      </upload>
      <div class="group-item-content">
        <ul class="file-list" v-if="data.value">
          <li class="file-item">
            <div class="file-item-body">
              <div class="file-thumb-wrap">
                <img src="../../assets/document.png" alt="">
              </div>
              <div class="flex-1 wes">{{data.style.fileName}}</div>
              <div class="upload-state">
                <i class="upload-success el-icon-circle-check"></i>
                <i class="delete el-icon-close" @click="handleDel()"></i>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </basic>
</template>

<script>
import common from '../common.js'
import Upload from '@c/Upload'
export default {
  name: 'edit-image',
  mixins: [common],
  components: {
    Upload
  },
  methods: {
    uploadSuccess (res, file) {
      this.data.style.fileName = file.fileName
    },
    beforeAvatarUpload (file) {
      const isJPG = true
      const isLt2M = file.size / 1024 / 1024 < 2

      // if (!isJPG) {
      //   this.$message.error('上传只能是 JPG 格式!')
      // }
      if (!isLt2M) {
        this.$message.error('上传文件大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    handleDel () {
      this.data.value = null
    }
  }
}
</script>

<style lang="scss" scoped>
.file-list {
  li.file-item {
    cursor: pointer;
    position: relative;
    overflow: hidden;
    padding: 4px 0;
    border-radius: 4px;
    border-bottom: 1px solid #eee;
    &:first-child{
      border-top: 1px solid #eee;
    }
    .file-item-body {
      display: -webkit-flex;
      display: flex;
      align-items: center;
      padding-bottom: 3px;
    }
    .file-thumb-wrap {
      width: 20px;
      height: 20px;
      margin-right: 7px;
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    .upload-state {
      margin-left: 7px;
      width: 34px;
      text-align: center;
      line-height: 20px;
      i.upload-success {
        color: #67c23a;
      }
      i.delete {
        display: none;
        cursor: pointer;
        opacity: .75;
        color: #606266;
      }
    }
    &:hover {
      background-color: #f5f7fa;
      color: #409eff;
      .upload-state {
        i.upload-success {
          display: none;
        }
        i.delete {
          display: block;
        }
      }
    }
  }
}
</style>
