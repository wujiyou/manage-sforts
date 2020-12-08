 show-overflow-tooltip<template>
  <el-card class="box-card">
    <!-- 面包屑 -->
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right " class="arrow_right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
        <a href="/">用户管理</a>
      </el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>-->
   <my-bread level1="综合查询" level2="车用气瓶" level3="气瓶数量状态统计"></my-bread>
    <!--搜索  -->
    <el-row>
      <el-col :span="21">
        &nbsp;
        <el-input
          @clear="loadUserList()"
          clearable
          class="input-serach"
          placeholder="请输入企业名称"
          v-model="name"
         
        >
          <el-button @click="searchUser()" slot="append" class="el_button" icon="el-icon-search">搜索</el-button>
        </el-input>
      </el-col>
      <!-- <el-col :span="3">
        <el-button @click="showAddUserDia()" type="primary">
          <i style="padding-right:10px" class="el-icon-plus"></i>新增
        </el-button>
      </el-col> -->
    </el-row>
    <!-- 表格 -->
    <template>
      <el-table :header-cell-style="{background:'#f6f6f6',color:'#606266'}" stripe border  height="474px"  :data="userlist" style="width: 100%;margin-top:20px">
        <el-table-column show-overflow-tooltip type="index" label="编号" width="70"></el-table-column>
        <el-table-column show-overflow-tooltip prop="name" label="登记证号" width="120"></el-table-column>
        <el-table-column show-overflow-tooltip prop="name" label="气瓶编号" width="120"></el-table-column>
        <el-table-column show-overflow-tooltip prop="adress" label="标签号"></el-table-column>
        <el-table-column show-overflow-tooltip prop="legalUsername" label="制造单位"></el-table-column>
         <el-table-column show-overflow-tooltip prop label="制造日期">
          <template slot-scope="socpe">{{socpe.row.certificationDate | fmtdate}}</template>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop label="检验日期">
          <template slot-scope="socpe">{{socpe.row.nextTrialTime | fmtdate}}</template>
        </el-table-column>

        <el-table-column show-overflow-tooltip prop label="下次检验日期">
          <template slot-scope="socpe">{{socpe.row.nextTrialTime | fmtdate}}</template>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="businessLicenseNo" label="气瓶状态"></el-table-column>
       
        

        <!-- <el-table-column prop="create_time" label="创建时间"></el-table-column> -->
        <!-- main.js写了一个全局过滤器 -->
        <!-- 如果单元格内显示的内容不是字符串（文本）
        需要给被显示的内容包裹一个template-->
        <!-- template内部要用数据 设置slot-scope属性
        该属性的值是要用数据create_time的数据源userlist-->
        <!-- slot-scope的值userlist其实就是el-table绑定的数据userlist
        userlist.row >数组中的每个对象-->
        <!-- slot-scope自动去找上一级所绑定的数据 userlist-->
        <!-- <el-table-column label="下次年审时间">
         
          <template slot-scope="socpe">{{socpe.row.nextTrialTime | fmtdate}}</template>
        </el-table-column>-->

        <!-- 表格操作 -->
        <el-table-column prop="" width="150" label="操作">
          <template slot-scope="scope">
            <!-- size 调整按钮大小 -->
            <!-- 编辑 -->

            <el-tooltip
              class="item"
              effect="dark"
              content="查看"
              :enterable="false"
              placement="top"
            >
              <el-button
                type="primary"
                size="mini"
                title="查看"
                plain
                icon="el-icon-edit"
                @click="showEdituser(scope.row)"
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
      style="border:1px solid #ebeef5;padding:5px 15px;display:flex; justify-content: flex-end;"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currPage"
      :page-sizes="[2,4,8,12,16]"
      :page-size="4"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>

    <!-- 对话框 -->
    <!-- 添加对话框 -->
    <!-- <el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdd">
      <el-form :model="form" :rules="rules">
        <el-form-item label="企业名称" label-width="150px" prop="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
         
        </el-form-item>

        <el-form-item label="地址" label-width="150px" prop="adress">
          <el-input v-model="form.adress" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="法人代表" label-width="150px" prop="legalUsername">
          <el-input v-model="form.legalUsername" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" label-width="150px" prop="phone">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="营业执照编号" label-width="150px" prop="businessLicenseNo">
          <el-input v-model="form.businessLicenseNo" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="发证机关" label-width="150px" prop="certificationCompany">
          <el-input v-model="form.certificationCompany" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="发证日期" label-width="150px" prop="certificationDate">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.certificationDate"
            style="width: 100%;"
          ></el-date-picker>
         
        </el-form-item>
        <el-form-item label="危运证编号" label-width="150px" prop="dangerousCarNo">
          <el-input v-model="form.dangerousCarNo" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="下次年审时间" label-width="150px" prop="nextTrialTime">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.nextTrialTime"
            style="width: 100%;"
          ></el-date-picker>
         
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click="AddUser()">确 定</el-button>
      </div>
    </el-dialog> -->

    <!-- 修改用户 -->
    <!-- <el-dialog title="修改用户" :visible.sync="dialogFormVisibleEdit">
      <el-form :model="editUserForm" :rules="rules">
        <el-form-item label="企业名称" label-width="150px" prop="name">
          <el-input v-model="editUserForm.name" autocomplete="off"></el-input>
          
        </el-form-item>

        <el-form-item label="地址" label-width="150px" prop="adress">
          <el-input v-model="editUserForm.adress" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="法人代表" label-width="150px" prop="legalUsername">
          <el-input v-model="editUserForm.legalUsername" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" label-width="150px" prop="phone">
          <el-input v-model="editUserForm.phone" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="营业执照编号" label-width="150px" prop="businessLicenseNo">
          <el-input v-model="editUserForm.businessLicenseNo" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="发证机关" label-width="150px" prop="certificationCompany">
          <el-input v-model="editUserForm.certificationCompany" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="发证日期" label-width="150px" prop="certificationDate">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="editUserForm.certificationDate"
            style="width: 100%;"
          ></el-date-picker>
         
        </el-form-item>
        <el-form-item label="危运证编号" label-width="150px" prop="dangerousCarNo">
          <el-input v-model="editUserForm.dangerousCarNo" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="下次年审时间" label-width="150px" prop="nextTrialTime">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="editUserForm.nextTrialTime"
            style="width: 100%;"
          ></el-date-picker>
        
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
        <el-button type="primary" @click="EditUser()">确 定</el-button>
      </div>
    </el-dialog> -->
  </el-card>
</template>
<script>
export default {
  name: "lapsed",
  data() {
    return {
      name: "",
      userlist: [],
      //分页相关数据
      total: -1,
      currPage: 1,
      page: 1,
      pageSize: 4,
      // 添加对话框的属性
    //   dialogFormVisibleAdd: false,
    //   dialogFormVisibleEdit: false,
      // dialogFormVisibleRoleshow: false,
      //添加用户的表单的数据
    //   form: {
    //     name: "",
    //     adress: "",
    //     legalUsername: "",
    //     phone: "",
    //     businessLicenseNo: "",
    //     certificationCompany: "",
    //     certificationDate: "",
    //     dangerousCarNo: "",
    //     nextTrialTime: ""
    //   },
    //   rules: {
    //     name: [
    //       { required: true, message: "企业名称不能为空", trigger: "blur" }
    //     ],
    //     adress: [{ required: true, message: "地址不能为空", trigger: "blur" }],
    //     legalUsername: [
    //       { required: true, message: "法人代表姓名不能为空", trigger: "blur" }
    //     ],
    //     phone: [
    //       { required: true, message: "联系电话不能为空", trigger: "blur" },
    //       { min: 11, max: 11, message: "请输入11位手机号码", trigger: "blur" },
    //       {
    //         pattern: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
    //         message: "请输入正确的手机号码"
    //       }
    //     ],
    //     businessLicenseNo: [
    //       { required: true, message: "营业执照编号不能为空", trigger: "blur" }
    //     ],

    //     certificationCompany: [
    //       { required: true, message: "发证机关不能为空", trigger: "blur" }
    //     ],
    //     certificationDate: [
    //       {
    //         type: "date",
    //         required: true,
    //         message: "请选择时间",
    //         trigger: "blur"
    //       }
    //     ],
    //     dangerousCarNo: [
    //       { required: true, message: "请输入危机证编号", trigger: "blur" }
    //     ],
    //     nextTrialTime: [
    //       {
    //         type: "date",
    //         required: true,
    //         message: "请选择时间",
    //         trigger: "blur"
    //       }
    //     ]
    //   },
    //   // 编辑
    //   editUserForm: {
    //     name: "",
    //     adress: "",
    //     legalUsername: "",
    //     phone: "",
    //     businessLicenseNo: "",
    //     certificationCompany: "",
    //     certificationDate: "",
    //     dangerousCarNo: "",
    //     nextTrialTime: ""
    //   },
      // 分配角色,
    //   currRoleId: -1,
      //   分配当前用户id
      // currusrId: -1,
    //   roles: [],
    //   currUsername: ""
      //   保存所有角色数据
    };
  },
  created() {
    this.getUserlist();
  },
  methods: {
    // 修改
    // 修改用户发送请求
    // async EditUser() {
    //   //   users/:id
    //   this.dialogFormVisibleEdit = false;
    //   const res = await this.$http.post(
    //     `/api/public/transportation/enterpriseInformation/update`,
    //     this.editUserForm
    //   );
    //   // console.log(res);
    //   if (res.data.code === 0) {
    //     // 回到第一页展示
    //     //this.pagenum = 1;
    //     // 重新请求数据
    //     // this.getUserlist();
    //     // 提示
    //     this.$message({
    //       type: "success",
    //       message: res.data.msg
    //     });
    //     // this.currPage = 1;
    //   }
    //   //  const { data: res } = await this.$http.get(`users/` + id)
    //   // if (res.data.meta.status !== 200) {
    //   //   return this.$message.error("查询用户信息失败！");
    //   // }
    //   this.getUserlist();
    // },

    // 编辑对话框打开
    // showEdituser(user) {
    //   // 2.添加对话框
    //   this.dialogFormVisibleEdit = true;
    //   this.editUserForm = user;
    //   //user其实就是scope.row也就是userlist
    // },

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
          const res = await this.$http.delete(
            `http://192.168.0.8:8081/public/transportation/enterpriseInformation/remove/${userId}`
          );
          // console.log(res);
          // this.getUserlist();
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
    // async AddUser() {
    //   // 2.关闭对话框
    //   this.dialogFormVisibleAdd = false;
    //   const res = await this.$http.post(
    //     `/api/public/transportation/enterpriseInformation/save`,
    //     this.form
    //   );
    //   console.log(res);
    //   console.log(this.form);

    //   if (res.data.code === 0) {
    //     //    1.提示成功
    //     this.$message.success(res.data.msg);
    //     this.currPage = 1;
    //     // 3.更新视图
    //     this.getUserlist();
    //     // 4.清空文本框
    //     // 直接清空文本框
    //     // this.form={}
    //     // 遍历清空
    //     // for (const key in this.form) {
    //     //   if (this.form.hasOwnProperty(key)) {
    //     //     this.form[key] = "";
    //     //   }
    //     // }
    //   } else {
    //     this.$message.warning(res.data.msg);
    //   }
    // },
    // 添加用户显示对话框
    // showAddUserDia() {
    //   // 先点编辑 再点添加 打开表单清空表单
    //   this.form = {};
    //   this.dialogFormVisibleAdd = true;
    // },
    //清空搜索框搜索数据 点击清楚按钮清除数据重新发送请求
    loadUserList() {
      this.getUserlist();
    },
    // 搜索用户 给搜索框绑定query v-model="query"
    // async searchUser() {
    //   const res = await this.$http.get(
    //     `/api/public/transportation/enterpriseInformation/pageList?pageSize=${this.pageSize}&currPage=${this.page}&name=${this.name}`
    //   );
    //   this.userlist = res.data.data.list;
    //   this.total = res.data.data.totalCount;
    //   //  console.log(this.userlist);
    //   this.currPage = 1;
    // },

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
      // const res = await this.$http.get(
      //   `/api/public/transportation/enterpriseInformation/pageList?pageSize=${this.pageSize}&currPage=${this.currPage}&name=${this.name}`
      // );
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