<template>
  <div>
    <div id="bars" style="width: 100%;height:20vh;"></div>
  </div>
</template>

<script>
import echarts from "echarts/lib/echarts";
export default {
  data() {
    return {
      myChart: "",
      dataYxis:[],
      data:[]
    };
  },
    props:{
    isnorMal:{
      type:Boolean,
      default:true
    }
  },

  mounted() {
    this.myChart = this.$echarts.init(document.getElementById("bars"));
    this.init();
  },
  methods: {
    async init() {
      // /mobile-stats/new/findBuildingUser
      const res = await this.$http.get(`/mobile-stats/new/findBuildingUser`);
        console.log(res);
        var arr = res.data.data
        var arr1=[]
        var arr2=[]
        for(var i=0;i<arr.length;i++){
          arr1.push(arr[i].count)
          arr2.push(arr[i].name)
        }
       
        this.data=arr1
        this.dataYxis=arr2
        // console.log(this.dataAxis);
      //  console.log(this.data);
      // for (var i = 0; i < this.data.length; i++) {
      //   this.dataShadow.push(this.yMax);
      // }
      var option = {
        title: {
           show:this.isnorMal,
            text: '',
            subtext: '充装扫描记录'
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        // legend: {
        //     data: ['2011年', '2012年']
        // },
        grid: {
          left: "1%",
          right: "6%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "value",
            axisLabel: {
              // margin: 10,
              textStyle: {
                fontSize: 12,
                color: "#53a8fa",
              },
            },
          // boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: "category",
          axisLabel: {
              // margin: 10,
              textStyle: {
                fontSize: 12,
                color: "#53a8fa",
              },
            },
          data: this.dataYxis
        },
        series: [
          {
            name: "记录",
            type: "bar",
            data: this.data
          }
        ]
      };

      this.myChart.setOption(option);
    }
  }
};
</script>

<style>
</style>