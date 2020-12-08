<template>
  <div>
    <div style="background:white;width:99.1%;padding-left:15px">
      <my-bread level1="综合查询" level2="工业气瓶" level3="客户订单管理"></my-bread>
      <!--搜索  -->
    </div>
    <el-card class="box-card" style="margin:20px 20px 0 20px;">
      <el-row>
        <el-col :span="24">
          <h5 style="border-bottom:1px solid #ece8e8;padding-bottom:15px;padding-left:15px">查询用户</h5>
        </el-col>
        <el-col :span="24">
          <el-col style="padding-left:15px" :span="4">
            <el-input
              size="small"
              style=" width: 100%;"
              @clear="loadUserList()"
              clearable
              class="input-serach"
              placeholder="请输入订单编号"
              v-model="orderNumber"
            ></el-input>
          </el-col>

          <el-col style="margin-left:30px" :span="4">
            <el-button
              style=" width:100%;"
              size="small"
              @click="searchUser()"
              class="el_button"
              icon="el-icon-search"
            >搜索</el-button>
          </el-col>
          <el-col :span="12">&nbsp;</el-col>
          <el-col :span="2">
            <el-button
              size="small"
              style="font-size:13px"
              plain
              icon="el-icon-delete"
              @click="showDeleUserMsgBox"
              type="danger"
            >删除</el-button>
          </el-col>

          <!-- <el-button size="small" @click="showAddUserDia()">
            <i style="padding-right:10px" class="el-icon-plus"></i>新增
          </el-button>-->
        </el-col>
      </el-row>

      <!-- 表格 -->
      <template>
        <el-tabs style="margin-top:15px;" v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="待接单" name="first">
            <el-table
              border
              :data="userlist"
              style="width: 100%;margin:20px 0px"
              :row-style="{height:'40px'}"
              :cell-style="{padding:'0px'}"
              @selection-change="handleCurrentChanges"
            >
              <el-table-column type="selection" width="50"></el-table-column>
              <el-table-column type="index" label="序号" width="50" show-overflow-tooltip>
                <template slot-scope="socpe">
                  <p style="cursor:pointer;" @click="showEdituser(socpe.row)">{{socpe.$index+1}}</p>
                </template>
              </el-table-column>
              <el-table-column show-overflow-tooltip prop="customerName" label="姓名"></el-table-column>
              <el-table-column show-overflow-tooltip prop="orderNumber" label="订单编号"></el-table-column>
              <el-table-column
                show-overflow-tooltip
                prop="createdTime"
                :formatter="dateFormat"
                label="接单时间"
              >
                <!-- <template slot-scope="socpe">{{socpe.row.createdTime | fmtdate}}</template> -->
              </el-table-column>
              <el-table-column show-overflow-tooltip prop="unitName" label="配送站点"></el-table-column>
              <el-table-column show-overflow-tooltip prop="bottleNumber" label="需求量"></el-table-column>
              <el-table-column show-overflow-tooltip prop="phone" label="联系电话"></el-table-column>
              <!-- <el-table-column show-overflow-tooltip prop="state" label="订单状态">
                <template slot-scope="scope">
                  <p v-if="userlist[scope.$index].state==0">待接单</p>
                  <p v-if="userlist[scope.$index].state==1">已接单</p>
                  <p v-if="userlist[scope.$index].state==2">已完成</p>
                </template>
              </el-table-column>-->
              <!-- <el-table-column show-overflow-tooltip prop="sitePersonnelName" label="接单员"></el-table-column> -->

              <!-- 表格操作 -->
              <!-- <el-table-column prop="address" width="100" label="操 作">
                <template slot-scope="scope">
                 
                  <el-tooltip
                    class="item"
                    effect="dark"
                    content="修改信息"
                    :enterable="false"
                    placement="top"
                  >
                    <el-button
                      type="primary"
                      size="mini"
                      title="修改"
                      plain
                      icon="el-icon-edit"
                      @click="showEdituser(scope.row)"
                      circle
                    ></el-button>
                  </el-tooltip>
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
          </el-tab-pane>
          <el-tab-pane label="已接单" name="second">
            <el-table
              border
              :data="userlist"
              style="width: 100%;margin:20px 0px"
              :row-style="{height:'40px'}"
              :cell-style="{padding:'0px'}"
            >
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column type="index" label="序号" width="50" show-overflow-tooltip>
                <template slot-scope="socpe">
                  <p style="cursor:pointer;" @click="showEdituser(socpe.row)">{{socpe.$index+1}}</p>
                </template>
              </el-table-column>
              <el-table-column show-overflow-tooltip prop="customerName" label="姓名"></el-table-column>
              <el-table-column show-overflow-tooltip prop="orderNumber" label="订单编号"></el-table-column>
              <el-table-column
                show-overflow-tooltip
                prop="createdTime"
                :formatter="dateFormat"
                label="接单时间"
              >
                <!-- <template slot-scope="socpe">{{socpe.row.createdTime | fmtdate}}</template> -->
              </el-table-column>
              <el-table-column show-overflow-tooltip prop="unitName" label="配送站点"></el-table-column>
              <el-table-column show-overflow-tooltip prop="bottleNumber" label="需求量"></el-table-column>
              <el-table-column show-overflow-tooltip prop="phone" label="联系电话"></el-table-column>
              <!-- <el-table-column show-overflow-tooltip prop="state" label="订单状态">
                <template slot-scope="scope">
                  <p v-if="userlist[scope.$index].state==0">待接单</p>
                  <p v-if="userlist[scope.$index].state==1">已接单</p>
                  <p v-if="userlist[scope.$index].state==2">已完成</p>
                </template>
              </el-table-column>-->
              <el-table-column show-overflow-tooltip prop="sitePersonnelName" label="接单员"></el-table-column>

              <!-- 表格操作 -->
              <!-- <el-table-column prop="address" width="100" label="操 作">
                <template slot-scope="scope">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    content="修改信息"
                    :enterable="false"
                    placement="top"
                  >
                    <el-button
                      type="primary"
                      size="mini"
                      title="修改"
                      plain
                      icon="el-icon-edit"
                      @click="showEdituser(scope.row)"
                      circle
                    ></el-button>
                  </el-tooltip>

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
          </el-tab-pane>

          <el-tab-pane label="已完成" name="third">
            <el-table
              border
              :data="userlist"
              style="width: 100%;margin:20px 0px"
              :row-style="{height:'40px'}"
              :cell-style="{padding:'0px'}"
            >
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column type="index" label="序号" width="50" show-overflow-tooltip>
                <template slot-scope="socpe">
                  <p style="cursor:pointer;" @click="showEdituser(socpe.row)">{{socpe.$index+1}}</p>
                </template>
              </el-table-column>
              <el-table-column show-overflow-tooltip prop="customerName" label="姓名"></el-table-column>
              <el-table-column show-overflow-tooltip prop="orderNumber" label="订单编号"></el-table-column>
              <el-table-column
                show-overflow-tooltip
                prop="createdTime"
                :formatter="dateFormat"
                label="接单时间"
              >
                <!-- <template slot-scope="socpe">{{socpe.row.createdTime | fmtdate}}</template> -->
              </el-table-column>
              <el-table-column show-overflow-tooltip prop="unitName" label="配送站点"></el-table-column>
              <el-table-column show-overflow-tooltip prop="bottleNumber" label="需求量"></el-table-column>
              <el-table-column show-overflow-tooltip prop="phone" label="联系电话"></el-table-column>
              <el-table-column show-overflow-tooltip prop="sitePersonnelName" label="接单员"></el-table-column>

              <!-- 表格操作 -->
              <!-- <el-table-column prop="address" width="100" label="操 作">
                <template slot-scope="scope">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    content="修改信息"
                    :enterable="false"
                    placement="top"
                  >
                    <el-button
                      type="primary"
                      size="mini"
                      title="修改"
                      plain
                      icon="el-icon-edit"
                      @click="showEdituser(scope.row)"
                      circle
                    ></el-button>
                  </el-tooltip>
                  
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
          </el-tab-pane>
          <!-- 修改对话框 -->
          <el-dialog
            title="修改信息"
            v-dialogDrag
            :close-on-click-modal="false"
            :visible.sync="dialogFormVisibleEdit"
          >
            <el-form :model="editUserForm" :rules="rules">
              <el-form-item label="订单编号" label-width="100px" prop="orderNumber">
                <el-input disabled v-model="editUserForm.orderNumber" autocomplete="off"></el-input>
              </el-form-item>

              <el-form-item label="客户信息" label-width="100px" prop="name">
                <el-input disabled v-model="editUserForm.username" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="接单时间" label-width="100px" prop="createdTime">
                <el-date-picker
                  disabled
                  type="date"
                  placeholder="选择日期"
                  v-model="editUserForm.createdTime"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="配送站点" label-width="100px" prop="deliverySite">
                <el-input disabled v-model="editUserForm.name" autocomplete="off"></el-input>
              </el-form-item>

              <el-form-item label="接单员" label-width="100px" prop="orderClerk">
                <el-select v-model="editUserForm.sitePersonnelName" placeholder="请选择接单员">
                  <el-option
                    v-for="item in level"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
                <!-- <el-input v-model="editUserForm.employeeName" autocomplete="off"></el-input> -->
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
              <el-button type="primary" @click="EditUser()">确 定</el-button>
            </div>
          </el-dialog>

          <!-- 新增对话框 -->
          <el-dialog
            title="新增信息
          "
            :visible.sync="dialogFormVisibleadd"
            :close-on-click-modal="false"
          >
            <el-form :model="editUserForm" :rules="rules">
              <el-form-item label="订单编号" label-width="100px" prop="orderNo">
                <el-input v-model="editUserForm.orderNo" autocomplete="off"></el-input>
              </el-form-item>

              <el-form-item label="客户信息" label-width="100px" prop="name">
                <el-input v-model="editUserForm.name" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="接单时间" label-width="100px" prop="createTime">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="editUserForm.createTime"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="配送站点" label-width="100px" prop="siteName">
                <el-input v-model="editUserForm.siteName" autocomplete="off"></el-input>
              </el-form-item>

              <!-- <el-form-item label="订单状态" label-width="100px" prop="state">
                <el-select v-model="editUserForm.state" placeholder="请选择订单状态">
                  <el-option
                    v-for="item in level"
                    :key="item.id"
                    :label="item.state"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>-->
              <el-form-item label="接单员" label-width="100px" prop="orderClerk">
                <el-select v-model="editUserForm.employeeName" placeholder="请选择接单员">
                  <el-option
                    v-for="item in level"
                    :key="item.id"
                    :label="item.state"
                    :value="item.id"
                  ></el-option>
                </el-select>
                <!-- <el-input v-model="editUserForm.employeeName" autocomplete="off"></el-input> -->
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisibleadd = false">取 消</el-button>
              <el-button type="primary" @click="AddUser()">确 定</el-button>
            </div>
          </el-dialog>
        </el-tabs>
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
  name: "order",
  data() {
    return {
      activeName: "first", //tab选项卡
      orderNumber: "",
      orderNo: "",
      userlist: [], //未禁用
      state: 0,
      //分页相关数据
      total: -1,
      currPage: 1,
      pageSize: 10,
      page: 1,
      dialogFormVisibleEdit: false,
      dialogFormVisibleadd: false,
      // 编辑
      editUserForm: {
        orderNumber: "",
        username: "",
        createdTime: "",
        name: "",
        sitePersonnelName: ""
      },
      level: [],

      rules: {
        orderNumber: [
          { required: true, message: "订单编号不能为空", trigger: "blur" }
        ],
        name: [
          { required: true, message: "客户信息不能为空", trigger: "blur" }
        ],
        createdTime: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "blur"
          }
        ],
        siteName: [
          { required: true, message: "配送站点不能为空", trigger: "blur" }
        ],
        sitePersonnelName: [
          { required: true, message: "接单员不能为空", trigger: "blur" }
        ]
      },
      multipleSelection: [], //批量删除数据
      delarr: [] //批量删除id
    };
  },

  methods: {
    dateFormat: function(row, column) {
      var date = row[column.property];
      if (date === null) {
        return "0:0:0";
      }
      var moment = require("moment");
      return moment(date).format("YYYY-MM-DD HH:mm:ss");
      //HH:mm:ss
    },
    // 多选
    handleCurrentChanges(val) {
      this.multipleSelection = val;
      // this.showDeleUserMsgBox = val.length;
    },

    // 批量删除请求数据
    showDeleUserMsgBox() {
      for (let i = 0; i <= this.multipleSelection.length - 1; i++) {
        this.delarr.push(this.multipleSelection[i].id);
      }
      if (this.delarr == "") {
        this.$message({
          type: "error",
          message: "请选择需要删除的数据"
        });
      } else {
        this.$confirm("删除用户, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(async () => {
            // 注意async的位置，最近的位置
            // 发送删除请求:id:用户id
            // 1.data中找userId
            // 2.把userID以showDeleUserMsgBox参数形式传进来
            const res = await this.$http.post(
              `/industrial-customer-order`,
              this.delarr
            );
            console.log(res);
            this.getUserlist();
             this.delarr = [];
            // 提示
            if (res.data.code == 0) {
             
              this.$message({
                type: "success",
                message: res.data.msg
              });
            } else if (res.data.code == 1) {
             
              this.$message({
                type: "warning",
                message: res.data.msg
              });
            }
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
             this.delarr = [];
          });
      }
    },

    async AddUser() {
      this.dialogFormVisibleadd = false;
      const res = await this.$http.post(
        `/public/customer/orderinformation/save`,
        this.editUserForm
      );
      console.log(res);
    },
    showAddUserDia() {
      this.dialogFormVisibleadd = true;
      this.editUserForm = {};
    },
    //tab选项卡
    handleClick(tab, event) {
      console.log(tab);
      if (tab.name === "first") {
        this.state = 0;
        //  this.isDisable=false;
        this.getUserlist();
      } else if (tab.name === "second") {
        this.state = 1;
        //  this.isDisable=true;
        this.getUserlist();
      } else {
        this.state = 2;
        //  this.isDisable=true;
        this.getUserlist();
      }
    },
    //清空搜索框搜索数据 点击清楚按钮清除数据重新发送请求
    loadUserList() {
      this.getUserlist();
    },
    // 搜索用户 给搜索框绑定query v-model="query"
    async searchUser() {
      const res = await this.$http.get(
        `/industrial-customer-order/findPage?rows=${this.pageSize}&page=${this.page}&orderNumber=${this.orderNumber}&state=${this.state}`
      );
      this.userlist = res.data.data.list;
      this.total = res.data.data.totalCount;
      //  console.log(this.userlist);
      this.currPage = 1;
    },

    // 编辑用户发送请求
    async EditUser() {
      //   users/:id
      this.dialogFormVisibleEdit = false;
      const res = await this.$http.put(`/pc-customer-order`, this.editUserForm);

      console.log(res);
      if (res.data.code === 0) {
        // 回到第一页展示
        //this.pagenum = 1;
        // 重新请求数据
        this.getUserlist();
        // 提示
        this.$message({
          type: "success",
          message: res.data.msg
        });
      } else {
        this.$message({
          type: "danger",
          message: "修改失败"
        });
      }
    },

    // 编辑对话框打开
    async showEdituser(user) {
      console.log(user);
      this.editUserForm = user;
      this.dialogFormVisibleEdit = true;
      this.siteId = user.siteId;
      const res = await this.$http.get(`/pc-customer-order/${this.siteId}`);
      console.log(res);
      this.level = res.data.data;

      // 2.添加对话框

      //user其实就是scope.row也就是userlist
    },

    //分页功能
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      // 1.每页显示条数的改变
      this.pageSize = val;
      // 回到第一页
      this.currPage = 1;
      // 希望当页条数改变时 从第一页开始显示 this.pagenum = 1 -》currPage=1?
      this.searchUser();
    },
    handleCurrentChange(val) {
      //页码改变时
      console.log(`当前页: ${val}`);
      this.currPage = val;
      this.searchUser();
    },
    // async getUserlist(){

    // },
    async getUserlist(val = 0) {
      const res = await this.$http.get(
        `/industrial-customer-order/findPage?rows=${this.pageSize}&page=${this.currPage}&orderNo=${this.orderNo}&state=${this.state}`
      );
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
.el-table th,
.el-table td {
  text-align: center !important;
}
</style>