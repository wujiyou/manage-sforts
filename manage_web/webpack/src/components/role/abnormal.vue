<template>
   <div>
    <div style="background:white;width:99.1%;padding-left:15px">
      <my-bread level1="预警管理" level2="充装记录" level3="异常充装记录"></my-bread>
    </div>  
   <el-card class="box-card" style="margin:20px 20px 0 20px;">
    
    <!--搜索  -->
    <el-row>
        <el-col :span="22">

          <el-col :span="24">
            <h5 style="border-bottom:1px solid #ece8e8;padding-bottom:15px;padding-left:15px">查询信息</h5>
          </el-col>

          <el-col  style="padding-left:15px" :span="24">
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
              <el-select
                  size="small"
                  style=" width: 100%;"
                  @clear="loadUserList()"
                  clearable
                  v-model="unitName"
                  @input="searchUser()"
                  placeholder="请输入单位名称"
                >
                  <el-option
                    v-for="item in danwei"
                    :key="item"
                    :label="item"
                    :value="item"
                  ></el-option>
                </el-select>
            </el-col>

            <el-col  style="padding-left:30px" :span="3">
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

            <el-col  style="padding-left:30px" :span="4">
              <el-date-picker
                size="small"
                style=" width: 100%;"
                type="date"
                placeholder="加气时间"
                value-format="yyyy-MM-dd"
                v-model="createTime"
              ></el-date-picker>
            </el-col>

            <el-col  style="padding-left:20px" class="line" :span="1">
              <p style="margin-top:8px;">至</p>
            </el-col>
            <el-col :span="4">
              <el-date-picker
                type="date"
                placeholder="加气时间"
                value-format="yyyy-MM-dd"
                v-model="endTime"
                size="small"
                style=" width: 100%;"
                @input="searchUser()"
              ></el-date-picker>
            </el-col>

            <el-col  style="padding-left:30px" :span="4">
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
      </el-row>
      <el-col :span="24">
        <p
          style="width:100%;height:1px;background:rgb(236, 232, 232);margin:20px 0px 0px 0px;z-index:999"
        ></p>
      </el-col>
    <!-- 表格 -->
    <template>
      <el-table
        border  
        :data="userlist" 
        :row-style="{height:'40px'}"
        style="width: 100%;margin-top:20px 0px;padding-bottom:40px;"
        :cell-style="{padding:'0px'}"
        >
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="name" label="单位名称" show-overflow-tooltip></el-table-column>
        <el-table-column prop="regId" label="登记证编号" show-overflow-tooltip></el-table-column>
        <el-table-column prop="gasId" label="气瓶编号" show-overflow-tooltip></el-table-column>
        <el-table-column prop="appId" label="电子标签号"></el-table-column>
        <el-table-column sortable prop="createTime" label="充装时间"  :formatter="dateFormat" show-overflow-tooltip>
           <!-- <template slot-scope="socpe">{{socpe.row.createTime | fmtdate}}</template> -->

        </el-table-column>
        <el-table-column show-overflow-tooltip prop="gunId" label="充装枪号"></el-table-column>
        <el-table-column show-overflow-tooltip prop="fillingVolume" label="充装量(kg)"></el-table-column>

        <el-table-column sortable show-overflow-tooltip prop label="下次检验日期">
          <template slot-scope="socpe">{{socpe.row.nextCheckDate | fmtdate}}</template>
        </el-table-column>

        <el-table-column prop="state" label="充装状态">
              <template slot-scope="scope">
              <p v-if="userlist[scope.$index].state==0">正常</p>
              <p style="background-color:orange;color:white;padding: 10px 5px;" v-if="userlist[scope.$index].state==1">异常</p>
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
  </el-card>
  </div>
</template>
<script>
export default {
  name: "abnormal",
  data() {
    return {
      name:"",
      gunId:"",
      gasId: "",
      createTime: "",
      endTime: "",
      userlist: [],
      //分页相关数据
      total: -1,
      currPage: 1,
      page: 1,
      pageSize: 10,
      unitName:"", 
      danwei:[],     
    };
  },
  created() {
    this.getUserlist();
    this.danName();
  },
  methods: {
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
      const res = await this.$http.get(
        `scanning/records/singleList?pageSize=${this.pageSize}&currPage=${this.page}&gasId=${this.gasId}&gunId=${this.gunId}&createTime=${this.createTime}&endTime=${this.endTime}&unitName=${this.unitName}`
      );
      this.userlist = res.data.data.list;
      this.total = res.data.data.totalCount;
      this.currPage = 1;
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
    },
    async danName(){
      const res = await this.$http.get(`/unitdrop/warning`);
      console.log(res);
      this.danwei=res.data.data;
    },
    async getUserlist() {
      const res = await this.$http.get(
        `scanning/records/singleList?pageSize=${this.pageSize}&currPage=${this.page}`
      );
      console.log(res);
      // const {
      //   meta: { status, msg },
      //   data: { users, total }
      // } = res.data;
      if (res.status === 200) {
        // 1.给表格数据赋值
        // 给总数赋值
        // 提示
        // 表格通过prop进行赋值展示一般数据
        this.userlist = res.data.data.list;
        this.total = res.data.data.totalCount;
        this.totalPage = res.data.data.totalPage;
        // this.$message.success(msg);
      } else {
        this.$message.warning("获取失败");
      }
    }
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