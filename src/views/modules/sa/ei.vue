<template>
  <div>
    <div id="myChart1" :style="{width: '1000px', height: '400px'}"></div>
     <div id="pieChart" :style="{width: '1000px', height: '400px'}"></div>
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
        let myChart = echarts.init(document.getElementById('myChart1'))
      // 绘制图表
        ei.getGenderCountOfEmp().then(response => {
          let res = response.data
          let data = res.items
          console.log(data)
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
              text: '员工中男女人数统计',
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
            yAxis: {
              type: 'value'
            },
            series: [{
              name: '人数',
              data: seriesData,
              type: 'bar',
              showBackground: true,
              backgroundStyle: {
                color: 'rgba(220, 220, 220, 0.8)'
              }
            }]
          })
        })
      },
      piecharts () {
        let myChart = echarts.init(document.getElementById('pieChart'))
      // 绘制图表
        ei.getGenderCountOfEmp().then(response => {
          let res = response.data
          let data = res.items
          let dateData = []
          let seriesData = []
          let obj = {}
          let outObj = {}
          for (let i = 0; i < data.length; i++) {
            obj = data[i]
            outObj = data[i].num
            dateData.push(obj)
            seriesData.push(outObj)
          }
          myChart.setOption({
            title: {
              text: '员工中男女人数统计',
              subtext: ''
            },
            tooltip: {
              trigger: 'axis'
            },
            label: {
              normal: {
                position: 'outer',  // 设置标签位置，默认在饼状图外 可选值：'outer' ¦ 'inner（饼状图上）'
                  // formatter: '{a} {b} : {c}个 ({d}%)'   设置标签显示内容 ，默认显示{b}
                  // {a}指series.name  {b}指series.data的name
                  // {c}指series.data的value  {d}%指这一部分占总数的百分比
                formatter: '{b} : {c}人 ({d}%)'
              }
            },
            series: [
              {
                name: '人数',
                type: 'pie',
                radius: '150px',
                data: data
              }
            ]
          })
        })
      }
    }
  }
</script>