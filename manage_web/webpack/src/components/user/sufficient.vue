<template>
  <div>
    <div style="background: white; width: 99.1%; padding-left: 15px">
      <my-bread
        level1="单位登记"
        level2="人员登记"
        level3="员工卡发卡"
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
            查询姓名
          </h5>
        </el-col>

        <el-col style="padding-left: 15px" :span="22">
          <el-col :span="4">
            <el-input
              size="small"
              style="width: 100%"
              @clear="loadUserList()"
              clearable
              class="input-serach"
              placeholder="请输入姓名"
              v-model="username"
              @input="searchUser"
            ></el-input>
          </el-col>

          <el-col style="padding-left: 15px" :span="4">
            <el-select
              filterable
              @clear="loadUserList()"
              clearable
              size="small"
              style="width: 100%"
              @input="searchUser()"
              v-model="unitId"
              placeholder="单位名称"
            >
              <el-option
                v-for="item in select"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-col>

          <el-col style="padding-left: 15px" :span="4">
            <el-select
              filterable
              @clear="loadUserList()"
              clearable
              size="small"
              style="width: 100%"
              @input="searchUser()"
              v-model="cardInformation"
              placeholder="是否发卡"
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

      <el-col style="margin-bottom: 10px; margin-top: 10px" :span="24">
        <el-col :span="20">&nbsp;</el-col>
        <el-col :span="2">
          <el-button type="success" @click="Clearstaff()" size="small"
            >清空员工卡</el-button
          >
        </el-col>
        <!-- <el-col :span="2">
          <el-button type="success" @click="showAddUserDia()"  size="small">
            <i style="padding-right:10px" class="el-icon-plus"></i>新增
          </el-button>
        </el-col>-->
      </el-col>
      <!-- 表格 -->
      <template>
        <el-table
          class="tableClass"
          border
          :data="userlist"
          style="width: 100%; margin: 20px 0px; padding-bottom: 40px"
          :row-style="{ height: '40px' }"
          :cell-style="{ padding: '0px' }"
        >
          <el-table-column
            type="index"
            label="序号"
            width="50"
            style="line-height: 30px"
          ></el-table-column>

          <el-table-column
            prop="username"
            label="员工姓名"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="code"
            label="员工编号"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="phone"
            label="联系电话"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="idCard"
            label="身份证"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="unitName"
            label="单位名称"
            show-overflow-tooltip
          ></el-table-column>

          <el-table-column
            prop="labelNo"
            label="标签号"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="noDateEnd"
            label="到期时间"
            show-overflow-tooltip
          >
            <template slot-scope="socpe">{{
              socpe.row.noDateEnd | fmtdate
            }}</template>
          </el-table-column>
          <el-table-column prop="isCard" label="是否发卡" show-overflow-tooltip>
            <template slot-scope="scope">
              <p v-if="userlist[scope.$index].isCard == 0">未发卡</p>
              <p v-if="userlist[scope.$index].isCard == 1">已发卡</p>
            </template>
          </el-table-column>
          <!-- noDateEnd -->
          <el-table-column
            prop="cardInformation"
            label="发卡信息"
            show-overflow-tooltip
          >
          </el-table-column>
          <!-- 表格操作 -->
          <el-table-column prop="address" label="操 作">
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
            </template>
          </el-table-column>
        </el-table>
      </template>
     <!-- 分页 -->
      <el-pagination
        style="
          padding: 5px 15px 15px 15px;
          display: flex;
          justify-content: flex-end;
        "
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currPage"
        :page-sizes="[10, 15, 20, 25, 30, 35]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>

    </el-card>
  </div>
</template>
<script>
import jwtDecode from "jwt-decode";
export default {
  name: "filling",
  data() {
    return {
      username: "",
      wsr: "",
      value: "",
      userlist: [],
      token: [],
      //分页相关数据
      total: -1,
      currPage: 1,
      page: 1,
      unitId: "",
      cardInformation: "",
      html: "",
      userId: "",
      optionslei: [
        {
          id: 0,
          lei: "未发卡",
        },
        {
          id: 1,
          lei: "已发卡",
        },
      ],
      pageSize: 10,
      // 添加对话框的属性
      // dialogFormVisibleAdd: false,
      select: [],
    };
  },
  watch: {
    dialogFormVisibleAdd: function (val, oldVla) {
      this.$refs["form"].resetFields();
    },
  },
  created() {
    this.getUserlist();
    this.suosudan();
    // wsr.init()
    // console.log(wsrProxy.init());
  },
  mounted() {
    this.wsr = wsrProxy;
    this.wsr.init();
    this.getUserlist();
  },
  methods: {
    // 标签发卡
    sendLabel(obj) {
      var rt = 0;
      var port = 0;
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
        console.log(rt);
        if (rt < 0) {
          this.$message.error("请放入卡片");
          return rt;
        }
        rt = this.wsr.ws_loadKey(port, key, 0);
        console.log(rt);
        rt = this.wsr.ws_readBlock(port, 13 * 4, objs);
        if (rt < 0) {
          this.$message.error("卡类型错误或该卡已有数据");
          return rt;
        }
        rt = this.wsr.client_datatype = 1;
         console.log(rt);
        let username = sessionStorage.getItem("username");
        this.$http
          .post(`/sendCard/getAppId?appId=${objs.cardno}&type=1`)
          .then((res) => {
            console.log(res);
            if (res.data.data < 1) {
              this.$http
                .post(
                  `/sendCard/updateTuckComb?labelNo=${objs.cardno}&id=${obj}&username=${username}`
                )
                .then((data) => {
                  console.log(data);
                  if (data.data.code != 0) {
                     rt = this.wsr.ws_openPort(port);
                    let dataTotal = data.data.data.dataTotal;
                    console.log(dataTotal);
                    let checkCode = data.data.data.checkCode;
                    console.log(checkCode);
                    rt = this.wsr.ws_loadKey(port, key, 0);
                    console.log(rt);
                    rt = this.wsr.ws_writeBlock(port, 4, checkCode);
                    this.wsr.ws_writeBlock(port, 48, dataTotal);
                    console.log(rt);
                    // this.wsr.ws_verifyKey(port, key, 0, 12);
                    rt = this.wsr.ws_changeKey(
                      port,
                      12,
                      'ABCDEABBCC12',
                      "7F078869",
                      'CCABEAAAEE21'
                    );
                    console.log(rt);
                    if (rt > 0) {
                      this.$message({
                        type: "success",
                        message: data.data.msg,
                      });
                      this.getUserlist(); //刷新页面
                    }
                  } else {
                    this.$message({
                      type: "error",
                      message: data.data.msg,
                    });
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
    // 清空特权卡
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
          }
        }
      } finally {
        this.wsr.ws_closePort(port);
      }
    },
    async suosudan() {
      const res = await this.$http.get(`/unit/findUnit`);
      console.log(res);
      this.select = res.data.data;
      //  /public/gas/manageGasBasicCylinder/affiliated/company
    },
    // 发卡对话框打开
    async showEdituser(rowid) {
      let tokens = this.token;
      let token = sessionStorage.getItem("access_token");
      let unitId = sessionStorage.getItem("unitId");
      let username = sessionStorage.getItem("username");
      console.log(username);
      const res = await this.$http.post(`send/sendService`, tokens);
      console.log(res);
      if (res.data.code == 201) {
        this.$message({
          type: "error",
          message: res.data.msg,
        });
      } else {
        let http = res.data.data;
        window.open(
          `${http}/sendCard/tuckComb?unitId=${unitId}&username=${username}`,
          "_blank"
        );
      }
    },
    // 发卡
    EditUser() {
      debugger;
      var wsr = wsrProxy;
      console.log(wsr);
      wsr.init();
      var rt = 0; //返回值
      var port = 0; //端口号
      var keyType = 0; //密码类型
      var key = "FFFFFFFFFFFF"; //密码
      var v1 = 5000,
        v2 = 0; // var block = 12; //块号
      var block = 5; //块号
      var delaytime = 5; // 峰鸣时长
      var obj = { cardno: "", uid: "", len: 0 };
      // 打开端口
      rt = wsr.ws_openPort(port);
      console.log(rt);
      // ----------一个个方法去调通就好了
      // try {
      wsr.ws_set_mode(wsr.MODE_TIMEOUT, 1000);

      wsr.ws_beep(port);
      rt = wsr.ws_getCardNo_String(port, obj);
      // if (rt < 0) {
      //   alert("请放入卡片");
      //   return rt;
      // }
      if (rt < 0) return rt;
      rt = wsr.ws_beepex(port, delaytime);
      if (rt < 0) return rt;

      // 读取设备唯一序列号
      rt = wsr.ws_get_dev_id(port, obj);
      if (rt < 0) return rt;
      console.log("device id:" + obj.id);

      // 读取设备信息
      rt = wsr.ws_get_dev_info(port, obj);
      if (rt < 0) return rt;
      console.log("device info:" + obj.info);
      // } finally {
      wsr.ws_closePort(port);
      // }
      RefreshWin();
    },

    //   添加用户发送请求
    // async AddUser() {
    //   this.$refs.form.validate(async valid => {
    //     if (valid) {
    //       const res = await this.$http.post(`/no-user`, this.form);
    //       console.log(res);
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
    //         this.dialogFormVisibleAdd = false;
    //       } else {
    //         this.$message({
    //           type: "danger",
    //           message: "新增失败"
    //         });
    //         this.dialogFormVisibleAdd = true;
    //       }
    //     } else {
    //       this.$message({
    //         type: "error",
    //         message: "请填写内容再试"
    //       });
    //       this.dialogFormVisibleAdd = true;
    //     }
    //   });
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
      // this.value = "";
      // this.query.vestingCode = "";
    },
    // 搜索用户 给搜索框绑定query v-model="query"
    async searchUser() {
      // if (this.username != "") {
  //  no-user/findPage?pageSize=${this.pageSize}&currPage=${this.currPage}&unitId=${this.unitId}&cardInformation=${this.cardInformation}
      const res = await this.$http.get(
        `no-user/findPage?pageSize=${this.pageSize}&currPage=${this.currPage}&username=${this.username}&unitId=${this.unitId}&isCard=${this.cardInformation}`
      );
      console.log(res);
      if (res.data.code === 0) {
        // 回到第一页展示
        //this.pagenum = 1;
        // 重新请求数据

        this.userlist = res.data.data.list;
        this.total = res.data.data.totalCount;
        // this.$message({
        //   type: "success",
        //   message: res.data.msg
        // });
      }
      // else {
      //   this.$message({
      //     type: "danger",
      //     message: "查询失败"
      //   });
      // }
      // console.log("aaaaaa");
      // }
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
      let access_token = sessionStorage.getItem("access_token");
      let decode = jwtDecode(access_token);
      console.log(decode);
      this.token = decode.authorities;
      //  this.unitIds = sessionStorage.getItem("unitId");
      const res = await this.$http.get(
        `no-user/findPage?pageSize=${this.pageSize}&currPage=${this.currPage}&unitId=${this.unitId}&isCard=${this.cardInformation}`
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
/* .el-table__row{
  height: 20px !important;
} */

.el-table .warning-row {
  background: rgb(250, 249, 249) !important;
}

.el-table .success-row {
  background: rgb(250, 249, 249) !important;
}
.el-card__body {
  padding: 0;
}
</style>