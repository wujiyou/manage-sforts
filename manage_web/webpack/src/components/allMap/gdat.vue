<template>
  <div class="liqCon">
    <div class="headTitle">
      <div class="left" @click="lefts()">
        <!-- <img src="../../../static/images/mobilefilling/a.png" alt /> -->
      </div>
      <div class="center">工业气瓶大数据中心</div>
      <div class="right"><div>{{date | formatDate}}</div></div>
    </div>

    <div class="bodyCon">
      <div class="leftCon">
        <div class="left_11">
          <img src="../../../static/images/bg16.png" :style="imga"/>
          <span class="head1" :style="toubu">流量实时动态图</span>
        </div>
        <div class="left_1">
          <chinaMapg :heig="heig" :isnorMal="isnorMal"></chinaMapg>
          <!-- <div>
            <p class="numData" :style="doFontSize">59</p>
            <p class="nameData">
              <span class="sp3"></span>使用单位
            </p>
          </div>
          <div>
            <p class="numData" :style="doFontSize">82</p>
            <p class="nameData">
              <span class="sp4"></span>充装单位
            </p>
          </div>
          <div>
            <p class="numData" :style="doFontSize">17</p>
            <p class="nameData">
              <span class="sp3"></span>检验单位
            </p>
          </div>
          <div>
            <p class="numData" :style="doFontSize">2,190</p>
            <p class="nameData">
              <span class="sp4"></span>配送单位
            </p>
          </div>-->
        </div>
        <!-- <div class="left_2">
          <div>
        
          </div>
        </div>-->
        <!-- <div class="left_3">
        </div>-->
      </div>
      <div class="centerCon">
        <div class="center_1">
          <img src="../../../static/images/bg16.png" :style="imga" />
          <span class="head1" :style="toubu">兰州市</span>
        </div>
        <div class="center_2">
          <div class="center_22">
            <div>
              <barChatg :y="y" :barChartSty="barChartSty"></barChatg>
            </div>
            <div>
              <barChatga :y="y" :barChartSty="barChartSty"></barChatga>
            </div>
          </div>
          <div class="center_33">
            <div>
              <barChatgb :y="y" :barChartSty="barChartSty"></barChatgb>
            </div>
            <div>
              <barChatgc :y="y" :barChartSty="barChartSty"></barChatgc>
            </div>
          </div>
        </div>
        <div class="center_3">
          <div class="box5">
            <h1 class="hh2" :style="gaodu">
              客流量
              <span class="sp5" :style="ziti">3665</span>人次
            </h1>
          </div>
          <div class="box6">
            <h1 class="hh3" :style="gaodu">
              网络流量
              <span class="sp5" :style="ziti">8969</span>人次
            </h1>
          </div>
        </div>
      </div>
    </div>
    <div class="footCon" :style="footSize">
      <span :style="footSizea">甘肃》</span>
      <span :style="footSizea">甘肃省</span>
      <span :style="footSizea">兰州市</span>
      <span :style="footSizea">嘉峪关市</span>
      <span :style="footSizea">金昌市</span>
      <span :style="footSizea">白银市</span>
      <span :style="footSizea">天水市</span>
      <span :style="footSizea">酒泉市</span>
      <span :style="footSizea">张掖市</span>
      <span :style="footSizea">武威市</span>
      <span :style="footSizea">定西市</span>
      <span :style="footSizea">陇南市</span>
      <span :style="footSizea">平凉市</span>
      <span :style="footSizea">庆阳市</span>
      <span :style="footSizea">临夏州</span>
      <span :style="footSizea">甘南州</span>
    </div>
  </div>
  <!-- <div class="rightCon">
  <div class="right_1">-->
  <!-- <div class="time">
            <span class="day">365天</span>
            <span class="day">90天</span>
            <span class="day2">90天</span>
            <span class="day2">24小时</span>
  </div>-->
  <!-- <div class="rightData"> -->
  <!-- <div>
            <p class="numData" :style="doFontSize">33</p>
            <p class="nameData">
              <span class="sp3"></span>制造单位
            </p>
          </div>
          <div>
            <p class="numData" :style="doFontSize">846</p>
            <p class="nameData">
              <span class="sp4"></span>发证员工
            </p>
          </div>
          <div>
            <p class="numData" :style="doFontSize">750</p>
            <p class="nameData">
              <span class="sp3"></span>加气机数
            </p>
          </div>
          <div>
            <p class="numData" :style="doFontSize">15,152,190</p>
            <p class="nameData">
              <span class="sp4"></span>气瓶数量
            </p>
  </div>-->
  <!-- </div>
        </div>
        <div class="right_2">
          <div>
            <horseRace1 :liNum="liNum"></horseRace1>
          </div>
        </div>
  <div class="right_3">-->
  <!-- <stackChart :y="y" :stackChartSty="stackChartSty"></stackChart> -->
  <!-- <div class="box1">
             <p :style="doFontSize">全国热傍</p>
             <div><img src="../../../static/images/liquefied/winBig.png"/><span>可爱多</span></div>
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

  <!-- </div> -->
  <!-- </div> -->
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
</template>
<script>
import $ from "jquery";
import chinaMapg from "../chinaMap/chinaMapg";
import barChatg from "../data/gdataComponents/barChatg";
import barChatga from "../data/gdataComponents/barChatga";
import barChatgb from "../data/gdataComponents/barChatgb";
import barChatgc from "../data/gdataComponents/barChatgc";
const padDate = function(value) {
  return value < 10 ? `0${value}` : value;
};
export default {
  name: "Home",
  data() {
    return {
      liNum: 0,
      y: "50%",
      sty: "width:100%;height:42vh",
      barChartSty: "width: 100%;height:26vh;",
      isnorMal: true,
      ziti: "",
      gaodu: "",
      footSize: "",
      footSizea: "",
      toubu:"",
      imga:"",
      date: new Date()
    };
  },
  created() {
    if (this.$route.path == "/allMap") {
      this.liNum = 3;
      this.y = "50%";
      this.barChartSty = "width: 100%;height:15vh;";
      this.ziti = "font-size:12px !important";
      this.footSize = "font-size:12px !important;padding-bottom:20px;";
      this.footSizea = "font-size:12px !important;";
      this.toubu = "font-size:12px !important;color:white !important;";
      this.gaodu = "padding:2% !important;font-size:12px !important";
      this.imga = "height:30% !important;width:5% !important;";
      this.isnorMal = false;
    }
    console.log(this.$route.path);
    // liNum
  },
  filters: {
    formatDate: function(value) {
      const date = new Date(value);
      const year = date.getFullYear();
      const month = padDate(date.getMonth() + 1);
      const day = padDate(date.getDate());
      const hours = padDate(date.getHours());
      const minutes = padDate(date.getMinutes());
      const seconds = padDate(date.getSeconds());
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    },
    rounding(value) {
      return value.toFixed(2);
    }
  },
  mounted(){
    const _this = this;
     this.timer = setInterval(function() { 
        _this.date = new Date();
      }, 1000);
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  },
  props: {
    heig: {
      type: String,
      default: "width:100%;height:52vh"
    }

    // doFontSize:{
    //   type:String,
    //   default:"font-size:28px"
    // }
  },
  components: {
    chinaMapg,
    // pieChart,
    // barChart,
    // horseRace,
    // horseRace1,
    // stackChart,
    barChatg,
    barChatga,
    barChatgb,
    barChatgc
  },
  methods: {
    goAllData() {
      console.log("触发");
      this.$router.push("/allMap");
    },
    lefts() {
      this.$router.push("/allMap");
    }
  }
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
  overflow-y: hidden;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: url("../../../static/images/bg15.png");
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #12102c;
}
.headTitle {
  width: 100%;
  height: 7vh;
  background: url("../../../static/images/bg14.png") no-repeat;
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
  padding-left: 4%;
}
.headTitle .center {
  font-size: 24px;
  font-weight: 600;
  text-align: center;
  background: linear-gradient(to right, #00afff, #295aaa);
  -webkit-background-clip: text;
  color: transparent;
  margin-top: -20px;
}
.headTitle .right {
  text-align: right;
  padding-right: 15px;
  margin-top: -20px;
  color: #61a7fe;
}
.haed1 {
  color: white;
  font-size: 20px;
}
.bodyCon {
  display: flex;
  width: 100%;
  height: 80%;
  padding-bottom: 10px;
  position: relative;
  top: -4%;
}
.hh2 {
  background-color: #12bdf8;
  width: 100%;
  padding: 8%;
}
.hh3 {
  background-color: #09223c;
  width: 100%;
  padding: 8%;
}
.footCon {
  display: flex;
  width: 100%;
  /* height: 20%; */
  padding-bottom: 10px;
  padding-left: 3%;
}
.footCon span:first-child {
  color: #08baf4;
  font-size: 25px;
  /* padding-left:3%; */
  padding-top: 0%;
  width: 100%;
}
.footCon span {
  width: 100%;
  padding-right: 1%;
  font-size: 14px;
  color: white;
  /* padding-top: 0.4%; */
}

.bodyCon div {
  flex: 1;
}

.bodyCon .leftCon {
  /* position: absolute; */

  display: flex;
  flex-direction: column;
  padding-left: 3%;
  padding-top: 0%;
  padding-right: 3%;
  /* position: absolute; */
  /* top: -3%; */
}
.bodyCon .leftCon .left_11 {
  /* padding-top: 20%; */
  /* margin-top: 20%; */
  /* flex: 1; */
  /* background: url("../../../static/images/bg16.png") no-repeat; */
  /* margin-bottom: 10px; */
  /* background-size: 5% 8%; */
  /* padding-top: 10%; */
  /* display: flex; */
  /* justify-content: center; */
  /* align-items: center; */
  display: flex;
  align-items: flex-end;
}
.bodyCon .leftCon .left_1 {
  flex: 6;
  background: url("../../../static/images/bg11.png") no-repeat;
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
.left {
  display: 1;
  margin-top: 0px;
}
.left_11 > img {
  width: 5%;
  height: 25%;
  cursor: pointer;
}
.left > img {
  width: 5%;
  cursor: pointer;
}
.center_1 > img {
  width: 3%;
  height: 25%;
  cursor: pointer;
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
  padding-top: 0%;
  padding-right: 10px;
}
.bodyCon .centerCon .center_1 {
  display: flex;
  align-items: flex-end;
  /* flex: 1; */
  /* height: 85%; */
  /* background: tomato; */
  /* background: url("../../../static/images/bg16.png") no-repeat; */
  /* background-size: 5% 8%;
  margin-bottom: 2%; */
}

.bodyCon .centerCon .center_2 {
  flex: 1;
  /* height: 85%; */
  /* background: tomato; */
  background: url("../../../static/images/bg10.png") no-repeat;
  background-size: 100% 100%;
  margin-bottom: 2%;
  margin-right: 4%;
}
.center_22,
.center_33 {
  display: flex;
}
.bodyCon .centerCon .center_3 {
  display: flex;
  flex: 0.5;
  /* height: 15%; */
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
.bodyCon .rightCon .right_1 .time span {
  color: white;
  display: inline-block;
  /* border-right: 1px solid #00F2F1; */
  width: 2vw;
  height: 12px;
  line-height: 12px;
  text-align: center;
  border-right: 1px solid #00f2f1;

  /* margin-right: 10px; */
}
.bodyCon .rightCon .right_1 .time span:last-child {
  border: none;
}
.bodyCon .rightCon .right_1 .time .day {
  color: #293983;
}

.bodyCon .rightCon .right_1 .time {
  flex: 1;
  padding-left: 5%;
  padding-top: 2.5%;
}
.bodyCon .rightCon .right_1 .rightData {
  flex: 3;
  display: flex;
  padding-left: 5.5%;
  padding-top: 2.5%;
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
}
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
.box5,
.box6 {
  /* width: 30%; */
  /* height: 40%; */
  /* line-height:40%; */

  color: white;
  /* float: left; */
  margin-right: 30px;
  margin-left: 10px;
  text-align: center;
  margin-bottom: 20px;
}

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
.sp5 {
  font-size: 35px;
  font-weight: bold;
}
</style>

