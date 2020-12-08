<template>
  <el-container style="height:100%">
    <el-header class="header">
      <el-row>
        <el-col :span="4">
          <!-- <div class="toggle-button"> -->
          <!-- <span style="display: block;">民用液化气瓶</span> -->
          <!-- <img style="width:30%;height:auto;" src="../../assets/images/logon.png" alt /> -->
          <!-- <i data-v-c39d5cc0="" class="iconfont icon-logo header-title__logo"></i> -->

          <p style="color:white;line-height:46px;font-weight:bold;">
            <i style="font-size:18px;margin-right:10px;" class="el-icon-help"></i>
            <span class="top1" @click="changeTop">气瓶综合 - 监管平台</span>
          </p>
          <!-- <span style="font-size:10px;display: inline-block;">INTELLIGENT SUPERVISION SYSTEM</span> -->
          <!-- </div> -->
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple girls">
            <div class="toggle-button1" @click="togleCollapse">
              <i
                style="color:white; position: relative;left:-25%;top:-2px"
                class="iconfont icon-caidan"
              ></i>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light light">&nbsp;</div>
        </el-col>
        <el-col :span="10">
          <div class="grid-content bg-purple purple">
            <el-col :span="24" class="heigth-botm">
              <!-- position: absolute;right:12%; -->
              <span
                @click="dialogTableVisible()"
                style="cursor: pointer;width:40px;height:30px; border-radius: 20px;"
              >
                <img
                  style="width:30px;height:30px;border-radius: 50%;position:relative;top:10px"
                  src="../../assets/images/touxiang.png"
                  alt
                />
                <!--  src="../../assets/images/touxiang.png" -->
                <!-- :src="this.img" -->
              </span>
              <!-- position: relative;top:-2px;font-size:14px;left:-2px -->
              <span
                style="color:white;height:40px;line-height:40px;font-size:14px;cursor: pointer;"
                @click="dialogTableVisible()"
              >
                {{this.username}}
                <i
                  @click.prevent="handlesSingle()"
                  style="font-size:16px;cursor: pointer;margin-left:5px"
                  class="el-icon-switch-button"
                ></i>
              </span>
            </el-col>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <!-- <Sider></Sider> -->

    <el-container>
      <el-aside class="aside" :width="isCollapse ? '64px' : '250px'">
        <!-- <sapn style="color:white;">物联网智能监管系统</sapn> -->
        <!-- 开启路由模式 -->
        <div class="toggle-button">
          <!-- <span style="display: block;">民用液化气瓶</span> -->
          <img
            style="width:40px;height:40px;margin-bottom:25px; border-radius: 50%;position: relative;top:20px;"
            src="../../assets/images/touxiang.png"
            alt
          />
          <span
            class="logo_png"
            style="font-size:12px;position: relative;top:-12px;left:10px;display:inline-block"
          >
            <span style="display:block">{{this.username}}</span>
            <span style="display:block;margin-top:8px">{{this.zg}}</span>
          </span>
          <!-- <span style="font-size:10px;display: inline-block;">INTELLIGENT SUPERVISION SYSTEM</span> -->
        </div>

        <!-- <img style="position: absolute;top:270px;left:22px;z-index:999" src="../../assets/images/xian.png" alt=""> -->

        <el-menu
          unique-opened
          :collapse="isCollapse"
          :collapse-transition="false"
          :default-active="$route.path"
          router
          background-color="#263238"
          text-color="#fff"
          active-text-color="#409FFF"
        >
          <!-- 判断一级菜单是否有的情况  (没有的情况) -->
          <!-- <el-menu-item index="/home">
            <i
              style="font-size: 14px; color: white;width: 16px;height: 16px;"
              class="el-icon-s-cooperation"
            ></i>
            <span style="margin-left:15px;color:#d1d1d1 !important; " slot="title">数据平台</span>
          </el-menu-item>-->

          <el-menu-item
            :index="item1.path"
            v-for="(item1,index) in menus"
            :key="index"
            v-if="item1.children==''"
          >
            <i :class="iconObj[item1.id]"></i>
            <span
              style="padding-left:15px;font-size:14px;font-weight:SourceHanSansCN-;color:#d1d1d1 !important;"
            >{{item1.name}}</span>
          </el-menu-item>

          <!-- 判断一级菜单是否有的情况  (有的情况) -->
          <el-submenu
            :index="item1.id"
            v-for="(item1,index) in menus"
            :key="index"
            v-if="item1.children!=''"
          >
            <!-- 判断二级菜单是否有子节点  (没有的这种情况) -->
            <el-menu-item
              :index="item2.path"
              v-for="(item2,index) in item1.children"
              :key="index"
              v-if="item2.children==''"
              class="menu_item"
            >
              <i class="el-icon-menu"></i>
              <span style="margin-left:15px;color:#d1d1d1">{{item2.name}}</span>
            </el-menu-item>

            <template slot="title" v-if="item1.children">
              <i :class="iconObj[item1.id]"></i>
              <span
                style="padding-left:15px;font-size:14px;font-weight:SourceHanSansCN-;"
              >{{item1.name}}</span>
            </template>
            <!-- 判断二级菜单是否有子节点  (有的这种情况) -->
            <el-submenu
              :index="item2.path"
              v-for="(item2,index) in item1.children"
              :key="index"
              v-if="item2.children!=''"
              class="menu_item"
            >
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span
                  style="padding-left:15px;font-size:14px;font-weight:SourceHanSansCN-;color:#d1d1d1;"
                >{{item2.name}}</span>
              </template>

              <!-- 判断是否有三级菜单 (有的情况)-->
              <el-menu-item
                v-for="(item3,index) in item2.children"
                :key="index"
                class="menu_item"
                :index="item3.path"
              >
                <!-- <i class="el-icon-menu"></i> -->
                <span style="font-size:14px;color:#d1d1d1;">{{item3.name}}</span>
              </el-menu-item>
            </el-submenu>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main style="background-color:#F4F6F8;">
        <router-view></router-view>
      </el-main>
    </el-container>

    <el-dialog
      title="公告查看"
      width="95%"
      style="margin-top:28%;margin-left:85%;overflow:hidden"
      :visible.sync="dialogFormVisibleAdd"
    >
      <p style="margin:10px 5px;font-size:16px">{{this.form.announcementTile}}</p>
      <p style="margin:5px 5px;font-size:16px">{{this.form.announcementContent}}</p>
      <!-- <el-form :model="form">
        <el-form-item label="标题" label-width="100px" prop="announcementTile">
          <el-input v-model="form.announcementTile" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="内容概括" label-width="100px" prop="announcementContent">
          <el-input v-model="form.announcementContent" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>-->
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
        <!-- <el-button type="primary" @click="AddUser()">确 定</el-button> -->
      </div>
    </el-dialog>
  </el-container>
</template>
<script>
import $ from "jquery";
// import Sider from "./sider"
// import shouye from "../../assets/images/4.png";
export default {
  // 或群token 有 继续渲染组件 没有 登录 newVue之前自动触发
  name: "home",
  data() {
    return {
      currentUrl: "/home",
      menus: [],
      timer: null, //定时器名称

      gridData: [],
      iconObj: {
        "8b24656c-e8ab-4585-a80f-d939b8295b6c": "iconfont icon-huabanfuben",
        "2d2ea8e9-d8ca-46ee-89ce-d93612b2cc35": "iconfont icon-guanli2",
        "09778566-88aa-4b69-9de5-3d4830cee319": "iconfont icon-jinggao",
        "0edfffe5-b0eb-4ac5-b25e-481eca795fc3":
          "iconfont icon-renyuanguanli-copy",
        "fac5d57c-7bf3-4925-b937-6fe6a3d138f5": "iconfont icon-dangan2",
        "88f2e9a5-a44e-4891-9798-e0d5cb86cd03": "iconfont icon-nav_user ",
        "408f56a8-fef3-4b0d-8d9f-b99a47f40bb3": "iconfont icon-dangan2",
        "2a5b822f-64bd-49f8-b0e0-3de4bceff94c": "iconfont icon-huabanfuben",
        "b13269b3-c840-4c2b-921d-f7b056ab625c": "iconfont icon-huabanfuben",
        "51608d1e-c58b-4016-9463-81c289922993": "iconfont icon-huabanfuben",
      },
      dialogFormVisibleAdd: false,
      form: {
        announcementTile: "",
        announcementContent: "",
      },
      img: "",
      zg:"",
      // 默认不折叠
      isCollapse: false,
    };
  },

  mounted() {
    this.danwei();
    this.timer = setInterval(() => {
      this.dialogFormVisibleAdd = false;
      // setTimeout(this.queryInfo, 0);
    }, 7200);
  },
  created() {
    this.getMenu();
    this.handuserlist();
    // this.getUrl();
  },

  methods: {
    async danwei() {
      const res = await this.$http.get(`unit/findByUnitId`);
      this.zg=res.data.data.name
      console.log(res);
    },
    changeTop() {
      sessionStorage.clear();
      this.$message.success("退出成功");
      this.$router.push("/");
    },
    dialogTableVisible() {
      this.$router.push({ path: "/change" });
    },
    // this.$router.push({ path: "/message", query: { id: user.id } });
    handuserlist() {
      this.username = sessionStorage.getItem("username");
      this.phone = sessionStorage.getItem("phone");
      // this.image = sessionStorage.getItem("image");
      // console.log(this.image);

      // this.username = list;
      // console.log(this.username);
    },
    handlesSingle() {
      //  清除token

      // this.$message.success("退出成功");
      this.$router.push({ name: "logins" });
      sessionStorage.clear();
      // 2.退出到登录界面并提示
    },
    async getMenu() {
      // this.ids = this.$route.query.id;
      //  this.ids = sessionStorage.getItem("ids");
      // console.log(this.ids);
      // debugger;
      const res = await this.$http.get(`/menu/findAll`);
      this.menus = res.data;
      console.log(res);
      // announcement/getNewest
      const res1 = await this.$http.get(`announcement/getNewest`);
      // console.log(res1);
      if (res1.data.data == null) {
        this.dialogFormVisibleAdd = false;
      } else {
        this.form.announcementTile = res1.data.data.announcementTile;
        this.form.announcementContent = res1.data.data.announcementContent;
        this.dialogFormVisibleAdd = true;
      }

      // var id = sessionStorage.getItem("unitId");
      const res_1 = await this.$http.get(`/user`);
      console.log(res_1);
      this.img = res_1.data.data.image;
      console.log(this.img);
    },
    togleCollapse() {
      // this.isCollapse = !this.isCollapse;
      // $(".logo_png").hide()
      if ((this.isCollapse = !this.isCollapse)) {
        $(".logo_png").hide();
      } else if (this.isCollapse == this.isCollapse) {
        $(".logo_png").show();
      }
    },
  },
  destroyed() {
    clearInterval(this.timer);
  },

  //   登录获取token值才能进入主页面
  //  beforeCreate(){
  //     //  没有用户登录就不能进入主页面
  //       const token =localStorage.getItem('token')
  //       if(!token){
  //           this.$router.push({name:'login'})
  //       }
  //   }

  // components:{
  //     Sider
  // }
};
</script>
<style>
ul,
li,
div,
html,
p,
body {
  padding: 0;
  margin: 0;
}
.el-table__header-wrapper {
  border-top: 1px solid #ebeef5 !important;
}
.el-menu-item.is-active {
  background-color: #29b0a3 !important;
  color: white !important;
}
/* .el-submenu__title:hover{
   background-color: #29b0a3 !important;
   color: white !important;
}
.el-menu-item:hover{
   background-color: #29b0a3 !important;
   color: white !important;
} */
.el-submenu__title {
  color: #d1d1d1 !important;
}
.el-main {
  padding: 0 !important;
}
/* .menuLeft .el-menu-item.is-active {
  background: #6db6ff !important;
}
.menuLeft .el-submenu__title.is-active {
  background: #6db6ff !important;
} */
</style>
<style scoped>
[class*="el-col-"] {
  margin-top: 0;
}
.top1:hover {
  color: rgb(41, 176, 163);
  cursor: pointer;
}
th {
  border: 1px solid gray;
}
i {
  font-size: 14px;
  color: #d1d1d1;
  width: 16px;
  height: 16px;
}
tr {
  border: 1px solid gray;
}
td {
  text-align: center;
  border: 1px solid gray;
}
/* .el-input__inner{
  border:1px solid gray !important;
} */
.toggle-button {
  /* width: 220px; */
  background-color: #263238;
  font-size: 14px;
  line-height: 15px;
  padding-left: 10px;
  padding-right: 10px;
  color: #fff;
}

.container {
  height: 100%;
}
.toggle-button1 i {
  font-size: 20px;
  line-height: 46px;
  cursor: pointer;
  /* color: white; */
}

.header {
  /* position: fixed;
    top: 0;
    left: 0;
    right: 0; */
  /* height:90px; */
  height: 46px !important;
  background-color: #324148;
  color: #333;
  z-index: 999;
}
.main {
  background-color: #e9eef3;
  color: #333;
  /* text-align: center; */
  /* height: 100%; */
}
.aside {
  background-color: #263238;
  color: #333;
  line-height: 200px;
  position: relative;
  /* text-align: center; */
  /* padding: 10px 0; */
}

.light {
  text-align: center;
  line-height: 46px;
  color: white;
}
.purple {
  text-align: right;
  line-height: 46px;
}
.purple a {
  text-decoration: none;
  color: white;
}
.menu {
  height: 100%;
}
.el-menu {
  border: none;
}
.el-dropdown-link {
  cursor: pointer;
  color: white;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>