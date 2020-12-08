<template>
  <div>
    <div style="background:white;width:99.1%;padding-left:15px">
      <my-bread level1="综合查询" level2="车用气瓶" level3="特权卡充装记录"></my-bread>
    </div>
    <el-card class="box-card" style="margin:20px 20px 0 20px;">
      <el-row>
        <el-col :span="22">
          <el-col :span="24">
            <h5 style="border-bottom:1px solid #ece8e8;padding-bottom:15px;padding-left:15px">查询信息</h5>
          </el-col>

          <el-col style="padding-left:15px" :span="24">
            <el-col :span="4">
              <el-input
                size="small"
                style=" width: 100%;"
                @clear="loadUserList()"
                clearable
                class="input-serach"
                placeholder="请输入气瓶编号"
                v-model="gasId"
              ></el-input>
            </el-col>

            <el-col style="padding-left:30px" :span="4">
              <el-input
                size="small"
                style=" width: 100%;"
                @clear="loadUserList()"
                clearable
                class="input-serach"
                placeholder="请输入加气枪号"
                v-model="gunId"
              ></el-input>
            </el-col>

            <el-col style="padding-left:30px" :span="4">
              <el-date-picker
                size="small"
                style=" width: 100%;"
                type="date"
                placeholder="加气时间"
                value-format="yyyy-MM-dd"
                v-model="createTime"
                @input="searchUser()"
              ></el-date-picker>
            </el-col>

            <el-col style="padding-left:20px" class="line" :span="1">
              <p style="margin-top:8px;">至</p>
            </el-col>
            <el-col :span="4">
              <el-date-picker
                type="date"
                placeholder="加气时间"
                value-format="yyyy-MM-dd"
                v-model="createTime2"
                size="small"
                style=" width: 100%;"
                @input="searchUser()"
              ></el-date-picker>
            </el-col>

            <el-col style="padding-left:30px" :span="4">
              <el-button
                size="small"
                style=" width: 100%;"
                @click="searchUser()"
                class="el_button"
                icon="el-icon-search"
              >搜索</el-button>
            </el-col>
          </el-col>
        </el-col>
        <!-- <el-col :span="3">
        &nbsp;
        <el-button @click="showAddUserDia()" type="primary">
          <i style="padding-right:10px" class="el-icon-plus"></i>新增
        </el-button>
        </el-col>-->
      </el-row>

      <el-col :span="24">
        <p
          style="width:100%;height:1px;background:rgb(236, 232, 232);margin:15px 0px 15px 0px;z-index:999"
        ></p>
      </el-col>
      <!-- 表格 -->
      <template>
        <el-table
          border
          :row-style="{height:'40px'}"
          :cell-style="{padding:'0px'}"
          :data="userlist"
          style="width: 100%;margin:20px 0px;padding-bottom:40px"
        >
          <el-table-column type="index" label="序号" width="50">
            <template slot-scope="socpe">
              <p style="cursor:pointer;" @click="showEdituser(socpe.row)">{{socpe.$index+1}}</p>
            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip prop="unitName" label="充装站名称" width="200"></el-table-column>
          <el-table-column show-overflow-tooltip prop="regId" label="登记证号"></el-table-column>
          <el-table-column show-overflow-tooltip prop="gasId" label="气瓶编号"></el-table-column>
          <el-table-column show-overflow-tooltip prop="gasApp" label="气瓶标签号"></el-table-column>
          <el-table-column show-overflow-tooltip prop="carNumber" label="车牌号"></el-table-column>
          <el-table-column show-overflow-tooltip prop="gunId" label="充装枪号"></el-table-column>
          <el-table-column sortable show-overflow-tooltip prop="createTime" label="充装时间">
            <!-- <template slot-scope="socpe">{{socpe.row.createTime | fmtdate}}</template> -->
          </el-table-column>
          <el-table-column show-overflow-tooltip prop="fillingVolume" label="充装量(kg)"></el-table-column>
          <el-table-column show-overflow-tooltip prop="userName" label="充装工"></el-table-column>
          <el-table-column sortable show-overflow-tooltip prop="nextCheckDate" label="下次检验时间">
            <template slot-scope="socpe">{{socpe.row.nextCheckDate | fmtdate}}</template>
          </el-table-column>
        </el-table>
      </template>

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
      <!-- 修改弹框 -->
      <el-dialog title="修改信息" :visible.sync="dialogFormVisibleEdit">
        <el-form :model="editUserForm">
          <el-col :span="24">
            <el-col :span="12">
              <el-form-item label="充装站名称" label-width="140px" prop="gasId">
                <el-input disabled v-model="editUserForm.unitName" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="登记证号" label-width="140px" prop="gasId">
                <el-input v-model="editUserForm.regId" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="12">
              <el-form-item label="气瓶编号" label-width="140px" prop="gasId">
                <el-input disabled v-model="editUserForm.gasId" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="气瓶标签号" label-width="140px" prop="gasId">
                <el-input v-model="editUserForm.gasApp" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="12">
              <el-form-item label="车牌号" label-width="140px" prop="gasId">
                <el-input v-model="editUserForm.carNumber" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="充装枪号" label-width="140px" prop="gasId">
                <el-input disabled v-model="editUserForm.gunId" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="12">
              <el-form-item label="充装时间" label-width="140px" prop="gasId">
                <el-input disabled v-model="editUserForm.createTime" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="充装量(kg)" label-width="140px" prop="gasId">
                <el-input disabled v-model="editUserForm.fillingVolume" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="12">
              <el-form-item label="充装工" label-width="140px" prop="gasId">
                <el-input disabled v-model="editUserForm.userName" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12"> 
              <el-form-item label="下次检验时间" label-width="140px" prop="gasId">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="editUserForm.nextCheckDate"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-col>
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
  name: "trace",
  data() {
    return {
      gunId: "",
      gasId: "",
      createTime: "",
      createTime2: "",
      userlist: [],
      ids: "",
      //分页相关数据
      total: -1,
      currPage: 1,
      page: 1,
      pageSize: 10,
      dialogFormVisibleEdit: false,
      // dialogFormVisibleRoleshow: false,
      editUserForm: {
        unitName: "", //充装站名称
        regId: "", //登记证号
        gasId: "", //气瓶编号
        gasApp: "", //气瓶标签号
        carNumber: "", //车牌号
        gunId: "", //充装枪号
        createTime: "", //充装时间
        fillingVolume: "", //充装量(kg)
        userName: "", //充装工
        nextCheckDate: "" //下次检验时间
      }
    };
  },

  methods: {
    async EditUser() {
      const res = await this.$http.post(
        `/public/gas/privilege`,
        this.editUserForm
      );
      console.log(res);
      if (res.data.code == 0) {
        this.$message({
          type: "success",
          message: "修改成功"
        });

        this.dialogFormVisibleEdit = false;
        this.getUserlist();
      } else {
        this.$message({
          type: "error",
          message: "修改失败"
        });

        this.dialogFormVisibleEdit = false;
        this.getUserlist();
      }
    },
    showEdituser(user) {
      console.log(user);
      this.editUserForm = user;
      this.dialogFormVisibleEdit = true;
    },
    dateFormat: function(row, column) {
      var date = row[column.property];
      if (date === null) {
        return "0:0:0";
      }
      var moment = require("moment");
      return moment(date).format("YYYY-MM-DD hh:mm");
      //HH:mm:ss
    },

    //清空搜索框搜索数据 点击清楚按钮清除数据重新发送请求
    loadUserList() {
      this.getUserlist();
    },
    // 搜索用户 给搜索框绑定query v-model="query"
    async searchUser() {
      if(this.createTime==null || this.createTime2==null) this.createTime='',this.createTime2=''
      const res = await this.$http.get(
        `/public/gas/privilege/list?pageSize=${this.pageSize}&currPage=${this.page}&gunId=${this.gunId}&gasId=${this.gasId}&createTime=${this.createTime}&createTime2=${this.createTime2}`
      );
       console.log(res);
      if(res.data.data==null){
        this.$message({
          type: "warning",
          message: res.data.msg
        });
      }else{
      this.userlist = res.data.data.list;
      this.total = res.data.data.totalCount;
      this.currPage = 1;
      }
     
     
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
      //this.userlist=res.data.data.list
    },
    async getUserlist() {
      // http://localhost:8081/public/gas/CylinderFilling/CylinderFillingPaging?pageSize=2&currPage=2&gunId=01&gasId=1588923670165&createTime=2020-05-10 10:44:22&createTime2=2020-05-11 10:44:22
      const res = await this.$http.get(
        `/public/gas/privilege/list?pageSize=${this.pageSize}&currPage=${this.currPage}&gunId=${this.gunId}&gasId=${this.gasId}&createTime=${this.createTime}&createTime2=${this.createTime2}`
      );
      // &name=${this.name}
      console.log(res);
      this.userlist = res.data.data.list;
      this.total = res.data.data.totalCount;
    }
  },
  created() {
    this.getUserlist();
  }
};
</script>
<style scoped>
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
</style>