<template>
  <div>
    <div style="background:white;width:99.1%;padding-left:15px">
      <my-bread level1="单位登记" level2="人员管理" level3="加气站特权发卡"></my-bread>
    </div>
    <el-card class="box-card" style="margin:20px 20px 0 20px;">
      <!--搜索  -->
      <el-row>
        <el-col :span="24">
          <h5 style="border-bottom:1px solid #ece8e8;padding-bottom:15px;padding-left:15px">查询姓名</h5>
        </el-col>

        <el-col style="padding-left:15px" :span="22">
          <el-col style="padding-left:30px" :span="4">
            <el-date-picker
              size="small"
              style="width: 100%;"
              type="date"
              placeholder="开始时间"
              @clear="loadUserList()"
              value-format="yyyy-MM-dd"
              v-model="startTime"
              @input="searchUser()"
            ></el-date-picker>
          </el-col>

          <el-col style="padding-left:20px" class="line" :span="1">
            <p style="margin-top:8px;">至</p>
          </el-col>
          <el-col :span="4">
            <el-date-picker
              type="date"
              placeholder="结束时间"
              value-format="yyyy-MM-dd"
              v-model="endTime"
              size="small"
              style=" width: 100%;"
              @input="searchUser()"
            ></el-date-picker>
          </el-col>
          <el-col :span="1">&nbsp;</el-col>
          <el-col :span="4">
            <el-select
              v-model="form.sitePersonnelName"
              size="small"
              filterable
              placeholder="请选择所属单位"
            >
              <el-option v-for="item in level" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-col>

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
      </el-row>
      <el-col :span="24">
        <p
          style="width:100%;height:1px;background:rgb(236, 232, 232);margin:20px 0px 0px 0px;z-index:999"
        ></p>
      </el-col>

      <el-col style="margin-bottom:10px;margin-top:10px" :span="24">
        <el-col :span="20">&nbsp;</el-col>
        <el-col :span="2">
          <el-button type="success" @click="showEdituser()" size="small">标签卡发卡</el-button>
        </el-col>
      </el-col>
      <!-- 表格 -->
      <template>
        <el-table
          class="tableClass"
          border
          :data="userlist"
          style="width: 100%;margin:20px 0px;padding-bottom:40px"
          :row-style="{height:'40px'}"
          :cell-style="{padding:'0px'}"
        >
          <el-table-column type="index" label="序号" width="80" style="line-height:30px"></el-table-column>
          <el-table-column prop="name" label="所属单位" show-overflow-tooltip></el-table-column>
          <el-table-column prop="tagNumber" label="标签号" show-overflow-tooltip></el-table-column>
          <el-table-column prop="cardNumber" label="特权卡编号" show-overflow-tooltip></el-table-column>
          <el-table-column prop="startTime" label="发卡时间" show-overflow-tooltip>
            <template slot-scope="socpe">{{socpe.row.startTime | fmtdate}}</template>
          </el-table-column>
          <el-table-column prop="expireTime" label="到期时间" show-overflow-tooltip>
            <template slot-scope="socpe">{{socpe.row.expireTime | fmtdate}}</template>
          </el-table-column>

          <!-- 表格操作 -->
          <el-table-column prop="address" label="操 作">
            <template slot-scope="scope">
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
        style="padding:5px 15px 15px 15px;display:flex; justify-content: flex-end;"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currPage"
        :page-sizes="[10,15,20,25,30,35]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>

      <!-- 对话框 -->
      <!-- 添加对话框 -->
      <el-dialog
        title="添加用户"
        v-dialogDrag
        width="60%"
        ref="dialog__wrapper"
        :close-on-click-modal="false"
        :visible.sync="dialogFormVisibleAdd"
      >
        <el-form :model="form" :rules="rules" ref="form">
          <el-form-item label="特权卡编号(1-9)" label-width="140px" prop="cardNumber">
            <el-input maxlength="1" v-model="form.cardNumber" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="所属单位：" label-width="140px" prop="unitId">
            <el-select v-model="form.unitId" filterable placeholder="请选择所属单位">
              <el-option v-for="item in level" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="气瓶类型" label-width="140px" prop="sitePersonnelName">
            <el-select v-model="form.types" filterable placeholder="请选择气瓶类型">
              <el-option
                v-for="item in selectss"
                :key="item.id"
                :label="item.siteNames"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="加气次数" label-width="140px" prop="username">
            <el-input v-model="form.username" autocomplete="off"></el-input>
          </el-form-item>-->
          <el-form-item label="到期日期：" label-width="140px" prop="expireTime">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="form.expireTime"
              style="width: 100%;"
            ></el-date-picker>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
          <el-button type="primary" @click="AddUser()">保存并发卡</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
import jwtDecode from "jwt-decode";
import $ from "jquery";
import "../../assets/jquery-1.12.4.min.js";
// import { wsrProxy } from "./wsrProxy.min.js";
export default {
  name: "privilege",
  data() {
    return {
      endTime: "",
      startTime: "",
      unitName: "",
      value: "",
      userlist: [],
      //分页相关数据
      total: -1,
      currPage: 1,
      page: 1,
      pageSize: 10,
      // 添加对话框的属性
      dialogFormVisibleAdd: false,
      dialogFormVisibleEdit: false,
      // wsr,
      selectss: [
        {
          id: 0,
          siteNames: "车用气瓶",
        },
        {
          id: 1,
          siteNames: "液化气瓶",
        },
        {
          id: 2,
          siteNames: "工业气瓶",
        },
      ],
      level: [],
      type: 2,
      // dialogFormVisibleRoleshow: false,
      //添加用户的表单的数据
      form: {
        // phone: "",
        // labelNo: "",
        unitId: "",
        cardInformation: "",
        expireTime: "",
        // type:""
      },
      rules: {
        vestingName: [
          { required: true, message: "公司名称不能为空", trigger: "blur" },
        ],
        idcard: [
          { required: true, message: "身份证不能为空", trigger: "blur" },
          {
            pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
            message: "证件号码格式有误！",
          },
        ],
        userNo: [
          { required: true, message: "员工编号不能为空", trigger: "blur" },
        ],
        username: [
          { required: true, message: "员工姓名不能为空", trigger: "blur" },
          { min: 1, max: 1, message: "请输入特权卡编号" },
        ],
      },
      token: [],
    };
  },
  watch: {
    dialogFormVisibleAdd: function (val, oldVla) {
      this.$refs["form"].resetFields();
    },
  },
  created() {
    this.getUserlist();
    this.addDwei();
  },
  methods: {
    async showEdituser(userId) {
      let tokens = this.token;
      console.log(tokens);
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
          `${http}/sendCard/privilegeTuckComb?unitId=${unitId}&username=${username}`,
          "_blank"
        );
      }
    },
    async addDwei() {
      const res = await this.$http.get(`/unit/findUnit`);
      console.log(res);
      this.level = res.data.data;
    },
    //   添加用户发送请求
    async AddUser() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          const res = await this.$http.post(`/car/rivilege-card`, this.form);
          console.log(res);
          if (res.data.code === 0) {
            // 回到第一页展示
            //this.pagenum = 1;
            // 重新请求数据
            this.getUserlist();
            // 提示
            this.$message({
              type: "success",
              message: res.data.msg,
            });
            this.dialogFormVisibleAdd = false;
          } else {
            this.$message({
              type: "danger",
              message: "新增失败",
            });
            this.dialogFormVisibleAdd = true;
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
    // 添加用户显示对话框
    showAddUserDia() {
      // 先点编辑 再点添加 打开表单清空表单
      this.form = {};
      this.dialogFormVisibleAdd = true;
    },
    //清空搜索框搜索数据 点击清楚按钮清除数据重新发送请求
    loadUserList() {
      this.getUserlist();
      this.value = "";
      this.query.vestingCode = "";
    },
    showDeleUserMsgBox(userId) {
      this.$confirm("是否删除这条数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const res = await this.$http.delete(`/car/rivilege-card/${userId}`);
          console.log(res);
          if (res.data.code === 0) {
            this.getUserlist();
            // 提示
            this.$message({
              type: "success",
              message: res.data.msg,
            });
          } else {
            this.$message({
              type: "warning",
              message: res.data.msg,
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
    // 搜索用户 给搜索框绑定query v-model="query"
    async searchUser() {
      // if (this.username != "") {

      const res = await this.$http.get(
        `/car/rivilege-card/findPage?rows=${this.pageSize}&page=${this.page}&unitName=${this.unitName}&startTime=${this.startTime}&endTime=${this.endTime}`
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
      console.log(this.token);
      const res = await this.$http.get(
        `/car/rivilege-card/findPage?rows=${this.pageSize}&page=${this.currPage}&unitName=${this.unitName}&startTime=${this.startTime}&endTime=${this.endTime}`
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