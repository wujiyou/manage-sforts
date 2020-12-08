<template>
  <div>
    <div style="background:white;width:99.1%;padding-left:15px">
      <my-bread level1="综合查询" level2="工业气瓶" level3="配送完成气瓶"></my-bread>
    </div>
    <el-card class="box-card" style="margin:20px 20px 0 20px;">
      <!--搜索  -->
      <el-row>
        <el-col :span="24">
          <h5 style="border-bottom:1px solid #ece8e8;padding-bottom:15px;padding-left:15px">查询信息</h5>
        </el-col>

        <el-col :span="22">
          <el-col style="padding-left:15px" :span="4">
            <el-select
              filterable
              @clear="loadUserList()"
              clearable
              size="small"
              style=" width: 100%;"
              @input="searchUser()"
              v-model="unitId"
              placeholder="所属单位"
            >
              <el-option
                v-for="item in select"
                :key="item"
                :label="item"
                :value="item"
              ></el-option>
              
            </el-select>
          </el-col>

          <el-col style="padding-left:30px" :span="4">
            <el-input
              size="small"
              style=" width: 100%;"
              @clear="loadUserList()"
              clearable
              class="input-serach"
              placeholder="请输入档案号"
              v-model="regId"
            ></el-input>
          </el-col>

          <el-col style="padding-left:30px" :span="4">
            <el-input
              size="small"
              style=" width: 100%;"
              @clear="loadUserList()"
              clearable
              class="input-serach"
              placeholder="请输入气瓶号"
              v-model="gasId"
            ></el-input>
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
      </el-row>
      <el-col :span="24">
        <p
          style="width:100%;height:1px;background:rgb(236, 232, 232);margin:20px 0px 20px 0px;z-index:999"
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
          <el-table-column type="index" label="序号" width="70" show-overflow-tooltip>
            <template slot-scope="socpe">
              <p style="cursor:pointer;">{{socpe.$index+1}}</p>
            </template>
          </el-table-column>
          <el-table-column prop="regId" label="档案号"></el-table-column>
          <el-table-column prop="gasId" label="气瓶号"></el-table-column>
          <el-table-column prop="appid" label="标签号"></el-table-column>
          <el-table-column prop="name" label="所属单位"></el-table-column>
          <el-table-column label="生产日期">
            <template slot-scope="socpe">{{socpe.row.makeData | fmtdate}}</template>
          </el-table-column>
          <el-table-column label="检验日期">
            <template slot-scope="socpe">{{socpe.row.checkData | fmtdate}}</template>
          </el-table-column>
          <el-table-column label="下检日期">
            <template slot-scope="socpe">{{socpe.row.nextCheckData | fmtdate}}</template>
          </el-table-column>

          <el-table-column prop="useStatus" label="气瓶检验状态" :formatter="ifendcase"></el-table-column>
          <el-table-column prop="useStatus" label="配送状态" :formatter="ifendcase"></el-table-column>
          <el-table-column prop="operatePerson" label="配送人员"></el-table-column>

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

    </el-card>
  </div>
</template>
<script>
export default {
  name: "tagboard",
  data() {
    return {
      regId: "",
      gasId: "",
      appId: "",
      // vestingUnit: "",
      unitId: "",
      vestingUnit: "",
      userlist: [],
      //分页相关数据
      total: -1,
      currPage: 1,
      page: 1,
      pageSize: 10,

      // 添加对话框的属性
      // dialogFormVisibleAdd: false,
      dialogFormVisibleEdit: false,
      // dialogFormVisibleRoleshow: false,
      //添加用户的表单的数据
      // form: {
      //   regId: "",
      //   gasId: "",
      //   appId: "",
      //   makeData: "",
      //   checkData: "",
      //   nextCheckData: "",
      //   useStatus:"",
      //   operatePerson: "",
      //   fillingData: ""
      // },
      options: [
        {
          value: 3,
          label: "配送完成"
        }
      ],
      select: [],

      rules: {
        gasId: [{ required: true, message: "气瓶号不能为空", trigger: "blur" }],
        telephone: [
          { required: true, message: "标签号不能为空", trigger: "blur" }
        ],
        name: [
          { required: true, message: "客户姓名不能为空", trigger: "blur" }
        ],
        address: [{ required: true, message: "不能为空", trigger: "blur" }],

        anzCheck: [
          { required: true, message: "检验状态不能为空", trigger: "blur" }
        ],
        gereCheck: [{ required: true, message: "不能为空", trigger: "blur" }],
        ruguCheck: [{ required: true, message: "不能为空", trigger: "blur" }],
        chtouCheck: [{ required: true, message: "不能为空", trigger: "blur" }],
        shwaiCheck: [{ required: true, message: "不能为空", trigger: "blur" }]
      },

      editUserForm: {
        gasId: "",
        telephone: "",
        name: "",
        address: "",
        anzCheck: "",
        gereCheck: "",
        ruguCheck: "",
        chtouCheck: "",
        shwaiCheck: "",
        image: ""
      },
      // 分配角色,
      currRoleId: -1,
      //   分配当前用户id
      currusrId: -1,
      roles: [],
      currUsername: ""
      //   保存所有角色数据
    };
  },

  methods: {
    // 所属单位查询
    async suosudan() {
      const res = await this.$http.get(`query/industrial/unitList`);
      console.log(res);
      this.select = res.data.data;
      //  /public/gas/manageGasBasicCylinder/affiliated/company
    },
    // 关闭弹框
    close() {
      this.editUserForm = {};
      this.dialogFormVisibleEdit = false;
    },
    ifendcase(val) {
      if (val.useStatus == "3") {
        return "配送完成";
      }
    },



    //清空搜索框搜索数据 点击清楚按钮清除数据重新发送请求
    loadUserList() {
      this.getUserlist();
    },
    // 搜索用户 给搜索框绑定query v-model="query"
    async searchUser() {
      const res = await this.$http.get(
        `/query/industrial/list?unitId=${this.unitId}&regId=${this.regId}&gasId=${this.gasId}&pageSize=${this.pageSize}&currPage=${this.page}`
      );
      console.log(res);

      this.userlist = res.data.data.list;
      this.total = res.data.data.totalCount;
      //  console.log(this.userlist);
      this.currPage = 1;
      // this.getUserlist();
      // console.log("aaaaaa");
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
      const res = await this.$http.get(
        `/query/industrial/list?unitId=${this.unitId}&regId=${this.regId}&gasId=${this.gasId}&pageSize=${this.pageSize}&currPage=${this.currPage}`
      );
      console.log(res);
      // console.log(res.data.data.totalCount);

      this.userlist = res.data.data.list;
      this.total = res.data.data.totalCount;
    }
  },
  created() {
    this.getUserlist();
    this.suosudan();
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