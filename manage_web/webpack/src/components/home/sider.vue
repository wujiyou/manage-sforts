<template>
  <el-container>
    <el-aside class="aside" :width="isCollapse ? '64px' : '220px'">
      <!-- <div class="toggle-button" @click="togleCollapse">|||</div> -->
      <div class="toggle-button">民用液化气瓶物联网智能监管系统</div>
      <!-- <sapn style="color:white;">物联网智能监管系统</sapn> -->
      <!-- 开启路由模式 -->

      <el-menu
        unique-opened
        :collapse="isCollapse"
        :collapse-transition="false"
        router
        background-color="#333744"
        text-color="#fff"
        active-text-color="#409FFF"
      >
        <!-- 用户管理 -->
        <el-submenu :index="item1.order+''" v-for="(item1,index) in menus" :key="index">
          <template class="title_padding" slot="title">
            <i class="el-icon-location"></i>
            <!-- 一级菜单  -->
            <!-- <i :class="iconObj[item1.order]"></i> -->
            <span>{{item1.authName}}</span>
          </template>
          <el-menu-item
            v-for="(item2,index) in item1.children"
            :key="index"
            class="menu_item"
            :index="item2.path"
          >
            <i class="el-icon-menu"></i>
            <span>{{item2.authName}}</span>
          </el-menu-item>
        </el-submenu>

        <!-- 权限管理 -->
        <!-- <el-submenu index="2">
          <template class="title_padding" slot="title">
            <i class="el-icon-location"></i>
            <span>权限管理</span>
          </template>

          <el-menu-item class="menu_item" index="resgtion">
            <i class="el-icon-menu"></i>
            <span>角色列表</span>
          </el-menu-item>
          <el-menu-item class="menu_item" index="role">
            <i class="el-icon-menu"></i>
            <span>权限列表</span>
          </el-menu-item>
        </el-submenu>-->

        <!-- 商品管理 -->
        <!-- <el-submenu index="3">
          <template class="title_padding" slot="title">
            <i class="el-icon-location"></i>
            <span>商品管理</span>
          </template>

          <el-menu-item class="menu_item" index="1-3">
            <i class="el-icon-menu"></i>
            <span>商品列表</span>
          </el-menu-item>

          <el-menu-item class="menu_item" index="1-3">
            <i class="el-icon-menu"></i>
            <span>分类参数</span>
          </el-menu-item>

          <el-menu-item class="menu_item" index="1-3">
            <i class="el-icon-menu"></i>
            <span>商品分类</span>
          </el-menu-item>
        </el-submenu>-->

        <!-- 订单管理 -->
        <!-- <el-submenu index="4">
          <template class="title_padding" slot="title">
            <i class="el-icon-location"></i>
            <span>订单管理</span>
          </template>

          <el-menu-item class="menu_item" index="1-4">
            <i class="el-icon-menu"></i>
            <span>订单列表</span>
          </el-menu-item>
        </el-submenu>-->

        <!-- 数据统计 -->
        <!-- <el-submenu index="5">
          <template class="title_padding" slot="title">
            <i class="el-icon-location"></i>
            <span>订单列表</span>
          </template>

          <el-menu-item class="menu_item" index="1-5">
            <i class="el-icon-menu"></i>
            <span>数据报表</span>
          </el-menu-item>
        </el-submenu>-->
      </el-menu>
    </el-aside>
    <!-- <el-main class="main">
      <router-view></router-view>
    </el-main> -->
  </el-container>
</template>
<script>
export default {
  name: "sider",
  data() {
    return {
      menus: [],
      iconObj: {
        "1": "iconfont icon-user",
        "2": "iconfont icon-tijikongjian",
        "3": "iconfont icon-shangpin",
        "4": "iconfont icon-danju",
        "5": "iconfont icon-baobiao"
      },
      // 默认不折叠
      isCollapse: false
      // menus: [
      //   {
      //     order:1,
      //     authName: "用户管理",
      //     children: [
      //       {
      //         path: "user",
      //         authName: "用户列表"
      //       }
      //     ]
      //   },
      //   {
      //     order:2,
      //     authName: "权限管理",
      //     children: [
      //       {
      //         path: "resgtion",
      //         authName: "角色列表"
      //       },
      //       {
      //         path: "role",
      //         authName: "权限列表"
      //       }
      //     ]
      //   },
      //   {
      //     order:3,
      //     authName: "商品管理",
      //     children: [
      //       {
      //         path: "list",
      //         authName: "商品列表"
      //       },
      //       {
      //         path: "sorting",
      //         authName: "分类参数"
      //       },
      //       {
      //         path: "merchandisw",
      //         authName: "商品分类"
      //       }
      //     ]
      //   },
      //   {
      //     order:4,
      //     authName: "订单管理",
      //     children: [
      //       {
      //         path: 9,
      //         authName: "订单管理"
      //       },
      //       {
      //         path: 10,
      //         authName: "订单列表"
      //       }
      //     ]
      //   },
      //   {
      //     order:5,
      //     authName: "数据统计",
      //     children: [
      //       {
      //         path: 11,
      //         authName: "订单列表"
      //       }
      //     ]
      //   }
      // ]
    };
  },
  created() {
    this.getMenu();
  },
  methods: {
    async getMenu() {
      const res = await this.$http.get(`menus`);
      this.menus = res.data.data;
      console.log(res);
    },
    togleCollapse() {
      this.isCollapse = !this.isCollapse;
    }
  }
};
</script>
<style scoped>
ul,li,div,html,body{
  padding: 0;
  margin: 0;
}
.toggle-button {
  /* width: 220px; */
  background-color: #333744;
  font-size: 14px;
  line-height:30px;
  padding-top: 10px;
  padding-left: 20px;
  padding-right: 20px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  /* // 鼠标放上去变成小手 */
  /* cursor: pointer; */
}
.aside {
  background-color: #333744;
  color: #333;
  line-height: 200px;
  /* text-align: center; */
  /* padding: 10px 0; */
}

.main {
  background-color: #e9eef3;
  color: #333;
  /* text-align: center; */
  /* height: 100%; */
}
</style>