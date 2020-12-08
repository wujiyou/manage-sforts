<template>
  <div class="liqCon">
  <!-- <vue-particles
        color="#dedede"
        :particleOpacity="0.5"
        :particlesNumber="100"
        shapeType="circle"
        :particleSize="3"
        linesColor="#dedede"
        :linesWidth="1"
        :lineLinked="true"
        :lineOpacity="0.4"
        :linesDistance="150"
        :moveSpeed="3"
        :hoverEffect="false"
        hoverMode="grab"
        :clickEffect="false"
        clickMode="push"
      >
      </vue-particles> -->
  <div class="headTitle">
     <div class="left">  </div>
     <div class="center">工业气瓶大数据中心</div>
     <div class="right">2020-07-29 11:13:16</div>  
  </div>

  <div class="bodyCon">
      <div class="leftCon">
        <div class="left_1">
          <!-- <div >
            <p class="numData">2,190</p>
            <p class="nameData"><span class="sp1"></span>设备总数</p>
          </div>
          <div>
            <p class="numData">2,190</p>
            <p class="nameData"><span class="sp2"></span>季度新增</p>
          </div>
          <div>
            <p class="numData">2,190</p>
            <p class="nameData"><span class="sp3"></span>运营设备</p>
          </div>
          <div>
            <p class="numData">2,190</p>
            <p class="nameData"><span class="sp4"></span>异常设备</p>
          </div> -->
           <pieChart :y="y"></pieChart>
        </div>
        <div class="left_2">
          <div>
            <!-- <horseRace :liNum="liNum"></horseRace> -->
          </div>
        </div>
        <div class="left_3">
         
        </div>
      </div>
      <div class="centerCon">
        <div class="center_2"> <chinaMapg :heig="heig"></chinaMapg></div>
        <div class="center_3">
          
          <barChart :y="y" :barChartSty="barChartSty"></barChart>
        </div>
      </div>
      <div class="rightCon">
        <div class="right_1">
          <!-- <div class="time">
            <span class="day">365天</span>
            <span class="day">90天</span>
            <span class="day2">90天</span>
            <span class="day2">24小时</span>
          </div> -->
          <!-- <div class="rightData">
             <div >
            <p class="numData">2,190</p>
            <p class="nameData"><span class="sp4"></span>订单量</p>
          </div>
          <div>
            <p class="numData">2,190</p>
            <p class="nameData"><span class="sp3"></span>销售额(万元)</p>
          </div>
          </div> -->
          <stackChart :y="y" :stackChartSty="stackChartSty" ></stackChart>
        </div>
        <div class="right_2">
          <div>
            <!-- <horseRace :liNum="liNum"></horseRace> -->
          </div>
        </div>
        <div class="right_3">
          <div class="box1">
             <h4>全国热傍</h4>
             <div><img src="../../../static/images/liquefied/winBig.png"/><span>可爱多</span></div>
             <div><img src="../../../static/images/liquefied/winBig.png"/><span>可爱多</span></div>
             <div><img src="../../../static/images/liquefied/winBig.png"/><span>可爱多</span></div>
          </div>
          <div class="box1">
             <h4>各省热傍</h4>
             <div><img src="../../../static/images/liquefied/winBig.png"/><span>可爱多</span></div>
             <div><img src="../../../static/images/liquefied/winBig.png"/><span>可爱多</span></div>
             <div><img src="../../../static/images/liquefied/winBig.png"/><span>可爱多</span></div>
          </div>
          <div class="box1">
             <h4>全国热傍</h4>
             <div><img src="../../../static/images/liquefied/winBig.png"/><span>可爱多</span></div>
             <div><img src="../../../static/images/liquefied/winBig.png"/><span>可爱多</span></div>
             <div><img src="../../../static/images/liquefied/winBig.png"/><span>可爱多</span></div>
          </div>
        </div>
      </div>
  </div>
    <!-- <div class="appContainer">
      <el-col :span="24" class="big_head">
        <div class="big_head_bottom_line"></div>
        <div class="btnDiv" v-if="isShowBtn">
            <button class="backBtn" @click="goAllData()">返回综合数据</button>
         </div>
      </el-col>
   
      <el-col :span="24">
        <chinaMapg></chinaMapg>
      </el-col>
    </div> -->
     
  </div>
</template>
<script>
import $ from "jquery";
import chinaMapg from "../chinaMap/chinaMapg"
import pieChart from "./gdataComponents/pieChart"
import barChart from "./gdataComponents/barChart"
import stackChart from "./gdataComponents/stackChart"
import horseRace from "./gdataComponents/horseRace"

export default {
  name: "Home",
  data() {
    return {
      liNum:0,
      y:"50%",
      sty:"width:100%;height:42vh",
      tabeData:[{
        date:"20200730",
        adress:"北京市昌平区金燕写字楼",
        ExceCode:"1000004"
      },
      {
        date:"20200730",
        adress:"北京市昌平区金燕写字楼",
        ExceCode:"1000004"
      },
      {
        date:"20200730",
        adress:"北京市昌平区金燕写字楼",
        ExceCode:"1000004"
      },
      {
        date:"20200730",
        adress:"北京市昌平区金燕写字楼",
        ExceCode:"1000004"
      },
      {
        date:"20200730",
        adress:"北京市昌平区金燕写字楼",
        ExceCode:"1000004"
      },
      {
        date:"20200730",
        adress:"北京市昌平区金燕写字楼",
        ExceCode:"1000004"
      },
      {
        date:"20200730",
        adress:"北京市昌平区金燕写字楼",
        ExceCode:"1000004"
      },
      {
        date:"20200730",
        adress:"北京市昌平区金燕写字楼",
        ExceCode:"1000004"
      },
      {
        date:"20200730",
        adress:"北京市昌平区金燕写字楼",
        ExceCode:"1000004"
      },
      {
        date:"20200730",
        adress:"北京市昌平区金燕写字楼",
        ExceCode:"1000004"
      },
      {
        date:"20200730",
        adress:"北京市昌平区金燕写字楼",
        ExceCode:"1000004"
      },
      {
        date:"20200730",
        adress:"北京市昌平区金燕写字楼",
        ExceCode:"1000004"
      },
      {
        date:"20200730",
        adress:"北京市昌平区金燕写字楼",
        ExceCode:"1000004"
      },
      {
        date:"20200730",
        adress:"北京市昌平区金燕写字楼",
        ExceCode:"1000004"
      },
      {
        date:"20200730",
        adress:"北京市昌平区金燕写字楼",
        ExceCode:"1000004"
      },
      {
        date:"20200730",
        adress:"北京市昌平区金燕写字楼",
        ExceCode:"1000004"
      },
      {
        date:"20200730",
        adress:"北京市昌平区金燕写字楼",
        ExceCode:"1000004"
      },
      {
        date:"20200730",
        adress:"北京市昌平区金燕写字楼",
        ExceCode:"1000004"
      },
      {
        date:"20200730",
        adress:"北京市昌平区金燕写字楼",
        ExceCode:"1000004"
      },
      ],
      barChartSty:"width: 100%;height:26vh;"
     
    }
  },
  created () {
    if(this.$route.path=="/allMap"){
      this.liNum=4
      this.y="40%"
      this.barChartSty="width: 100%;height:20vh;"
    }
    console.log(this.$route.path)
    // liNum
    
  },
  props:{
    heig:{
      type:String,
       default:"width:100%;height:52vh"
    }
  

  },
  components:{
    chinaMapg,
    pieChart,
    barChart,
    horseRace,
    stackChart

  },
  methods: {
    goAllData(){
      console.log("触发")
      this.$router.push("/allMap")

    },
   
   
  },
};
</script>
<style scoped>
#particles-js {
  width: 100%;
  height: 100vh;
  position: absolute;
}

.liqCon {
  /* overflow-y: hidden; */
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height:100%;
  position: relative;
  background-color: #12102C;
}
.headTitle{
  width: 100%;
  height: 7vh;
  background: url("../../../static/images/liquefied/head2.png") no-repeat;
  background-size: 100% 100%;
  display: flex;
   align-items: center;
  justify-content: center;

}
.headTitle div{
  flex: 1;
   color: white;
}
.headTitle .left{
  padding-left: 15px;
}
.headTitle .center{
  font-size: 24px;
  font-weight: 600;
  text-align: center;
  background: linear-gradient(to right, #00AFFF, #295AAA);
  -webkit-background-clip: text;
  color: transparent;
}
.headTitle .right{
  text-align: right;
  padding-right: 15px;
  color: #61A7FE;
}
.bodyCon{
  display: flex;
  width: 100%;
  height: 92%;
  padding-bottom: 10px;
  position: relative;
}
.bodyCon div{
  flex: 1;
}

.bodyCon .leftCon{
  display: flex;
  flex-direction: column;
  padding-left: 10px;
  padding-right: 10px;
  /* position: absolute; */
  /* top: -3%; */
}

.bodyCon .leftCon .left_1{
  flex: 1;
  background: url("../../../static/images/liquefied/left_1.png") no-repeat;
  margin-bottom: 10px;
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;

}
.bodyCon .leftCon .left_1 div{
  flex: 1;
  color: white;
  text-align: center;
}
.bodyCon .leftCon .left_1 div .numData{
  font-size: 20px;
}
.bodyCon .leftCon .left_1 div .nameData{
  color: #4C9BFD;
}
.bodyCon .leftCon .left_1 div .nameData span{
   display: inline-block;
   width: 4px;
   height: 12px;
   border-radius: 5px;
   margin-right: 5%;
}
.sp1{
   border: 1px solid #006CFF;
   background: #006CFF;
  
}
.sp2{
   border: 1px solid #6ACCA3;
   background: #6ACCA3;

}
.sp3{
   border: 1px solid #D7D251;
   background: #D7D251;

}
.sp4{
   border: 1px solid  #ED3F35;
   background:  #ED3F35
 
}
.bodyCon .leftCon .left_2{
  flex: 4;
  background: url("../../../static/images/liquefied/left_22.png") no-repeat;
  margin-bottom: 10px;
  background-size: 100% 100%;
 
}
.bodyCon .leftCon .left_2 div{
   margin-top: 2%;

}

.tabTitle span:last-child{
  border: none;

}

.bodyCon .leftCon .left_3{
  flex: 3;
  background: url("../../../static/images/liquefied/left_2.png") no-repeat;
  background-size: 100% 100%;
  
}
.bodyCon .centerCon{
  display: flex;
  flex: 1.7;
  flex-direction: column;
   padding-right: 10px;

}

.bodyCon .centerCon .center_2{
  flex: 6;
  /* background: tomato; */
  margin-bottom: 10px;
}
.bodyCon .centerCon .center_3{
  flex: 3.6;
  background: url("../../../static/images/liquefied/left_2.png") no-repeat;
  background-size: 100% 100%;
}
.bodyCon .rightCon{
  display: flex;
 flex-direction: column;
 padding-right: 10px;
}
.bodyCon .rightCon .right_1{
  flex: 1;
  background: url("../../../static/images/liquefied/left_1.png") no-repeat;
  background-size: 100% 100%;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
}
.bodyCon .rightCon .right_1 .time span{
  color: white;
  display: inline-block;
  /* border-right: 1px solid #00F2F1; */
  width: 2vw;
  height: 12px;
  line-height: 12px;
  text-align: center;
  border-right: 1px solid #00F2F1;
 
  /* margin-right: 10px; */
}
.bodyCon .rightCon .right_1 .time span:last-child{
  border: none;
}
.bodyCon .rightCon .right_1 .time .day{
  color: #293983;
}

.bodyCon .rightCon .right_1 .time{
  flex: 1;
  padding-left: 5%;
  padding-top:2.5%

}
.bodyCon .rightCon .right_1 .rightData{
  flex: 3;
  display: flex;
  padding-left: 5.5%;
  /* text-align: center; */
}
.bodyCon .rightCon .right_1 .rightData div p{
  font-size: 20px;
  color: white;
}
.bodyCon .rightCon .right_1 .rightData .nameData{
  font-size: 12px;
  color: #006CFF;

}
.bodyCon .rightCon .right_1 .rightData .nameData span{
  display:inline-block;
  width: 3px;
  height: 1vh;
  margin-right: 4%;

}
/* .dat p span{
  font-size: 12px;
} */
.bodyCon .rightCon .right_2{
  flex: 3.5;
  background: url("../../../static/images/liquefied/left_22.png") no-repeat;
  background-size: 100% 100%;
  margin-bottom: 10px;

}
.bodyCon .rightCon .right_2 div{
  margin-top: 2%;
}
.bodyCon .rightCon .right_3{
  flex: 1.8;
   background: url("../../../static/images/liquefied/right_3.png") no-repeat;
  background-size: 100% 100%;
  margin-bottom: 10px;
}
.right_3{
  display: flex;
  padding-left: 4%;
  padding-top: 5%;
}
.right_3 .box1 {
  /* margin-top: 3%; */
  color: rgba(97, 167, 254, 1);
}
.right_3 .box1 div
.right_3 .box1 div{
  margin-top: 5%;

}
.right_3 .box1 h4{
  font-size: 16px;

}
.right_3 .box1 div span{
  display: inline-block;
  padding-bottom: 10%;
  margin-bottom: 10%;
  margin-left: 10%;
}

</style>

