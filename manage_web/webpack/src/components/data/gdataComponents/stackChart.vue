<template>
  <div class="pieCon">
    <div id="stackc" :style="stackChartSty"></div>
    <!-- <div class="daCon">
      <div class="upDiv">
        <p class="num1">320,11</p>
        <p class="num2">
          <span></span>点位分布
        </p>
      </div>
      <div class="downDiv">
        <p class="num1">320,11</p>
        <p class="num2">
          <span></span>点位分布
        </p>
      </div>
    </div> -->
  </div>
</template>

<script>
import echarts from "echarts/lib/echarts";
export default {
  data() {
    return {};
  },
  mounted() {
    this.myChart = this.$echarts.init(document.getElementById("stackc"));
    this.init();
  },
  props: {
    y: {
      type: String,
      default: "50%"
    },
    stackChartSty:{
        type:String,
        default:"width: 100%;height:20vh;"
      },
  },
  methods: {
    init() {
      var _this = this;
      this.myChart.setOption({
        title: {
          text: "订单统计",
          textStyle:{
                    color:'#295aaa',        //颜色
                },
          // y:"5%"
          x:"10%"
          
        },
        tooltip: {
          trigger: "axis"
        },
        // legend: {
        //      textStyle:{
        //                     fontSize: 12,//字体大小
        //                     color: 'white'//字体颜色
        //                 },
        //   data: ["邮件营销", "联盟广告", "视频广告", "直接访问", "搜索引擎"]
        // },
        grid: {
          x:"20%",
          y:"24%",
          x2:"10%",
          y2:"2%"
          // left: "3%",
          // right: "4%",
          // bottom: "3%",
          // containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
          axisLabel: {
                            show: true,
                            textStyle: {
                                fontSize: 12,//字体大小
                                color: 'white'
                            }
          }
        },
        yAxis: {
          type: "value",
          axisLabel: {
                            show: true,
                            textStyle: {
                                fontSize: 12,//字体大小
                                color: 'white'
                            }
          }
        },
        series: [
          {
            name: "湖南长劲鹿网络科技有限公司",
            type: "line",
            stack: "总量",
            data: [1201, 1322, 1013, 1344, 9052, 2301, 2101]
          },
          {
            name: "湖南蓝翔职业技术有限公司",
            type: "line",
            stack: "总量",
            data: [2201, 1821, 1912, 2343, 2920, 3230, 3110]
          },
          {
            name: "湖南青鸟有限公司",
            type: "line",
            stack: "总量",
            data: [1501, 2312, 2031, 1541, 1902, 3303, 4102]
          },
          {
            name: "长沙星辰有限公司",
            type: "line",
            stack: "总量",
            data: [3203, 3324, 3011, 3134, 3910, 1330, 2320]
          },
          {
            name: "长沙直线有限公司",
            type: "line",
            stack: "总量",
            data: [1820, 9232, 3901, 1934, 3290, 1330, 1320]
          }
        ]
      });
      window.addEventListener("resize", function() {
        _this.myChart.resize();
      });
    }
  }
};
</script>

<style>
.pieCon {
  display: flex;
  padding-right: 10%;
}
</style>