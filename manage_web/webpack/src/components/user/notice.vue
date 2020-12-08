<template>
  <div>
    <div style="background:white;width:99.1%;padding-left:15px">
      <my-bread level1="系统管理" level2="公告管理"></my-bread>
    </div>
    <el-card class="box-card" style="margin:20px 20px 0 20px;">
      <!-- 面包屑 -->
      <!-- <el-breadcrumb separator-class="el-icon-arrow-right " class="arrow_right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
        <a href="/">用户管理</a>
      </el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      </el-breadcrumb>-->

      <!--搜索  -->
      <el-row>
        <el-col :span="24">
          <h5 style="border-bottom:1px solid #ece8e8;padding-bottom:15px;padding-left:15px">查询用户</h5>
        </el-col>
        <el-col style="padding-left:15px" :span="22">
          <el-col :span="4">
            <el-input
              size="small"
              style=" width: 100%;"
              @clear="loadUserList()"
              clearable
              class="input-serach"
              placeholder="请输入标题"
              v-model="query.announcementTile"
            ></el-input>
          </el-col>
          <el-col style="margin-left:30px" :span="4">
            <el-button
              style="width:100%;"
              size="small"
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

      <el-col style="margin-bottom:10px;margin-top:10px" :span="24">
        <el-col :span="20">&nbsp;</el-col>
        <el-col :span="2">
          <el-button type="success" @click="showAddUserDia()" style="font-size:13px" size="small">
            <i style="padding-right:10px" class="el-icon-plus"></i>新增
          </el-button>
        </el-col>

        <el-col :span="2">
          <el-button
            type="danger"
            size="small"
            style="font-size:13px"
            plain
            icon="el-icon-delete"
            @click="showDeleUserMsgBox"
          >删除</el-button>
        </el-col>
      </el-col>
      <!-- 表格 -->
      <template>
        <el-table
          border
          :data="updateuserlist"
          style="width: 100%;margin:10px 0px;padding-bottom:40px"
          :row-style="{height:'40px'}"
          :cell-style="{padding:'0px'}"
          @selection-change="handleCurrentChanges"
        >
          <el-table-column type="selection" width="50"></el-table-column>
          <el-table-column type="index" label="序号" width="50" show-overflow-tooltip>
            <template slot-scope="socpe">
              <p style="cursor:pointer;" @click="showEdituser(socpe.row)">{{socpe.$index+1}}</p>
            </template>
          </el-table-column>
          <el-table-column prop="announcementTile" label="标题" show-overflow-tooltip></el-table-column>
          <el-table-column prop="announcementContent" label="内容概括" show-overflow-tooltip></el-table-column>

          <el-table-column label="日期">
            <!-- main.js写了一个全局过滤器 -->
            <!-- 如果单元格内显示的内容不是字符串（文本）
            需要给被显示的内容包裹一个template-->
            <!-- template内部要用数据 设置slot-scope属性
            该属性的值是要用数据create_time的数据源userlist-->
            <!-- slot-scope的值userlist其实就是el-table绑定的数据userlist
            userlist.row >数组中的每个对象-->
            <!-- slot-scope自动去找上一级所绑定的数据 userlist-->
            <template
              slot-scope="socpe"
              show-overflow-tooltip
            >{{socpe.row.announcementDate | fmtdate}}</template>
          </el-table-column>
          <el-table-column prop="browse" show-overflow-tooltip label="浏览器次数"></el-table-column>
          <!-- <el-table-column prop="operation" label="操作"></el-table-column> -->

          <!-- 表格操作 -->
          <!-- <el-table-column prop="address" width="150" label="操 作">
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
                ></el-button>
              </el-tooltip>
              <el-tooltip
                class="item"
                effect="dark"
                content="删除"
                :enterable="false"
                placement="top"
              >
                <el-button
                  type="danger"
                  size="mini"
                  plain
                  icon="el-icon-delete"
                  @click="showDeleUserMsgBox(scope.row.announcementId)"
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
        :current-page="pageNum"
        :page-sizes="[10,15,20,25,30]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>

      <!-- 对话框 -->
      <!-- 添加对话框 -->
      <el-dialog
        title="添加信息"
        v-dialogDrag
        :close-on-click-modal="false"
        :visible.sync="dialogFormVisibleAdd"
      >
        <el-form :model="form" :rules="rules" ref="form">
          <el-form-item label="标题" label-width="100px" class="red_s" prop="announcementTile">
            <el-input v-model="form.announcementTile" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="内容概括" label-width="100px" class="red_s" prop="announcementContent">
            <el-input v-model="form.announcementContent" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
          <el-button type="primary" @click="AddUser()">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 修改对话框 -->
      <el-dialog
        title="修改信息"
        v-dialogDrag
        :close-on-click-modal="false"
        :visible.sync="dialogFormVisibleEdit"
      >
        <el-form :model="editUserForm">
          <el-form-item hidden="hidden" label="id" label-width="100px" prop="announcementTile">
            <el-input v-model="editUserForm.announcementId" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="标题" label-width="100px" prop="announcementTile">
            <el-input v-model="editUserForm.announcementTile" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="内容概括" label-width="100px" prop="announcementContent">
            <el-input v-model="editUserForm.announcementContent" autocomplete="off"></el-input>
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
  name: "user",
  data() {
    return {
      query: {
        announcementTile: ""
      },
      updateuserlist: [],
      //分页相关数据
      total: -1,
      pageNum: 1,
      pageSize: 10,
      // 添加对话框的属性
      dialogFormVisibleAdd: false,
      dialogFormVisibleEdit: false,
      // dialogFormVisibleRoleshow: false,
      //添加用户的表单的数据
      form: {
        announcementTile: "",
        announcementContent: ""
      },
      // 编辑
      editUserForm: {
        announcementId: "",
        announcementTile: "",
        announcementContent: ""
      },
      rules: {
        announcementTile: [
          { required: true, message: "标题不能为空", trigger: "blur" }
        ],
        announcementContent: [
          { required: true, message: "内容概况不能为空", trigger: "blur" }
        ]
      },
      // 分配角色,
      currRoleId: -1,
      //   分配当前用户id
      currusrId: -1,
      roles: [],
      //表格绑定的数据

      currUsername: "",
      multipleSelection: [], //批量删除数据
      delarr: [] //批量删除id
      //   保存所有角色数据
    };
  },
  created() {
    //  debugger;
    this.updateUserlist();
  },
  watch: {
    dialogFormVisibleAdd: function(val, oldVla) {
      this.$refs["form"].resetFields();
    }
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
        this.delarr.push(this.multipleSelection[i].announcementId);
      }
      console.log(this.delarr);
      if (this.delarr == "") {
        this.$message({
          type: "error",
          message: "请选择需要删除的数据"
        });
      } else {
        this.$confirm("是否删除这条公告?", "提示", {
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
              `/announcement/delete`,
              this.delarr
            );
            console.log(res);
            this.delarr = [];
            // 提示
            if (res.data.code === 0) {
              // debugger;
              this.$message({
                type: "success",
                message: res.data.msg
              });
              this.updateUserlist();
            } else if (res.data.code == 1) {
              this.$message({
                type: "warning",
                message: res.data.msg
              });
            }
          })
          .catch(() => {
            // this.getUserlist();
            this.$message({
              type: "info",
              message: "已取消删除"
            });
            this.delarr = [];
          });
      }
    },

    // 编辑用户
    // 编辑用户发送请求
    async EditUser(user) {
      //   users/:id
      this.dialogFormVisibleEdit = false;
      const res = await this.$http.put(
        `/announcement/update`,
        this.editUserForm
      );
      console.log(res);
      if (res.data.code === 0) {
        // 回到第一页展示
        //this.pagenum = 1;
        // 重新请求数据
        this.updateUserlist();
        // 提示
        this.$message({
          type: "success",
          message: res.data.msg
        });
      } else {
        this.$message({
          type: "wraning",
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
      this.updateUserlist();
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
    //       const res = await this.$http.delete(`/announcement/delete/${userId}`);
    //       console.log(res);

    //       if (res.data.code === 0) {
    //         // 回到第一页展示
    //         //this.pagenum = 1;
    //         // 重新请求数据
    //         this.updateUserlist();
    //         // 提示
    //         this.$message({
    //           type: "success",
    //           message: res.data.msg
    //         });
    //       } else {
    //         this.$message({
    //           type: "wraning",
    //           message: "删除失败"
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
      this.$refs.form.validate(async valid => {
        if (valid) {
          const res = await this.$http.post(`/announcement/insert`, this.form);
          console.log(res);
          if (res.data.code === 0) {
            // 回到第一页展示
            //this.pagenum = 1;
            // 重新请求数据
            this.updateUserlist();
            // 提示
            this.$message({
              type: "success",
              message: res.data.msg
            });
            this.dialogFormVisibleAdd = false;
          } else {
            this.$message({
              type: "danger",
              message: "新增失败"
            });
          }
        } else {
          this.$message({
            type: "error",
            message: "请填写内容再试"
          });
          this.dialogFormVisibleAdd = true;
        }
      });
    },
    // 添加用户显示对话框
    showAddUserDia() {
      // 先点编辑 再点添加 打开表单清空表单
      // this.form = {};
      this.dialogFormVisibleAdd = true;
    },
    //清空搜索框搜索数据 点击清楚按钮清除数据重新发送请求
    loadUserList() {
      this.updateUserlist();
    },
    // 搜索用户 给搜索框绑定query v-model="query"
    async searchUser() {
      const res = await this.$http.post(
        `/announcement/likeSearch/${this.pageNum}/${this.pageSize}`,
        this.query
      );
      console.log(res);

      if (res.data.code === 0) {
        this.updateuserlist = res.data.data.list;
        this.total = res.data.data.total;
        this.$message({
          type: "success",
          message: res.data.msg
        });
      }
      // this.updateUserlist();
      // console.log("aaaaaa");
    },
    //分页功能
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      // 1.每页显示条数的改变
      this.pageSize = val;
      // 回到第一页
      this.pageNum = 1;
      // 希望当页条数改变时 从第一页开始显示 this.pagenum = 1 -》currPage=1?
      this.updateUserlist();
    },
    handleCurrentChange(val) {
      //页码改变时
      console.log(`当前页: ${val}`);
      this.pageNum = val;
      this.updateUserlist();
    },
    async updateUserlist() {
      //debugger;
      //需要授权的API ，必须在请求头中使用Authorization 字段token令牌
      //pagenum当前页面   pagesize每页显示条数
      //接口文档中 除了登录接口之外的所有请求都需要进行授权，设置请求头
      //找axios中关于请求头的代码  写在了http.js中
      // const AUTH_TOKEN = localStorage.getItem("token");
      // this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;
      const res = await this.$http.get(
        `/announcement/findAll/${this.pageNum}/${this.pageSize}`
      );
      console.log(res);
      this.updateuserlist = res.data.data.list;
      this.total = res.data.data.total;

      //  let Idd=res.data.data.list;

      //  console.log(Idd);

      //  this.announcementId=[]
      //  for(let i=0;i<Idd.length;i++){
      //     let ddd= Idd[i].announcementId
      //     // console.log(ddd);
      //     // this.announcementId.push(ddd)
      //  }
      // let arrId=[]
      // Idd.list.foreach(item1=>{

      //   // arrId.push(item1.announcementId)
      // })
      // console.log(this.announcementId);

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
  }
};
</script>
<style scoped>
.el-tooltip__popper {
  max-width: 0%;
}
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
.red_s{
  color:red;
}
</style>
