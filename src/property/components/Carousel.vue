<template>
  <basic :data="data.basic" :item="item">
    <!-- 基础属性 -->
    <el-collapse-item title="参数设置" name="3" slot="basic">
      <div class="group-item-content">
        <div class="inline-row">
          <span>自动播放</span>
          <div class="row-content tr">
            <el-switch
              v-model="data.style.autoplay"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
          </div>
        </div>
        <div class="inline-row">
          <span>循环</span>
          <div class="row-content tr">
            <el-switch
              v-model="data.style.loop"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
          </div>
        </div>
        <div class="inline-row">
          <span>切换时间</span>
          <div class="row-content">
            <el-input v-model="data.style.interval" @blur="changeInt(data.style.interval, 'interval')" type="number" min="0" placeholder=""></el-input>
          </div>
        </div>
      </div>
    </el-collapse-item>
    <div class="group-item">
      <upload
        action="https://jsonplaceholder.typicode.com/posts/"
        :file-list="data.value"
        :on-success="uploadSuccess"
        :before-upload="beforeAvatarUpload">
        <div class="lab" style="cursor: pointer;">上传内容</div>
      </upload>
      <div class="group-item-content">
        <transition-group tag="ul" name="el-fade-in-linear" class="file-list">
          <li class="file-item" v-for="(item, index) in data.value" :key="item.type + index">
            <div class="file-item-body">
              <div class="file-thumb-wrap">
                <img src="../../assets/document.png" alt="">
              </div>
              <div class="flex-1 wes">{{item.fileName}}</div>
              <div class="upload-state">
                <span v-if="item.loading">{{item.percentage}}%</span>
                <template v-else>
                  <i class="upload-success el-icon-circle-check"></i>
                  <i class="delete el-icon-close" @click="handleDel(index)"></i>
                </template>
              </div>
            </div>
            <el-progress v-if="item.loading" :percentage="70" :show-text="false" :stroke-width="3"></el-progress>
          </li>
        </transition-group>
      </div>
    </div>
  </basic>
</template>

<script>
import Upload from '@c/Upload'
import common from '../common.js'
export default {
  name: 'EditCarousel',
  mixins: [common],
  data () {
    return {
      imageUrl: ''
    }
  },
  components: {
    Upload
  },
  methods: {
    changeInt (val, type) {
      this.data.style[type] = parseInt(val)
    },
    handleCoverSuccess (res, file) {
      this.data.coverUrl = URL.createObjectURL(file)
    },
    uploadSuccess (res, file, fileList) {
      fileList.push(URL.createObjectURL(file))
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
    handleDel (index) {
      this.data.value.splice(index, 1)
    }
  }
}
</script>

<style lang="scss" scoped>
.avatar-uploader {
  display: inline-block;
  width: 78px;
  height: 78px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  margin: 4px 2px;
  &:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 78px;
    height: 78px;
    line-height: 78px;
    text-align: center;
  }
  .avatar {
    width: 78px;
    height: 78px;
    display: block;
  }
}
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
.img-list {
  .img-item {
    float: left;
    width: 78px;
    height: 78px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    margin: 4px 2px;
    .hover-opt {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      font-size: 20px;
      color: #fff;
      opacity: 0;
      background-color: rgba(0, 0, 0, 0.5);
      transition: opacity .3s;
      i {
        cursor: pointer;
      }
      &:hover {
        opacity: 1;
      }
    }
  }
  .avatar {
    width: 78px;
    height: 78px;
    display: block;
  }
}
</style>
