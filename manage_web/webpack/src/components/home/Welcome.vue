<template>
     <!-- <el-main style="background-color:#F4F6F8;width:100%;height:100%;"> -->
        <!-- <h1>液化瓶统计</h1> -->
          
         
      <!-- </el-main> -->
      <div class="wrapper">
       <div id="box1">
              <div id="main2" style="width: 45%;height:1.5rem;"></div>
              <div id="main4" style="width: 45%;height:1.5rem;"></div>
          </div>
          <!-- <div id="main5" style="width: 100%;height:400px;"></div> -->
          <div id="box">
          <div id="main1" style="width: 45%;height:1.5rem;"></div>
          <div id="main3" style="width: 45%;height:1.5rem;"></div>
          
          </div>
       <router-view></router-view>
    <!-- <div class="box1"></div>
    <div class="box2"></div>
    <div class="box3"></div>
    <div class="box4"></div>
    <div class="box5"></div> -->

  </div>
</template>

<script>

// 1.导入echarts
import echarts from 'echarts'
export default {
       mounted() {
// 基于准备好的dom，初始化echarts实例
var myChart1 = echarts.init(document.getElementById('main1'));
var myChart2 = echarts.init(document.getElementById('main2'));
var myChart3 = echarts.init(document.getElementById('main3'));
var myChart4 = echarts.init(document.getElementById('main4'));

myChart2.setOption({
    
    title: { text: '气瓶数量状态比统计' },
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    series: [
          {
            name: "状态比",
            type: "pie",
            // radius: [30, "50%"],
            // center: ["50%", "50%"],
            label: {
              color:"black",
              fontSize: 12
            },
            data: [
              {
                value: 50,
                name: "合格50%",
                itemStyle: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: "rgba(235,101,47,1)" },
                    { offset: 1, color: "rgba(247,153,58,1)" }
                  ])
                }
              },
              {
                value: 30,
                name: "即将超期20%",
                itemStyle: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: "rgba(231,231,50,1)" },
                    { offset: 1, color: "rgba(231,231,50,0.8)" }
                  ])
                }
              },
              {
                value: 15,
                name: "超期未检15%",
                itemStyle: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: "rgba(57,171,250,1)" },
                    { offset: 1, color: "rgba(57,171,250,1)" }
                  ])
                }
              },
               {
                value: 5,
                name: "报废5%",
                itemStyle: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: "rgba(58,121,29,1)" },
                    { offset: 1, color: "rgba(58,121,29,1)" }
                  ])
                }
              }
            ]
          }
        ]
});
myChart4.setOption({
    title: { text: '车辆类型统计' },
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    color : [ 'red', 'orange', 'purple'],
    series: [
          {
            name: "状态比",
            type: "pie",
            // radius: [30, "50%"],
            // center: ["50%", "50%"],
            label: {
              color:"black",
              fontSize: 12
            },
            data: [
                {value: 335, name: '私家车'},
                {value: 310, name: '公交车'},
                {value: 234, name: '出租车'}
            ]
          }]
});

// myChart5.setOption({
//     title: {
//         text: '加气次数时段统计',
//     },
//     tooltip: {
//         trigger: 'axis',
//         axisPointer: {
//             type: 'shadow'
//         }
//     },
//     grid: {
//         left: '3%',
//         right: '4%',
//         bottom: '3%',
//         containLabel: true
//     },
//     xAxis: {
//         type: 'value',
//          name: "加气/次"
         
//     },
//     yAxis: {
//         type: 'category',
//          name: "时间段",
//         data: ['0-3','3-6','6-9','9-12','12-15', '15-18','18-21', '21-24']
//     },
//     series: [
//         {
//             name: '加气数',
//             type: 'bar',
//             data:[8,16,13,9,5,6,3,12],
//             barWidth : 20,
//             itemStyle:{
//                                     normal:{
//                                         color:'#0e8be7'
//                                     }
//                                 }
//         }
        
//     ]  
// });
myChart1.setOption({
    color:['#25caba'],
    title: { text: '加气员工统计' },
    tooltip:{},

     grid: {
		        left: '5%',
		        right: '4%',
		        bottom: '3%',
		        containLabel: true
		    },
    xAxis: {
        data: ["陈德森","李志强","曹宇","方明","赵杨"],
        
    },
    yAxis: {
        name: "加气/次"
    },
    series: [{
        name: '加气次数',
        type: 'bar',
        data: [6, 10, 39,18,23],
        barWidth : 30
    }]
});
myChart3.setOption({
    title: { text: '加气枪号统计' },
    tooltip: {},
     grid: {
		        left: '5%',
		        right: '4%',
		        bottom: '3%',
		        containLabel: true
		    },
    xAxis: {
        data: ["6","9","16","1","3"],
        
    },
    yAxis: {
        name: "加气/次"
    },
    series: [{
        name: '加气次数',
        type: 'bar',
        data: [32, 5, 60,22,23],
        barWidth : 30,
         itemStyle:{
                                    normal:{
                                        color:'#ff9957'
                                    }
                                }
    }]
});
} 
 
}
</script>

<style scoped>
   #box,#box1{
  display: flex;
  justify-content: space-around;
  margin-bottom: 0.5rem;
  margin-top: 0.3rem;
  
}
#box{
  margin-top: 0.5rem;
  
}
* {
	  margin: 0;
	  padding: 0;
	}
</style>