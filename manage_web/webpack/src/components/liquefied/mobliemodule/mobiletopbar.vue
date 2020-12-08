
<template>
  <div>
    <div id="barer" :style="barChartSty"></div>
  </div>
</template>

<script>
import echarts from "echarts/lib/echarts";
export default {
  data() {
    return {
      dataAxis: [],
      myChart: "",
      // data: [22, 18, 19, 23, 29, 33, 31, 12, 44, 32,11,22],
      data:[],
      yMax: 100,
      dataShadow: [],
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
  created(){
   this.chongz()
  },

  mounted() {
     this.init();
    
    this.myChart = this.$echarts.init(document.getElementById("barer"));
   
    
  },
  methods: {
    async chongz(){
        //  /mobile-stats/new/citySort
     

    },
    async init() {
        
      // for (var i = 0; i < this.data.length; i++) {
      //   this.dataShadow.push(this.yMax);
      // }
       const res = await this.$http.get(`/mobile-stats/new/citySort`);
        // console.log(res);
        var arr = res.data.data
        var arr1=[]
        var arr2=[]
        for(var i=0;i<arr.length;i++){
          arr1.push(arr[i].count)
          arr2.push(arr[i].name)
        }
       
        this.data=arr1
        this.dataAxis=arr2
        console.log(this.dataAxis);
       console.log(this.data);

      var option = {
        title: {
          text: "",
          subtext: "充装次数",
        },
          tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        //  grid:{
        //   x:"20%",
        //   y:"24%",
        //   x2:"20%",
        //   y2:"13%",
        //   borderWidth:1
        //   },
        xAxis: {
          data: this.dataAxis,
          axisLabel: {
            textStyle: {
              color: "#53a8fa"
            }
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          z: 10,
        },
        yAxis: {
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            //  formatter:'{value}(次)',
            textStyle: {
              color: "#53a8fa",
            },
          },
        },
        dataZoom: [
          {
            show: true,
            height: 5,
            xAxisIndex: [0],
            bottom: 20,
            showDetail: false,
            showDataShadow: false,
            borderColor: "transparent",
            textStyle: {
              fontSize: 0,
            },
            endValue: 10, //从0开始的相当于5个
            //   backgroundColor: "rgba(0,0,0,0)",
            borderWidth: 0,

            handleSize: "0%",
            handleStyle: {
              color: "#d3dee5",
            },
          },
        ],
        series: [
          {
            // For shadow
           name:"次数",
            type: "bar",
            itemStyle: {
              color: "rgba(0,0,0,0.05)",
            },
            barGap: "-100%",
            // barCategoryGap: "40%",
            data: this.dataShadow,
            animation: false,
          },
          {
            type: "bar",
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#83bff6" },
                { offset: 0.5, color: "#188df0" },
                { offset: 1, color: "#188df0" },
              ]),
            },
            emphasis: {
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#2378f7" },
                  { offset: 0.7, color: "#2378f7" },
                  { offset: 1, color: "#83bff6" },
                ]),
              },
            },
            data: this.data,
          },
        ],
      };

      this.myChart.setOption(option);
    },
  },
};
</script>

<style>
</style>