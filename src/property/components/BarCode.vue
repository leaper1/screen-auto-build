<template>
  <basic :data="data.basic" :item="item">
    <div class="group-item">
      <div class="lab">上传封面</div>
      <div class="group-item-content">
        <upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleCoverSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="data.coverUrl" :src="data.coverUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </upload>
      </div>
    </div>
    <div class="group-item">
      <div class="lab">上传内容</div>
      <div class="group-item-content">
        <ul class="img-list cf">
          <transition name="el-zoom-in-top">
            <li class="img-item" v-for="(item, index) in data.value" :key="index">
              <img class="avatar" :src="item" alt="">
              <div class="hover-opt df-c">
                <i class="el-icon-delete" @click="handleDel(index)"></i>
              </div>
            </li>
          </transition>
          <upload
            class="avatar-uploader fl"
            action="https://jsonplaceholder.typicode.com/posts/"
            :file-list="data.value"
            :on-success="uploadSuccess"
            :before-upload="beforeAvatarUpload">
            <i class="el-icon-plus avatar-uploader-icon"></i>
          </upload>
        </ul>

      </div>
    </div>
  </basic>
</template>

<script>
import Upload from '@c/Upload'
import common from '../common.js'
export default {
  name: 'edit-BarCode',
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
    handleCoverSuccess (res, file) {
      this.data.coverUrl = URL.createObjectURL(file)
    },
    uploadSuccess (res, file, fileList) {
      fileList.push(URL.createObjectURL(file))
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
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
.img-list {
  .img-item {
    float: left;
    width: 78px;
    height: 78px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
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
