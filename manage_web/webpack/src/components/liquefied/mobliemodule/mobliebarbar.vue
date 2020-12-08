<template>
  <div>
    <div id="barbar" style="width: 100%;height:20vh;"></div>
  </div>
</template>

<script>
import echarts from "echarts/lib/echarts";
export default {
  data() {
    return {
      myChart: "",
      dataseries: [],
      data: [],
    };
  },
  props: {
    isnorMal: {
      type: Boolean,
      default: true,
    },
  },
  mounted() {
    this.myChart = this.$echarts.init(document.getElementById("barbar"));
    // var _that=this
    this.init();
  },
  methods: {
    async init() {
      // /mobile-stats/new/archivesNumber
      const res = await this.$http.get(`/mobile-stats/new/archivesNumber`);
      // console.log(res);
      var arr = res.data.data;
      var arr1 = [];
      var arr2 = [];
      for (var i = 0; i < arr.length; i++) {
        arr1.push(arr[i].count);
        arr2.push(arr[i].use_unit);
      }

      this.dataseries = arr1;
      this.data = arr2;
      // console.log(this.dataAxis);
      //  console.log(this.data);
      // for (var i = 0; i < this.data.length; i++) {
      //   this.dataShadow.push(this.yMax);
      // }
      var option = {
        //color: ['#3398DB'],
        title: {
          show: this.isnorMal,
          text: "",
          subtext: "档案总数",
        },
        tooltip: {
          trigger: "axis",
          backgroundColor: "rgba(255,255,255,0.8)",
          extraCssText: "box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);",
          textStyle: {
            color: "#6a717b",
          },
        },
        grid: {
          left: "10%",
          right: "10%",
          bottom: "2%",
          containLabel: true,
        },

        yAxis: [
          {
            type: "category",
            data: this.data,
            inverse: true,
            axisTick: {
              show: false,
            },
            axisLabel: {
              // margin: 10,
              textStyle: {
                fontSize: 12,
                color: "#53a8fa",
              },
              formatter: function (value) {
                if (value.length > 4) {
                  return value.substring(0, 4) + "...";
                } else {
                  return value;
                }
              },
            },
            axisLine: {
              lineStyle: {
                color: "#2548ac",
              },
            },
          },
        ],
        xAxis: [
          {
            type: "value",
            axisLabel: {
              margin: 10,
              textStyle: {
                fontSize: 12,
                color: "#53a8fa",
              },
            },
            axisLine: {
              lineStyle: {
                color: "#192469",
              },
            },
            splitLine: {
              lineStyle: {
                color: "#17367c",
              },
            },
          },
        ],
        // backgroundColor: "#192469",
        series: [
          {
            name: "充装数",
            type: "bar",
            barWidth: 10,
            data: this.dataseries,
            label: {
              normal: {
                show: true,
                position: "insideRight",
                textStyle: {
                  color: "white", //color of value
                },
              },
            },

            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  1,
                  0,
                  [
                    {
                      offset: 0,
                      color: "#0590eb", // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#08e3f1", // 100% 处的颜色
                    },
                  ],
                  false
                ),
                barBorderRadius: [0, 15, 15, 0],
                shadowColor: "rgba(0,0,0,0.1)",
                shadowBlur: 3,
                shadowOffsetY: 3,
              },
            },
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