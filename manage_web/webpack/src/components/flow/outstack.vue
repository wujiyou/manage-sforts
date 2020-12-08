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
    <my-bread level1="数据平台" level2="液化气瓶" level3="出栈气瓶统计"></my-bread>
    <!--搜索  -->
    <el-row>
      <el-col :span="21">
        <el-input
          @clear="loadUserList()"
          clearable
          class="input-serach"
          placeholder="请输入档案号"
          v-model="regId"
        >
          <el-select style=" width: 130px;" v-model="vestingUnit" slot="prepend" placeholder="所属单位">
            <el-option
              v-for="item in select"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-input>
        <el-input
          @clear="loadUserList()"
          clearable
          class="input-serach"
          placeholder="请输入气瓶号"
          v-model="gasId"
        >
          
        </el-input>
        <el-button @click="searchUser()"  class="el_button" icon="el-icon-search">搜索</el-button>
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
        <el-table-column type="index" label="序号" width="70"></el-table-column>
        <el-table-column prop="regId" label="档案号" width="120"></el-table-column>
        <el-table-column prop="vestingUnit" label="所属单位" width="120"></el-table-column>
        <el-table-column prop="gasId" label="气瓶号"></el-table-column>
        <el-table-column prop="appId" label="标签号"></el-table-column>
        <!-- <el-table-column prop="makeData" label="生产日期"></el-table-column> -->

        <el-table-column label="生产日期">
          <!-- main.js写了一个全局过滤器 -->
          <!-- 如果单元格内显示的内容不是字符串（文本）
          需要给被显示的内容包裹一个template-->
          <!-- template内部要用数据 设置slot-scope属性
          该属性的值是要用数据create_time的数据源userlist-->
          <!-- slot-scope的值userlist其实就是el-table绑定的数据userlist
          userlist.row >数组中的每个对象-->
          <!-- slot-scope自动去找上一级所绑定的数据 userlist-->
          <template slot-scope="socpe">{{socpe.row.makeData | fmtdate}}</template>
        </el-table-column>

        <el-table-column label="检验日期">
          <template slot-scope="socpe">{{socpe.row.checkData | fmtdate}}</template>
        </el-table-column>
        <el-table-column label="下检日期">
          <template slot-scope="socpe">{{socpe.row.nextCheckData | fmtdate}}</template>
        </el-table-column>
        <el-table-column prop="useStatus" label="检验状态" :formatter="ifendcase"></el-table-column>
        <el-table-column prop="checkStatus" label="检查状态" :formatter="ifendcases"></el-table-column>
        <el-table-column prop="operatePerson" label="出站人员"></el-table-column>
        <el-table-column label="入库时间">
          <template slot-scope="socpe">{{socpe.row.fillingData | fmtdate}}</template>
        </el-table-column>

        <!-- 表格操作 -->
        <el-table-column prop="address" width="100" label="操作">
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
      :page-sizes="[1,4,8,12,16]"
      :page-size="4"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>

    <!-- 对话框 -->
    <!-- 添加对话框 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdd">
      <el-form :model="form" :rules="rules">
        <el-form-item label="档案号" label-width="140px" prop="regId">
          <el-input v-model="form.regId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="气瓶号" label-width="140px" prop="gasId">
          <el-input v-model="form.gasId" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="标签号" label-width="140px" prop="appId">
          <el-input v-model="form.appId" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="生产日期" label-width="140px" prop="makeData">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.makeData"
            style="width: 100%;"
          ></el-date-picker>
          <!-- <el-input v-model="form.makeData" autocomplete="off"></el-input> -->
        </el-form-item>

        <el-form-item label="检验日期" label-width="140px" prop="checkData">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.checkData"
            style="width: 100%;"
          ></el-date-picker>
          <!-- <el-input v-model="form.checkData" autocomplete="off"></el-input> -->
        </el-form-item>
        <el-form-item label="下检日期" label-width="140px" prop="nextCheckData">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.nextCheckData"
            style="width: 100%;"
          ></el-date-picker>
          <!-- <el-input v-model="form.nextCheckData" autocomplete="off"></el-input> -->
        </el-form-item>

        <el-form-item label="检验状态" label-width="140px" prop="useStatus">
          <el-select v-model="form.useStatus" filterable placeholder="请选择活动区域">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <!-- <el-input v-model="form.useStatus" autocomplete="off"></el-input> -->
        </el-form-item>

        <el-form-item label="出站人员" label-width="140px" prop="operatePerson">
          <el-input v-model="form.operatePerson" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="入库时间" label-width="140px" prop="fillingData">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.fillingData"
            style="width: 100%;"
          ></el-date-picker>
          <!-- <el-input v-model="form.fillingData" autocomplete="off"></el-input> -->
          <!-- disabled实现用户名禁止改动 -->
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click="AddUser()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 修改对话框 -->
    <el-dialog title="修改用户" :visible.sync="dialogFormVisibleEdit">
      <el-form :model="editUserForm" :rules="rules">
        <el-form-item label="档案号" label-width="140px" prop="regId">
          <el-input v-model="editUserForm.regId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="气瓶号" label-width="140px" prop="gasId">
          <el-input v-model="editUserForm.gasId" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="标签号" label-width="140px" prop="appId">
          <el-input v-model="editUserForm.appId" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="生产日期" label-width="140px" prop="makeData">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="editUserForm.makeData"
            style="width: 100%;"
          ></el-date-picker>
          <!-- <el-input v-model="form.makeData" autocomplete="off"></el-input> -->
        </el-form-item>

        <el-form-item label="检验日期" label-width="140px" prop="checkData">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="editUserForm.checkData"
            style="width: 100%;"
          ></el-date-picker>
          <!-- <el-input v-model="form.checkData" autocomplete="off"></el-input> -->
        </el-form-item>
        <el-form-item label="下检日期" label-width="140px" prop="nextCheckData">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="editUserForm.nextCheckData"
            style="width: 100%;"
          ></el-date-picker>
          <!-- <el-input v-model="form.nextCheckData" autocomplete="off"></el-input> -->
        </el-form-item>

        <el-form-item label="检验状态" label-width="140px" prop="useStatus">
          <el-select disabled v-model="editUserForm.useStatus" filterable placeholder="请选择活动区域">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <!-- <el-select v-model="editUserForm.useStatus" filterable placeholder="请选择活动区域">
            <el-option label="出站中" value=1></el-option>
          </el-select>-->
          <!-- <el-input v-model="editUserForm.useStatus" autocomplete="off"></el-input> -->
        </el-form-item>

        <el-form-item label="送货完成人员" label-width="140px" prop="operatePerson">
          <el-input v-model="editUserForm.operatePerson" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="入库时间" label-width="140px" prop="fillingData">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="editUserForm.fillingData"
            style="width: 100%;"
          ></el-date-picker>
          <!-- <el-input v-model="form.fillingData" autocomplete="off"></el-input> -->
          <!-- disabled实现用户名禁止改动 -->
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
        <el-button type="primary" @click="EditUser()">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>
<script>
export default {
  name: "tagboard",
  data() {
    return {
      query: "",
      regId: "",
      gasId: "",
      vestingUnit: "",
      userlist: [],
      //分页相关数据
      total: -1,
      currPage: 1,
      pageSize: 4,
      useStatus: 1,
      // 添加对话框的属性
      dialogFormVisibleAdd: false,
      dialogFormVisibleEdit: false,
      // dialogFormVisibleRoleshow: false,
      //添加用户的表单的数据
      form: {
        regId: "",
        gasId: "",
        appId: "",
        makeData: "",
        checkData: "",
        nextCheckData: "",
        useStatus: "1",
        operatePerson: "",
        fillingData: ""
      },
      options: [
        {
          value: 1,
          label: "出站中"
        }
      ],
    select: [
        {
          value: 1,
          label: "湖南长颈鹿1"
        },{
          value: 2,
          label: "湖南长颈鹿2"
        }
      ],
      rules: {
        regId: [{ required: true, message: "档案号不能为空", trigger: "blur" }],
        gasId: [{ required: true, message: "气瓶号不能为空", trigger: "blur" }],
        appId: [{ required: true, message: "标签号不能为空", trigger: "blur" }],
        makeData: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "blur"
          }
        ],
        checkData: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "blur"
          }
        ],

        nextCheckData: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "blur"
          }
        ],
        checkStatus: [
          { required: true, message: "检验状态不能为空", trigger: "blur" }
        ],
        operatePerson: [
          { required: true, message: "送货完成人员不能为空", trigger: "blur" }
        ],
        fillingData: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "blur"
          }
        ]

        // orderClerk: [
        //   { required: true, message: "接单员不能为空", trigger: "blur" }
        // ]
      },
      // 编辑
      editUserForm: {
        regId: "",
        gasId: "",
        appId: "",
        makeData: "",
        checkData: "",
        nextCheckData: "",
        useStatus: "",
        operatePerson: "",
        fillingData: ""
      },
      // 分配角色,
      currRoleId: -1,
      //   分配当前用户id
      currusrId: -1,
      page: 1,
      roles: [],
      currUsername: ""
      //   保存所有角色数据
    };
  },

  methods: {
    ifendcase(val) {
      if (val.useStatus == "1") {
        return "出站中";
      }
    },
    ifendcases(val) {
      if (val.checkStatus == "0") {
        return "待检验";
      } else if (val.checkStatus == "1") {
        return "检验完成";
      }
    },

    // 编辑用户
    // 编辑用户发送请求
    async EditUser() {
      //   users/:id
      this.dialogFormVisibleEdit = false;
      const res = await this.$http.post(
        `http://192.168.0.8:8081/public/gas/manageGasBasicCylinder/login/update`,
        this.editUserForm
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
          type: "success",
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
            `http://192.168.0.8:8081/public/gas/manageGasBasicCylinder/login/logindel/${userId}`
          );
          console.log(res);
          if (res.data.code === 0) {
            this.getUserlist();
            // 提示
            this.$message({
              type: "success",
              message: res.data.msg
            });
          } else {
            this.$message({
              type: "success",
              message: "删除失败"
            });
          }
          // if (res.data.meta.status === 200) {
          //   // 回到第一页展示
          //   //this.pagenum = 1;
          //   // 重新请求数据
          //   this.getUserlist();
          //   // 提示
          //   this.$message({
          //     type: "success",
          //     message: res.data.meta.msg
          //   });
          // }
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
      console.log(this.form);

      // 2.关闭对话框
      this.dialogFormVisibleAdd = false;
      const res = await this.$http.post(
        `/public/gas/manageGasBasicCylinder/save`,
        this.form
      );
      console.log(res);
      this.getUserlist();
      this.$message({
        type: "success",
        message: "修改成功"
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
        `/public/gas/manageGasBasicCylinder/list?vestingCode=2&vestingUnit=${this.vestingUnit}&useStatus=${this.useStatus}&pageSize=${this.pageSize}&currPage=${this.currPage}&regId=${this.regId}&gasId=${this.gasId}`
      );
      console.log(res);
      
      this.userlist = res.data.data.list;
      this.total = res.data.data.totalCount;
      //  console.log(this.userlist);
      this.currPage = 1;
      this.$message({
        type: "success",
        message: "查询成功"
      });
      // this.getUserlist();
      // console.log("aaaaaa");
    },

    //分页功能
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      // 1.每页显示条数的改变
      this.pageSize = val;
      // 回到第一页
      // this.currPage = 1;
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
        `/public/gas/manageGasBasicCylinder/list?vestingCode=2&vestingUnit=${this.vestingUnit}&useStatus=${this.useStatus}&pageSize=${this.pageSize}&currPage=${this.currPage}&regId=${this.regId}&gasId=${this.gasId}`
      );
      console.log(res);
      console.log(res.data.data.totalCount);

      this.userlist = res.data.data.list;
      this.total = res.data.data.totalCount;
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