<template>
  <div>
    <div style="background:white;width:99.1%;padding-left:15px">
      <my-bread level1="单位登记" level2="运输车档案登记" level3="运输企业登记管理"></my-bread>
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
          <h5 style="border-bottom:1px solid #ece8e8;padding-bottom:15px;padding-left:15px">查询企业</h5>
        </el-col>

        <el-col style="padding-left:15px" :span="22">
          <el-col :span="4">
            <el-input
              size="small"
              @clear="loadUserList()"
              clearable
              style="width:100%"
              class="input-serach"
              placeholder="请输入企业名称"
              v-model="name"
            ></el-input>
          </el-col>

          <el-col style="margin-left:30px" :span="4">
            <el-button
              size="small"
              style="width:100%"
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
      <el-table
        border
        :data="userlist"
        style="width: 100%;margin:20px 0px;padding-bottom:40px"
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
        <el-table-column prop="name" label="企业名称" show-overflow-tooltip></el-table-column>
        <el-table-column prop="adress" label="地址" show-overflow-tooltip></el-table-column>
        <el-table-column prop="legalUsername" label="法人代表姓名" show-overflow-tooltip></el-table-column>
        <el-table-column prop="phone" label="联系电话" show-overflow-tooltip></el-table-column>
        <el-table-column prop="businessLicenseNo" label="营业执照编号" show-overflow-tooltip></el-table-column>
        <el-table-column prop="certificationCompany" label="发证机关" show-overflow-tooltip></el-table-column>
        <el-table-column prop label="发证日期" show-overflow-tooltip>
          <template slot-scope="socpe">{{socpe.row.certificationDate | fmtdate}}</template>
        </el-table-column>
        <el-table-column prop="dangerousCarNo" label="危运证编号" show-overflow-tooltip></el-table-column>
        <el-table-column prop label="下次年审时间" show-overflow-tooltip>
          <template slot-scope="socpe">{{socpe.row.nextTrialTime | fmtdate}}</template>
        </el-table-column>

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

            <el-tooltip class="item" effect="dark" content="删除" :enterable="false" placement="top">
              <el-button
                type="danger"
                size="mini"
                plain
                icon="el-icon-delete"
                @click="showDeleUserMsgBox(scope.row.id)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>-->
      </el-table>

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
      <el-dialog
        title="添加信息"
        v-dialogDrag
        ref="dialog__wrapper"
        :close-on-click-modal="false"
        :visible.sync="dialogFormVisibleAdd"
      >
        <el-form @keyup.enter.native="AddUser" :model="form" :rules="rules" ref="form">
          <el-col :span="24">
            <el-col :span="10">
              <el-form-item label="企业名称" class="red_s" label-width="150px" prop="name">
                <el-input v-model="form.name" autocomplete="off"></el-input>
                <!-- disabled实现用户名禁止改动 -->
              </el-form-item>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="10">
              <el-form-item label="地址" class="red_s" label-width="150px" prop="adress">
                <el-input v-model="form.adress" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="10">
              <el-form-item label="法人代表" class="red_s" label-width="150px" prop="legalUsername">
                <el-input v-model="form.legalUsername" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="10">
              <el-form-item label="联系电话" class="red_s" label-width="150px" prop="phone">
                <el-input v-model="form.phone" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="10">
              <el-form-item label="营业执照编号" class="red_s" label-width="150px" prop="businessLicenseNo">
                <el-input v-model="form.businessLicenseNo" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="10">
              <el-form-item label="发证机关" class="red_s" label-width="150px" prop="certificationCompany">
                <el-input v-model="form.certificationCompany" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="10">
              <el-form-item label="发证日期" class="red_s" label-width="150px" prop="certificationDate">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="form.certificationDate"
                  style="width: 100%;"
                ></el-date-picker>
                <!-- <el-input v-model="form.certificationDate" autocomplete="off"></el-input> -->
              </el-form-item>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="10">
              <el-form-item label="危运证编号"class="red_s" label-width="150px" prop="dangerousCarNo">
                <el-input v-model="form.dangerousCarNo" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="10">
              <el-form-item class="red_s" label="下次年审时间" label-width="150px" prop="nextTrialTime">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="form.nextTrialTime"
                  style="width: 100%;"
                ></el-date-picker>
                <!-- <el-input v-model="form.nextTrialTime" autocomplete="off"></el-input> -->
              </el-form-item>
            </el-col>
          </el-col>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogForm()">取 消</el-button>
          <el-button type="primary" @click="AddUser()">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 修改用户 -->
      <el-dialog
        title="修改信息"
        v-dialogDrag
        ref="dialog__wrapper"
        :close-on-click-modal="false"
        :visible.sync="dialogFormVisibleEdit"
      >
        <el-form @keyup.enter.native="EditUser" :model="editUserForm" :rules="rules">
          <el-col :span="24">
            <el-col :span="10">
              <el-form-item label="企业名称" label-width="150px" prop="name">
                <el-input v-model="editUserForm.name" autocomplete="off"></el-input>
                <!-- disabled实现用户名禁止改动 -->
              </el-form-item>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="10">
              <el-form-item label="地址" label-width="150px" prop="adress">
                <el-input v-model="editUserForm.adress" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="10">
              <el-form-item label="法人代表" label-width="150px" prop="legalUsername">
                <el-input v-model="editUserForm.legalUsername" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="10">
              <el-form-item label="联系电话" label-width="150px" prop="phone">
                <el-input v-model="editUserForm.phone" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="10">
              <el-form-item label="营业执照编号" label-width="150px" prop="businessLicenseNo">
                <el-input v-model="editUserForm.businessLicenseNo" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="10">
              <el-form-item label="发证机关" label-width="150px" prop="certificationCompany">
                <el-input v-model="editUserForm.certificationCompany" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="10">
              <el-form-item label="发证日期" label-width="150px" prop="certificationDate">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="editUserForm.certificationDate"
                  style="width: 100%;"
                ></el-date-picker>
                <!-- <el-input v-model="form.certificationDate" autocomplete="off"></el-input> -->
              </el-form-item>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="10">
              <el-form-item label="危运证编号" label-width="150px" prop="dangerousCarNo">
                <el-input v-model="editUserForm.dangerousCarNo" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="10">
              <el-form-item label="下次年审时间" label-width="150px" prop="nextTrialTime">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="editUserForm.nextTrialTime"
                  style="width: 100%;"
                ></el-date-picker>
                <!-- <el-input v-model="form.nextTrialTime" autocomplete="off"></el-input> -->
              </el-form-item>
            </el-col>
          </el-col>
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
  name: "tagboard",
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
      // dialogFormVisibleRoleshow: false,
      //添加用户的表单的数据
      form: {
        name: "",
        adress: "",
        legalUsername: "",
        phone: "",
        businessLicenseNo: "",
        certificationCompany: "",
        certificationDate: "",
        dangerousCarNo: "",
        nextTrialTime: ""
      },
      rules: {
        name: [
          { required: true, message: "企业名称不能为空", trigger: "blur" }
        ],
        adress: [{ required: true, message: "地址不能为空", trigger: "blur" }],
        legalUsername: [
          { required: true, message: "法人代表姓名不能为空", trigger: "blur" }
        ],
        phone: [
          { required: true, message: "联系电话不能为空", trigger: "blur" },
          { min: 11, max: 11, message: "请输入11位手机号码", trigger: "blur" },
          {
            pattern: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
            message: "请输入正确的手机号码"
          }
        ],
        businessLicenseNo: [
          { required: true, message: "营业执照编号不能为空", trigger: "blur" }
        ],

        certificationCompany: [
          { required: true, message: "发证机关不能为空", trigger: "blur" }
        ],
        certificationDate: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "blur"
          }
        ],
        dangerousCarNo: [
          { required: true, message: "请输入危机证编号", trigger: "blur" }
        ],
        nextTrialTime: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "blur"
          }
        ]
      },
      // 编辑
      editUserForm: {
        name: "",
        adress: "",
        legalUsername: "",
        phone: "",
        businessLicenseNo: "",
        certificationCompany: "",
        certificationDate: "",
        dangerousCarNo: "",
        nextTrialTime: ""
      },
      // 分配角色,
      currRoleId: -1,
      //   分配当前用户id
      // currusrId: -1,
      roles: [],
      currUsername: "",
      multipleSelection: [], //批量删除数据
      delarr: [] //批量删除id
      //   保存所有角色数据
    };
  },
  created() {
    this.getUserlist();
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
        this.delarr.push(this.multipleSelection[i].id);
      }
      // this.delarrs=JSON.stringify(this.delarr)
      console.log(this.delarr);
      if (this.delarr == "") {
        this.$message({
          type: "error",
          message: "请选择需要删除的数据"
        });
      } else {
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
            const res = await this.$http.post(
              `/transport-enterprise/delete`,
              this.delarr
            );
            console.log(res);
            // this.getUserlist();
            this.delarr=[]
            // 提示
            if (res.data.code == 0) {
              this.$message({
                type: "success",
                message: res.data.msg
              });
              this.getUserlist();
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

    dialogForm() {
      this.dialogFormVisibleAdd = false;
      this.dialogFormVisibleAdd = false;
      if (this.$refs.form) {
        this.$refs.form.clearValidate();
      }
      this.visible = true;
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },
    // 修改
    // 修改用户发送请求
    async EditUser() {
      this.dialogFormVisibleEdit = false;
      const res = await this.$http.put(
        `/transport-enterprise`,
        this.editUserForm
      );
      console.log(res);
      if (res.data.code === 0) {
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
    //       // 注意async的位置，最近的位置
    //       // 发送删除请求:id:用户id
    //       // 1.data中找userId
    //       // 2.把userID以showDeleUserMsgBox参数形式传进来
    //       const res = await this.$http.delete(
    //         `/transport/enterpriseInformation/remove/${userId}`
    //       );
    //       // console.log(res);
    //       // this.getUserlist();
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
      this.$refs.form.validate(async valid => {
        if (valid) {
          const res = await this.$http.post(`/transport-enterprise`, this.form);
          console.log(res);
          // console.log(this.form);

          if (res.data.code === 0) {
            //    1.提示成功
            this.$message.success(res.data.msg);
            this.currPage = 1;
            // 3.更新视图
            this.getUserlist();
            this.dialogFormVisibleAdd = false;
            // 4.清空文本框
            // 直接清空文本框
            // this.form={}
            // 遍历清空
            // for (const key in this.form) {
            //   if (this.form.hasOwnProperty(key)) {
            //     this.form[key] = "";
            //   }
            // }
          } else {
            this.$message.warning(res.data.msg);
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
        `/transport-enterprise/findPage?pageSize=${this.pageSize}&currPage=${this.page}&name=${this.name}`
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
      const res = await this.$http.get(
        `/transport-enterprise/findPage?pageSize=${this.pageSize}&currPage=${this.currPage}&name=${this.name}`
      );
      console.log(res);
      // const {
      //   meta: { status, msg },
      //   data: { users, total }
      // } = res.data;
      if (res.status === 200) {
        // 1.给表格数据赋值
        // 给总数赋值
        // 提示
        // 表格通过prop进行赋值展示一般数据
        this.userlist = res.data.data.list;
        this.total = res.data.data.totalCount;
        this.totalPage = res.data.data.totalPage;
        // this.$message.success(msg);
      } else {
        this.$message.warning("获取失败");
      }
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
</style>
<style>
.el-table td,
.el-table th {
  text-align: center !important;
}
.el-table .warning-row {
  background: rgb(250, 249, 249) !important;
}

.el-table .success-row {
  background: rgb(250, 249, 249) !important;
}
.red_s{
  color: red;
}
</style>