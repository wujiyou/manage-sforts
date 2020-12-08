<template>
  <div>
    <div style="background:white;width:99.1%;padding-left:15px">
      <my-bread level1="预警管理" level2="告警信息" level3="人员到期预警"></my-bread>
    </div>
    <el-card class="box-card" style="margin:20px 20px 0 20px;">
      <!--搜索  -->
      <el-row>
        <el-col :span="24">
          <h5 style="border-bottom:1px solid #ece8e8;padding-bottom:15px;padding-left:15px">查询信息</h5>
        </el-col>
        <el-col style="padding-left:15px" :span="22">
          <el-col :span="4">
            <el-select
              @clear="loadUserList()"
              @change="getUserlist()"
              v-model="userID"
              placeholder="请选择"
            >
              <el-option
                v-for="item in getgoodcate"
                :key="item.id"
                :label="item.label"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-col>

          <el-col :span="4">
            <el-select
              filterable
              @clear="loadUserList()"
              @change="getUserlist()"
              v-model="unitId"
              @input="searchUser()"
              placeholder="请选择单位"
            >
              <el-option
                v-for="item in typeouts"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-col>
          <!-- <el-button @click="searchUser()" class="el_button" icon="el-icon-search">搜索</el-button> -->
        </el-col>
      </el-row>
      <!-- 表格 -->
      <template>
        <el-table
          class="app"
          border
          :data="userlist"
          style="width: 100%;margin:10px 0px;padding-bottom:40px;"
          :row-style="{height:'40px'}"
          :cell-style="{padding:'0px'}"
        >
          <el-table-column type="index" label="序号" width="50" show-overflow-tooltip>
            <template slot-scope="socpe">
              <p style="cursor:pointer;" @click="showEdituser(socpe.row)">{{socpe.$index+1}}</p>
            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip prop="appName" label="员工姓名"></el-table-column>
          <el-table-column show-overflow-tooltip prop="name" label="所属单位"></el-table-column>
          <el-table-column prop="idCard" label="身份证" width="180"></el-table-column>
          <el-table-column prop="username" label="用户名" width="180"></el-table-column>
          <el-table-column prop="workNumber" label="作业人员证件号" width="180"></el-table-column>
          <el-table-column prop="certificateTime" label="发证日期" width="180">
            <template slot-scope="socpe">{{socpe.row.certificateTime | fmtdate}}</template>
          </el-table-column>
          <el-table-column prop="renewalTime" label="换证日期" width="180">
            <template slot-scope="socpe">{{socpe.row.renewalTime | fmtdate}}</template>
          </el-table-column>
          <el-table-column show-overflow-tooltip prop="type" label="员工类型">
            <template slot-scope="scope">
              <p v-if="userlist[scope.$index].type==0">充装人员</p>
              <p v-if="userlist[scope.$index].type==1">检验人员</p>
              <p v-if="userlist[scope.$index].type==2">配送人员</p>
            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip prop="status" label="状态">
            <template slot-scope="scope">
              <p
                v-if="userlist[scope.$index].status==0"
                style="background-color:green;color:white;padding: 10px 5px;"
              >未超期</p>
              <p
                v-if="userlist[scope.$index].status==1"
                style="background-color:orange;color:white;padding: 10px 5px;"
              >即将超期</p>
              <p
                v-if="userlist[scope.$index].status==2"
                style="background-color:red;color:white;padding: 10px 5px;"
              >已超期</p>
            </template>
          </el-table-column>
        </el-table>
      </template>

      <!-- 非app用户预警 -->
      <template>
        <el-table
          class="feiapp"
          border
          :data="userlists"
          style="width: 100%;margin:10px 0px;display:none;padding-bottom:40px;"
          :row-style="{height:'40px'}"
          :cell-style="{padding:'0px'}"
        >
          <!-- <el-table-column show-overflow-tooltip prop="vestingName" label="单位名称"></el-table-column> -->
          <!-- <el-table-column prop="userNo" label="员工编号"></el-table-column> -->
          <el-table-column type="index" label="序号" width="50" show-overflow-tooltip>
            <template slot-scope="socpe">
              <p style="cursor:pointer;" @click="showEditusers(socpe.row)">{{socpe.$index+1}}</p>
            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip prop="username" label="员工姓名"></el-table-column>
          <el-table-column show-overflow-tooltip prop="name" label="所属单位"></el-table-column>
          <el-table-column prop="idCard" label="身份证" width="180"></el-table-column>
          <el-table-column prop="labelNo" label="标签号" width="180"></el-table-column>
          <el-table-column prop="code" label="员工编号" width="180"></el-table-column>
          <!-- <el-table-column prop="workNumber" label="作业人员证件号" width="180"></el-table-column> -->
          <el-table-column prop="noDateStart" label="发证日期" width="180">
            <template slot-scope="socpe">{{socpe.row.noDateStart | fmtdate}}</template>
          </el-table-column>
          <el-table-column prop="noDateEnd" label="换证日期" width="180">
            <template slot-scope="socpe">{{socpe.row.noDateEnd | fmtdate}}</template>
          </el-table-column>
          <el-table-column show-overflow-tooltip prop="status" label="状态">
            <template slot-scope="scope">
              <p
                v-if="userlist[scope.$index].status==0"
                style="background-color:green;color:white;padding: 10px 5px;"
              >未超期</p>
              <p
                v-if="userlist[scope.$index].status==1"
                style="background-color:orange;color:white;padding: 10px 5px;"
              >即将超期</p>
              <p
                v-if="userlist[scope.$index].status==2"
                style="background-color:red;color:white;padding: 10px 5px;"
              >已超期</p>
            </template>
          </el-table-column>
        </el-table>
      </template>

      <el-pagination
        style="padding:5px 15px 15px 15px;display:flex; justify-content: flex-end;"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currPage"
        :page-sizes="[10,15,20,25,30]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>

      <!-- 查看信息app人员预警 -->
      <el-dialog
        title="查看信息"
        v-dialogDrag
        :close-on-click-modal="false"
        width="80%"
        :visible.sync="dialogFormVisibleEdit"
      >
        <el-table
          border
          :row-style="{height:'40px'}"
          :cell-style="{padding:'0px'}"
          :data="peopleForm"
        >
          <el-table-column show-overflow-tooltip prop="appName" label="员工姓名"></el-table-column>
          <el-table-column show-overflow-tooltip prop="name" label="所属单位"></el-table-column>
          <el-table-column prop="idCard" label="身份证" width="180"></el-table-column>
          <el-table-column prop="username" label="用户名" width="180"></el-table-column>
          <el-table-column prop="workNumber" label="作业人员证件号" width="180"></el-table-column>
          <el-table-column prop="createdTime" label="发证日期" width="180"></el-table-column>
          <el-table-column prop="updatedTime" label="换证日期" width="180"></el-table-column>
          <el-table-column show-overflow-tooltip prop="type" label="员工类型">
            <template slot-scope="scope">
              <p v-if="userlist[scope.$index].type==1">充装人员</p>
              <p v-if="userlist[scope.$index].type==2">检验人员</p>
              <p v-if="userlist[scope.$index].type==3">配送人员</p>
            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip prop="status" label="状态">
            <template slot-scope="scope">
              <p
                v-if="userlist[scope.$index].status==0"
                style="background-color:green;color:white;padding: 10px 5px;"
              >未超期</p>
              <p
                v-if="userlist[scope.$index].status==1"
                style="background-color:orange;color:white;padding: 10px 5px;"
              >即将超期</p>
              <p
                v-if="userlist[scope.$index].status==2"
                style="background-color:red;color:white;padding: 10px 5px;"
              >已超期</p>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="deapp" label="是否app登录">
              <template slot-scope="scope">
              <p v-if="peopleForm[scope.$index].deapp==1">app登录</p>
              <p v-if="peopleForm[scope.$index].deapp==2">不是app登录</p>
            </template>
          </el-table-column>-->
          <!-- <el-table-column prop="status" label="是否启用" width="200">
              <template slot-scope="scope">
              <p v-if="peopleForm[scope.$index].status==0">未启用</p>
              <p v-if="peopleForm[scope.$index].status==1">启用</p>
            </template>
          </el-table-column>-->
          <!-- <el-table-column prop="employeesClass" label="员工人员分类">
             <template slot-scope="scope">
              <p v-if="peopleForm[scope.$index].employeesClass==1">充装人员</p>
              <p v-if="peopleForm[scope.$index].employeesClass==2">检验人员</p>
              <p v-if="peopleForm[scope.$index].employeesClass==3">配送人员</p>
            </template>
          </el-table-column>-->
          <!-- <el-table-column prop="isBlack" label="是否黑名单"></el-table-column>
          <el-table-column prop="isCard" label="是否发卡"></el-table-column>-->
        </el-table>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
        </div>
      </el-dialog>

      <!-- 非app人员预警查看信息 -->
      <el-dialog
        title="查看信息"
        width="80%"
        v-dialogDrag
        :close-on-click-modal="false"
        :visible.sync="dialogFormVisibleEdits"
      >
        <el-table
          border
          :row-style="{height:'40px'}"
          :cell-style="{padding:'0px'}"
          :data="editUserForm"
        >
          <el-table-column show-overflow-tooltip prop="username" label="员工姓名"></el-table-column>
          <el-table-column show-overflow-tooltip prop="name" label="所属单位"></el-table-column>
          <el-table-column prop="idCard" label="身份证" width="180"></el-table-column>
          <el-table-column prop="labelNo" label="标签号" width="180"></el-table-column>
          <el-table-column prop="code" label="员工编号" width="180"></el-table-column>
          <!-- <el-table-column prop="workNumber" label="作业人员证件号" width="180"></el-table-column> -->
          <el-table-column prop="noDateStart" label="发证日期" width="180"></el-table-column>
          <el-table-column prop="noDateEnd" label="换证日期" width="180"></el-table-column>
          <el-table-column show-overflow-tooltip prop="status" label="状态">
            <template slot-scope="scope">
              <p
                v-if="userlist[scope.$index].status==0"
                style="background-color:green;color:white;padding: 10px 5px;"
              >未超期</p>
              <p
                v-if="userlist[scope.$index].status==1"
                style="background-color:orange;color:white;padding: 10px 5px;"
              >即将超期</p>
              <p
                v-if="userlist[scope.$index].status==2"
                style="background-color:red;color:white;padding: 10px 5px;"
              >已超期</p>
            </template>
          </el-table-column>
        </el-table>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibleEdits = false">取 消</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
import $ from "jquery";
export default {
  name: "personal",
  data() {
    return {
      name: "",
      workNumber: "",
      phone: "",
      userlist: [],
      userlists: [],
      unitId: "",
      getgoodcate: [
        {
          id: 1,
          label: "app人员预警"
        },
        {
          id: 2,
          label: "发卡人员预警"
        }
      ],
      //分页相关数据
      total: -1,
      currPage: 1,
      pageSize: 10,
      userID: 1,

      dialogFormVisibleEdit: false,
      dialogFormVisibleEdits: false,
      editUserForms: {},
      editUserForm: [],
      peopleForm: [],
      typeouts: []
    };
  },
  created() {
    this.getUserlist();
  },
  methods: {
    showEditusers(user) {
      this.dialogFormVisibleEdits = false;
      // this.editUserForms = user;
      // this.editUserForm = user;
      let message = [];
      message.push(user);
      console.log(message);

      this.editUserForm = message;

      // console.log(this.editUserForm);
    },
    // 编辑对话框打开
    showEdituser(user) {
      // 2.添加对话框
      this.dialogFormVisibleEdit = false;
      let message = [];
      message.push(user);
      console.log(message);

      this.peopleForm = message;
      // this.editUserForm = user;
      //user其实就是scope.row也就是userlist
    },

    //清空搜索框搜索数据 点击清楚按钮清除数据重新发送请求
    loadUserList() {
      this.getUserlist();
    },
    // 搜索用户 给搜索框绑定query v-model="query"
    async searchUser() {
      if (this.userID == 1) {
        $(".feiapp").hide();
        $(".app").show();
        const res = await this.$http.get(
          `app/warning/appEnabled?currPage=1&pageSize=${this.pageSize}&unitId=${this.unitId}`
        );
        console.log(res);
        this.userlist = res.data.data.list;
        this.total = res.data.data.totalCount;
        // 单位查询
        // this.bottleType = this.userID;
        // const res_1 = await this.$http.get(
        //   `unit/warning/findUnit/${this.bottleType}`
        // );
        // console.log(res_1);
        // this.typeouts = res_1.data.data;
      } else if (this.userID == 2) {
        $(".feiapp").show();
        $(".app").hide();
        const res = await this.$http.get(
          `noApp/warning/enabled?currPage=1&pageSize=${this.pageSize}&unitId=${this.unitId}`
        );
        console.log(res);
        this.userlists = res.data.data.list;
        this.total = res.data.data.totalCount;

        // 单位查询
        // this.bottleType = this.userID;
        // const res_1 = await this.$http.get(
        //   `unit/warning/findUnit/${this.bottleType}`
        // );
        // console.log(res_1);
        // this.typeouts = res_1.data.data;
      }
    },

    //分页功能
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      // 1.每页显示条数的改变
      this.pageSize = val;
      // 回到第一页
      this.currpage = 1;
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
      // this.unitId = localStorage.getItem("unitId");
      // console.log(this.unitId);

      if (this.userID == 1) {
        $(".feiapp").hide();
        $(".app").show();
        const res = await this.$http.get(
          `app/warning/appEnabled?currPage=${this.currPage}&pageSize=${this.pageSize}&unitId=${this.unitId}`
        );
        // console.log(res);
        this.userlist = res.data.data.list;
        this.total = res.data.data.totalCount;
        // 单位查询
        this.bottleType = this.userID;
        const res_1 = await this.$http.get(
          `unit/warning/findUnit/${this.bottleType}`
        );
        // console.log(res_1);
        this.typeouts = res_1.data.data;
      } else if (this.userID == 2) {
        $(".feiapp").show();
        $(".app").hide();
        const res = await this.$http.get(
          `noApp/warning/enabled?currPage=${this.currPage}&pageSize=${this.pageSize}&unitId=${this.unitId}`
        );
        // console.log(res);
        this.userlists = res.data.data.list;
        this.total = res.data.data.totalCount;

        // 单位查询
        this.bottleType = this.userID;
        const res_1 = await this.$http.get(
          `unit/warning/findUnit/${this.bottleType}`
        );
        // console.log(res_1);
        this.typeouts = res_1.data.data;
      }
    }
  }
};
</script>
<style scoped>
p,
body,
html {
  padding: 0;
  margin: 0;
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
</style>