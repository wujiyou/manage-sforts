<template>
  <el-card class="box-card">
    <!-- 面包屑 -->
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right " class="arrow_right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
        <a href="/">用户管理</a>
      </el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>-->
    <my-bread level1="用户管理" level2="用户列表"></my-bread>
    <!--搜索  -->
    <el-row>
      <el-col :span="21">
        <el-input
        
          @clear="loadUserList()"
          clearable
          class="input-serach"
          placeholder="请输入用户名"
          v-model="query"
        >
          <el-select style=" width: 130px;" v-model="select" slot="prepend" placeholder="所属单位">
            
            <el-option label="餐厅名" value="1"></el-option>
            <el-option label="订单号" value="2"></el-option>
            <el-option label="用户电话" value="3"></el-option>
          </el-select>
          <el-button @click="searchUser()" slot="append" class="el_button"  icon="el-icon-search">搜索</el-button>
        </el-input>
      </el-col>
      <el-col :span="3">
        <el-button @click="showAddUserDia()" type="primary">
          <i style="padding-right:10px" class="el-icon-plus"></i>新增
        </el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <template>
      <el-table height="474px" :data="userlist" style="width: 100%;margin:20px 5px">
        <el-table-column type="index" label="#" width="70"></el-table-column>
        <el-table-column prop="id" label="Id" width="70"></el-table-column>
        <el-table-column prop="username" label="姓名" width="120"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="mobile" label="电话"></el-table-column>
        <el-table-column prop="role_name" label="角色"></el-table-column>
        <!-- <el-table-column prop="create_time" label="创建时间"></el-table-column> -->
        <el-table-column label="创建时间">
          <!-- main.js写了一个全局过滤器 -->
          <!-- 如果单元格内显示的内容不是字符串（文本）
          需要给被显示的内容包裹一个template-->
          <!-- template内部要用数据 设置slot-scope属性
          该属性的值是要用数据create_time的数据源userlist-->
          <!-- slot-scope的值userlist其实就是el-table绑定的数据userlist
          userlist.row >数组中的每个对象-->
          <!-- slot-scope自动去找上一级所绑定的数据 userlist-->
          <template slot-scope="socpe">{{socpe.row.create_time | fmtdate}}</template>
        </el-table-column>

        <el-table-column label="用户状态">
          <template slot-scope="socpe">
            <!-- 找到开关@change="changeMgStatus(scope.row)" -->
            <!-- changeMgStatus  发送put请求 -->
            <!-- users/:uId/state/:type uid用户id -->
            <el-switch
              @change="changeMgStatus(socpe.row)"
              v-model="socpe.row.mg_state"
              active-color="#13ce66"
              inactive-color="#ff4949"
            ></el-switch>
          </template>
        </el-table-column>
        <!-- 表格操作 -->
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <!-- size 调整按钮大小 -->
            <!-- 编辑 -->

            <el-tooltip
              class="item"
              effect="dark"
              content="编辑角色"
              :enterable="false"
              placement="top"
            >
              <el-button
                type="primary"
                size="mini"
                title="编辑"
                plain
                icon="el-icon-edit"
                @click="showEdituser(scope.row)"
                circle
              ></el-button>
            </el-tooltip>
            <!-- 删除 -->

            <el-tooltip
              class="item"
              effect="dark"
              content="删除角色"
              :enterable="false"
              placement="top"
            >
              <el-button
                type="danger"
                size="mini"
                plain
                icon="el-icon-delete"
                circle
                @click="showDeleUserMsgBox(scope.row.id)"
              ></el-button>
            </el-tooltip>

            <!-- 分配角色 -->

            <el-tooltip
              class="item"
              effect="dark"
              content="角色分配"
              :enterable="false"
              placement="top"
            >
              <el-button
                @click="showDeleUserRole(scope.row)"
                type="success"
                size="mini"
                plain
                icon="el-icon-check"
                circle
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <!-- 4.分页 -->
    <!-- 》该接口支持分页 url参数中有pagenum，pagesize
          @size-change 每页显示条数变化时触发
          @current-change当前页改变时触发
          :current-page 设置当前页是第几页
           :page-sizes="[5, 10, 15, 20]"每页多少条的数据组
           :page-size="5"设置显示多少条
           :total="400"分页总数
    -->
    <el-pagination
      style="border:1px solid #ebeef5;padding:5px 15px;display:flex; justify-content: flex-end;"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[4,8,12,16]"
      :page-size="8"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>

    <!-- 对话框 -->
    <!-- 添加对话框 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdd">
      <el-form :model="form">
        <el-form-item label="用户名" label-width="100px" prop="username">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="密码" label-width="100px" prop="password">
          <el-input type="password" v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="邮箱" label-width="100px" prop="email">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="电话" label-width="100px" prop="mobile">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click="AddUser()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑对话框 -->
    <el-dialog title="编辑用户" :visible.sync="dialogFormVisibleEdit">
      <el-form :model="editUserForm">
        <el-form-item label="用户名" label-width="100px" prop="username">
          <el-input disabled v-model="editUserForm.username" autocomplete="off"></el-input>
          <!-- disabled实现用户名禁止改动 -->
        </el-form-item>

        <el-form-item label="邮箱" label-width="100px" prop="email">
          <el-input v-model="editUserForm.email" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="电话" label-width="100px" prop="mobile">
          <el-input v-model="editUserForm.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
        <el-button type="primary" @click="EditUser()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 分配角色对话框 -->
    <el-dialog title="角色分配" :visible.sync="dialogFormVisibleRoleshow">
      <el-form :model="form">
        <el-form-item label="用户名" label-width="100px">
          <!-- {{this.form.username}} -->
          {{currUsername}}
          <!-- <el-input disabled v-model="form.username" autocomplete="off"> -->
        </el-form-item>
        <el-form-item label="角色" label-width="100px">
          <!-- 
                如果select的绑定的数据的值 和option的value一样 
                就会显示该option的label值
          -->
          {{currRoleId}}
          <el-select v-model="currRoleId">
            <el-option label="请选择" :value="-1"></el-option>
            <el-option :label="item.roleName" :value="item.id" v-for="(item,i) in roles" :key="i"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleRoleshow = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisibleRoleshowtrue()">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>
<script>
export default {
  name: "user",
  data() {
    return {
      query: "",
      select:"",
      userlist: [],
      //分页相关数据
      total: -1,
      pagenum: 1,
      pagesize: 8,
      // 添加对话框的属性
      dialogFormVisibleAdd: false,
      dialogFormVisibleEdit: false,
      dialogFormVisibleRoleshow: false,
      //添加用户的表单的数据
      form: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      // 编辑
      editUserForm: {
        username: "",
        email: "",
        mobile: ""
      },
      // 分配角色,
      currRoleId: -1,
      //   分配当前用户id
      currusrId: -1,
      roles: [],
      //表格绑定的数据
      // userlist: [
      //   {
      //     id: 20,
      //     username: "王小虎",
      //     email: "21@qq.com",
      //     mobile: "18783697896",
      //     create_time: "2016-05-02",
      //     mg_state: true,
      //     address: ""
      //   },
      //   {
      //     id: 21,
      //     username: "王大虎",
      //     email: "231@qq.com",
      //     mobile: "18783697845",
      //     create_time: "2019-05-02",
      //     mg_state: false,
      //     address: ""
      //   },
      //   {
      //     id: 22,
      //     username: "金虎",
      //     email: "231@qq.com",
      //     mobile: "18783697845",
      //     create_time: "2019-05-02",
      //     mg_state: true,
      //     address: ""
      //   },
      //   {
      //     id: 23,
      //     username: "老虎",
      //     email: "231@qq.com",
      //     mobile: "18783697845",
      //     create_time: "2019-05-02",
      //     mg_state: false,
      //     address: ""
      //   },
      //   {
      //     id: 24,
      //     username: "王虎",
      //     email: "231@qq.com",
      //     mobile: "18783697845",
      //     create_time: "2019-05-02",
      //     mg_state: true,
      //     address: ""
      //   },
      //   {
      //     id: 25,
      //     username: "美虎",
      //     email: "231@qq.com",
      //     mobile: "18783697845",
      //     create_time: "2019-05-02",
      //     mg_state: false,
      //     address: ""
      //   },
      //   {
      //     id: 26,
      //     username: "丑虎",
      //     email: "231@qq.com",
      //     mobile: "18783697845",
      //     create_time: "2019-05-02",
      //     mg_state: true,
      //     address: ""
      //   },
      //   {
      //     id: 27,
      //     username: "钢虎",
      //     email: "231@qq.com",
      //     mobile: "18783697845",
      //     create_time: "2019-05-02",
      //     mg_state: false,
      //     address: ""
      //   },
      //   {
      //     id: 28,
      //     username: "加鲁鲁虎",
      //     email: "231@qq.com",
      //     mobile: "18783697845",
      //     create_time: "2019-05-02",
      //     mg_state: true,
      //     address: ""
      //   },
      //   {
      //     id: 29,
      //     username: "钢铁加鲁鲁虎",
      //     email: "231@qq.com",
      //     mobile: "18783697845",
      //     create_time: "2019-05-02",
      //     mg_state: false,
      //     address: ""
      //   }
      // ],
      // roles: [
      //   {
      //     id: 20,
      //     roleName: "主管"
      //   },
      //   {
      //     id: 21,
      //     roleName: "超级管理员"
      //   },
      //   {
      //     id: 22,
      //     roleName: "一级测试员"
      //   }
      // ],
      currUsername: ""
      //   保存所有角色数据
    };
  },

  methods: {
    // 分配角色点击确认按钮发送请求
    async dialogFormVisibleRoleshowtrue() {
      // users/:id/role
      // id 用户ID
      // 请求体中 rid 修改的新值角色id

      //    通过视图操作 -》修改label-》value值变化 -》el-select v-model绑定的数据变化
      // currusrId
      // 在dialogFormVisibleRoleshowtrue方法中药使用用户id 在data声明currusrId：-1
      // 在showDeleUserRole(){this.currusrId = user.id}进行赋值
      const res = await this.$http.put(`users/${this.currusrId}/role`, {
        rid: this.currRoleId
      });
      this.$message.success("修改角色成功！");
      this.dialogFormVisibleRoleshow = false;
      //   this.getUserlist()
    },
    //   分配角色
    async showDeleUserRole(user) {
      this.dialogFormVisibleRoleshow = true;
      //   给curruserId赋值
      this.currusrId = user.id;
      //   获取用户名
      this.currUsername = user.username;
      //  获取所有角色id
      const res1 = await this.$http.get(`roles`);
      this.roles = res1.data.data;
      // 获取当前用户角色id
      const res = await this.$http.get(`users/${user.id}`);
      // mg_state  = false
      //点开关 mg_state  = true

      //   获取当前用户角色id rid
      this.currRoleId = res.data.data.rid;

      // this.form = user;
    },
    //   修改状态
    async changeMgStatus(user) {
      //    发送请求 users/:uId/state/:type
      const res = await this.$http.put(
        `users/${user.id}/state/${user.mg_state}`
      );
      if (res.data.meta.status !== 200) {
        user.mg_state = !user.mg_state;
        return this.$message.error("更新用户状态失败");
      }
      this.$message.success("更新用户状态成功！");
      //    mg_state  = false
      // 点开关 mg_state  = true
      //  console.log(res);
    },

    // 编辑用户
    // 编辑用户发送请求
    async EditUser() {
      //   users/:id
      this.dialogFormVisibleEdit = false;
      const res = await this.$http.put(
        `users/${this.editUserForm.id},this.editUserForm`
      );
      //  const { data: res } = await this.$http.get(`users/` + id)
      if (res.data.meta.status !== 200) {
        return this.$message.error("查询用户信息失败！");
      }
      // 2.关闭对话框
      // console.log(res);

      //   id -》this.form.id
      // this.getUserlist();
      //   const {
      //     meta: { status, msg },
      //     data
      //   } = res.data;
      //   if (status === 201) {
      //     //1.提示成功
      //     this.$message.success(msg);
      //     //2.更新视图
      //     this.getUserlist();
      //   } else {
      //     this.$message.warning(msg);
      //   }
    },

    // 编辑对话框打开
    showEdituser(user) {
      // 2.添加对话框
      this.dialogFormVisibleEdit = true;
      this.editUserForm = user;
      //user其实就是scope.row也就是userlist
    },

    //删除用户 打开消息盒子
    showDeleUserMsgBox(userId) {
      // 提示框 点击确定走.then
      // 点取消 走.catch
      this.$confirm("删除用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          // 注意async的位置，最近的位置
          // 发送删除请求:id:用户id
          // 1.data中找userId
          // 2.把userID以showDeleUserMsgBox参数形式传进来
          const res = await this.$http.delete(`users/${userId}`);
          if (res.data.meta.status === 200) {
            // 回到第一页展示
            //this.pagenum = 1;
            // 重新请求数据
            this.getUserlist();
            // 提示
            this.$message({
              type: "success",
              message: res.data.meta.msg
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    //   添加用户发送请求
    async AddUser() {
      // 2.关闭对话框
      this.dialogFormVisibleAdd = false;
      const res = await this.$http.post(`users`, this.form);
      const {
        meta: { status, msg },
        data
      } = res.data;
      if (status === 201) {
        //    1.提示成功
        this.$message.success(msg);

        // 3.更新视图
        this.getUserlist();
        // 4.清空文本框
        // 直接清空文本框
        // this.form={}
        // 遍历清空
        for (const key in this.form) {
          if (this.form.hasOwnProperty(key)) {
            this.form[key] = "";
          }
        }
      } else {
        this.$message.warning(msg);
      }
    },
    // 添加用户显示对话框
    showAddUserDia() {
      // 先点编辑 再点添加 打开表单清空表单
      this.form = {};
      this.dialogFormVisibleAdd = true;
    },
    //清空搜索框搜索数据 点击清楚按钮清除数据重新发送请求
    loadUserList() {
      this.getUserlist();
    },
    // 搜索用户 给搜索框绑定query v-model="query"
    searchUser() {
      this.getUserlist();
      // console.log("aaaaaa");
    },
    //分页功能
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      // 1.每页显示条数的改变
      this.pagesize = val;
      // 回到第一页
      this.pagenum = 1;
      // 希望当页条数改变时 从第一页开始显示 this.pagenum = 1 -》currPage=1?
      this.getUserlist();
    },
    handleCurrentChange(val) {
      //页码改变时
      console.log(`当前页: ${val}`);
      this.pagenum = val;
      this.getUserlist();
    },
    async getUserlist() {
      //需要授权的API ，必须在请求头中使用Authorization 字段token令牌
      //pagenum当前页面   pagesize每页显示条数
      //接口文档中 除了登录接口之外的所有请求都需要进行授权，设置请求头
      //找axios中关于请求头的代码  写在了http.js中
      // const AUTH_TOKEN = localStorage.getItem("token");
      // this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;
      const res = await this.$http.get(
        `users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`
      );
      // console.log(res);

      const {
        meta: { status, msg },
        data: { users, total }
      } = res.data;
      if (status === 200) {
        // 1.给表格数据赋值
        // 给总数赋值
        // 提示
        // 表格通过prop进行赋值展示一般数据
        this.userlist = users;
        this.total = total;
        this.$message.success(msg);
      } else {
        this.$message.warning(msg);
      }
    }
  },
  created() {
    this.getUserlist();
  }
};
</script>
<style scoped>
.arrow_right {
  padding: 10px 0px;
  margin-bottom: 10px;
}
/* .pp{
   justify-content: flex-end;
} */
.input-serach {
  width: 400px;
}
.el_button{
  background-color: #66b1ff !important;
    border-color: #66b1ff !important;
    color: #FFF !important;
}
</style>