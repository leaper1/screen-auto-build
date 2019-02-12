<template>
  <section class="container flex-dc" style="height: 100%;">
    <div class="sc-hd">
      <upload
        multiple
        :file-list="fileList"
        :on-error="uploadError"
        :on-success="uploadSuccess"
        :before-upload="beforeAvatarUpload"
        :abrot="abrotSuccess">
        <el-button type="primary">上传素材</el-button>
      </upload>
    </div>
    <div class="sc-md flex-1">
      <vue-scroll>
        <ul class="file-list">
          <li class="file-list-item" v-for="(item, index) in fileList" :key="index">
            <div class="file_num">{{index + 1}}</div>
            <div class="file_image_wrap df-c">
              <img :src="item.imgUrl" alt="">
            </div>
            <div class="file_name flex-1">{{item.fileName}} <span v-if="item.reading">（解析文件中...）</span> </div>
            <div class="file_progress">
              <template v-if="!item.complete">
                <el-progress :percentage="item.percentage" :show-text="false" :stroke-width="10"></el-progress>
                <div class="file_progress-text">
                  <span>{{getfilesize(item.preLoad)}}/{{item.fileSize}}</span>
                  <span class="fr">上传速度：{{item.speed}}</span>
                </div>
              </template>
              <div v-else>
                <span>{{item.endTime}}</span> <span style="margin-left: 30px;">{{item.status ? '上传成功' : '上传失败'}}</span>
              </div>
            </div>
            <div class="file_operate">
              <el-button v-if="!item.complete" type="text" class="opt-btn del" @click="onAbrot(item)"><i class="el-icon-close"></i></el-button>
              <el-button v-else type="text" class="opt-btn check"><i class="el-icon-check"></i></el-button>
            </div>
          </li>
        </ul>
      </vue-scroll>
    </div>
    <div class="sc-bd sc-con">
      <div class="sc-con-left">
        <div class="save-space">
          <span>存储空间：</span>
          <el-progress class="save-progress" :stroke-width="8" :show-text="false" :percentage="42.4"></el-progress>
          <span>4.24G/10G</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import moment from 'moment'
import Upload from '@c/Upload'
export default {
  name: 'UpList',
  data () {
    return {
      fileList: []
    }
  },
  components: {
    Upload
  },
  methods: {
    getfilesize (size) {
      if (!size) { return '' }

      var num = 1024.00 // byte

      if (size < num) { return size + 'B' }
      if (size < Math.pow(num, 2)) { return (size / num).toFixed(2) + 'K' } // kb
      if (size < Math.pow(num, 3)) { return (size / Math.pow(num, 2)).toFixed(2) + 'M' } // M
      if (size < Math.pow(num, 4)) { return (size / Math.pow(num, 3)).toFixed(2) + 'G' } // G
      return (size / Math.pow(num, 4)).toFixed(2) + 'T' // T
    },
    // 上传
    uploadError (res, file, fileItem) {
      fileItem.endTime = moment().format('YYYY-MM-DD')
      fileItem.status = 0
    },
    uploadSuccess (res, file, fileItem) {
      fileItem.endTime = moment().format('YYYY-MM-DD')
      fileItem.status = 1
      // fileItem.imgUrl = res.data.
    },
    beforeAvatarUpload (file) {
      return true
    },
    onAbrot (item) {
      !item.reading && item.abort.cancel('Operation canceled by the user.')
    },
    abrotSuccess (message, fileItem) {
      let index = this.fileList.findIndex(item => item === fileItem)
      this.fileList.splice(index, 1)
      this.$message.warning('取消上传成功！')
    }
  }
}
</script>

<style lang="scss" scoped>
.sc-con {
  display: -webkit-flex;
  display: flex;
  line-height: 32px;
  &-left {
    flex: 1;
    & > * + *{
      max-width: 220px;
      margin-left: 10px;
    }
  }
  &-right {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    & > * + *{
      max-width: 220px;
      margin-left: 10px;
    }
  }
}
.sc-hd {
  padding-bottom: 15px;
  border-bottom: 2px solid #F6F6F6;
}
.sc-bd {
  padding-top: 15px;
  border-top: 2px solid #F6F6F6;
  .save-space {
    font-size: 12px;
    color: #666;
    .save-progress {
      display: inline-block;
      width: 160px;
      margin-right: 15px;
      margin-left: 10px;
    }
  }
}

.file-list {
  &-item {
    display: -webkit-flex;
    display: flex;
    align-items: center;
    padding: 10px 20px;
    color: #45516b;
    border-bottom: 1px solid #f2edf3;
    .file_num {
      width: 30px;
    }
    .file_image_wrap {
      width: 70px;
      height: 70px;
      margin: 0 20px;
      img {
        max-width: 100%;
        max-height: 100%;
      }
    }
    .file_name {
      padding: 0 10px;
    }
    .file_progress {
      width: 400px;
      padding: 0 10px;
      margin: 0 20px;
      &-text {
        margin-top: 10px;
      }
    }
    .file_operate {
      margin-left: 40px;
      margin-right: 20px;
      .opt-btn {
        font-size: 20px;
        &.del {
          color: #F56C6C;
        }
        &.check {
          color: #67C23A;
        }
      }
    }
  }
}
</style>
