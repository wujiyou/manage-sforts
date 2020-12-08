<template>
  <div>
    <div id="barzxx" :style="barChartSty"></div>
  </div>
</template>

<script>
import echarts from "echarts/lib/echarts";
export default {
  data() {
    return {
      myChart: "",

      yMax: 500,
      // dataShadow: []
      data: [],
      // // [
      //   "长沙",
      //   "广州",
      //   "北京",
      //   "深圳",
      //   "合肥",
      //   "杭州",
      //   "厦门",
      //   "济南",
      //   "成都",
      //   "拉萨",
      // ]
      dataseries:[],
      // [22, 18, 19, 23, 29, 33, 31, 12, 44, 32]
      // data2:[26, 45, 56, 67, 62, 33, 44, 12, 22, 32]
    };
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
    this.myChart = this.$echarts.init(document.getElementById("barzxx"));
    this.init();
  },
  methods: {
    async init() {
      // /mobile-stats/new/fillingNumber
        const res = await this.$http.get(`/mobile-stats/new/fillingNumber`);
        console.log(res);
        var arr = res.data.data
        var arr1=[]
        var arr2=[]
        for(var i=0;i<arr.length;i++){
          arr1.push(arr[i].count)
          arr2.push(arr[i].name)
        }
       
        this.dataseries=arr1
        this.data=arr2
      //   console.log(this.dataAxis);
      //  console.log(this.data);
      // for (var i = 0; i < this.data.length; i++) {
      //   this.dataShadow.push(this.yMax);
      // }
      var option = {
        title: {
          show: true,
          text: "",
          subtext: "站点分布",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          axisLabel: {
            // margin: 10,
            textStyle: {
              fontSize: 12,
              color: "#53a8fa",
            },
          },
          data: this.data,
        },
        yAxis: {
          type: "value",
          axisLabel: {
            // margin: 10,
            textStyle: {
              fontSize: 12,
              color: "#53a8fa",
            },
          },
        },
        series: [
          {
            name: "站点分布",
            data: this.dataseries,
            type: "line",
            areaStyle: {
              normal: {
                color: "orange", //改变区域颜色
              },
            },
            itemStyle: {
              normal: {
                color: "#8cd5c2", //改变折线点的颜色
                lineStyle: {
                  color: "orange", //改变折线颜色
                },
              },
            },
          },
          // {
          //   name:"站点分布2",
          //   data:this.data2,
          //   type:"line",
          //   //  areaStyle: {
          //   //   normal: {
          //   //     color: "blue", //改变区域颜色
          //   //   },
          //   // },
          // }
        ],
      };

      this.myChart.setOption(option);
    },
  },
};
</script>

<style>
</style>