<template>
  <section class="containter-body">
    <div class="edit-group">
      <div class="group-item">
        <div class="lab">宽度： {{data.data.w}}px</div>
        <div class="lab">高度： {{data.data.h}}px</div>
      </div>
      <div class="group-item">
        <div class="lab">背景颜色
          <el-color-picker class="fr db" v-model="data.bg"></el-color-picker>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import common from '../common.js'
export default {
  name: 'edit-containter',
  mixins: [common],
  data () {
    return {

    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.containter-body {
  padding: 10px 15px;
}
.edit-group {
  .group-item {
    margin-bottom: 15px;
    .lab {
      line-height: 32px;
      color: #0B7FF7;
    }
    .group-item-content {
      .inline-row {
        line-height: 32px;
        margin-bottom: 10px;
        span {
          float: left;
        }
        .row-content {
            padding-left: 70px;
        }
      }
      .row {
        line-height: 32px;
        margin-bottom: 10px;
      }
    }
  }
}

</style>
