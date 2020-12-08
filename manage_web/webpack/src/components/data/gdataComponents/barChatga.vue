
<template>
  <div class="barCon">
    {{$store.state.gdaMapData.totalNumCylinders}}
    <div id="barChatga" :style="barChartSty"></div>
    <!-- <div class="daCon">
      <div class="upDiv">
        <p class="num1">320,11</p>
        <p class="num2">
          <span></span>点位分布
        </p>
      </div>
      <div class="downDiv">
        <p class="num1">320,11</p>
        <p class="num2">
          <span></span>点位分布
        </p>
      </div>
    </div> -->
  </div>
</template>

<script>
import echarts from "echarts/lib/echarts";
import { mapState } from "vuex";
export default {
  data() {
    return {
      dataAxis: [  
        "广州",
        "上海",      
        "北京",
        "杭州",
        "深圳",
        "厦门",
        "济南",
        "成都",
        "拉萨",
        "重庆",
        "合肥",
        "成都",
      ],
      myChart: "",
      data: [
        22108,
        18224,
        19114,
        23417,
        29015,
        33016,
        31019,
        12317,
        44215,
        32116,
        12023,
        14912
      ],
      yMax: 500,
      dataShadow: []
    };
  },
   computed: {
    ...mapState(["gdaMapData"]),
  },
  watch: {
    gdaCity(v) {
      console.log(this.gdaMapData.totalNumCylinders);
    },
  },
  props: {
    y: {
      type: String,
      default: "50%"
    },
    barChartSty: {
      type: String,
      default: "width: 100%;height:26vh;"
    }
  },
   
  mounted() {
    this.myChart = this.$echarts.init(document.getElementById("barChatga"));
    this.init();
  },
  methods: {
    init() {
      var _this = this;
      for (var i = 0; i < this.data.length; i++) {
        this.dataShadow.push(this.yMax);
      }
      var option = {
        title: {
          text: "气瓶数量统计",
          textStyle:{
                    color:'#295aaa',        //颜色
                },
          x: "10%",
          y: 10
        },
        tooltip:{
         trigger:'axis',
          formatter:function(params){
         
          return params[1].name+"<br/>"+
                  "气瓶数量:"+params[1].data

        },

       },
        grid:{
          x:"20%",
          y:50,
          x2:20,
          y2:50,
          borderWidth:1
          },
        xAxis: {
          data: this.dataAxis,
          axisLabel: {
            textStyle: {
              color: "#fff"
            }
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false,
           
          },
          z: 10
        },
        yAxis: {
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: "#fff"
            }
          }
        },
        dataZoom: [
          {
            show: true,
            height: 5,
            xAxisIndex: [0],
            bottom: 20,
            showDetail: false,
            showDataShadow: false,
            borderColor: "transparent",
            textStyle: {
              fontSize: 0
            },
            endValue: 10, //从0开始的相当于5个
            //   backgroundColor: "rgba(0,0,0,0)",
            borderWidth: 0,

            handleSize: "0%",
            handleStyle: {
              color: "#d3dee5"
            }
          }
        ],
        series: [
          {
            // For shadow
            type: "bar",
            center: ["50%", _this.y],
            itemStyle: {
              color: "rgba(0,0,0,0.05)"
            },
            barGap: "-100%",
            // barCategoryGap: "40%",
            data: this.dataShadow,
            animation: false
          },
          {
            type: "bar",
            itemStyle: {
              // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              //   { offset: 0, color: "#83bff6" },
              //   { offset: 0.5, color: "#188df0" },
              //   { offset: 1, color: "#188df0" }
              // ])
              normal: {
                //这里是重点
                color: function(params) {
                  //注意，如果颜色太少的话，后面颜色不会自动循环，最好多定义几个颜色
                  var colorList = [
                    "#8552a1",
                    "#c23531",
                    "#f26522",
                    "#2f4554",
                    "#61a0a8",
                    "#d48265",
                    "#91c7ae",
                    "#749f83",
                    "#ca8622"
                  ];
                  var index;
                  //给大于颜色数量的柱体添加循环颜色的判断
                  if (params.dataIndex >= colorList.length) {
                    index = params.dataIndex - colorList.length;
                    return colorList[index];
                  }
                  return colorList[params.dataIndex];
                }
              }
            },
            emphasis: {
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#2378f7" },
                  { offset: 0.7, color: "#2378f7" },
                  { offset: 1, color: "#83bff6" }
                ])
              }
            },
            data: this.data
          }
        ]
      };

      this.myChart.setOption(option);
      window.addEventListener("resize", function() {
        _this.myChart.resize();
      });
    }
  }
};
</script>

<style>
.barCon {
  display: flex;
  padding-right: 10%;
  /* padding-left: 4%; */
}
.daCon {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.barCon div .upDiv .num1 {
  font-size: 23px;
  flex: 1;
}
.barCon div .upDiv .num2 {
  flex: 1;
  font-size: 12px;
  color: #61a7fe;
}
.barCon div .upDiv .num2 span {
  display: inline-block;
  width: 4px;
  border: 1px solid red;
  background-color: red;
  height: 12px;
  margin-right: 4px;
}
.barCon div .downDiv {
  margin-top: 20%;
}
.barCon div .downDiv .num1 {
  font-size: 23px;
  /* flex: 1; */
}
.barCon div .downDiv .num2 {
  font-size: 12px;
  color: #61a7fe;
}
.barCon div .downDiv .num2 {
  font-size: 12px;
  color: #61a7fe;
}
.barCon div .downDiv .num2 span {
  display: inline-block;
  width: 4px;
  border: 1px solid #eacf19;
  background-color: #eacf19;
  height: 12px;
  margin-right: 4px;
}
</style>