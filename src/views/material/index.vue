<template>
  <section class="container flex-dc" style="height: 100%;" v-loading="loading">
    <div class="sc-hd sc-con">
      <div class="sc-con-left">
        <el-button-group class="path-btn-group">
          <el-button icon="el-icon-arrow-left"></el-button>
          <el-button icon="el-icon-arrow-right"></el-button>
          <el-button icon="el-icon-refresh"></el-button>
        </el-button-group>
        <folder-path :path="folderPath" @onSelect="changeFolder"></folder-path>
      </div>
      <div class="sc-con-right">
        <el-select v-model="type" style="width: 140px;" clearable class="search-select" placeholder="选择素材类型" @change="fetchData">
          <el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <el-input style="width: 160px;" placeholder="请输入素材名称"><el-button slot="append" icon="el-icon-search"></el-button></el-input>
        <el-dropdown class="sort-dropdown" trigger="click">
          <span class="dropdown-link">
            <i class="fa fa-sort-amount-desc" aria-hidden="true"></i>
          </span>
          <!-- <i class="fa fa-sort-amount-desc" aria-hidden="true"></i> -->
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <div class="sort-dropitem">
                <label>
                  <span class="check-label">名称</span>
                  <input type="radio" v-model="sortType" class="checkbox_input dn" value="name">
                  <span class="check-icon"></span>
                </label>
              </div>
            </el-dropdown-item>
            <el-dropdown-item>
              <div class="sort-dropitem">
                <label>
                  <span class="check-label">时间</span>
                  <input type="radio" v-model="sortType" class="checkbox_input dn" value="time">
                  <span class="check-icon"></span>
                </label>
              </div>
            </el-dropdown-item>
            <el-dropdown-item>
              <div class="sort-dropitem">
                <label>
                  <span class="check-label">大小</span>
                  <input type="radio" v-model="sortType" class="checkbox_input dn" value="size">
                  <span class="check-icon"></span>
                </label>
              </div>
            </el-dropdown-item>
            <el-dropdown-item divided>
              <div class="sort-dropitem">
                <label>
                  <span class="check-label">递减</span>
                  <input type="radio" v-model="sortValue" class="checkbox_input dn" value="desc">
                  <span class="check-icon"></span>
                </label>
              </div>
            </el-dropdown-item>
            <el-dropdown-item>
              <div class="sort-dropitem">
                <label>
                  <span class="check-label">递增</span>
                  <input type="radio" v-model="sortValue" class="checkbox_input dn" value="asc">
                  <span class="check-icon"></span>
                </label>
              </div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <upload
          multiple
          :attr="attr"
          :file-list="folderList"
          :on-error="uploadError"
          :on-success="uploadSuccess"
          :before-upload="beforeAvatarUpload">
          <el-button type="primary">上传素材</el-button>
        </upload>
      </div>
    </div>
    <div class="sc-md flex-1">
      <div class="file-continer file-list">
        <div class="file-folder" v-for="(item, index) in folderList" :key="index" @dblclick="handleSelect(item, index)" @click.stop="currentInd = index" :class="{select: currentInd === index}">
          <div class="folder-ico">
            <i v-if="item.type === 'folder'" class="fa fa-folder" aria-hidden="true"></i>
            <img v-else :src="item.imgUrl" alt="">
            <el-progress class="up-progress" v-if="item.loading" :width="80" type="circle" :percentage="item.percentage"></el-progress>
          </div>
          <div class="folder-name wes-2">{{item.name}}</div>
        </div>
        <div class="flex-empty"></div>
        <div class="flex-empty"></div>
        <div class="flex-empty"></div>
        <div class="flex-empty"></div>
        <div class="flex-empty"></div>
        <div class="flex-empty"></div>
        <div class="flex-empty"></div>
        <div class="flex-empty"></div>
        <div class="flex-empty"></div>
        <div class="flex-empty"></div>
        <div class="flex-empty"></div>
        <div class="flex-empty"></div>
        <div class="flex-empty"></div>
        <div class="flex-empty"></div>
        <div class="flex-empty"></div>
      </div>
    </div>
    <div class="sc-bd sc-con">
      <div class="sc-con-left">
        <div class="save-space">
          <span>存储空间：</span>
          <el-progress class="save-progress" :stroke-width="8" :show-text="false" :percentage="42.4"></el-progress>
          <span>4.24G/10G</span>
        </div>
      </div>
      <div class="sc-con-right">
        <el-button type="info" plain round>移动至</el-button>
        <el-button type="primary" plain round>新建文件夹</el-button>
        <el-button type="danger" plain round>删除</el-button>
      </div>
    </div>

    <el-dialog :visible.sync="showImgVisible" width="400px">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </section>
</template>

<script>
import Upload from '@c/Upload'
import FolderPath from './components/FolderPath'
export default {
  name: 'MaterialList',
  data () {
    return {
      loading: false,
      type: '',
      typeOptions: [{
        label: '图片',
        value: 'image'
      }, {
        label: '视频',
        value: 'video'
      }, {
        label: '动画',
        value: 'lottie'
      }, {
        label: '其他',
        value: 'other'
      }],
      sortType: 'name',
      sortValue: 'desc',
      folderList: [{
        type: 'folder',
        name: '华南区'
      }, {
        type: 'folder',
        name: '华北区'
      }, {
        type: 'folder',
        name: '东北区'
      }],
      folderPath: ['全部素材'],
      currentInd: '',
      showImgVisible: false,
      dialogImageUrl: '',
      // 上传
      attr: {
        fileName: 'name',
        fileSize: 'size',
        fileType: 'type'
      }
    }
  },
  components: {
    FolderPath,
    Upload
  },
  methods: {
    handleBodyClick (e) {
      this.currentInd = ''
    },
    handleSelect (item, index) {
      if (item.type === 'folder') {
        this.folderPath.push(item.name)
        this.fetchData()
      } else {
        this.dialogImageUrl = item.imgUrl
        this.showImgVisible = true
      }
    },
    changeFolder (arr) {
      this.folderPath = arr
      this.fetchData()
    },
    // 上传
    uploadError (res, file, fileItem) {

    },
    uploadSuccess (res, file, fileItem) {
      console.log(fileItem)
      // fileItem.imgUrl = res.data.
    },
    beforeAvatarUpload (file) {
      return true
    },
    fetchData () {
      this.loading = true
      setTimeout(() => {
        this.loading = false
        this.currentInd = ''
        this.folderList = [{
          type: 'folder',
          name: '华南区'
        }, {
          type: 'image',
          name: '乐视薯片.png',
          imgUrl: require('../../assets/a.jpg')
        }, {
          type: 'image',
          name: '乐视薯片.png',
          imgUrl: require('../../assets/image.png')
        }, {
          type: 'image',
          name: '乐视薯片乐视薯片乐视薯片乐视薯片乐视薯片.png',
          imgUrl: require('../../assets/image.png')
        }]
      }, 1000)
    }
  },
  created () {
    document.addEventListener('click', this.handleBodyClick)
  },
  destroyed () {
    document.removeEventListener('click', this.handleBodyClick)
  }
}
</script>

<style lang="scss" scoped>
.path-btn-group {
  button {
    padding: 6px 6px;
    border-radius: 0;
    font-size: 16px;
  }
}
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

.dropdown-link {
  cursor: pointer;
  margin-right: 10px;
  padding: 0 10px;
  color: #909399;
}
.sort-dropitem {
  width: 70px;
  label {
    position: relative;
    cursor: pointer;
    display: block;
    width: 100%;
    height: 100%;
    .checkbox_input {
      display: none;
    }
    .check-icon {
      position: absolute;
      top: 5px;
      right: 5px;
      display: block;
      margin-left: 20px;
      border: 2px solid #ffffff;
      border-left: 0;
      border-top: 0;
      height: 10px;
      transform: rotate(45deg);
      width: 5px;
      transition: transform .15s ease-in .05s;
      transform-origin: center;
    }
    &:hover {
      .check-icon {
        border-color: #ddd;
      }
    }
    .checkbox_input:checked + .check-icon {
      border-color: #409eff;
    }
  }
}

.file-continer {
  padding: 10px;
}
.file-list {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: flex-start;
  .file-folder {
    border: 1px solid transparent;
    text-decoration: none;
    margin: 0;
    width: 100px;
    margin-right: 15px;
    margin-bottom: 15px;
    overflow: hidden;
    color: #444;
    border-radius: 3px;
    box-shadow: 0px 0px 2px rgba(255,255,255,0);
    transition: all 0.2s ease 0s;
    &:hover {
      border: 1px solid #dedede;
      background-image: -webkit-linear-gradient(top,#fafafa,#eeeeee);
    }
    &.select {
      border: 1px solid #d2d2d2;
      background-image: -webkit-linear-gradient(top,#f3f3f3,#d9d9d9);
    }
    .folder-ico {
      position: relative;
      padding: 5px 10px;
      width: 80px;
      height: 80px;
      text-align: center;
      vertical-align: middle;
      display: table-cell;
      i {
        font-size: 80px;
        color: #95C3E5;
      }
      img {
        max-width: 100%;
        max-height: 100%;
      }
      .up-progress {
        position: absolute;
        top: 5px;
        left: 10px;
      }
    }
    .folder-name {
      text-align: center;
      line-height: 1.5em;
      padding-bottom: 5px;
      padding: 0 2px;
      span {
        cursor: text;
      }
    }
  }
  .flex-empty {
    border: 1px solid transparent;
    margin: 0;
    margin-right: 15px;
    width: 100px;
    // margin-bottom: 10px;
    visibility: hidden;
    height: 0 !important;
  }
}
</style>
