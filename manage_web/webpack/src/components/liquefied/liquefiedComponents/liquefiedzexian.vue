<template>
  <div>
    <div id="zx" :style="zexianSty"></div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import echarts from "echarts/lib/echarts";
export default {
  data() {
    return {
      myChart: "",

      yMax: 500,
      dataShadow: [],
      data:["周一","周二","周三","周四","周五","周六","周日"]
      // data:[]
    };
  },
  props: {
    zexianSty: {
      type: String,
      default: "width: 100%;height:20vh;",
    },
  },
  computed: {
    ...mapState(["liqueWeek"]),
  },
  watch: {
    liqueWeek(v) {
      console.log(this.liqueWeek);
      var obj = this.liqueWeek;
      console.log(obj);
      var arr1 = [];
      var arr2 = [];

      for (var k in obj) {
        console.log(k);
        // arr2.push(k)
        arr1.push(obj[k])
      }
    
     this.dataShadow=arr1
     console.log(arr1);
    //  this.data=arr2
      this.init();
    },
  },
  mounted() {},
  methods: {
    init() {
      this.myChart = this.$echarts.init(document.getElementById("zx"));
      // for (var i = 0; i < this.data.length; i++) {
      //   this.dataShadow.push(this.yMax);
      // }
      var _this = this;
      var option = {
        title: {
          text: "本周订单活跃情况",
          x: "10%",
          y: 0,
          textStyle: {
            color: "#fff",
          },
        },
        tooltip: {
          trigger: "axis",
          formatter: function (params) {
            console.log(params)
            return params[0].name + "<br/>" + "订单量:" + params[0].value;
          },
        },
        grid: {
          x: "10%",
          y: "20%",
          x2: "10%",
          y2: "20%",
          borderWidth: 1,
        },
        xAxis: {
          axisLabel: {
            textStyle: {
              color: "#fff",
            },
          },
          type: "category",
          boundaryGap: false,
          data: this.data,
        },
        yAxis: {
          axisLabel: {
            textStyle: {
              color: "#fff",
            },
          },
          type: "value",
        },
        series: [
          {
            data: this.dataShadow,
            // radius: [0, "80%"],//调整表的大小
            center: ["50%", "50%"],
            type: "line",
            textStyle: {
              fontSize: 15,
              color: "#fff",
            },
            areaStyle: {
              normal: {
                color: "green", //改变区域颜色
              },
            },
            itemStyle: {
              normal: {
                color: "#8cd5c2", //改变折线点的颜色
                lineStyle: {
                  color: "green", //改变折线颜色
                },
              },
            },
          },
        ],
      };
      window.addEventListener("resize", function () {
        _this.myChart.resize();
      });
      this.myChart.setOption(option);
    },
  },
};
</script>

<style>
</style>