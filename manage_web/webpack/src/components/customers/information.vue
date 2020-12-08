<template>
  <div>
    <div style="background:white;width:99.1%;padding-left:15px">
      <my-bread level1="综合查询" level2="液化气瓶" level3="客户配送信息"></my-bread>
    </div>
    <el-card class="box-card" style="margin:20px 20px 0 20px;">
      <el-row>
        <el-col :span="24">
          <h5 style="border-bottom:1px solid #ece8e8;padding-bottom:15px;padding-left:15px">查询信息</h5>
        </el-col>

        <el-col style="padding-left:15px" :span="22">
          <el-col :span="4">
            <el-input
              size="small"
              style=" width: 100%;"
              @clear="loadUserList()"
              clearable
              class="input-serach"
              placeholder="请输入订单编号"
              v-model="orderNo"
            ></el-input>
          </el-col>

          <el-col style="margin-left:30px" :span="4">
            <el-button
              size="small"
              style=" width: 100%;"
              @click="searchUser()"
              class="el_button"
              icon="el-icon-search"
            >搜索</el-button>
          </el-col>
        </el-col>
      </el-row>
      <el-col :span="24">
        <p
          style="width:100%;height:1px;background:rgb(236, 232, 232);margin:20px 0px 0px 0px;z-index:999"
        ></p>
      </el-col>

      <el-col style="margin-bottom:5px;margin-top:5px" :span="24">
        <el-col :span="22">&nbsp;</el-col>
        <el-col :span="2">
          <el-button @click="showAddUserDia()" type="primary">
            <i style="padding-right:10px" class="el-icon-plus"></i>新增
          </el-button>
        </el-col>
      </el-col>
      <!-- 表格 -->
      <template>
        <el-table
          :row-style="{height:'40px'}"
          :cell-style="{padding:'0px'}"
          border
         
          :data="userlist"
          style="width: 100%;margin:20px 5px;padding-bottom:40px"
          @selection-change="handleCurrentChanges"
        >
          <!-- <el-table-column type="index" label="序号" width="70"></el-table-column> -->
          <el-table-column show-overflow-tooltip prop="orderNo" label="订单编号" width="120"></el-table-column>
          <el-table-column show-overflow-tooltip prop="customerId" label="客户信息"></el-table-column>
          <!-- <el-table-column prop="createTime" label="创建日期"></el-table-column> -->
          <el-table-column show-overflow-tooltip label="创建日期">
            <template slot-scope="socpe">{{socpe.row.createTime | fmtdate}}</template>
          </el-table-column>
          <el-table-column show-overflow-tooltip prop="deliverySite" label="配送站点"></el-table-column>
          <el-table-column prop="state" label="订单状态">
            <template slot-scope="scope">
              <p v-if="userlist[scope.$index].state==0">待接单</p>
              <p v-if="userlist[scope.$index].state==1">已接单</p>
            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip prop="employeeName" label="接单员"></el-table-column>
          <!-- 表格操作 -->
          <el-table-column prop="address" width="100" label="操 作">
            <template slot-scope="scope">
            

              <el-tooltip
                class="item"
                effect="dark"
                content="查看角色"
                :enterable="false"
                placement="top"
              >
                <el-button
                  type="primary"
                  size="mini"
                  title="查看角色"
                  plain
                  icon="el-icon-edit"
                  @click="showEdituser(scope.row)"
                  circle
                ></el-button>
              </el-tooltip>
            

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
        style="padding:5px 15px 15px 15px;display:flex; justify-content: flex-end;"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currPage"
        :page-sizes="[10,15,20,25,30]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>

      <!-- 对话框 -->
      <!-- 添加对话框 -->
      <el-dialog title="添加用户" v-dialogDrag :close-on-click-modal="false" :visible.sync="dialogFormVisibleAdd">
        <el-form :model="form" :rules="rules">
          <el-form-item label="订单编号" label-width="100px" prop="orderNo">
            <el-input v-model="form.orderNo" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="客户信息" label-width="100px" prop="customerId">
            <el-input v-model="form.customerId" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="创建日期" label-width="100px" prop="createTime">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="form.createTime"
              style="width: 100%;"
            ></el-date-picker>
            <!-- <el-input v-model="form.createTime" autocomplete="off"></el-input> -->
          </el-form-item>

          <el-form-item label="配送站点" label-width="100px" prop="deliverySite">
            <el-input v-model="form.deliverySite" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="订单状态" label-width="100px" prop="state">
            <el-select v-model="form.state" filterable placeholder="请选择活动区域">
              <el-option
                v-for="item in formstate"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <!-- <el-input v-model="form.state" autocomplete="off"></el-input> -->
          </el-form-item>

          <el-form-item label="接单员" label-width="100px" prop="employeeName">
            <el-input v-model="form.employeeName" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
          <el-button type="primary" @click="AddUser()">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 编辑对话框 -->
      <el-dialog title="修改信息" :visible.sync="dialogFormVisibleEdit">
        <el-form :model="editUserForm" :rules="rules">
          <el-form-item label="订单编号" label-width="100px" prop="orderNo">
            <el-input v-model="editUserForm.orderNo" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="客户信息" label-width="100px" prop="customerId">
            <el-input v-model="editUserForm.customerId" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="创建日期" label-width="100px" prop="createTime">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="editUserForm.createTime"
              style="width: 100%;"
            ></el-date-picker>
            <!-- <el-input v-model="form.createTime" autocomplete="off"></el-input> -->
          </el-form-item>

          <el-form-item label="配送站点" label-width="100px" prop="deliverySite">
            <el-input v-model="editUserForm.deliverySite" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="订单状态" label-width="100px" prop="state">
            <el-select v-model="editUserForm.state" filterable placeholder="请选择活动区域">
              <el-option
                v-for="item in formstate"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <!-- <el-input v-model="editUserForm.state" autocomplete="off"></el-input> -->
          </el-form-item>

          <el-form-item label="接单员" label-width="100px" prop="orderClerk">
            <el-input v-model="editUserForm.employeeName" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
          <el-button type="primary" @click="EditUser()">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
export default {
  name: "order",
  data() {
    return {
      orderNo: "",
      userlist: [],
      //分页相关数据
      total: -1,
      currPage: 1,
      page: 1,
      pageSize: 10,
      // 添加对话框的属性
      dialogFormVisibleAdd: false,
      dialogFormVisibleEdit: false,
      // dialogFormVisibleRoleshow: false,
      //添加用户的表单的数据

      form: {
        orderNo: "",
        customerId: "",
        createTime: "",
        deliverySite: "",
        state: "",
        employeeName: ""
      },
      formstate: [
        {
          value: "0",
          label: "待接单"
        },
        {
          value: "1",
          label: "已接单"
        }
      ],
      rules: {
        orderNo: [
          { required: true, message: "订单编号不能为空", trigger: "blur" }
        ],
        customerId: [
          { required: true, message: "客户信息不能为空", trigger: "blur" }
        ],
        createTime: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "blur"
          }
        ],
        deliverySite: [
          { required: true, message: "配送站点不能为空", trigger: "blur" }
        ],
        state: [
          { required: true, message: "订单状态不能为空", trigger: "blur" }
        ],

        orderClerk: [
          { required: true, message: "接单员不能为空", trigger: "blur" }
        ]
      },
      // 编辑
      editUserForm: {
        orderNo: "",
        customerId: "",
        createTime: "",
        deliverySite: "",
        state: "",
        employeeName: ""
      },
      // 分配角色,
      currRoleId: -1,
      //   分配当前用户id
      currusrId: -1,
      roles: [],
      currUsername: ""
      //   保存所有角色数据
    };
  },

  methods: {
    // 编辑用户
    // 编辑用户发送请求
    async EditUser() {
      //   users/:id
      this.dialogFormVisibleEdit = false;
      const res = await this.$http.post(
        `/public/customer/orderinformation/update`,
        this.editUserForm
      );
      console.log(res);
      if (res.data.code === 0) {
        // 回到第一页展示
        //this.pagenum = 1;
        // 重新请求数据
        // this.getUserlist();
        // 提示
        this.$message({
          type: "success",
          message: res.data.msg
        });
      } else {
        this.$message({
          type: "danger",
          message: "修改失败"
        });
      }

      //  const { data: res } = await this.$http.get(`users/` + id)
      // if (res.data.meta.status !== 200) {
      //   return this.$message.error("查询用户信息失败！");
      // }
    },

    // 编辑对话框打开
    showEdituser(user) {
      // 2.添加对话框
      this.dialogFormVisibleEdit = true;
      this.editUserForm = user;
      //user其实就是scope.row也就是userlist
    },

    //删除用户 打开消息盒子
    // showDeleUserMsgBox(userId) {
    //   // 提示框 点击确定走.then
    //   // 点取消 走.catch
    //   this.$confirm("删除用户, 是否继续?", "提示", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     type: "warning"
    //   })
    //     .then(async () => {
    //       // 注意async的位置，最近的位置
    //       // 发送删除请求:id:用户id
    //       // 1.data中找userId
    //       // 2.把userID以showDeleUserMsgBox参数形式传进来
    //       const res = await this.$http.delete(
    //         `/public/customer/orderinformation/remove/${userId}`
    //       );
    //       console.log(res);
    //       if (res.data.code === 0) {
    //         // 回到第一页展示
    //         //this.pagenum = 1;
    //         // 重新请求数据
    //         this.getUserlist();
    //         // 提示
    //         this.$message({
    //           type: "success",
    //           message: res.data.msg
    //         });
    //       }

    //       // if (res.data.meta.status === 200) {
    //       //   // 回到第一页展示
    //       //   //this.pagenum = 1;
    //       //   // 重新请求数据
    //       //   this.getUserlist();
    //       //   // 提示
    //       //   this.$message({
    //       //     type: "success",
    //       //     message: res.data.meta.msg
    //       //   });
    //       // }
    //     })
    //     .catch(() => {
    //       this.$message({
    //         type: "info",
    //         message: "已取消删除"
    //       });
    //     });
    // },

    //   添加用户发送请求
    async AddUser() {
      // 2.关闭对话框
      this.dialogFormVisibleAdd = false;
      const res = await this.$http.post(
        `/public/customer/orderinformation/save`,
        this.form
      );
      console.log(res);
      if (res.data.code === 0) {
        // 回到第一页展示
        //this.pagenum = 1;
        // 重新请求数据
        this.getUserlist();
        // 提示
        this.$message({
          type: "success",
          message: res.data.msg
        });
      } else {
        this.$message({
          type: "danger",
          message: "修改失败"
        });
      }

      // const {
      //   meta: { status, msg },
      //   data
      // } = res.data;
      // if (status === 201) {
      //   //    1.提示成功
      //   // this.$message.success(msg);

      //   // 3.更新视图
      //   this.getUserlist();
      //   // 4.清空文本框
      //   // 直接清空文本框
      //   // this.form={}
      //   // 遍历清空
      //   for (const key in this.form) {
      //     if (this.form.hasOwnProperty(key)) {
      //       this.form[key] = "";
      //     }
      //   }
      // } else {
      //   this.$message.warning(msg);
      // }
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
    async searchUser() {
      const res = await this.$http.get(
        `/public/customer/orderinformation/pageList?pageSize=${this.pageSize}&currPage=${this.page}&orderNo=${this.orderNo}`
      );
      this.userlist = res.data.data.list;
      this.total = res.data.data.totalCount;
      //  console.log(this.userlist);
      this.currPage = 1;
    },
    //分页功能
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      // 1.每页显示条数的改变
      this.pageSize = val;
      // 回到第一页
      this.currPage = 1;
      // 希望当页条数改变时 从第一页开始显示 this.pagenum = 1 -》currPage=1?
      this.getUserlist();
    },
    handleCurrentChange(val) {
      //页码改变时
      console.log(`当前页: ${val}`);
      this.currPage = val;
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
        `/public/customer/orderinformation/pageList?pageSize=${this.pageSize}&currPage=${this.currPage}&orderNo=${this.orderNo}`
      );
      console.log(res);
      this.userlist = res.data.data.list;
      this.total = res.data.data.totalCount;
      // const {
      //   meta: { status, msg },
      //   data: { users, total }
      // } = res.data;
      // if (status === 200) {
      //   // 1.给表格数据赋值
      //   // 给总数赋值
      //   // 提示
      //   // 表格通过prop进行赋值展示一般数据
      //   this.userlist = users;
      //   this.total = total;
      //   this.$message.success(msg);
      // } else {
      //   this.$message.warning(msg);
      // }
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
.el_button {
  background-color: #66b1ff !important;
  border-color: #66b1ff !important;
  color: #fff !important;
}
</style>