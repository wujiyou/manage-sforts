import Vue from 'vue'
import Router from 'vue-router'
import Login from "@/components/login/Login"


import home from "@/components/home/home"
import users from "@/components/user/users"
import filling from "@/components/user/filling"
import sufficient from "@/components/user/sufficient"
import house from "@/components/user/house"
import notice from "@/components/user/notice"
// 移动充装记录
import mobilerecord from "@/components/role/mobilerecord"
// 检验变更记录
import verify from "@/components/role/verify"
// 移动充装扫描记录
import scannogram from "@/components/role/scannogram"
 
// 移动充装档案查询
import demand from "@/components/role/demand"

// 超期预警 
import warning from "@/components/role/warning"
// 黑名单
import blacklist from "@/components/role/blacklist"
// 气瓶异常充装信息
import abnormal from "@/components/role/abnormal"
import orders from "@/components/indent/orders"
// 气瓶地图显示
// import mapp from "@/components/flow/mapp"
import atlas from "@/components/flow/atlas"
// 液化气瓶档案管理
import cylinder from "@/components/archives/cylinder"
// 气瓶超期预警
import extended from "@/components/archives/extended"
// 气瓶信息管理
import message from "@/components/archives/message"
// 气瓶标签发卡管理
import report from "@/components/archives/report"
// 气瓶检验报告
import tagboard from "@/components/archives/tagboard"

// 送货完成气瓶
import accomplish from "@/components/flow/accomplish"
// 配送完成气瓶
import delivery from "@/components/flow/delivery"
// 出栈气瓶统计
import outstack from "@/components/flow/outstack"
// 入栈气瓶统计
import stacked from "@/components/flow/stacked"

// 运输企业登记管理
import enterpriser from "@/components/transport/enterpriser"
// 运输车挡管理
import record from "@/components/transport/record"


// 客户评价投诉处理
import evaluate from "@/components/customers/evaluate"
// 客户配送信息
import information from "@/components/customers/information"

// 客户订单信息
import order from "@/components/customers/order"
// 客户档案管理
import portfolio from "@/components/customers/portfolio"

// 用户管理
import username from "@/components/system/username"
// 角色管理
import administration from "@/components/system/administration"

// 应用更新
import update from "@/components/update/update"

// 硬件appid配置
import hardware from "@/components/system/hardware"

import operation from "@/components/system/operation"

// 密码修改
import change from "@/components/system/change"

// 充装记录查询
import trace from "@/components/customers/trace"

// 充装数量统计

import number from "@/components/customers/number"

//档案新增里的工业气瓶
import industrial from "@/components/industrial/industrial"

//标签发卡里的工业气瓶
import bindustrial from "@/components/bindustrial/bindustrial"

//检验报告里的工业气瓶
import jindustrial from "@/components/jindustrial/jindustrial"

//档案新增里的车用气瓶
import cindustrial from "@/components/cindustrial/cindustrial"

//标签发卡里的车用气瓶
import cindustrial1 from "@/components/cindustrial/cindustrial1"

//检验报告里的车用气瓶
import cindustrial2 from "@/components/cindustrial/cindustrial2"


//档案新增的车用气瓶信息查看
import cinmessage from "@/components/cindustrial/cinmessage"

//单位登记里的监管机构
import registration1 from "@/components/registration/registration1"

//单位登记里的制造单位
import registration2 from "@/components/registration/registration2"


//单位登记里的充装单位
import registration3 from "@/components/registration/registration3"

//单位登记里的检验单位
import registration4 from "@/components/registration/registration4"

//单位登记里的使用单位
import registration5 from "@/components/registration/registration5"

//单位登记里的配送单位
import registration6 from "@/components/registration/registration6"

//单位登记里的配送单位的价格显示
import price from "@/components/registration/price"
//单位登记里的充装单位的价格显示
import prices from "@/components/registration/prices"

//个人中心的充装单位的价格显示
import lookprice from "@/components/registration/lookprice"
// 人员超期预警
import personnel from "@/components/Personnel/personnel"

// 单位到期预警
import due from "@/components/Personnel/due"

// 气瓶登录弱智
import registration from "@/components/system/registration"

// 气瓶检查日志
import Inspection from "@/components/system/Inspection"

import Hairpin from "@/components/system/Hairpin"

import Password from "@/components/system/Password"


import anquan from "@/components/system/anquan"
//车用加气统计
import cfilling from "@/components/data/cfilling"

//车用数量状态统计
import cnumber from "@/components/data/cnumber"

//液化订单统计
import yorder from "@/components/data/yorder"

// 液化订单统计
import gdata2 from "@/components/data/gdata2"


// 液化订单统计
import sdata from "@/components/data/sdata"


// 液化订单统计
import ydata from "@/components/data/ydata"

//工业
import gdata1 from "@/components/data/gdata1"

//工业
import gdata from "@/components/data/gdata"

//登录后跳转页面
import index from "@/components/index/index"

//车用
import vehicle from "@/components/vehicle/vehicle"

//大数据总页面
const allData = ()=>import ("@/components/liquefied/allData")

//液化
import liquefied from "@/components/liquefied/liquefied"

// 移动充装
import mobilefilling from "@/components/liquefied/mobilefilling"

// 数据平台背景特效测试使用
import liquefiedceshi from "@/components/liquefied/liquefiedceshi"

//档案新增的工用气瓶信息查看
import meges from "@/components/industrial/meges"

// 加气站特权卡发卡
import privilege from "@/components/user/privilege"

// 超期气瓶扫描记录
import out from "@/components/role/out"

//未授权充装记录
import unauth from "@/components/role/unauth"

//特权卡充装记录
import tq from "@/components/role/tq"


//工业气瓶充装记录
import gy from "@/components/role/gy"

//单位管理
import registration7 from "@/components/registration/registration7"


//单位管理的用户管理
import developers from "@/components/system/developers"

//特权卡使用日志
import operation1 from "@/components/role/operation1"


//综合查询 工业气瓶
//气瓶数量状态
import gynumber from "@/components/cosmoplat/gynumber"

//配送完成气瓶
import gypeisong from "@/components/cosmoplat/gypeisong"

//客户订单管理
import gyorder from "@/components/cosmoplat/gyorder"

//地图
import gyatlas from "@/components/cosmoplat/gyatlas"


import word from "@/components/update/word"

const allMap = ()=>import ("@/components/allMap/allMap")

import gd from "@/components/data/gd"

import {
  Message
} from 'element-ui';

Vue.use(Router)

const router = new Router({
  // mode: "history",
  base: __dirname,
  routes: [{
      path: '/',
      name: 'logins',
      component: Login
    },
    {
      path: '/index',
      name: 'index',
      component: index
    },
    //工业气瓶大数据
    {
      path: '/gd',
      name: 'gd',
      component: gd
    },
    //四大数据平台界面
    {
      path: '/allMap',
      name: 'allMap',
      component: allMap
    },
    //液化气瓶大数据
    {
      path: '/home',
      name: 'home',
      component: home,
      redirect: '/liquefied',
      children: [{
          path: '/home',
          name: liquefied,
          component: liquefied
        },
        //用户管理-用户列表
        {
          path: '/users',
          name: 'users',
          component: users
        },
        {
          path: "/orders",
          name: "orders",
          component: orders
        },
        {
          path: "/unit/personnel/app",
          name: "filling",
          component: filling
        },
        {
          path: "/unit/personnel/card",
          name: "sufficient",
          component: sufficient
        },
        {
          path: "/unit/personnel/system",
          name: "house",
          component: house
        },
        {
          path: "/system/announcement",
          name: "notice",
          component: notice
        },
        {
          path: "/bottle/archives/liquefied",
          name: "cylinder",
          component: cylinder
        },
        {
          path: "/extended",
          name: "extended",
          component: extended
        },
        {
          path: "/query/liquefied/map",
          name: "atlas",
          component: atlas
        },
        {
          path: "/message",
          name: "message",
          component: message
        },
        {
          path: "/bottle/report/liquefied",
          name: "report",
          component: report
        },
        {
          path: "/bottle/labelCard/liquefied",
          name: "tagboard",
          component: tagboard
        },
        {
          path: "/data/liquefied/delivery",
          name: "accomplish",
          component: accomplish
        },
        {
          path: "/delivery",
          name: "delivery",
          component: delivery
        },
        {
          path: "/outstack",
          name: "outstack",
          component: outstack
        },
        {
          path: "/query/industrial/bottleFilling",
          name: "gy",
          component: gy
        },
        {
          path: "/query/car/tq",
          name: "tq",
          component: tq
        },
        {
          path: "/data/liquefied/bottleInfo",
          name: "stacked",
          component: stacked
        },
        {
          path: "/unit/car/company",
          name: "enterpriser",
          component: enterpriser
        },
        {
          path: "/unit/car/car",
          name: "record",
          component: record
        },
        {
          path: "/query/liquefied/evaluation",
          name: "evaluate",
          component: evaluate
        },
        {
          path: "/query/liquefied/distribution",
          name: "information",
          component: information
        },
        {
          path: "/query/liquefied/order",
          name: "order",
          component: order
        },
        {
          path: "/query/liquefied/client",
          name: "portfolio",
          component: portfolio
        },
        {
          path: "/system/user",
          name: "username",
          component: username
        },
        {
          path: "/system/role",
          name: "administration",
          component: administration
        },
        {
          path: "/system/hardware",
          name: "hardware",
          component: hardware
        },
        {
          path: "/change",
          name: "change",
          component: change
        },
        {
          path: "/warning/msg/bottle",
          name: "warning",
          component: warning
        },
        {
          path: "/query/car/bottleFilling",
          name: "blacklist",
          component: blacklist
        },
        {
          path: "/warning/filling/exception",
          name: "abnormal",
          component: abnormal
        },
        {
          path: "/query/car/bottleNumber",
          name: "gdata2",
          component: gdata2
        },
        {
          path: "/warning/system/operate",
          name: "operation",
          component: operation
        },
        {
          path: "/query/liquefied/filling",
          name: "trace",
          component: trace
        },
        {
          path: "/query/liquefied/bottleNumber",
          name: "number",
          component: number
        },
        {
          path: "/warning/msg/personnel",
          name: "personnel",
          component: personnel
        },
        {
          path: "/warning/msg/unit",
          name: "due",
          component: due
        },
        {
          path: "/bottle/archives/industrial",
          name: "industrial",
          component: industrial
        },
        {
          path: "/bottle/labelCard/industrial",
          name: "bindustrial",
          component: bindustrial
        },
        {
          path: "/bottle/report/industrial",
          name: "jindustrial",
          component: jindustrial
        },
        {
          path: "/bottle/archives/car",
          name: "cindustrial",
          component: cindustrial
        },
        {
          path: "/bottle/labelCard/car",
          name: "cindustrial1",
          component: cindustrial1
        },
        {
          path: "/bottle/report/car",
          name: "cindustrial2",
          component: cindustrial2
        },
        {
          path: "/unit/unit",
          name: "registration7",
          component: registration7
        },
        {
          path: "/unit/unit/supervise",
          name: "registration1",
          component: registration1
        }, {
          path: "/unit/unit/made",
          name: "registration2",
          component: registration2
        },
        {
          path: "/unit/unit/filling",
          name: "registration3",
          component: registration3
        },
        {
          path: "/unit/unit/checkout",
          name: "registration4",
          component: registration4
        },
        {
          path: "/unit/unit/use", 
          name: "registration5",
          component: registration5
        },
        {
          path: "/unit/unit/delivery",
          name: "registration6",
          component: registration6
        },
        {
          path: "/system/version",
          name: "update",
          component: update
        },
        {
          path: "/warning/system/bottleLogin",
          name: "registration",
          component: registration
        },
        {
          path: "/warning/system/bottleReport",
          name: "Inspection",
          component: Inspection
        },
        {
          path: "/warning/system/bottleCard",
          name: "Hairpin",
          component: Hairpin
        },
        {
          path: "/Password",
          name: "Password",
          component: Password
        },
        {
          path: "/anquan",
          name: "anquan",
          component: anquan
        },
        {
          path: "/data/car/filling",
          name: "cfilling",
          component: cfilling
        },
        {
          path: "/data/car/number",
          name: "cnumber",
          component: cnumber
        },
        {
          path: "/data/liquefied/order",
          name: "yorder",
          component: yorder
        },
        {
          path: "/data/industrial",
          name: "gdata",
          component: gdata
        },
        {
          path: "/data/car/syntheticData",
          name: "sdata",
          component: sdata
        },
        {
          path: "/data/liquefied/syntheticData",
          name: "ydata",
          component: ydata
        },
        {
          path: "/cinmessage",
          name: "cinmessage",
          component: cinmessage
        },
        {
          path: "/query/industrial",
          name: "gdata1",
          component: gdata1
        },
        {
          path: "/data/car",
          name: "vehicle",
          component: vehicle
        },
        {
          path: "/data/liquefied",
          name: "liquefied",
          component: liquefied
        },
        {
          path: "/data/allData",
          name: "allData",
          component: allData
          
        },
        {
          path: "/meges",
          name: "meges",
          component: meges
        },
        {
          path: "/unit/personnel/rivilege",
          name: "privilege",
          component: privilege
        },
        {
          path: "/warning/filling/out",
          name: "out",
          component: out
        },
        {
          path: "/warning/filling/unauth",
          name: "unauth",
          component: unauth
        },
        {
          path: "/unit/personnel/user",
          name: "developers",
          component: developers
        }, {
          path: "/query/phone/fill",
          name: "mobilerecord",
          component: mobilerecord
        },
        {
          path: "/query/phone/fillscan",
          name: "scannogram",
          component: scannogram
        },
        {
          path: "/query/phone/dangan",
          name: "demand",
          component: demand
        },
        {
          path: "/warning/system/operation",
          name: "operation1",
          component: operation1
        },
        {
          path: "/data/phone",
          name: "mobilefilling",
          component: mobilefilling
        },
        {
          path: "/query/industrial/bottleNumber",
          name: "gynumber",
          component: gynumber
        },
        {
          path: "/query/industrial/delivery",
          name: "gypeisong",
          component: gypeisong
        },
        {
          path: "/query/industrial/client",
          name: "gyorder",
          component: gyorder
        },
        {
          path: "/query/industrial/map",
          name: "gyatlas",
          component: gyatlas
        },
        {
          path:"/price",
          name:"price",
          component:price
        },
        {
          path:"/prices",
          name:"prices",
          component:prices
        },
        {
          path:"/lookprice",
          name:"lookprice",
          component:lookprice
        },
        {
          path:"/query/phone/check",
          name:"verify",
          component:verify
        },
        {
          path:"/word",
          name:"word",
          component:word
        },{
          path:"/liquefiedceshi",
          name:"liquefiedceshi",
          component:liquefiedceshi
        }
      ]
    }
  ]
})


router.beforeEach((to, from, next) => {

  if (to.path === '/') {
    next()
  } else {
    const token = sessionStorage.getItem('access_token')
    if (!token) {
      // console.log(1);
      // // 提示
      Message.warning('请先登录')
      router.push({
        name: 'logins'
      })
      return
    }
    next()
  }
})

export default router

// to from next
// 如果要去的是登录
// if(to.path === '/'){
//   next()
// }else{
//    // 如果要去的不去登录
// // 判断token
// const token =localStorage.getItem('token')
//       if(!token){
//          // 如果token没有 回到login
//         // this.$router.push({name:'login'})
//         router.push({
//           name:'login'
//         })
//         return
//       }

// 在路由配置生效之前 统一判断token
// 路由守卫 在配置生效之前
// 路由/导航 守卫
// to 是要去的路由配置
// from 当前的路由配置

// login  home -> login to就是login from就是home路由配置



// app.use((req,res,next)=>{
//   // req.body()
//   //res.body()
//   //next() 会自动调用下一个中间件
//    next()
// })
