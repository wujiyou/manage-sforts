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

    <div class="appContainer">
      <!-- <el-col :span="24" class="big_head">
        <div class="big_head_title">液用气瓶大数据</div>
        <div class="big_head_bottom_line"></div>
      </el-col>-->

      <el-col :span="24">
        <div class="box">
          <button v-if="isShowBtn" class="backBtn" @click="back()">返回上级</button>
          <div v-if="isMap" id="main" :style="heig"></div>
        </div>
      </el-col>
    </div>
  </div>
</template>
<script>
import echarts from "echarts/lib/echarts";
// let echarts = require("echarts/lib/echarts");
import $ from "jquery";

export default {
  name: "Home",
  data() {
    return {
      provinces: {
        台湾省: "taiwan",
        河北省: "hebei",
        山西省: "shanxi",
        辽宁省: "liaoning",
        吉林省: "jilin",
        黑龙江省: "heilongjiang",
        江苏省: "jiangsu",
        浙江省: "zhejiang",
        安徽省: "anhui",
        福建省: "fujian",
        江西省: "jiangxi",
        山东省: "shandong",
        河南省: "henan",
        湖北省: "hubei",
        湖南省: "hunan",
        广东省: "guangdong",
        海南省: "hainan",
        四川省: "sichuan",
        贵州省: "guizhou",
        云南省: "yunnan",
        陕西省: "shanxi",
        甘肃省: "gansu",
        青海省: "qinghai",
        // 5个自治区
        新疆维吾尔自治区: "xinjiang",
        广西壮族自治区: "guangxi",
        内蒙古自治区: "neimenggu",
        宁夏回族自治区: "ningxia",
        西藏自治区: "xizang",
        // 4个直辖市
        北京市: "beijing",
        天津市: "tianjin",
        上海市: "shanghai",
        重庆市: "chongqing",
        // 2个特别行政区
        香港特别行政区: "xianggang",
        澳门特别行政区: "aomen",
      },
      cityMap: {
        兰州新区:"623300",
        // 潼南县:"500152",
        // 铜梁县:"500151",
        // 荣昌县:"500153",
        // 璧山县:"500120",
        // 武隆县:"500156",
        // 梁平县:"500155",
        // 开县:"500154",
        阿拉尔市:'659002',
        图木舒克市:'659003',
        铁门关市:'659006',
        林芝市: "542600",
        昌都市: "542100",
        山南市: "542200",
        日喀则市: "542300",
        那曲市: "542400",
        吐鲁番市: "652100",
        哈密市: "652200",
        海东市: "632100",
        北京市: "110100",
        天津市: "120100",
        上海市: "310100",
        重庆市: "500100",
        崇明县: "310200",
        湖北省直辖县市: "429000",
        铜仁市: "522200",
        毕节市: "522400",
        石家庄市: "130100",
        唐山市: "130200",
        秦皇岛市: "130300",
        邯郸市: "130400",
        邢台市: "130500",
        保定市: "130600",
        张家口市: "130700",
        承德市: "130800",
        沧州市: "130900",
        廊坊市: "131000",
        衡水市: "131100",
        太原市: "140100",
        大同市: "140200",
        阳泉市: "140300",
        长治市: "140400",
        晋城市: "140500",
        朔州市: "140600",
        晋中市: "140700",
        运城市: "140800",
        忻州市: "140900",
        临汾市: "141000",
        吕梁市: "141100",
        呼和浩特市: "150100",
        包头市: "150200",
        乌海市: "150300",
        赤峰市: "150400",
        通辽市: "150500",
        鄂尔多斯市: "150600",
        呼伦贝尔市: "150700",
        巴彦淖尔市: "150800",
        乌兰察布市: "150900",
        兴安盟: "152200",
        锡林郭勒盟: "152500",
        阿拉善盟: "152900",
        沈阳市: "210100",
        大连市: "210200",
        鞍山市: "210300",
        抚顺市: "210400",
        本溪市: "210500",
        丹东市: "210600",
        锦州市: "210700",
        营口市: "210800",
        阜新市: "210900",
        辽阳市: "211000",
        盘锦市: "211100",
        铁岭市: "211200",
        朝阳市: "211300",
        葫芦岛市: "211400",
        长春市: "220100",
        吉林市: "220200",
        四平市: "220300",
        辽源市: "220400",
        通化市: "220500",
        白山市: "220600",
        松原市: "220700",
        白城市: "220800",
        延边朝鲜族自治州: "222400",
        哈尔滨市: "230100",
        齐齐哈尔市: "230200",
        鸡西市: "230300",
        鹤岗市: "230400",
        双鸭山市: "230500",
        大庆市: "230600",
        伊春市: "230700",
        佳木斯市: "230800",
        七台河市: "230900",
        牡丹江市: "231000",
        黑河市: "231100",
        绥化市: "231200",
        大兴安岭地区: "232700",
        南京市: "320100",
        无锡市: "320200",
        徐州市: "320300",
        常州市: "320400",
        苏州市: "320500",
        南通市: "320600",
        连云港市: "320700",
        淮安市: "320800",
        盐城市: "320900",
        扬州市: "321000",
        镇江市: "321100",
        泰州市: "321200",
        宿迁市: "321300",
        杭州市: "330100",
        宁波市: "330200",
        温州市: "330300",
        嘉兴市: "330400",
        湖州市: "330500",
        绍兴市: "330600",
        金华市: "330700",
        衢州市: "330800",
        舟山市: "330900",
        台州市: "331000",
        丽水市: "331100",
        合肥市: "340100",
        芜湖市: "340200",
        蚌埠市: "340300",
        淮南市: "340400",
        马鞍山市: "340500",
        淮北市: "340600",
        铜陵市: "340700",
        安庆市: "340800",
        黄山市: "341000",
        滁州市: "341100",
        阜阳市: "341200",
        宿州市: "341300",
        六安市: "341500",
        亳州市: "341600",
        池州市: "341700",
        宣城市: "341800",
        福州市: "350100",
        厦门市: "350200",
        莆田市: "350300",
        三明市: "350400",
        泉州市: "350500",
        漳州市: "350600",
        南平市: "350700",
        龙岩市: "350800",
        宁德市: "350900",
        南昌市: "360100",
        景德镇市: "360200",
        萍乡市: "360300",
        九江市: "360400",
        新余市: "360500",
        鹰潭市: "360600",
        赣州市: "360700",
        吉安市: "360800",
        宜春市: "360900",
        抚州市: "361000",
        上饶市: "361100",
        济南市: "370100",
        青岛市: "370200",
        淄博市: "370300",
        枣庄市: "370400",
        东营市: "370500",
        烟台市: "370600",
        潍坊市: "370700",
        济宁市: "370800",
        泰安市: "370900",
        威海市: "371000",
        日照市: "371100",
        莱芜市: "371200",
        临沂市: "371300",
        德州市: "371400",
        聊城市: "371500",
        滨州市: "371600",
        菏泽市: "371700",
        郑州市: "410100",
        开封市: "410200",
        洛阳市: "410300",
        平顶山市: "410400",
        安阳市: "410500",
        鹤壁市: "410600",
        新乡市: "410700",
        焦作市: "410800",
        濮阳市: "410900",
        许昌市: "411000",
        漯河市: "411100",
        三门峡市: "411200",
        南阳市: "411300",
        商丘市: "411400",
        信阳市: "411500",
        周口市: "411600",
        驻马店市: "411700",
        省直辖县级行政区划: "469000",
        武汉市: "420100",
        黄石市: "420200",
        十堰市: "420300",
        宜昌市: "420500",
        襄阳市: "420600",
        鄂州市: "420700",
        荆门市: "420800",
        孝感市: "420900",
        荆州市: "421000",
        黄冈市: "421100",
        咸宁市: "421200",
        随州市: "421300",
        恩施土家族苗族自治州: "422800",
        长沙市: "430100",
        株洲市: "430200",
        湘潭市: "430300",
        衡阳市: "430400",
        邵阳市: "430500",
        岳阳市: "430600",
        常德市: "430700",
        张家界市: "430800",
        益阳市: "430900",
        郴州市: "431000",
        永州市: "431100",
        怀化市: "431200",
        娄底市: "431300",
        湘西土家族苗族自治州: "433100",
        广州市: "440100",
        韶关市: "440200",
        深圳市: "440300",
        珠海市: "440400",
        汕头市: "440500",
        佛山市: "440600",
        江门市: "440700",
        湛江市: "440800",
        茂名市: "440900",
        肇庆市: "441200",
        惠州市: "441300",
        梅州市: "441400",
        汕尾市: "441500",
        河源市: "441600",
        阳江市: "441700",
        清远市: "441800",
        东莞市: "441900",
        中山市: "442000",
        潮州市: "445100",
        揭阳市: "445200",
        云浮市: "445300",
        南宁市: "450100",
        柳州市: "450200",
        桂林市: "450300",
        梧州市: "450400",
        北海市: "450500",
        防城港市: "450600",
        钦州市: "450700",
        贵港市: "450800",
        玉林市: "450900",
        百色市: "451000",
        贺州市: "451100",
        河池市: "451200",
        来宾市: "451300",
        崇左市: "451400",
        海口市: "460100",
        三亚市: "460200",
        三沙市: "460300",
        成都市: "510100",
        自贡市: "510300",
        攀枝花市: "510400",
        泸州市: "510500",
        德阳市: "510600",
        绵阳市: "510700",
        广元市: "510800",
        遂宁市: "510900",
        内江市: "511000",
        乐山市: "511100",
        南充市: "511300",
        眉山市: "511400",
        宜宾市: "511500",
        广安市: "511600",
        达州市: "511700",
        雅安市: "511800",
        巴中市: "511900",
        资阳市: "512000",
        阿坝藏族羌族自治州: "513200",
        甘孜藏族自治州: "513300",
        凉山彝族自治州: "513400",
        贵阳市: "520100",
        六盘水市: "520200",
        遵义市: "520300",
        安顺市: "520400",
        黔西南布依族苗族自治州: "522300",
        黔东南苗族侗族自治州: "522600",
        黔南布依族苗族自治州: "522700",
        昆明市: "530100",
        曲靖市: "530300",
        玉溪市: "530400",
        保山市: "530500",
        昭通市: "530600",
        丽江市: "530700",
        普洱市: "530800",
        临沧市: "530900",
        楚雄彝族自治州: "532300",
        红河哈尼族彝族自治州: "532500",
        文山壮族苗族自治州: "532600",
        西双版纳傣族自治州: "532800",
        大理白族自治州: "532900",
        德宏傣族景颇族自治州: "533100",
        怒江傈僳族自治州: "533300",
        迪庆藏族自治州: "533400",
        拉萨市: "540100",
        昌都地区: "542100",
        山南地区: "542200",
        日喀则地区: "542300",
        那曲地区: "542400",
        阿里地区: "542500",
        林芝地区: "542600",
        西安市: "610100",
        铜川市: "610200",
        宝鸡市: "610300",
        咸阳市: "610400",
        渭南市: "610500",
        延安市: "610600",
        汉中市: "610700",
        榆林市: "610800",
        安康市: "610900",
        商洛市: "611000",
        兰州市: "620100",
        嘉峪关市: "620200",
        金昌市: "620300",
        白银市: "620400",
        天水市: "620500",
        武威市: "620600",
        张掖市: "620700",
        平凉市: "620800",
        酒泉市: "620900",
        庆阳市: "621000",
        定西市: "621100",
        陇南市: "621200",
        临夏回族自治州: "622900",
        甘南藏族自治州: "623000",
        西宁市: "630100",
        海东地区: "632100",
        海北藏族自治州: "632200",
        黄南藏族自治州: "632300",
        海南藏族自治州: "632500",
        果洛藏族自治州: "632600",
        玉树藏族自治州: "632700",
        海西蒙古族藏族自治州: "632800",
        银川市: "640100",
        石嘴山市: "640200",
        吴忠市: "640300",
        固原市: "640400",
        中卫市: "640500",
        乌鲁木齐市: "650100",
        克拉玛依市: "650200",
        吐鲁番地区: "652100",
        哈密地区: "652200",
        昌吉回族自治州: "652300",
        博尔塔拉蒙古自治州: "652700",
        巴音郭楞蒙古自治州: "652800",
        阿克苏地区: "652900",
        克孜勒苏柯尔克孜自治州: "653000",
        喀什地区: "653100",
        和田地区: "653200",
        伊犁哈萨克自治州: "654000",
        塔城地区: "654200",
        阿勒泰地区: "654300",
        自治区直辖县级行政区划: "659000",
        台湾省: "710000",
        香港特别行政区: "810100",
        澳门特别行政区: "820000",
      },
      special: [
        "北京市",
        "图木舒克市",
        "铁门关市",
        "阿拉尔市",
        "天津市",
        "上海市",
        "重庆市",
        "香港特别行政区",
        "澳门特别行政区",
      ],
      pro: "",
      midpro: "",
      district: "",
      city: "",
      // wd: "",
      // tq: "",
      cong: "",
      pei: "",
      deng: "",
      jia: "",
      hei: "",
      gui: "",
      hege: "2",
      bhege: "3",
      yuqi: "1",
      jianyan: "",
      fa: "",
      value2: 0,
      isMap: true,
      myMapChart: "",
      treeMap: {
        parent: 0,
        name: "中国",
        type: "O",
        childNode: {},
      },
      // codes: {
      provinceCode: "430000",
      // },
      obj: {
        hardwareCount: "1",
        bottleCount: "1",
        inspectUnit: "2",
        personnelCount: "6",
        fillUnit: "1",
        delUnit: "2",
      },
      mapPoints: [],
      // date: new Date()
    };
  },
  // components:{
  //   liquefied
  // },
  created() {
    // this.getUserlist()
  },
  props: {
    heig: {
      type: String,
      default: "width:100%;height:44%",
    },
    isShowBtn: {
      type: Boolean,
      default: true,
    },
    isnorMal: {
      type: Boolean,
      default: true,
    },
  },

  mounted() {
    // var _that=this
    this.myMapChart = this.$echarts.init(document.getElementById("main"));
    this.mapChart();
    //  window.addEventListener("resize", function() {
    //  this.heig=`width:100%;height:${document.body.clientWidth/180}%`
    //  console.log(document.body.clientWidth)
    //  console.log(13323232323)
    //   this.myMapChart.resize();
    // });
  },
  beforeDestroy() {},
  methods: {
    goAllData() {
      console.log("触发");
      this.$router.push("/data/allData");
    },

    hideMenu() {
      if (this.menuFlag === "1") {
        this.menuFlag = "0";
      }
    },
    //           百度地图 ---> 长沙市 ----> 湖南省  -------> 全国
    // district  "长沙县"     "长沙市"       ""              ""
    // city      "长沙县"      ""            ""              ""
    // munLevel               "长沙市"
    // pro       ""                        "湖南省"          ""
    //   if-1  _that.provinces[_that.pro] !== undefined &&        // 市 ----> 省
    //         _that.cityMap[_that.district] !== undefined
    //   if-2  _that.provinces[_that.pro] !== undefined &&        // 省 ---> 全国
    //         _that.cityMap[_that.district] === undefined
    //   if-3  _that.cityMap[_that.munLevel] !== undefined &&     // 百度地图 ----> 市
    //         _that.district == _that.city

    getProvince() {},
    //当初始权限为省级
    mapChart() {
      var myMapChart = this.myMapChart;
      // 直辖市和特别行政区-只有二级地图，没有三级地图
      // var special = ['北京市', '天津市', '上海市', '重庆市', '香港特别行政区', '澳门特别行政区']
      var mapdata = [];
      var _that = this;
      let params =
        this.city != "" ? `city/${this.cityMap[this.city]}.json` : "china.json";
      var _that = this;
      // this.$http
      //   .get(`/stats/findByChinese`, { params: { provinceCode: 430000 } })
      //   .then(res => {
      //     console.log(res);
      //   });
      // 这是组件开始初始化时需要拉去的数据--中国地图的数据
      $.getJSON(
        "static/map/" + params, //'/static/map/province/'+_that.provinces[ _that.pro]+'.json'
        function (data) {
          console.log(data);
          var d = [];
          var c = [];
          for (var i = 0; i < data.features.length; i++) {
            d.push({
              name: data.features[i].properties.name,
            });
            c.push({
              adcode: data.features[i].properties.adcode,
            });
          }
          console.log(c);
          // for(var i=0;)
          if (_that.city != "") {
            _that.$echarts.registerMap(_that.city, data);
            _that.renderMap(_that.city, d, _that.obj);
          } else {
            _that.$echarts.registerMap("中国", data);
            // 绘制地图
            _that.renderMap("中国", d, _that.obj);
          }
          _that.city = "";
        }
      );
      myMapChart.on("click", (params) => {
        let treeMap = this.treeMap;
        treeMap = this.forObject(treeMap, params);
      });

      //  window.addEventListener("resize", function() {
      //     _that.myChart.resize();
      //   });
    },
    // 函数 创建多个标注
    markerFun(points, label, infoWindows) {
      // var icon = new BMap.Icon("../../../static/images/a.png",new BMap.Size(100,100));
      var markers = new BMap.Marker(points);
      this.map.addOverlay(markers);
      markers.setLabel(label);
      markers.addEventListener("click", function (event) {
        console.log("0001");
        this.map.openInfoWindow(infoWindows, points); //参数：窗口、点  根据点击的点出现对应的窗口
      });
    },
    async createMap(gt, lt, cityName) {
      var citys= cityName
      // ?code=${citys}
      const res = await this.$http.get(`stats/map`);
      console.log(res);
      this.mapPoints = res.data.data;
      
      this.map = new BMap.Map("main");
      let map = this.map;
      let _that = this;
      // 106.651969,29.035487
    
      var bdary = new BMap.Boundary();
      bdary.get(cityName, function (rs) {
        console.log(rs)
        //获取行政区域
        map.clearOverlays(); //清除地图覆盖物
        var count = rs.boundaries.length; //行政区域的点有多少个

        for (var i = 0; i < count; i++) {
          var ply = new BMap.Polygon(rs.boundaries[i], {
            strokeWeight: 2, //设置多边形边线线粗
            fillOpacity: 0.1,
            strokeOpacity: 1, //设置多边形边线透明度0-1
            StrokeStyle: "solid", //设置多边形边线样式为实线或虚线，取值 solid 或 dashed
            strokeColor: "#ff0000", //设置多边形边线颜色
          }); //建立多边形覆盖物

          map.addOverlay(ply); //添加覆盖物

          // 设置百度地图多个标记点
          _that.mapPoints.forEach((v) => {
            console.log(v);
          

            var points = new BMap.Point(v.x, v.y); //创建坐标点
            var opts = {
              width: 250,
              height: 150,
              title: "信息展示",
            };
            var label = new BMap.Label(cityName, {
              offset: new BMap.Size(25, 5),
            });
            var infoWindows = new BMap.InfoWindow(
              "使用单位:" +
                v.buildingUser +
                "<br/>" +
                "标签号：" +
                v.appid +
                "<br/>" +
                "客户姓名：" +
                v.customerName +
                "" +
                "<br/>" +
                "客户地址" +
                v.customerAddress +
                "" +
                "<br/>" +
                "手机号：" +
                v.customerTelephone +
                "" +
                "<br/>" +
                "登记证号：" +
                v.regId +
                "" +
                "",
              opts
            );
            _that.markerFun(points, label, infoWindows);
          });

          //   var icon = new BMap.Icon("../../../static/images/a.png",new BMap.Size(100,100));
          //   console.log(icon)
          //   console.log("-----------------------------")
          //   //设置标注的经纬度
          //   var marker = new BMap.Marker(new BMap.Point(gt,lt),{icon:icon});
          //   //把标注添加到地图上
          //   map.addOverlay(marker);
          // map.setViewport(ply.getPath()); //调整视野
        }
        // for (;n<_that.mapPoints.length;i++) {
        //         var points = new BMap.Point(_that.mapPoints[n].gt,_that.mapPoints[n].lt);//创建坐标点
        //        _that.markerFun(points);
        //     }
      });
       
      //设置标注的图标

      //添加地图类型控件
      map.addControl(
        new BMap.MapTypeControl({
          mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP],
        })
      );
      // $(".anchorBL").remove();
      map.setCurrentCity(cityName); // 设置地图显示的城市 此项是必须设置的
       map.centerAndZoom(new BMap.Point(gt, lt),10); // 初始化地图,设置中心点坐标和地图级别
      map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
      
    
      var mapStyle = { style: "midnight" };

      //  var i =0;
      // for(;i<this.mapPoints.length;i++){
      //   console.log(this.mapPoints[i])
      //     var points = new BMap.Point(this.mapPoints[i].gt,this.mapPoints[i].lt);//创建坐标点
      //           this.markerFun(points);
      // }
      map.setMapStyle(mapStyle);
    },

    renderMap(map, data, obj2) {
      var myMapChart = this.myMapChart;
      var _that = this;
      var obj = obj2;
      this.cong = obj.hardwareCount;
      this.pei = obj.bottleCount;
      this.deng = obj.inspectUnit;
      this.jia = obj.personnelCount;
      this.hei = obj.fillUnit;
      this.gui = obj.delUnit;
      // 初始化绘制全国地图配置
      var option = {
        backgroundColor: "",
        title: {
          // text: "Echarts3 中国地图下钻至县级",
          // subtext: "三级下钻",
          left: "center",
          textStyle: {
            color: "#fff",
            fontSize: 14,
            fontWeight: "normal",
            fontFamily: "Microsoft YaHei",
          },
          subtextStyle: {
            color: "#ccc",
            fontSize: 13,
            fontWeight: "normal",
            fontFamily: "Microsoft YaHei",
          },
        },
        // tooltip: {
        //   trigger: "item",
        //   formatter(val, tick) {
        //     var dataName = val.name;
        //     if (_that.provinces[val.name] !== undefined) {
        //       let dd = "";
        //       let sheng = "";
        //       $.ajaxSettings.async = false;
        //       $.getJSON("/static/map/china.json", data => {
        //         //`/static/map/province/${_that.provinces[val.name]}.json`
        //         console.log(data);
        //         console.log(data.features[0].properties.adcode);
        //         //  var chinaData=
        //         data.features.forEach(value => {
        //           console.log(value);
        //           // console.log(chinaDataName)
        //           if (dataName === value.properties.name) {
        //             dd = value.properties.adcode;
        //             let map = { provinceCode: dd };
        //             $.ajax({
        //               type: "POST",
        //               url: "http://192.168.0.111:8081/stats/findByChinese",
        //               async: false,
        //               contentType: "application/json",
        //               data: JSON.stringify(map),
        //               success: function(res) {
        //                 //省级的数据获取
        //                 console.log(res);
        //                 sheng = res;
        //                 console.log(sheng);
        //               }
        //             });
        //           }
        //         });
        //       });
        //       return (
        //         "充气站:" +
        //         // sheng.data.fillUnit +
        //         "个" +
        //         "<br/>" +
        //         "配送站:" +
        //         sheng.data.delUnit +
        //         "个" +
        //         "<br/>" +
        //         "检验站:" +
        //         sheng.data.inspectUnit +
        //         "个" +
        //         "<br/>" +
        //         "已登记气瓶数:" +
        //         sheng.data.bottleCount +
        //         "个" +
        //         "<br/>" +
        //         "加气机数:" +
        //         sheng.data.hardwareCount +
        //         "个" +
        //         "<br/>" +
        //         "发证员工:" +
        //         sheng.data.personnelCount +
        //         "个" +
        //         "<br/>"
        //       );
        //     } else if (_that.cityMap[val.name] !== undefined) {
        //       let dd = "";
        //       let citys = "";
        //       $.ajaxSettings.async = false; //将$.getJSON改为同步
        //       $.getJSON(
        //         `/static/map/province/${
        //           _that.provinces[_that.treeMap.childNode.name]
        //         }.json`,
        //         data => {
        //           console.log(data);
        //           //  console.log(data.features[0].properties.adcode)
        //           data.features.forEach(value => {
        //             console.log(value);
        //             // console.log(chinaDataName)
        //             if (dataName === value.properties.name) {
        //               dd = value.properties.adcode;
        //               console.log(dd);
        //               let map = { cityCode: dd };
        //               $.ajax({
        //                 type: "POST",
        //                 url: "http://192.168.0.111:8081/stats/findByChinese",
        //                 async: false,
        //                 contentType: "application/json",
        //                 data: JSON.stringify(map),
        //                 success: function(res) {
        //                   //市级的数据获取

        //                   citys = res;
        //                 }
        //               });
        //               // var dat=
        //               // console.log(value.properties.adcode)//市级页面code
        //             }
        //           });
        //         }
        //       );

        //       return (
        //         "充气站:" +
        //         citys.data.fillUnit +
        //         "个" +
        //         "<br/>" +
        //         "配送站:" +
        //         citys.data.delUnit +
        //         "个" +
        //         "<br/>" +
        //         "检验站:" +
        //         citys.data.inspectUnit +
        //         "个" +
        //         "<br/>" +
        //         "已登记气瓶数:" +
        //         citys.data.bottleCount +
        //         "个" +
        //         "<br/>" +
        //         "加气机数:" +
        //         citys.data.hardwareCount +
        //         "个" +
        //         "<br/>" +
        //         "发证员工:" +
        //         citys.data.personnelCount +
        //         "个" +
        //         "<br/>"
        //       );
        //     } else if (
        //       _that.cityMap[val.name] === undefined &&
        //       _that.provinces[val.name] === undefined &&
        //       _that.special.findIndex(
        //         v => _that.treeMap.childNode.name == v
        //       ) === -1
        //     ) {
        //       console.log(_that.treeMap.childNode.name);
        //       let dd = "";
        //       let count = "";
        //       $.ajaxSettings.async = false; //将$.getJSON改为同步
        //       $.getJSON(
        //         `http://192.168.0.111:8081/chinese/area/${
        //           _that.cityMap[_that.treeMap.childNode.childNode.name]
        //         }`,
        //         data => {
        //           console.log(data);
        //           console.log(dataName);
        //           data.data.forEach(value => {
        //             if (dataName === value.name) {
        //               dd = value.code;
        //               let map = { areaCode: dd };
        //               $.ajax({
        //                 type: "POST",
        //                 url: "http://192.168.0.111:8081/stats/findByChinese",
        //                 async: false,
        //                 contentType: "application/json",
        //                 data: JSON.stringify(map),
        //                 success: function(res) {
        //                   //区级的数据获取
        //                   console.log(res);
        //                   count = res;
        //                 }
        //               });
        //             }
        //           });
        //         }
        //       );
        //       return (
        //         "充气站:" +
        //         count.data.fillUnit +
        //         "个" +
        //         "<br/>" +
        //         "配送站:" +
        //         count.data.delUnit +
        //         "个" +
        //         "<br/>" +
        //         "检验站:" +
        //         count.data.inspectUnit +
        //         "个" +
        //         "<br/>" +
        //         "已登记气瓶数:" +
        //         count.data.bottleCount +
        //         "个" +
        //         "<br/>" +
        //         "加气机数:" +
        //         count.data.hardwareCount +
        //         "个" +
        //         "<br/>" +
        //         "发证员工:" +
        //         count.data.personnelCount +
        //         "个" +
        //         "<br/>"
        //       );
        //     } else if (
        //       _that.special.findIndex(v => _that.treeMap.childNode.name == v) >=
        //       0
        //     ) {
        //       console.log(_that.treeMap.childNode.name);
        //       console.log("-----------sssssss-----------");
        //       let dd = "";
        //       let count = "";
        //       $.ajaxSettings.async = false; //将$.getJSON改为同步
        //       $.getJSON(
        //         `http://192.168.0.111:8081/chinese/area/${
        //           _that.cityMap[_that.treeMap.childNode.name]
        //         }`,
        //         data => {
        //           console.log(data.data[0].name);
        //           data.data.forEach(value => {
        //             if (dataName === value.name) {
        //               dd = value.code;
        //               let map = { areaCode: dd };
        //               $.ajax({
        //                 type: "POST",
        //                 url: "http://192.168.0.111:8081/stats/findByChinese",
        //                 async: false,
        //                 contentType: "application/json",
        //                 data: JSON.stringify(map),
        //                 success: function(res) {
        //                   //区级的数据获取
        //                   console.log(res);
        //                   count = res;
        //                 }
        //               });
        //             }
        //           });
        //         }
        //       );
        //       return (
        //         "充气站:" +
        //         count.data.fillUnit +
        //         "个" +
        //         "<br/>" +
        //         "配送站:" +
        //         count.data.delUnit +
        //         "个" +
        //         "<br/>" +
        //         "检验站:" +
        //         count.data.inspectUnit +
        //         "个" +
        //         "<br/>" +
        //         "已登记气瓶数:" +
        //         count.data.bottleCount +
        //         "个" +
        //         "<br/>" +
        //         "加气机数:" +
        //         count.data.hardwareCount +
        //         "个" +
        //         "<br/>" +
        //         "发证员工:" +
        //         count.data.personnelCount +
        //         "个" +
        //         "<br/>"
        //       );
        //     }
        //   }
        // },

        animationDuration: 1000,
        animationEasing: "cubicOut",
        animationDurationUpdate: 1000,
      };

      //获取省名以及市级code的echarts code数据传入vuex中
      if (_that.provinces[map] !== undefined) {
        console.log("map存在");
        this.$store.commit("TOLIQCITY1", map);
      } else if (_that.cityMap[map] !== undefined) {
        this.$store.commit("TOLIQCITY1", map);
      }
      // else
      //  if( _that.cityMap[map] === undefined &&
      //         _that.provinces[map] === undefined &&
      //          _that.special.findIndex(v => _that.treeMap.childNode.name == v) === -1
      //         ){
      //           console.log(_that.cityMap[_that.treeMap.childNode.name])
      //           console.log(map)
      //     //  $.getJSON(
      //     //       `http://192.168.0.7:8081/chinese/area/${
      //     //         _that.cityMap[_that.treeMap.childNode.name]
      //     //       }`,data => {
      //     //         console.log(data)
      //     //       })
      // }
      // 初始化绘制全国地图配置
      console.log(map);
      option.title.subtext = map;
      option.series = [
        {
          name: map,
          type: "map",
          mapType: map,
          roam: false,
          data: data,
          // data: convertedData[0],
          nameMap: {
            china: "中国",
          },
          label: {
            normal: {
              show: _that.isnorMal,
              textStyle: {
                color: "#999",
                fontSize: 10,
              },
            },
            emphasis: {
              show: _that.isnorMal, //_that.isnorMal
              textStyle: {
                color: "#fff",
                fontSize: 12,
              },
            },
          },
          itemStyle: {
            normal: {
              areaColor: "rgba(23, 27, 57,0)",
              borderColor: "#1dc199",
              borderWidth: 1,
            },
            emphasis: {
              areaColor: "darkorange",
            },
          },
        },
      ];

      // 渲染地图
      myMapChart.setOption(option);
    },
    forObject(obj, params) {
      // console.log(obj);
      if (obj.name === params.seriesName) {
        let childNode = {
          parent: params.seriesName,
          name: params.name,
          childNode: {},
          type: "",
        };
        if (this.provinces[params.name] !== undefined) {
          childNode.type = "P"; //省
        } else if (this.special.includes(params.seriesName)) {
          childNode.type = "S"; // 直割市-下级单位
        } else if (this.cityMap[params.name] !== undefined) {
          childNode.type = "C"; // 市
        } else {
          childNode.type = "X"; // 县/区
        }
        Object.assign(obj.childNode, { ...childNode });
        this.renderMapData(childNode);
        return obj;
      } else {
        this.forObject(obj.childNode, params);
      }
    },
    renderMapData(childNode) {
      // let childNode = this.forTreeMap(this.treeMap);
      let url = {
        P: `/static/map/province/${this.provinces[childNode.name]}.json`,
        C: `static/map/city/${this.cityMap[childNode.name]}.json`,
      };
      var _that = this;
      if (childNode.type === "P" || childNode.type === "C") {
        console.log(childNode)
        // 显示省级和市级地图
        $.ajaxSettings.async = false; //将$.getJSON改为同步
        $.getJSON(url[childNode.type], (data) => {
          console.log(66666666666666);
          console.log(data);

          if (childNode.type === "P") {
            localStorage.setItem("directlyCity", JSON.stringify(data));
          } else {
            localStorage.setItem("city", JSON.stringify(data));
          }
          this.$echarts.registerMap(childNode.name, data);
          let d = [];
          for (let i = 0; i < data.features.length; i++) {
            d.push({
              name: data.features[i].properties.name,
            });
          }

          this.renderMap(childNode.name, d, _that.obj);
        });

      }
       else if (childNode.type === "X" || childNode.type === "S" ) {
        // 调用百度地图
        let cityDeta =
          childNode.type === "X"
            ? JSON.parse(localStorage.getItem("city"))
            : JSON.parse(localStorage.getItem("directlyCity"));
        let da = cityDeta.features.findIndex((val) => {
          return childNode.name == val.properties.name;
        });
        console.log(cityDeta.features);
        console.log("-------------------");
        let gt = cityDeta.features[da].geometry.coordinates[0][0][0][0];
        let lt = cityDeta.features[da].geometry.coordinates[0][0][0][1];
        this.createMap(gt, lt, childNode.name);
        console.log(childNode.parent);

        //获取县级的echarts code数据传入vuex中
        if (
          _that.cityMap[childNode.name] === undefined &&
          _that.provinces[childNode.name] === undefined &&
          _that.special.findIndex((v) => _that.treeMap.childNode.name == v) ===
            -1
        ) {
          console.log(_that.treeMap.childNode.name);
          $.ajaxSettings.async = false; //将$.getJSON改为同步
          $.getJSON(
            `http://125.75.8.53:8081/chinese/area/${
              _that.cityMap[childNode.parent]
            }`,
            (data) => {
              data.data.forEach((value) => {
                console.log(value);
                if (value.name == childNode.name) {
                  this.$store.commit("TOLIQCITY1", value.code);
                  //  console.log(value.code)
                }
              });
            }
          );
        } else if (
          _that.special.findIndex((v) => _that.treeMap.childNode.name == v) >= 0
        ) {
          $.ajaxSettings.async = false; //将$.getJSON改为同步
          $.getJSON(
            `http://125.75.8.53:8081/chinese/area/${
              _that.cityMap[childNode.parent]
            }`,
            (data) => {
              data.data.forEach((value) => {
                console.log(value);
                if (value.name == childNode.name) {
                  this.$store.commit("TOLIQCITY1", value.code);
                }
              });
            }
          );
        }
      }
    },
    back() {
      let childNode = this.forTreeMap(this.treeMap);
       
      var _that = this;
      console.log(childNode, "<-----------------childNode");
      let url = {
        P: `/static/map/china.json`,
        C: `/static/map/province/${this.provinces[childNode.parent]}.json`,
        X: `static/map/city/${this.cityMap[childNode.parent]}.json`,
        S: `static/map/city/${this.cityMap[childNode.parent]}.json`,
      };
      if (childNode.type === "P" || childNode.type === "C") {
            // if(childNode.parent==childNode.name){
            //   childNode.parent='新疆维吾尔自治区'
             
            //    console.log(childNode);

            // }
       
        console.log(childNode);
        //  if(_that.provinces[childNode.parent]!==undefined){
        //    this.$store.commit("TOLIQCITY", _that.provinces[childNode.parent])
        //    console.log(childNode.parent)
        //  }else{
        //    console.log(childNode.parent)
        //     this.$store.commit("TOLIQCITY",childNode.parent)
        //  }
        this.$store.commit("TOLIQCITY1", childNode.parent);
        $.ajaxSettings.async = false; //将$.getJSON改为同步
        $.getJSON(url[childNode.type], (data) => {
          // console.log(data)
          this.$echarts.registerMap(childNode.parent, data);
          let d = [];
          for (let i = 0; i < data.features.length; i++) {
            d.push({
              name: data.features[i].properties.name,
            });
          }
          this.renderMap(childNode.parent, d, _that.obj);
          this.treeMap = this.childNodeDel(this.treeMap);
        });
       
      } else if (childNode.type === "X" || childNode.type === "S") {
        console.log(childNode.parent);
        this.$store.commit("TOLIQCITY1", childNode.parent);

        this.map = null;
        this.isMap = false;
        this.$nextTick(() => {
          this.isMap = true;
          this.$nextTick(() => {
            this.myMapChart = this.$echarts.init(
              document.getElementById("main")
            );
            let myMapChart = this.myMapChart;
            $.getJSON(url[childNode.type], (data) => {
              this.$echarts.registerMap(childNode.parent, data);
              let d = [];
              for (let i = 0; i < data.features.length; i++) {
                d.push({
                  name: data.features[i].properties.name,
                });
              }
              this.renderMap(childNode.parent, d, _that.obj);
              this.treeMap = this.childNodeDel(this.treeMap);
            });
            myMapChart.on("click", (params) => {
              let treeMap = this.treeMap;
              treeMap = this.forObject(treeMap, params);
            });
          });
        });
      }
      // let o = {
      //   parent: 0,
      //   name: "china",
      //   childNode: {
      //     parent: "china",
      //     name: "湖南省",
      //     childNode: {
      //       // parent: "湖南省",
      //       // name: "长沙市",
      //       // childNode: {
      //       //   parent: "长沙县",
      //       //   name: "湖南省",
      //       // },
      //     },
      //   },
      // };
    },
    forTreeMap(obj) {
      if (JSON.stringify(obj.childNode) !== "{}") {
        return this.forTreeMap(obj.childNode);
      } else {
        return obj;
      }
    },
    childNodeDel(treeMap) {
      if (JSON.stringify(treeMap.childNode) === "{}") {
        treeMap = {};
      } else {
        treeMap.childNode = this.childNodeDel(treeMap.childNode);
      }
      return treeMap;
    },
  },
};
</script>
<style scoped>
#particles-js {
  width: 100%;
  /* height: calc(100% - 100px); */
  height: 100vh;
  position: absolute;
}
.BMap_cpyCtrl {
  display: none;
}

>>> .anchorBL {
  display: none;
}
/* .appContainer{
  height: 100vh;
} */
/* //设置absolute,其他DIV设置为relative，这样这个例子效果就作为背景 */

/* .title {
  width: 100%;
  height: 6vh;
  text-align: center;
  color: #fff;
  font-size: 2em;
  line-height: 8vh;
} */
.box {
  position: relative;
  width: 100%;
  /* height: 70vh; */
  top: 50px;
  margin: 0 auto;
  /* left: 5%;
  top: 10%; */
  /* background-color: rgba(24, 27, 52, 0.62); */
}
.main {
  margin: 0 auto;
}

.chart {
  position: relative;
  height: 60%;
  /* top: 10%; */
}
.backBtn {
  padding: 5px 5px;
  position: absolute;
  top: -5%;
  right: 0;
  background-color: #0a43bc;
  border: 0;
  color: #fff;
  height: 27px;
  font-family: Microsoft Yahei;
  font-size: 1em;
  cursor: pointer;
  border-radius: 15px;
  margin-bottom: 2%;
  z-index: 100;
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
.container {
  /* overflow-y: hidden;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  background: url("~@/../static/images/big_bg2.png");
  height:100%;
  position: relative; */
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
</style>

