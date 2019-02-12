<template>
  <section>
    <el-row :gutter="20">
      <el-col :span="24"><div class="grid-content bg-purple-dark"></div></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :md="24" :lg="15"><div class="grid-content bg-purple"></div></el-col>
      <el-col :md="24" :lg="9"><div class="grid-content bg-purple-light"></div></el-col>
    </el-row>
  </section>
</template>

<script>
// import LineChart from './chart/LineChart'
// import BarChart from './chart/BarChart'
// import PieChart from './chart/PieChart'
// import CusBar from './chart/CusBar'
// import TempRank from './chart/TempRank'
export default {
  name: 'Home',
  data () {
    return {
    }
  },
  components: {
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.el-col {
  border-radius: 4px;
  margin-bottom: 20px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  height: 300px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
