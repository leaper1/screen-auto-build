<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
import echarts from 'echarts'
export default {
  data () {
    return {
      chart: null
    }
  },
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '310px'
    },
    chartData: {
      type: Object
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler (val) {
        this.setOptions(val)
      }
    }
  },
  methods: {
    formatFloat (f, digit) {
      let m = Math.pow(10, digit)
      return Math.round(f * m, 10) / m
    },
    setOptions (val) {
      let data = [
        {
          value: val.alipayAmount,
          name: '支付宝'
        }, {
          value: val.wechatAmount,
          name: '微信'
        }
      ]
      this.chart.setOption({
        title: {
          text: '总收入',
          left: 'center',
          top: '42%',
          padding: [24, 0],
          textStyle: {
            color: '#999999',
            fontSize: 14,
            align: 'center'
          }
        },
        legend: {
          selectedMode: false,
          formatter: function (name) {
            var total = 0
            data.forEach(function (value) {
              total = Math.round((total + value.value) * 100) / 100
            })
            if (total >= 1000) {
              total = (total / 1000).toFixed(2) + 'k'
            }
            return total
          },
          data: [data[0].name],
          left: 'center',
          top: '34%',
          icon: 'none',
          align: 'center',
          textStyle: {
            color: '#000',
            fontSize: 24
          }
        },
        series: [{
          name: '支付方式',
          type: 'pie',
          radius: ['75%', '90%'],
          hoverAnimation: false,
          color: ['#ed828e', '#a4a7cb'],
          label: {
            normal: {
              show: false
            }
          },
          data: data
        }]
      })
    },
    initChart () {
      this.chart = echarts.init(this.$el)
      this.setOptions(this.chartData)
    }
  },
  mounted () {
    this.initChart()
    const that = this
    window.addEventListener('resize', function () {
      that.chart.resize()
    })
  }
}
</script>

<style lang="scss" scoped>
.chart {
  width: 100%;
  height: 100%;
}
</style>
