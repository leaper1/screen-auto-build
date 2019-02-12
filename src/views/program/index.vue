<template>
  <section style="height: 100%;">
    <div class="container">
      <!-- <div class="page-title">
        <strong><i :class="$route.meta.icon"></i> {{$route.meta.title}}</strong>
      </div> -->
      <div class="table-header">
        <div class="table-header-left">
          <el-button @click="refresh()">刷新</el-button>
        </div>
        <div class="table-header-right">
          <el-input v-model="search" style="width: 160px;" placeholder="请输入节目名称/编号"></el-input>
          <el-button @click="handleSearch">搜索</el-button>
          <el-button @click="addVisiable = true" type="primary">新建</el-button>
        </div>
      </div>
      <el-table :data="tableData" ref="table" style="width: 100%" stripe
        @sort-change="handleSortChange"
        @selection-change="handleSelectionChange"
        @filter-change="handleFilterChange"
        element-loading-text="拼命加载中" v-loading="loading">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="name" label="节目名称" width="220">
          <template slot-scope="scope">
            {{scope.row.name}}
            <div class="tbl-preview fr" @click="previewImg = scope.row.imgUrl; previewVisiable=true;">预览</div>
          </template>
        </el-table-column>
        <el-table-column prop="size" :label="tableSizeLabel" label-class-name="tbl-filter"
          :filters="tableSize" column-key="Size" :filter-multiple="false" filter-placement="bottom"></el-table-column>
        <el-table-column prop="resolution" :label="tableRatioLabel" label-class-name="tbl-filter"
          :filters="tableRatio" column-key="Ratio" :filter-multiple="false" filter-placement="bottom"></el-table-column>
        <el-table-column prop="timeUpdate" label="更新时间" :formatter="timeFormat"></el-table-column>
        <el-table-column prop="creater" label="创建人" :formatter="timeFormat"></el-table-column>
        <el-table-column width="100" label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="handleDetail(scope.row)">详情</el-button>
            <span class="line">|</span>
            <el-button type="text" @click="handlePublic(scope.row.id)">发布</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="table-footer">
        <div class="table-footer-left">
          <el-button type="primary" plain>导入</el-button>
        </div>
        <div class="pagination" v-show="!loading">
          <el-pagination background layout="prev, pager, next, total" :total="total" :page-size="pageSize" @current-change="handleCurrentChange"></el-pagination>
        </div>
        <div class="table-footer-right">
          <el-button type="primary" plain round>移动分组</el-button>
          <el-button type="primary" plain round>一键重启</el-button>
          <el-button type="danger" @click="handleDel">删除</el-button>
        </div>
      </div>
    </div>
    <!-- 添加设备弹窗 -->
    <el-dialog title="添加终端" :visible.sync="addVisiable" width="600px">
      <el-form :model="addForm" ref="addForm" label-width="100px">
        <el-form-item label="终端ID">
          <el-input v-model="addForm.number" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="终端名称">
          <el-input v-model="addForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="尺寸">
          <el-select v-model="addForm.size" placeholder="请选择终端尺寸">
            <el-option label='8"' value="size-8"></el-option>
            <el-option label='12"' value="size-12"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分辨率">
          <el-select v-model="addForm.resolution" placeholder="请选择终端分辨率">
            <el-option label="1920 * 420" value="resolution-1"></el-option>
            <el-option label="1000 * 400" value="resolution-2"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addVisiable = false">取 消</el-button>
        <el-button type="primary" @click="addVisiable = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 预览 -->
    <el-dialog title="节目预览" :visible.sync="previewVisiable" width="400px">
      <div class="preview-img-wrap df-c">
        <img :src="previewImg" alt="">
      </div>
    </el-dialog>
  </section>
</template>

<script>
// import moment from 'moment'

export default {
  name: 'device',
  data () {
    return {
      search: '',
      // table
      loading: false,
      selection: [],
      pageSize: 10,
      currentPage: 1,
      total: 0,
      tableSizeLabel: '尺寸',
      tableSize: [
        { text: '8.8寸', value: '8.8寸' },
        { text: '15.6寸', value: '15.6寸' },
        { text: '21寸', value: '21寸' }
      ],
      tableRatioLabel: '分辨率',
      tableRatio: [
        { text: '1920*420', value: '1920*420' },
        { text: '1000*420', value: '1000*420' },
        { text: '400*400', value: '400*400' }
      ],
      tableData: [
        {
          name: '哇哈哈农夫山泉',
          size: '8.8',
          resolution: '1920 * 420',
          timeUpdate: '2018/12/10',
          creater: '林贝贝',
          imgUrl: require('../../assets/head.png')
        },
        {
          name: '哇哈哈农夫山泉',
          size: '8.8',
          resolution: '1920 * 420',
          timeUpdate: '2018/12/10',
          creater: '林贝贝',
          imgUrl: require('../../assets/head.png')
        },
        {
          name: '哇哈哈农夫山泉',
          size: '8.8',
          resolution: '1920 * 420',
          timeUpdate: '2018/12/10',
          creater: '林贝贝',
          imgUrl: require('../../assets/head.png')
        },
        {
          name: '哇哈哈农夫山泉',
          size: '8.8',
          resolution: '1920 * 420',
          timeUpdate: '2018/12/10',
          creater: '林贝贝',
          imgUrl: require('../../assets/head.png')
        },
        {
          name: '哇哈哈农夫山泉',
          size: '8.8',
          resolution: '1920 * 420',
          timeUpdate: '2018/12/10',
          creater: '林贝贝',
          imgUrl: require('../../assets/head.png')
        }
      ],
      // 预览
      previewVisiable: false,
      previewImg: '',
      // 添加设备
      addVisiable: false,
      addForm: {},
      // 省市区
      props: {
        value: 'label'
      },
      selectedCity: [],
      // 编辑设备
      editVisiable: false,
      editForm: {}
    }
  },
  components: {
    // CusSearch
  },
  computed: {
  },
  methods: {
    timeFormat (row, column) {
      // let time = row[column.property]
      // if (!time) {
      //   return '--'
      // }
      // return moment(time).format('YYYY-MM-DD')
      return row[column.property]
    },
    // 搜索
    handleSearch (val) {
      this.fetchData()
    },
    // 表格排序
    handleSortChange (sortWay) {
      // this.sortWay = {
      //   prop: sortWay.prop,
      //   order: sortWay.order
      // }
      this.fetchData()
    },
    // 表格多选
    handleSelectionChange (val) {
      this.selection = val
    },
    // 表格筛选
    handleFilterChange (filters) {
      let labMap = {
        Status: '状态',
        Size: '尺寸',
        Ratio: '分辨率'
      }
      for (const key in filters) {
        let str = 'table' + key + 'Label'
        if (filters[key].length) {
          this[str] = filters[key][0]
        } else {
          this[str] = labMap[key]
        }
      }
      this.refresh()
    },
    // 选择分页
    handleCurrentChange (val) {
      this.fetchData(val)
    },
    // 关闭弹窗
    handleClose (formName) {
      this.$refs[formName].resetFields()
    },
    handleAddDevice (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {

        } else {
          return false
        }
      })
    },
    // 发布
    handlePublic (id) {

    },
    // 详情
    handleDetail (row) {

    },
    handleDel () {
      this.$confirm('确定删除所选设备?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let ids = escape(this.selection.map(item => item.id).join(','))
        console.log(ids)
        // deleteDevice(ids).then(res => {
        //   if (res.code !== 1) {
        //     this.$message.error(res.message)
        //   } else {
        //     this.$message.success('删除成功!')
        //     this.fetchData()
        //   }
        // })
      }).catch(() => {})
    },
    refresh () {
      let _this = this
      this.loading = true
      setTimeout(() => {
        _this.loading = false
      }, 1000)
    },
    // 获取数据
    fetchData (page) {
      this.refresh()
      // let currentPage = page || this.currentPage
      // let option = {
      //   number: this.search,
      //   pageNum: currentPage,
      //   pageSize: this.pageSize
      // }
      // this.loading = true
      // findDeviceList(option).then(res => {
      //   let data = res.data
      //   this.total = data.total
      //   this.tableData = data.list
      //   this.loading = false
      // })
    }
  },
  mounted () {
    // this.fetchData()
  }
}
</script>

<style lang="scss" scoped>
.line {
  margin: 0 5px;
}
.tbl-preview {
  cursor: pointer;
  color: #2ccae7;
  margin-right: 20px;
}
.preview-img-wrap{
  width: 100%;
  height: 360px;
  img {
    display: block;
    max-width: 100%;
    max-height: 100%;
  }
}

</style>
