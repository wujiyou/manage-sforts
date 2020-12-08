// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import Vue from "vue/dist/vue.common.js"
import App from './App'
import router from './router'
import http from '@/plugins/http.js'
import ElementUI from 'element-ui'
import store from './store' 
require("babel-polyfill");   
import "babel-polyfill"
// import jwtDecode from 'jwt-decode'
// import echarts from 'echarts'
// import echarts from 'echarts'
// echarts.registerMap('china', china)
import echarts from 'echarts'
import VCharts from 'v-charts'

// Vue.prototype.$echarts = echarts
// echarts.registerMap('china', china)



import 'lib-flexible'

// Custer其实是组件选项所在的对象
import Custer from "@/components/cuscomer/cuscomer"
import 'element-ui/lib/theme-chalk/index.css'
// 导入字体图标
// import './assets/fonts/iconfont.css'
// import './assets/fonts/iconfont.css'
import './assets/fonts/iconfont.css'
import moment from 'moment'

// import axios from 'axios'
import './assets/rest.css'
// 引入自定义指令
import './assets/directives.js';
// Vue.use(jwtDecode);

// 地图
import BaiduMap from 'vue-baidu-map'

import Print from 'vue-print-nb'


// import videojs from "video.js";
// import "video.js/dist/video-js.css";
// import "vue-video-player/src/custom-theme.css";
// Vue.prototype.$video = videojs; 

// import "videojs-flash";
import Videojs from 'video.js'
 
import 'video.js/dist/video-js.css'


import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css'

import VueParticles from 'vue-particles'
Vue.use(VueParticles)
Vue.use(VCharts)
Vue.prototype.$video = Videojs


// 全局过滤器  处理日期
Vue.filter('fmtdate',(v)=>{
  // console.log(v);
  
  if(v=== null){
       return "无";
  }else{
    return moment(v).format('YYYY-MM-DD')
  }
  // return moment(v).format('YYYY-MM-DD')
 
})

Vue.use(ViewUI);

Vue.use(Print);

Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'm00dlbP7rgm3HouxTWj9IMQqmMboBVKl'
})

// 全局自定义组件
Vue.component(Custer.name,Custer)
Vue.prototype.$echarts = echarts
// Vue.prototype.$http =axios
Vue.config.productionTip = false
Vue.use(ElementUI);

import '../node_modules/echarts/map/js/province/beijing.js' // 引入北京地图数据
import '../node_modules/echarts/map/js/province/fujian.js' // 引入福建地图数据
import '../node_modules/echarts/map/js/province/anhui.js' // 引入安徽地图数据
import '../node_modules/echarts/map/js/province/xinjiang.js' // 引入新疆地图数据
import '../node_modules/echarts/map/js/province/xizang.js' // 引入西藏地图数据

Vue.use(http);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
