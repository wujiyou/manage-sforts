<template>
  <div class="pieCon">
    <div id="pieg" :style="barChartSty"></div>
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
    </div>-->
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import echarts from "echarts/lib/echarts";
export default {
  data() {
    return {
      data:[],

    };
  },
  mounted() {
   
    // this.init();
  },
  props: {
    y: {
      type: String,
      default: "50%",
    },
    barChartSty: {
      type: String,
      default: "width: 100%;height:30vh;",
    },
  },
  computed: {
    ...mapState(["totalfindBottle"]),
  },
  watch: {
    totalfindBottle(v) {
      console.log(this.totalfindBottle);
      this.data=this.totalfindBottle
      // this.tabeData = this.totalfindBottle;

       this. init()
    },
  },

  methods: {
    
    init() {
       this.myChart = this.$echarts.init(document.getElementById("pieg"));
      var _this = this;
      this.myChart.setOption({
        title: {
          text: "气瓶数量统计",
          x: "5%",
          y: 8,
          left: "center",
          textStyle: {
            color: "#fff",
          },
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        // legend: {
        //     orient: 'vertical',
        //     left: 'left',
        //     data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
        // },
        series: [
          {
            name: "气瓶数量统计",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data:this.data,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
        // roseType: "angle"
      });
      window.addEventListener("resize", function () {
        _this.myChart.resize();
      });
    },
  },
};
</script>

<style>
.pieCon {
  display: flex;
  /* padding-right: 10%; */
}
.daCon {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.pieCon div .upDiv .num1 {
  font-size: 23px;
  flex: 1;
}
.pieCon div .upDiv .num2 {
  flex: 1;
  font-size: 12px;
  color: #61a7fe;
}
.pieCon div .upDiv .num2 span {
  display: inline-block;
  width: 4px;
  border: 1px solid red;
  background-color: red;
  height: 12px;
  margin-right: 4px;
}
.pieCon div .downDiv {
  margin-top: 20%;
}
.pieCon div .downDiv .num1 {
  font-size: 23px;
  /* flex: 1; */
}
.pieCon div .downDiv .num2 {
  font-size: 12px;
  color: #61a7fe;
}
.pieCon div .downDiv .num2 {
  font-size: 12px;
  color: #61a7fe;
}
.pieCon div .downDiv .num2 span {
  display: inline-block;
  width: 4px;
  border: 1px solid #eacf19;
  background-color: #eacf19;
  height: 12px;
  margin-right: 4px;
}
</style>