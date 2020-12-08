<template>
  <div class="loginer">
    <p style="text-align:center;" class="p1">气瓶综合信息安全追溯平台</p>
    <div class="detail-btn"  @click="change('1f6edbc6-d2d4-41fe-9cbf-6a3bc78fe9f2','0')"></div><!--车用-->
    <div class="detail-btn1" @click="change('bb9d4669-ffa4-4721-890a-94b3a642ff71','1')"></div><!--液化-->
    <div class="detail-btn2" @click="change('e65f6ffa-75c8-41a8-9b76-7ff6d1ac0e6f','2')"></div><!--工业-->
    <div class="detail-btn3" @click="change('75de0525-d199-40a4-8be9-e8c084babad9')"></div>
    <div class="detail-btn4" @click="change('b7b1b76d-5a6a-48cc-97cf-82086e3bd7e1')"></div>
    <div class="detail-btn5" @click="change('26be19e0-2b42-4072-aece-83e03640ab33')"></div>
  </div>
  <!--  
    车用气瓶  1f6edbc6-d2d4-41fe-9cbf-6a3bc78fe9f2
    民用气瓶  bb9d4669-ffa4-4721-890a-94b3a642ff71
    工业气瓶  e65f6ffa-75c8-41a8-9b76-7ff6d1ac0e6f
    移动式压力容器动态监管系统 75de0525-d199-40a4-8be9-e8c084babad9
    系统管理  b7b1b76d-5a6a-48cc-97cf-82086e3bd7e1
    数据平台  26be19e0-2b42-4072-aece-83e03640ab33
   -->
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      userlist:[]
    };
  },
   created() {
    this.getUserlist();
  },
    methods: {
    async change(row,type) {
      console.log(row);
      let ids =row
      console.log(type);
      let types=type
      
      
      console.log(ids);
      
      const res = await this.$http.get(`/menu/menu-permission/${ids}`);
      console.log(res);
      if(res.data.code==1){
        this.$message({
          type: "warning",
          message: res.data.msg
        });
      }else if(res.data.code==0){
        sessionStorage.setItem('ids',ids);
        sessionStorage.setItem('types',types);
        this.$router.push({ path: "/home", query: { id: row } });
      }
    },
    async getUserlist() {
      const res = await this.$http.get(`/menu/findList`);
      // console.log(res);
      // this.idlist=res.data
      // console.log(this.idlist);
      // for(let i=0;i<=this.idlist.length;i++){
        
      // }
      
       
      // this.userlist = res.data.data.list;
      // this.total = res.data.data.totalCount;
    }
  }
};
</script>

<style scoped>
* {
  margin: 0px;
  padding: 0px;
}
.loginer {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url(../../assets/images/11.png);
  background-repeat: no-repeat;
}
.p1 {
  color: white;
  font-size: 55px;
  padding-top: 3%;
}
.detail-btn {
  width: 15%;
  height: 40%;
  background: url(../../assets/images/che.png) no-repeat;
   margin-left: 12%;
  /* position: absolute;
  left: 12%;
  top: 18%; */
  float: left;
}
.detail-btn:hover {
  background: url(../../assets/images/che1.png) no-repeat;
  cursor: pointer;
}
.detail-btn1 {
  width: 15%;
  height: 40%;
  background: url(../../assets/images/min1.png) no-repeat;
  /* background-size: cover; */
  float: left;
  margin-left: 13%;
  /* position: absolute;
  left: 40%;
  top: 18%; */
}
.detail-btn1:hover {
  background: url(../../assets/images/min.png) no-repeat;
  cursor: pointer;
}
.detail-btn2 {
  width: 15%;
  height: 40%;
  background: url(../../assets/images/gong.png) no-repeat;
  float: left;
  margin-left: 15%;
  /* position: absolute;
  right: 15%;
  top: 18%; */
}
.detail-btn2:hover {
  background: url(../../assets/images/gong1.png) no-repeat;
  cursor: pointer;
}
.detail-btn3 {
  width: 15%;
  height: 40%;
  background: url(../../assets/images/yi.png) no-repeat;
  position: absolute;
  left: 12%;
  bottom: 0%;
}
.detail-btn3:hover {
  background: url(../../assets/images/yi3.png) no-repeat;
  cursor: pointer;
}
.detail-btn4 {
  width: 15%;
  height: 40%;
  background: url(../../assets/images/xi.png) no-repeat;
  position: absolute;
  left: 40%;
  bottom: 0%;
}
.detail-btn4:hover {
  background: url(../../assets/images/xi1.png) no-repeat;
  cursor: pointer;
}
.detail-btn5 {
  width: 15%;
  height: 40%;
  background: url(../../assets/images/su.png) no-repeat;
  position: absolute;
  right: 15%;
  bottom: 0%;
}
.detail-btn5:hover {
  background: url(../../assets/images/shu1.png) no-repeat;
  cursor: pointer;
}
</style>>

