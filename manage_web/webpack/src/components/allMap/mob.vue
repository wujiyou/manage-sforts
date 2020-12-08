<template>
  <div class="container">
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
      <div class="center">移动充装大数据中心</div>
      <div class="right">2020-08-01 11:13:16</div>
    </header>

    <!-- 中间部分 -->
    <div class="content">
      <!-- 中间头部 -->
      <div class="content_top">
        <div class="content_top_left text">
          <p class="content_top_left_text" :style="fanxian">单位统计</p>
          <div>
            <div style="flex:4;display: flex;justify-content: center;margin-left:90px;margin-bottom:10px">
              <div>
                <p :style="fanjian">27</p>
                <p>
                  <span
                    style="display:inline-block;width:6px;height:13px;background:rgba(237,63,53,1);border-radius:3px;"
                  ></span>
                  <span style="color:#61A7FE;height:13px;">检验单位</span>
                </p>
              </div>
              <div>
                <p :style="fanjian">187</p>
                <p>
                  <span
                    style="display:inline-block;width:6px;height:13px;background:rgba(234,207,25,1);border-radius:3px;"
                  ></span>
                  <span style="color:#61A7FE;height:13px;">充装单位</span>
                </p>
              </div>
              <!-- style="display: flex;justify-content: right;" -->
              <div >
                 <p :style="fanjian">65</p>
                  <p>
                    <span
                      style="display:inline-block;width:6px;height:13px;background:rgba(106,204,163,1);border-radius:3px;"
                    ></span>
                    <span style="color:#61A7FE;height:13px;">使用单位</span>
                  </p>
                <!-- <div></div>
                <div></div>
                <div>
                </div> -->
              </div>
              <div>
                &nbsp;
              </div>
            </div>
            <div class="content_top_left_box">
              <div class="box_1">
                <mobiletopbar></mobiletopbar>
              </div>
              <div class="box_2">
                <moblietopzexian></moblietopzexian>
              </div>
            </div>
          </div>
        </div>
        <div  class="content_top_right text" >
          <p  class="content_top_left_text" :style="fanxian">档案统计</p>
          <div class="box_top1">
            <mobliebarbar :isnorMal="isnorMal"></mobliebarbar>
          </div>
          <div class="box_top2">
            <mobliezexian :isnorMal="isnorMal"></mobliezexian>
          </div>
        </div>
      </div>
      <!-- 中间底部 -->
      <div class="content_bottom">
        <div class="content_bottom_1 bottom_content top_text">
          <p class="content_bottom_1_1" :style="fanxianxian" >单位充装量统计</p>
          <div class="box_bottom">
            <mobliebar class="box_bottom" :isnorMal="isnorMal"></mobliebar>
          </div>
        </div>
        <div class="content_bottom_2 bottom_content top_text">
          <p class="content_bottom_1_1" :style="fanxianxian">检测变更记录</p>
          <div class="box_bottom table_box">
            <horseRaces :liNum="liNum"></horseRaces>
            
          </div>
        </div>
        <div class="content_bottom_3 bottom_content top_text">
          <p class="content_bottom_1_1" :style="fanxianxian">充装站的加气比例</p>
          <div class="box_bottom">
            <mobilebottom class="box_bottom"></mobilebottom>
          </div>
        </div>
        <div class="content_bottom_4 bottom_content top_text">
          <p class="content_bottom_1_1" :style="fanxianxian">档案状态</p>
          <div class="box_bottom">
            <mobliepie class="box_bottom"></mobliepie>
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
export default {
  name: "mobilefilling",
  data() {
    return {
       liNum:0,
      tabeData: [
        {
          date: "1",
          adress: "湖南省长沙市云达广场",
          ExceCode: "2020-02-12",
        },
        {
          date: "2",
          adress: "湖南省长沙市云达广场",
          ExceCode: "2020-02-12",
        },
        {
          date: "3",
          adress: "湖南省长沙市云达广场",
          ExceCode: "2020-02-12",
        },
        {
          date: "4",
          adress: "湖南省长沙市云达广场",
          ExceCode: "2020-02-12",
        },
      ],
       fanjian:"",
       fanxian:"",
       fanxianxian:"",
       isnorMal:true
    };
  },
    created () {
    if(this.$route.path=="/allMap"){
      this.liNum=3
       this.fanjian="font-size:14px;color:white"
       this.fanxian="position: absolute;top:-1%;color: white;"
       this.fanxianxian="position: absolute;top:-0.8%;color: white;"
       this.isnorMal=false
      // this.y="50%"
      // this.barChartSty="width: 100%;height:20vh;"
      // this.doFontSize="font-size:16px !important"
      // this.isnorMal=false
    }
    console.log(this.$route.path)
    // liNum
    
  },
  components: {
    mobilebottom,
    mobliebar,
    mobliepie,
    mobliezexian,
    mobiletopbar,
    moblietopzexian,
    mobliebarbar,
    horseRaces
  },
  methods: {
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
  /* background: url("../../../static/images/mobilefilling/bgcolor.png") no-repeat; */
  background-size: 100% 100%;
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
  margin-top: 20px;
  padding-bottom: 10px;
  position: relative;
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
.fjian{
  font-size:28px;color:white
}
.text {
  position: relative;
}
.content_top_left_text {
  position: absolute;
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

