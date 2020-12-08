<template>
  <div class="vehCon">
    <div class="appContainer">
      <div class="big_head_bottom_line"></div>
      <!-- <div class="btnDiv" v-if="isShowBtn"> -->
      <button class="backBtn" @click="goAllData()">返回综合数据</button>
      <div class="title_img">
        <div class="font_size">车用气瓶大数据中心</div>
      </div>
      <!-- </div> -->

      <div class="bodyCon">
        <!-- 左边 -->
        <div class="left_1">
          <!-- 基本信息 -->
          <div class="jiben">
            <div>
              <img class="img_da" src="./biao.png" alt />
              <span class="font_color">气瓶信息</span>
            </div>
            <div>
              <shuju :liNum="liNum"></shuju>
            </div>
          </div>
          <div class="jiben">
            <div>
              <img class="img_da" src="./biao.png" alt />
              <span class="font_color">气瓶数量占比</span>
            </div>
            <div>
              <bingtu></bingtu>
            </div>
          </div>
        </div>
        <!-- 地图 -->
        <div class="centen_1">
          <div class="ditu">
            <chinaMap :heig="heig" :isnorMal="isnorMal"></chinaMap>
          </div>
          <div class="qu_xian">
            <zhuzhuan></zhuzhuan>
          </div>
        </div>
        <!-- 右边 -->
        <div class="right_1">
          <!-- 基本信息 -->
          <div class="right2">
            <div>
              <img class="img_da" src="./biao.png" alt />
              <span class="font_color">充装记录</span>
            </div>
            <div>
              <chongzhuang :liNum="liNum"></chongzhuang>
            </div>
          </div>
          <div class="right3">
            <div>
              <img class="img_da" src="./biao.png" alt />
              <span class="font_color">单位数量统计</span>
            </div>
            <div class="item_i">
              <div v-for="item in list" :key="item">

                <huanxing
                  :percentNum="item.a"
                  speed="3"
                  size="50"
                  color="#59B8D4"
                  @animationFinished="animationFinished"
                  backgroundColor="#c4dfa7"
                  :content="item.b"
                  icon="mail"
                ></huanxing>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import jilin from "../../data/jilin.json";
// import ditu from "../../data/ditu.json";
import img0 from "../../assets/images/buhege.svg";
import img1 from "../../assets/images/hege.svg";
import img2 from "../../assets/images/chaoqi.svg";
import img3 from "../../assets/images/jijiang.svg";
// let echarts = require("echarts/lib/echarts");
import $ from "jquery";

import chinaMapByCar from "../chinaMap/chinaMapByCar";
import bingtu from "./bingtu";
import huanxing from "./huanxing";
import zhuzhuan from "../liquefied/liquefiedComponents/barChart";
import shuju from "./shuju";
import chongzhuang from "./chongzhuang";
import chinaMap from "../chinaMap/chinaMap";
// const padDate = function(value) {
//   return value < 10 ? `0${value}` : value;
// };
export default {
  name: "Home",
  data() {
    return {
      liNum: 0,
      activeName: "first",
      activeNames: "chongzhuan",
      y: "50%",
      sty: "width:100%;height:42vh",
      list: [
        { a: 50, b: "使用单位" },
        { a: 30, b: "制造单位" },
        { a: 80, b: "充装单位" },
        { a: 20, b: "配送单位" },
        { a: 40, b: "检验单位" },
        { a: 60, b: "气瓶总数" },
      ],
    };
  },
  created() {
    if (this.$route.path == "/allMap") {
      this.liNum = 3;
      this.y = "50%";
      this.barChartSty = "width: 100%;height:20vh;";
      this.doFontSize = "font-size:16px !important";
      this.isnorMal = false;
    }
    console.log(this.$route.path);
    // liNum
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleClicks(tab, event) {},
  },
  props: {
    heig: {
      type: String,
      default: "width:100%;height:32vh",
    },

    // doFontSize:{
    //   type:String,
    //   default:"font-size:28px"
    // }
  },
  components: {
    chinaMapByCar,
    bingtu,
    huanxing,
    zhuzhuan,
    shuju,
    chongzhuang,
    chinaMap,
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
* {
  margin: 0;
  padding: 0;
}
.imgss {
  width: 30%;
}
.right2 {
  /* flex: 3.5; */
  margin-bottom: 10px;
}
.right3 {
  flex: 1.8;
}
.bodyCon {
  display: flex;
  margin-top: 30px;
  align-content: center;
  justify-content: center;
  width: 100%;
  height: 92%;
  position: relative;
  top: -3%;
}
.bodyCon div {
  /* flex: 1; */
}
.item_i {
  width: 100%;
  display: flex;
  align-content: center;
  flex-wrap: wrap;
  justify-content: space-between;
}
.item_i div {
  width: 10vw;
}
>>> .el-tabs__item {
  color: #fff;
}
>>> .el-tabs__item.is-active {
  color: #59b8d4;
}
/* >>> .radial-indicator-container{
  width: 10%;

} */
.f_size {
  font-size: 12px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: rgba(34, 101, 107, 1);
}
.img_da {
  width: 95%;
}
.titles {
  width: 300px;
  margin: 0 auto;
}
.titles_bt {
  width: 300px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  margin-bottom: 50px;
}
.fud {
  width: 148px;
  color: #fff;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
}
.font_color {
  width: 100%;
  display: block;
  float: left;
  margin-top: -32px;
  margin-left: 25px;
  font-size: 16px;
  font-family: Source Han Sans CN;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  line-height: 22px;
}
.title_img {
  width: 100%;
  height: 8vh;
  background: url("./cy_title.png") no-repeat;
  margin-top: -20px;
  background-size: 20% 80%;
  background-position: 50% 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.font_size {
  font-size: 20px;
  font-family: SourceHanSansCN-Bold;
  font-weight: bold;
  color: rgba(255, 255, 255, 1);
}
#particles-js {
  width: 100%;
  height: 100vh;
  position: absolute;
}
.appContainer {
  height: 90vh;
}
/* //设置absolute,其他DIV设置为relative，这样这个例子效果就作为背景 */

.backBtn {
  padding: 5px 10px;
  position: relative;
  top: 20px;
  z-index: 9999;
}

.box {
  position: absolute;
  width: 100%;
  height: 100vh;
  top: 10%;
  /* left: 5%;
  top: 10%; */
  /* background-color: rgba(24, 27, 52, 0.62); */
}

.chart {
  position: relative;
  height: 60%;
  /* top: 10%; */
}
.btnDiv {
  display: flex;
  /* flex-direction: row-reverse; */
}
.backBtn {
  margin-left: 20px;
  /* position: absolute;
  top: 0; */
  background-color: #00c298;
  border: 0;
  color: #fff;
  height: 27px;
  font-family: Microsoft Yahei;
  font-size: 1em;
  cursor: pointer;
}

.myBlog a {
  text-decoration: none;
  display: inline-block;
  color: #fff;
  padding: 5px;
  font-size: 1em;
}

.myBlog a img {
  vertical-align: middle;
  height: 10px;
  width: 10px;
  border-radius: 50%;
  /* margin: -5px 5px auto auto; */
}
.vehCon {
  overflow-y: hidden;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  background-image: url("../../assets/images/bg02.png");
  background-repeat: no-repeat;
  /* background-size: cover; */
  height: 100%;
  /* background-position: center center; */
  /* background-size: 100% 100%; */
  /* background-color: rgba(10, 2, 24, 1); */
  position: relative;
}
.big_head {
  position: relative;
  padding-top: 10px;
  height: 60px;
}
.big_head_title {
  line-height: 28px;
  font-size: 20px;
  text-align: center;
  /* color: rgba(220, 250, 250, 1); */
  color: rgb(35, 205, 253);
}
.big_right_chart2_title {
  line-height: 28px;
  font-size: 20px;
  text-align: center;
  /* color: rgba(220, 250, 250, 1); */
  color: rgb(35, 205, 253);
}
.big_head_date {
  position: absolute;
  left: 5%;
  bottom: 45%;
  /* border-bottom: 3px solid rgba(35, 205, 253, 1); */
  color: rgba(35, 205, 253, 1);
  font-size: 18px;
  /* line-height: 22px; */
}
._tq {
  position: absolute;
  bottom: 45%;
  right: 5%;
  color: rgb(35, 205, 253);
  font-size: 16px;
}
.big_left_chart1_title {
  line-height: 28px;
  font-size: 20px;
  font-weight: bold;
  color: rgba(35, 205, 253, 1);
  text-align: center;
}
.span {
  text-align: center;
  font-size: 12px;
  color: white;
}
.img {
  text-align: center;
}
.imgs {
  width: 35%;
}
.elb1 {
  /* margin: 10px 10px; */
  width: 100%;
  font-size: 12px;
  transform: scale(0.9);
}
.el-button {
  padding: 3px 2px;
}
.left_1 {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-left: 10px;
  padding-right: 10px;
}
.right_1 {
  display: flex;
  flex-direction: column;
  padding-right: 10px;
}
.qu_xian {
  width: 100%;
  height: 280px;
  flex: 1;
  border: 1px solid rgba(89, 184, 212, 1);
  margin-top: 50px;
}
.centen_1 {
  display: flex;
  flex: 1.7;
  flex-direction: column;
  padding-right: 10px;
  /* background-color:orange; */
}
.jiben {
  width: 100%;
}
.ditu {
  width: 100%;
  flex: 3;
  height: 400px;
  background: url("./biankuan.png") no-repeat;
  background-size: 100% 100%;
}
.anchorBL {
  display: none !important;
}
</style>

