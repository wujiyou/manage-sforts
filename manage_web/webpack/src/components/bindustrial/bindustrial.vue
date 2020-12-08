<template>
  <div>
    <div style="background: white; width: 99.1%; padding-left: 15px">
      <my-bread
        level1="气瓶登记"
        level2="标签发卡"
        level3="工业气瓶"
      ></my-bread>
    </div>

    <el-card class="box-card" style="margin: 20px 20px 0 20px">
      <!--搜索  -->
      <el-row>
        <el-col :span="24">
          <h5
            style="
              border-bottom: 1px solid #ece8e8;
              padding-bottom: 15px;
              padding-left: 15px;
            "
          >
            查询信息
          </h5>
        </el-col>

        <el-col style="padding-left: 15px" :span="24">
          <el-col :span="4">
            <el-input
              size="small"
              style="width: 100%"
              @clear="loadUserList()"
              clearable
              class="input-serach"
              placeholder="请输入登记证编号"
              v-model="regId"
            ></el-input>
          </el-col>
          <el-col style="margin-left: 30px" :span="4">
            <el-input
              size="small"
              style="width: 100%"
              @clear="loadUserList()"
              clearable
              class="input-serach"
              placeholder="请输入使用单位"
              v-model="buildingUser"
            ></el-input>
          </el-col>
          <el-col style="margin-left: 30px" :span="4">
            <el-select
              size="small"
              clearable
              style="width: 100%"
              v-model="isCard"
              placeholder="请选择是否发卡"
            >
              <el-option
                v-for="item in optionslei"
                :key="item.id"
                :label="item.lei"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-col>

          <el-col style="margin-left: 30px" :span="4">
            <el-input
              size="small"
              style="width: 100%"
              @clear="loadUserList()"
              clearable
              class="input-serach"
              placeholder="请输入气瓶编号"
              v-model="gasId"
            ></el-input>
          </el-col>
          <el-col :span="3">
          </el-col>
          <el-col style="margin-top: 15px" :span="24">
            <el-col :span="4">
              <el-input
              size="small"
              style="width: 100%"
              @clear="loadUserList()"
              clearable
              class="input-serach"
              placeholder="请选择介质"
              v-model="medium"
            ></el-input>
              <!-- <el-select
                @clear="loadUserList()"
                clearable
                size="small"
                style="width: 100%"
                v-model="medium"
                placeholder="请选择介质"
              >
                <el-option
                  v-for="item in selects2"
                  :key="item.id"
                  :label="item.orders"
                  :value="item.orders"
                ></el-option>
              </el-select> -->
            </el-col>
            <el-col style="padding-left: 15px" :span="4">
              <el-button
                size="small"
                style="width: 100%"
                @click="searchUser()"
                class="el_button"
                icon="el-icon-search"
                >搜索</el-button
              >
            </el-col>
          </el-col>
        </el-col>
      </el-row>

      <el-col :span="24">
        <p
          style="
            width: 100%;
            height: 1px;
            background: rgb(236, 232, 232);
            margin: 20px 0px 0px 0px;
            z-index: 999;
          "
        ></p>
      </el-col>

      <el-col style="margin-bottom: 15px; margin-top: 15px" :span="24">
        <el-col :span="16">&nbsp;</el-col>

        <el-col :span="2">
          <el-button
            style="font-size: 13px"
            type="success"
            @click="ClearLabel()"
            size="small"
            >清空标签卡</el-button
          >
        </el-col>
        <el-col :span="2">
          <el-button
            style="font-size: 13px"
            type="success"
            @click="Clearstaff()"
            size="small"
            >清空员工卡</el-button
          >
        </el-col>
      </el-col>

      <!-- 表格 -->
      <template>
        <el-table
          border
          :data="userlist"
          style="width: 100%; margin: 20px 0px; padding-bottom: 40px"
          :row-style="{ height: '40px' }"
          :cell-style="{ padding: '0px' }"
        >
          <el-table-column
            show-overflow-tooltip
            type="index"
            label="序号"
            width="50"
          ></el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="regId"
            label="登记证编号"
          ></el-table-column>

          <el-table-column
            show-overflow-tooltip
            prop="gasId"
            label="气瓶编号"
          ></el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="appid"
            label="标签号"
          ></el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="medium"
            label="介质"
          ></el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="checkData"
            label="检验日期"
          >
            <template slot-scope="socpe">{{
              socpe.row.checkData | fmtdate
            }}</template>
          </el-table-column>

          <el-table-column
            show-overflow-tooltip
            prop="nextCheckData"
            label="下次检验日期"
          >
            <template slot-scope="socpe">{{
              socpe.row.nextCheckData | fmtdate
            }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="inspectName"
            label="检验单位"
          ></el-table-column>
          <el-table-column prop="isCard" label="是否发卡" show-overflow-tooltip>
            <template slot-scope="scope">
              <p v-if="userlist[scope.$index].isCard == 0">未发卡</p>
              <p v-if="userlist[scope.$index].isCard == 1">已发卡</p>
            </template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="buildingUser"
            label="使用单位"
          ></el-table-column>

          <!-- 表格操作 -->
          <el-table-column prop="address" width="150" label="操 作">
            <template slot-scope="scope">
              <el-tooltip
                class="item"
                effect="dark"
                content="发卡"
                :enterable="false"
                placement="top"
              >
                <el-button
                  type="primary"
                  size="mini"
                  title="发卡"
                  :disabled="scope.row.isCard != 0"
                  plain
                  @click="sendLabel(scope.row.id)"
                  >发卡</el-button
                >
              </el-tooltip>
              <el-tooltip
                class="item"
                effect="dark"
                content="补卡"
                :enterable="false"
                placement="top"
              >
                <el-button
                  :disabled="scope.row.isCard != 1"
                  type="success"
                  size="mini"
                  title="补卡"
                  plain
                  @click="sendLabel(scope.row.id)"
                  >补卡</el-button
                >
              </el-tooltip>
              <!-- <el-tooltip
                class="item"
                effect="dark"
                content="二维码信息增修改"
                :enterable="false"
                placement="top"
              >
                <el-button
                  type="primary"
                  size="mini"
                  title="二维码信息增修改"
                  plain
                  @click="QuickMark(scope.row)"
                  >二维码信息改</el-button
                >
              </el-tooltip> -->
            </template>
          </el-table-column>
        </el-table>
      </template>
      <el-pagination
        style="
          padding: 5px 15px 15px 15px;
          display: flex;
          justify-content: flex-end;
        "
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagenum"
        :page-sizes="[10, 15, 20, 25, 30]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>

      <!-- 二维码信息添加或修改弹出框 -->
      <el-dialog
        title="二维码信息添加或修改"
        :visible.sync="dialogFormVisibleQuickMark"
      >
        <el-form :model="formMark">
          <el-form-item label="气瓶编号" label-width="100px" prop="gasId">
            <el-input
              disabled
              v-model="formMark.gasId"
              autocomplete="off"
            ></el-input>
          </el-form-item>

          <el-form-item label="二维码编号" label-width="100px" prop="quickmark">
            <el-input
              v-model="formMark.quickmark"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibleQuickMark = false"
            >取 消</el-button
          >
          <el-button type="primary" @click="AddQuickMark()">保 存</el-button>
        </div>
      </el-dialog>

      <!-- 编辑对话框 -->
      <!-- <el-dialog title="编辑用户" :visible.sync="dialogFormVisibleEdit">
        <el-form :model="editUserForm">
          <el-form-item label="用户名" label-width="100px" prop="username">
            <el-input
              disabled
              v-model="editUserForm.username"
              autocomplete="off"
            ></el-input>
          </el-form-item>

          <el-form-item label="员工编号" label-width="100px" prop="email">
            <el-input
              v-model="editUserForm.number"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="性别" label-width="100px" prop="mobile">
            <el-input v-model="editUserForm.sex" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="电话" label-width="100px" prop="mobile">
            <el-input
              v-model="editUserForm.mobile"
              autocomplete="off"
            ></el-input>
          </el-form-item>

          <el-form-item label="所属单位" label-width="100px" prop="mobile">
            <el-input v-model="editUserForm.mond" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
          <el-button type="primary" @click="EditUser()">确 定</el-button>
        </div>
      </el-dialog> -->
    </el-card>
  </div>
</template>
<script>
import jwtDecode from "jwt-decode";
export default {
  name: "tagboard",
  data() {
    return {
      wsr: "",
      query: "",
      select: "",
      faka: "",
      buildingUser: "",
      regId: "",
      gasId: "",
      isCard: "",
      medium: "",
      userlist: [],
      token: [],
      //分页相关数据
      total: -1,
      pagenum: 1,
      page: 1,
      pagesize: 10,
      formMark: {
        gasId: "",
        quickmark: "",
      },
      // 添加对话框的属性
      dialogFormVisibleQuickMark: false,
      // dialogFormVisibleAdd: false,
      dialogFormVisibleEdit: false,
      // dialogFormVisibleRoleshow: false,
      //添加用户的表单的数据
      // form: {
      //   username: "",
      //   number: "",
      //   sex: "",
      //   mobile: "",
      //   mond: "",
      // },
      // 编辑
      // editUserForm: {
      //   username: "",
      //   number: "",
      //   sex: "",
      //   mobile: "",
      //   mond: "",
      // },
      optionslei: [
        {
          id: 1,
          lei: "已发卡",
        },
        {
          id: 0,
          lei: "未发卡",
        },
      ],
      selects2: [
        {
          id: 1,
          orders: "CNG",
        },
        {
          id: 2,
          orders: "LPG",
        },
        {
          id: 3,
          orders: "LNG",
        },
        {
          id: 4,
          orders: "H2",
        },
        {
          id: 5,
          orders: "N2",
        },
      ],
      // 分配角色,
      currRoleId: -1,
      //   分配当前用户id
      currusrId: -1,
      roles: [],
      currUsername: "",
      //   保存所有角色数据
    };
  },
  mounted() {
    this.wsr = wsrProxy;
    this.wsr.init();
    this.getUserlist();
  },
  methods: {
    // 二维码信息添加或修改弹出框
    QuickMark(val) {
      this.formMark = val;
      this.dialogFormVisibleQuickMark = true;
    },
    // 二维码信息添加或修改发送请求
    async AddQuickMark() {
      const res = await this.$http.get("");
      console.log(res);
      if (res.data.code == 0) {
        this.$message({
          type: "success",
          message: res.data.msg,
        });
        this.dialogFormVisibleQuickMark = false;
        this.getUserlist()
      }else{
        this.$message({
          type: "warning",
          message: res.data.msg,
        });
        this.dialogFormVisibleQuickMark = true;
      }
    },
    //清除员工卡
    Clearstaff() {
      var passa = "ABCDEABBCC12";
      var passb = "CCABEAAAEE21";
      var rt = 0;
      var port = 0;
      var keyType = 0;
      var keytype2 = 1;
      var key = passa;
      var keyb = passb;
      var v1 = 5000,
        v2 = 0;
      var block = 12;
      var delaytime = 2;
      var obj = { cardno: "", uid: "", len: 0 };
      rt = this.wsr.ws_openPort(port);
      console.log("open:" + rt);
      try {
        this.wsr.ws_set_mode(this.wsr.MODE_TIMEOUT, 300);
        this.wsr.ws_beep(port);
        rt = this.wsr.ws_getCardNo_String(port, obj);
        if (rt < 0) {
          this.$message.warning("请放入卡片");
          return rt;
        }
        rt = this.wsr.ws_loadKey(port, key, keyType);
        rt = this.wsr.ws_loadKey(port, keyb, keytype2);
        this.wsr.client_datatype = 1;
        rt = this.wsr.ws_readBlock(port, 12 * 4, obj);
        if (rt < 0) this.$message.error("卡片类型错误");
        else {
          rt = this.wsr.ws_writeBlock(
            port,
            12 * 4,
            "00000000000000000000000000000000"
          );
          rt = this.wsr.ws_changeKey(
            port,
            12,
            "FFFFFFFFFFFF",
            "FF078069",
            "FFFFFFFFFFFF"
          );
          if (rt > 0) {
            this.$message.success("清除成功");
            this.getUserlist()
          }
        }
      } finally {
        this.wsr.ws_closePort(port);
      }
    },
    // 清除发卡标签
    ClearLabel() {
      var passworda = "837210987622";
      var passwordb = "12BBADDAEA11";
      var rt = 0;
      var port = 0;
      var keyType = 0;
      var key = passworda;
      var keyb = passwordb;
      var v1 = 5000,
        v2 = 0;
      var block = 12;
      var delaytime = 2;
      var obj = { cardno: "", uid: "", len: 0 };
      rt = this.wsr.ws_openPort(port);
      console.log("open:" + rt);
      try {
        this.wsr.ws_set_mode(this.wsr.MODE_TIMEOUT, 300);
        this.wsr.ws_beep(port);
        rt = this.wsr.ws_getCardNo_String(port, obj);
        if (rt < 0) {
          this.$message.warning("请放入卡片");
          // layui.use('layer', function () {
          //     var layer = layui.layer;
          //     layer.msg('请放入卡片');
          // });
          return rt;
        }
        rt = this.wsr.ws_loadKey(port, key, 0);
        rt = this.wsr.ws_loadKey(port, keyb, 1);
        this.wsr.client_datatype = 1;
        rt = this.wsr.ws_readBlock(port, 13 * 4, obj);
        if (rt < 0) this.$message.error("卡片类型错误");
        // layui.use('layer', function () {
        //     var layer = layui.layer;
        //     layer.msg('卡片类型错误');
        // });
        else {
          rt = this.wsr.ws_initValue(port, block, v1);
          this.wsr.ws_writeBlock(
            port,
            2 * 4,
            "00000000000000000000000000000000"
          );
          this.wsr.ws_writeBlock(port, 9, "00000000000000000000000000000000");
          this.wsr.ws_writeBlock(
            port,
            3 * 4,
            "00000000000000000000000000000000"
          );
          this.wsr.ws_writeBlock(
            port,
            4 * 4,
            "00000000000000000000000000000000"
          );
          this.wsr.ws_writeBlock(port, 17, "00000000000000000000000000000000");
          this.wsr.ws_writeBlock(
            port,
            5 * 4,
            "00000000000000000000000000000000"
          );
          this.wsr.ws_writeBlock(
            port,
            6 * 4,
            "00000000000000000000000000000000"
          );
          this.wsr.ws_writeBlock(
            port,
            13 * 4,
            "00000000000000000000000000000000"
          );
          rt = this.wsr.ws_changeKey(
            port,
            2,
            "FFFFFFFFFFFF",
            "FF078069",
            "FFFFFFFFFFFF"
          );
          this.wsr.ws_changeKey(
            port,
            3,
            "FFFFFFFFFFFF",
            "FF078069",
            "FFFFFFFFFFFF"
          );
          this.wsr.ws_changeKey(
            port,
            4,
            "FFFFFFFFFFFF",
            "FF078069",
            "FFFFFFFFFFFF"
          );
          this.wsr.ws_changeKey(
            port,
            5,
            "FFFFFFFFFFFF",
            "FF078069",
            "FFFFFFFFFFFF"
          );
          this.wsr.ws_changeKey(
            port,
            6,
            "FFFFFFFFFFFF",
            "FF078069",
            "FFFFFFFFFFFF"
          );
          this.wsr.ws_changeKey(
            port,
            13,
            "FFFFFFFFFFFF",
            "FF078069",
            "FFFFFFFFFFFF"
          );
          if (rt > 0) {
            this.$message.success("清除成功");
            
            // layui.use('layer', function () {
            //     var layer = layui.layer;
            //     layer.msg('清除成功');
            // });
          }
        }
      } finally {
        this.wsr.ws_closePort(port);
      }
    },
    //发卡标签
    // sendLabel(obj) {
    //   var rt = 0;
    //   var port = 0;
    //   var keyType = 0;
    //   var key = "FFFFFFFFFFFF";
    //   var v1 = 5000,
    //     v2 = 0;
    //   var block = 12;
    //   var delaytime = 2;
    //   var objs = { cardno: "", uid: "", len: 0 };
    //   rt = this.wsr.ws_openPort(port);
    //   console.log("open:" + rt);
    //   try {
    //     this.wsr.ws_set_mode(this.wsr.MODE_TIMEOUT, 300);
    //     this.wsr.ws_beep(port);
    //     rt = this.wsr.ws_getCardNo_String(port, objs);
    //     if (rt < 0) {
    //       this.$message.warning("请放入卡片");
    //       return rt;
    //     }
    //     rt = this.wsr.ws_loadKey(port, key, 0);
    //     rt = this.wsr.ws_readBlock(port, 13 * 4, objs);
    //     if (rt < 0) {
    //       this.$message.error("卡类型错误或该卡已有数据");
    //       return rt;
    //     }
    //     rt = this.wsr.client_datatype = 1;
    //     this.$http
    //       .post(`/send/getAppId?appId=${objs.cardno}&type=2`)
    //       .then((res) => {
    //         console.log(res.data.data);
    //         if (res.data.data < 1) {
    //           this.$http
    //             .post(`/send/updateCarTuckComb?appId=${objs.cardno}&id=${obj}`)
    //             .then((val) => {
    //               console.log("--------------");
    //               console.log(val);
    //               let checkCode = val.data.checkCode;
    //               let regId = val.data.regId;
    //               let gasId = val.data.gasId;
    //               let unit = val.data.unit;
    //               let checkStatus = val.data.status;
    //               let times = val.data.times;
    //               let date = val.data.date;
    //               console.log("====================");
    //               console.log(checkCode);
    //               console.log(regId);
    //               rt = this.wsr.ws_openPort(port);
    //               rt = this.wsr.ws_verifyKey(port, key, 0);
    //               rt = this.wsr.ws_writeBlock(port, 4, checkCode);
    //               rt = this.wsr.ws_writeBlock(port, 8, regId);
    //               if (regId.length > 32) {
    //                 regId = regId.substring(32);
    //                 this.wsr.ws_writeBlock(port, 9, regId);
    //               } else if (regId.length > 64) {
    //                 regId = regId.substring(64);
    //                 this.wsr.ws_writeBlock(port, 10, regId);
    //               }
    //               rt = this.wsr.ws_writeBlock(port, 12, gasId);
    //               if (gasId.length > 32) {
    //                 gasId = gasId.substring(32);
    //                 this.wsr.ws_writeBlock(port, 13, gasId);
    //               } else if (gasId.length > 64) {
    //                 gasId = gasId.substring(64);
    //                 this.wsr.ws_writeBlock(port, 14, gasId);
    //               }
    //               rt = this.wsr.ws_writeBlock(port, 16, unit);
    //               if (unit.length > 32) {
    //                 unit = unit.substring(32);
    //                 this.wsr.ws_writeBlock(port, 17, unit);
    //               } else if (unit.length > 64) {
    //                 unit = unit.substring(64);
    //                 this.wsr.ws_writeBlock(port, 18, unit);
    //               }
    //               rt = this.wsr.ws_writeBlock(port, 20, times);
    //               if (times.length > 32) {
    //                 times = times.substring(32);
    //                 this.wsr.ws_writeBlock(port, 21, times);
    //               } else if (times.length > 64) {
    //                 times = unit.substring(64);
    //                 this.wsr.ws_writeBlock(port, 22, times);
    //               }
    //               rt = this.wsr.ws_writeBlock(port, 24, checkStatus);
    //               if (checkStatus.length > 32) {
    //                 checkStatus = checkStatus.substring(32);
    //                 this.wsr.ws_writeBlock(port, 25, checkStatus);
    //               } else if (checkStatus.length > 64) {
    //                 checkStatus = unit.substring(64);
    //                 this.wsr.ws_writeBlock(port, 26, checkStatus);
    //               }
    //               rt = this.wsr.ws_writeBlock(port, 52, date);
    //               rt = this.wsr.ws_changeKey(
    //                 port,
    //                 2,
    //                 "837210987622",
    //                 "7F078869",
    //                 "12BBADDAEA11"
    //               );
    //               this.wsr.ws_changeKey(
    //                 port,
    //                 3,
    //                 "837210987622",
    //                 "7F078869",
    //                 "12BBADDAEA11"
    //               );
    //               this.wsr.ws_changeKey(
    //                 port,
    //                 4,
    //                 "837210987622",
    //                 "7F078869",
    //                 "12BBADDAEA11"
    //               );
    //               this.wsr.ws_changeKey(
    //                 port,
    //                 5,
    //                 "837210987622",
    //                 "7F078869",
    //                 "12BBADDAEA11"
    //               );
    //               this.wsr.ws_changeKey(
    //                 port,
    //                 6,
    //                 "837210987622",
    //                 "7F078869",
    //                 "12BBADDAEA11"
    //               );
    //               this.wsr.ws_changeKey(
    //                 port,
    //                 13,
    //                 "837210987622",
    //                 "7F078869",
    //                 "12BBADDAEA11"
    //               );
    //               if (rt > 0) {
    //                 this.$message.success("发卡成功");
    //               }
    //             });
    //         } else {
    //           this.$message.warning("标签号已存在");
    //         }
    //       });
    //   } finally {
    //     this.wsr.ws_closePort(port);
    //   }
    // },
    
    Editusertion() {
      this.getUserlist();
    },
    // // 编辑用户发送请求
    // async EditUser() {
    //   //   users/:id
    //   this.dialogFormVisibleEdit = false;
    //   const res = await this.$http.put(
    //     `users/${this.editUserForm.id},this.editUserForm`
    //   );
    //   //  const { data: res } = await this.$http.get(`users/` + id)
    //   if (res.data.meta.status !== 200) {
    //     return this.$message.error("查询用户信息失败！");
    //   }
    // },

    //  标签发卡
    sendLabel(obj) {
      var rt = 0;
      var port = 0;
      var keyType = 0;
      var key = "FFFFFFFFFFFF";
      var v1 = 5000,
        v2 = 0;
      var block = 12;
      var delaytime = 2;
      var objs = { cardno: "", uid: "", len: 0 };
      rt = this.wsr.ws_openPort(port);
      console.log("open:" + rt);
      try {
        this.wsr.ws_set_mode(this.wsr.MODE_TIMEOUT, 300);
        this.wsr.ws_beep(port);
        rt = this.wsr.ws_getCardNo_String(port, objs);
        if (rt < 0) {
          this.$message.warning("请放入卡片");
          return rt;
        }
        rt = this.wsr.ws_loadKey(port, key, 0);
        rt = this.wsr.ws_readBlock(port, 13 * 4, objs);
        if (rt < 0) {
          this.$message.error("卡类型错误或该卡已有数据");

          return rt;
        }
        rt = this.wsr.client_datatype = 1;
        this.$http
          .post(`/send/getAppId?appId=${objs.cardno}&type=3`)
          .then((res) => {
            console.log(res);
            if (res.data.data < 1) {
              this.$http
                .post(
                  `/send/updateIndustrialTuckComb?appId=${objs.cardno}&id=${obj}`
                )
                .then((val) => {
                  console.log(val);
                  let regId = val.data.regId;
                  let gasId = val.data.gasId;
                  let unit = val.data.unit;
                  let buildingUser = val.data.buildingUser;
                  let checkStatus = val.data.status;
                  let date = val.data.date;
                  let checkCode = val.data.checkCode;
                  rt = this.wsr.ws_openPort(port);
                  rt = this.wsr.ws_verifyKey(port, key, 0);
                  //  rt =this.wsr.ws_writeBlock(port, 4, checkCode)
                  rt = this.wsr.ws_writeBlock(port, 8, regId);
                  if (regId.length > 32) {
                    regId = regId.substring(32);
                    this.wsr.ws_writeBlock(port, 9, regId);
                  } else if (regId.length > 64) {
                    regId = regId.substring(64);
                    this.wsr.ws_writeBlock(port, 10, regId);
                  }
                  rt = this.wsr.ws_writeBlock(port, 12, gasId);
                  if (gasId.length > 32) {
                    gasId = gasId.substring(32);
                    this.wsr.ws_writeBlock(port, 13, gasId);
                  } else if (gasId.length > 64) {
                    gasId = gasId.substring(64);
                    this.wsr.ws_writeBlock(port, 14, gasId);
                  }
                  rt = this.wsr.ws_writeBlock(port, 16, unit);
                  if (unit.length > 32) {
                    unit = unit.substring(32);
                    this.wsr.ws_writeBlock(port, 17, unit);
                  } else if (unit.length > 64) {
                    unit = unit.substring(64);
                    this.wsr.ws_writeBlock(port, 18, unit);
                  }
                  rt = this.wsr.ws_writeBlock(port, 20, buildingUser);
                  if (buildingUser.length > 32) {
                    buildingUser = buildingUser.substring(32);
                    this.wsr.ws_writeBlock(port, 21, buildingUser);
                  } else if (buildingUser.length > 64) {
                    buildingUser = buildingUser.substring(64);
                    this.wsr.ws_writeBlock(port, 22, buildingUser);
                  }
                  rt = this.wsr.ws_writeBlock(port, 24, checkStatus);
                  if (checkStatus.length > 32) {
                    checkStatus = checkStatus.substring(32);
                    this.wsr.ws_writeBlock(port, 25, checkStatus);
                  } else if (checkStatus.length > 64) {
                    checkStatus = unit.substring(64);
                    this.wsr.ws_writeBlock(port, 26, checkStatus);
                  }
                  rt = this.wsr.ws_writeBlock(port, 52, date);
                  rt = this.wsr.ws_changeKey(
                    port,
                    2,
                    "837210987622",
                    "7F078869",
                    "12BBADDAEA11"
                  );
                  this.wsr.ws_changeKey(
                    port,
                    3,
                    "837210987622",
                    "7F078869",
                    "12BBADDAEA11"
                  );
                  this.wsr.ws_changeKey(
                    port,
                    4,
                    "837210987622",
                    "7F078869",
                    "12BBADDAEA11"
                  );
                  this.wsr.ws_changeKey(
                    port,
                    5,
                    "837210987622",
                    "7F078869",
                    "12BBADDAEA11"
                  );
                  this.wsr.ws_changeKey(
                    port,
                    6,
                    "837210987622",
                    "7F078869",
                    "12BBADDAEA11"
                  );
                  this.wsr.ws_changeKey(
                    port,
                    13,
                    "837210987622",
                    "7F078869",
                    "12BBADDAEA11"
                  );
                  if (rt > 0) {
                    this.$message.success("发卡成功");
                    this.getUserlist();
                  }
                });
            } else {
              this.$message.warning("标签号已存在");
            }
          });
      } finally {
        this.wsr.ws_closePort(port);
      }
    },
    //补卡标签
    // reissueLabel(obj) {
    //   var rt = 0;
    //   var port = 0;
    //   var keyType = 0;
    //   var key = "FFFFFFFFFFFF";
    //   var v1 = 5000,
    //     v2 = 0;
    //   var block = 12;
    //   var delaytime = 2;
    //   var objs = { cardno: "", uid: "", len: 0 };
    //   rt = this.wsr.ws_openPort(port);
    //   console.log("open:" + rt);
    //   try {
    //     this.wsr.ws_set_mode(this.wsr.MODE_TIMEOUT, 300);
    //     this.wsr.ws_beep(port);
    //     rt = this.wsr.ws_getCardNo_String(port, objs);
    //     if (rt < 0) {
    //       this.$message.warning("请放入卡片");
    //       return rt;
    //     }
    //     rt = this.wsr.ws_loadKey(port, key, 0);
    //     rt = this.wsr.ws_readBlock(port, 13 * 4, objs);
    //     if (rt < 0) {
    //       this.$message.error("卡类型错误或该卡已有数据");
    //       return rt;
    //     }
    //     rt = this.wsr.client_datatype = 1;
    //     this.$http.post(`/send/fillCarTuckComb?id=${obj}`).then((res) => {
    //       console.log(res);
    //       let checkCode = res.data.checkCode;
    //       let regId = res.data.regId;
    //       let gasId = res.data.gasId;
    //       let unit = res.data.unit;
    //       let checkStatus = res.data.status;
    //       let times = res.data.times;
    //       let date = res.data.date;
    //       rt = this.wsr.ws_openPort(port);
    //       rt = this.wsr.ws_verifyKey(port, key, 0);
    //       rt = this.wsr.ws_writeBlock(port, 4, checkCode);
    //       rt = this.wsr.ws_writeBlock(port, 8, regId);
    //       if (regId.length > 32) {
    //         regId = regId.substring(32);
    //         this.wsr.ws_writeBlock(port, 9, regId);
    //       } else if (regId.length > 64) {
    //         regId = regId.substring(64);
    //         this.wsr.ws_writeBlock(port, 10, regId);
    //       }
    //       rt = this.wsr.ws_writeBlock(port, 12, gasId);
    //       if (gasId.length > 32) {
    //         gasId = gasId.substring(32);
    //         this.wsr.ws_writeBlock(port, 13, gasId);
    //       } else if (gasId.length > 64) {
    //         gasId = gasId.substring(64);
    //         this.wsr.ws_writeBlock(port, 14, gasId);
    //       }
    //       rt = this.wsr.ws_writeBlock(port, 16, unit);
    //       if (unit.length > 32) {
    //         unit = unit.substring(32);
    //         this.wsr.ws_writeBlock(port, 17, unit);
    //       } else if (unit.length > 64) {
    //         unit = unit.substring(64);
    //         this.wsr.ws_writeBlock(port, 18, unit);
    //       }
    //       rt = this.wsr.ws_writeBlock(port, 20, times);
    //       if (times.length > 32) {
    //         times = times.substring(32);
    //         this.wsr.ws_writeBlock(port, 21, times);
    //       } else if (times.length > 64) {
    //         times = unit.substring(64);
    //         this.wsr.ws_writeBlock(port, 22, times);
    //       }
    //       rt = this.wsr.ws_writeBlock(port, 24, checkStatus);
    //       if (checkStatus.length > 32) {
    //         checkStatus = checkStatus.substring(32);
    //         this.wsr.ws_writeBlock(port, 25, checkStatus);
    //       } else if (checkStatus.length > 64) {
    //         checkStatus = unit.substring(64);
    //         this.wsr.ws_writeBlock(port, 26, checkStatus);
    //       }
    //       rt = this.wsr.ws_writeBlock(port, 52, date);
    //       rt = this.wsr.ws_changeKey(
    //         port,
    //         2,
    //         "837210987622",
    //         "7F078869",
    //         "12BBADDAEA11"
    //       );
    //       this.wsr.ws_changeKey(
    //         port,
    //         3,
    //         "837210987622",
    //         "7F078869",
    //         "12BBADDAEA11"
    //       );
    //       this.wsr.ws_changeKey(
    //         port,
    //         4,
    //         "837210987622",
    //         "7F078869",
    //         "12BBADDAEA11"
    //       );
    //       this.wsr.ws_changeKey(
    //         port,
    //         5,
    //         "837210987622",
    //         "7F078869",
    //         "12BBADDAEA11"
    //       );
    //       this.wsr.ws_changeKey(
    //         port,
    //         6,
    //         "837210987622",
    //         "7F078869",
    //         "12BBADDAEA11"
    //       );
    //       this.wsr.ws_changeKey(
    //         port,
    //         13,
    //         "837210987622",
    //         "7F078869",
    //         "12BBADDAEA11"
    //       );
    //       if (rt > 0) {
    //         this.$message.success("补卡成功");
    //       }
    //     });
    //   } finally {
    //     this.wsr.ws_closePort(port);
    //   }
    // },
    // //清空标签卡数据
    // ClearLabel() {
    //   var passworda = "837210987622";
    //   var passwordb = "12BBADDAEA11";
    //   var rt = 0;
    //   var port = 0;
    //   var keyType = 0;
    //   var key = passworda;
    //   var keyb = passwordb;
    //   var v1 = 5000,
    //     v2 = 0;
    //   var block = 12;
    //   var delaytime = 2;
    //   var obj = { cardno: "", uid: "", len: 0 };
    //   rt = this.wsr.ws_openPort(port);
    //   console.log("open:" + rt);
    //   try {
    //     this.wsr.ws_set_mode(this.wsr.MODE_TIMEOUT, 300);
    //     this.wsr.ws_beep(port);
    //     rt = this.wsr.ws_getCardNo_String(port, obj);
    //     if (rt < 0) {
    //       this.$message.warning("请放入卡片！");
    //       return rt;
    //     }
    //     rt = this.wsr.ws_loadKey(port, key, 0);
    //     rt = this.wsr.ws_loadKey(port, keyb, 1);
    //     this.wsr.client_datatype = 1;
    //     rt = this.wsr.ws_readBlock(port, 13 * 4, obj);
    //     if (rt < 0) this.$message.error("卡片类型错误");
    //     else {
    //       rt = this.wsr.ws_initValue(port, block, v1);
    //       this.wsr.ws_writeBlock(
    //         port,
    //         2 * 4,
    //         "00000000000000000000000000000000"
    //       );
    //       this.wsr.ws_writeBlock(port, 9, "00000000000000000000000000000000");
    //       this.wsr.ws_writeBlock(
    //         port,
    //         3 * 4,
    //         "00000000000000000000000000000000"
    //       );
    //       this.wsr.ws_writeBlock(
    //         port,
    //         4 * 4,
    //         "00000000000000000000000000000000"
    //       );
    //       this.wsr.ws_writeBlock(port, 17, "00000000000000000000000000000000");
    //       this.wsr.ws_writeBlock(
    //         port,
    //         5 * 4,
    //         "00000000000000000000000000000000"
    //       );
    //       this.wsr.ws_writeBlock(
    //         port,
    //         6 * 4,
    //         "00000000000000000000000000000000"
    //       );
    //       this.wsr.ws_writeBlock(
    //         port,
    //         13 * 4,
    //         "00000000000000000000000000000000"
    //       );
    //       rt = this.wsr.ws_changeKey(
    //         port,
    //         2,
    //         "FFFFFFFFFFFF",
    //         "FF078069",
    //         "FFFFFFFFFFFF"
    //       );
    //       this.wsr.ws_changeKey(
    //         port,
    //         3,
    //         "FFFFFFFFFFFF",
    //         "FF078069",
    //         "FFFFFFFFFFFF"
    //       );
    //       this.wsr.ws_changeKey(
    //         port,
    //         4,
    //         "FFFFFFFFFFFF",
    //         "FF078069",
    //         "FFFFFFFFFFFF"
    //       );
    //       this.wsr.ws_changeKey(
    //         port,
    //         5,
    //         "FFFFFFFFFFFF",
    //         "FF078069",
    //         "FFFFFFFFFFFF"
    //       );
    //       this.wsr.ws_changeKey(
    //         port,
    //         6,
    //         "FFFFFFFFFFFF",
    //         "FF078069",
    //         "FFFFFFFFFFFF"
    //       );
    //       this.wsr.ws_changeKey(
    //         port,
    //         13,
    //         "FFFFFFFFFFFF",
    //         "FF078069",
    //         "FFFFFFFFFFFF"
    //       );
    //       if (rt > 0) {
    //         this.$message.success("清除成功");
    //       }
    //     }
    //   } finally {
    //     this.wsr.ws_closePort(port);
    //   }
    // },

    //清除员工卡数据
    // Clearstaff() {
    //   var passa = "ABCDEABBCC12";
    //   var passb = "CCABEAAAEE21";
    //   var rt = 0;
    //   var port = 0;
    //   var keyType = 0;
    //   var keytype2 = 1;
    //   var key = passa;
    //   var keyb = passb;
    //   var v1 = 5000,
    //     v2 = 0;
    //   var block = 12;
    //   var delaytime = 2;
    //   var obj = { cardno: "", uid: "", len: 0 };
    //   rt = this.wsr.ws_openPort(port);
    //   console.log("open:" + rt);
    //   try {
    //     this.wsr.ws_set_mode(this.wsr.MODE_TIMEOUT, 300);
    //     this.wsr.ws_beep(port);
    //     rt = this.wsr.ws_getCardNo_String(port, obj);
    //     if (rt < 0) {
    //       this.$message.warning("请放入卡片！");
    //       return rt;
    //     }
    //     rt = this.wsr.ws_loadKey(port, key, keyType);
    //     rt = this.wsr.ws_loadKey(port, keyb, keytype2);
    //     this.wsr.client_datatype = 1;
    //     rt = this.wsr.ws_readBlock(port, 12 * 4, obj);
    //     if (rt < 0) this.$message.error("卡片类型错误！");
    //     else {
    //       rt = this.wsr.ws_writeBlock(
    //         port,
    //         12 * 4,
    //         "00000000000000000000000000000000"
    //       );
    //       rt = this.wsr.ws_changeKey(
    //         port,
    //         12,
    //         "FFFFFFFFFFFF",
    //         "FF078069",
    //         "FFFFFFFFFFFF"
    //       );
    //       if (rt > 0) {
    //         this.$message.success("清除成功");
    //       }
    //     }
    //   } finally {
    //     this.wsr.ws_closePort(port);
    //   }
    // },

    //删除用户 打开消息盒子
    showDeleUserMsgBox(userId) {
      // 提示框 点击确定走.then
      // 点取消 走.catch
      this.$confirm("删除用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          // 注意async的位置，最近的位置
          // 发送删除请求:id:用户id
          // 1.data中找userId
          // 2.把userID以showDeleUserMsgBox参数形式传进来
          const res = await this.$http.delete(`users/${userId}`);
          if (res.data.meta.status === 200) {
            // 回到第一页展示
            //this.pagenum = 1;
            // 重新请求数据
            this.getUserlist();
            // 提示
            this.$message({
              type: "success",
              message: res.data.meta.msg,
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    //   添加用户发送请求
    // async AddUser() {
    //   // 2.关闭对话框
    //   this.dialogFormVisibleAdd = false;
    //   const res = await this.$http.post(`users`, this.form);
    //   const {
    //     meta: { status, msg },
    //     data
    //   } = res.data;
    //   if (status === 201) {
    //     //    1.提示成功
    //     // this.$message.success(msg);

    //     // 3.更新视图
    //     this.getUserlist();
    //     // 4.清空文本框
    //     // 直接清空文本框
    //     // this.form={}
    //     // 遍历清空
    //     for (const key in this.form) {
    //       if (this.form.hasOwnProperty(key)) {
    //         this.form[key] = "";
    //       }
    //     }
    //   } else {
    //     this.$message.warning(msg);
    //   }
    // },
    qingshowAddUserDia() {
      console.log(1);
    },
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
    async searchUser() {
      if (this.isCard != "") {
        this.isCard = Number(this.isCard);
      }
      const res = await this.$http.get(
        `/industrial/findPage?page=${this.page}&rows=${this.pagesize}&buildingUser=${this.buildingUser}&regId=${this.regId}&gasId=${this.gasId}&isCard=${this.isCard}&medium=${this.medium}`
      );
      console.log(res);
      this.userlist = res.data.data.list;
      this.total = res.data.data.totalCount;
      // console.log("aaaaaa");
    },
    //分页功能
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      // 1.每页显示条数的改变
      this.pagesize = val;
      // 回到第一页
      this.pagenum = 1;
      // 希望当页条数改变时 从第一页开始显示 this.pagenum = 1 -》currPage=1?
      this.getUserlist();
    },
    handleCurrentChange(val) {
      //页码改变时
      console.log(`当前页: ${val}`);
      this.pagenum = val;
      this.getUserlist();
    },
    async getUserlist() {
      //需要授权的API ，必须在请求头中使用Authorization 字段token令牌
      //pagenum当前页面   pagesize每页显示条数
      //接口文档中 除了登录接口之外的所有请求都需要进行授权，设置请求头
      //找axios中关于请求头的代码  写在了http.js中
      // const AUTH_TOKEN = localStorage.getItem("token");
      // this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;
      let access_token = sessionStorage.getItem("access_token");
      let decode = jwtDecode(access_token);
      console.log(decode);
      this.token = decode.authorities;
      const res = await this.$http.get(
        `/industrial/findPage?page=${this.pagenum}&rows=${this.pagesize}&buildingUser=${this.buildingUser}&regId=${this.regId}&gasId=${this.gasId}&isCard=${this.isCard}&medium=${this.medium}`
      );
      console.log(res);
      this.userlist = res.data.data.list;
      this.total = res.data.data.totalCount;
    },
  },
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

.input-serach {
  width: 400px;
}
[class*="el-col-"] {
  margin-top: 5px;
}
.el_button {
  background-color: #66b1ff !important;
  border-color: #66b1ff !important;
  color: #fff !important;
}
</style>