<template>
  <div>
    <div style="background:white;width:99.1%;padding-left:15px">
      <my-bread level1="预警管理" level2="告警信息" level3="单位到期预警"></my-bread>
    </div>
    <el-card class="box-card" style="margin:20px 20px 0 20px;">
      <!--搜索  -->
      <el-row>
        <el-col :span="24">
          <h5 style="border-bottom:1px solid #ece8e8;padding-bottom:15px;padding-left:15px">查询信息</h5>
        </el-col>
        <el-col style="padding-left:15px;" :span="22">
          <el-col :span="4">
            <el-select
              @clear="loadUserList()"
              @change="getUserlist()"
              v-model="bottleType"
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
              clearable
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
          <el-col :span="3">
          </el-col>
        </el-col>
      </el-row>
      <!-- 表格 -->
      <template>
        <el-table
          border
          :data="userlist"
          style="width: 100%;margin:10px 0px;padding-bottom:40px;"
          :row-style="{height:'40px'}"
          :cell-style="{padding:'0px'}"
        >
          <el-table-column type="index" label="序号" width="50" show-overflow-tooltip>
            <template slot-scope="socpe">
              <p style="cursor:pointer;">{{socpe.$index+1}}</p>
            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip prop="name" label="单位名称"></el-table-column>
          <el-table-column show-overflow-tooltip prop="address" label="详细地址"></el-table-column>

          <el-table-column show-overflow-tooltip prop="type" label="监督机构">
            <template slot-scope="scope">
              <p v-if="userlist[scope.$index].type==0">监管单位</p>
              <p v-if="userlist[scope.$index].type==1">制造单位</p>
              <p v-if="userlist[scope.$index].type==2">充装单位</p>
              <p v-if="userlist[scope.$index].type==3">检验单位</p>
              <p v-if="userlist[scope.$index].type==4">使用单位</p>
              <p v-if="userlist[scope.$index].type==5">配送单位</p>
            </template>
          </el-table-column>

          <el-table-column show-overflow-tooltip prop="unitPhone" width="140" label="单位固定电话"></el-table-column>

          <el-table-column prop="licence" label="特种设备许可证号" width="180"></el-table-column>
          <el-table-column show-overflow-tooltip prop="unitIssueTime" label="发证日期">
            <template slot-scope="socpe">{{socpe.row.unitIssueTime | fmtdate}}</template>
          </el-table-column>
          <el-table-column show-overflow-tooltip prop="unitChangeTime" label="换证日期">
            <template slot-scope="socpe"><p style="background-color:red;color:white;padding: 10px 5px;">{{socpe.row.unitChangeTime | fmtdate}}</p></template>
          </el-table-column>
          <el-table-column prop="phone" label="负责人联系电话" width="140"></el-table-column>

          <el-table-column show-overflow-tooltip prop="bottleType" label="所属类型">
            <template slot-scope="scope">
              <p v-if="userlist[scope.$index].bottleType==0">车用</p>
              <p v-if="userlist[scope.$index].bottleType==1">液化</p>
              <p v-if="userlist[scope.$index].bottleType==2">工业</p>
              <p v-if="userlist[scope.$index].bottleType==4">所有类型</p>
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

      <!-- 查看信息 -->
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
          :data="messageUserForm"
        >
          <el-table-column type="index" label="序号" width="70" show-overflow-tooltip></el-table-column>
          <el-table-column show-overflow-tooltip prop="vestingUnit" label="单位名称"></el-table-column>
          <el-table-column show-overflow-tooltip prop="vestingAddress" label="详细地址"></el-table-column>
          <el-table-column show-overflow-tooltip prop="vestingType" label="监督机构"></el-table-column>
          <el-table-column show-overflow-tooltip prop="unitIssueTime" label="发证日期"></el-table-column>
          <el-table-column show-overflow-tooltip prop="unitChangeTime" label="换证日期"></el-table-column>
          <el-table-column show-overflow-tooltip prop="unitFixedLine" width="140" label="单位固定电话"></el-table-column>
          <el-table-column prop="adminNo" label="特种设备许可证号" width="180"></el-table-column>
          <el-table-column prop="personCharge" label="负责人电话" width="140"></el-table-column>
          <el-table-column show-overflow-tooltip prop="belongStype" label="所属类型">
            <template slot-scope="scope">
              <p v-if="messageUserForm[scope.$index].belongStype==0">车用</p>
              <p v-if="messageUserForm[scope.$index].belongStype==1">液化</p>
              <p v-if="messageUserForm[scope.$index].belongStype==2">工业</p>
            </template>
          </el-table-column>
        </el-table>

      
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
export default {
  name: "personal",
  data() {
    return {
      name: "",
      userlist: [],

      //分页相关数据
      total: -1,
      currPage: 1,
      pageSize: 10,
      // userID:1,
      // 添加对话框的属性
      //   dialogFormVisibleAdd: false,
      dialogFormVisibleEdit: false,
      bottleType: 0,
      messageUserForm: [],
      //   // 编辑
      editUserForm: {
        name: "",
        adress: "",
        legalUsername: "",
        phone: "",
        businessLicenseNo: "",
        certificationCompany: "",
        certificationDate: "",
        dangerousCarNo: "",
        nextTrialTime: ""
      },
      getgoodcate: [
        {
          id: 0,
          label: "车用单位"
        },
        {
          id: 1,
          label: "液化单位"
        },
        {
          id: 2,
          label: "工业单位"
        },
        {
          id: 4,
          label: "所有类型"
        }
      ],
      typeouts: [],
      unitId: ""
    };
  },

  methods: {
    ifendcases(val) {
      if (val.isCard == "0") {
        return "未发卡";
      } else if (val.isCard == "1") {
        return "已发卡";
      } else if (val.isCard === null) {
        return "暂无状态";
      }
    },
    ifendcasess(val) {
      if (val.isBlack == "0") {
        return "否";
      } else if (val.isBlack == "1") {
        return "是";
      } else if (val.isBlack === null) {
        return "暂无状态";
      }
    },
    async getUserlist() {
      const res = await this.$http.get(
        //Integer bottleType, Integer pageSize, Integer currPage
        `unit/warning/enabled?bottleType=${this.bottleType}&currPage=${this.currPage}&pageSize=${this.pageSize}&unitId=${this.unitId}  `
      );
      console.log(res);
      this.userlist = res.data.data.list;
      this.total = res.data.data.totalCount;

      // 单位查询
      this.bottleType = this.bottleType;
      const res_1 = await this.$http.get(
        `unit/warning/findUnit/${this.bottleType}`
      );
      console.log(res_1);
      this.typeouts = res_1.data.data;
    },

    // 编辑对话框打开
    showEdituser(user) {
      // 2.添加对话框
      this.dialogFormVisibleEdit = false;
      let messages = [];
      messages.push(user);

      this.messageUserForm = messages;
      //user其实就是scope.row也就是userlist
    },

    //清空搜索框搜索数据 点击清楚按钮清除数据重新发送请求
    loadUserList() {
      this.getUserlist();
    },
    // 搜索用户 给搜索框绑定query v-model="query"
    async searchUser() {
      const res = await this.$http.get(
        //Integer bottleType, Integer pageSize, Integer currPage
        `unit/warning/enabled?bottleType=${this.bottleType}&currPage=1&pageSize=${this.pageSize}&unitId=&${this.unitId}`
      );
      console.log(res);
      this.userlist = res.data.data.list;
      this.total = res.data.data.totalCount;

      // 单位查询
      // this.bottleType = this.bottleType;
      // const res_1 = await this.$http.get(
      //   `unit/warning/findUnit/${this.bottleType}`
      // );
      // console.log(res_1);
      // this.typeouts = res_1.data.data;
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
    }
    // async getUserlist() {

    //   //需要授权的API ，必须在请求头中使用Authorization 字段token令牌
    //   //pagenum当前页面   pagesize每页显示条数
    //   //接口文档中 除了登录接口之外的所有请求都需要进行授权，设置请求头
    //   //找axios中关于请求头的代码  写在了http.js中
    //   // const AUTH_TOKEN = localStorage.getItem("token");
    //   // this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;
    //   const res = await this.$http.get(
    //     `unit/warning/enabled?bottleType=${this.bottleType}currPage=${this.currPage}&pageSize=${this.pageSize}`
    //   );
    //   console.log(res);
    //   this.userlist = res.data.data.list;
    //   this.total = res.data.data.totalCount;
    //   // const {
    //   //   meta: { status, msg },
    //   //   data: { users, total }
    //   // } = res.data;
    //   // if (status === 200) {
    //   //   // 1.给表格数据赋值
    //   //   // 给总数赋值
    //   //   // 提示
    //   //   // 表格通过prop进行赋值展示一般数据
    //   //   this.userlist = users;
    //   //   this.total = total;
    //   //   this.$message.success(msg);
    //   // } else {
    //   //   this.$message.warning(msg);
    //   // }
    // }
  },
  created() {
    this.getUserlist();
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
>>>[class*=el-col-]{
  margin-top:8px;
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