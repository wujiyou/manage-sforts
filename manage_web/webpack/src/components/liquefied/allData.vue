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
             <div @click="goLiquefied()"><chinaMap :heig="sty" :isShowBtn="false"></chinaMap></div>
             <div @click="goGdata()"><gdata :isShowBtn="false"></gdata></div>
         </div>
         <div class="smallCon2">
             <div @click="goVehicle()"><chinaMapByCar :heig="sty" :isShowBtn="false"></chinaMapByCar></div>
           
             <div @click="goMobilefilling()"><mobilefilling></mobilefilling></div>
            
         </div>
    </div>
</div>
  
</template>

<script>
import gdata from "../data/gdata"
import vehicle from "../vehicle/vehicle"
import liquefied from "./liquefied"
import mobilefilling from "./mobilefilling"
import liquefiedCopy from "./liquefied_copy"

import chinaMap from "../chinaMap/chinaMap"
import chinaMapByCar from "../chinaMap/chinaMapByCar"
export default {
    data(){
        return{
            sty:"width:100%;height:70%"
        }
    },
    components:{
        liquefied,
        gdata,
        vehicle,
        mobilefilling,
        liquefiedCopy,

        chinaMap,
        chinaMapByCar
       
    },
    methods:{
        goLiquefied(){
            this.$router.push("/data/liquefied")
        },
        // goGdata(){
            
        //      this.$router.push("/data/industrial")
        // },
        goVehicle(){
            
             this.$router.push("/data/car")
        },
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
    background: url("~@/../static/images/big_bg2.png");
}
.con>div{
    flex: 1;
    border: 1px solid black;
    display: flex;
    flex-direction: column;
}
.con .smallCon1 div{
    border: 1px solid black;
    flex: 1;
    overflow: hidden;
}
.con .smallCon2 div{
    border: 1px solid black;
    flex: 1;
    overflow: hidden;
}

</style>