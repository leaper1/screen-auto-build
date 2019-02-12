<template>
  <div :style="{height:height,width:width}">
    <div class="rank-cont" v-if="chartData.length">
      <div class="item" v-for="(item, index) in chartData" :key="index">
        <div class="imgbox">
          <img :src="fileUrl + item.cardimgurl" alt="">
          <div class="caret"></div>
        </div>
        <div class="level" :style="{height: getPercent(item.usenumber)}">
          <div class="img-detail">
            <img :src="fileUrl + item.cardimgurl" alt="">
            <p class="num">{{item.usenumber}}张</p>
            <p class="title wes">{{item.cardname}}</p>
            <div class="caret"></div>
          </div>
        </div>
        <p class="no">TOP{{index + 1}}</p>
      </div>
    </div>
    <div class="no-data" v-else>
      <div class="img-box df-c">
        <img src="../../../assets/no-data.png" alt="">
      </div>
      <div class="list"><div class="item" v-for="i in 10" :key="i"></div></div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {

    }
  },
  props: {
    chartData: {
      type: Array
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '290px'
    }
  },
  computed: {
    ...mapState({
      fileUrl: state => state.util.fileUrl
    })
  },
  methods: {
    getPercent (num) {
      num = parseFloat(num)
      let total = this.chartData[0].usenumber
      if (isNaN(num) || isNaN(total)) {
        return '0%'
      }
      return total <= 0 ? '0%' : (Math.round(num / total * 10000) / 100.00 + '%')
    }
  }
}
</script>

<style lang="scss" scoped>
.no-data {
  width: 100%;
  height: 100%;
  .img-box {
    width: 100%;
    height: 245px;
  }
  .list {
    display: flex;
    display: -webkit-flex;
    padding: 10px 15px;
    justify-content: space-between;
    .item {
      width: 30px;
      height: 10px;
      background-color: #F094A8;
    }
  }
}
.rank-cont {
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
  padding: 0 10px;
  box-sizing: border-box;
  .item {
    max-width: 8%;
    width: 45px;
    min-width: 35px;
    height: 290px;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    justify-content: flex-end;
    .imgbox {
      width: 100%;
      height: 45px;
      padding: 5px;
      box-sizing: border-box;
      background-color: #bbbbbb;
      position: relative;
      text-align: center;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .caret {
      z-index: 1;
      position: absolute;
      bottom: -6px;
      left: 50%;
      margin-left: -6px;
      font-size: 0;
      line-height: 0;
      border-width: 6px;
      border-color: #bbbbbb;
      border-bottom-width: 0;
      border-style: dashed;
      border-top-style: solid;
      border-left-color: transparent;
      border-right-color: transparent;
    }
    .level {
      position: relative;
      cursor: pointer;
      width: 100%;
      height: 200px;
      background: -webkit-linear-gradient(#f03848, #e49daa); /* Safari 5.1 - 6.0 */
      background: -o-linear-gradient(#f03848, #e49daa); /* Opera 11.1 - 12.0 */
      background: -moz-linear-gradient(#f03848, #e49daa); /* Firefox 3.6 - 15 */
      background: linear-gradient(#f03848, #e49daa); /* 标准的语法（必须放在最后） */
      .img-detail {
        position: absolute;
        z-index: 2;
        display: none;
        text-align: center;
        width: 200%;
        height: 95px;
        top: -95px;
        left: -50%;
        padding: 5px 0;
        background-color: #ffffff;
        box-sizing: border-box;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        img {
          width: 50px;
          height: 50px;
        }
        .num {
          padding: 0 3px;
          font-size: 12px;
          font-weight: bold;
        }
        .title {
          padding: 0 10px;
          font-size: 12px;
        }
      }
      &:hover {
        .img-detail {
          display: block;
        }
      }
    }
    .no {
      color: #f03848;
      font-size: 13px;
      line-height: 24px;
      text-align: center;
    }
  }
}
</style>
