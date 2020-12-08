<template>
  <div>
    <div id="earch" :style="{width: '100%', height: '140%'}"></div>
  </div>
</template>
<script>
import echarts from "echarts/lib/echarts";
export default {
  data() {
    return {
      data: [
       
      ],
    };
  },
  mounted() {
    this.myChart = this.$echarts.init(document.getElementById("earch"));
    this.init();
  },
  methods: {
    async init() {
      // /mobile-stats/new/monthExtendedTotal
       const res = await this.$http.get(`/mobile-stats/new/qualifiedTotal`);
      console.log(res);
      var datas = res.data.data;
      // console.log(datas);
      var arr = [];
      console.log(datas)
      for(var i in datas){
        console.log(i)
        console.log(datas[i])
        arr.push({name:i,value:datas[i]})

      }
      // for (var i = 0; i < datas.length; i++){
      //   // datas[i].use_unit
      //   arr.push({name:datas[i],value:Number(datas[i])})
      // }
      console.log(arr)
      this.data=arr
      // console.log(this.data);
      var _this = this;
      this.myChart.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
        },
         title: {
          show: true,
          text: "",
          subtext: "档案状态",
        },
        // legend: {
        //     orient: 'vertical',
        //     left: 10,
        //     data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
        // },
        series: [
          {
            name: "档案状态",
            type: "pie",
            radius: ["60%", "100%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "30",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data:this.data,
          },
        ],
      });
      window.addEventListener("resize", function () {
        _this.myChart.resize();
      });
    },
  },
};
</script>