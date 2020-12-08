<template>
  <div class="loginer" >
    <div class="backTo">
    <span @click="back" class="span1">返回上一页</span>
</div>
    <!-- <p class="botton">Copyright @ 2017-2018狱务通</p> -->
  </div>
</template>
<script>
export default {
  name: "loginer",
  methods:{
    back(){
        this.$router.go(-1);//返回上一层
    },
},
  
}
</script>

<style scoped>
.loginer {
  width: 100%;
  height: 100%;
  text-align: center;
  background-color: linear-gradient(
    90deg,
    rgba(62, 95, 248, 1) 0%,
    rgba(36, 146, 255, 1) 100%
  );
  background-image: url(../../assets/images/1.jpg);
  background-repeat: no-repeat;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-position: center center;
}
.botton{
  position: fixed;
  bottom: 5%;
  font-size: 12px;
}
.span1{
  display: inline-block;
  position: fixed;
  top: 70%;
  left: 55%;
  color: rgb(96,168,254);
  font-size: 14px;
  cursor: pointer;
}
</style>


