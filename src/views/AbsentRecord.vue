<template>
  <div className="home">
    <!-- 定义图表外层容器 -->
    <div id="myHomeChart" ref="homeEcharts"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  mounted() {
    // 调用当前图表
    this.dataChart()
  },
  methods: {
    // // 绘制图表
    // dataChart() {
    //   //初始化图表，this.$refs.homeEcharts获取到图表容器
    //   var myChart = this.$echarts.init(this.$refs.homeEcharts)
    //   // 初始化配置（官网实例详情左侧代码，直接复制过来按项目需求修改即可）
    //   var option = {
    //     tooltip: {
    //       trigger: 'item',
    //       formatter: '{a} <br/>{b}: {c} ({d}%)'
    //     },
    //     legend: {
    //       orient: 'vertical',
    //       left: 10,
    //       data: [
    //         '直达',
    //         '营销广告',
    //         '搜索引擎',
    //         '邮件营销',
    //         '联盟广告',
    //         '视频广告',
    //         '百度',
    //         '谷歌',
    //         '必应',
    //         '其他'
    //       ]
    //     },
    //     series: [
    //       {
    //         name: '访问来源',
    //         type: 'pie',
    //         selectedMode: 'single',
    //         radius: [0, '30%'],
    //
    //         label: {
    //           position: 'inner'
    //         },
    //         labelLine: {
    //           show: false
    //         },
    //         data: [
    //           {value: 335, name: '未提交', selected: true},
    //           {value: 679, name: '已提交'}
    //         ]
    //       },
    //       {
    //         name: '当前状态',
    //         type: 'pie',
    //         radius: ['40%', '55%'],
    //         label: {
    //           formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
    //           backgroundColor: '#eee',
    //           borderColor: '#aaa',
    //           borderWidth: 1,
    //           borderRadius: 4,
    //           // shadowBlur:3,
    //           // shadowOffsetX: 2,
    //           // shadowOffsetY: 2,
    //           // shadowColor: '#999',
    //           // padding: [0, 7],
    //           rich: {
    //             a: {
    //               color: '#999',
    //               lineHeight: 22,
    //               align: 'center'
    //             },
    //             // abg: {
    //             //     backgroundColor: '#333',
    //             //     width: '100%',
    //             //     align: 'right',
    //             //     height: 22,
    //             //     borderRadius: [4, 4, 0, 0]
    //             // },
    //             hr: {
    //               borderColor: '#aaa',
    //               width: '100%',
    //               borderWidth: 0.5,
    //               height: 0
    //             },
    //             b: {
    //               fontSize: 16,
    //               lineHeight: 33
    //             },
    //             per: {
    //               color: '#eee',
    //               backgroundColor: '#334455',
    //               padding: [2, 4],
    //               borderRadius: 2
    //             }
    //           }
    //         },
    //         data: [
    //           {value: 335, name: '未提交'},
    //           {value: 310, name: '未批改'},
    //           {value: 234, name: '待修改'},
    //           {value: 135, name: '已通过'},
    //
    //         ]
    //       }
    //     ]
    //   }
    //   // 把参数配置放到容器里
    //   myChart.setOption(option)
    // },
    // 销毁实例(看项目需要进行销毁实例)
    destroyChart() {
      this.$echarts.init(this.$refs.homeEcharts).dispose();
    },
    dataChart() {
      const _this = this
      // axios.get('http://localhost:8181/student/availableList').then(function (resp) {
      //     _this.dormitoryList = resp.data.data
      // })
      var myChart = _this.$echarts.init(this.$refs.homeEcharts)
      // 初始化配置（官网实例详情左侧代码，直接复制过来按项目需求修改即可）
      var option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 10,
          data: [

          ]
        },
        series: [
          {
            name: '学生状态',
            type: 'pie',
            selectedMode: 'single',
            radius: [0, '30%'],

            label: {
              position: 'inner'
            },
            labelLine: {
              show: false
            },
            data: [
              {value: 335, name: '未提交', selected: true},
              {value: 679, name: '已提交'}
            ]
          },
          {
            name: '论文状态',
            type: 'pie',
            radius: ['40%', '55%'],
            label: {
              formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
              backgroundColor: '#eee',
              borderColor: '#aaa',
              borderWidth: 1,
              borderRadius: 4,
              // shadowBlur:3,
              // shadowOffsetX: 2,
              // shadowOffsetY: 2,
              // shadowColor: '#999',
              // padding: [0, 7],
              rich: {
                a: {
                  color: '#999',
                  lineHeight: 22,
                  align: 'center'
                },
                // abg: {
                //     backgroundColor: '#333',
                //     width: '100%',
                //     align: 'right',
                //     height: 22,
                //     borderRadius: [4, 4, 0, 0]
                // },
                hr: {
                  borderColor: '#aaa',
                  width: '100%',
                  borderWidth: 0.5,
                  height: 0
                },
                b: {
                  fontSize: 16,
                  lineHeight: 33
                },
                per: {
                  color: '#eee',
                  backgroundColor: '#334455',
                  padding: [2, 4],
                  borderRadius: 2
                }
              }
            },
            data: [
              {value: 335, name: '未提交'},
              {value: 310, name: '未批改'},
              {value: 234, name: '待修改'},
              {value: 135, name: '已通过'},

            ]
          }
        ]
      }
      axios.get('http://localhost:8181/thesis/student').then(function (resp) {
        //初始化图表，this.$refs.homeEcharts获取到图表容器

        option.series[0].data = resp.data.data

        // 把参数配置放到容器里
        myChart.setOption(option)


      })
      axios.get('http://localhost:8181/thesis/thesis').then(function (resp) {
        //初始化图表，this.$refs.homeEcharts获取到图表容器

        option.series[1].data = resp.data.data

        // 把参数配置放到容器里
        myChart.setOption(option)


      })
      // axios.get('http://localhost:8181/thesis/thesis').then(function (resp) {
      //       //初始化图表，this.$refs.homeEcharts获取到图表容器
      //
      //       option.series[1].data = resp.data.data
      //       // 把参数配置放到容器里
      //
      //
      //
      //     }
      //
      // )

    }
  }
}
</script>
<style>
/* 给图表容器定义宽高 */
#myHomeChart {
  width: 800px;
  height: 550px;
}
</style>



