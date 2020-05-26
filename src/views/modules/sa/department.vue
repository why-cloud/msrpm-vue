<template>
  <div>
    <div id="myChart3" :style="{width: '1000px', height: '400px'}"></div>
    <div id="pieChart3" :style="{width: '1000px', height: '400px'}"></div>
    
  </div>
</template>
<script>
  // 引入基本模板
import echarts from 'echarts'
import ei from '@/api/employee/employee'

export default {
    name: 'DataCount',
    data: () => ({}),
    mounted () {
      this.charts()
      this.piecharts()
    },
    methods: {
      charts () {
        let myChart = echarts.init(document.getElementById('myChart3'))
      // 绘制图表
        ei.getGenderCountOfDepartment().then(response => {
          let res = response.data
          let data = res.items
          let dateData = []
          let manData = []
          let womanData = []
          let seriesData = []
          let obj = {}
          let manObj = {}
          let womanObj = {}
          let outObj = {}
          for (let i = 0; i < data.length; i++) {
            obj = data[i].name
            manObj = data[i].man
            womanObj = data[i].woman
            outObj = data[i].value
            dateData.push(obj)
            manData.push(manObj)
            womanData.push(womanObj)
            seriesData.push(outObj)
          }
          var posList = [
            'left', 'right', 'top', 'bottom',
            'inside',
            'insideTop', 'insideLeft', 'insideRight', 'insideBottom',
            'insideTopLeft', 'insideTopRight', 'insideBottomLeft', 'insideBottomRight'
          ]

          myChart.configParameters = {
            rotate: {
              min: -90,
              max: 90
            },
            align: {
              options: {
                left: 'left',
                center: 'center',
                right: 'right'
              }
            },
            verticalAlign: {
              options: {
                top: 'top',
                middle: 'middle',
                bottom: 'bottom'
              }
            },
            position: {
              options: echarts.util.reduce(posList, function (map, pos) {
                map[pos] = pos
                return map
              }, {})
            },
            distance: {
              min: 0,
              max: 100
            }
          }

          myChart.config = {
            rotate: 90,
            align: 'left',
            verticalAlign: 'middle',
            position: 'insideBottom',
            distance: 15,
            onChange: function () {
              var labelOption = {
                normal: {
                  rotate: myChart.config.rotate,
                  align: myChart.config.align,
                  verticalAlign: myChart.config.verticalAlign,
                  position: myChart.config.position,
                  distance: myChart.config.distance
                }
              }
              myChart.setOption({
                series: [{
                  label: labelOption
                }, {
                  label: labelOption
                }, {
                  label: labelOption
                }, {
                  label: labelOption
                }]
              })
            }
          }
          var labelOption = {
            show: true,
            position: myChart.config.position,
            distance: myChart.config.distance,
            align: myChart.config.align,
            verticalAlign: myChart.config.verticalAlign,
            rotate: myChart.config.rotate,
            formatter: '{c}  {name|{a}}',
            fontSize: 16,
            rich: {
              name: {
                textBorderColor: '#fff'
              }
            }
          }
          myChart.setOption({
            color: ['#003366', '#006699', '#4cabce', '#e5323e'],
            title: {
              text: '部门人数统计',
              subtext: ''
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              }
            },
            legend: {
              data: ['人数', '男', '女']
            },
            toolbox: {
              show: true,
              orient: 'vertical',
              left: 'right',
              top: 'center',
              feature: {
                mark: {show: true},
                dataView: {show: true, readOnly: false},
                magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
                restore: {show: true},
                saveAsImage: {show: true}
              }
            },
            xAxis: [
              {
                type: 'category',
                axisTick: {show: false},
                data: dateData
              }
            ],
            yAxis: [
              {
                type: 'value'
              }
            ],
            series: [{
              name: '人数',
              type: 'bar',
              barGap: 0,
              label: labelOption,
              data: seriesData
            },
            {
              name: '男',
              type: 'bar',
              barGap: 0,
              label: labelOption,
              data: manData
            },
            {
              name: '女',
              type: 'bar',
              barGap: 0,
              label: labelOption,
              data: womanData
            }]
          })
        })
      },
      piecharts () {
        let myChart = echarts.init(document.getElementById('pieChart3'))
        ei.getDeCountOfEmp().then(response => {
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
              text: '各部门人数统计',
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
                name: '部门名称',
                type: 'pie',
                radius: '55%',
                center: ['40%', '50%'],
                data: seriesData,
                emphasis: {
                  itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
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