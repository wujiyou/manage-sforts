<template>
  <div>
    <div id="barzx" :style="barChartSty"></div>
  </div>
</template>

<script>
import echarts from "echarts/lib/echarts";
export default {
  data() {
    return {
      myChart: "",

      yMax:400,
      data:[],
      dataseries:[],
      dataseries1:[],
      data2:[],
      dataseries2:[],
      allXData:[],
      arr6:[]

      // dataShadow: []
    };
  },
  props:{
    isnorMal:{
      type:Boolean,
      default:true
    }
  },
 props: {
    y: {
      type: String,
      default: "50%",
    },
    barChartSty: {
      type: String,
      default: "width: 100%;height:26vh;",
    },
    doFontSize: {
      type: String,
    },
  },
  mounted() {
    this.myChart = this.$echarts.init(document.getElementById("barzx"));
    this.init();
  },
  methods: {
    async init() {
      // /mobile-stats/new/monthExtendedTotal
       const res = await this.$http.get(`/mobile-stats/new/monthExtendedTotal`);//即将超期接口
        console.log(res);
        var arr = res.data.data
        var arr1=[]
        var arr2=[]
        for(var i in arr){
          arr1.push(arr[i])
          // arr2.push(arr[i].name)
        }
        console.log(arr1)
        // console.log(arr2)
       
        this.data=arr1
        console.log(this.data)
        this.dataseries=arr2
        
        const res1 = await this.$http.get(`/mobile-stats/new/monthTheBeyondTotal`);//超期未检接口
        console.log(res1);
        var arr3 = res1.data.data
        var arr4=[]
        var arr5=[]
        for(var a in arr3){
          arr4.push(arr3[a])
          arr5.push(a)
          // arr5.push(arr3[a].name)
        }
        console.log(arr5);
        
        console.log(arr4)
        // console.log(arr5)
       
        this.data2=arr4
        this.arr6=arr5
        console.log(this.data2)
        this.dataseries2=arr5
        this.allXData= this.dataseries2.concat(this.dataseries)
        console.log(this.allXData)

        // console.log(this.dataAxis);
      //  console.log(this.data);

      // for (var i = 0; i < this.data.length; i++) {
      //   this.dataShadow.push(this.yMax);
      // }

    var option = {
    title: {
        text: '档案预警（个）',
        textStyle: {
            color: "#fff",
          }
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
         data:['即将超期','超期未检'],
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: this.arr6,
        axisLabel: {
            textStyle: {
              color: "#fff"
            }
          }
    },
    yAxis: {
        type: 'value',
        axisLabel: {
            textStyle: {
              color: "#fff"
            }
          }
    },
    series: [
        {
            name: '超期未检',
            type: 'line',
            // stack: '总量',
            data: this.data
        },
        {
            name: '即将超期',
            type: 'line',
            // stack: '总量',
            data: this.data2,
        },
      
    ]
};





      // var option = {
      //   title: {
      //     show:this.isnorMal,
      //     text: "",
      //     subtext: "档案预警（个）",
      //   },
      //   tooltip: {
      //     trigger: "axis",
      //     axisPointer: {
      //       type: "shadow"
      //     }
      //   },
      //   legend:{
      //     data:['即将超期','超期未检']
      //   },
      //   xAxis: {
      //     type: "category",
      //     boundaryGap: false,
      //      axisLabel: {
      //         // margin: 10,
      //         textStyle: {
      //           fontSize: 12,
      //           color: "#53a8fa",
      //         },
      //       },
      //     data: this.allXData,
      //   },
      //   yAxis: {
      //     type: "value",
      //       axisLabel: {
      //         formatter:'{value}/个',
      //         // margin: 10,
      //         textStyle: {
      //           fontSize: 12,
      //           color: "#53a8fa",
      //         },
      //       },
      //   },
      //   series: [
           
      //     {
      //       name: "即将超期",
      //       data: this.data,
      //       type: "line",
      //       areaStyle: {
      //         normal: {
      //           // color: "green", //改变区域颜色
      //         },
      //       },
      //       itemStyle: {
      //         normal: {
      //           // color: "#8cd5c2", //改变折线点的颜色
      //           lineStyle: {
      //             // color: "green", //改变折线颜色
      //           },
      //         },
      //       },
      //     },
      //      {
      //       name: "超期未检",
      //       data: this.data2,
      //       type: "line",
      //       areaStyle: {
      //         normal: {
      //           // color: "green", //改变区域颜色
      //         },
      //       },
      //       itemStyle: {
      //         normal: {
      //           color: "#8cd5c2", //改变折线点的颜色
      //           lineStyle: {
      //             // color: "green", //改变折线颜色
      //           },
      //         },
      //       },
      //     }
      //   ],
      // };

      this.myChart.setOption(option);
    },
  },
};
</script>

<style>
</style>