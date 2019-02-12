<template>
  <section style="height: 100%;">
    <div class="container">
      <div class="table-header">
        <div class="table-header-left">
          <el-button>刷新</el-button>
        </div>
        <div class="table-header-right">
          <el-input style="width: 160px;" placeholder="请输入素材名称"></el-input>
          <el-button>搜索</el-button>
          <upload
            multiple
            :attr="attr"
            :file-list="tableData"
            :on-error="uploadError"
            :on-success="uploadSuccess"
            :before-upload="beforeAvatarUpload"
            :on-progress="uploadProgress">
            <el-button type="primary">上传素材</el-button>
          </upload>
          <span class="sort-btn">
            <i class="el-icon-menu" :class="{active: isCard}" @click="isCard = true"></i>
            <!-- <i class="el-icon-more" :class="{active: !isCard}" @click="isCard = false"></i> -->
            <!-- <i class="fa fa-th-large" :class="{active: isCard}" @click="isCard = true" aria-hidden="true"></i> -->
            <i class="fa fa-list-ul" :class="{active: !isCard}" @click="isCard = false" aria-hidden="true"></i>
          </span>
        </div>
      </div>
      <el-checkbox-group v-if="!isCard" v-model="checkList" @change="checkedChange" class="f14">
        <el-table :data="tableData" ref="Table" style="width: 100%" stripe
          @selection-change="handleSelectionChange"
          element-loading-text="拼命加载中" v-loading="loading">
          <!-- <el-table-column type="selection" width="55"></el-table-column> -->
          <el-table-column width="55" align="center">
            <template slot-scope="scope">
              <el-checkbox class="tbl-check" :label="scope.row.id">{{""}}</el-checkbox>
            </template>
          </el-table-column>
          <el-table-column label="缩略图" width="200">
            <template slot-scope="scope">
              <div class="tbl-thumb-wrap df-c">
                <img :src="scope.row.imgUrl || require('../../assets/head.png')" alt="">
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="素材名"></el-table-column>
          <el-table-column prop="ratio" label="分辨率"></el-table-column>
          <el-table-column prop="type" label="格式"></el-table-column>
          <el-table-column prop="size" label="大小"></el-table-column>
          <el-table-column prop="updateTime" label="修改时间"></el-table-column>
          <!-- <el-table-column label="操作" width="180">
            <template slot-scope="scope">
              <el-button size="mini" plain type="primary" @click="handleMakeProgram(scope.row.id)">制作节目</el-button>
              <el-button size="mini" plain type="primary" @click="handleEditTemp(scope.row.id)">编辑</el-button>
            </template>
          </el-table-column> -->
        </el-table>
      </el-checkbox-group>
      <el-checkbox-group v-else v-model="checkList" @change="checkedChange" class="f14">
        <div class="list-content">
          <el-card class="box-card" v-for="item in tableData" :key="item.id" :body-style="{ padding: '0px' }" shadow="hover">
            <label>
            <div class="card-img-wrap df-c">
              <img :src="item.imgUrl" alt="">
              <el-progress
                class="circle-progress"
                type="circle" :width="100"
                v-if="item.loading"
                :percentage="item.percentage"></el-progress>
                <el-progress
                class="circle-progress"
                type="circle" :width="100"
                v-if="item.reading"
                color="#8e71c7"
                :percentage="item.readPercent"></el-progress>
              <el-checkbox class="card-check" :label="item.id">{{""}}</el-checkbox>
            </div>
            </label>
            <div class="card-center">
              <div class="row-item title">
                <span>{{item.name}}</span>
                <i class="el-icon-edit-outline"></i>
              </div>
              <div class="row-item info">
                <span>{{item.ratio}}</span>
                <span>{{item.size}}</span>
              </div>
              <div class="row-item info">
                <span>{{item.createTime}}</span>
                <span>{{item.type}}</span>
              </div>
            </div>
            <!-- <div class="card-bot">
              <div class="row-item">
                <el-button size="mini" plain type="primary" @click="handleEdit(item.id)">编辑</el-button>
                <el-button size="mini" plain type="primary" @click="handleMakeProgram(item.id)">制作节目</el-button>
              </div>
            </div> -->
          </el-card>
        </div>
      </el-checkbox-group>
      <div class="table-footer">
        <div class="table-footer-left">
          <el-checkbox v-model="checkedAll" @change="handleCheckAll">全选</el-checkbox>
        </div>
        <div class="pagination" v-show="!loading">
          <el-pagination background layout="prev, pager, next, total" :total="total" :page-size="pageSize" @current-change="handleCurrentChange"></el-pagination>
        </div>
        <div class="table-footer-right">
          <el-button type="text" class="text-del">删除</el-button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Upload from '@c/Upload'
export default {
  name: 'Material',
  data () {
    return {
      isCard: true,
      loading: false,
      total: 0,
      pageSize: 10,
      tableData: [
        {
          id: 1,
          name: '素材一',
          imgUrl: require('../../assets/head.png'),
          type: 'PNG',
          size: '1.3M',
          ratio: '1920 * 480',
          createTime: '2018/8/8',
          updateTime: '2018/8/8'
        },
        {
          id: 2,
          name: '模板一',
          imgUrl: require('../../assets/head.png'),
          type: 'PNG',
          size: '1.3M',
          ratio: '1920 * 480',
          createTime: '2018/8/8',
          updateTime: '2018/8/8'
        },
        {
          id: 3,
          name: '模板一',
          imgUrl: require('../../assets/head.png'),
          type: 'PNG',
          size: '1.3M',
          ratio: '1920 * 480',
          createTime: '2018/8/8',
          updateTime: '2018/8/8'
        },
        {
          id: 4,
          name: '模板一',
          imgUrl: require('../../assets/head.png'),
          type: 'PNG',
          size: '1.3M',
          ratio: '1920 * 480',
          createTime: '2018/8/8',
          updateTime: '2018/8/8'
        },
        {
          id: 5,
          name: '模板一',
          imgUrl: require('../../assets/head.png'),
          type: 'PNG',
          size: '1.3M',
          ratio: '1920 * 480',
          createTime: '2018/8/8',
          updateTime: '2018/8/8'
        }
      ],
      checked: false,
      checkList: [],
      checkedAll: '',
      percentage: 0,
      attr: {
        fileName: 'name',
        fileSize: 'size',
        fileType: 'type'
      }
    }
  },
  components: {
    Upload
  },
  methods: {
    // 表格多选
    handleSelectionChange (val) {
      this.selection = val
    },
    handleCurrentChange (val) {

    },
    checkedChange (value) {
      let checkedCount = value.length
      this.checkedAll = checkedCount === this.tableData.length
    },
    handleCheckAll (val) {
      let arr = []
      arr = this.tableData.map(item => item.id)
      this.checkList = val ? arr : []
    },
    // 制作节目
    handleMakeProgram (id) {

    },
    // 编辑模板
    handleEdit (id) {

    },
    // 新建模板
    handleAdd () {

    },

    // 上传
    uploadError (res, file) {

    },
    uploadSuccess (res, file, fileList) {

    },
    beforeAvatarUpload (file) {
      return true
    },
    uploadProgress (percentage) {
      // this.$nextTick(() => {

      // })
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      let children = vm.$route.meta.children
      if (children) {
        vm.children = children
      } else {
        vm.children = null
      }
    })
  }
}
</script>

<style lang="scss">
.tbl-check {
  .el-checkbox__label {
    padding-left: 0;
  }
}
</style>

<style lang="scss" scoped>
$--primary-color: #409EFF;
.tbl-thumb-wrap {
  height: 80px;
  padding: 10px;
  margin-right: 10px;
  box-sizing: border-box;
  background-color: #eeeeee;
  img {
    max-width: 100%;
    max-height: 100%;
  }
}

.sort-btn {
  display: inline-block;
  margin-left: 10px;
  height: 100%;
  font-size: 20px;
  box-sizing: border-box;
  i {
    cursor: pointer;
    margin-left: 10px;
    color: #cccccc;
    &.active {
      color: $--primary-color;
    }
  }
}
.list-content {
  display: -webkit-flex;
  display: flex;
  flex-wrap: wrap;
  // justify-content: space-between;
  margin: 0 -10px;
  .box-card {
    margin: 10px;
    width: 200px;
    .row-item {
      display: -webkit-flex;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .card-img-wrap {
      position: relative;
      cursor: pointer;
      height: 120px;
      padding: 10px;
      box-sizing: border-box;
      background-color: #000;
      img {
        max-width: 100%;
        max-height: 100%;
      }
      .card-check {
        position: absolute;
        top: 10px;
        left: 10px;
      }
      .circle-progress {
        position: absolute;
        top: 10px;
      }
    }
    .card-center {
      padding: 5px 10px;
      .title {
        font-size: 16px;
        margin-top: 5px;
        line-height: 32px;
      }
      .info {
        color: #606266;
        line-height: 24px;
      }
    }
    .card-bot {
      border-top: 1px solid #eee;
      margin: 0 10px;
      padding: 5px 0;
    }
  }
}
</style>
