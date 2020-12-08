<template>
  <div class="liqCon" :style="bg">
    <div class="headTitle">
      <div class="left">
        <!-- <img @click="goAllData()" src="../../../static/images/mobilefilling/a.png"/> -->
      </div>
      <div class="center">{{proAdresss}}液化气瓶大数据中心{{$store.state.liqCity}}</div>
      <div class="right">
        <div class="big_head_date">{{date | formatDate}}</div>
      </div>
    </div>

    <div class="bodyCon" :style="doPos">
      <div class="leftCon">
        <div class="left_12">
          <img src="../../../static/images/bg18.png"  />
        </div>
        <div class="left_1">
          <div>
            <p class="numData" :style="doFontSize">{{liqueUnit[0]}}</p>
            <p class="nameData">
              <span class="sp1"></span>制造单位
            </p>
          </div>
          <div>
            <p class="numData" :style="doFontSize">{{liqueUnit[1]}}</p>
            <p class="nameData">
              <span class="sp2"></span>充装单位
            </p>
          </div>
          <div>
            <p class="numData" :style="doFontSize">{{liqueUnit[3]}}</p>
            <p class="nameData">
              <span class="sp3"></span>使用单位
            </p>
          </div>
          <div>
            <p class="numData" :style="doFontSize">{{liqueUnit[2]}}</p>
            <p class="nameData">
              <span class="sp4"></span>检验单位
            </p>
          </div>
        </div>
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
          <!-- <template>
            <specialMap
             :heig="heig"
              :isnorMal="isnorMal"
              :mapId="'mapId1'"
              :proviceName="provincesAdress"
              :CommitType="'TOLIQCITY1'"
              :areaType="1"
            ></specialMap>
          </template> -->
          
          <template v-if="type==0">
            <chinaMap :heig="heig" :isnorMal="isnorMal"></chinaMap>
          </template>
          
          <template v-else-if="type==1">
            <gdProviceMap
              :heig="heig"
              :isnorMal="isnorMal"
              :mapId="'mapId1'"
              :proviceName="provincesAdress"
              :CommitType="'TOLIQCITY1'"
              :areaType="1"
            ></gdProviceMap>
          </template>

          <template v-else-if="type==2">
            <template v-if="isShowProAdress">
              <lzxqCityMap v-show="!allShow" :heigs="heigs" :isnorMal="isnorMal" :areaType="1" :mapId="'mapId1'" :cityName="provincesAdress" :CommitType="'TOLIQCITY1'"></lzxqCityMap>
              <smallLzxqMap v-show="allShow"></smallLzxqMap>
            </template>
            <template v-else>
              <gdCityMap :heig="heig" :isnorMal="isnorMal" :areaType="1" :mapId="'mapId1'" :cityName="provincesAdress" :CommitType="'TOLIQCITY1'"></gdCityMap>
            </template>
          </template>

          <template v-else-if="type==3">
            <countyMap :heig="heig" :isnorMal="isnorMal" :mapId="'mapId1'"  :areaType="1" :cityName="provincesAdress" :citCode="citCode"></countyMap>
          </template>
        
          <!-- <template v-if=""> -->
        </div>
        <div class="center_3">
          <barChart :y="y" :barChartSty="barChartSty" :doFontSize="doFontSize"></barChart>
        </div>
      </div>
      <div class="rightCon">
        <div class="right_1">
          <div class="rightData">
            <div>
              <p class="numData" :style="doFontSize">{{liqueUnit[4]}}</p>
              <p class="nameData">
                <span class="sp4"></span>配送单位
              </p>
            </div>
            <div>
              <p class="numData" :style="doFontSize">{{liqueContr[2]}}</p>
              <p class="nameData">
                <span class="sp3"></span>发证员工
              </p>
            </div>
            <div>
              <p class="numData" :style="doFontSize">{{liqueContr[1]}}</p>
              <p class="nameData">
                <span class="sp4"></span>加气机数
              </p>
            </div>
            <div>
              <p class="numData" :style="doFontSize">{{liqueContr[0]}}</p>
              <p class="nameData">
                <span class="sp4"></span>气瓶数量
              </p>
            </div>
          </div>
        </div>
        <div class="right_2">
          <div>
            <horseRaceRight :liNum="liNum"></horseRaceRight>
          </div>
        </div>
        <div class="right_3">
          <liquefiedzexian class="zexian" :zexianSty="zexianSty"></liquefiedzexian>
      
        </div>
      </div>
    </div>
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
import gdProviceMap from "../chinaMap/gdProviceMap";
import gdCityMap from "../chinaMap/gdCityMap";
import lzxqCityMap from "../chinaMap/lzxqCityMap";
import smallLzxqMap from "../chinaMap/smallLzxqMap";
import countyMap from "../chinaMap/countyMap";
import specialMap from "../chinaMap/specialMap"
const padDate = function (value) {
  return value < 10 ? `0${value}` : value;
};
import { mapState, mapMutations } from "vuex";
export default {
  name: "Home",
  data() {
    return {
      liNum: 0,
      y: "50%",
      isnorMal: true,
      date: new Date(),
      sty: "width:100%;height:42vh",
      doFontSize: "",
      doPos: "",
      samllFont: "",
      provincesAdress: "",
      type: "",
      code:"",
      citCode:"",
      proAdress:"",
      barChartSty: "width: 100%;height:30vh;",
      cityMap: {
        兰州新区:"623300",
       
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
      countyCity:{
        西岔园区:'623301',
        秦川园区:'623302',
        中川园区:'623303'
      },
      proAdresss:"",
      isShowProAdress:false,
      allShow:false

    };
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
    rounding(value) {
      return value.toFixed(2);
    },
  },

  created() {
  //  this.$nextTick(()=>{
  //    this.liqCity1
  //  })
    this.provincesAdress=sessionStorage.getItem("proName")
    this.proAdresss=sessionStorage.getItem("proName")
    if(sessionStorage.getItem("proName")=="兰州新区"){
      this.isShowProAdress=true
    }
    console.log(this.proAdress)
    console.log(this.isShowProAdress)
    this.type=sessionStorage.getItem("type")
    this.code=sessionStorage.getItem("areCode")
    this.citCode=sessionStorage.getItem("citCode")
    console.log("999999999999999999999")
    console.log(sessionStorage.getItem("proName"))
    console.log(sessionStorage.getItem("citCode"))
    this.init();

    var _this = this;
    this.timer = setInterval(function () {
      _this.date = new Date();
      // console.log(11111111111111);
    }, 1000);

    if (this.$route.path == "/allMap") {
      this.liNum = 3;
      this.y = "50%";
      this.barChartSty = "width: 100%;height:18vh;";
      this.doFontSize = "font-size:12px !important";
      this.doPos = "top:-6% !important";
      this.allShow=true
      // this.samllFont="font-size: 8px; transform:scale(0.9);"
      this.isnorMal = false;
    }
    console.log(this.$route.path);
    // liNum
  },
  props: {
    heig: {
      type: String,
      default: "width:100%;height:53vh",
    },
    heigs:{
      type: String,
      default: "width:100%;height:52vh;marginTop:50px",
    },
    zexianSty: {
      type: String,
      default: "width: 100%;height:20vh;",
    },
    bg: {
      type: String,
      default:
        "background: url('../../../static/images/libg.png') no-repeat;background-size: 100% 100%;",
    },
  },
  components: {
    chinaMap,
    pieChart,
    barChart,
    horseRace,
    liquefiedzexian,
    horseRaceRight,
    gdProviceMap,
    gdCityMap,
    countyMap,
    specialMap,
    lzxqCityMap,
    smallLzxqMap
  },
  computed: {
    ...mapState([
      "liqCity1",
      "liqueProportion",
      "liqueRecord",
      "liqueStatus",
      "liqueWeek",
      "liqueUser",
      "liqueUnit",
      "liqueContr",
      "liqueNumber",
    ]),
  },
  watch: {
    liqCity1(v) {
      console.log(this.countyCity[this.liqCity1])
      if (
        this.checkChinese(this.liqCity1) &&
        this.provinces[this.liqCity1] !== undefined
        && this.special.indexOf(this.liqCity1) == -1
      ) {
        this.liqueProportion2(this.liqCity1);
        this.liqueRecord2(this.liqCity1);
        this.liqueUnit2(this.liqCity1);
        this.liqueStatus2(this.liqCity1);
        this.liqueWeek2(this.liqCity1);
        this.liqueUser2(this.liqCity1);
        this.liqueContr2(this.liqCity1);
        this.liqueNumber2(this.liqCity1)
        console.log(this.liqCity1);
      }
      //  else if(
      //   this.checkChinese(this.liqCity1) &&
      //   this.provinces[this.liqCity1] !== undefined 
      //   // && this.special[this.liqCity1]!==undefined 
      // ){
      //    this.liqueProportion3(this.cityMap[this.liqCity1]);
      //    this.liqueRecord3(this.cityMap[this.liqCity1]);
      //    this.liqueStatus3(this.cityMap[this.liqCity1]);
      //    this.liqueWeek3(this.cityMap[this.liqCity1]);
      //    this.liqueUnit3(this.cityMap[this.liqCity1]);
      //    this.liqueUser3(this.cityMap[this.liqCity1]);
      //    this.liqueContr3(this.cityMap[this.liqCity1]);
      //    this.liqueNumber3(this.cityMap[this.liqCity1])
      //      console.log(this.liqCity1);
      // }
      else if (
        this.checkChinese(this.liqCity1) &&
        this.cityMap[this.liqCity1]
      ) {
        this.liqueProportion3(this.cityMap[this.liqCity1]);
        this.liqueRecord3(this.cityMap[this.liqCity1]);
        this.liqueStatus3(this.cityMap[this.liqCity1]);
        this.liqueWeek3(this.cityMap[this.liqCity1]);
        this.liqueUnit3(this.cityMap[this.liqCity1]);
        this.liqueUser3(this.cityMap[this.liqCity1]);
        this.liqueContr3(this.cityMap[this.liqCity1]);
        this.liqueNumber3(this.cityMap[this.liqCity1])
        
        console.log(this.liqCity1);
      } else if (this.liqCity1 == "中国") {
        this.liqueStatus1("");
        this.liqueProportion1("");
        this.liqueRecord1("");
        this.liqueWeek1("");
        this.liqueUnit1("");
        this.liqueUser1("");
        this.liqueContr1("");
        this.liqueNumber1("")
        console.log(this.liqCity1);
      } else if (this.checkRate(this.liqCity1)) {
        this.liqueRecord4(this.liqCity1);
        this.liqueStatus4(this.liqCity1);
        this.liqueWeek4(this.liqCity1);
        this.liqueProportion4(this.liqCity1);
        this.liqueUnit4(this.liqCity1);
        this.liqueUser4(this.liqCity1);
        this.liqueContr4(this.liqCity1);
        this.liqueNumber4(this.liqCity1)
        console.log(this.liqCity1);
      }
    },
  },
  methods: {
    ...mapMutations([
      "TOVEHCITY1",
      "LIQUEPROPORTION",
      "LIQUERECORD",
      "LIQUESTATUS",
      "LIQUEWEEK",
      "LIQUEUSER",
      "LIQUEUNIT",
      "LIQUECONTR",
      "LIQUENumber",
    ]),
    checkChinese(str) {
      var reg = new RegExp("[\\u4e00-\\u9fff]+", "g");
      return reg.test(str);
    },
    checkRate(nubmer) {
      var re = /^[0-9]+.?[0-9]*$/;
      return re.test(nubmer);
    },

    init() {
      if(this.type==1){
        this.liqueRecord2(this.provincesAdress);
        this.liqueProportion2(this.provincesAdress);
        this.liqueStatus2(this.provincesAdress);
        this.liqueWeek2(this.provincesAdress);
        this.liqueUser2(this.provincesAdress);
        this.liqueUnit2(this.provincesAdress);
        this.liqueContr2(this.provincesAdress);
      }else if(this.type==0){
        this.liqueRecord1("");
        this.liqueProportion1("");
        this.liqueStatus1("");
        this.liqueWeek1("");
        this.liqueUser1("");
        this.liqueUnit1("");
        this.liqueContr1("");
      }else if(this.type==2){
        console.log(this.provincesAdress)
        this.liqueRecord3(this.cityMap[this.provincesAdress]);
        this.liqueProportion3(this.cityMap[this.provincesAdress]);
        this.liqueStatus3(this.cityMap[this.provincesAdress]);
        this.liqueWeek3(this.cityMap[this.provincesAdress]);
        this.liqueUser3(this.cityMap[this.provincesAdress]);
        this.liqueUnit3(this.cityMap[this.provincesAdress]);
        this.liqueContr3(this.cityMap[this.provincesAdress]);

      }else if(this.type==3){
        this.liqueRecord4(this.code);
        this.liqueProportion4(this.code);
        this.liqueStatus4(this.code);
        this.liqueWeek4(this.code);
        this.liqueUser4(this.code);
        this.liqueUnit4(this.code);
        this.liqueContr4(this.code);
        
      }
    },

    async liqueNumber1(val) {
      let map = val;
      const res = await this.$http.get(`/data/status/number?code=${map}`);
      console.log(res);
      var arr = res.data.data;
      var arr1 = [];
      for (var i = 0; i < arr.length; i++) {
        arr1.push(arr[i].valus);
      }
      this.LIQUENumber(arr1);
    },

    async liqueNumber2(val) {
      let map = val;
      const res = await this.$http.get(`/data/status/number?code=${map}`);
      console.log(res);
      var arr = res.data.data;
      var arr1 = [];
      for (var i = 0; i < arr.length; i++) {
        arr1.push(arr[i].valus);
      }
      this.LIQUENumber(arr1);
    },
    async liqueNumber3(val) {
      let map = val;
      const res = await this.$http.get(`/data/status/number?code=${map}`);
      console.log(res);
      var arr = res.data.data;
      var arr1 = [];
      for (var i = 0; i < arr.length; i++) {
        arr1.push(arr[i].valus);
      }
      this.LIQUENumber(arr1);
    },
    async liqueNumber4(val) {
      console.log("<--------------")
      console.log(val)
      let map = val;
      const res = await this.$http.get(`/data/status/number?code=${map}`);
      console.log(res);
      var arr = res.data.data;
      var arr1 = [];
      for (var i = 0; i < arr.length; i++) {
        arr1.push(arr[i].valus);
      }
      this.LIQUENumber(arr1);
    },
    // /data/contr
    async liqueContr1(val) {
      let map = val;
      const res = await this.$http.get(`/data/contr?code=${map}`);
      console.log("===============")
      console.log(res);
      var obj = res.data.data;
      var arr1 = [];
      for (var k in obj) {
        arr1.push(obj[k]);
      }
      console.log(arr1);
      this.LIQUECONTR(arr1);
    },

    async liqueContr2(val) {
      let map = val;
      const res = await this.$http.get(`/data/contr?code=${map}`);
      console.log(res);
      var obj = res.data.data;
      var arr1 = [];
      for (var k in obj) {
        arr1.push(obj[k]);
      }
      console.log(arr1);
      this.LIQUECONTR(arr1);
    },

    async liqueContr3(val) {
      let map = val;
      const res = await this.$http.get(`/data/contr?code=${map}`);
      console.log(res);
      var obj = res.data.data;
      var arr1 = [];
      for (var k in obj) {
        arr1.push(obj[k]);
      }
      console.log(arr1);
      this.LIQUECONTR(arr1);
    },

    async liqueContr4(val) {
      let map = val;
      const res = await this.$http.get(`/data/contr?code=${map}`);
      console.log(res);
      var obj = res.data.data;
      var arr1 = [];
      for (var k in obj) {
        arr1.push(obj[k]);
      }
      console.log(arr1);
      this.LIQUECONTR(arr1);
    },

    async liqueUnit1(val) {
      let map = val;
      const res = await this.$http.get(`/data/unit?code=${map}&bottleType=1`); //china
      console.log(res);
      var obj = res.data.data;
      var arr1 = [];
       for (var k in obj) {
        arr1.push(obj[k]);
      }
      console.log(arr1);
      this.LIQUEUNIT(arr1);
    },

    async liqueUnit2(val) {
      let map = val;
      const res = await this.$http.get(`/data/unit?code=${map}&bottleType=1`); //china
      console.log(res);
      var obj = res.data.data;
      var arr1 = [];
       for (var k in obj) {
        arr1.push(obj[k]);
      }
      console.log(arr1);
      this.LIQUEUNIT(arr1);
    },
    async liqueUnit3(val) {
      let map = val;
      const res = await this.$http.get(`/data/unit?code=${map}&bottleType=1`); //china
      console.log(res);
      var obj = res.data.data;
      var arr1 = [];
       for (var k in obj) {
        arr1.push(obj[k]);
      }
      console.log(arr1);
      this.LIQUEUNIT(arr1);
    },

    async liqueUnit4(val) {
      let map = val;
      const res = await this.$http.get(`/data/unit?code=${map}&bottleType=1`); //china
      console.log(res);
     var obj = res.data.data;
      var arr1 = [];
       for (var k in obj) {
        arr1.push(obj[k]);
      }
      console.log(arr1);
      this.LIQUEUNIT(arr1);
    },

    //  /data/user

    async liqueUser1(val) {
      let map = val;
      const res = await this.$http.get(`/data/user?code=${map}`); //china
      console.log(res);
      this.LIQUEUSER(res.data.data);
    },

    async liqueUser2(val) {
      let map = val;
      const res = await this.$http.get(`/data/user?code=${map}`); //
      console.log(res);
      this.LIQUEUSER(res.data.data);
    },
    async liqueUser3(val) {
      let map = val;
      const res = await this.$http.get(`/data/user?code=${map}`); //
      console.log(res);
      this.LIQUEUSER(res.data.data);
    },
    async liqueUser4(val) {
      let map = val;
      const res = await this.$http.get(`/data/user?code=${map}`); //china
      console.log(res);
      this.LIQUEUSER(res.data.data);
    },

    // /data/week
    async liqueWeek1(val) {
      // LIQUEWEEK
      let map = val;
      const res = await this.$http.get(`/data/week?code=${map}`); //china
      console.log(res);
      this.LIQUEWEEK(res.data.data);
    },
    async liqueWeek2(val) {
      // LIQUEWEEK
      let map = val;
      const res = await this.$http.get(`/data/week?code=${map}`); //china
      console.log(res);
      this.LIQUEWEEK(res.data.data);
    },
    async liqueWeek3(val) {
      // LIQUEWEEK
      let map = val;
      const res = await this.$http.get(`/data/week?code=${map}`); //china
      console.log(res);
      this.LIQUEWEEK(res.data.data);
    },
    async liqueWeek4(val) {
      // LIQUEWEEK
      let map = val;
      const res = await this.$http.get(`/data/week?code=${map}`); //china
      console.log(res);
      this.LIQUEWEEK(res.data.data);
    },
    // /data/status
    async liqueStatus1(val) {
      let map = val;
      const res = await this.$http.get(`/data/status?code=${map}`); //china
      console.log(res);
      this.LIQUESTATUS(res.data.data);
    },
    async liqueStatus2(val) {
      let map = val;
      const res = await this.$http.get(`/data/status?code=${map}`); //china
      console.log(res);
      this.LIQUESTATUS(res.data.data);
    },
    async liqueStatus3(val) {
      let map = val;
      const res = await this.$http.get(`/data/status?code=${map}`); //china
      console.log(res);
      this.LIQUESTATUS(res.data.data);
    },
    async liqueStatus4(val) {
      let map = val;
      const res = await this.$http.get(`/data/status?code=${map}`); //china
      console.log(res);
      this.LIQUESTATUS(res.data.data);
    },

    async liqueRecord1(val) {
      let map = val;
      const res = await this.$http.get(`/data/record?code=${map}`); //china
      console.log(res);
      this.LIQUERECORD(res.data.data);
    },
    async liqueRecord2(val) {
      let map = val;
      const res = await this.$http.get(`/data/record?code=${map}`); //china
      console.log(res);
      this.LIQUERECORD(res.data.data);
    },
    async liqueRecord3(val) {
      let map = val;
      const res = await this.$http.get(`/data/record?code=${map}`); //china
      console.log(res);
      this.LIQUERECORD(res.data.data);
    },

    async liqueRecord4(val) {
      let map = val;
      const res = await this.$http.get(`/data/record?code=${map}`); //china
      console.log(res);
      this.LIQUERECORD(res.data.data);
    },

    //气瓶占比
    async liqueProportion1(val) {
       let map = val;
      const res = await this.$http.get(`/data/proportion?code=${map}`); //china
       console.log(res);
      var arr = res.data.data;
      // // console.log(arr);
      var arr1 = [];
      for (var i = 0; i < arr.length; i++) {
        arr1.push({ name: arr[i].name, value: Number(arr[i].valus) });
      }
      console.log(arr1);
      // this.tabeData = res.data.data;
      this.LIQUEPROPORTION(arr1);
    },

    async liqueProportion2(val) {
       let map = val;
      const res = await this.$http.get(`/data/proportion?code=${map}`); //china
       console.log(res);
      var arr = res.data.data;
      // // console.log(arr);
      var arr1 = [];
      for (var i = 0; i < arr.length; i++) {
        arr1.push({ name: arr[i].name, value: Number(arr[i].valus) });
      }
      console.log(arr1);
      // this.tabeData = res.data.data;
      this.LIQUEPROPORTION(arr1);
    },
    async liqueProportion3(val) {
       let map = val;
      const res = await this.$http.get(`/data/proportion?code=${map}`); //china
       console.log(res);
      var arr = res.data.data;
      // // console.log(arr);
      var arr1 = [];
      for (var i = 0; i < arr.length; i++) {
        arr1.push({ name: arr[i].name, value: Number(arr[i].valus) });
      }
      console.log(arr1);
      // this.tabeData = res.data.data;
      this.LIQUEPROPORTION(arr1);
    },
    async liqueProportion4(val) {
       let map = val;
       
      const res = await this.$http.get(`/data/proportion?code=${map}`); //china
       console.log(res);
      var arr = res.data.data;
      // // console.log(arr);
      var arr1 = [];
      for (var i = 0; i < arr.length; i++) {
        arr1.push({ name: arr[i].name, value: Number(arr[i].valus) });
      }
      console.log(arr1);
      // this.tabeData = res.data.data;
      this.LIQUEPROPORTION(arr1);
    },
  },
  updated() {
    // this.init(this.liqCity)
  },

  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
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
  overflow-y: hidden;
  width: 100%;
  height: 100%;
  padding-right: 1%;
  position: relative;
  /* background: url("../../../static/images/libg.png"); */
  background-size: 100% 100%;
}
.headTitle {
  width: 100%;
  height: 8vh;
  background: url("../../../static/images/liquefied/head2.png") no-repeat;
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
  flex: 1;
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
  margin-top: -3.8vh;
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.left_12{
  margin-top: -4vh;
}
.left_12 > img {
  width: 100%;
  height: 5vh;
  cursor: pointer;
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
  flex: 2;
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
  flex: 1;
  display: flex;
  flex-direction: column;
  padding-right: 10px;
}
.bodyCon .rightCon .right_1 {
  flex: 1;
  background: url("../../../static/images/liquefied/left_1.png") no-repeat;
  background-size: 100% 100%;
  /* margin-bottom: 10px; */
  display: flex;
  flex-direction: column;
}
.bodyCon .rightCon .right_1 .rightData {
  flex: 3;
  display: flex;
  justify-content: center;
  align-items: center;
  /* padding: 0 5%; */
  /* padding-left: 5.5%;
  padding-top:5% */
  /* text-align: center; */
}
.bodyCon .rightCon .right_1 .rightData div p {
  font-size: 20px;
  color: white;
  text-align: center;
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

