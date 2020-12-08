<template>
  <div>
    <div style="background:white;width:99.1%;padding-left:15px">
      <my-bread level1="综合查询" level2="液化气瓶" level3="客户评价投诉处理"></my-bread>
    </div>
    <el-card class="box-card" style="margin:20px 20px 0 20px;">
      <!--搜索  -->
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
              placeholder="请输入评价人姓名"
              v-model="name"
            ></el-input>
          </el-col>

          <el-col style="margin-left:30px" :span="4">
            <el-button
              @click="searchUser()"
              size="small"
              style=" width: 100%;"
              class="el_button"
              icon="el-icon-search"
            >搜索</el-button>
          </el-col>
        </el-col>

        <el-col :span="24">
          <p
            style="width:100%;height:1px;background:rgb(236, 232, 232);margin:20px 0px 0px 0px;z-index:999"
          ></p>
        </el-col>

        <el-col style="margin-bottom:5px;margin-top:5px" :span="24">
          <el-col :span="22">&nbsp;</el-col>

          <el-col :span="2">
            <el-button
            style="font-size:13px"
              size="small"
              plain
              icon="el-icon-delete"
              @click="showDeleUserMsgBox"
              type="danger"
            >删除</el-button>
          </el-col>
        </el-col>
      </el-row>
      <!-- 表格 -->
      <template>
        <el-table
          :row-style="{height:'40px'}"
          :cell-style="{padding:'0px'}"
          border
          :data="userlist"
          style="width: 100%;margin:10px 0px;padding-bottom:40px"
          @selection-change="handleCurrentChanges"
        >
          <el-table-column type="selection" width="50"></el-table-column>
          <el-table-column type="index" label="序号" width="50" show-overflow-tooltip>
            <template slot-scope="socpe">
              <p style="cursor:pointer;" @click="showEdituser(socpe.row)">{{socpe.$index+1}}</p>
            </template>
          </el-table-column>
          <!-- <el-table-column show-overflow-tooltip prop="orderId" label="订单信息" width="200"></el-table-column> -->
          <!--  score-template="{scope.row.evaluateLevel}"-->

          <el-table-column show-overflow-tooltip prop="evaluateContent" label="评价内容"></el-table-column>
          <el-table-column show-overflow-tooltip prop="name" label="评价人姓名"></el-table-column>
          <el-table-column show-overflow-tooltip prop="phone" label="联系电话"></el-table-column>
          <el-table-column prop label="评价等级">
            <template slot-scope="scope">
              <el-rate v-model="scope.row.evaluateLevel" disabled text-color="#ff9900"></el-rate>
            </template>
          </el-table-column>

          <!-- 表格操作 -->
          <!-- <el-table-column prop="address" width="100" label="操 作">
            <template slot-scope="scope">
              <el-tooltip
                class="item"
                effect="dark"
                content="修改信息"
                :enterable="false"
                placement="top"
              >
                <el-button
                  type="primary"
                  size="mini"
                  title="修改"
                  plain
                  icon="el-icon-edit"
                  @click="showEdituser(scope.row)"
                  circle
                ></el-button>
              </el-tooltip>
            </template>
          </el-table-column>-->
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

      <!-- 编辑对话框 -->
      <el-dialog
        title="修改信息"
        v-dialogDrag
        :close-on-click-modal="false"
        :visible.sync="dialogFormVisibleEdit"
      >
        <el-form :model="editUserForm" :rules="rules">
          <el-form-item label="订单信息" label-width="100px" prop="orderId">
            <el-input v-model="editUserForm.orderId" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="评价等级" label-width="100px" prop="evaluateLevel">
            <!-- border:1px solid #dcdfe6; -->
            <el-rate
              style="margin-top:10px;padding:2px 10px 5px 10px"
              v-model="editUserForm.evaluateLevel"
            ></el-rate>
            <!-- <el-input v-model="form.evaluateLevel" autocomplete="off"></el-input> -->
          </el-form-item>

          <el-form-item label="评价人" label-width="100px" prop="name">
            <el-input v-model="editUserForm.name" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="联系电话" label-width="100px" prop="phone">
            <el-input v-model="editUserForm.phone" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="评价内容" label-width="100px" prop="evaluateContent">
            <el-input type="textarea" v-model="editUserForm.evaluateContent" autocomplete="off"></el-input>
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
  name: "evaluate",
  data() {
    return {
      name: "",
      userlist: [],
      //分页相关数据
      total: -1,
      currPage: 1,
      page: 1,
      pageSize: 10,
      // 添加对话框的属性
      dialogFormVisibleAdd: false,
      dialogFormVisibleEdit: false,

      rules: {
        orderId: [{ required: true, message: "订单信息为空", trigger: "blur" }],
        evaluateLevel: [
          { required: true, message: "评价内容不能为空", trigger: "blur" }
        ],
        evaluateContent: [
          { required: true, message: "评价人内容不能为空", trigger: "blur" }
        ],
        name: [
          { required: true, message: "评价人姓名不能为空", trigger: "blur" }
        ],
        phone: [
          { required: true, message: "联系电话不能为空", trigger: "blur" },
          { min: 11, max: 11, message: "请输入11位手机号码", trigger: "blur" },
          {
            pattern: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
            message: "请输入正确的手机号码"
          }
        ]

        // orderClerk: [
        //   { required: true, message: "接单员不能为空", trigger: "blur" }
        // ]
      },
      // 编辑
      editUserForm: {
        id: "",
        orderId: "",
        evaluateLevel: 0,
        evaluateContent: "",
        name: "",
        phone: ""
      },
      // 分配角色,
      currRoleId: -1,
      //   分配当前用户id
      currusrId: -1,
      roles: [],
      currUsername: "",
      multipleSelection: [], //批量删除数据
      delarr: [] //批量删除id
      //   保存所有角色数据
    };
  },

  methods: {
    // 多选
    handleCurrentChanges(val) {
      this.multipleSelection = val;
      // this.showDeleUserMsgBox = val.length;
    },

    // 批量删除请求数据
    showDeleUserMsgBox() {
      for (let i = 0; i <= this.multipleSelection.length - 1; i++) {
        this.delarr.push(this.multipleSelection[i].id);
      }
      console.log(this.delarr);
      if (this.delarr == "") {
        this.$message({
          type: "error",
          message: "请选择需要删除的数据"
        });
      } else {
        this.$confirm("是否删除这条信息?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(async () => {
            // 注意async的位置，最近的位置
            // 发送删除请求:id:用户id
            // 1.data中找userId
            // 2.把userID以showDeleUserMsgBox参数形式传进来
            const res = await this.$http.post(
              `/public/customer/commentinformation/remove`,
              this.delarr
            );
            console.log(res);
            this.delarr = [];
            this.getUserlist();
            // 提示
            if (res.data.code == 0) {
              this.$message({
                type: "success",
                message: res.data.msg
              });
            } else if (res.data.code == 1) {
              this.$message({
                type: "warning",
                message: res.data.msg
              });
            }
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
            this.delarr = [];
          });
      }
    
    },

    // 修改用户发送请求
    async EditUser() {
      //   users/:id
      this.dialogFormVisibleEdit = false;
      const res = await this.$http.post(
        `/public/customer/commentinformation/update`,
        this.editUserForm
      );
      console.log(res);
      if (res.data.code === 0) {
        // 提示
        this.$message({
          type: "success",
          message: res.data.msg
        });
        this.getUserlist();
      }
    },

    // 编辑对话框打开
    showEdituser(user) {
      // 2.添加对话框
      this.dialogFormVisibleEdit = true;
      this.editUserForm = user;
      this.getUserlist();
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
    //       const res = await this.$http.delete(
    //         `/public/customer/commentinformation/remove/${userId}`
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
    //       } else {
    //         this.$message({
    //           type: "danger",
    //           message: "删除失败"
    //         });
    //       }
    //     })
    //     .catch(() => {
    //       this.$message({
    //         type: "info",
    //         message: "已取消删除"
    //       });
    //     });
    // },

    //清空搜索框搜索数据 点击清楚按钮清除数据重新发送请求
    loadUserList() {
      this.getUserlist();
    },
    // 搜索用户 给搜索框绑定query v-model="query"
    async searchUser() {
      const res = await this.$http.get(
        `/public/customer/commentinformation/pageList?pageSize=${this.pageSize}&currPage=${this.page}&name=${this.name}`
      );
      this.userlist = res.data.data.list;
      this.total = res.data.data.totalCount;
      console.log(this.userlist);
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
      //this.userlist=res.data.data.list
    },
    async getUserlist() {
      //需要授权的API ，必须在请求头中使用Authorization 字段token令牌
      //pagenum当前页面   pagesize每页显示条数
      //接口文档中 除了登录接口之外的所有请求都需要进行授权，设置请求头
      //找axios中关于请求头的代码  写在了http.js中
      // const AUTH_TOKEN = localStorage.getItem("token");
      // this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;
      const res = await this.$http.get(
        `/public/customer/commentinformation/pageList?pageSize=${this.pageSize}&currPage=${this.currPage}&name=${this.name}`
      );
      // &name=${this.name}
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