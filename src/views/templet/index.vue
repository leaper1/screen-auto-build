<template>
  <section style="height: 100%;">
    <div class="container flex-dc" style="height: 100%;" v-if="children">
      <div class="table-header">
        <div class="table-header-left">
          <span>模板总数：{{total}}</span>
        </div>
        <div class="table-header-right">
          <el-select v-model="type" style="width: 140px;" clearable class="search-select" placeholder="请选择类型" @change="fetchData">
            <el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
          <el-select v-model="rp" style="width: 140px;" clearable class="search-select" placeholder="请选择分辨率" @change="fetchData">
            <el-option v-for="item in rpOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
          <el-select v-model="time" style="width: 140px;" clearable class="search-select" placeholder="请选择时间" @change="fetchData">
            <el-option v-for="item in timeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
          <el-input style="width: 160px;" placeholder="请输入模板名称">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
          <el-button type="primary" @click="handleAddTemp" plain round icon="el-icon-circle-plus">新建模板</el-button>
        </div>
      </div>

      <div class="table-content flex-1">
        <vue-scroll>
        <el-row :gutter="24">
          <el-col class="temp-item-box" :span="6" v-for="item in 18" :key="item">
            <el-card class="box-card" shadow="hover" :body-style="{ padding: '15px' }">
              <div class="card-hd">
                <span>2016-09-12 16:45</span>
                <span class="fr">林贝贝</span>
              </div>
              <div class="card-md">
                <div class="card-title">四分屏 视频+轮播</div>
                <div class="card-img-wrap df-c">
                  <img src="../../assets/a.jpg" alt="">
                  <div class="card-img-hover">
                    <div>编辑模板</div>
                    <div>制作节目</div>
                  </div>
                </div>
              </div>
              <div class="card-bd">
                <span>分辨率 1920*480</span>
              </div>
            </el-card>
          </el-col>
        </el-row>
        </vue-scroll>
      </div>

      <div class="table-footer">
        <div class="pagination" v-show="!loading">
          <el-pagination background layout="prev, pager, next, total" :total="total" :page-size="pageSize" @current-change="handleCurrentChange"></el-pagination>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </section>
</template>

<script>
export default {
  name: 'Templet',
  data () {
    return {
      children: null,
      loading: false,
      total: 36,
      pageSize: 10,
      tableData: [
        {
          id: 1,
          name: '模板一',
          imgUrl: require('../../assets/head.png'),
          size: '8.8',
          ratio: '1920 * 480',
          createTime: '2018/8/8'
        },
        {
          id: 2,
          name: '模板一',
          imgUrl: require('../../assets/head.png'),
          size: '8.8',
          ratio: '1920 * 480',
          createTime: '2018/8/8'
        },
        {
          id: 3,
          name: '模板一',
          imgUrl: require('../../assets/head.png'),
          size: '8.8',
          ratio: '1920 * 480',
          createTime: '2018/8/8'
        },
        {
          id: 4,
          name: '模板一',
          imgUrl: require('../../assets/head.png'),
          size: '8.8',
          ratio: '1920 * 480',
          createTime: '2018/8/8'
        },
        {
          id: 5,
          name: '模板一',
          imgUrl: require('../../assets/head.png'),
          size: '8.8',
          ratio: '1920 * 480',
          createTime: '2018/8/8'
        }
      ],
      type: '',
      typeOptions: [],
      rp: '',
      rpOptions: [],
      time: '',
      timeOptions: []
    }
  },
  watch: {
    '$route' (to, from) {
      let children = this.$route.meta.children
      if (children) {
        this.children = children
      } else {
        this.children = null
      }
    }
  },
  methods: {
    // 制作节目
    handleMakeProgram (id) {

    },
    // 编辑模板
    handleEditTemp (id) {

    },
    // 新建模板
    handleAddTemp () {
      this.$router.push({ name: 'AddTemplet' })
    },
    // 分页
    handleCurrentChange (val) {

    },
    fetchData () {

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

<style lang="scss" scoped>
.temp-item-box {
  margin: 15px 0;
}
.box-card {
  color: #a6a6a6;
  .card-hd, .card-bd {
    font-size: 12px;
    padding: 0 5px;
  }
  .card-hd {
    border-bottom: 2px solid #e5e5e5;
    padding-bottom: 8px;
  }
  .card-bd {
    padding-top: 8px;
    border-top: 2px solid #e5e5e5;
  }
  .card-md {
    .card-title {
      padding: 5px;
      color: #505050;
      font-weight: bold;
      line-height: 1.5;
    }
    .card-img-wrap {
      position: relative;
      padding: 10px 0 24px;
      height: 80px;
      img {
        width: 100%;
        height: 100%;
        max-width: 100%;
        max-height: 100%;
      }
      .card-img-hover {
        position: absolute;
        opacity: 0;
        bottom: 0;
        display: -webkit-flex;
        display: flex;
        width: 100%;
        line-height: 24px;
        transition: .3s;
        &>div {
          flex: 1;
          text-align: center;
          font-size: 12px;
          color: #ffffff;
          cursor: pointer;
          background-color: #c0c4cc;
        }
      }
      &:hover {
        .card-img-hover {
          opacity: 1;
        }
      }
    }
  }
}
</style>
