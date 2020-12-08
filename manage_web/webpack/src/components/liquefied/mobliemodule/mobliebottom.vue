<template>
  <div>
    <div id="earchert" :style="{width: '100%', height: '130%'}"></div>
  </div>
</template>
<script>
import echarts from "echarts/lib/echarts";
export default {
  data() {
    return {
      datas:[],
      // {value: this.values[0], name: this.names[0]}
    };
  },
  mounted() {
    this.myChart = this.$echarts.init(document.getElementById("earchert"));
    this.init();
  },
  methods: {
    async init() {
      var _this = this;
      // /mobile-stats/new/fillingNumberState
      const res = await this.$http.get(`/mobile-stats/new/fillingNumberState`);
      // console.log(res);
      var datas = res.data.data;
      console.log(datas);
      var arr = [];
      for (var i = 0; i < datas.length; i++){
        // datas[i].use_unit
        arr.push({name:datas[i].name,value:Number(datas[i].count)})
      }
      // arr =datas.
      // console.log(arr);
      this.datas=arr
      // console.log(this.datas);
      // var arr1 = [];
      // for (var i = 0; i < datas.length; i++) {
      //   arr.push(datas[i].nameplate);
      //   arr1.push(datas[i].use_unit);
      // }
      // this.names = arr;
      // this.values = arr1;
      // console.log(this.names[0]);

      this.myChart.setOption({
        // title: {
        //   // text: "点位分布统计",
        //   // x: "10%",
        //   // y: 24
        // },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
        },
        series: [
          {
            name: "单位充装次数统计",
            zoom: 1,
            type: "pie",
            radius: [0, "80%"], //调整表的大小
            center: ["50%", "60%"],
            data: this.datas,
          },
        ],

        roseType: "angle",
      });
      window.addEventListener("resize", function () {
        _this.myChart.resize();
      });
    },
  },
};
</script>