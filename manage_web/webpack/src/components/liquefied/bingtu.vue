<template>
  <div >
    <div id="main1" :style="{width: '100%', height: '300%'}" ></div>
    <!-- <div>{{tabeData=$store.state.vehMapData.carSector}}</div> -->
    <!-- <div>{{$store.state.vehMapData.carSector}}</div> -->
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import echarts from "echarts/lib/echarts";
export default {
  data() {
    return {
    
      myChart3:""
    };
  },
  mounted() {
    // console.log(this.tabeData)
  console.log("——————————————————————————————————");
   
   

  },
  created(){
  // console.log(this.tabeData)
  console.log("——————————————————————————————————");
  },
  props: {
    y: {
      type: String,
      default: "60%",
    },
    daxiaos: {
      type: String,
      default: "60%",
    },
  },

  computed: {
    ...mapState(["carSector","carrankStatus"]),
    // tabeData(){
    //   return this.$store.state.carSector
    // },
    // transform: function () {
    //   return "translateY(-" + this.num * this.height + "px)";
    // },
  },
  watch: {
    carSector(v){
      console.log(this.carSector)
        this.tabeData=this.carSector
         this.initData();
    },
    // carrankStatus(){
    //    console.log(this.carrankStatus);
    // }
  },
  // created() {
  //   console.log(this.carSector);
  // },
  methods: {
    // ...mapMutations(["CARSECTOR"]),
    //初始化数据
    initData() {
       this.myChart3 = echarts.init(document.getElementById("main1"));
      var _this = this;
      // 基于准备好的dom，初始化echarts实例
      // 绘制图表
     this.myChart3.setOption({
        title: {
          x: "center", //x轴方向对齐方式
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },

        series: [
          {
            name: "全国省份",
            type: "pie",
            radius: _this.daxiaos,
            center: ["50%", _this.y],
            data:_this.carSector,
            // data: [
            //   { value: 335, name: "湖南省" },
            //   { value: 310, name: "江西省" },
            //   { value: 234, name: "广东省" },
            //   { value: 135, name: "甘肃省" },
            //   { value: 1548, name: "浙江省" },
            // ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      });
    },
  },
  

};
</script>
<style  scoped>
#main1 {
  /* float: left; */
}
.borde_2{
  border:1px solid rgba(89, 184, 212, 1);
}
</style>