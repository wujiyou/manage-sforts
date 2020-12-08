<template>
  <div id="box">
    <h4>
      <button @click="echartsToggleValue = !echartsToggleValue" class="button1">点击切换</button>
    </h4>
    <echarts-demo :option="echartsOption" class="echarts1"/>

  </div>
</template>

<script>
import echarts from "echarts"; //这里引入只是为了取得渐变option

/**
 * 封装的chart组件，也可以直接写到这个页面，只是这样比较简洁，方便理解
 * */
import EchartsDemo from "@/components/charts/EchartsDemo";

/**
 * echarts options*/
let dataShadow = [];
let data = [
  220,
  182,
  191,
  234,
  290,
  330,
  310,
  123,
  442,
  321,
  90,
  149,
  210,
  122,
  133,
  334,
  198,
  123,
  125,
  220
];
let yMax = 500;
for (let i = 0; i < data.length; i++) {
  dataShadow.push(yMax);
}
const echartsOption1 = {
    title: { text: '液化气瓶数量状态统计' },
    tooltip: {},
     grid: {
		        left: '5%',
		        right: '4%',
		        bottom: '3%',
		        containLabel: true
		    },
    xAxis: {
        data: ["今日数据","昨日数据","一周数据","本周数据","本月数据","半年数据"]
    },
    yAxis: {},
    series: [{
        name: '销量',
        type: 'bar',
        data: [6, 10, 39, 42, 130, 230],
        itemStyle:{
                   normal:{
                              color:'gray'
                                    }
                                }, 
    }]
};
const echartsOption2 = {
    title: {
        text: '车用气瓶数量状态统计',
        subtext: '',
        left: 'center'
    },
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
    },
    series: [
        {
            name: '',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
                {value: 335, name: '直接访问'},
                {value: 310, name: '邮件营销'},
                {value: 234, name: '联盟广告'},
                {value: 135, name: '视频广告'},
                {value: 1548, name: '搜索引擎'}
            ],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};
export default {
  name: "Charts",
  components: {
    EchartsDemo
    //   HighchartsDemo
  },
  data() {
    return {
      echartsToggleValue: true
    };
  },
  computed: {
    echartsOption() {
      return this.echartsToggleValue ? echartsOption1 : echartsOption2;
    }
  }
};
</script>

<style scoped>
#box{
    width: 100%;
    height: 100%;
}
.button1{
    border: 1px solid #83b1f2;
    background-color: rgb(215,228,247);
    height: 30px;
}
.echarts1{
    margin: 150px auto;
    width: 50%;
    height: 50%;
}

</style>