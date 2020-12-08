<template>
  <div class="lzxqCityCon">
      <!-- 兰州新区 -->
      <!-- <div class="box"> -->
          <button v-if="isShowBtn" class="backBtn" @click="back()">返回上级</button>
      <!-- </div> -->
      <!-- <div class="mapBox"> -->
          <!-- <div @click="getQingGhuan('秦川园区')"> -->
            <div v-show="isMap" :id="mapId" :style="heigs"></div>
            <div v-show="!isMap" class="imgBox" >
              <div v-for="(item,i) in dataList" :key="i">
                  <div :class="'div'+i" @mouseenter="mouseHover(i)" @mouseleave="mouseLeaves()">
                    <img :class="'img'+i" :src="mark==i ? item.activeUrl:item.url" @click="getValue(item)"/>
                 </div>
              </div>
            </div>
             
              <!-- <div class="div1">
                  <img class="img1" src="../../assets/images/qing.png"/>
              </div>
              <div class="div2">
                  <img class="img2" src="../../assets/images/zhong.png">
              </div>
              <div class="div3">
                  <img class="img3" src="../../assets/images/dong.png">
              </div> -->
              
              <!-- </div> -->

      <!-- </div> -->
      <!-- <div @click="getZhongGhuan('中川园区')">
          中川园区</div>
      
      <div @click="getXiCha('西岔园区')">西岔园区</div> -->

  </div>
</template>

<script>
export default {
    data(){
        return{
            countyCity:{
                 西岔园区:623301,
                 秦川园区:623302,
                 中川园区:623303
            },
            isShowBtn:true,
            isMap:false,
            mapPoints: [],
            dataList:[
                {
                    value:'秦川园区',
                    gt:103.709589,
                    lt:36.636578,
                    code:'623302',
                    url:require('../../assets/images/qing.png'),
                    activeUrl:require('../../assets/images/qing2.png')
                },
                {
                    value:'中川园区',
                    gt:103.678967,
                    lt:36.495596,
                    code:623303,
                    url:require('../../assets/images/zhong.png'),
                     activeUrl:require('../../assets/images/zhong2.png')
                },
                {
                    value:'西岔园区',
                    gt:103.756227,
                    lt:36.539888,
                    code:623301,
                    url:require('../../assets/images/xic.png'),
                     activeUrl:require('../../assets/images/xi2.png')
                }
            ],
            mark:3

        }

    },
    methods:{
        mouseHover(v){
            console.log(v)
            this.mark=v
        },
        mouseLeaves(){
            this.mark=3
        },
        getValue(v){
            console.log(v)
             this.$store.commit(this.CommitType, v.value);
             this.isMap=true
             this.createMap(v.gt,v.lt,v.value,v.code)

        },
        back() {
            this.$store.commit(this.CommitType, "兰州新区");
            this.isMap=false
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
        async createMap(gt, lt, cityName, cityMapCode) {
          var city = cityName;
          console.log(city);
          var cityscode = cityMapCode;
          if (this.areaType == 1) {
            // ?code=${city}
            const res = await this.$http.get(`stats/map`); //液化
            console.log("液化");
            this.mapPoints = res.data.data;
            console.log(res)
          } else if (this.areaType == 2) {
            console.log(cityscode, city);
            // ?cityCode=${cityscode}&areaName=${city}
            const res = await this.$http.get(`/car-stats/mapUnit`); //车用
            console.log(res);
            console.log("车用");
            this.mapPoints = res.data.data;
          } else if (this.areaType == 3) {
            // ?code=${city}
            const res = await this.$http.get(`/new-industry/map`); //工业
            console.log("工业");
            console.log(res);
            this.mapPoints = res.data.data;
          }

          const res = await this.$http.get(`/new-industry/map?code=${city}`);
          this.map = new BMap.Map(this.mapId);
          let map = this.map;
          console.log(map)
          let _that = this;
          map.centerAndZoom(new BMap.Point(gt, lt), 11); // 初始化地图,设置中心点坐标和地图级别
          map.enableScrollWheelZoom(true);
          // var bdary = new BMap.Boundary();
          // bdary.get(cityName, function (rs) {
          //   //获取行政区域
          //   map.clearOverlays(); //清除地图覆盖物
          //   var count = rs.boundaries.length; //行政区域的点有多少个
          //   console.log(rs)

          //   for (var i = 0; i < count; i++) {
          //     var ply = new BMap.Polygon(rs.boundaries[i], {
          //       strokeWeight: 2, //设置多边形边线线粗
          //       fillOpacity: 0.1,
          //       strokeOpacity: 1, //设置多边形边线透明度0-1
          //       StrokeStyle: "solid", //设置多边形边线样式为实线或虚线，取值 solid 或 dashed
          //       strokeColor: "#ff0000", //设置多边形边线颜色
          //     }); //建立多边形覆盖物
          //     map.addOverlay(ply); //添加覆盖物
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

                if (_that.areaTypes == 1) {
                  //液化
                  var infoWindows = new BMap.InfoWindow(
                    "配送站:" +
                      v.building_user +
                      "<br/>" +
                      "标签号：" +
                      v.appid +
                      "<br/>" +
                      "客户姓名：" +
                      v.customer_name +
                      "" +
                      "<br/>" +
                      "下检日期：" +
                      v.date +
                      "" +
                      "<br/>" +
                      "手机号：" +
                      v.phone +
                      "" +
                      "<br/>" +
                      "登记证号：" +
                      v.reg_id +
                      "" +
                      "",
                    opts
                  );
                } else if (_that.areaTypes == 2) {
                  //车用
                  var infoWindows = new BMap.InfoWindow(
                    "单位名称:" +
                      v.unitName +
                      "<br/>" +
                      "单位负责人：" +
                      v.personnelName +
                      "<br/>" +
                      "手机号：" +
                      v.phone +
                      "",
                    opts
                  );
                } else if (_that.areaTypes == 3) {
                  //工业
                  var infoWindows = new BMap.InfoWindow(
                    "配送站:" +
                      v.building_user +
                      "<br/>" +
                      "标签号：" +
                      v.appid +
                      "<br/>" +
                      "客户姓名：" +
                      v.customer_name +
                      "" +
                      "<br/>" +
                      "下检日期：" +
                      v.date +
                      "" +
                      "<br/>" +
                      "手机号：" +
                      v.phone +
                      "" +
                      "<br/>" +
                      "登记证号：" +
                      v.reg_id +
                      "" +
                      "",
                    opts
                  );
                }

                _that.markerFun(points, label, infoWindows);
              });

              // map.setViewport(ply.getPath()); //调整视野
          //   }
          // });

          $(".anchorBL").remove(); //删除左下角百度地图logo

          //添加地图类型控件
          map.addControl(
            new BMap.MapTypeControl({
              mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP],
            })
          );
          // $(".anchorBL").remove();
          map.setCurrentCity(cityName); // 设置地图显示的城市 此项是必须设置的
          map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
          var mapStyle = { style: "midnight" };
          map.setMapStyle(mapStyle);
        },

    },
    props:{
        heigs: {
          type: String,
          default: "width:100%;height:52vh;marginTop:50px",
        },
       isnorMal: {
         type: Boolean,
         default: true,
       },
       mapId: {
         type: String,
       },
       cityName: {
         type: String,
       },
       CommitType: {
         type: String,
       },
       areaType: {
         type: Number,
       },
       areaTypes: {
         type: Number,
       },
    }

}
</script scoped>

<style scoped>
 .lzxqCityCon{
     position: relative;
   
 }
 div{
    color: beige;
    cursor: pointer;
 }
 .box {
  position: position;
  width: 100%;
  z-index: 100;
  /* height: 70vh; */
  top: 20px;
  margin: 0 auto;
  /* left: 5%;
  top: 10%; */
  /* background-color: rgba(24, 27, 52, 0.62); */
}

.div0{
    width: 100px;
    position: absolute;
    top: 47.5px;
    left: 120px;
}
.div1{
    width: 59px;
    position: absolute;
    top: 138px;
    left: 140px;
}
.div2{
    width: 47px;
    position: absolute;
    top: 143px;
    left: 186px;

}
.img0{
    width: 100%;
    height: 40%;
}
.img1{
     width: 100%;
    height: 30%;
}
.img2{
     width: 100%;
    height: 30%;
}
 .backBtn {
  padding: 5px 5px;
  position: absolute;
  top: 40px;
  right: 40px;
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

</style>