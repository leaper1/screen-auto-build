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
      let xAxisData = ['TOP1', 'TOP2', 'TOP3', 'TOP4', 'TOP5', 'TOP6', 'TOP7', 'TOP8', 'TOP9', 'TOP10']
      let yAxisData = val.map(item => {
        return {
          id: item.id,
          name: item.cardname,
          value: item.usenumber,
          // symbol: item.cardimgurl,
          price: item.price
        }
      })
      // let pathSymbols = {
      //   walk: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAaCAYAAAA5WTUBAAAD4UlEQVRIia3We4hUVRwH8M+uq6WOkWkyphHbYzPHCSKRoHIq2Aoqs6QgifIRV0IDhR4URbaRUQTRA9IhUIxd7WEQWhKCNIgEQVkMN8sykx7c1pWkRiUfW3/cO+31Ouuuj+8/93d+r/O955zf75wmZxClau1CzMEdmIRR2I8dWI+VlWLu52xc0xmafAiexNM46wSuR/AyllaKucMNSRTy5QloP4n5/xi5cOrm4TPb1uCujO1bPIFnMTVj+xQzKsXcIWjJGFtxzSAJHETH8JltrzQgAB9UirkNpWqtrQGJW7ACc6G5ri3ky9PwGRbgAKYl8kP4PJEXoIBe7B67afZkLOqH5L/Jt7cf+5xStdZ+DAnMw5BEfh3jEvknfJny24mteAuP9zPBYPHU/yQK+fIQ3J0Ydou3aUIy/g5tmeBfxm6aPVS8rKeD6aVqbVj9TNyA8xO5kozr2CEutzT2oKivEvbi14xPlPL9JmMbL17pZoyuk7gv5bAlQ2I7pmeSHBCfDTiMSZVirkcDVIq5TnSmdaVqbRR+E/eRs1sK+fJQfVtBfDiXpsY7EGRy9yZEYCiuL1Vr2zI++yrF3L5StXYOzsvYLseIRD7aghsxOvVXt+s7D8Qle0UmQWvyJ3V86Hg8l/zMPLzawF7HwRZ0i0svjez40QbB1SR2XAPbYPEX/mzBpeLGUccqPKCvfLeJS/fKZHwUr/W0d20Zu2n2u3jkNEisqxRzvc34GF8lyj3owPJkfAQv4MVEhjfEPeLWRP/3KRI4iOehOYyCg+J9n4KLwyjYFUbBQlyGiWEUrAujYC0m46owCpaEUfAjKj3tXZGk9TZA/eCN7Mf+cKWY20XqAivkyyUswfwwCvYmuhG4DRuwDE1hFCxOxTSHUdBbqtbmird0aGqS/ViLWTg3pT+KxZVi7s26It22W3GnuHbrmI/3cL/jb9whWFHIly+pFHMrxau5NeUyMolPE/gC16YJcPwtmsUn4nvkI33NqU5gOdaEUbCzkC/P6mnv2hhGwXWlam0KZoi77BhxN/0B6yvF3NeNJhmIxF4Io6C7kC83IrC5kC8/ht/DKDhQyJeH9bR3/RNGwbIB8h6D5oFdjsMYvJMh0Jmcn7clV3ghX15WyJc3DibhQCsxPkk4sa4Io6Ab3Q0ILEdHUjlwgWM7bb8YaCVuSr7HXNmFfHlRikCzuG+kCZwUBiJRFr85V2f0q8Io6IQwCnqx8FQJQFMhXx6Ni3Cv+MV8DxolfEZcph2DzP0SrsbN4t6wPYyCQ40cW8RPt9aU7v0Bkjd61J4I9afhajzYyKEZ359k0lNBr/it2hD/AQVlLbQF0vFfAAAAAElFTkSuQmCC'
      // }
      this.chart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'none'
          },
          backgroundColor: '#ffffff',
          borderWidth: 2,
          borderColor: '#fab8ad',
          padding: [5, 15],
          formatter: function (params) {
            let res =
            '<div style="min-width: 120px; color: #13111f">' +
              '<span style="display: inline-block; width: 45px; color: #db000a">' + params[0].axisValue + '</span>' +
              '<span>' + params[0].name + '</span>' +
            '</div>' +
            '<div style="min-width: 120px; color: #13111f">' +
              '<span style="display: inline-block; width: 45px;">' +
              '</span><span>' + params[0].value + ' 张</span>' +
             '</div>'
            return res
          }
        },
        xAxis: {
          show: false,
          data: xAxisData,
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          boundaryGap: false,
          axisLabel: {
            textStyle: {
              color: '#ffffff',
              fontSize: 12
            }
          }
        },
        yAxis: {
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            show: false
          }
        },
        color: ['#408BFF'],
        grid: {
          top: '20',
          bottom: 0,
          left: '30',
          right: '30'
        },
        series: [{
          type: 'bar',
          barWidth: 35,
          itemStyle: {
            normal: {
              barBorderRadius: 3,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#f03848'
              }, {
                offset: 1,
                color: '#e49daa'
              }], false)
            }
          },
          data: yAxisData
        }
        // {
        //   name: 'glyph',
        //   type: 'pictorialBar',
        //   barGap: '-100%',
        //   symbolPosition: 'end',
        //   symbolSize: [20, 30],
        //   symbolOffset: [0, '-70%'],
        //   data: yAxisData,
        //   z: 10
        // }
        ]
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
