<template>
  <div class="container">
     <button @click="goAllData()">返回综合数据</button>
    <!-- <nav-menu :menuFlag="menuFlag" :showMenu="showMenu" :hideMenu="hideMenu"></nav-menu> -->
    <div class="appContainer" @click="hideMenu">
      <div class="big_head">
        <div class="big_head_title">移动充装综合数据平台大数据</div>
        <!--<div class="big_head_bottom_line"></div>-->
        <div class="big_head_date">{{date | formatDate}}</div>
        <div class="fsmall gradient-text-one _tq">
          <span>今日</span>
          <span class="_tip_d">{{wd}}</span>
          <span>{{tq}}</span>
        </div>
      </div>
 
      <div class="big_left_chart1">
        <div class="big_left_chart1_title">
          统计数据
          <div class="big_heng_line"></div>
        </div>
        <div class="big_left_chart1_box">
          <div class="info-main">
            <div class="box1">
              <img
                src="~@/../static/images/a.png"
                alt
                class="img1"
                style="cursor:pointer;"
                @click="dialogTableVisible = true"
              />
              <span class="span1">充装站</span>
              <p id="listedCompany">{{this.cong}}</p>
            </div>
            <el-dialog title="查看信息" :visible.sync="dialogTableVisible">
              <span slot="title">
                <span style="color: #23cdfd">查看信息</span>
              </span>
              <el-table
                :data="gridData"
                border
                :row-style="{height:'40px'}"
                :cell-style="{padding:'0px'}"
              >
                <el-table-column show-overflow-tooltip prop="name" label="单位名称"></el-table-column>
                <el-table-column show-overflow-tooltip prop="licence" label="充装许可证号"></el-table-column>
                <!-- <el-table-column show-overflow-tooltip prop="division" label="行政区划"></el-table-column> -->
                <el-table-column show-overflow-tooltip prop="personnelName" label="负责人"></el-table-column>
                <el-table-column show-overflow-tooltip prop="phone" label="负责人联系电话"></el-table-column>
                <el-table-column show-overflow-tooltip prop="address" label="单位地址"></el-table-column>
                <el-table-column show-overflow-tooltip prop="unitIssueTime" label="发证日期">
                  <template slot-scope="socpe">{{socpe.row.unitIssueTime | fmtdate}}</template>
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="unitChangeTime" label="换证日期">
                  <template slot-scope="socpe">{{socpe.row.unitChangeTime | fmtdate}}</template>
                </el-table-column>
              </el-table>
              <!-- 4.分页 -->
              <!-- 》该接口支持分页 url参数中有pagenum，pagesize
          @size-change 每页显示条数变化时触发
          @current-change当前页改变时触发
          :current-page 设置当前页是第几页
           :page-sizes="[5, 10, 15, 20]"每页多少条的数据组
           :page-size="5"设置显示多少条
           :total="400"分页总数
              -->
              <el-pagination
                style="padding:5px 15px 15px 15px;display:flex; justify-content: flex-end;"
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currPage"
                :page-sizes="[10,15,20,25,30]"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
              ></el-pagination>
            </el-dialog>
            <div class="box2">
              <img
                src="~@/../static/images/h.png"
                alt
                class="img2"
                style="cursor:pointer;"
                @click="dialogTableVisible1 = true"
              />
              <span class="span2">使用单位</span>
              <p id="listedCompany1">{{this.shi}}</p>
            </div>
            <el-dialog title="查看信息" :visible.sync="dialogTableVisible1">
              <span slot="title">
                <span style="color: #23cdfd">查看信息</span>
              </span>
              <el-table border :data="gridData1">
                <el-table-column show-overflow-tooltip prop="name" label="单位名称"></el-table-column>
                <!-- <el-table-column show-overflow-tooltip prop="division" label="行政区划"></el-table-column> -->
                <el-table-column show-overflow-tooltip prop="personnelName" label="负责人"></el-table-column>
                <el-table-column show-overflow-tooltip prop="licence" label="特种设备许可证号"></el-table-column>
                <el-table-column show-overflow-tooltip prop="phone" label="负责人联系电话"></el-table-column>
                <el-table-column show-overflow-tooltip prop="address" label="单位地址"></el-table-column>
                <el-table-column show-overflow-tooltip prop="unitIssueTime" label="发证日期">
                  <template slot-scope="socpe">{{socpe.row.unitIssueTime | fmtdate}}</template>
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="unitChangeTime" label="换证日期">
                  <template slot-scope="socpe">{{socpe.row.unitChangeTime | fmtdate}}</template>
                </el-table-column>
              </el-table>
              <el-pagination
                style="padding:5px 15px 15px 15px;display:flex; justify-content: flex-end;"
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currPage"
                :page-sizes="[10,15,20,25,30]"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total1"
              ></el-pagination>
            </el-dialog>
            <div class="box3">
              <img
                src="~@/../static/images/g.png"
                alt
                class="img3"
                style="cursor:pointer;"
                @click="dialogTableVisible2 = true"
              />
              <span class="span3">罐车档案</span>
              <p id="listedCompany2">{{this.guan}}</p>
            </div>
            <el-dialog title="查看信息" :visible.sync="dialogTableVisible2">
              <span slot="title">
                <span style="color: #23cdfd">查看信息</span>
              </span>
              <el-table :data="gridData2" border>
                <el-table-column prop="regId" label="使用登记证号" width="180"></el-table-column>
                <el-table-column prop="carNum" label="车牌号" width="180"></el-table-column>
                <el-table-column prop="useUnit" label="使用单位名称"></el-table-column>
                <el-table-column prop="useCode" label="使用单位内部编号"></el-table-column>
                <el-table-column prop="makeCom" label="制造单位"></el-table-column>
                <el-table-column prop="medium" label="介质"></el-table-column>
                <el-table-column prop="volume" label="容积"></el-table-column>
                <el-table-column prop="nextCheckDate" label="下次检验日期"></el-table-column>
                <el-table-column prop="checkAllDate" label="下次全面检查日期"></el-table-column>
                <el-table-column prop="regDemo" label="注册代码"></el-table-column>
              </el-table>
              <el-pagination
                style="padding:5px 15px 15px 15px;display:flex; justify-content: flex-end;"
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currPage"
                :page-sizes="[10,15,20,25,30]"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total2"
              ></el-pagination>
            </el-dialog>
            <div class="box4">
              <img
                src="~@/../static/images/d.png"
                alt
                class="img4"
                style="cursor:pointer;"
                @click="dialogTableVisible3 = false"
              />
              <span class="span4">加气机数</span>
              <p id="listedCompany3">{{this.jia}}</p>
            </div>
            <el-dialog title="查看信息" :visible.sync="dialogTableVisible3">
              <span slot="title">
                <span style="color: #23cdfd">查看信息</span>
              </span>
              <el-table :data="gridData3" border>
                <el-table-column prop="name" label="加气单位名称" width="180"></el-table-column>
                <el-table-column prop="num" label="登记证号" width="180"></el-table-column>
                <el-table-column prop="number" label="气瓶编号"></el-table-column>
                <el-table-column prop="qiang" label="加气枪号"></el-table-column>
                <el-table-column prop="liang" label="加气量"></el-table-column>
                <el-table-column prop="time" label="加气时间"></el-table-column>
              </el-table>
              <el-pagination
                style="padding:5px 15px 15px 15px;display:flex; justify-content: flex-end;"
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currPage"
                :page-sizes="[10,15,20,25,30]"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total3"
              ></el-pagination>
            </el-dialog>
            <div class="box5">
              <img
                src="~@/../static/images/f.png"
                alt
                class="img5"
                style="cursor:pointer;"
                @click="dialogTableVisible4 = true"
              />
              <span class="span5">检验站</span>
              <p id="listedCompany4">{{this.jian}}</p>
            </div>
            <el-dialog title="查看信息" :visible.sync="dialogTableVisible4">
              <span slot="title">
                <span style="color: #23cdfd">查看信息</span>
              </span>
              <el-table border :data="gridData4">
                <el-table-column show-overflow-tooltip prop="name" label="单位名称"></el-table-column>
                <!-- <el-table-column show-overflow-tooltip prop="division" label="行政区划"></el-table-column> -->
                <el-table-column show-overflow-tooltip prop="personnelName" label="负责人"></el-table-column>
                <el-table-column show-overflow-tooltip prop="licence" label="特种设备许可证号"></el-table-column>
                <el-table-column show-overflow-tooltip prop="phone" label="负责人联系电话"></el-table-column>
                <el-table-column show-overflow-tooltip prop="address" label="单位地址"></el-table-column>
                <el-table-column show-overflow-tooltip prop="unitIssueTime" label="发证日期">
                  <template slot-scope="socpe">{{socpe.row.unitIssueTime | fmtdate}}</template>
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="unitChangeTime" label="换证日期">
                  <template slot-scope="socpe">{{socpe.row.unitChangeTime | fmtdate}}</template>
                </el-table-column>
              </el-table>
              <el-pagination
                style="padding:5px 15px 15px 15px;display:flex; justify-content: flex-end;"
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currPage"
                :page-sizes="[10,15,20,25,30]"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total4"
              ></el-pagination>
            </el-dialog>
            <div class="box6">
              <img
                src="~@/../static/images/c.png"
                alt
                class="img6"
                style="cursor:pointer;"
                @click="dialogTableVisible5 = true"
              />
              <span class="span6">发证员工</span>
              <p id="listedCompany5">{{this.fa}}</p>
            </div>
            <el-dialog title="查看信息" :visible.sync="dialogTableVisible5">
              <span slot="title">
                <span style="color: #23cdfd">查看信息</span>
              </span>
              <el-table border :data="gridData5">
                <el-table-column show-overflow-tooltip prop="name" label="单位名称"></el-table-column>
                <!-- <el-table-column show-overflow-tooltip prop="division" label="行政区划"></el-table-column> -->
                <el-table-column show-overflow-tooltip prop="personnelName" label="负责人"></el-table-column>
                <el-table-column show-overflow-tooltip prop="licence" label="特种设备许可证号"></el-table-column>
                <el-table-column show-overflow-tooltip prop="phone" label="负责人联系电话"></el-table-column>
                <el-table-column show-overflow-tooltip prop="address" label="单位地址"></el-table-column>
                <el-table-column show-overflow-tooltip prop="unitIssueTime" label="发证日期">
                  <template slot-scope="socpe">{{socpe.row.unitIssueTime | fmtdate}}</template>
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="unitChangeTime" label="换证日期">
                  <template slot-scope="socpe">{{socpe.row.unitChangeTime | fmtdate}}</template>
                </el-table-column>
              </el-table>
              <el-pagination
                style="padding:5px 15px 15px 15px;display:flex; justify-content: flex-end;"
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currPage"
                :page-sizes="[10,15,20,25,30]"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total5"
              ></el-pagination>
            </el-dialog>
          </div>
        </div>
      </div>
  
      <div>
        <div class="big_center_chart_title">
          移动加气充装记录
          <div class="big_heng_line"></div>
        </div>

        <el-table
          :data="gridData8"
          height="30%"
          :header-cell-style="{background:'rgb(29, 48, 115)',color:'#0087ed'}"
          :cell-style="{background:'rgb(29, 48, 115)',color:'#0087ed'}"
          style="width:55%;color:rgb(39, 160, 213);font-size:12px"
          class="big_center_chart"
          border
        >
          <el-table-column show-overflow-tooltip prop="unitName" label="充装站名称"></el-table-column>
          <el-table-column show-overflow-tooltip prop="czr" label="员工账号"></el-table-column>
          <el-table-column show-overflow-tooltip prop="regId" label="登记证号"></el-table-column>
          <el-table-column show-overflow-tooltip prop="gunId" label="加气枪号"></el-table-column>
          <el-table-column show-overflow-tooltip prop="controlId" label="设备号"></el-table-column>
          <el-table-column show-overflow-tooltip prop="fillTime" label="充气时间"></el-table-column>
          <!-- <el-table-column show-overflow-tooltip prop="appId" label="标签号"></el-table-column> -->
          <el-table-column show-overflow-tooltip prop="czl" label="充装量"></el-table-column>
          <el-table-column show-overflow-tooltip prop="carNumber" label="车牌号"></el-table-column>
          <!-- <el-table-column show-overflow-tooltip prop="gasId" label="气瓶编号"></el-table-column> -->
          <el-table-column show-overflow-tooltip prop="nextCheckDate" label="下次检验时间"></el-table-column>

          <!-- <el-table-column show-overflow-tooltip prop="state" label="状态">
            <template slot-scope="scope">
              <p v-if="gridData[scope.$index].state==0">正常</p>
              <p v-if="gridData[scope.$index].state==1">特权卡充装</p>
              <p v-if="gridData[scope.$index].state==2">未授权充装</p>
            </template>
          </el-table-column>-->
          <!-- <el-table-column show-overflow-tooltip prop="unitIssueTime" label="发证日期">
            <template slot-scope="socpe">{{socpe.row.unitIssueTime | fmtdate}}</template>
          </el-table-column>
          <el-table-column show-overflow-tooltip prop="unitChangeTime" label="换证日期">
            <template slot-scope="socpe">{{socpe.row.unitChangeTime | fmtdate}}</template>
          </el-table-column>-->
        </el-table>
      </div>
      <div class="big_right_chart1">
        <div class="big_right_chart1_title">
          本月气站活跃情况
          <div class="big_heng_line"></div>
        </div>
        <div class="big_right_chart1_box">
          <div id="myChart3" :style="{width: '100%', height: '100%'}"></div>
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
let echarts = require("echarts/lib/echarts");
const padDate = function(value) {
  return value < 10 ? `0${value}` : value;
};
export default {
  name: "Home",
  data() {
    return {
      center: { lng: 112.94086156659164, lat: 28.23351373249851 }, //经纬度
      zoom: 11, //地图展示级别
      // location: "长沙市",
      dialogVisible: false,
      keyword: "请输入搜索关键字",
      markerPoint: [], //数据
      text: "", //传的单条数据
      total: -1,
      total1: -1,
      total2: -1,
      total3: -1,
      total4: -1,
      total5: -1,
      currPage: 1,
      page: 1,
      pageSize: 10,
      userlist: [],
      tishi: {
        buhege: img0,
        hege: img1,
        chaoqi: img2,
        weijian: img3
      },
      date: new Date(),
      wd: "",
      tq: "",
      menuFlag: "0",
      mapStyle: {
        styleJson: [
          {
            featureType: "land",
            elementType: "geometry",
            stylers: {
              color: "#091220"
            }
          },
          {
            featureType: "building",
            elementType: "geometry",
            stylers: {
              color: "#2b2b2b"
            }
          },
          {
            featureType: "highway",
            elementType: "all",
            stylers: {
              lightness: -42,
              saturation: -91
            }
          },
          {
            featureType: "arterial",
            elementType: "geometry",
            stylers: {
              lightness: -77,
              saturation: -94
            }
          },
          {
            featureType: "green",
            elementType: "geometry",
            stylers: {
              color: "#1b1b1b"
            }
          },
          {
            featureType: "water",
            elementType: "geometry",
            stylers: {
              color: "#181818"
            }
          },
          {
            featureType: "subway",
            elementType: "geometry.stroke",
            stylers: {
              color: "#181818"
            }
          },
          {
            featureType: "railway",
            elementType: "geometry",
            stylers: {
              lightness: -52
            }
          },
          {
            featureType: "all",
            elementType: "labels.text.stroke",
            stylers: {
              color: "#313131"
            }
          },
          {
            featureType: "all",
            elementType: "labels.text.fill",
            stylers: {
              color: "#8b8787"
            }
          },
          {
            featureType: "manmade",
            elementType: "geometry",
            stylers: {
              color: "#1b1b1b"
            }
          },
          {
            featureType: "local",
            elementType: "geometry",
            stylers: {
              lightness: -75,
              saturation: -91
            }
          },
          {
            featureType: "subway",
            elementType: "geometry",
            stylers: {
              lightness: -65
            }
          },
          {
            featureType: "railway",
            elementType: "all",
            stylers: {
              lightness: -40
            }
          },
          {
            featureType: "boundary",
            elementType: "geometry",
            stylers: {
              color: "#8b8787",
              weight: "1",
              lightness: -29
            }
          }
        ]
      },
      // myChart: undefined,
      // myChart2: undefined,
      myChart3: undefined,
      // myChart4: undefined,
      // tableData: [],
      gridData: [],
      gridData1: [],
      gridData2: [],
      gridData3: [],
      gridData4: [],
      gridData5: [],
      gridData6: [],
      gridData7: [],
      gridData8: [],
      dialogTableVisible: false,
      dialogTableVisible1: false,
      dialogTableVisible2: false,
      dialogTableVisible3: false,
      dialogTableVisible4: false,
      dialogTableVisible5: false,
      dialogTableVisible6: false,
      dialogTableVisible7: false,
      cong: "",
      guan: "",
      shi: "",
      jian: "",
      fa: "",
      deng: "",
      jia: "",
      hei: "",
      gui: "",
      hege: "",
      bhege: "",
      yuqi: ""
    };
  },
  async created() {
    this.change1();
    this.change2();
    this.change3();
    this.change4();
    this.change5();
    this.change6();
    const res6 = await this.$http.get(`/stats/map`);
    console.log(res6);
    this.markerPoint = res6.data.data;

    this.markerPoint.forEach(e => {
      if (e.status == "0") {
        e.status = img0;
      } else if (e.status == "1") {
        e.status = img1;
      } else if (e.status == "2") {
        e.status = img2;
      } else if (e.status == "3") {
        e.status = img3;
      }
    });
  },
  // 时间
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
    }
  },
  mounted() {
    // console.log(ditu);
    this.getUserlist().then(data => {
      this.gui = data;
      const _this = this;
      this.timer = setInterval(function() {
        _this.date = new Date();
      }, 1000);
      this.$http
        .get("http://wthrcdn.etouch.cn/weather_mini?city=长沙")
        .then(res => {
          const tqMsg = res.data.data.forecast[0];
          this.wd =
            parseInt(tqMsg.low.split(" ")[1]) +
            " ~ " +
            tqMsg.high.split(" ")[1];
          this.tq = tqMsg.type;
          this.fx = tqMsg.fengxiang;
        });
      this.initChart();
      this.drawMap(jilin, "jilin");
      // this.drawMap2();
      this.drawMap3();
      // this.drawMap4();
    });
  },
  // 时间
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  },
  methods: {
     goAllData(){
      console.log("触发")
      this.$router.push("/data/allData")
    },
    async change1() {
      const res8 = await this.$http.get(`/stats/findByType/1`);
      this.hege = res8.data.data;

      //罐车档案数量
      const res9 = await this.$http.get(`/mobile-stats/documentNum`);
      this.guan = res9.data.data;
    },
    async change2() {
      const res9 = await this.$http.get(`/stats/findByType/0`);
      this.bhege = res9.data.data;

      //发证员工数量
      const res1 = await this.$http.get(`/mobile-stats/personnelNum`);
      this.fa = res1.data.data;
    },
    async change3() {
      //移动充装记录表
      const res = await this.$http.get(
        `/mobile-stats/fillRecord?pageSize=${this.pageSize}&currPage=${this.currPage}`
      );
      this.gridData8 = res.data.data.list;
      this.total = res.data.data.totalCount;

      const res10 = await this.$http.get(`/stats/findByType/2`);
      this.yuqi = res10.data.data;
    },
    async change4() {
      //充装站详细信息
      const res12 = await this.$http.get(
        `/mobile-stats/findUnit/2?pageSize=${this.pageSize}&currPage=${this.currPage}`
      );
      this.gridData = res12.data.data.list;
      this.total = res12.data.data.totalCount;

      //使用单位详细信息
      const res13 = await this.$http.get(
        `/mobile-stats/findUnit/4?pageSize=${this.pageSize}&currPage=${this.currPage}`
      );
      this.gridData1 = res13.data.data.list;
      this.total1 = res13.data.data.totalCount;

      //发证员工详细信息
      const res14 = await this.$http.get(
        `/mobile-stats/personnel?pageSize=${this.pageSize}&currPage=${this.currPage}`
      );
      this.gridData5 = res14.data.data.list;
      this.total5 = res14.data.data.totalCount;

      //检验站详细信息
      const res11 = await this.$http.get(
        `/mobile-stats/findUnit/3?pageSize=${this.pageSize}&currPage=${this.currPage}`
      );
      this.gridData4 = res11.data.data.list;
      this.total4 = res11.data.data.totalCount;

      //罐车档案详细信息
      const res10 = await this.$http.get(
        `/mobile-stats/document?pageSize=${this.pageSize}&currPage=${this.currPage}`
      );
      console.log(res10);

      this.gridData2 = res10.data.data.list;
      this.total2 = res10.data.data.totalCount;
    },
    async change5() {
      const res15 = await this.$http.get(`/stats/findByTypeAndUnit/0`);
      this.gridData6 = res15.data.data;   

      const res16 = await this.$http.get(`/stats/findByTypeAndUnit/2`);
      this.gridData7 = res16.data.data;
    },
    async change6() {},
    //百度地图初始化
    handler({ BMap, map }) {},
    // 关闭信息窗口 @close 自带的方法
    infoWindowClose(e) {
      this.text = "";
    },
    //首先点击marker时开启信息窗口
    infoWindowOpen(e) {
      if (this.text !== e) {
        console.log(this.text);
        this.text = e;
      } else {
        console.log(this.text);
        this.text = "";
      }
    },
    //点击获取到当前经纬度
    getClickInfo(e) {
      console.log(e.point.lng);
      console.log(e.point.lat);
      this.center.lng = e.point.lng;
      this.center.lat = e.point.lat;
    },
    //双向绑定经纬度以及缩放尺寸
    syncCenterAndZoom(e) {
      const { lng, lat } = e.target.getCenter();
      this.center.lng = lng;
      this.center.lat = lat;
      // this.zoom = e.target.getZoom();
    },
    //经纬度同步
    baidumap() {
      this.baiduDevicelocationx = this.center.lng;
      this.baiduDevicelocationy = this.center.lat;
    },
    hideMenu() {
      if (this.menuFlag === "1") {
        this.menuFlag = "0";
      }
    },
    showMenu() {
      if (this.menuFlag === "0") {
        this.menuFlag = "1";
      }
    },
    showMessage() {
      console.log(1);
    },
    initChart() {
      // 基于准备好的dom，初始化echarts实例
      // this.myChart = echarts.init(document.getElementById("myChart"));
      // this.myChart1 = echarts.init(document.getElementById("myChart1"));
      // this.myChart2 = echarts.init(document.getElementById("myChart2"));
      this.myChart3 = echarts.init(document.getElementById("myChart3"));
      // this.myChart4 = echarts.init(document.getElementById("myChart4"));
    },
    // drawMap2() {
    // const _this = this;

    //   const option = {
    //     grid: {
    //       top: "5%",
    //       bottom: "20%",
    //       left: "15%",
    //       right: "0%"
    //     },
    //     series: [
    //       {
    //         name: "面积模式",
    //         type: "pie",
    //         radius: [30, "50%"],
    //         center: ["50%", "50%"],
    //         label: {
    //           color: "#fff",
    //           fontSize: 12
    //         },
    //         data: [
    //           {
    //             value: 50,
    //             name: "湖南长沙50%",
    //             itemStyle: {
    //               color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
    //                 { offset: 0, color: "rgba(235,101,47,1)" },
    //                 { offset: 1, color: "rgba(247,153,58,1)" }
    //               ])
    //             }
    //           },
    //           {
    //             value: 35,
    //             name: "宜春市制造单位35%",
    //             itemStyle: {
    //               color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
    //                 { offset: 0, color: "rgba(231,231,50,1)" },
    //                 { offset: 1, color: "rgba(231,231,50,0.8)" }
    //               ])
    //             }
    //           },
    //           {
    //             value: 15,
    //             name: "包头市监督机构15%",
    //             itemStyle: {
    //               color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
    //                 { offset: 0, color: "rgba(58,171,249,1)" },
    //                 { offset: 1, color: "rgba(57,171,250,1)" }
    //               ])
    //             }
    //           }
    //         ]
    //       }
    //     ]
    //   };
    //   this.myChart2.setOption(option);
    // },
    async drawMap3() {
      const res17 = await this.$http.get(`/mobile-stats/RecordNumber`);
      console.log(res17);
      const datad1 = [];
      const datadd1 = [];
      for (var key in res17.data.data) {
        datad1.push(res17.data.data[key].name);

        datadd1.push(res17.data.data[key].value);
      }
      const option = {
        color: ["#4e72b8"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: datad1,
            axisTick: {
              alignWithLabel: true
            },
            axisLine: {
              lineStyle: {
                color: "#0087ed",
                width: 1
              }
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "单位/次数",
            splitLine: {
              lineStyle: {
                color: ["#0087ed"]
              }
            },
            nameTextStyle: {
              color: ["white"]
            },
            axisLine: {
              lineStyle: {
                color: "#0087ed",
                width: 1
              }
            }
          }
        ],
        series: [
          {
            name: "加气站",
            type: "bar",
            barWidth: 30,
            data: datadd1
          }
        ]
      };
      this.myChart3.setOption(option);
    },
    // drawMap4() {
    //   const option = {
    //     xAxis: [
    //       {
    //         type: "category",
    //         data: ["2016", "2017", "2018", "2019", "2020"],
    //         axisTick: {
    //           alignWithLabel: true
    //         },
    //         axisLine: {
    //           lineStyle: {
    //             color: "#0087ed",
    //             width: 1
    //           }
    //         }
    //       }
    //     ],
    //     yAxis: [
    //       {
    //         type: "value",
    //         name: "年气瓶数/万个",
    //         splitLine: {
    //           lineStyle: {
    //             color: ["#0087ed"]
    //           }
    //         },
    //         nameTextStyle: {
    //           color: ["white"]
    //         },
    //         axisLine: {
    //           lineStyle: {
    //             color: "#0087ed",
    //             width: 1
    //           }
    //         }
    //       }
    //     ],
    //     series: [
    //       {
    //         data: [16, 18, 21, 25, 28],
    //         type: "line",
    //         itemStyle: {
    //           normal: {
    //             color: "#8cd5c2", //改变折线点的颜色
    //             lineStyle: {
    //               color: "#8cd5c2" //改变折线颜色
    //             }
    //           }
    //         }
    //       }
    //     ]
    //   };
    //   this.myChart4.setOption(option);
    // },
    drawMap(_d, _name) {
      echarts.registerMap(_name, _d);
      const mapData = [];
      const scatterColor = [
        "rgba(44,236,129,1)",
        "rgba(224,224,51,1)",
        "rgba(205,204,48,1)"
      ];
      _d.features.forEach((item, i) => {
        mapData.push({
          name: item.properties.name,
          value: item.properties.cp.concat([Math.round(Math.random() * 10000)]),
          label: {
            show: false,
            normal: {
              position: "top"
            }
          },
          itemStyle: {
            color: "#fff",
            normal: {
              color: scatterColor[i % 3]
            }
          }
        });
      });
      const color = [
        "rgba(255,255,255,0.8)",
        "rgba(205,204,48,1)",
        "rgba(255,255,255,0.8)"
      ];
    },
    //分页功能
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      // 1.每页显示条数的改变
      this.pageSize = val;
      // 回到第一页
      this.currPage = 1;
      // 希望当页条数改变时 从第一页开始显示 this.pagenum = 1 -》currPage=1?
      this.change4();
    },
    handleCurrentChange(val) {
      //页码改变时
      console.log(`当前页: ${val}`);
      this.currPage = val;
      this.change4();
    },
    async getUserlist() {
      const res = await this.$http.get(`/mobile-stats/findUnitNumber/2`);
      this.cong = res.data.data;

      const res1 = await this.$http.get(`/mobile-stats/findUnitNumber/3`);
      this.jian = res1.data.data;

      const res2 = await this.$http.get(`/mobile-stats/findUnitNumber/4`);
      this.shi = res2.data.data;

      const res3 = await this.$http.get(`/mobile-stats/findHardwareMobile`);
      this.jia = res3.data.data;

      const res4 = await this.$http.get(`/stats/findByIsBlack`);
      this.hei = res4.data.data;

      const res5 = await this.$http.get(`/stats/findByUseUnit`);
      return res5.data.data[0].buildingUser;
    }
  }
};
</script>

<style  scoped>
.map_box {
  position: absolute;
  left: 15%;
  top: 32%;
  width: 73%;
  height: 60%;
}
.container {
  width: 100%;
  height: 100%;
  background-image: url("~@/../static/images/big_bg2.png");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100% 100%;
  background-color: rgba(10, 2, 24, 1);
  position: relative;
}
.big_head {
  position: relative;
  padding-top: 10px;
  height: 60px;
}
.big_head_title {
  line-height: 10px;
  font-size: 28px;
  text-align: center;
  /* color: rgba(220, 250, 250, 1); */
  color: rgb(35, 205, 253);
}

.big_head_bottom_line {
  width: 1920px;
  height: 144px;
  position: absolute;
  left: 50%;
  margin-left: -960px;
  bottom: -44px;
  background-image: url("~@/../static/images/big_head_line.png");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100% 100%;
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
  font-size: 18px;
}
.sanjiao_l_t {
  position: absolute;
  left: -5%;
  top: -6%;
  width: 13px;
  height: 13px;
  background-image: url("~@/../static/images/sanjiao_l_t.png");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100% 100%;
}
.sanjiao_r_t {
  position: absolute;
  right: -7%;
  top: -6%;
  width: 13px;
  height: 13px;
  background-image: url("~@/../static/images/sanjiao_r_t.png");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100% 100%;
}
.sanjiao_l_b {
  position: absolute;
  left: -5%;
  bottom: 0;
  width: 13px;
  height: 13px;
  background-image: url("~@/../static/images/sanjiao_l_b.png");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100% 100%;
}
.sanjiao_r_b {
  position: absolute;
  right: -7%;
  bottom: 0;
  width: 13px;
  height: 13px;
  background-image: url("~@/../static/images/sanjiao_r_b.png");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100% 100%;
}
.map_card1 {
  position: absolute;
  right: -6.5%;
  top: -5%;
  width: 177px;
  height: 95px;
  background-image: url("~@/../static/images/card_bg.png");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100% 100%;
}
.map_card_title1 {
  color: rgba(243, 232, 68, 1);
  font-size: 14px;
  position: absolute;
  top: 15%;
  left: 29%;
  /* text-align: center; */
  /* line-height: 30px; */
}
.map_card_count1 {
  color: rgba(243, 232, 68, 1);
  font-size: 32px;
  position: absolute;
  bottom: 18%;
  left: 5%;
}
.map_card_count2 {
  color: rgba(57, 250, 177, 1);
  font-size: 10px;
  position: absolute;
  bottom: 38%;
  right: 0%;
}
.map_card_count3 {
  color: rgba(236, 102, 34, 1);
  font-size: 10px;
  position: absolute;
  bottom: 20%;
  right: 17%;
}
.map_card2 {
  position: absolute;
  left: -4%;
  bottom: 1.5%;
  width: 195px;
  height: 95px;
  background-image: url("~@/../static/images/card_bg.png");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100% 100%;
}
.map_card_title2 {
  color: rgba(255, 255, 255, 1);
  font-size: 14px;
  position: absolute;
  top: 9px;
  left: 0;
  right: 0;
  text-align: center;
  line-height: 30px;
}
.map_card_num1 {
  color: rgba(243, 232, 68, 1);
  font-size: 28px;
  position: absolute;
  top: 48px;
  left: 3%;
  width: 31%;
  line-height: 30px;
  text-align: center;
}
.map_card_num2 {
  color: rgba(244, 72, 75, 1);
  font-size: 28px;
  position: absolute;
  top: 48px;
  left: 34%;
  width: 31%;
  line-height: 30px;
  text-align: center;
}
.map_card_num3 {
  color: rgba(118, 243, 246, 1);
  font-size: 28px;
  position: absolute;
  top: 48px;
  left: 65%;
  width: 31%;
  line-height: 30px;
  text-align: center;
}
.map_card3 {
  position: absolute;
  right: -6.5%;
  bottom: 1.5%;
  width: 187px;
  height: 95px;
  background-image: url("~@/../static/images/card_bg.png");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100% 100%;
}
.map_card_title3 {
  color: rgba(255, 255, 255, 1);
  font-size: 14px;
  position: absolute;
  top: 9px;
  left: 0;
  right: 0;
  text-align: center;
  line-height: 30px;
}
.map_card_sum {
  color: rgba(51, 219, 251, 1);
  font-size: 30px;
  position: absolute;
  top: 48px;
  left: 0;
  right: 0;
  line-height: 30px;
  text-align: center;
}
.map_center_title {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  line-height: 36px;
  font-size: 30px;
  font-weight: bold;
  color: rgba(35, 205, 253, 1);
  text-align: center;
}
.info-main {
  position: relative;
  width: 100%;
  height: 100%;
}
.img1,
.img2,
.img3,
.img4,
.img5,
.img6 {
  display: inline-block;
   width: 25%;
}
.img1 {
  position: absolute;
  left: 10%;
  top: 5%;
}
.img2 {
  position: absolute;
  right: 10%;
  top: 5%;
}
.img3 {
  position: absolute;
  left: 10%;
  bottom: 16%;
}
.img4 {
  position: absolute;
  right: 10%;
  bottom: 16%;
}
.img5 {
  position: absolute;
  right: 38%;
  top: 5%;
}
.img6 {
  position: absolute;
  right: 38%;
  bottom: 16%;
}
.span1,
.span2,
.span3,
.span4,
.span5,
.span6 {
  display: inline-block;
  font-size: 12px;
}
.span1 {
  position: absolute;
  left: 10%;
  top: 30%;
  color: white;
}
.span2 {
  position: absolute;
  right: 12%;
  top: 30%;
  color: white;
}
.span3 {
  position: absolute;
  left: 10%;
  bottom: 5%;
  color: white;
}
.span4 {
  position: absolute;
  right: 10%;
  bottom: 5%;
  color: white;
}
.span5 {
  position: absolute;
  right: 40%;
  top: 30%;
  color: white;
}
.span6 {
  position: absolute;
  right: 42%;
  bottom: 5%;
  color: white;
}
#listedCompany {
  position: absolute;
  left: 18%;
  top: 35%;
  color: white;
  font-size: 24px;
  font-weight: bold;
}
#listedCompany1 {
  position: absolute;
  right: 18%;
  top: 35%;
  color: white;
  font-size: 24px;
  font-weight: bold;
}
#listedCompany2 {
  position: absolute;
  left: 12%;
  bottom: -10%;
  color: white;
  font-size: 24px;
  font-weight: bold;
}
#listedCompany3 {
  position: absolute;
  right: 18%;
  bottom: -10%;
  color: white;
  font-size: 24px;
  font-weight: bold;
}
#listedCompany4 {
  position: absolute;
  right: 48%;
  top: 35%;
  color: white;
  font-size: 24px;
  font-weight: bold;
}
#listedCompany5 {
  position: absolute;
  right: 46%;
  bottom: -10%;
  color: white;
  font-size: 24px;
  font-weight: bold;
}
.big_left_chart1 {
  position: absolute;
  left: 1%;
  top: 29%;
  width: 18%;
  height: 42%;
  /* border: 1px solid rgba(255, 255, 255, 0.5); */
  /* background-image: url("~@/../static/images/panel.png"); */
  /* background-size:350px*200px; */
  /* background: rgba(0, 0, 0, 0.4); */
}
.big_left_chart2 {
  position: absolute;
  left: 1%;
  top: 57%;
  width: 18%;
  height: 42%;
  /* border: 1px solid rgba(255, 255, 255, 0.5); */
  /* background: rgba(0, 0, 0, 0.4); */
}
.big_center_chart {
  position: absolute;
  left: 19%;
  top: 40%;
  width: 70%;
  /* height: 19%; */
}
/* .el-table__body-wrapper{
  background-color: red;
} */
.big_center_chart_title {
  position: absolute;
  left: 36%;
  top: 30%;
  line-height: 36px;
  font-size: 18px;
  font-weight: bold;
  color: rgba(35, 205, 253, 1);
  text-align: center;
}

.big_right_chart1 {
  position: absolute;
  right: 1%;
  top: 29%;
  width: 22%;
  height: 40%;
  /* border: 1px solid rgba(255, 255, 255, 0.5); */
  /* background: rgba(0, 0, 0, 0.4); */
}
.big_right_chart1_box {
  position: absolute;
  right: 0;
  top: 5%;
  width: 100%;
  height: 100%;
}
.big_right_chart2 {
  position: absolute;
  right: 0%;
  top: 48%;
  width: 18%;
  height: 20%;
  /* border: 1px solid rgba(255, 255, 255, 0.5); */
  /* background: rgba(0, 0, 0, 0.4); */
  /* margin: 0;
  padding: 0; */
}
.big_bottom_left {
  position: absolute;
  left: 1%;
  bottom: 4%;
  width: 46%;
  height: 20%;
  /* border: 1px solid rgba(255, 255, 255, 0.5); */
  background: rgba(0, 0, 0, 0.4);
  overflow: hidden;
}
.big_left_chart1_title {
  position: absolute;
  left: 0%;
  right: 0%;
  top: 2%;
  line-height: 36px;
  font-size: 18px;
  font-weight: bold;
  color: rgba(35, 205, 253, 1);
  text-align: center;
}
.big_left_chart2_title {
  position: absolute;
  left: 0px;
  right: 0;
  top: 2%;
  line-height: 36px;
  font-size: 23px;
  font-weight: bold;
  color: rgba(35, 205, 253, 1);
  text-align: center;
}
.big_right_chart1_title {
  position: absolute;
  left: 0px;
  right: 0px;
  top: 2%;
  line-height: 36px;
  font-size: 18px;
  font-weight: bold;
  color: rgba(35, 205, 253, 1);
  text-align: center;
}
.big_right_chart2_title {
  position: absolute;
  left: 0%;
  right: 14%;
  top: 2%;
  line-height: 36px;
  font-size: 23px;
  font-weight: bold;
  color: rgba(35, 205, 253, 1);
  text-align: center;
}
.big_bottom_left_title {
  position: absolute;
  left: 3%;
  top: 8%;
  width: 30px;
  line-height: 28px;
  font-size: 23px;
  font-weight: bold;
  color: rgba(35, 205, 253, 1);
  text-align: center;
}
.big_bottom_right {
  position: absolute;
  right: 1%;
  bottom: 3%;
  width: 18%;
  height: 30%;
  /* border: 1px solid rgba(255, 255, 255, 0.5); */
  /* background: rgba(0, 0, 0, 0.4); */
  overflow: hidden;
}
.big_bottom_right_title {
  position: absolute;
  left: 0%;
  right: 0%;
  top: 2%;
  line-height: 36px;
  font-size: 23px;
  font-weight: bold;
  color: rgba(35, 205, 253, 1);
  text-align: center;
}
.big_bottom_right_box {
  position: absolute;
  left: 8%;
  top: 8%;
  right: 0;
  bottom: 0;
}
.big_heng_line {
  position: absolute;
  bottom: -10%;
  width: 100%;
  height: 10%;
  /* align-content: center; */
  /* width: 300px;
  height: 4px; */
  left: 50%;
  margin-left: -50%;
  background: -webkit-radial-gradient(
    ellipse,
    rgba(35, 205, 253, 1),
    rgba(35, 205, 253, 0),
    rgba(35, 205, 253, 0)
  );
}
.big_shu_line {
  position: absolute;
  right: 0;
  width: 10%;
  height: 200%;
  top: 50%;
  margin-top: -170px;
  background: -webkit-radial-gradient(
    ellipse,
    rgba(35, 205, 253, 1),
    rgba(35, 205, 253, 0),
    rgba(35, 205, 253, 0)
  );
}
.big_left_chart1_box {
  position: absolute;
  left: 0;
  top: 19%;
  bottom: 0;
  right: 0;
}

.big_left_chart2_box {
  position: absolute;
  left: 0;
  top: 10%;
  width: 100%;
  height: 90%;
  /* width: 350px;
  height: 265px; */
}
.big_right_chart1_title1 {
  position: absolute;
  left: 0;
  top: 15%;
  line-height: 30px;
  right: 0;
  text-align: center;
  font-size: 16px;
  color: rgba(57, 253, 179, 1);
}
.big_right_chart1_title1 span {
  font-size: 26px;
}
.big_right_chart1_tab_l {
  width: 33%;
  text-align: center;
  float: left;
  box-shadow: inset 0px 0px 5px 1px rgba(255, 255, 255, 0.2);
}
.big_right_chart1_tab_c {
  width: 34%;
  text-align: center;
  float: left;
  border-left: 1px solid rgba(31, 71, 166, 1);
  border-right: 1px solid rgba(31, 71, 166, 1);
  margin: 0 -1px;
  box-shadow: inset 0px 0px 5px 1px rgba(255, 255, 255, 0.2);
}
.big_right_chart1_tab_r {
  width: 33%;
  text-align: center;
  float: left;
  box-shadow: inset 0px 0px 5px 1px rgba(255, 255, 255, 0.2);
}
.big_right_chart1_tab {
  height: 8%;
  line-height: 30px;
  font-size: 16px;
  width: 80%;
  position: absolute;
  top: 24%;
  left: 49%;
  margin-left: -37%;
  border-radius: 5px;
  border: 1px solid rgba(31, 71, 166, 1);
  color: rgba(33, 193, 239, 1);
  overflow: hidden;
}
.big_right_chart1_tab .active {
  color: rgba(240, 228, 63, 1);
}
.big_right_chart1_progress {
  position: absolute;
  left: 0%;
  top: 33%;
  right: 0%;
}
.big_progress_item {
  height: 20px;
  line-height: 20px;
  font-size: 14px;
  overflow: hidden;
  position: relative;
}
.big_progress_item_label {
  position: absolute;
  left: 0;
  width: 37%;
  text-align: right;
  color: rgba(52, 231, 165, 1);
}
.big_progress_item_bg {
  position: absolute;
  top: 32%;
  left: 42%;
  height: 6px;
  border-radius: 6px;
  overflow: hidden;
  right: 30%;
  background: -webkit-linear-gradient(
    right,
    rgba(137, 210, 118, 1),
    rgba(34, 188, 182, 1)
  );
  background: -o-linear-gradient(
    right,
    rgba(137, 210, 118, 1),
    rgba(34, 188, 182, 1)
  );
  background: -moz-linear-gradient(
    right,
    rgba(137, 210, 118, 1),
    rgba(34, 188, 182, 1)
  );
  background: linear-gradient(
    right,
    rgba(137, 210, 118, 1),
    rgba(34, 188, 182, 1)
  );
}
.big_progress_item_gray {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(25, 77, 107, 1);
}
.big_progress_item_count {
  position: absolute;
  right: 0;
  width: 25%;
  text-align: left;
  font-size: 14px;
  color: rgba(241, 229, 63, 1);
}
.big_right_chart2_box {
  position: absolute;
  left: 5%;
  top: 16%;
  width: 100%;
  height: 100%;
}
.elb {
  position: absolute;
  top: 27%;
  left: 10%;
}
p {
  margin: 0;
  padding: 0;
}
.tishi {
  width: 10%;
  position: absolute;
  left: 1%;
  top: 1%;
}
.anchor {
  margin-top: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #0087ed;
  font-size: 13px;
  font-weight: bold;
}
#allmap {
  overflow: hidden;
}
.map {
  height: 560px;
  position: relative;
  left: 8%;
}
.map >>> .BMap_cpyCtrl {
  display: none !important;
}

>>> .anchorBL {
  display: none;
}
.el-button.is-round {
  width: 40%;
  margin: 5px;
  /* padding-left: px; */
}
</style>
<style>
/* .el-dialog {
  width: 70%;
  background-color: #151946;
} */
</style>