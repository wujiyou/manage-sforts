<template>
  <div class="pieCon">
      <div id="pie" :style="barChartSty"></div>
        <!-- <div class="daCon">
           <div class="upDiv">
             <p class="num1" :style="doFontSize">320,111</p>
             <p class="num2">
               <span></span>点位分布
             </p>
           </div>
           <div class="downDiv">
             <p class="num1"  :style="doFontSize">320,111</p>
             <p class="num2">
               <span></span>点位分布
             </p>
           </div>
        </div> -->
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import echarts from "echarts/lib/echarts";
export default {
    data(){
        return{
           datas:[]
        }
    },
    mounted(){
         
        // this.init();

    },
    props:{
      y:{
        type:String,
        default:"70%"
      },
       barChartSty:{
        type:String,
        default:"width: 100%;height:30vh;"
      },
      doFontSize:{
        type:String
      }

    },
    computed: {
    ...mapState(["liqueProportion"]),
    // tabeData(){
    //   return this.$store.state.carSector
    // },
    // transform: function () {
    //   return "translateY(-" + this.num * this.height + "px)";
    // },
  },
  watch: {
    liqueProportion(v){
      console.log(this.liqueProportion)
        this.datas=this.liqueProportion
        this.init();
    },
    // carrankStatus(){
    //    console.log(this.carrankStatus);
    // }
  },
    methods:{
      init() {
        this.myChart = this.$echarts.init(document.getElementById("pie"));
      var _this = this;
      this.myChart.setOption({
        title: {
          text: "气瓶占比统计",
          x: "10%",
          y: 16,
          textStyle: {
              color: "#fff"
            }
        },
          tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
        },
         
        series: [
          {
            name: "气瓶占比",
            zoom: 2,
            type: "pie",
            radius: [0, "40%"],//调整表的大小
            center: ["50%", _this.y],
            
            data: _this.liqueProportion
          }
        ],
      
        // roseType: "angle"
      });
      window.addEventListener("resize", function() {
        _this.myChart.resize();
      });
    }
    }

}
</script>

<style>
.pieCon {
  display: flex;
  padding-right: 10%;
}
.daCon {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 80px;
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