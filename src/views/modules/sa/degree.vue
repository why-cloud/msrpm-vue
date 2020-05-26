<template>
  <div>
    <div id="myChart2" :style="{width: '1000px', height: '400px'}"></div>
     <div id="pieChart2" :style="{width: '1000px', height: '400px',border:'1px black solid'}"></div>
  </div>
</template>
<script>
  // 引入基本模板
import echarts from 'echarts'
import ei from '@/api/sa/ei'

export default {
    name: 'DataCount',
    data: () => ({}),
    mounted () {
      this.charts()
      this.piecharts()
    },
    methods: {
      charts () {
        let myChart = echarts.init(document.getElementById('myChart2'))
      // 绘制图表
        ei.getDegreeCountOfEmp().then(response => {
          let res = response.data
          let data = res.items
          let dateData = []
          let seriesData = []
          let obj = {}
          let outObj = {}
          for (let i = 0; i < data.length; i++) {
            obj = data[i].name
            outObj = data[i].value
            dateData.push(obj)
            seriesData.push(outObj)
          }
          myChart.setOption({
            title: {
              text: '员工学历统计',
              subtext: ''
            },
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              data: ['人数']
            },
            toolbox: {
              show: true,
              feature: {
                magicType: {
                  type: ['bar', 'line']
                } // 折线图和柱状图转换
              }
            },
            xAxis: {
              type: 'category',
              // boundaryGap: false,
              data: dateData
            },
            yAxis: {},
            series: [{
              name: '学历',
              type: 'bar',
              data: seriesData
            }]
          })
        })
      },
      piecharts () {
        let myChart = echarts.init(document.getElementById('pieChart2'))
      // 绘制图表
        ei.getDegreeCountOfEmp().then(response => {
          let data = response.data.items
          var legendData = []
          var seriesData = data
          var selected = {}
          let obj = {}
          for (let i = 0; i < data.length; i++) {
            obj = data[i].name
            legendData.push(obj)
            selected[name] = i < 6
          }
          let option = {
            title: {
              text: '员工学历统计',
              subtext: '',
              left: 'center'
            },

            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b} : {c}人 ({d}%)'
            },
            legend: {
              type: 'scroll',
              orient: 'vertical',
              right: 10,
              top: 20,
              bottom: 20,
              data: legendData,
              selected: selected
            },
            series: [
              {
                name: '学历',
                type: 'pie',
                radius: '55%',
                center: ['50%', '50%'],
                data: seriesData.sort(function (a, b) { return a.value - b.value }),
                roseType: 'radius',
                label: {
                  color: 'rgba(255, 255, 255, 0.3)'
                },
                labelLine: {
                  lineStyle: {
                    color: 'rgba(255, 255, 255, 0.3)'
                  },
                  smooth: 0.2,
                  length: 10,
                  length2: 20
                },
                itemStyle: {
                  color: '#c23531',
                  shadowBlur: 200,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                },

                animationType: 'scale',
                animationEasing: 'elasticOut',
                animationDelay: function (idx) {
                  return Math.random() * 200
                }
              }
            ]
          }
          myChart.setOption(option)
        })
      }
    }
  }
</script>