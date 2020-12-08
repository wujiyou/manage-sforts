<template>
  <el-card class="box-card">
    
    <my-bread level1="数据平台" level2="液化气瓶" level3="出入站统计气瓶"></my-bread>
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
          <el-select
            clearable
            @clear="loadUserList()"
            style=" width: 130px;"
            v-model="vestingCode"
            slot="prepend"
            placeholder="所属单位"
          >
            <el-option
              v-for="item in select"
              :key="item.vestingCode"
              :label="item.vestingUnit"
              :value="item.vestingCode"
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
          <el-select
            clearable
            style=" width: 130px;"
            v-model="useStatus"
            slot="prepend"
            placeholder="出入站查询"
          >
            <el-option
              v-for="item in selected"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
         
        </el-input>
         <el-button @click="searchUser()"  class="el_button" icon="el-icon-search">搜索</el-button>
      </el-col>
      <el-col :span="3">
        &nbsp;
        <!-- <el-button @click="showAddUserDia()" type="primary">
          <i style="padding-right:10px" class="el-icon-plus"></i>新增
        </el-button>-->
      </el-col>
    </el-row>
    <!-- 表格 -->
    <template>
      <el-table border stripe :header-cell-style="{background:'#f6f6f6',color:'#606266'}" height="474px" :data="userlist" style="width: 100%;margin:20px 5px">
        <el-table-column prop="regId" label="档案号" width="180"></el-table-column>
        <el-table-column prop="vestingUnit" label="所属单位" width="120"></el-table-column>
        <el-table-column prop="gasId" label="气瓶号"></el-table-column>
        <el-table-column prop="appId" label="标签号"></el-table-column>
        <el-table-column label="生产日期">
          
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
        <el-table-column prop="operatePerson" label="入站人员"></el-table-column>
        <!-- <el-table-column label="入库时间">
          <template slot-scope="socpe">{{socpe.row.fillingData | fmtdate}}</template>
        </el-table-column> -->

        <!-- 表格操作 -->
        <!-- <el-table-column prop="address" width="100" label="操作">
          <template slot-scope="scope">
           
            <el-tooltip
              class="item"
              effect="dark"
              content="修改角色"
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
        </el-table-column> -->
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
    <!-- <el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdd">
      <el-form :model="form" :rules="rules">
        <el-form-item label="档案号" label-width="100px" prop="regId">
          <el-input v-model="form.regId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="气瓶号" label-width="100px" prop="regId">
          <el-input v-model="form.gasId" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="标签号" label-width="100px" prop="regId">
          <el-input v-model="form.appId" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="所属单位" label-width="100px" prop="vestingUnit">
          <el-select v-model="form.vestingUnit" filterable placeholder="请选择所属单位·">
            <el-option
              v-for="item in select"
              :key="item.id"
              :label="item.label"
              :value="item.label"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="生产日期" label-width="100px" prop="regId">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.makeData"
            style="width: 100%;"
          ></el-date-picker>
        
        </el-form-item>

        <el-form-item label="检验日期" label-width="100px" prop="checkData">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.checkData"
            style="width: 100%;"
          ></el-date-picker>
         
        </el-form-item>
        <el-form-item label="下检日期" label-width="100px" prop="nextCheckData">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.nextCheckData"
            style="width: 100%;"
          ></el-date-picker>
         
        </el-form-item>

        <el-form-item label="检验状态" label-width="100px" prop="useStatus">
          <el-select v-model="form.useStatus" filterable placeholder="请选择活动区域">
            <el-option
              v-for="item in selected"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
         
        </el-form-item>

        <el-form-item label="入栈人员" label-width="100px" prop="operatePerson">
          <el-input v-model="form.operatePerson" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="入库时间" label-width="100px" prop="fillingData">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.fillingData"
            style="width: 100%;"
          ></el-date-picker>
          
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click="AddUser()">确 定</el-button>
      </div>
    </el-dialog>-->

    <!-- 修改对话框 -->
    <!-- <el-dialog title="修改用户" :visible.sync="dialogFormVisibleEdit">
      <el-form :model="editUserForm" :rules="rules">
        <el-form-item label="档案号" label-width="100px" prop="regId">
          <el-input v-model="editUserForm.regId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="气瓶号" label-width="100px" prop="regId">
          <el-input v-model="editUserForm.gasId" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="标签号" label-width="100px" prop="regId">
          <el-input v-model="editUserForm.appId" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="所属单位" label-width="100px" prop="vestingUnit">
          <el-select v-model="editUserForm.departmentId" filterable placeholder="请选择所属单位·">
            <el-option
              v-for="item in select"
              :key="item.id"
              :label="item.label"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="生产日期" label-width="100px" prop="regId">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="editUserForm.makeData"
            style="width: 100%;"
          ></el-date-picker>
         
        </el-form-item>

        <el-form-item label="检验日期" label-width="100px" prop="checkData">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="editUserForm.checkData"
            style="width: 100%;"
          ></el-date-picker>
        
        </el-form-item>
        <el-form-item label="下检日期" label-width="100px" prop="nextCheckData">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="editUserForm.nextCheckData"
            style="width: 100%;"
          ></el-date-picker>
         
        </el-form-item>

        <el-form-item label="检验状态" label-width="100px" prop="checkStatus">
         
          <el-select v-model="editUserForm.useStatus" filterable placeholder="请选择活动区域">
            <el-option
              v-for="item in selected"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="入栈人员" label-width="100px" prop="operatePerson">
          <el-input v-model="editUserForm.operatePerson" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="入库时间" label-width="100px" prop="fillingData">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="editUserForm.fillingData"
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
  name: "tagboard",
  data() {
    return {
      regId: "",
      gasId: "",
      userlist: [],
      //分页相关数据
      total: -1,
      currPage: 1,
      page: 1,
      pageSize: 4,
      vestingCode: "",
      useStatus: "",
      // 添加对话框的属性
      // dialogFormVisibleAdd: false,
      dialogFormVisibleEdit: false,
      // dialogFormVisibleRoleshow: false,
      //添加用户的表单的数据

      // form: {
      //   regId: "",
      //   gasId: "",
      //   appId: "",
      //   makeData: "",
      //   checkData: "",
      //   nextCheckData: "",
      //   checkStatus: "",
      //   operatePerson: "",
      //   fillingData: "",
      //   vestingUnit: ""
      // },
      select:[],
      // select: [
      //   {
      //     id: 1,
      //     label: "湖南长颈鹿1"
      //   },
      //   {
      //     id: 2,
      //     label: "湖南长颈鹿2"
      //   },
      //   {
      //     id: 3,
      //     label: "湖南长颈鹿3"
      //   },
      //   {
      //     id: 4,
      //     label: "湖南长颈鹿4"
      //   },
      //   {
      //     id: 5,
      //     label: "湖南长颈鹿5"
      //   },
      //   {
      //     id: 6,
      //     label: "湖南长颈鹿6"
      //   },
      //   {
      //     id: 7,
      //     label: "湖南长颈鹿7"
      //   },
      //   {
      //     id: 8,
      //     label: "湖南长颈鹿8"
      //   },
      //   {
      //     id: 9,
      //     label: "湖南长颈鹿9"
      //   },
      //   {
      //     id: 10,
      //     label: "湖南长颈鹿10"
      //   }
      // ],

      selected: [
        {
          value: 0,
          label: "入站中"
        },
        {
          value: 1,
          label: "配送中"
        },
        {
          value: 2,
          label: "出站中"
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
          { required: true, message: "入栈人员不能为空", trigger: "blur" }
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
      editUserForm: {
        regId: "",
        gasId: "",
        appId: "",
        makeData: "",
        checkData: "",
        nextCheckData: "",
        checkStatus: "",
        operatePerson: "",
        fillingData: "",
        departmentId: ""
      }

      //   保存所有角色数据
    };
  },

  methods: {
     // 所属单位查询
   async suosudan(){
      const res = await this.$http.get(
        `/public/gas/manageGasBasicCylinder/affiliated/company`
      );
      console.log(res);
      this.select=res.data.data
        //  /public/gas/manageGasBasicCylinder/affiliated/company
    },
    ifendcase(val) {
      if (val.useStatus == "0") {
        return "入站中";
      } else if (val.useStatus == "1") {
        return "配送中";
      } else if (val.useStatus == "2") {
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

    // 编辑用户发送请求
    // async EditUser() {
    //   //   users/:id
    //   this.dialogFormVisibleEdit = false;
    //   const res = await this.$http.post(
    //     `/tang/public/gas/manageGasBasicCylinder/login/update`,
    //     this.editUserForm
    //   );

    //   console.log(res);
    //   if (res.data.code === 0) {
    //     // 回到第一页展示
    //     //this.pagenum = 1;
    //     // 重新请求数据
    //     this.getUserlist();
    //     // 提示
    //     this.$message({
    //       type: "success",
    //       message: res.data.msg
    //     });
    //   } else {
    //     this.$message({
    //       type: "success",
    //       message: "修改失败"
    //     });
    //   }
    // },

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
          // pageSize=${this.pageSize}
          const res = await this.$http.post(
            `/public/gas/manageGasBasicCylinder/login/logindel/${userId}`
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

    // //   添加用户发送请求
    // async AddUser() {
    //   // 2.关闭对话框
    //   this.dialogFormVisibleAdd = false;
    //   const res = await this.$http.post(
    //     `/tang/public/gas/manageGasBasicCylinder/save`,
    //     this.form
    //   );
    //   console.log(res);
    //   if (res.data.code === 0) {
    //     // 回到第一页展示
    //     //this.pagenum = 1;
    //     // 重新请求数据
    //     this.getUserlist();
    //     // 提示
    //     this.$message({
    //       type: "success",
    //       message: res.data.msg
    //     });
    //   } else {
    //     this.$message({
    //       type: "success",
    //       message: "修改失败"
    //     });
    //   }
    // },
    // // 添加用户显示对话框
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
    async searchUser() {
      const res = await this.$http.get(
        `/public/gas/manageGasBasicCylinder/list?useStatus=${this.useStatus}&gasId=${this.gasId}&vestingCode=${this.vestingCode}&regId=${this.regId}&pageSize=${this.pageSize}&currPage=${this.page}`
      );
      console.log(res);
      this.userlist = res.data.data.list;
      this.total = res.data.data.totalCount;
      this.currPage = 1;
      // this.getUserlist();
      // console.log("aaaaaa");
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
      // ${this.pageNum}/${this.pageSize}
      const res = await this.$http.get(
        // vestingCode=8&regId=无极有&gasId=2321321&useStatus=1&pageSize=2&currPage=1
        // `/tang/public/gas/manageGasBasicCylinder/list?pageSize=${this.pageSize}&currPage=${this.currPage}`
        `/public/gas/manageGasBasicCylinder/list?pageSize=${this.pageSize}&currPage=${this.currPage}&regId=${this.regId}&gasId=${this.gasId}&vestingCode=${this.vestingCode}&useStatus=${this.useStatus}`
      );
      console.log(res);
      this.userlist = res.data.data.list;
      this.total = res.data.data.totalCount;
    }
  },
  created() {
    this.getUserlist();
    this.suosudan();
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