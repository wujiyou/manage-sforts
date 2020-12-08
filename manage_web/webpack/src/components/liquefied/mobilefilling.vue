<template>
  <div class="container" :style="bg">
    <!-- <vue-particles
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
    ></vue-particles>-->
    <!-- 头部 -->
    <header class="headTitle">
      <div class="left" @click="lefts()">
        <!-- <img src="../../../static/images/mobilefilling/a.png" alt /> -->
      </div>
      <div class="center">{{proAdress}}移动充装大数据中心</div>
      <!-- {{date | formatDate}}  2020-08-01 11:13:16-->
      <div class="right">{{date | formatDate}}</div>
    </header>

    <!-- 中间部分 -->
    <div class="content">
       <div class="left_12">
          <img src="../../../static/images/bg18.png" :style="imgNone" />
        </div>
      <!-- 中间头部 -->
      <div class="content_top">
        <div class="content_top_left text">
          <p class="content_top_left_text" :style="fanxian">单位统计</p>
          <div>
            <div
              style="flex:4;display: flex;justify-content: center;margin-left:90px;margin-bottom:10px"
            >
              <div>
                <!-- font-size:28px;color:white -->
                <p class="fjian" :style="fanjian">{{danwei[3]}}</p>
                <p>
                  <span
                    style="display:inline-block;width:6px;height:13px;background:rgba(237,63,53,1);border-radius:3px;"
                  ></span>
                  <span style="color:#61A7FE;height:13px;">检验单位</span>
                </p>
              </div>

              <div>
                <p class="fjian" :style="fanjian">{{danwei[2]}}</p>
                <p>
                  <span
                    style="display:inline-block;width:6px;height:13px;background:rgba(234,207,25,1);border-radius:3px;"
                  ></span>
                  <span style="color:#61A7FE;height:13px;">充装单位</span>
                </p>
              </div>
              <!-- style="display: flex;justify-content: right;" -->
              <div>
                <p class="fjian" :style="fanjian">{{danwei[4]}}</p>
                <p>
                  <span
                    style="display:inline-block;width:6px;height:13px;background:rgba(106,204,163,1);border-radius:3px;"
                  ></span>
                  <span style="color:#61A7FE;height:13px;">使用单位</span>
                </p>
                <!-- <div></div>
                <div></div>
                <div>
                </div>-->
              </div>
              <div>&nbsp;</div>
            </div>
            <div class="content_top_left_box">
              <div class="box_1">
                <mobiletopbar :barChartSty="barChartSty"></mobiletopbar>
              </div>
              <div class="box_2">
                <moblietopzexian :barChartSty="barChartSty"></moblietopzexian>
              </div>
            </div>
          </div>
        </div>
        <div class="content_top_right text">
          <p class="content_top_left_text" :style="fanxian">档案统计</p>
          <div class="box_top1">
            <!-- <mobliebarbar :isnorMal="isnorMal"></mobliebarbar> -->
            <mobliepie class="box_bottom"></mobliepie>
          </div>
          <div class="box_top2">
            <mobliezexian :isnorMal="isnorMal" :barChartSty="barChartSty"></mobliezexian>
          </div>
        </div>
      </div>
      <!-- 中间底部 -->
      <div class="content_bottom">
        <div class="content_bottom_1 bottom_content top_text">
          <p class="content_bottom_1_1" :style="fanxianxian">单位充装次数统计</p>
          <div class="box_bottom">
            <!-- <mobliebar class="box_bottom"></mobliebar> -->
            <mobilebottom class="box_bottom"></mobilebottom>
          </div>
        </div>
        <div class="content_bottom_2 bottom_content top_text">
          <p class="content_bottom_1_1" :style="fanxianxian">检测变更记录</p>
          <div class="box_bottom table_box">
            <horseRaces :liNum="liNum"></horseRaces>
          </div>
        </div>
        <div class="content_bottom_3 bottom_content top_text">
          <p class="content_bottom_1_1" :style="fanxianxian">地图展示</p>
          <div class="box_bottom">
            <template v-if="type==0">
              <czatlas :heis="heis"></czatlas>
            </template>

            <template v-else-if="type==1">
              <gdProviceMap
                :heig="heig"
                :isnorMal="isnorMal"
                :mapId="'454545454'"
                :proviceName="provincesAdress"
                :areaType="1"
              ></gdProviceMap>
            </template>

            <template v-else-if="type==2">
              <!-- <template v-if="isShowProAdress">
                <lzxqCityMap
                  v-show="!allShow"
                  :heigs="heigs"
                  :isnorMal="isnorMal"
                  :areaType="1"
                  :mapId="'sdjk121231'"
                  :cityName="provincesAdress"
                  :CommitType="'TOLIQCITY1'"
                ></lzxqCityMap>
                <smallLzxqMap v-show="allShow"></smallLzxqMap>
              </template>
              <template v-else>
                <gdCityMap
                  :heig="heig"
                  :isnorMal="isnorMal"
                  :areaType="1"
                  :mapId="'qwqe1221'"
                  :cityName="provincesAdress"
                ></gdCityMap>
              </template> -->
              <gdCityMap :heig="heig" :isnorMal="isnorMal" :areaType="1" :mapId="'87897'" :cityName="provincesAdress"></gdCityMap>
            </template>

            <template v-else-if="type==3">
              <countyMap
                :heig="heig"
                :isnorMal="isnorMal"
                :mapId="'qww3233'"
                :areaType="1"
                :cityName="provincesAdress"
                :citCode="citCode"
              ></countyMap>
            </template>
          </div>
        </div>
        <div class="content_bottom_4 bottom_content top_text">
          <p class="content_bottom_1_1" :style="fanxianxian">档案信息</p>
          <div class="box_bottom">
            <horses :liNum="liNum"></horses>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import roles from "@/components/role/roles"
import mobilebottom from "@/components/liquefied/mobliemodule/mobliebottom";
import mobliebar from "@/components/liquefied/mobliemodule/mobliebar";
import mobliepie from "@/components/liquefied/mobliemodule/mobliepie";
import mobliezexian from "@/components/liquefied/mobliemodule/mobliezexian";
import mobiletopbar from "@/components/liquefied/mobliemodule/mobiletopbar";
import moblietopzexian from "@/components/liquefied/mobliemodule/moblietopzexian";
import mobliebarbar from "@/components/liquefied/mobliemodule/mobliebarbar";
import horseRaces from "@/components/liquefied/mobliemodule/horseRaces";
import horses from "@/components/liquefied/mobliemodule/horses";
import chinaMap from "../chinaMap/chinaMap";
import czatlas from "@/components/liquefied/mobliemodule/czatlas";
import gdProviceMap from "../chinaMap/gdProviceMap";
import gdCityMap from "../chinaMap/gdCityMap";
import countyMap from "../chinaMap/countyMap";
import lzxqCityMap from "../chinaMap/lzxqCityMap";
import smallLzxqMap from "../chinaMap/smallLzxqMap";
const padDate = function (value) {
  return value < 10 ? `0${value}` : value;
};
export default {
  name: "mobilefilling",
  data() {
    return {
      liNum: 0,
      date: new Date(),
      fanjian: "",
      fanxianxian: "",
      imgNone:"",
      fanxian: "",
      isnorMal: true,
      danwei: [],
      proAdress: "",
      heis: "height:30vh",
      barChartSty: "width:100%;height:22vh;",
      type: "",
      allShow: false,
      provincesAdress: "",
      proAdresss: "",
      code: "",
      citCode: "",
    };
  },
  props: {
    bg: {
      type: String,
      default:
        "background: url('../../../static/images/mobilefilling/bgcolor.png') no-repeat;background-size: 100% 100%;",
    },
    heig: {
      type: String,
      default: "width:100%;height:30vh",
    },
    heigs:{
      type: String,
      default: "width:100%;height:30vh",
    },
  },
  created() {
    this.provincesAdress = sessionStorage.getItem("proName");
    this.proAdresss = sessionStorage.getItem("proName");
    if (sessionStorage.getItem("proName") == "兰州新区") {
      this.isShowProAdress = true;
    }
    console.log(this.proAdress);
    console.log(this.isShowProAdress);
    this.type = sessionStorage.getItem("type");
    this.code = sessionStorage.getItem("areCode");
    this.citCode = sessionStorage.getItem("citCode");

    this.proAdress = sessionStorage.getItem("proName");
    this.danweij();
    const _this = this;
    this.timer = setInterval(function () {
      _this.date = new Date();
    }, 1000);
    if (this.$route.path == "/allMap") {
      this.liNum = 3;
      this.fanjian = "font-size:14px;color:white";
      this.fanxianxian = "position: absolute;top:-0.8%;color: white;";
      this.fanxian = "position: absolute;top:-1%;color: white;";
      this.imgNone = "display:none";
      this.isnorMal = false;
      this.heis = "height:15vh";
      this.barChartSty = "width: 100%;height:20vh;";
      // this.heig="height:10vh"
      // this.y="50%"
      // this.barChartSty="width: 100%;height:20vh;"
      // this.doFontSize="font-size:16px !important"
      // this.isnorMal=false
    }
    console.log(this.$route.path);
    // liNum
  },
  filters: {
    formatDate: function (value) {
      const date = new Date(value);
      const year = date.getFullYear();
      const month = padDate(date.getMonth() + 1);
      const day = padDate(date.getDate());
      const hours = padDate(date.getHours());
      const minutes = padDate(date.getMinutes());
      const seconds = padDate(date.getSeconds());
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    },
  },
  mounted() {},
  components: {
    mobilebottom,
    mobliebar,
    mobliepie,
    mobliezexian,
    mobiletopbar,
    moblietopzexian,
    mobliebarbar,
    horseRaces,
    czatlas,
    horses,
    chinaMap,
    gdProviceMap,
    gdCityMap,
    countyMap,
    lzxqCityMap,
    smallLzxqMap
  },
  // 时间
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  },
  methods: {
    async danweij() {
      const res = await this.$http.get(`/data/unit?bottleType=3&code=`);
      console.log(res);
      var obj = res.data.data;
      var arr1 = [];
      for (var k in obj) {
        arr1.push(obj[k]);
      }
      this.danwei = arr1;
      console.log(this.danwei);
    },
    lefts() {
      this.$router.push("/allMap");
    },
  },
};
</script>


<style scoped>
.container {
  /* overflow-y: hidden; */
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
  position: relative;
  /* background: url("../../../static/images/mobilefilling/bgcolor.png") no-repeat;
  background-size: 100% 100%; */
  /* background-color: #030718; */
}
.headTitle {
  width: 100%;
  height: 7vh;
  background: url("../../../static/images/mobilefilling/head.png") no-repeat;
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
  padding-left: 15px;
}
.headTitle .center {
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  background: linear-gradient(to right, #00afff, #295aaa);
  -webkit-background-clip: text;
  color: transparent;
}
.headTitle .right {
  text-align: right;
  padding-right: 15px;
  color: white;
}

.fjian {
  font-size: 28px;
  color: white;
}

.content {
  /* display: flex; */
  width: 100%;
  height: 50%;
  padding-bottom: 10px;
  position: relative;
}
.content_top {
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 80%;
  margin-top:-20px;
  padding-bottom: 10px;
  position: relative;
}
.left_12 > img {
  width: 25%;
  height: 5vh;
  cursor: pointer;
}
.content div {
  flex: 1;
}
.content_top_left {
  margin: 10px 10px;
  flex: 4;
  background: url("../../../static/images/mobilefilling/c.png") no-repeat;
  margin-bottom: 10px;
  background-size: 100% 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.content_top_right {
  flex: 4;
  margin: 10px 10px;
  background: url("../../../static/images/mobilefilling/c.png") no-repeat;
  margin-bottom: 10px;
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.content_top_left_box {
  flex: 4;
  display: flex;
  justify-content: center;
  align-items: center;
}

.content_bottom {
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 92%;
  margin-top: 20px;
  padding-bottom: 10px;
  position: relative;
}
.bottom_content {
  flex: 4;
  margin: 5px 10px;
  background: url("../../../static/images/mobilefilling/7.png") no-repeat;
  margin-bottom: 10px;
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.left {
  display: 1;
  margin-top: 40px;
  /* height: 1vh;
  background: url("../../../static/images/mobilefilling/b.png") no-repeat;
  
  background-size:cover;
  display: flex;
  justify-content: center;
  align-items: center; */
}
.left > img {
  width: 4%;
  cursor: pointer;
}
.top_text {
  position: relative;
}
.content_bottom_1_1 {
  position: absolute;
  /* display: inline-block; */
  top: 2%;
  color: white;
}
.text {
  position: relative;
}
.content_top_left_text {
  position: absolute;
  /* display: inline-block; */
  top: 1%;
  color: white;
  /* font-size: 16px; */
}
.box_bottom {
  display: flex;
  justify-content: center;
  align-items: center;
}
.table_box {
  /* margin:2px 10pxmaring */
  margin-left: 15px;
  margin-right: 15px;
}
/* .table_box > table > tr td {
  
  color: #ffffff;
} */
.tr_img {
  /* flex: 4; */
  background: url("../../../static/images/mobilefilling/2.png") no-repeat;
  /* margin-bottom: 10px; */
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  /* padding: 2px 1px; */
  /* width: 100%; */
}
.tr_img td {
  /* width: 100%; */
  padding: 5px 2px;
  /* padding: 5px 1px; */
}
/* @media only screen and (min-width: 956px) {
  .content_bottom_1_1 {
    position: absolute;
    top: -1px;
    color: white;
    font-size: 12px;
    transform: scale(0.7);
  }
} */
/* @media only screen and (min-width: 400px) {
  .content_bottom_1_1 {
    position: absolute;
    
    top: 5px;
    color: white;
    font-size: 18px;
  }
} */
</style>

