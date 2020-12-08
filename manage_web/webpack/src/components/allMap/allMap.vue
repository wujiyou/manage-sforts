<template>
<div>
    <vue-particles
      id="particles-js"
      color="#fff"
      :particleOpacity="0.3"
      :particlesNumber="100"
      shapeType="circle"
      :particleSize="4"
      linesColor="#fff"
      :linesWidth="0.3"
      :lineLinked="false"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="2"
      :hoverEffect="false"
      hoverMode="grab"
      :clickEffect="false"
      clickMode="push"
      class="lizi"
    ></vue-particles>
    <div class="con">
         <div class="smallCon1">
             <div @click="goLiquefied()">
                 <!-- <lique :heig="heig" :zexianSty="zexianSty"></lique> -->

                 <liquefied :heig="heig" :heigs="heigs" :bg="bg" :zexianSty="zexianSty"></liquefied>
                 <!-- <chinaMap :heig="sty" :isShowBtn="false"></chinaMap> -->
                 </div>
             <div @click="goGdata()">
                 <!-- <lique :heig="heig"></lique> -->
                 <!-- <gdat :heig="heig"></gdat> -->
                 <gdata :bg="bg" :heig="heig"  :stackChartSty="stackChartSty" :doFontSize="doFontSize"></gdata>
             </div>
         </div>
         <div class="smallCon2">
             <div @click="goVehicle()">
                 <vehicle :heig="heig" :bg="bg" :heigs="stys" :isShowBtn="false"></vehicle>
                 </div>
           
             <div @click="goMobilefilling()">
                 <!-- <mob></mob> -->
                 <mobilefilling :bg="bg"></mobilefilling>
                 </div>
            
         </div>
    </div>
</div>
  
</template>

<script>
import gdata from "../data/gdata"
import vehicle from "../vehicle/vehicle"
import mobilefilling from "../liquefied/mobilefilling"
import liquefied from "../liquefied/liquefied"
import chinaMap from "../chinaMap/chinaMap"
import chinaMapByCar from "../chinaMap/chinaMapByCar"

import gdat from "@/components/allMap/gdat.vue"
import lique from "./lique"
import mob from "./mob"
export default {
    data(){
        return{
            stys:"",
            sty:"width:100%;height:70%",
            heig:"width:100%;height:20vh",
            heigs:"width:100%;height:20vh;marginTop:20px",
            zexianSty:"width:100%;height:14vh",
            bg:"",
            // allProvincesAdress:"",
            // allType:"",
            stackChartSty:"width:100%;height:12vh;margin-top:-5%;",
            doFontSize:"font-size:12px",
            // gaodug:"margin-bottom:0%"
            // gheit:"width: 100%;height:10vh;"
         }
    },
    created(){
        // this.allProvincesAdress=sessionStorage.getItem("provinceCode")
        // this.allType=sessionStorage.getItem("type")
    },
    components:{
        gdata,
        vehicle,
        mobilefilling,
        chinaMap,
        chinaMapByCar,
        liquefied,
        lique,
        gdat,
        mob
       
    },
    methods:{
        goLiquefied(){
            this.$router.push("/data/liquefied")
        },
        goGdata(){
            
             this.$router.push("/data/industrial")
        },
        goVehicle(){   
             this.$router.push("/data/car")
        },
        goMobilefilling(){
            this.$router.push("/data/phone")
        }
        // mobilefilling(){
        //     this.$router.push("/data/phone")

        // }

    }

}
</script>

<style scoped>
body{
     overflow-y: hidden;
}
div span p{
    font-size: 12px !important;
}
#particles-js {
  width: 100%;
  /* height: calc(100% - 100px); */
  height: 100vh;
  position: absolute;
}
.con{
    width: 100%;
    height: 100vh;
    display: flex;
    overflow-y: hidden;
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    /* -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale; */
    background: url("~@/../static/images/big_bg.png");
}
.con>div{
    flex: 1;
    border: 1px solid black;
    display: flex;
    flex-direction: column;
}
.con .smallCon1 div{
    border: 1px solid black;
    border-right: none;
    flex: 1;
    overflow: hidden;
}
.con .smallCon2 div{
    border: 1px solid black;
    border-left: none;
    flex: 1;
    overflow: hidden;
}


</style>