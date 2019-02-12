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
      type: Array
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
    setOptions (val) {
      let xAxisData = val.map(item => item.date)
      let yAxisData = val.map(item => item.amount)
      this.chart.setOption({
        noDataLoadingOption: {
          text: '暂无数据',
          effect: 'bubble',
          effectOption: {
            effect: {
              n: 0
            }
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              color: '#e38a97',
              width: 2,
              type: 'dashed'
            }
          }
        },
        grid: {
          left: '5',
          right: '15',
          top: '15',
          bottom: '10',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          name: '时间',
          boundaryGap: false,
          offset: 1,
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#e38a97'
            }
          },
          data: xAxisData
        }],
        yAxis: [{
          type: 'value',
          // show: false,
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#e38a97'
            }
          },
          axisLabel: {
            margin: 10,
            textStyle: {
              fontSize: 14
            }
          },
          splitLine: {
            show: false,
            lineStyle: {
              width: 2,
              color: '#e8e8e8'
            }
          }
        }],
        series: [{
          name: '销售额',
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 5,
          showSymbol: false,
          lineStyle: {
            normal: {
              width: 3,
              color: '#e38a97'
            }
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: 'rgba(224,82, 95, 0.4)'
            }, {
              offset: 1,
              color: 'rgba(224,82, 95, 0)'
            }], false),
            shadowColor: 'rgba(0, 0, 0, 0.1)',
            shadowBlur: 10
          },
          itemStyle: {
            normal: {
              color: '#f098a2',
              borderColor: 'rgba(224,82,95,0.4)',
              borderWidth: 12
            }
          },
          data: yAxisData
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
