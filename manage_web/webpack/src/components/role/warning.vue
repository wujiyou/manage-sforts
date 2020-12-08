<template>
  <div>
    <div style="background:white;width:99.1%;padding-left:15px">
      <my-bread level1="预警管理" level2="告警信息" level3="气瓶超期预警"></my-bread>
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
              v-model="userID"
              placeholder="请选择"
            >
              <el-option
                v-for="item in typeout"
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
              @input="search()"
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
        </el-col>
      </el-row>

      <template>
        <!-- 液化气瓶表格数据 -->

        <el-table
          border
          :data="userlist"
          class="yehua"
          :row-style="{height:'40px'}"
          :cell-style="{padding:'0px'}"
          style="margin: 10px 0px; padding-bottom: 40px;"
        >
          <el-table-column type="index" label="序号" width="50" show-overflow-tooltip>
            <template slot-scope="socpe">
              <p style="cursor:pointer;" @click="showEdityehua(socpe.row)">{{socpe.$index+1}}</p>
            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip prop="regId" label="登记证号"></el-table-column>
          <el-table-column show-overflow-tooltip prop="gasId" label="气瓶编号"></el-table-column>
          <el-table-column show-overflow-tooltip prop="appid" label="标签号"></el-table-column>
          <el-table-column show-overflow-tooltip prop="makeInfo" label="生产(制造)单位"></el-table-column>
          <el-table-column show-overflow-tooltip prop label="制造日期">
            <template slot-scope="socpe">{{socpe.row.makeData | fmtdate}}</template>
          </el-table-column>
          <el-table-column show-overflow-tooltip prop label="检验日期">
            <template slot-scope="socpe">{{socpe.row.nextCheckData | fmtdate}}</template>
          </el-table-column>

          <el-table-column show-overflow-tooltip prop label="下次检验日期">
            <template slot-scope="socpe">{{socpe.row.nextCheckData | fmtdate}}</template>
          </el-table-column>
          <el-table-column show-overflow-tooltip prop="status" label="气瓶状态">
            <template slot-scope="scope">
              <p v-if="userlist[scope.$index].status==0">不合格</p>
              <p v-if="userlist[scope.$index].status==1">合格</p>
              <p
                style="background-color:red;color:white;padding: 10px 5px;"
                v-if="userlist[scope.$index].status==2"
              >超期未检</p>
              <p
                style="background-color:orange;color:white;padding: 10px 5px;"
                v-if="userlist[scope.$index].status==3"
              >即将超期</p>
            </template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="isBlack"
            :formatter="ifendcasess"
            label="是否黑名单"
          ></el-table-column>
        </el-table>

        <!-- 车用气瓶表格数据 -->

        <el-table
          border
          :data="userlist"
          class="cheyong"
          :row-style="{height:'40px'}"
          :cell-style="{padding:'0px'}"
          style="display:none; margin: 10px 0px; padding-bottom: 40px;"
        >
          <el-table-column type="index" label="序号" width="50" show-overflow-tooltip>
            <template slot-scope="socpe">
              <p style="cursor:pointer;" @click="showEdituser(socpe.row)">{{socpe.$index+1}}</p>
            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip prop="regId" label="登记证号"></el-table-column>
          <el-table-column show-overflow-tooltip prop="gasId" label="气瓶编号"></el-table-column>
          <el-table-column show-overflow-tooltip prop="appId" label="标签号"></el-table-column>
          <el-table-column show-overflow-tooltip prop="makeInfo" label="生产(制造)单位"></el-table-column>
          <el-table-column show-overflow-tooltip prop label="制造日期">
            <template slot-scope="socpe">{{socpe.row.makeData | fmtdate}}</template>
          </el-table-column>
          <el-table-column show-overflow-tooltip prop label="检验日期">
            <template slot-scope="socpe">{{socpe.row.nextCheckData | fmtdate}}</template>
          </el-table-column>
          <el-table-column show-overflow-tooltip prop label="下次检验日期">
            <template slot-scope="socpe">{{socpe.row.nextCheckData | fmtdate}}</template>
          </el-table-column>
          <el-table-column show-overflow-tooltip prop="status" label="气瓶状态">
            <template slot-scope="scope">
              <p v-if="userlist[scope.$index].status==0">不合格</p>
              <p v-if="userlist[scope.$index].status==1">合格</p>
              <p
                style="background-color:red;color:white;padding: 10px 5px;"
                v-if="userlist[scope.$index].status==2"
              >超期未检</p>
              <p
                style="background-color:orange;color:white;padding: 10px 5px;"
                v-if="userlist[scope.$index].status==3"
              >即将超期</p>
            </template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="isBlack"
            :formatter="ifendcasess"
            label="是否黑名单"
          ></el-table-column>
        </el-table>

        <!-- 工业气瓶表格数据 -->
        <el-table
          border
          :data="userlist"
          :row-style="{height:'40px'}"
          :cell-style="{padding:'0px'}"
          class="gongye"
          style="margin: 10px 0px; padding-bottom: 40px;display:none"
        >
          <el-table-column type="index" label="序号" width="50" show-overflow-tooltip>
            <template slot-scope="socpe">
              <p style="cursor:pointer;" @click="showEdityehua(socpe.row)">{{socpe.$index+1}}</p>
            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip prop="regId" label="登记证号"></el-table-column>
          <el-table-column show-overflow-tooltip prop="gasId" label="气瓶编号"></el-table-column>
          <el-table-column show-overflow-tooltip prop="appid" label="标签号"></el-table-column>
          <el-table-column show-overflow-tooltip prop="medium" label="介质"></el-table-column>
          <el-table-column show-overflow-tooltip prop="makeInfo" label="生产(制造)单位"></el-table-column>
          <el-table-column show-overflow-tooltip prop label="制造日期">
            <template slot-scope="socpe">{{socpe.row.makeData | fmtdate}}</template>
          </el-table-column>
          <el-table-column show-overflow-tooltip prop label="检验日期">
            <template slot-scope="socpe">{{socpe.row.nextCheckData | fmtdate}}</template>
          </el-table-column>

          <el-table-column show-overflow-tooltip prop label="下次检验日期">
            <template slot-scope="socpe">{{socpe.row.nextCheckData | fmtdate}}</template>
          </el-table-column>
          <el-table-column show-overflow-tooltip prop="status" label="气瓶状态">
            <template slot-scope="scope">
              <p v-if="userlist[scope.$index].status==0">不合格</p>
              <p v-if="userlist[scope.$index].status==1">合格</p>
              <p
                style="background-color:red;color:white;padding: 10px 5px;"
                v-if="userlist[scope.$index].status==2"
              >超期未检</p>
              <p
                style="background-color:orange;color:white;padding: 10px 5px;"
                v-if="userlist[scope.$index].status==3"
              >即将超期</p>
            </template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="isBlack"
            :formatter="ifendcasess"
            label="是否黑名单"
          ></el-table-column>
        </el-table>
      </template>

      <el-pagination
        style="padding:5px 15px 15px 15px !important;display:flex; justify-content: flex-end;"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currPage"
        :page-sizes="[10,15,20,25,30]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>

      <!-- 查看信息液化气瓶 -->
      <el-dialog
        title="查看信息"
        v-dialogDrag
        :close-on-click-modal="false"
        width="80%"
        :visible.sync="dialogFormVisibleyehua"
      >
        <el-table border :row-style="{height:'40px'}" :cell-style="{padding:'0px'}" :data="form">
          <el-table-column type="index" label="序号" width="70" show-overflow-tooltip></el-table-column>
          <el-table-column prop="regId" show-overflow-tooltip label="登记证号" width="150"></el-table-column>
          <el-table-column prop="gasId" show-overflow-tooltip label="气瓶编号" width="200"></el-table-column>
          <el-table-column prop="appid" show-overflow-tooltip label="生产(制造)单位"></el-table-column>
          <el-table-column prop="makeData" show-overflow-tooltip label="制造日期" width="150">
            <template slot-scope="socpe">{{socpe.row.makeData | fmtdate}}</template>
          </el-table-column>
          <el-table-column prop="nextCheckData" show-overflow-tooltip label="检验日期" width="200">
            <template slot-scope="socpe">{{socpe.row.nextCheckData | fmtdate}}</template>
          </el-table-column>
          <el-table-column prop="businessLicenseNo" show-overflow-tooltip label="下次检验日期">
            <template slot-scope="socpe">{{socpe.row.businessLicenseNo | fmtdate}}</template>
          </el-table-column>
          <el-table-column
            prop="certificationCompany"
            show-overflow-tooltip
            label="发证机关"
            width="200"
          ></el-table-column>
        </el-table>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibleyehua = false">取 消</el-button>
        </div>
      </el-dialog>

      <!-- 查看信息车用气瓶 -->
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
          :data="editUserForm"
        >
          <el-table-column type="index" label="序号" width="70" show-overflow-tooltip></el-table-column>
          <el-table-column prop="regId" show-overflow-tooltip label="登记证号" width="300"></el-table-column>
          <el-table-column prop="gasId" show-overflow-tooltip label="气瓶编号" width="200"></el-table-column>
          <el-table-column prop="appid" show-overflow-tooltip label="生产(制造)单位"></el-table-column>
          <el-table-column prop="makeData" show-overflow-tooltip label="制造日期" width="150"></el-table-column>
          <el-table-column prop="nextCheckData" show-overflow-tooltip label="检验日期" width="200">
            <template slot-scope="socpe">{{socpe.row.nextCheckData | fmtdate}}</template>
          </el-table-column>
          <el-table-column prop="businessLicenseNo" show-overflow-tooltip label="下次检验日期">
            <template slot-scope="socpe">{{socpe.row.nextCheckData | fmtdate}}</template>
          </el-table-column>
          <el-table-column prop="businessLicenseNo" show-overflow-tooltip label="发证机关" width="200"></el-table-column>
        </el-table>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
import $ from "jquery";
export default {
  name: "warning",
  data() {
    return {
      name: "",
      userlist: [],
      //分页相关数据
      total: -1,
      currPage: 1,
      pageSize: 10,
      userlists: [],
      userID: 1,
      unitId: "",
      typeout: [
        {
          id: 1,
          label: "液化气瓶"
        },
        {
          id: 0,
          label: "车用气瓶"
        },
        {
          id: 2,
          label: "工业气瓶"
        }
      ],
      typeouts: [],
      // 添加对话框的属性
      //   dialogFormVisibleAdd: false,
      dialogFormVisibleEdit: false,
      dialogFormVisibleyehua: false,

      editUserForm: [],
      // 液化
      form: []
    };
  },

  methods: {
    // show(){},
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
    // 信息查看液化气瓶对话框打开
    showEdityehua(users) {
      this.dialogFormVisibleyehua = false;
      let messages = [];
      messages.push(users);
      this.form = messages;
    },

    // 信息查看车用气瓶对话框打开
    showEdituser(user) {
      this.dialogFormVisibleEdit = false;
      let message = [];
      message.push(user);
      console.log(message);
      this.editUserForm = message;
    },
    async search() {
      if (this.userID == 1) {
        $(".yehua").show();
        $(".cheyong").hide();
        const res = await this.$http.get(
          `/public/warning/list?unitId=${this.unitId}&currPage=1&pageSize=${this.pageSize}`
        );
        console.log(res);
        this.userlist = res.data.data.list;
        this.total = res.data.data.totalCount;
        this.bottleType = this.userID;
        console.log(this.bottleType);
        const res_1 = await this.$http.get(
          `unit/warning/findUnit/${this.bottleType}`
        );
        console.log(res_1);
        this.typeouts = res_1.data.data;
        // public/warning/list?String unitId, Integer currPage, Integer pageSize
      } else if (this.userID == 0) {
        $(".yehua").hide();
        $(".cheyong").show();
        // this.unitId = sessionStorage.getItem("unitId");
        // this.types = sessionStorage.getItem("types");
        // console.log(this.userID);

        const res = await this.$http.get(
          `/car/cylinder/list?unitId=${this.unitId}&currPage=1&pageSize=${this.pageSize}`
        );
        console.log(res);
        this.userlist = res.data.data.list;
        this.total = res.data.data.totalCount;

        console.log(this.bottleType);
        const res_1 = await this.$http.get(
          `unit/warning/findUnit/${this.bottleType}`
        );
        console.log(res_1);
        this.typeouts = res_1.data.data;
      }
    },
    //清空搜索框搜索数据 点击清楚按钮清除数据重新发送请求
    loadUserList() {
      this.getUserlist();
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
    // async danwei(){
    //         const res_1 = await this.$http.get(`unit/warning/findUnit/`)
    // },
    async getUserlist() {
      // this.unitId = sessionStorage.getItem("unitId");

      // debugger;

      // this.types = sessionStorage.getItem("types");

      if (this.userID == 1) {
        $(".yehua").show();
        $(".cheyong").hide();
        $(".gongye").hide();
        const res = await this.$http.get(
          `/public/warning/list?unitId=${this.unitId}&currPage=${this.currPage}&pageSize=${this.pageSize}`
        );
        console.log(res);
        this.userlist = res.data.data.list;
        this.total = res.data.data.totalCount;
        this.bottleType = this.userID;
        console.log(this.bottleType);
        const res_1 = await this.$http.get(
          `unit/warning/findUnit/${this.bottleType}`
        );
        console.log(res_1);
        this.typeouts = res_1.data.data;
        // public/warning/list?String unitId, Integer currPage, Integer pageSize
      } else if (this.userID == 0) {
        $(".yehua").hide();
        $(".cheyong").show();
        $(".gongye").hide();
        // this.unitId = sessionStorage.getItem("unitId");
        // this.types = sessionStorage.getItem("types");
        // console.log(this.userID);

        const res = await this.$http.get(
          `/car/cylinder/list?unitId=${this.unitId}&currPage=${this.currPage}&pageSize=${this.pageSize}`
        );
        console.log(res);
        this.userlist = res.data.data.list;
        this.total = res.data.data.totalCount;
        this.bottleType = this.userID;
        console.log(this.bottleType);
        const res_1 = await this.$http.get(
          `unit/warning/findUnit/${this.bottleType}`
        );
        console.log(res_1);
        this.typeouts = res_1.data.data;
      } else if (this.userID == 2) {
        $(".yehua").hide();
        $(".cheyong").hide();
        $(".gongye").show();

        const res = await this.$http.get(
          `industrial/warning/findPage?unitId=${this.unitId}&currPage=${this.currPage}&pageSize=${this.pageSize}`
        );
        console.log(res);
        this.userlist = res.data.data.list;
        this.total = res.data.data.totalCount;
        this.bottleType = this.userID;
        console.log(this.bottleType);
        const res_1 = await this.$http.get(
          `unit/warning/findUnit/${this.bottleType}`
        );
        console.log(res_1);
        this.typeouts = res_1.data.data;
      }
    }
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
.arrow_right {
  padding: 10px 0px;
  margin-bottom: 10px;
}

.input-serach {
  width: 400px;
}
.el_button {
  background-color: #66b1ff !important;
  border-color: #66b1ff !important;
  color: #fff !important;
}
.cheyong {
  width: 100%;
  display: none;
}
.gongye {
  display: none;
  width: 100%;
}
.yehua {
  width: 100%;

  /* display: none; */
}
>>>[class*=el-col-]{
  margin-top:8px;
}
</style>




<style>
.el-table td,
.el-table th {
  text-align: center !important;
}
</style>