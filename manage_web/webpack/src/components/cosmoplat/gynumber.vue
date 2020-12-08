<template>
  <div>
    <div style="background:white;width:99.1%;padding-left:15px">
      <my-bread level1="综合查询" level2="工业气瓶" level3="气瓶数量状态"></my-bread>
    </div>
    <el-card class="box-card" style="margin:20px 20px 0 20px;">
      <!--搜索  -->
      <el-row>
        <el-col :span="24">
          <h5 style="border-bottom:1px solid #ece8e8;padding-bottom:15px;padding-left:15px">查询信息</h5>
        </el-col>
        <el-col style="padding-left:15px" :span="22">
          <el-col :span="4">
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
            <el-select
              class="chioce"
              size="small"
              style=" width: 100%;"
              @clear="loadUserList()"
              clearable
              v-model="siteId"
              @input="searchUser()"
              placeholder="状态查询"
            >
              <el-option
                v-for="item in sTatus"
                :key="item.id"
                :label="item.siteNames"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-col>
          <el-col style="padding-left:30px" :span="4">
            <el-select
              size="small"
              style=" width: 100%;"
              @clear="loadUserList()"
              clearable
              v-model="medium"
              placeholder="请选择介质"
            >
              <el-option
                v-for="item in selects2"
                :key="item.id"
                :label="item.orders"
                :value="item.orders"
              ></el-option>
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
      <el-col style="margin-bottom:5px;margin-top:5px" :span="24">
        <el-col :span="22">&nbsp;</el-col>
        <!-- <el-col :span="2">
          <el-button size="mini" plain icon="el-icon-delete" @click="showDeleUserMsgBox">删除</el-button>
        </el-col>-->
      </el-col>
      <!-- 表格 -->
      <template>
        <el-table
          border
          :data="userlist"
          style="width: 100%;margin:10px 0px;padding-bottom:40px"
          :row-style="{height:'40px'}"
          :cell-style="{padding:'0px'}"
        >
          <!-- @selection-change="handleCurrentChanges" -->
          <!-- <el-table-column type="selection" width="55"></el-table-column> -->
          <el-table-column type="index" label="序号" width="50" show-overflow-tooltip></el-table-column>
          <el-table-column show-overflow-tooltip prop="regId" label="档案号"></el-table-column>
          <el-table-column show-overflow-tooltip prop="departmentName" label="所属单位"></el-table-column>
          <el-table-column show-overflow-tooltip prop="gasId" label="气瓶号"></el-table-column>
          <el-table-column show-overflow-tooltip prop="appid" label="标签号">
            <!-- <template slot-scope="scope">
              <p v-if="userlist[scope.$index].appid==0">无</p>
              
            </template>-->
          </el-table-column>
          <el-table-column show-overflow-tooltip prop="medium" label="介质"></el-table-column>
          <el-table-column show-overflow-tooltip label="生产日期">
            <template slot-scope="socpe">{{socpe.row.makeData | fmtdate}}</template>
          </el-table-column>

          <el-table-column show-overflow-tooltip label="检验日期">
            <template slot-scope="socpe">{{socpe.row.checkData | fmtdate}}</template>
          </el-table-column>
          <el-table-column show-overflow-tooltip label="下检日期">
            <template slot-scope="socpe">{{socpe.row.nextCheckData | fmtdate}}</template>
          </el-table-column>
          <el-table-column show-overflow-tooltip prop="useStatus" label="配送状态">
            <template slot-scope="scope">
              <p v-if="userlist[scope.$index].useStatus==0">入站中</p>
              <p v-if="userlist[scope.$index].useStatus==1">配送中</p>
              <p v-if="userlist[scope.$index].useStatus==2">出站中</p>
              <!-- <p v-if="userlist[scope.$index].useStatus==3">配送完成</p> -->
            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip prop="checkStatus" label="检验状态">
            <template slot-scope="scope">
              <p v-if="userlist[scope.$index].checkStatus==0">不合格</p>
              <p v-if="userlist[scope.$index].checkStatus==1">合格</p>
              <p v-if="userlist[scope.$index].checkStatus==2">超期未检</p>
              <p v-if="userlist[scope.$index].checkStatus==3">即将超期</p>
            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip prop="employeeName" label="配送人员"></el-table-column>

          <!-- 表格操作 -->
          <!-- <el-table-column prop="address" width="100" label="操作">
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
          </el-table-column>-->
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
  name: "number",
  data() {
    return {
      gasId: "",
      userlist: [],
      //分页相关数据
      total: -1,
      currPage: 1,
      page: 1,
      pageSize: 10,
      siteId: "",
      medium:"",
      // 添加对话框的属性
      selects2: [
        {
          id: 1,
          orders: "CNG"
        },
        {
          id: 2,
          orders: "LPG"
        },
        {
          id: 3,
          orders: "LNG"
        },
        {
          id: 4,
          orders: "H2"
        },
        {
          id: 5,
          orders: "N2"
        }
      ],
      sTatus: [
        {
          id: 0,
          siteNames: "入站中"
        },
        {
          id: 1,
          siteNames: "配送中"
        },
        {
          id: 2,
          siteNames: "出站中"
        }
      ]
      // dialogFormVisibleEdit: false,
      // dialogFormVisibleRoleshow: false,
      // multipleSelection: [], //批量删除数据
      // delarr: [] //批量删除id
    };
  },

  methods: {
    // 多选
    // handleCurrentChanges(val) {
    //   this.multipleSelection = val;
    //   // this.showDeleUserMsgBox = val.length;
    // },

    // 批量删除请求数据
    // showDeleUserMsgBox() {
    //   for (let i = 0; i <= this.multipleSelection.length - 1; i++) {
    //     this.delarr.push(this.multipleSelection[i].id);
    //   }
    //   console.log(this.delarr);
    //   this.$confirm("删除用户, 是否继续?", "提示", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     type: "warning"
    //   })
    //     .then(async () => {
    //       // 注意async的位置，最近的位置
    //       // 发送删除请求:id:用户id
    //       // 1.data中找userId
    //       // 2.把userID以showDeleUserMsgBox参数形式传进来
    //       const res = await this.$http.post(
    //         `/public/gas/manageGasBasicCylinder/login/logindel/delete`,
    //         this.delarr
    //       );
    //       console.log(res);
    //       this.getUserlist();
    //       // 提示
    //       if (res.data.code == 0) {
    //         this.delarr = [];
    //         this.$message({
    //           type: "success",
    //           message: res.data.msg
    //         });
    //       } else if (res.data.code == 1) {
    //         this.delarr = [];
    //         this.$message({
    //           type: "warning",
    //           message: res.data.msg
    //         });
    //       }
    //     })
    //     .catch(() => {
    //       this.$message({
    //         type: "info",
    //         message: "已取消删除"
    //       });
    //     });
    // },

    //删除用户 打开消息盒子
    // showDeleUserMsgBox(userId) {
    //   // 提示框 点击确定走.then
    //   // 点取消 走.catch
    //   this.$confirm("删除用户, 是否继续?", "提示", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     type: "warning"
    //   })
    //     .then(async () => {
    //       // 注意async的位置，最近的位置
    //       // 发送删除请求:id:用户id
    //       // 1.data中找userId
    //       // 2.把userID以showDeleUserMsgBox参数形式传进来
    //       const res = await this.$http.delete(
    //         `/public/gas/manageGasBasicCylinder/login/logindel/${userId}`
    //       );
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
    //       } else {
    //         this.$message({
    //           type: "danger",
    //           message: "删除失败"
    //         });
    //       }
    //     })
    //     .catch(() => {
    //       this.$message({
    //         type: "info",
    //         message: "已取消删除"
    //       });
    //     });
    // },

    //清空搜索框搜索数据 点击清楚按钮清除数据重新发送请求
    loadUserList() {
      this.getUserlist();
    },
    // 搜索用户 给搜索框绑定query v-model="query"
    async searchUser() {
      const res = await this.$http.get(
        `/public/industrial/manageGasBasicCylinder/list?pageSize=${this.pageSize}&currPage=${this.page}&gasId=${this.gasId}&useStatus=${this.siteId}&medium=${this.medium}`
      );
      this.userlist = res.data.data.list;
      this.total = res.data.data.totalCount;
      console.log(this.userlist);
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
      //this.userlist=res.data.data.list
    },
    async getUserlist() {
      const res = await this.$http.get(
        `/public/industrial/manageGasBasicCylinder/list?pageSize=${this.pageSize}&currPage=${this.currPage}&gasId=${this.gasId}`
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

/* .input-serach {
  width: 400px;
} */
.el_button {
  background-color: #66b1ff !important;
  border-color: #66b1ff !important;
  color: #fff !important;
}
</style>