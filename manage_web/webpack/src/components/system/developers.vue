<template>
  <div>
    <div style="background:white;width:99.1%;padding-left:15px">
      <my-bread level1="单位登记" level2="人员管理" level3="用户管理"></my-bread>
      <!--搜索  -->
    </div>
    <el-card class="box-card" style="margin:20px 20px 0 20px;">
      <el-row>
        <el-col :span="24">
          <h5 style="border-bottom:1px solid #ece8e8;padding-bottom:15px;padding-left:15px">查询用户</h5>
        </el-col>

        <el-col style="padding-left:15px" :span="22">
          <el-col :span="24">
            <el-col :span="4">
              <el-select
                size="small"
                style=" width: 100%;"
                @clear="loadUserList()"
                @change="getUserlist()"
                v-model="sysId"
                placeholder="请选择用户"
              >
                <el-option
                  v-for="item in options"
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
                v-model="provinceCode"
                @change="function2(provinceCode)"
                @input="searchUser"
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
                @input="searchUser"
                clearable
                v-model="cityCode"
                @change="function1(cityCode)"
                placeholder="请选择城市"
              >
                <el-option
                  v-for="item in level"
                  :key="item.id"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-col>

            <el-col style="margin-left:30px" :span="4">
              <el-select
                :disabled="showCmds"
                size="small"
                style=" width: 100%;"
                @clear="loadUserList()"
                clearable
                v-model="areaCode"
                @input="searchUser"
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
          </el-col>

          <el-col style="margin-top:20px" :span="24">
            <el-col :span="4">
              <el-input
                size="small"
                style=" width: 100%;"
                @clear="loadUserList()"
                clearable
                class="input-serach"
                @input="searchUser()"
                placeholder="请输入用户名"
                v-model="username"
              ></el-input>
            </el-col>

            <!-- <el-col style="margin-left:30px" :span="4">
              <el-select
                filterable
                size="small"
                style=" width: 100%;"
                @clear="loadUserList()"
                @input="searchUser()"
                clearable
                v-model="name"
                placeholder="请选择单位名称"
              >
                <el-option
                  v-for="item in optionss"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-col>-->

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

          <!-- <el-button size="small"  @click="showAddUserDia()" > <i style="padding-right:10px" class="el-icon-plus"></i>新增</el-button> -->
        </el-col>

        <!-- <el-button type="success" size="small" @click="showAddUserDia()">
          <i style="padding-right:10px" class="el-icon-plus"></i>新增
        </el-button>-->
      </el-row>

      <!-- 表格 -->
      <template>
        <el-table
          class="system"
          border
          :data="userlist"
          style="width: 100%;margin:20px 0px;padding-bottom:40px;display:none"
          :row-style="{height:'40px'}"
          :cell-style="{padding:'0px'}"
        >
          <el-table-column type="index" label="序号" width="50" show-overflow-tooltip>
            <template slot-scope="socpe">
              <p style="cursor:pointer;" @click="showEdituser(socpe.row)">{{socpe.$index+1}}</p>
            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip prop="username" label="用户名"></el-table-column>
          <el-table-column show-overflow-tooltip prop="name" label="姓名"></el-table-column>
          <el-table-column show-overflow-tooltip prop="unitName" label="单位名称"></el-table-column>
          <el-table-column prop="phone" label="联系电话"></el-table-column>
          <el-table-column show-overflow-tooltip prop="address" label="详细地址"></el-table-column>
          <el-table-column show-overflow-tooltip prop="code" label="作业证号"></el-table-column>
          <!-- 表格操作 -->
          <el-table-column prop="address" width="150" label="操 作">
            <!-- <template slot-scope="scope">
              <el-tooltip
                class="item"
                effect="dark"
                content="重置密码"
                :enterable="false"
                placement="top"
              >
                <el-button
                  type="success"
                  size="mini"
                  title="重置密码"
                  plain
                  icon="el-icon-s-cooperation"
                  @click="showRole(scope.row.id)"
                  circle
                ></el-button>
              </el-tooltip>
            </template>-->
            <template slot-scope="scope">
              <el-tooltip
                class="item"
                effect="dark"
                content="重置密码"
                :enterable="false"
                placement="top"
              >
                <el-button
                  type="success"
                  size="mini"
                  title="重置密码"
                  plain
                  icon="el-icon-s-cooperation"
                  circle
                  @click="showRole(scope.row.id)"
                ></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </template>

      <template>
        <el-table
          class="app"
          border
          :data="userlists"
          style="width: 100%;margin:20px 0px;padding-bottom:40px;display:none"
          :row-style="{height:'40px'}"
          :cell-style="{padding:'0px'}"
        >
          <el-table-column type="index" label="序号" width="50" show-overflow-tooltip>
            <!-- <template slot-scope="socpe">
              <p style="cursor:pointer;" @click="showEdituser(socpe.row)">{{socpe.$index+1}}</p>
            </template>-->
          </el-table-column>
          <el-table-column show-overflow-tooltip prop="username" label="用户名"></el-table-column>
          <el-table-column show-overflow-tooltip prop="name" label="姓名"></el-table-column>
          <!-- <el-table-column show-overflow-tooltip prop="unitName" label="单位名称"></el-table-column> -->
          <el-table-column prop="phone" label="联系电话"></el-table-column>
          <el-table-column show-overflow-tooltip prop="renewalTime" label="换证日期">
             <template slot-scope="socpe">{{socpe.row.renewalTime | fmtdate}}</template>
          </el-table-column>
          <el-table-column show-overflow-tooltip prop="workNumber" label="作业证号"></el-table-column>

          <el-table-column prop="address" width="150" label="操 作">
            <template slot-scope="scope">
              <el-tooltip
                class="item"
                effect="dark"
                content="重置密码"
                :enterable="false"
                placement="top"
              >
                <el-button
                  type="success"
                  size="mini"
                  title="重置密码"
                  plain
                  icon="el-icon-s-cooperation"
                  @click="showRoleapp(scope.row.id)"
                  circle
                ></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
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

      <!-- 系统用户重置密码 -->
      <el-dialog
        title="重置密码"
        v-dialogDrag
        :close-on-click-modal="false"
        :visible.sync="dialogFormVisiblechongzhi"
        width="30%"
      >
        <!-- <p style="text-align: center;font-size:14px">
          重置默认密码为:
          <span style="color:red">123456</span>
        </p>-->
        <p style="text-align: center;" slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisiblechongzhi = false">取 消</el-button>
          <el-button type="primary" @click="Editchongzhi()">确 定</el-button>
        </p>
      </el-dialog>

      <!-- app用户重置密码 -->
      <el-dialog
        title="重置密码"
        v-dialogDrag
        :close-on-click-modal="false"
        :visible.sync="dialogFormVisibleapp"
        width="30%"
      >
        <p style="text-align: center;font-size:14px">
          <!-- 重置默认密码为:
          <span style="color:red">123456</span>-->
        </p>
        <p style="text-align: center;" slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibleapp = false">取 消</el-button>
          <el-button type="primary" @click="Editapp()">确 定</el-button>
        </p>
      </el-dialog>

      <!-- 对话框 -->
      <!-- 添加对话框 -->
      <el-dialog
        title="添加用户"
        v-dialogDrag
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
              <el-form-item label="负责人" label-width="100px" prop="nickname">
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
          </el-col>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
          <el-button type="primary" @click="AddUser()">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 修改对话框 -->
      <el-dialog
        title="修改用户"
        v-dialogDrag
        :close-on-click-modal="false"
        :visible.sync="dialogFormVisibleEdit"
      >
        <el-form :model="editUserForms" :rules="rules">
          <el-col :span="24">
            <el-col :span="10">
              <el-form-item label="用户名" label-width="100px" prop="username">
                <el-input v-model="editUserForms.username" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="10">
              <el-form-item label="工作证编号" label-width="100px" prop="code">
                <el-input v-model="editUserForms.code" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="10">
              <el-form-item label="单位名称" label-width="100px">
                <el-select
                  size="small"
                  style=" width: 100%;"
                  @clear="loadUserList()"
                  @change="searchUser()"
                  clearable
                  v-model="editUserForms.unitId"
                  placeholder="请选择单位名称"
                >
                  <el-option
                    v-for="item in optionss"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="10">
              <el-form-item label="联系电话" label-width="100px">
                <el-input v-model="editUserForms.phone" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="10">
              <el-form-item label="负责人" label-width="100px" prop="nickname">
                <el-input v-model="editUserForms.nickname" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="10">
              <el-form-item label="备注" label-width="100px" prop="note">
                <el-input v-model="editUserForms.note" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <!-- <el-col :span="10">
              <el-form-item hidden label="是否禁用" label-width="100px" prop="note">
                <el-input v-model="editUserForms.isDisable" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>-->

            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="10">
              <el-form-item hidden label="id" label-width="100px" prop="id">
                <el-input v-model="editUserForms.id" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
          <el-button type="primary" @click="EditUser()">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 添加用户权限对话框 -->
    </el-card>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  name: "developers",
  data() {
    return {
      showCmd: true,
      showCmds: true,
      showCmd_1:false,
      username: "",
      // name:"",
      uid: "",
      cid: "",
      aid: "",
      mo: true,
      optionss: [],
      options: [
        {
          id: 1,
          name: "系统用户"
        },
        {
          id: 2,
          name: "app用户"
        }
      ],
      sysId: 1,

      Id: "",
      id: "",
      cityCode: "",
      areaCode: "",
      provinceCode: "",
      // provinceCode: "",
      shengfen: [],
      level: [],
      levels: [],
      userlist: [],
      userlists: [],
      //分页相关数据
      total: -1,
      rows: 10,
      page: 1,
      isDisable: 0,
      // page=${this.page}&rows=${this.rows}
      // 添加对话框的属性
      dialogFormVisibleAdd: false,
      dialogFormVisibleEdit: false,
      dialogFormVisiblechongzhi: false,
      dialogFormVisibleapp: false,
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
          { required: true, message: "请输入联系电话", trigger: "blur" },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: "手机号格式不对"
          }
        ],
        code: [
          { required: true, message: "工作证编号不能为空", trigger: "blur" }
        ],
        nickname: [
          { required: true, message: "负责人不能为空", trigger: "blur" }
        ],
        note: [{ required: true, message: "备注不能为空", trigger: "blur" }]
      },

      // 编辑
      editUserForms: {
        id: "",
        username: "",
        unitId: "",
        // idCard: "",
        unitName: "",
        phone: "",
        code: "",
        nickname: "",
        note: ""
      },
      codes: "",
      tyPe: "",
      provincecode: "",
      citycode: "",
      areacode: "",
      tyPes: "",
      systemid: "",
      appid: ""
    };
  },
  watch: {
    dialogFormVisibleAdd: function(val, oldVla) {
      this.$refs["form"].resetFields();
    }
  },

  methods: {
    // 系统用户重置密码弹出框
    showRole(userId) {
      this.systemid = userId;
      // this.dialogFormVisiblechongzhi = true;
      this.$confirm("是否重置密码", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const res = await this.$http.put(`user/updatePassword/${userId}`);
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
              type: "warning",
              message: res.data.msg
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消重置密码"
          });
        });
    },

    // app用户重置密码弹出框
    showRoleapp(appId) {
      this.appid = appId;
      // this.dialogFormVisibleapp = true;
      this.$confirm("是否重置密码", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const res = await this.$http.put(
            `/app-user/updatePassword/${appId}`
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
              type: "warning",
              message: res.data.msg
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消重置密码"
          });
        });
    },

    // 系统用户重置密码发送请求
    async Editchongzhi() {
      const res = await this.$http.put(`user/updatePassword/${this.systemid}`);
      console.log(res);
      if (res.data.code == 0) {
        this.$message({
          type: "success",
          message: res.data.msg
        });
        this.dialogFormVisiblechongzhi = false;
        this.getUserlist();
      }
    },

    // app用户重置密码发送请求你
    async Editapp() {
      const res = await this.$http.put(
        `/app-user/updatePassword/${this.appid}`
      );
      console.log(res);
      if (res.data.code == 0) {
        this.$message({
          type: "success",
          message: res.data.msg
        });
        this.dialogFormVisibleapp = false;
        this.getUserlist();
      }
    },
    // 查询单位名称
    async selectedDia() {
      const res = await this.$http.get(`/unit/findUnit`);
      console.log(res);
      this.optionss = res.data.data;
    },
    // 省级区域显示
    async provinceMessage() {
      // /chinese/province
      // /chinese/address
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
      // if (this.editUserForms.isDisable == true) {
      //   this.editUserForms.isDisable = 0;
      // } else {
      //   this.editUserForms.isDisable = 1;
      // }
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
        this.getUserlist();
      }
    },

    // 修改对话框打开
    async showEdituser(user) {
      console.log(user);

      this.dialogFormVisibleEdit = true;
      this.editUserForms = user;

      this.getUserlist();
      //user其实就是scope.row也就是userlist
    },
    showDeleUserMsgBox() {},

    //添加用户发送请求
    async AddUser() {
      // 2.关闭对话框
      this.$refs.form.validate(async valid => {
        if (valid) {
          const res = await this.$http.post(`/user`, this.form);
          console.log(res);
          console.log(this.form);

          if (res.data.code == 0) {
            this.$message.success(res.data.msg);
            this.getUserlist();
            this.dialogFormVisibleAdd = false;
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
    // 搜索
    async searchUser() {
      console.log(this.sysId);

      if (this.sysId == 1) {
        if (this.tyPe == 1) {
          const res = await this.$http.get(
            `/user/findPage?page=1&rows=${this.rows}&provinceCode=${this.codes}&cityCode=${this.citys}&areaCode=${this.areas}&username=${this.username}`
          );
          console.log(res);
          this.userlist = res.data.data.list;
          this.total = res.data.data.totalCount;
        } else if (this.tyPe == 2) {
          const res = await this.$http.get(
            `/user/findPage?page=1&rows=${this.rows}&provinceCode=${this.codes}&cityCode=${this.citys}&areaCode=${this.areaCode}&username=${this.username}`
          );
          console.log(res);
          this.userlist = res.data.data.list;
          this.total = res.data.data.totalCount;
        } else if(this.tyPe == 0) {
          const res = await this.$http.get(
            `/user/findPage?page=1&rows=${this.rows}&provinceCode=${this.provinceCode}&cityCode=${this.cityCode}&areaCode=${this.areaCode}&username=${this.username}`
          );
          console.log(res);
          this.userlist = res.data.data.list;
          this.total = res.data.data.totalCount;
        }else if(this.tyPe == 3) {
          const res = await this.$http.get(
            `/user/findPage?page=1&rows=${this.rows}&provinceCode=${this.codes}&cityCode=${this.cityCode}&areaCode=${this.areaCode}&username=${this.username}`
          );
          console.log(res);
          this.userlist = res.data.data.list;
          this.total = res.data.data.totalCount;
        }
      } else if (this.sysId == 2) {
        if (this.tyPe == 1) {
          const res = await this.$http.get(
            `app-user/findPage?page=1&rows=${this.rows}&provinceCode=${this.codes}&cityCode=${this.citys}&areaCode=${this.areas}&username=${this.username}`
          );
          console.log(res);
          this.userlists = res.data.data.list;
          this.total = res.data.data.totalCount;
        } else if (this.tyPe == 2) {
          const res = await this.$http.get(
            `app-user/findPage?page=1&rows=${this.rows}&provinceCode=${this.codes}&cityCode=${this.citys}&areaCode=${this.areaCode}&username=${this.username}`
          );
          console.log(res);
          this.userlists = res.data.data.list;
          this.total = res.data.data.totalCount;
        } else if(this.tyPe == 0) {
          const res = await this.$http.get(
            `app-user/findPage?page=1&rows=${this.rows}&provinceCode=${this.provinceCode}&cityCode=${this.cityCode}&areaCode=${this.areaCode}&username=${this.username}`
          );
          console.log(res);
          this.userlists = res.data.data.list;
          this.total = res.data.data.totalCount;
        }else if(this.tyPe == 3) {
          const res = await this.$http.get(
            `app-user/findPage?page=1&rows=${this.rows}&provinceCode=${this.codes}&cityCode=${this.cityCode}&areaCode=${this.areaCode}&username=${this.username}`
          );
          console.log(res);
          this.userlists = res.data.data.list;
          this.total = res.data.data.totalCount;
        }
      }
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

    async getUserlist() {
      const res = await this.$http.get(`/chinese/address`);
      console.log(res);
      this.tyPe = res.data.data.type; //监管type
      console.log(this.tyPe);
      if (res.data.data.type == 2) {
       sessionStorage.setItem("provinceCode", res.data.data.provinceCode);
        sessionStorage.setItem("cityCode", res.data.data.cityCode);
        this.codes = res.data.data.provinceCode; //省code
        this.provinceCode = res.data.data.province; //省搜索name
        this.form.provinceCode = res.data.data.province; //省表单name
        this.form.cityCode = res.data.data.city; //市表单name
        this.cityCode = res.data.data.city; //市搜索name
        this.citys = res.data.data.cityCode; //市code
        this.AreaId = res.data.data.area; //区数组
        this.showCmd = true;
        this.showCmds = false;
        this.showCmd_1 = true;
      } else if (res.data.data.type == 1) {
         sessionStorage.setItem("provinceCode", res.data.data.provinceCode);
        sessionStorage.setItem("cityCode", res.data.data.cityCode);
        sessionStorage.setItem("areaCode", res.data.data.areaCode);
        this.codes = res.data.data.provinceCode; //省code
        this.provinceCode = res.data.data.province; //省name
        this.cityCode = res.data.data.city; //市name
        this.form.provinceCode = res.data.data.province; //省表单name
        this.form.cityCode = res.data.data.city; //市表单name
        this.citys = res.data.data.cityCode; //市code
        this.areas = res.data.data.areaCode; //区code
        this.areaCode = res.data.data.area; //区name
        this.form.areaCode = res.data.data.area; //区name
       this.showCmd = true;
        this.showCmds = true;
        this.showCmd_1 = true;
      } else if(res.data.data.type == 0) {
        this.shengfen = res.data.data.provinces;
       this.showCmd = false;
        this.showCmds = false;
        this.showCmd_1 = false;
      }else if(res.data.data.type == 3){
        sessionStorage.setItem("provinceCode", res.data.data.provinceCode);
        sessionStorage.setItem("province", res.data.data.province);
        this.provinceCode = res.data.data.province; //省搜索name
        this.codes = res.data.data.provinceCode; //省code
        this.form.provinceCode = res.data.data.province; //省表单name
        this.CityId = res.data.data.city; //市数组
        this.showCmds = false; //区按钮
        this.showCmd = true; //省按钮
        this.showCmd_1 = false; //市按钮
      }
      if (this.sysId == 1) {
        $(".system").show();
        $(".app").hide();
        if (this.tyPe == 1) {
          const res = await this.$http.get(
            `/user/findPage?page=${this.page}&rows=${this.rows}&provinceCode=${this.codes}&cityCode=${this.citys}&areaCode=${this.areas}&username=${this.username}`
          );
          console.log(res);
          this.userlist = res.data.data.list;
          this.total = res.data.data.totalCount;
        } else if (this.tyPe == 2) {
          const res = await this.$http.get(
            `/user/findPage?page=${this.page}&rows=${this.rows}&provinceCode=${this.codes}&cityCode=${this.citys}&areaCode=${this.areaCode}&username=${this.username}`
          );
          console.log(res);
          this.userlist = res.data.data.list;
          this.total = res.data.data.totalCount;
        } else if(this.tyPe==0) {
          const res = await this.$http.get(
            `/user/findPage?page=${this.page}&rows=${this.rows}&provinceCode=${this.provinceCode}&cityCode=${this.cityCode}&areaCode=${this.areaCode}&username=${this.username}`
          );
          console.log(res);
          this.userlist = res.data.data.list;
          this.total = res.data.data.totalCount;
        }else if(this.tyPe==3) {
          const res = await this.$http.get(
            `/user/findPage?page=${this.page}&rows=${this.rows}&provinceCode=${this.codes}&cityCode=${this.cityCode}&areaCode=${this.areaCode}&username=${this.username}`
          );
          console.log(res);
          this.userlist = res.data.data.list;
          this.total = res.data.data.totalCount;
        }
      } else if (this.sysId == 2) {
        $(".system").hide();
        $(".app").show();
        if (this.tyPe == 1) {
          const res = await this.$http.get(
            `app-user/findPage?page=${this.page}&rows=${this.rows}&provinceCode=${this.codes}&cityCode=${this.citys}&areaCode=${this.areas}&username=${this.username}`
          );
          console.log(res);
          this.userlists = res.data.data.list;
          this.total = res.data.data.totalCount;
        } else if (this.tyPe == 2) {
          const res = await this.$http.get(
            `app-user/findPage?page=${this.page}&rows=${this.rows}&provinceCode=${this.codes}&cityCode=${this.citys}&areaCode=${this.areaCode}&username=${this.username}`
          );
          console.log(res);
          this.userlists = res.data.data.list;
          this.total = res.data.data.totalCount;
        } else if(this.tyPe == 0) {
          const res = await this.$http.get(
            `app-user/findPage?page=${this.page}&rows=${this.rows}&provinceCode=${this.provinceCode}&cityCode=${this.cityCode}&areaCode=${this.areaCode}&username=${this.username}`
          );
          console.log(res);
          this.userlists = res.data.data.list;
          this.total = res.data.data.totalCount;
        }else if(this.tyPe == 3) {
          const res = await this.$http.get(
            `app-user/findPage?page=${this.page}&rows=${this.rows}&provinceCode=${this.codes}&cityCode=${this.cityCode}&areaCode=${this.areaCode}&username=${this.username}`
          );
          console.log(res);
          this.userlists = res.data.data.list;
          this.total = res.data.data.totalCount;
        }
      }
    }
  },
  created() {
    this.provinceMessage();
    this.getUserlist();
    this.selectedDia();
    // this.selectedDia()
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
