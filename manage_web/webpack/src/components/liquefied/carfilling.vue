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
    </vue-particles>-->
    <div class="headTitle">
      <div class="left">
        <img @click="goAllData()" src="../../../static/images/mobilefilling/a.png" />
      </div>
      <div class="center">车用气瓶大数据中心</div>
      <!-- <div class="right">2020-07-29 11:13:16</div> -->
    </div>

    <div class="bodyCon" :style="doPos">
      <div class="leftCon">
        <!-- <div class="left_1">
          <div>
            <p class="numData" :style="doFontSize">30</p>
            <p class="nameData">
              <span class="sp1"></span>制造单位
            </p>
          </div>
          <div>
            <p class="numData" :style="doFontSize">190</p>
            <p class="nameData">
              <span class="sp2"></span>充装单位
            </p>
          </div>
          <div>
            <p class="numData" :style="doFontSize">29</p>
            <p class="nameData">
              <span class="sp3"></span>检验单位
            </p>
          </div>
          <div>
            <p class="numData" :style="doFontSize">154</p>
            <p class="nameData">
              <span class="sp4"></span>配送单位
            </p>
          </div>
        </div> -->
        <div class="left_2">
          <div>
            <horseRace :liNum="liNum"></horseRace>
          </div>
        </div>
        <div class="left_3">
          <pieChart :y="y" :barChartSty="barChartSty" :doFontSize="doFontSize"></pieChart>
        </div>
      </div>
      <div class="centerCon">
        <div class="center_2">
          <chinaMap :heig="heig" :isnorMal="isnorMal"></chinaMap>
        </div>
        <div class="center_3">
          <barChart :y="y" :barChartSty="barChartSty" :doFontSize="doFontSize"></barChart>
        </div>
      </div>
      <div class="rightCon">
        <!-- <div class="right_1">
         
          <div class="rightData">
            <div>
              <p class="numData" :style="doFontSize">110</p>
              <p class="nameData">
                <span class="sp4"></span>使用单位
              </p>
            </div>
            <div>
              <p class="numData" :style="doFontSize">613</p>
              <p class="nameData">
                <span class="sp3"></span>发证员工
              </p>
            </div>
            <div>
              <p class="numData" :style="doFontSize">218</p>
              <p class="nameData">
                <span class="sp4"></span>加气机数
              </p>
            </div>
            <div>
              <p class="numData" :style="doFontSize">1,532,190</p>
              <p class="nameData">
                <span class="sp4"></span>气瓶数量
              </p>
            </div>
          </div>
        </div> -->
        <div class="right_2">
          <div>
            <horseRaceRight :liNum="liNum"></horseRaceRight>
          </div>
        </div>
        <div class="right_3">
          <!-- <div class="zexian"> -->
          <liquefiedzexian class="zexian"></liquefiedzexian>
          <!-- </div> -->

          <!-- <div class="box1">
             <p :style="doFontSize">全国热傍</p>
             <div><img src="../../../static/images/liquefied/winBig.png"/><span>可爱多</span></div>
             <div><img src="../../../static/images/liquefied/winBig.png"/><span>可爱多</span></div>
          </div>
          <div class="box2">
             <p :style="doFontSize">各省热傍</p>
             <div><span>北京</span><span>25,179<img src="../../../static/images/liquefied/up.png"> </span></div>
             <div><span>上海</span><span>25,179<img src="../../../static/images/liquefied/down.png"> </span></div>
             <div><span>河北</span><span> 25,179<img src="../../../static/images/liquefied/up.png"></span></div>
          </div>
          <div class="box3">
             <p :style="doFontSize">近30日</p>
             <div><span>好多鱼</span><span>25,179<img src="../../../static/images/liquefied/up.png"> </span></div>
             <div><span>哇哈哈</span><span>25,179<img src="../../../static/images/liquefied/down.png"> </span></div>
             <div><span>小洋人</span><span>25,179<img src="../../../static/images/liquefied/up.png"> </span></div>
             
          </div>-->
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
        <chinaMap></chinaMap>
      </el-col>
    </div>-->
  </div>
</template>
<script>
import $ from "jquery";
import chinaMap from "../chinaMap/chinaMap";
import pieChart from "./liquefiedComponents/pieChart";
import barChart from "./liquefiedComponents/barChart";
import horseRace from "./liquefiedComponents/horseRace";
import liquefiedzexian from "@/components/liquefied/liquefiedComponents/liquefiedzexian";
import horseRaceRight from "./liquefiedComponents/horseRaceRight";

export default {
  name: "Home",
  data() {
    return {
      liNum: 0,
      y: "50%",
      isnorMal: true,
      sty: "width:100%;height:42vh",
      tabeData: [
        {
          date: "20200730",
          adress: "北京市昌平区金燕写字楼",
          ExceCode: "1000004",
        },
        {
          date: "20200730",
          adress: "北京市昌平区金燕写字楼",
          ExceCode: "1000004",
        },
        {
          date: "20200730",
          adress: "北京市昌平区金燕写字楼",
          ExceCode: "1000004",
        },
        {
          date: "20200730",
          adress: "北京市昌平区金燕写字楼",
          ExceCode: "1000004",
        },
        {
          date: "20200730",
          adress: "北京市昌平区金燕写字楼",
          ExceCode: "1000004",
        },
        {
          date: "20200730",
          adress: "北京市昌平区金燕写字楼",
          ExceCode: "1000004",
        },
        {
          date: "20200730",
          adress: "北京市昌平区金燕写字楼",
          ExceCode: "1000004",
        },
        {
          date: "20200730",
          adress: "北京市昌平区金燕写字楼",
          ExceCode: "1000004",
        },
        {
          date: "20200730",
          adress: "北京市昌平区金燕写字楼",
          ExceCode: "1000004",
        },
        {
          date: "20200730",
          adress: "北京市昌平区金燕写字楼",
          ExceCode: "1000004",
        },
        {
          date: "20200730",
          adress: "北京市昌平区金燕写字楼",
          ExceCode: "1000004",
        },
        {
          date: "20200730",
          adress: "北京市昌平区金燕写字楼",
          ExceCode: "1000004",
        },
        {
          date: "20200730",
          adress: "北京市昌平区金燕写字楼",
          ExceCode: "1000004",
        },
        {
          date: "20200730",
          adress: "北京市昌平区金燕写字楼",
          ExceCode: "1000004",
        },
        {
          date: "20200730",
          adress: "北京市昌平区金燕写字楼",
          ExceCode: "1000004",
        },
        {
          date: "20200730",
          adress: "北京市昌平区金燕写字楼",
          ExceCode: "1000004",
        },
        {
          date: "20200730",
          adress: "北京市昌平区金燕写字楼",
          ExceCode: "1000004",
        },
        {
          date: "20200730",
          adress: "北京市昌平区金燕写字楼",
          ExceCode: "1000004",
        },
        {
          date: "20200730",
          adress: "北京市昌平区金燕写字楼",
          ExceCode: "1000004",
        },
      ],
      barChartSty: "width: 100%;height:26vh;",
      doFontSize: "",
      doPos: "",
      samllFont: "",
    };
  },
  created() {
    if (this.$route.path == "/allMap") {
      this.liNum = 3;
      this.y = "50%";
      this.barChartSty = "width: 100%;height:20vh;";
      this.doFontSize = "font-size:16px !important";
      this.doPos = "top:-6% !important";
      // this.samllFont="font-size: 8px; transform:scale(0.9);"
      this.isnorMal = false;
    }
    console.log(this.$route.path);
    // liNum
  },
  props: {
    heig: {
      type: String,
      default: "width:100%;height:52vh",
    },

    // doFontSize:{
    //   type:String,
    //   default:"font-size:28px"
    // }
  },
  components: {
    chinaMap,
    pieChart,
    barChart,
    horseRace,
    liquefiedzexian,
    horseRaceRight,
  },
  methods: {
    goAllData() {
      console.log("触发");
      this.$router.push("/allMap");
    },
  },
};
</script>
<style scoped>
@media screen and (max-width: 1200px) {
  .headTitle .center {
    font-size: 20px !important;
  }
  .bodyCon .leftCon .left_1 div .numData {
    font-size: 16px !important;
  }
}
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
  height: 100%;
  position: relative;
  background: url("../../../static/images/carimage/cheyong.png");
  background-size: 100% 100%;
}
.headTitle {
  width: 60%;
  height: 8vh;
  background: url("../../../static/images/carimage/1.png") no-repeat;
  background-size: 100% 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.headTitle div {
  flex: 1;
  color: white;
}
.headTitle .left {
  padding-left: 1%;
  position: relative;
}
.headTitle .left img {
  width: 20px;
  height: auto;
}
.headTitle .center {
  font-size: 24px;
  font-weight: 600;
  text-align: center;
  background: linear-gradient(to right, #00afff, #295aaa);
  -webkit-background-clip: text;
  color: transparent;
}
.headTitle .right {
  text-align: right;
  padding-right: 15px;
  color: #61a7fe;
}
.bodyCon {
  display: flex;
  width: 100%;
  height: 92%;
  padding-bottom: 10px;
  position: relative;
  top: -3%;
}

.bodyCon div {
  flex: 1;
}

.bodyCon .leftCon {
  /* position: absolute; */

  display: flex;
  flex-direction: column;
  padding-left: 10px;
  padding-right: 10px;
  /* position: absolute; */
  /* top: -3%; */
}

.bodyCon .leftCon .left_1 {
  flex: 1;
  background: url("../../../static/images/liquefied/left_1.png") no-repeat;
  margin-bottom: 10px;
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.bodyCon .leftCon .left_1 div {
  flex: 1;
  color: white;
  text-align: center;
}
.bodyCon .leftCon .left_1 div .numData {
  font-size: 20px;
}
.bodyCon .leftCon .left_1 div .nameData {
  color: #4c9bfd;
}
.bodyCon .leftCon .left_1 div .nameData span {
  display: inline-block;
  width: 4px;
  height: 12px;
  border-radius: 5px;
  margin-right: 5%;
}
.sp1 {
  border: 1px solid #006cff;
  background: #006cff;
}
.sp2 {
  border: 1px solid #6acca3;
  background: #6acca3;
}
.sp3 {
  border: 1px solid #d7d251;
  background: #d7d251;
}
.sp4 {
  border: 1px solid #ed3f35;
  background: #ed3f35;
}
.bodyCon .leftCon .left_2 {
  flex: 4;
  background: url("../../../static/images/liquefied/left_22.png") no-repeat;
  margin-bottom: 10px;
  background-size: 100% 100%;
}
.bodyCon .leftCon .left_2 div {
  margin-top: 2%;
}

.tabTitle span:last-child {
  border: none;
}

.bodyCon .leftCon .left_3 {
  flex: 3;
  background: url("../../../static/images/liquefied/left_2.png") no-repeat;
  background-size: 100% 100%;
  height: 100px;
}
.bodyCon .centerCon {
  display: flex;
  flex: 1.7;
  flex-direction: column;
  padding-right: 10px;
}

.bodyCon .centerCon .center_2 {
  flex: 3;
  /* background: tomato; */
  margin-bottom: 10px;
}
.bodyCon .centerCon .center_3 {
  flex: 1;
  background: url("../../../static/images/liquefied/left_2.png") no-repeat;
  background-size: 100% 100%;
}
.bodyCon .rightCon {
  display: flex;
  flex-direction: column;
  padding-right: 10px;
}
.bodyCon .rightCon .right_1 {
  flex: 1;
  background: url("../../../static/images/liquefied/left_1.png") no-repeat;
  background-size: 100% 100%;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
}

.bodyCon .rightCon .right_1 .rightData {
  flex: 3;
  display: flex;
  padding-left: 5.5%;
  padding-top: 5%;
  /* text-align: center; */
}
.bodyCon .rightCon .right_1 .rightData div p {
  font-size: 20px;
  color: white;
}
.bodyCon .rightCon .right_1 .rightData .nameData {
  font-size: 12px;
  color: #006cff;
}
.bodyCon .rightCon .right_1 .rightData .nameData span {
  display: inline-block;
  width: 3px;
  height: 1vh;
  margin-right: 4%;
}
/* .dat p span{
  font-size: 12px;
} */
.bodyCon .rightCon .right_2 {
  flex: 3.5;
  background: url("../../../static/images/liquefied/left_22.png") no-repeat;
  background-size: 100% 100%;
  margin-bottom: 10px;
}
.bodyCon .rightCon .right_2 div {
  margin-top: 2%;
}
.bodyCon .rightCon .right_3 {
  flex: 1.8;
  background: url("../../../static/images/liquefied/right_3.png") no-repeat;
  background-size: 100% 100%;
  /* margin-bottom: 20px; */
}
.right_3 {
  display: flex;
  padding-left: 4%;
  padding-top: 5%;
  /* position: relative; */
  /* width: 100%; */
}
.zexian {
  /* position: absolute;
  top:-30% */
  /* margin-top: 20%; */
}
/* .zexian{
  width: 100%;
  height: 50vh;
  position: absolute;
  top:0

} */
.right_3 div {
  /* margin-top: 3%; */
  color: rgba(97, 167, 254, 1);
}

.right_3 .box1 div {
  margin-top: 5%;
}
.right_3 .box1 p {
  font-size: 16px;
}
.right_3 .box1 div span {
  display: inline-block;
  padding-bottom: 10%;
  margin-bottom: 10%;
  margin-left: 10%;
}
.right_3 .box2 p {
  font-size: 16px;
}
.right_3 .box2 div {
  padding-bottom: 10px;
}
.right_3 .box2 div {
  margin-top: 5%;
}
.right_3 .box2 div span:first-child {
  margin-right: 10%;
}
.right_3 .box2 div span:last-child {
  margin-left: 5%;
}
.right_3 .box2 div span:last-child img {
  margin-left: 5%;
}

.right_3 .box3 p {
  font-size: 16px;
}
.right_3 .box3 div {
  padding-bottom: 10px;
}
.right_3 .box3 div {
  margin-top: 5%;
  display: flex;
}
.right_3 .box3 div span {
  color: rgba(82, 255, 255, 1);
  flex: 1;
}
/* .right_3 .box3 div span:first-child{
  margin-right: 10%;

} */
.right_3 .box3 div span:last-child img {
  margin-left: 5%;
}
.right_3 {
  display: flex;
  padding-left: 4%;
  padding-top: 5%;
}
.right_3 .box1 {
  /* margin-top: 3%; */
  color: rgba(97, 167, 254, 1);
}
.right_3 .box1 div .right_3 .box1 div {
  margin-top: 5%;
}
.right_3 .box1 h4 {
  font-size: 16px;
}
.right_3 .box1 div span {
  display: inline-block;
  padding-bottom: 10%;
  margin-bottom: 10%;
  margin-left: 10%;
}
</style>

