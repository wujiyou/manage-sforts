<template>
  <div>
    <div style="background:white;width:99.1%;padding-left:15px">
      <my-bread level1="综合查询" level2="液化气瓶" level3="客户档案管理"></my-bread>
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
              placeholder="请输入客户姓名"
              v-model="name"
            ></el-input>
          </el-col>

          <el-col style="margin-left:30px" :span="4">
            <el-select
              size="small"
              style=" width: 100%;"
              @clear="loadUserList()"
              clearable
              v-model="provinceId"
              @change="function2(provinceId)"
              placeholder="请选择省份"
              :disabled="showCmd"
            >
              <el-option
                v-for="item in shengfen"
                :key="item.id"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-col>

          <el-col style="margin-left:30px" :span="4">
            <el-select
              size="small"
              :disabled="showCmd_1"
              style=" width: 100%;"
              @clear="loadUserList()"
              clearable
              v-model="cityId"
              @change="function1(cityId)"
              placeholder="请选择城市"
            >
              <el-option v-for="item in level" :key="item.id" :label="item.name" :value="item.code"></el-option>
            </el-select>
          </el-col>

          <el-col style="margin-left:30px" :span="4">
            <el-select
              :disabled="showCmds"
              size="small"
              style=" width: 100%;"
              @clear="loadUserList()"
              clearable
              v-model="areaId"
              placeholder="请选择区域"
            >
              <el-option
                v-for="item in levels"
                :key="item.id"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-col>

          <el-col style="padding-left:15px" :span="4">
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
        <el-col hidden :span="2">
          <el-button @click="showAddUserDia()" size="small">
            <i style="padding-right:10px" class="el-icon-plus"></i>新增
          </el-button>
        </el-col>

        <el-col :span="2">
          <el-button
            size="small"
            style="font-size:13px"
            plain
            icon="el-icon-delete"
            @click="showDeleUserMsgBox"
            type="danger"
          >删除</el-button>
        </el-col>
      </el-col>
      <!-- 表格 -->
      <template>
        <el-table
          :row-style="{height:'40px'}"
          :cell-style="{padding:'0px'}"
          border
          :data="userlist"
          style="width: 100%;margin:20px 0px;padding-bottom:40px"
          @selection-change="handleCurrentChanges"
        >
          <el-table-column type="selection" width="50"></el-table-column>
          <el-table-column type="index" label="序号" width="50" show-overflow-tooltip>
            <template slot-scope="socpe">
              <p style="cursor:pointer;" @click="showEdituser(socpe.row)">{{socpe.$index+1}}</p>
            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip prop="name" label="客户姓名"></el-table-column>
          <el-table-column show-overflow-tooltip prop="username" label="客户账号"></el-table-column>
          <!-- <el-table-column show-overflow-tooltip prop="region" label="所在区域"></el-table-column> -->
          <el-table-column show-overflow-tooltip prop="address" label="详细地址"></el-table-column>
          <el-table-column show-overflow-tooltip prop="telephone" label="联系电话"></el-table-column>
          <!-- <el-table-column show-overflow-tooltip prop="comment" label="需求"></el-table-column> -->
          <el-table-column show-overflow-tooltip prop="note" label="备注"></el-table-column>
          <el-table-column show-overflow-tooltip label="创建日期">
            <template slot-scope="socpe">{{socpe.row.createdTime | fmtdate}}</template>
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
                  @click="showDeleUserMsgBox(scope.row.id)"
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

      <!-- 对话框 -->
      <!-- 添加对话框 -->
      <!-- <el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdd">
      <el-form :model="form" :rules="rules">
        <el-form-item label="客户姓名" label-width="100px" prop="name">
          <el-input v-model="form.employeeName" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="所在区域" label-width="100px" prop="region">
          <el-input v-model="form.region" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="详细地址" label-width="100px" prop="address">
          <el-input v-model="form.address" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="电话" label-width="100px" prop="phone">
          <el-input v-model="form.telephone" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="需求" label-width="100px" prop="comment">
          <el-input v-model="form.comment" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="创建日期" label-width="100px" prop="createTime">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.createTime"
            style="width: 100%;"
          ></el-date-picker>
        
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click="AddUser()">确 定</el-button>
      </div>
      </el-dialog>-->

      <!-- 修改信息对话框 -->
      <el-dialog
        title="修改信息"
        v-dialogDrag
        :close-on-click-modal="false"
        :visible.sync="dialogFormVisibleEdit"
      >
        <el-form :model="editUserForm" :rules="rules">
          <el-form-item label="客户姓名" label-width="100px" prop="name">
            <el-input v-model="editUserForm.name" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="客户账号" label-width="100px" prop="username">
            <el-input disabled v-model="editUserForm.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="详细地址" label-width="100px" prop="address">
            <el-input v-model="editUserForm.address" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="联系电话" label-width="100px" prop="phone">
            <el-input v-model="editUserForm.telephone" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="备注" label-width="100px" prop="note">
            <el-input v-model="editUserForm.note" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="创建日期" label-width="100px" prop="createTime">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="editUserForm.createdTime"
              style="width: 100%;"
            ></el-date-picker>
            <!-- <el-input v-model="editUserForm.createTime" autocomplete="off"></el-input> -->
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
  name: "portfolio",
  data() {
    return {
      name: "",
      showCmd: true,
      showCmd_1: true,
      showCmds: true,
      cityId: "", //城市
      level: [], //市级数组
      areaId: "", //区域
      levels: [], //区域数组
      provinceId: "", //省份
      shengfen: [], //省份数组
      Id: "", //区域code
      id: "", //市级code

      userlist: [],
      options: [],
      level: [],
      levels: [],
      //分页相关数据
      total: -1,
      currPage: 1,
      pageSize: 10,
      page: 1,
      // 添加对话框的属性
      // dialogFormVisibleAdd: false,
      dialogFormVisibleEdit: false,

      rules: {
        name: [
          { required: true, message: "客户姓名不能为空", trigger: "blur" }
        ],
        region: [{ required: true, message: "区域不能为空", trigger: "blur" }],
        address: [
          { required: true, message: "详细地址不能为空", trigger: "blur" }
        ],
        telephone: [
          { required: true, message: "电话不能为空", trigger: "blur" }
        ],
        comment: [{ required: true, message: "请输入需求", trigger: "blur" }],
        createTime: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "blur"
          }
        ]
      },
      //  <!--
      //         name 客户姓名
      //         username 客户账号
      //         address  详细地址
      //         telephone 联系电话
      //         note       备注
      //        -->
      // 编辑
      editUserForm: {
        name: "", //客户姓名
        username: "", //客户账号
        address: "", //详细地址
        telephone: "", //联系电话
        note: "", //备注
        createdTime: "" //创建时间
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
      if(this.delarr==""){
          this.$message({
          type: "error",
          message: "请选择需要删除的数据"
        });
      }else{
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
          const res = await this.$http.post(`/pc-customer`, this.delarr);
          console.log(res);
          this.getUserlist();
          // 提示
          this.delarr = [];
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

    async changeMgStatus(val) {
      console.log(val);

      if (val.isDisable == 1) {
        const res = await this.$http.put(`/user/${val.id}/enabled`);
        console.log(res);
        this.$message({
          type: "success",
          message: "取消禁用成功"
        });
        this.getUserlist();
        console.log(res);
      } else {
        const res = await this.$http.put(`/user/${val.id}/disable`);
        this.$message({
          type: "success",
          message: "禁用成功"
        });
        this.getUserlist();
        console.log(res);
      }
    },
    // 省级区域显示
    async provinceMessage() {
      // /chinese/province
      // /chinese/address
      const res = await this.$http.get(`/chinese/address`);
      console.log(res);

      if (res.data.data.type == 2) {
        this.provinceId = res.data.data.province;
        this.cityId = res.data.data.city;
        this.levels = res.data.data.area;
        this.showCmd = true;
        this.showCmds = false;
        this.showCmd_1 = true;
      } else if (res.data.data.type == 1) {
        this.provinceId = res.data.data.province;
        this.cityId = res.data.data.city;
        this.areaId = res.data.data.area;
       this.showCmd = true;
        this.showCmds = true;
        this.showCmd_1 = true;
      } else if(res.data.data.type==0) {
        this.shengfen = res.data.data.provinces;
        this.showCmd = false;
        this.showCmds = false;
        this.showCmd_1 = false;
      }else if(res.data.data.type==3){
        this.provinceId = res.data.data.province;
        this.level = res.data.data.city;
       this.showCmds = false; //区按钮
        this.showCmd = true; //省按钮
        this.showCmd_1 = false; //市按钮
      }
    },
    //  市级
    async function2(val) {
      this.code = val;
      console.log(this.code);

      const res = await this.$http.get(`/chinese/city/${this.code}`);
      console.log(res);
      this.level = res.data.data;
      // console.log(val);
      // if (val == "") {
      //   this.getUserlist();
      // } else {
      //   this.id = val;
      //   const res = await this.$http.get(`/user/city/${this.id}`);
      //   console.log(res);
      //
      // }
      this.getUserlist();
    },
    // 区域
    async function1(val) {
      this.Id = val;
      const res = await this.$http.get(`/chinese/area/${this.Id}`);
      console.log(res);
      this.levels = res.data.data;
      // if (val == "") {
      //   this.getUserlist();
      // } else {
      //   this.Id = val;
      //   // console.log(this.Id);
      //   const res = await this.$http.get(`/user/area/${this.Id}`);
      //   console.log(res);
      //   this.levels = res.data.data;
      //   this.levels.forEach(e => {
      //     this.aid = e.id;
      //   });
      // }
      this.getUserlist();
    },

    // 编辑用户
    // 编辑用户发送请求
    async EditUser() {
      //   users/:id
      this.dialogFormVisibleEdit = false;
      const res = await this.$http.put(`/pc-customer`, this.editUserForm);
      //  const { data: res } = await this.$http.get(`users/` + id)
      // if (res.data.meta.status !== 200) {
      //   return this.$message.error("查询用户信息失败！");
      // }
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

    //清空搜索框搜索数据 点击清楚按钮清除数据重新发送请求
    loadUserList() {
      this.getUserlist();
    },
    // 搜索用户 给搜索框绑定query v-model="query"
    async searchUser() {
      const res = await this.$http.get(
        `/pc-customer/findPage?rows=${this.pageSize}&page=${this.currPage}&name=${this.name}`
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
      // ${this.query}
      const res = await this.$http.get(
        `/pc-customer/findPage?rows=${this.pageSize}&page=${this.currPage}&name=${this.name}`
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
    this.provinceMessage();
  }
};
</script>
<style scoped>
.arrow_right {
  padding: 10px 0px;
  /* margin-bottom: 10px; */
}
/* .pp{
   justify-content: flex-end;
} */
/* .input-serach {
  width: 400px;
} */
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
</style>