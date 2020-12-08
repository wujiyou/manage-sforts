<template>
  <div class="container">
    <vue-particles
      id="particles-js"
      color="#fff"
      :particleOpacity="0.7"
      :particlesNumber="100"
      shapeType="circle"
      :particleSize="4"
      linesColor="#fff"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="2"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
      class="lizi"
    ></vue-particles>
    <!-- <nav-menu :menuFlag="menuFlag" :showMenu="showMenu" :hideMenu="hideMenu"></nav-menu> -->
    <div class="appContainer" @click="hideMenu">
      <el-col :span="24" class="big_head">
        <div class="big_head_title">液化气瓶大数据</div>
        <div class="big_head_bottom_line"></div>
      </el-col>
      <el-col :span="24">
        <el-col :span="18">&nbsp;</el-col>
        <el-col :span="6">
          <el-col :span="4" style="color:white">气瓶状态</el-col>
          <el-col :span="4">
            <el-button type="success" round class="elb1">合格:{{this.hege}}</el-button>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" round class="elb1">即将超期:{{this.hei}}</el-button>
          </el-col>
          <el-col :span="4">
            <el-button type="warning" round class="elb1">逾期未检:{{this.yuqi}}</el-button>
          </el-col>
          <el-col :span="4">
            <el-button type="danger" round class="elb1">报废:{{this.bhege}}</el-button>
          </el-col>
          <el-col :span="4">&nbsp;</el-col>
        </el-col>
      </el-col>

      <el-col :span="24">
        <!-- 统计数据 -->
        <!-- <div  class="big_left_chart1"> -->
        <div class="big_left_chart1_title">统计数据</div>
        <div class="big_left_chart1_box">
          <el-col :span="24" class="info-main">
            <el-col :span="3">&nbsp;</el-col>
            <el-col :span="2" class="box1">
              <p class="img">
                <img src="~@/../static/images/a.png" alt class="imgs" />
              </p>
              <p class="span">充装站</p>
              <p class="span" id="listedCompany">1{{this.cong}}</p>
            </el-col>

            <el-col :span="2" class="box2">
              <p class="img">
                <img src="~@/../static/images/e.png" alt class="imgs" />
              </p>
              <p class="span">配送站</p>
              <p class="span" id="listedCompany1">1{{this.pei}}</p>
            </el-col>

            <el-col :span="2" class="box3">
              <p class="img">
                <img src="~@/../static/images/b.png" alt class="imgs" />
              </p>
              <p class="span">已登记气瓶数</p>
              <p class="span" id="listedCompany2">1{{this.deng}}</p>
            </el-col>

            <el-col :span="2" class="box4">
              <p class="img">
                <img src="~@/../static/images/d.png" alt class="imgs" />
              </p>
              <p class="span">加气机数</p>
              <p class="span" id="listedCompany3">1{{this.jia}}</p>
            </el-col>

            <el-col :span="2" class="box5">
              <p class="img">
                <img src="~@/../static/images/f.png" alt class="imgs" />
              </p>
              <p class="span">检验站</p>
              <p class="span" id="listedCompany4">1{{this.jianyan}}</p>
            </el-col>

            <!-- <el-col :span="2">&nbsp;</el-col> -->

            <el-col :span="2" class="box6">
              <p class="img">
                <img src="~@/../static/images/c.png" alt class="imgs" />
              </p>
              <p class="span">发证员工</p>
              <p class="span" id="listedCompany5">1</p>
            </el-col>

            <el-col :span="2" class="box4">
              <p class="img">
                <img src="~@/../static/images/d.png" alt class="imgs" />
              </p>
              <p class="span">制造单位</p>
              <p class="span" id="listedCompany3">1{{this.jia}}</p>
            </el-col>

            <el-col :span="2" class="box5">
              <p class="img">
                <img src="~@/../static/images/f.png" alt class="imgs" />
              </p>
              <p class="span">监管单位</p>
              <p class="span" id="listedCompany4">1{{this.jianyan}}</p>
            </el-col>

            <el-col :span="2" class="box6">
              <p class="img">
                <img src="~@/../static/images/c.png" alt class="imgs" />
              </p>
              <p class="span">使用单位</p>
              <p class="span" id="listedCompany5">1</p>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
          </el-col>
        </div>
        <!-- </div> -->
      </el-col>

      <el-col :span="24">
        <div class="box">
          <button class="backBtn" @click="back()">返回上级</button>
          <div id="main" style="width:100%;height:690px"></div>
        </div>
      </el-col>
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
// const padDate = function(value) {
//   return value < 10 ? `0${value}` : value;
// };
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
        黑龙江: "heilongjiang",
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
        新疆自治区: "xinjiang",
        广西自治区: "guangxi",
        内蒙古自治区: "neimenggu",
        宁夏自治区: "ningxia",
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
      hege: "",
      bhege: "",
      yuqi: "",
      jianyan: "",
      fa: "",
      value2: 0,
      form: {
        provinceCode: "",
      },
      // date: new Date()
    };
  },
  created() {
    // this.getUserlist()
  },

  mounted() {
    this.mapChart();
  },
  updated() {
    // this.mapChart();
  },
  beforeDestroy() {},
  methods: {
    hideMenu() {
      if (this.menuFlag === "1") {
        this.menuFlag = "0";
      }
    },
    back() {
      if (this.pro != "") {
        var myMapChart = this.$echarts.init(document.getElementById("main"));
        var _that = this;
        console.log(this.provinces[this.pro]);
        this.midpro = this.pro;
        var url = "";
        var da = "";
        $.getJSON(
          "/static/map/province/" + _that.provinces[_that.pro] + ".json",
          function (data) {
            console.log(data);
            _that.$echarts.registerMap(this.pro, data);
            var d = [];
            for (var i = 0; i < data.features.length; i++) {
              d.push({
                name: data.features[i].properties.name,
              });
            }
            renderMap(this.pro, d);
          }
        );

        // 初始化绘制全国地图配置
        var option = {
          // backgroundColor: "#404a59",
          title: {
            // text: "Echarts3 中国地图下钻至县级",
            // subtext: "三级下钻",
            left: "center",
            textStyle: {
              color: "#fff",
              fontSize: 16,
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
          tooltip: {
            trigger: "item",
            confine: true,
            formatter: (p) => {
              console.log(p);
              let textCon =
                "&nbsp;&nbsp;" +
                p.data.name +
                "</br>气瓶数:" +
                25 +
                "</br>充装站:" +
                24 +
                "</br>配送站:" +
                23 +
                "</br>已登记气瓶数:" +
                23 +
                "</br>加气机数:" +
                23 +
                "</br>发证员工:" +
                32 +
                "</br>制造单位:" +
                32 +
                "</br>监管单位" +
                12 +
                "</br>使用单位" +
                23 +
                "";
              console.log(textCon);
              return textCon;
            },
          },
          toolbox: {
            show: true,
            orient: "vertical",
            left: "right",
            top: "center",
            feature: {
              dataView: { readOnly: false },
              restore: {},
              saveAsImage: {},
            },
            iconStyle: {
              normal: {
                color: "#fff",
              },
            },
          },
          animationDuration: 1000,
          animationEasing: "cubicOut",
          animationDurationUpdate: 1000,
        };
        function renderMap(map, data) {
          // 初始化绘制全国地图配置
          console.log(map);
          option.title.subtext = map;
          option.series = [
            {
              name: map,
              type: "map",
              mapType: map,
              zoom: 1.25, // 改变这个值的大小就可以了
              roam: false,
              scaleLimit: {
                //滚轮缩放的极限控制
                min: 1,
                max: 2,
              },
              data: data,
              // data: convertedData[0],
              nameMap: {
                china: "中国",
              },
              label: {
                normal: {
                  show: true,
                  textStyle: {
                    color: "#999",
                    fontSize: 13,
                  },
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    color: "#fff",
                    fontSize: 13,
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
        }
        this.pro = "";
      } else {
        var myMapChart = this.$echarts.init(document.getElementById("main"));
        var _that = this;
        // 这是组件开始初始化时需要拉去的数据--中国地图的数据
        $.getJSON("/static/map/china.json", function (data) {
          console.log(data);
          let d = [];
          for (var i = 0; i < data.features.length; i++) {
            d.push({
              name: data.features[i].properties.name,
            });
          }
          var mapdata = [];
          mapdata = d;
          // 注册地图
          _that.$echarts.registerMap("china", data);
          // 绘制地图
          renderMap("china", d);
        });
        // 初始化绘制全国地图配置
        var option = {
          title: {
            left: "center",
            textStyle: {
              color: "#fff",
              fontSize: 16,
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
          tooltip: {
            trigger: "item",
            confine: true,
            formatter: (p) => {
              console.log(p);
              let textCon =
                "&nbsp;&nbsp;" +
                p.data.name +
                "</br>气瓶数:" +
                25 +
                "</br>充装站:" +
                24 +
                "</br>配送站:" +
                23 +
                "</br>已登记气瓶数:" +
                23 +
                "</br>加气机数:" +
                23 +
                "</br>发证员工:" +
                32 +
                "</br>制造单位:" +
                32 +
                "</br>监管单位" +
                12 +
                "</br>使用单位" +
                23 +
                "";
              console.log(textCon);
              return textCon;
            },
          },
          toolbox: {
            show: true,
            orient: "vertical",
            left: "right",
            top: "center",
            feature: {
              dataView: { readOnly: false },
              restore: {},
              saveAsImage: {},
            },
            iconStyle: {
              normal: {
                color: "#fff",
              },
            },
          },
          animationDuration: 1000,
          animationEasing: "cubicOut",
          animationDurationUpdate: 1000,
        };
        function renderMap(map, data) {
          // 初始化绘制全国地图配置
          console.log(map);
          option.title.subtext = map;
          option.series = [
            {
              name: map,
              type: "map",
              mapType: map,
              roam: false,
              zoom: 1.25, // 改变这个值的大小就可以了
              scaleLimit: {
                //滚轮缩放的极限控制
                min: 1,
                max: 2,
              },
              data: data,
              // data: convertedData[0],
              nameMap: {
                china: "中国",
              },
              label: {
                normal: {
                  show: true,
                  textStyle: {
                    color: "#999",
                    fontSize: 13,
                  },
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    color: "#fff",
                    fontSize: 13,
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
        }
      }
      if (this.district != "") {
        console.log(this.city);
        var domChr = document.createElement("div");
        domChr.id = "main";
        domChr.style.width = "100%";
        domChr.style.height = "800px";
        var dom = document.getElementsByClassName("hello")[0];
        var dom2 = document.getElementById("main");
        dom.replaceChild(domChr, dom2);

        this.mapChart();
      }
    },

    // async getUserlist() {
    //   const res = await this.$http.get(`/chinese/province`);
    //   console.log(res);
    //   this.provinces=res.data.data
    // },
    getProvince() {},
    mapChart() {
      var cityMap = this.cityMap; //市级数据
      var provinces = this.provinces; //省级数据

      var myMapChart = this.$echarts.init(document.getElementById("main"));
      // 34个省、市、自治区的名字拼音映射数组
     
      // 直辖市和特别行政区-只有二级地图，没有三级地图
      var special = [
        "北京市",
        "天津市",
        "上海市",
        "重庆市",
        "香港特别行政区",
        "澳门特别行政区",
      ];
      var mapdata = [];
      var _that = this;
      // 这是组件开始初始化时需要拉去的数据--中国地图的数据
      if (_that.city != "") {
        $.getJSON(
          "static/map/city/" + _that.cityMap[_that.city] + ".json", //'/static/map/province/'+_that.provinces[ _that.pro]+'.json'
          function (data) {
            console.log(data);
            _that.$echarts.registerMap(_that.city, data);
            var d = [];
            for (var i = 0; i < data.features.length; i++) {
              d.push({
                name: data.features[i].properties.name,
              });
            }
            renderMap(_that.city, d);
            _that.city = "";
          }
        );
      } else {
        $.getJSON("/static/map/china.json", function (data) {
          console.log(data);
          let d = [];
          for (var i = 0; i < data.features.length; i++) {
            d.push({
              name: data.features[i].properties.name,
            });
          }

          mapdata = d;
          // 注册地图
          _that.$echarts.registerMap("china", data);
          // 绘制地图
          renderMap("china", d);
        });
      }

      myMapChart.on("click", function (params) {
        if (_that.provinces[params.data.name] !== undefined) {
          _that.pro = params.data.name;

          // _that.getProvince(provinces[params.data.name],params.name)
          // 如果点击的是34个省、市、自治区，绘制选中地区的二级地图
          $.getJSON(
            "/static/map/province/" +
              _that.provinces[params.data.name] +
              ".json",
            function (data) {
              console.log(data);
              localStorage.setItem("directlyCity", JSON.stringify(data));
              _that.$echarts.registerMap(params.name, data);
              var d = [];
              for (var i = 0; i < data.features.length; i++) {
                d.push({
                  name: data.features[i].properties.name,
                });
              }
              renderMap(params.name, d);
            }
          );
        } else if (_that.provinces[params.seriesName] !== undefined) {
          // 如果是【直辖市/特别行政区】只有二级下钻
          if (special.indexOf(params.seriesName) >= 0) {
            console.log("行政市" + params.data.name);

            if (
              _that.provinces[params.data.name] === undefined &&
              cityMap[params.data.name] === undefined
            ) {
              _that.district = params.data.name;
              let cityDeta = JSON.parse(localStorage.getItem("directlyCity"));
              let da = cityDeta.features.findIndex((val) => {
                return params.data.name == val.properties.name;
              });
              var gt = cityDeta.features[da].properties.center[0];
              var lt = cityDeta.features[da].properties.center[1];
              console.log(params.data.name);
              var map = new BMap.Map("main"); // 创建Map实例,

              map.centerAndZoom(new BMap.Point(gt, lt), 11); // 初始化地图,设置中心点坐标和地图级别
              map.enableScrollWheelZoom(true);
              var bdary = new BMap.Boundary();
              bdary.get(params.data.name, function (rs) {
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
                  map.setViewport(ply.getPath()); //调整视野
                }
              });
              //添加地图类型控件
              map.addControl(
                new BMap.MapTypeControl({
                  mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP],
                })
              );
              map.setCurrentCity(params.data.name); // 设置地图显示的城市 此项是必须设置的
              map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
              var mapStyle = { style: "midnight" }; //百度地图主题颜色
              map.setMapStyle(mapStyle);
            }
            console.log(11111111111);
            // renderMap('china', mapdata)
          } else {
            // 显示县级地图
            console.log(params.name);
            _that.city = params.data.name;

            // }
            // if(_that.midpro!='' ){
            //   var url=cityMap[_that.midpro]
            //   var da=_that.midpro
            // }else{
            //    var url=cityMap[params.data.name]
            //    var da=_that.midpro

            // }
            $.getJSON(
              "static/map/city/" + cityMap[params.data.name] + ".json", //cityMap[params.name]
              function (data) {
                console.log(
                  22222222222222222222222222222222 + params.seriesName
                );
                localStorage.setItem("city", JSON.stringify(data));
                _that.$echarts.registerMap(params.name, data);
                var d = [];
                for (var i = 0; i < data.features.length; i++) {
                  d.push({
                    name: data.features[i].properties.name,
                  });
                }
                renderMap(params.name, d);
                // _that.midpro=params.data.name
              }
            );
          }
        } else {
          // console.log()
          if (_that.provinces[_that.midpro] !== undefined) {
            //_that.midpro!=""
            console.log(_that.provinces[_that.midpro] !== undefined);
            $.getJSON(
              "static/map/city/" + cityMap[params.data.name] + ".json", //cityMap[params.name]
              function (data) {
                console.log(11111111111111 + params.seriesName);
                localStorage.setItem("city", JSON.stringify(data));
                _that.$echarts.registerMap(params.name, data);
                var d = [];
                for (var i = 0; i < data.features.length; i++) {
                  d.push({
                    name: data.features[i].properties.name,
                  });
                }
                renderMap(params.name, d);
              }
            );
            _that.pro = _that.midpro;
          }
          if (
            _that.provinces[params.data.name] === undefined &&
            cityMap[params.data.name] === undefined
          ) {
            _that.district = params.data.name;
            let cityDeta = JSON.parse(localStorage.getItem("city"));
            let da = cityDeta.features.findIndex((val) => {
              return params.data.name == val.properties.name;
            });
            var gt = cityDeta.features[da].geometry.coordinates[0][0][0][0];
            var lt = cityDeta.features[da].geometry.coordinates[0][0][0][1];
            console.log(11111111111111111111111111111111111111);
            console.log(params.data.name);
            var map = new BMap.Map("main"); // 创建Map实例,

            map.centerAndZoom(new BMap.Point(gt, lt), 11); // 初始化地图,设置中心点坐标和地图级别
            map.enableScrollWheelZoom(true);
            var bdary = new BMap.Boundary();
            bdary.get(params.data.name, function (rs) {
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
                map.setViewport(ply.getPath()); //调整视野
              }
            });
            //添加地图类型控件
            map.addControl(
              new BMap.MapTypeControl({
                mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP],
              })
            );
            map.setCurrentCity(params.data.name); // 设置地图显示的城市 此项是必须设置的
            map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
            var mapStyle = { style: "midnight" };
            map.setMapStyle(mapStyle);
          }

          // 点击县级时是否返回
          // renderMap('china', mapdata)
        }
      });
      // 初始化绘制全国地图配置
      var option = {
        // backgroundColor: "#404a59",
        title: {
         
          left: "center",
          textStyle: {
            color: "#fff",
            fontSize: 16,
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
        tooltip: {
          trigger: "item",
          confine: true,
          formatter: (p) => {
            console.log(p);
            let textCon =
              "&nbsp;&nbsp" +
              p.data.name +
              "</br>气瓶数:" +
              25 +
              "</br>充装站:" +
              24 +
              "</br>配送站:" +
              23 +
              "</br>已登记气瓶数:" +
              23 +
              "</br>加气机数:" +
              23 +
              "</br>发证员工:" +
              32 +
              "</br>制造单位:" +
              32 +
              "</br>监管单位" +
              12 +
              "</br>使用单位" +
              23 +
              "";
            console.log(textCon);
            return textCon;
          },
        },
        toolbox: {
          show: true,
          orient: "vertical",
          left: "right",
          top: "center",
          feature: {
            dataView: { readOnly: false },
            restore: {},
            saveAsImage: {},
          },
          iconStyle: {
            normal: {
              color: "#fff",
            },
          },
        },
        animationDuration: 1000,
        animationEasing: "cubicOut",
        animationDurationUpdate: 1000,
      };

      function renderMap(map, data) {
        // 初始化绘制全国地图配置
        console.log(map);
        option.title.subtext = map;
        option.series = [
          {
            name: map,
            type: "map",
            mapType: map,
            zoom: 1.25, // 改变这个值的大小就可以了
            roam: false,
            scaleLimit: {
              //滚轮缩放的极限控制
              min: 1,
              max: 2,
            },
            data: data,
            // data: convertedData[0],
            nameMap: {
              china: "中国",
            },
            label: {
              normal: {
                show: true,
                textStyle: {
                  color: "#999",
                  fontSize: 13,
                },
              },
              emphasis: {
                show: true,
                textStyle: {
                  color: "#fff",
                  fontSize: 13,
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
      }
    },
  },
};
</script>
<style scoped>
#particles-js {
  width: 100%;
  height: calc(100% - 100px);
  position: absolute;
}
/* //设置absolute,其他DIV设置为relative，这样这个例子效果就作为背景 */

.backBtn {
  padding: 5px 10px;
  position: relative;
  top: 20px;
  z-index: 9999;
  /* margin:10px 5px */
}
/* .title {
  width: 100%;
  height: 6vh;
  text-align: center;
  color: #fff;
  font-size: 2em;
  line-height: 8vh;
} */
.box {
  /* position: absolute; */
  width: 100%;
  height: 70vh;
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
.container {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  background-image: url("~@/../static/images/big_bg2.png");
  background-size: cover;
  height: 100%;
  background-position: center center;
  background-size: 100% 100%;
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
  font-size: 28px;
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

