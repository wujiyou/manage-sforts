import axios from 'axios'


const MyHttpSERVER ={}
MyHttpSERVER.install =(Vue) =>{


   axios.defaults.baseURL ="http://39.98.74.46:8081"  

  // 涛哥  http://192.168.0.110:8081
  //     125.75.8.53
  // 阿里云  http://39.98.74.46:8081
  // 服务器 http://192.168.0.7:8081
  // 刘洋  http://192.168.0.230:8081
  // 老贺 http://192.168.0.111:8081
  // 付裕 http://192.168.0.115:8081
  // 陈宇 http://192.168.0.126:8081


    // 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // console.log(config);
   if(config.url !== 'logins'){
    //  debugger;
      // 设置请求头部
      const AUTH_TOKEN = sessionStorage.getItem("access_token");
      // if(AUTH_TOKEN != null){
      //   var ass = AUTH_TOKEN.substring(7,AUTH_TOKEN.length)
      // }
      config.headers["Authorization"] = AUTH_TOKEN;
   }
   return config;
 }, function (error) {
   // 对请求错误做些什么
   return Promise.reject(error);
 });
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
   // 对响应数据做点什么
   return response;
 }, function (error) {
   // 对响应错误做点什么
   return Promise.reject(error);
 });

 Vue.prototype.$http = axios
}

export default MyHttpSERVER
