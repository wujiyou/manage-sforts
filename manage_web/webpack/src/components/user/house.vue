<template>
  <div>
    <div style="background:white;width:99.1%;padding-left:15px">
      <my-bread level1="单位登记" level2="人员登记" level3="系统用户"></my-bread>
      <!--搜索  -->
    </div>
    <el-card class="box-card" style="margin:20px 20px 0 20px;">
      <el-row>
        <el-col :span="24">
          <h5 style="border-bottom:1px solid #ece8e8;padding-bottom:15px;padding-left:15px">查询用户</h5>
        </el-col>

        <el-col style="padding-left:15px" :span="22">
          <el-col :span="4">
            <el-select
              size="small"
              style=" width: 100%;"
              @clear="loadUserList()"
              @change="searchUser()"
              clearable
              v-model="unitId"
              placeholder="请选择单位名称"
            >
              <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
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
            >
              <el-option
                v-for="item in shengfen"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-col>

          <el-col style="margin-left:30px" :span="4">
            <el-select
              size="small"
              style=" width: 100%;"
              @clear="loadUserList()"
              clearable
              v-model="cityId"
              @change="function1(cityId)"
              placeholder="请选择城市"
            >
              <el-option v-for="item in level" :key="item.code" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-col>

          <el-col style="margin-left:30px" :span="4">
            <el-select
              size="small"
              style=" width: 100%;"
              @clear="loadUserList()"
              clearable
              v-model="areaId"
              placeholder="请选择区域"
            >
              <el-option v-for="item in levels" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-col>

          <!-- <el-button size="small"  @click="showAddUserDia()" > <i style="padding-right:10px" class="el-icon-plus"></i>新增</el-button> -->
        </el-col>

        <el-button type="success" size="small" @click="showAddUserDia()">
          <i style="padding-right:10px" class="el-icon-plus"></i>新增
        </el-button>
      </el-row>

      <!-- 表格 -->
      <template>
        <el-tabs style="margin-top:15px;" type="card">
          <el-table
            border
            :data="userlist"
            style="width: 100%;margin-top:-1px;padding-bottom:40px"
            :row-style="{height:'40px'}"
            :cell-style="{padding:'0px'}"
          >
            <el-table-column type="index" label="序号" width="50"></el-table-column>
            <el-table-column show-overflow-tooltip prop="username" label="用户名"></el-table-column>
            <el-table-column show-overflow-tooltip prop="unitName" label="单位名称"></el-table-column>
            <el-table-column prop="phone" label="联系电话"></el-table-column>
            <el-table-column show-overflow-tooltip prop="code" label="工作证编号"></el-table-column>
            <el-table-column show-overflow-tooltip prop="nickname" label="真实姓名"></el-table-column>
            <el-table-column show-overflow-tooltip prop="note" label="备注"></el-table-column>
            <!-- <el-table-column label="是否禁用">
                <template slot-scope="scope">
                 

                  <el-switch
                    @change="changeMgStatus(scope.row)"
                    v-model="scope.row.isDisable"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                  ></el-switch>
                </template>
            </el-table-column>-->
          </el-table>
        </el-tabs>
      </template>
      <el-pagination
        style="border:1px solid #ebeef5;padding:5px 15px;display:flex; justify-content: flex-end;"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[10,15,20,25,30]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>

      <!-- 对话框 -->
      <!-- 添加对话框 -->
      <el-dialog
        title="添加用户"
        v-dialogDrag
        ref="dialog__wrapper"
        :close-on-click-modal="false"
        :visible.sync="dialogFormVisibleAdd"
      >
        <el-form :model="form" :rules="rules" ref="form">
          <el-col :span="24">
            <el-col :span="10">
              <el-form-item label="用户名" label-width="100px" prop="username">
                <el-input v-model="form.username" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="10">
              <el-form-item label="单位名称" label-width="100px" prop="unitId">
                <el-select
                  size="small"
                  style=" width: 100%;"
                  @clear="loadUserList()"
                  @change="searchUser()"
                  clearable
                  v-model="form.unitId"
                  placeholder="请选择单位名称"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
                <!-- <el-input v-model="form.unitName" autocomplete="off"></el-input> -->
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="10">
              <el-form-item label="身份证" label-width="100px" prop="idCard">
                <el-input v-model="form.idCard" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="10">
              <el-form-item label="联系电话" label-width="100px" prop="phone">
                <el-input v-model="form.phone" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="10">
              <el-form-item label="工作证编号" label-width="100px" prop="code">
                <el-input v-model="form.code" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="10">
              <el-form-item label="真实姓名" label-width="100px" prop="nickname">
                <el-input v-model="form.nickname" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="10">
              <el-form-item label="备注" label-width="100px" prop="note">
                <el-input v-model="form.note" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="10"></el-col>
          </el-col>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
          <el-button type="primary" @click="AddUser()">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
export default {
  name: "usernames",
  data() {
    return {
      duixiang: {
        id: ""
      },
      uid: "",
      cid: "",
      aid: "",
      rolelist: [],

      mo: true,
      options: [],
      unitId: "",
      checkEquipArr: [],
      Id: "",
      id: "",
      provinceId: "",
      shengfen: [],
      level: [],
      levels: [],
      cityId: "",
      areaId: "",
      userlist: [], //未禁用
      isDisable: 0,
      //分页相关数据
      total: -1,
      rows: 10,
      page: 1,

      // page=${this.page}&rows=${this.rows}
      // 添加对话框的属性
      dialogFormVisibleAdd: false,

      // dialogFormVisibleRoleshow: false,
      //添加用户的表单的数据
      form: {
        username: "",
        unitId: "",
        idCard: "",
        phone: "",
        code: "",
        nickname: "",
        note: ""
      },
      rules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" }
        ],
        unitId: [
          { required: true, message: "单位名称不能为空", trigger: "blur" }
        ],
        idCard: [
          { required: true, message: "身份证号不能为空", trigger: "blur" },
          {
            pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
            message: "证件号码格式有误！"
          }
        ],
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: "手机号格式不对"
          }
        ],
        code: [
          { required: true, message: "工作证编号不能为空", trigger: "blur" }
        ],
        nickname: [
          { required: true, message: "真实姓名不能为空", trigger: "blur" }
        ],
        note: [{ required: true, message: "备注不能为空", trigger: "blur" }]
      }
    };
  },
  watch: {
    dialogFormVisibleAdd: function(val, oldVla) {
      this.$refs["form"].resetFields();
    }
  },

  methods: {
    // handleCheckedCitiesChange() {},
    async showRole(roleID) {
      this.ROleid = roleID;
      this.dialogFormVisibleRole = true;
      const res = await this.$http.get(`/role/findPage?page=0&rows=25`);
      console.log(res);
      this.rolelist = res.data.data.list;
    },

    //选择单位名称搜索
    async function3(val) {
      const res = await this.$http.get(`/unit/findAll`);
      console.log(res);
    },

    // 省级区域显示
    async provinceMessage() {
      const res = await this.$http.get(`/chinese/province`);
      console.log(res);
      this.shengfen = res.data.data;
      this.getUserlist();
      // const res = await this.$http.get(`/user/province`);
      // console.log(res);
      //
      //
      // this.form.sheng=this.Id
      // this.shengfen.forEach(e => {
      //   this.uid = e.id;
      // });
      // console.log(this.uid);
    },
    //  市级
    async function2(val) {
      this.id = val;
      console.log(this.id);

      const res = await this.$http.get(`/chinese/city/${this.id}`);
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
      // this.level.map((s, index) => {
      //   if (s.name === val) {
      //     this.Id = this.level[index].id;
      //     console.log(this.Id);
      //   }
      // });
    },
    // 编辑用户
    // 编辑用户发送请求
    async EditUser() {
      if (this.editUserForms.isDisable == true) {
        this.editUserForms.isDisable = 0;
      } else {
        this.editUserForms.isDisable = 1;
      }
      //  console.log(this.editUserForms);
      //   users/:id
      this.dialogFormVisibleEdit = false;
      const res = await this.$http.put(`/user`, this.editUserForms);

      console.log(res);
      if (res.data.code == 0) {
        this.$message({
          type: "success",
          message: res.data.msg
        });
      }
      this.getUserlist();
    },

    //添加用户发送请求
    async AddUser() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          const res = await this.$http.post(`/user`, this.form);
          console.log(res);
          // console.log(this.form);

          if (res.data.code == 0) {
            this.$message.success(res.data.msg);
            this.getUserlist();
            this.dialogFormVisibleAdd = false;
          } else if (res.data.code == 1) {
            this.$message.warning(res.data.msg);
            this.getUserlist();
          }
        } else {
          this.$message({
            type: "error",
            message: "请填写内容再试"
          });
          this.dialogFormVisibleAdd = true;
        }
      });
      // 2.关闭对话框
    },
    // 查询单位名称
    async selectedDia() {
      const res = await this.$http.get(`/unit-record/findAll`);
      console.log(res);
      this.options = res.data.data;
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
    // 搜索
    async searchUser() {
      this.getUserlist();
    },
    //分页功能
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      // 1.每页显示条数的改变
      this.rows = val;
      // 回到第一页
      this.page = 1;
      // 希望当页条数改变时 从第一页开始显示 this.pagenum = 1 -》currPage=1?
      this.getUserlist();
    },
    handleCurrentChange(val) {
      //页码改变时
      console.log(`当前页: ${val}`);
      this.page = val;
      this.getUserlist();
    },

    async getUserlist(val = 0) {
      const res = await this.$http.get(
        `/user/findPage?page=${this.page}&rows=${this.rows}&unitId=${this.unitId}&provinceId=${this.provinceId}&cityId=${this.cityId}&areaId=${this.areaId}&isDisable=${this.isDisable}` //多个了参数
      );
      console.log(res);
      this.userlist = res.data.data.list;
      this.total = res.data.data.totalCount;
    }
  },
  created() {
    this.getUserlist();
    this.selectedDia();
    this.provinceMessage();
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
<style>
.el-table th,
.el-table td {
  text-align: center !important;
}
</style>

