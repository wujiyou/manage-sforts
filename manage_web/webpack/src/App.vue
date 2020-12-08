<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      // timer: null //定时器名称
    };
  },
  mounted() {
   
    // this.timer = setInterval(() => {
    //   setTimeout(this.queryInfo, 0);
    // }, 1000 * 7200);
    //添加监听事件
    // window.addEventListener('beforeunload', e => this.beforeunloadHandler(e))
    // 关闭浏览器窗口的时候清空浏览器缓存在localStrage的数据
    // window.onbeforeunload = function(e) {
    //     var storage = window.localStorage;
    //      storage.clear();

    // };
  },
  methods: {
    queryInfo(){
        // var storage = window.sessionStorage;
        // storage.clear();
    //do something
   },
    beforeunloadHandler(e) {
      //  console.log(e);
      //  var storage = window.localStorage;
      //   storage.clear();
      // if(e){
      // }else{
      //   location.reload();
      // }
      // todo   在页面刷新或关闭之前需要处理得操作，例如清除或保存数据
    }
  },
  beforeDestroy() {
    // clearInterval(this.timer);        
    // this.timer = null;
  },

  destroyed() {
    // window.removeEventListener('beforeunload', e => this.beforeunloadHandler(e))
  }
};
</script>

<style>
body {
  font-family: Arial, Helvetica, sans-serif;
}
.el-card__body {
  padding: 0 !important;
  /* margin: 0; */
}
.el-main {
  padding: 0;
}
#app {
  height: 100%;
}
.el-table td,
.el-table th {
  text-align: center !important;
}
</style>
