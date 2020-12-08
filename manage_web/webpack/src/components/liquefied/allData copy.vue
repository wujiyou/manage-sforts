<template>
  <div class="con">
      <div class="smallCon1">
          <div @click="goLiquefied()"><liquefied :heig="sty" :isShowBtn="false"></liquefied></div>
          <div @click="goGdata()"><gdata :isShowBtn="false"></gdata></div>
      </div>
      <div class="smallCon2">
          <div @click="vehicle()"><vehicle :isShowBtn="false"></vehicle></div>
          <!-- <liquefiedss></liquefiedss> -->
          <div @click="mobilefilling()"><mobilefilling></mobilefilling></div>
          <!-- <mobilefilling></mobilefilling> -->
      </div>
  </div>
</template>

<script>
import gdata from "../data/gdata"
import vehicle from "../vehicle/vehicle"
import liquefied from "./liquefied"
import mobilefilling from "./mobilefilling"
import liquefiedCopy from "./liquefied_copy"
export default {
    data(){
        return{
            sty:"width:100%;height:60%"
        }
    },
    components:{
        liquefied,
        gdata,
        vehicle,
        mobilefilling,
        liquefiedCopy
       
    },
    methods:{
        goLiquefied(){
            // console.log(1111111111111122222)
            this.$router.push("/data/liquefied")
        },
        goGdata(){
            
             this.$router.push("/data/industrial")
        },
        vehicle(){
            
             this.$router.push("/data/car")
        },
        mobilefilling(){
            
            this.$router.push("/data/phone")

        }

    }

}
</script>

<style scoped>
body{
     overflow-y: hidden;

}
.con{
    width: 100%;
    height: 100vh;
    display: flex;
    /* overflow-y: hidden; */
    /* flex-direction: column-reverse; */
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