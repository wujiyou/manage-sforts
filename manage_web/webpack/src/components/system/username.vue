<template>
  <div>
    <div style="background:white;width:99.1%;padding-left:15px">
      <my-bread level1="系统管理" level2="用户管理"></my-bread>
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
              filterable
              size="small"
              style=" width: 100%;"
              @clear="loadUserList()"
              @input="searchUser()"
              clearable
              v-model="unitId"
              placeholder="请选择单位名称"
            >
              <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-col>
          <!--  @clear="loadUserList()"
          clearable-->
          <el-col style="margin-left:30px" :span="4">
            <el-select
              size="small"
              style=" width: 100%;"
              @clear="loadUserList()"
              @input="searchUser"
              clearable
              v-model="provinceCode"
              @change="function2(provinceCode)"
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
              <el-option v-for="item in level" :key="item.id" :label="item.name" :value="item.code"></el-option>
            </el-select>
          </el-col>

          <el-col style="margin-left:30px" :span="4">
            <el-select
              :disabled="showCmds"
              size="small"
              style=" width: 100%;"
              @clear="loadUserList()"
              @input="searchUser"
              clearable
              v-model="areaCode"
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

          <!-- <el-button size="small"  @click="showAddUserDia()" > <i style="padding-right:10px" class="el-icon-plus"></i>新增</el-button> -->
        </el-col>

        <el-button type="success" size="small" style="font-size:13px" @click="showAddUserDia()">
          <i style="padding-right:10px" class="el-icon-plus"></i>新增
        </el-button>
      </el-row>

      <!-- 表格 -->
      <template>
        <el-tabs style="margin-top:15px;" v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="未禁用" name="first">
            <el-table
              border
              :data="userlist"
              style="width: 100%;margin-top:-1px;padding-bottom:40px"
              :row-style="{height:'40px'}"
              :cell-style="{padding:'0px'}"
            >
              <el-table-column type="index" label="序号" width="50" show-overflow-tooltip>
                <template slot-scope="socpe">
                  <p style="cursor:pointer;" @click="showEdituser(socpe.row)">{{socpe.$index+1}}</p>
                </template>
              </el-table-column>
              <el-table-column show-overflow-tooltip prop="username" label="用户名"></el-table-column>
              <el-table-column show-overflow-tooltip prop="unitName" label="单位名称"></el-table-column>
              <el-table-column prop="phone" label="联系电话"></el-table-column>
              <!-- <el-table-column prop="idCard" label="身份证"></el-table-column> -->
              <el-table-column show-overflow-tooltip prop="code" label="工作证编号"></el-table-column>
              <el-table-column show-overflow-tooltip prop="name" label="姓名"></el-table-column>
              <el-table-column show-overflow-tooltip prop="note" label="备注"></el-table-column>
              <el-table-column label="是否禁用">
                <template slot-scope="scope">
                  <!-- 找到开关@change="changeMgStatus(scope.row)" -->
                  <!-- changeMgStatus  发送put请求 -->
                  <!-- users/:uId/state/:type uid用户id -->

                  <el-switch
                    @change="changeMgStatus(scope.row)"
                    v-model="scope.row.isDisable"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                  ></el-switch>
                </template>
              </el-table-column>
              <!-- 表格操作 -->
              <el-table-column prop="address" width="150" label="操 作">
                <template slot-scope="scope">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    content="分配角色"
                    :enterable="false"
                    placement="top"
                  >
                    <el-button
                      type="success"
                      size="mini"
                      title="分配角色"
                      plain
                      icon="el-icon-check"
                      @click="showRole(scope.row.id)"
                      circle
                    ></el-button>
                  </el-tooltip>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="已禁用" name="second">
            <el-table
              border
              :row-style="{height:'40px'}"
              :cell-style="{padding:'0px'}"
              :data="userlist"
              style="width: 100%;margin-top:-1px;padding-bottom:40px"
            >
              <el-table-column type="index" label="序号" width="70" show-overflow-tooltip>
                <template slot-scope="socpe">
                  <p style="cursor:pointer;" @click="showEdituser(socpe.row)">{{socpe.$index+1}}</p>
                </template>
              </el-table-column>
              <el-table-column prop="username" label="用户名" width="120"></el-table-column>
              <el-table-column prop="unitName" label="单位名称"></el-table-column>

              <el-table-column prop="phone" label="联系电话"></el-table-column>
              <el-table-column prop="code" label="工作证编号"></el-table-column>
              <el-table-column prop="name" label="真实姓名"></el-table-column>
              <el-table-column prop="note" label="备注"></el-table-column>
              <el-table-column label="是否启用">
                <template slot-scope="scope">
                  <!-- 找到开关@change="changeMgStatus(scope.row)" -->
                  <!-- changeMgStatus  发送put请求 -->
                  <!-- users/:uId/state/:type uid用户id -->

                  <el-switch
                    @change="changeMgStatus(scope.row)"
                    v-model="scope.row.isDisable"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                  ></el-switch>
                </template>
              </el-table-column>
              <!-- 表格操作 -->
              <el-table-column prop="address" width="150" label="操 作">
                <template slot-scope="scope">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    content="分配角色"
                    :enterable="false"
                    placement="top"
                  >
                    <el-button
                      type="success"
                      size="mini"
                      title="分配角色"
                      plain
                      icon="el-icon-check"
                      @click="showRole(scope.row.id)"
                      circle
                    ></el-button>
                  </el-tooltip>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
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
        :close-on-click-modal="false"
        :visible.sync="dialogFormVisibleAdd"
        width="80%"
      >
        <el-form :model="form" :rules="rules" ref="form">
          <el-col :span="24">
            <el-col :span="8">
              <el-form-item prop="vestingProvinceId" label-width="140px" label="行政省份:">
                <el-select
                  v-model="form.provinceCode"
                  @change="function2(form.provinceCode)"
                  :disabled="showCmd"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in shengfen"
                    :key="item.id"
                    :label="item.name"
                    :value="item.code"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="cityCode" label-width="140px" label="市级区域:">
                <el-select
                  v-model="form.cityCode"
                  @change="function1(form.cityCode)"
                  :disabled="showCmd_1"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in level"
                    :key="item.id"
                    :label="item.name"
                    :value="item.code"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="areaCode" label-width="140px" label="区级:">
                <el-select v-model="form.areaCode" :disabled="showCmds" placeholder="请选择">
                  <el-option
                    v-for="item in levels"
                    :key="item.id"
                    :label="item.name"
                    :value="item.code"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="10">
              <el-form-item label="用户名" class="red_s" label-width="100px" prop="username">
                <el-input v-model="form.username" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="10">
              <el-form-item label="单位名称" class="red_s" label-width="100px" prop="unitId">
                <el-select
                  style=" width: 100%;"
                  filterable
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
              <el-form-item label="身份证" label-width="100px" >
                <el-input v-model="form.idCard" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="10">
              <el-form-item label="联系电话" label-width="100px" >
                <el-input v-model="form.phone" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="10">
              <el-form-item label="工作证编号" class="red_s" label-width="100px" prop="code">
                <el-input v-model="form.code" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="10">
              <el-form-item label="姓名" class="red_s" label-width="100px" prop="name">
                <el-input v-model="form.name" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="10">
              <el-form-item label="详细地址"  label-width="100px" prop="address">
                <el-input v-model="form.address" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
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
        <el-form :model="editUserForms" :rules="rules" ref="editUserForms">
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
              <el-form-item label="单位名称" label-width="100px" prop="unitId">
                <el-select
                  filterable
                  size="small"
                  style=" width: 100%;"
                  @clear="loadUserList()"
                  @change="searchUser()"
                  clearable
                  v-model="editUserForms.unitId"
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

            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="10">
              <el-form-item label="联系电话" label-width="100px" prop="phone">
                <el-input v-model="editUserForms.phone" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="10">
              <el-form-item label="负责人" label-width="100px" prop="name">
                <el-input v-model="editUserForms.name" autocomplete="off"></el-input>
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
            <el-col :span="10">
              <el-form-item hidden label="是否禁用" label-width="100px">
                <el-input v-model="editUserForms.isDisable" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>

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
      <el-dialog
        title="分配角色"
        v-dialogDrag
        :close-on-click-modal="false"
        :visible.sync="dialogFormVisibleRole"
      >
        <p style="margin:5px 2px;border-bottom: 1px solid gainsboro;">角色权限:</p>
        <p>
          <el-checkbox-group :min="0" :max="1" size="small" v-model="types">
            <el-checkbox
              style="margin-top:5px"
              border
              @change="handleCheckAllChange(item)"
              v-for="item in rolelist"
              :label="item.id"
              :key="item.id"
            >{{item.name}}</el-checkbox>
          </el-checkbox-group>
        </p>
        <p style="margin:5px 2px;border-bottom: 1px solid gainsboro;">气瓶权限:</p>
        <p>
          <el-checkbox-group size="small" v-model="typess">
            <el-checkbox
              style="margin-top:5px"
              border
              @change="handleCheckAllChanges(item)"
              v-for="item in rolelists"
              :label="item.id"
              :key="item.id"
            >{{item.name}}</el-checkbox>
          </el-checkbox-group>
        </p>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibleRole = false">取 消</el-button>
          <el-button type="primary" @click="roleUser()">确 定</el-button>
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
      showCmd: true,
      showCmds: true,
      showCmd_1: true,

      uid: "",
      cid: "",
      aid: "",
      checkAll: false,
      types: [], //默认分配权限id
      typess: [],
      rolelist: [],
      checkEquipArr: [],
      isIndeterminate: true,
      activeName: "first", //tab选项卡
      mo: true,
      options: [],
      unitId: "",
      Id: "",
      id: "",
      cityCode: "",
      areaCode: "",
      provinceCode: "",
      shengfen: [],
      level: [],
      levels: [],
      userlist: [], //未禁用
      //分页相关数据
      total: -1,
      rows: 10,
      page: 1,
      isDisable: 0,
      // page=${this.page}&rows=${this.rows}
      // 添加对话框的属性
      dialogFormVisibleAdd: false,
      dialogFormVisibleEdit: false,
      dialogFormVisibleRole: false,
      // dialogFormVisibleRoleshow: false,
      //添加用户的表单的数据
      form: {
        provinceCode: "", //省
        cityCode: "", //市
        areaCode: "", //区
        username: "",
        unitId: "",
        idCard: "",
        phone: "",
        code: "",
        name: "",
        note: "",
        address: "",
      },
      rules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
        ],
        unitId: [
          { required: true, message: "单位名称不能为空", trigger: "blur" },
        ],
        idCard: [
          { required: true, message: "身份证号不能为空", trigger: "blur" },
          {
            pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
            message: "证件号码格式有误！",
          },
        ],
        phone: [
          { required: true, message: "请输入联系电话", trigger: "blur" },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: "手机号格式不对",
          },
        ],
        code: [
          { required: true, message: "工作证编号不能为空", trigger: "blur" },
        ],
        name: [{ required: true, message: "负责人不能为空", trigger: "blur" }],
        // note: [{ required: true, message: "备注不能为空", trigger: "blur" }]
      },
      ROleid: -1,
      // 编辑
      editUserForms: {
        id: "",
        username: "",
        unitId: "",
        // idCard: "",
        phone: "",
        code: "",
        name: "",
        note: "",
      },
      tyPe: "",
      provincecode: "",
      citycode: "",
      areacode: "",
      ids: [],
      rolelists: "",
      checkEquipArrs: [],
      checkEquipArrss: [],
      roleuser: [],
    };
  },
  watch: {
    dialogFormVisibleAdd: function (val, oldVla) {
      this.$refs["form"].resetFields();
    },

    dialogFormVisibleAdd: function (val, oldVla) {
      this.$refs["editUserForms"].resetFields();
    },
  },

  methods: {
    // 角色回显权限接口
    async zshi() {
      const res = await this.$http.get(`/role/findUserId/${this.ROleid}`);
      console.log(res);
      if (res.data.code == 0) {
        let roleids = res.data.data;
        let arr = [];
        roleids.forEach((item) => {
          arr.push(item.id);
        });
        this.types = arr;
        console.log(this.types);
        this.qphx();
      }
    },
    // 气瓶权限回显
    async qphx() {
      const ress = await this.$http.get(
        `/role-permission/bottle/${this.types}`
      );
      console.log(ress);
      if (ress.data.code == 0) {
        if (ress.data.data == null) {
          return;
        } else {
          let roleids = ress.data.data;
          let arr = [];
          roleids.forEach((item) => {
            arr.push(item.id);
          });
          this.typess = arr;
          console.log(this.typess);
        }
      }
    },
    async qip() {
      const res = await this.$http.get(`Permission/findBottle`);
      console.log(res);
      this.rolelists = res.data;
    },
    // 获取所有角色对话框打开
    async showRole(roleID) {
      this.checkEquipArr = [];
      this.typess = [];
      this.ROleid = roleID;
      this.dialogFormVisibleRole = true;
      const res = await this.$http.get(`/role/findPage?page=0&rows=25`);
      console.log(res);
      this.rolelist = res.data.data.list;
      this.zshi();
      // this.qphx();
      this.qip();
    },

    handleCheckAllChange(item) {
      this.checkEquipArrss = [];
      let ids = item.id;
      let arr2 = [];
      let arr = this.types;
      // console.log(arr);
      // arr.push = ids;
      for (let i = 0; i < arr.length; i++) {
        arr2.push(arr[i]);
      }
      this.checkEquipArrss = arr2;
      this.typess = arr2;
      console.log(this.typess); //角色权限id
    },
    handleCheckAllChanges(item) {
      let ids = item.id;
      // console.log(ids);
      let arr_2 = [];
      let arr_1 = this.typess;
      // arr_1.push = ids;
      for (var i = 0; i < arr_1.length; i++) {
        arr_2.push(arr_1[i]);
      }
      this.checkEquipArrs = arr_2;
      console.log(this.checkEquipArrs); //气瓶权限id
    },

    // 确认分配角色
    async roleUser() {
      this.checkEquipArr = this.checkEquipArrs;
      var idss = [];

      var types = this.types;

      for (var i = 0; i < this.types.length; i++) {
        idss.push(this.types[i]);
      }
      this.roleuser = idss;
      // this.roleuser = [...this.types, ...this.checkEquipArrss];
      console.log(this.roleuser);
      const res = await this.$http.post(
        `/user-role/${this.ROleid}?roleId=${this.roleuser}`,
        this.typess
      );
      console.log(res);
      if (res.data.code == 0) {
        this.$message({
          type: "success",
          message: res.data.msg,
        });
        this.dialogFormVisibleRole = false;

        this.getUserlist();
      } else if (res.data.code == 1) {
        this.$message({
          type: "warning",
          message: res.data.msg,
        });
      }
    },

    //tab选项卡
    handleClick(tab, event) {
      console.log(tab);
      if (tab.name === "first") {
        this.isDisable = 0;
        //  this.isDisable=false;
        this.getUserlist();
      } else {
        this.isDisable = 1;
        //  this.isDisable=true;
        this.getUserlist();
        // this.total = this.total
      }
    },

    async changeMgStatus(val) {
      console.log(val);

      if (val.isDisable == 1) {
        const res = await this.$http.put(`/user/${val.id}/enabled`);
        console.log(res);
        this.$message({
          type: "success",
          message: "取消禁用成功",
        });
        this.getUserlist();
        console.log(res);
      } else {
        const res = await this.$http.put(`/user/${val.id}/disable`);
        this.$message({
          type: "success",
          message: "禁用成功",
        });
        this.getUserlist();
        console.log(res);
      }
    },
    // 省级区域显示
    // async provinceMessage() {

    // },
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
      this.$refs.editUserForms.validate(async (valid) => {
        if (valid) {
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
              message: res.data.msg,
            });
            this.getUserlist();
          }
        } else {
          this.$message({
            type: "error",
            message: "请填写内容再试",
          });
          this.dialogFormVisibleEdit = true;
        }
      });
    },

    // 修改对话框打开
    async showEdituser(user) {
      console.log(user);

      this.dialogFormVisibleEdit = true;
      this.editUserForms = user;
      //    this.id=user.id
      //    console.log(this.id);
      // // /findUserId/{id}
      //   const res = await this.$http.get(`/findUserId/${this.id}`);
      //   console.log(res);

      // 2.添加对话框

      this.getUserlist();
      //user其实就是scope.row也就是userlist
    },
    showDeleUserMsgBox() {},

    //添加用户发送请求
    async AddUser() {
      // 2.关闭对话框
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          if (this.tyPe == 1) {
            // this.form.provinceCode = sessionStorage.getItem("provinceCode"); //省code
            // this.form.cityCode = sessionStorage.getItem("cityCode"); //市code
            // this.form.areaCode = sessionStorage.getItem("areaCode"); //市code
            const res = await this.$http.post(`/user`, this.form);
            console.log(res);
            console.log(this.form);

            if (res.data.code == 0) {
              this.$message.success(res.data.msg);
              this.getUserlist();
              this.dialogFormVisibleAdd = false;
            }
          } else if (this.tyPe == 2) {
            this.form.provinceCode = sessionStorage.getItem("provinceCode"); //省code
            this.form.cityCode = sessionStorage.getItem("cityCode"); //市code
            const res = await this.$http.post(`/user`, this.form);
            console.log(res);
            console.log(this.form);

            if (res.data.code == 0) {
              this.$message.success(res.data.msg);
              this.getUserlist();
              this.dialogFormVisibleAdd = false;
            }
          } else if (this.tyPe == 0) {
            const res = await this.$http.post(`/user`, this.form);
            console.log(res);
            console.log(this.form);

            if (res.data.code == 0) {
              this.$message.success(res.data.msg);
              this.getUserlist();
              this.dialogFormVisibleAdd = false;
            }
          } else if (this.tyPe == 3) {
            this.form.provinceCode = sessionStorage.getItem("provinceCode"); //省code
            const res = await this.$http.post(`/user`, this.form);
            console.log(res);
            console.log(this.form);

            if (res.data.code == 0) {
              this.$message.success(res.data.msg);
              this.getUserlist();
              this.dialogFormVisibleAdd = false;
            }
          }
        } else {
          this.$message({
            type: "error",
            message: "请填写内容再试",
          });
          this.dialogFormVisibleAdd = true;
        }
      });
    },
    // 查询单位名称
    async selectedDia() {
      const res = await this.$http.get(`/unit/findUnit`);
      console.log(res);
      this.options = res.data.data;
    },
    // 添加用户显示对话框
    showAddUserDia() {
      // 先点编辑 再点添加 打开表单清空表单
      // this.form = {};
      this.dialogFormVisibleAdd = true;
    },
    //清空搜索框搜索数据 点击清楚按钮清除数据重新发送请求
    loadUserList() {
      this.getUserlist();
    },
    // 搜索
    async searchUser() {
      if (this.tyPe == 1) {
        const res = await this.$http.get(
          `/user/findPage?page=1&rows=${this.rows}&unitId=${this.unitId}&provinceCode=${this.codes}&cityCode=${this.citys}&areaCode=${this.areas}&isDisable=${this.isDisable}` //多个了参数
        );
        console.log(res);
        this.userlist = res.data.data.list;
        this.total = res.data.data.totalCount;
        for (let i = 0; i < res.data.data.list.length; i++) {
          if (res.data.data.list[i].isDisable == 0) {
            res.data.data.list[i].isDisable = true;
          } else {
            res.data.data.list[i].isDisable = false;
          }
        }
      } else if (this.tyPe == 2) {
        const res = await this.$http.get(
          `/user/findPage?page=1&rows=${this.rows}&unitId=${this.unitId}&provinceCode=${this.codes}&cityCode=${this.citys}&areaCode=${this.areaCode}&isDisable=${this.isDisable}` //多个了参数
        );
        console.log(res);
        this.userlist = res.data.data.list;
        this.total = res.data.data.totalCount;
        for (let i = 0; i < res.data.data.list.length; i++) {
          if (res.data.data.list[i].isDisable == 0) {
            res.data.data.list[i].isDisable = true;
          } else {
            res.data.data.list[i].isDisable = false;
          }
        }
      } else if (this.tyPe == 0) {
        const res = await this.$http.get(
          `/user/findPage?page=1&rows=${this.rows}&unitId=${this.unitId}&provinceCode=${this.provinceCode}&cityCode=${this.cityCode}&areaCode=${this.areaCode}&isDisable=${this.isDisable}` //多个了参数
        );
        console.log(res);
        this.userlist = res.data.data.list;
        this.total = res.data.data.totalCount;
        for (let i = 0; i < res.data.data.list.length; i++) {
          if (res.data.data.list[i].isDisable == 0) {
            res.data.data.list[i].isDisable = true;
          } else {
            res.data.data.list[i].isDisable = false;
          }
        }
      } else if (this.tyPe == 3) {
        const res = await this.$http.get(
          `/user/findPage?page=1&rows=${this.rows}&unitId=${this.unitId}&provinceCode=${this.codes}&cityCode=${this.cityCode}&areaCode=${this.areaCode}&isDisable=${this.isDisable}` //多个了参数
        );
        console.log(res);
        this.userlist = res.data.data.list;
        this.total = res.data.data.totalCount;
        for (let i = 0; i < res.data.data.list.length; i++) {
          if (res.data.data.list[i].isDisable == 0) {
            res.data.data.list[i].isDisable = true;
          } else {
            res.data.data.list[i].isDisable = false;
          }
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

    async getUserlist(val = 0) {
      const res = await this.$http.get(`/chinese/address`);
      console.log(res);
      this.tyPe = res.data.data.type; //type
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
        this.levels = res.data.data.area; //区数组
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
      } else if (res.data.data.type == 0) {
        this.shengfen = res.data.data.provinces;
        this.showCmd = false;
        this.showCmds = false;
        this.showCmd_1 = false;
      } else if (res.data.data.type == 3) {
        //省监管
        sessionStorage.setItem("provinceCode", res.data.data.provinceCode);
        sessionStorage.setItem("province", res.data.data.province);
        this.provinceCode = res.data.data.province; //省搜索name
        this.codes = res.data.data.provinceCode; //省code
        this.form.provinceCode = res.data.data.province; //省表单name
        this.level = res.data.data.city; //市数组
        // this.AreaId = res.data.data.area; //区数组
        //
        this.showCmds = false; //区按钮
        this.showCmd = true; //省按钮
        this.showCmd_1 = false; //市按钮
      }

      if (this.tyPe == 1) {
        const res = await this.$http.get(
          `/user/findPage?page=${this.page}&rows=${this.rows}&unitId=${this.unitId}&provinceCode=${this.codes}&cityCode=${this.citys}&areaCode=${this.areas}&isDisable=${this.isDisable}` //多个了参数
        );
        console.log(res);
        this.userlist = res.data.data.list;
        this.total = res.data.data.totalCount;
        for (let i = 0; i < res.data.data.list.length; i++) {
          if (res.data.data.list[i].isDisable == 0) {
            res.data.data.list[i].isDisable = true;
          } else {
            res.data.data.list[i].isDisable = false;
          }
        }
      } else if (this.tyPe == 2) {
        const res = await this.$http.get(
          `/user/findPage?page=${this.page}&rows=${this.rows}&unitId=${this.unitId}&provinceCode=${this.codes}&cityCode=${this.citys}&areaCode=${this.areaCode}&isDisable=${this.isDisable}` //多个了参数
        );
        console.log(res);
        this.userlist = res.data.data.list;
        this.total = res.data.data.totalCount;
        for (let i = 0; i < res.data.data.list.length; i++) {
          if (res.data.data.list[i].isDisable == 0) {
            res.data.data.list[i].isDisable = true;
          } else {
            res.data.data.list[i].isDisable = false;
          }
        }
      } else if (this.tyPe == 0) {
        const res = await this.$http.get(
          `/user/findPage?page=${this.page}&rows=${this.rows}&unitId=${this.unitId}&provinceCode=${this.provinceCode}&cityCode=${this.cityCode}&areaCode=${this.areaCode}&isDisable=${this.isDisable}` //多个了参数
        );
        console.log(res);
        this.userlist = res.data.data.list;
        this.total = res.data.data.totalCount;
        for (let i = 0; i < res.data.data.list.length; i++) {
          if (res.data.data.list[i].isDisable == 0) {
            res.data.data.list[i].isDisable = true;
          } else {
            res.data.data.list[i].isDisable = false;
          }
        }
      } else if (this.tyPe == 3) {
        const res = await this.$http.get(
          `/user/findPage?page=${this.page}&rows=${this.rows}&unitId=${this.unitId}&provinceCode=${this.codes}&cityCode=${this.cityCode}&areaCode=${this.areaCode}&isDisable=${this.isDisable}` //多个了参数
        );
        console.log(res);
        this.userlist = res.data.data.list;
        this.total = res.data.data.totalCount;
        for (let i = 0; i < res.data.data.list.length; i++) {
          if (res.data.data.list[i].isDisable == 0) {
            res.data.data.list[i].isDisable = true;
          } else {
            res.data.data.list[i].isDisable = false;
          }
        }
      }
    },
  },
  created() {
    // this.zshi();
    this.getUserlist();
    this.selectedDia();
    // this.provinceMessage();
  },
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
.red_s{
  color: red;
}
</style>
