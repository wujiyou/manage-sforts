<template>
  <div>
    <el-card class="box-card">
      <!--搜索  -->
      <el-row>
        <el-col :span="24">
          <h5 style="border-bottom:1px solid #ece8e8;padding-bottom:15px;padding-left:15px"></h5>
        </el-col>

        <!-- <el-col style="padding-left:15px" :span="22">
          <el-col :span="4">
            <el-input
              size="small"
              style=" width: 100%;"
              @clear="loadUserList()"
              clearable
              class="input-serach"
              placeholder="请输入姓名"
              v-model="username"
              @input="searchUser"
            ></el-input>
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
        </el-col>-->
      </el-row>
      <el-col :span="24">
        <p
          style="width:100%;height:1px;background:rgb(236, 232, 232);margin:20px 0px 0px 0px;z-index:999"
        ></p>
      </el-col>

      <el-col style="margin-bottom:10px;margin-top:10px" :span="24">
        <el-col :span="20">&nbsp;</el-col>
        <el-col :span="2">
          <el-button type="success" style="font-size:13px" @click="showAddUserDia()" size="small">
            <i style="padding-right:10px" class="el-icon-plus"></i>新增
          </el-button>
        </el-col>

        <el-col :span="2">
          <el-button
            style="font-size:13px"
            size="small"
            type="danger"
            plain
            icon="el-icon-delete"
            @click="showDeleUserMsgBox"
          >删除</el-button>
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
          @selection-change="handleCurrentChanges"
        >
          <el-table-column type="selection" width="50"></el-table-column>
          <el-table-column type="index" label="序号" width="50" style="line-height:30px">
            <template slot-scope="socpe">
              <p style="cursor:pointer;" @click="showEdituser(socpe.row)">{{socpe.$index+1}}</p>
            </template>
          </el-table-column>
          <el-table-column prop="username" label="员工姓名" show-overflow-tooltip></el-table-column>
          <el-table-column prop="phone" label="联系电话" show-overflow-tooltip></el-table-column>
          <el-table-column prop="idCard" label="身份证" show-overflow-tooltip></el-table-column>

          <el-table-column prop="labelNo" label="标签号" show-overflow-tooltip></el-table-column>
          <el-table-column prop="noDateStart" label="发证日期" show-overflow-tooltip>
            <template slot-scope="socpe">{{socpe.row.noDateStart | fmtdate}}</template>
          </el-table-column>
          <el-table-column prop="noDateEnd" label="换证日期" show-overflow-tooltip>
            <template slot-scope="socpe">{{socpe.row.noDateEnd | fmtdate}}</template>
          </el-table-column>
          <!-- noDateEnd -->
          <el-table-column prop="cardInformation" label="发卡信息" show-overflow-tooltip>
            <template slot-scope="scope">
              <p v-if="userlist[scope.$index].cardInformation==0">未发卡</p>
              <p v-if="userlist[scope.$index].cardInformation==1">已发卡</p>
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
        ref="dialog__wrapper"
        :close-on-click-modal="false"
        :visible.sync="dialogFormVisibleAdd"
        width="80%"
        append-to-body
      >
        <el-form :model="form" :rules="rulses" ref="form">
          <!-- ref="form" -->
          <el-col :span="24">
            <el-col :span="8">
              <el-form-item hidden prop="provinceCode" label-width="140px" label="行政省份:">
                <el-select
                  :disabled="showCmd"
                  v-model="form.provinceCode"
                  @change="function2(form.provinceCode)"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in ProvinceId"
                    :key="item.id"
                    :label="item.name"
                    :value="item.code"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item hidden prop="cityCode" label-width="140px" label="市级区域:">
                <el-select
                  :disabled="showCmd_1"
                  v-model="form.cityCode"
                  @change="function1(form.cityCode)"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in CityId"
                    :key="item.id"
                    :label="item.name"
                    :value="item.code"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item hidden prop="areaCode" label-width="140px" label="区级:">
                <el-select :disabled="showCmds" v-model="form.areaCode" placeholder="请选择">
                  <el-option
                    v-for="item in AreaId"
                    :key="item.id"
                    :label="item.name"
                    :value="item.code"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="8">
              <el-form-item  label="员工编号(10-255):" label-width="140px" prop="code">
                <el-input maxlength="3" v-model="form.code" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="身份证号:" label-width="140px" prop="idCard">
                <el-input v-model="form.idCard" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item class="red_s" label="员工姓名:" label-width="140px" prop="username">
                <el-input v-model="form.username" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="8">
              <el-form-item label="联系电话:" label-width="140px" prop="phone">
                <el-input v-model="form.phone" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item class="red_s" label="发证日期" label-width="150px" prop="noDateStart">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="form.noDateStart"
                  value-format="yyyy-MM-dd"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <!-- <el-col :span="8">
              <el-form-item label="单位名称:" label-width="140px" prop="name">
                <el-input v-model="form.name" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>-->
            <!-- 
            <el-col :span="8">
              <el-form-item label="发卡信息:" label-width="140px" prop="cardInformation">
               
                <el-select style="width: 100%" v-model="form.cardInformation">
                  <el-option
                    v-for="item in optionslei"
                    :key="item.id"
                    :label="item.lei"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>-->

            <el-col :span="8">
              <el-form-item class="red_s" label="作业人员证号:" label-width="140px" prop="operatorsNo">
                <el-input v-model="form.operatorsNo" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="8">
              <el-form-item class="red_s" label="换证日期:" label-width="140px" prop="noDateEnd">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="form.noDateEnd"
                  value-format="yyyy-MM-dd"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <!-- <el-form-item label="标签号:" label-width="140px" prop="labelNo">
                <el-input v-model="form.labelNo" autocomplete="off"></el-input>
              </el-form-item>-->
              <el-form-item label="Id:" hidden label-width="140px" prop="unitId">
                <el-input v-model="form.unitId" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
          <el-button type="primary" @click="AddUser()">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 编辑对话框 -->
      <el-dialog
        title="添加用户"
        v-dialogDrag
        ref="dialog__wrapper"
        :close-on-click-modal="false"
        :visible.sync="dialogFormVisibleEdit"
        width="80%"
        append-to-body
      >
        <el-form :model="form" :rules="rulses" ref="form">
          <!-- ref="form" -->
          <el-col :span="24">
            <el-col :span="8">
              <el-form-item hidden prop="provinceCode" label-width="140px" label="行政省份:">
                <el-select
                  :disabled="showCmd"
                  v-model="form.provinceCode"
                  @change="function2(form.provinceCode)"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in ProvinceId"
                    :key="item.id"
                    :label="item.name"
                    :value="item.code"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item hidden prop="cityCode" label-width="140px" label="市级区域:">
                <el-select
                  :disabled="showCmd_1"
                  v-model="form.cityCode"
                  @change="function1(form.cityCode)"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in CityId"
                    :key="item.id"
                    :label="item.name"
                    :value="item.code"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item hidden prop="areaCode" label-width="140px" label="区级:">
                <el-select :disabled="showCmds" v-model="form.areaCode" placeholder="请选择">
                  <el-option
                    v-for="item in AreaId"
                    :key="item.id"
                    :label="item.name"
                    :value="item.code"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="8">
              <el-form-item label="员工编号(10-255):" label-width="140px" prop="code">
                <el-input v-model="form.code" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="身份证号:" label-width="140px" prop="idCard">
                <el-input v-model="form.idCard" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="员工姓名:" label-width="140px" prop="username">
                <el-input v-model="form.username" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="8">
              <el-form-item label="联系电话:" label-width="140px" prop="phone">
                <el-input v-model="form.phone" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="发证日期" label-width="150px" prop="noDateStart">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="form.noDateStart"
                  value-format="yyyy-MM-dd"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="作业人员证号:" label-width="140px" prop="operatorsNo">
                <el-input v-model="form.operatorsNo" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24">
        

            <el-col :span="8">
              <el-form-item label="换证日期:" label-width="140px" prop="noDateEnd">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="form.noDateEnd"
                  value-format="yyyy-MM-dd"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
            </el-col>
                <el-col :span="8">
              <el-form-item label="Id:" hidden label-width="140px" prop="unitId">
                <el-input v-model="form.unitId" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
          <el-button type="primary" @click="editer()">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
import "../../assets/jquery-1.12.4.min.js";
// import $ from "jquery";
// import "./wsrProxyTest_iso14443.js";
// import wsrProxy from  "wsrProxy";
import { wsrProxy } from "./wsrProxy.min.js";
// import {myfun} from "../../assets/text.js"; //注意路径
export default {
  name: "filling",
  data() {
    return {
      showCmd: true,
      showCmds: true,
      showCmd_1:true,
      username: "",
      value: "",
      userlist: [],
      ProvinceId: [], //省
      CityId: [], //市
      AreaId: [], //区
      provinceCode: "", //省
      cityCode: "", //市
      areaCode: "", //区
      //分页相关数据
      total: -1,
      currPage: 1,
      page: 1,
      optionslei: [
        {
          id: 0,
          lei: "未发卡"
        },
        {
          id: 1,
          lei: "已发卡"
        }
      ],
      pageSize: 10,
      // 添加对话框的属性
      dialogFormVisibleAdd: false,
      dialogFormVisibleEdit: false,
      // dialogFormVisibleRoleshow: false,
      //添加用户的表单的数据
      form: {
        provinceCode: "", //省
        cityCode: "", //市
        areaCode: "", //区
        username: "",
        phone: "",
        labelNo: "",
        cardInformation: "",
        noDateEnd: "",
        noDateStart: "",
        operatorsNo: "", //作业人员证
        unitId: ""
      },
      rulses: {
        code: [
          { required: true, message: "请输入编号", trigger: "blur" },
          { min:2, max: 3, message: "请输入2~3位数编号", trigger: "blur" },
          { pattern: /^((?:[1-9]\d|(1\d\d)|(2([0-4]\d|5[0-5]))))$/, message: "请输入正确的编号" },
        ],
        vestingName: [
          { required: true, message: "公司名称不能为空", trigger: "blur" }
        ],
        idcard: [
          { required: true, message: "身份证不能为空", trigger: "blur" },
          {
            pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
            message: "证件号码格式有误！"
          }
        ],
        userNo: [
          { required: true, message: "员工编号不能为空", trigger: "blur" }
        ],
        username: [
          { required: true, message: "员工姓名不能为空", trigger: "blur" }
        ],
        // phone: [
        //   { required: true, message: "手机不能为空", trigger: "blur" },
        //   { min: 11, max: 11, message: "请输入正确的手机格式" },
        //   {
        //     pattern: /^1[3456789]\d{9}$/,
        //     message: "手机号格式不对",
        //     trigger: "blur"
        //   }
        // ],
        labelNo: [
          { required: true, message: "标签号不能为空", trigger: "blur" }
        ],
        operatorsNo: [
          { required: true, message: "作业人员证不能为空", trigger: "blur" }
        ],
        noDateStart: [
          { required: true, message: "发证日期不能为空", trigger: "blur" }
        ],
        noDateEnd: [
          { required: true, message: "换证日期不能为空", trigger: "blur" }
        ],
        cardInformation: [
          { required: true, message: "发卡信息不能为空", trigger: "blur" }
        ]
      },
      tyPe: "",
      unitId: "",
      provincecode: "",
      citycode: "",
      areacode: "",
      codes: "",
      citys: "",
      areas: "",
      multipleSelection: [], //批量删除数据
      delarr: [] //批量删除id

      // 编辑
      // editUserForm: {
      //   username: "",
      //   number: "",
      //   sex: "",
      //   mobile: "",
      //   mond: ""
      // }
    };
  },
  watch: {
    dialogFormVisibleAdd: function(val, oldVla) {
      this.$refs["form"].resetFields();
    }
  },
  created() {
    this.getUserlist();
    // wsr.init()
    // console.log(wsrProxy.init());
  },
  methods: {
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
      console.log(this.delarr);
      if (this.delarr=="") {
        this.$message({
          type: "error",
          message: "请选择需要删除的数据"
        });
      } else {
        this.$confirm("是否删除这条信息?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(async () => {
            // 注意async的位置，最近的位置
            // 发送删除请求:id:用户id
            // 1.data中找userId
            // 2.把userID以showDeleUserMsgBox参数形式传进来
            const res = await this.$http.post(`/no-user/delete`, this.delarr);
            console.log(res);
            this.delarr=[]
            this.getUserlist();
            // 提示
            if (res.data.code == 0) {
              this.delarr = [];
              this.$message({
                type: "success",
                message: res.data.msg
              });
            } else if (res.data.code == 1) {
              this.delarr = [];
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
            this.delarr=[]
          });
      }
    },
    // 修改对话框打开
    showEdituser(user) {
      this.dialogFormVisibleEdit = true;
      this.form = user;
    },

    async editer() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          this.form.unitId = sessionStorage.getItem("Ids");
          this.form.provinceCode = this.provincecode;
          this.form.cityCode = this.citycode;
          this.form.areaCode = this.areacode;
          const res = await this.$http.put(`/no-user`, this.form);
          console.log(res);
          if (res.data.code === 0) {
            this.$message({
              type: "success",
              message: res.data.msg
            });
            this.dialogFormVisibleEdit = false;

            // this.form = {};
            this.getUserlist();
          } else if (res.data.code === 1) {
            this.$message({
              type: "warning",
              message: res.data.msg
            });
            this.dialogFormVisibleEdit = true;
          } else if (res.data.code === 2) {
            this.$message({
              type: "warning",
              message: res.data.msg
            });
            this.dialogFormVisibleEdit = true;
            this.getUserlist();
          }
        } else {
          this.$message({
            type: "error",
            message: "请填写内容再试"
          });
          this.dialogFormVisibleEdit = true;
        }
      });
    },

    //   添加用户发送请求
    async AddUser() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          this.form.unitId = sessionStorage.getItem("Ids");
          this.form.provinceCode = this.provincecode;
          this.form.cityCode = this.citycode;
          this.form.areaCode = this.areacode;
          const res = await this.$http.post(`/no-user`, this.form);
          console.log(res);
          if (res.data.code === 0) {
            this.$message({
              type: "success",
              message: res.data.msg
            });
            this.dialogFormVisibleAdd = false;

            // this.form = {};
            this.getUserlist();
          } else if (res.data.code === 1) {
            this.$message({
              type: "warning",
              message: res.data.msg
            });
            this.dialogFormVisibleAdd = true;
          } else if (res.data.code === 2) {
            this.$message({
              type: "warning",
              message: res.data.msg
            });
            this.dialogFormVisibleAdd = true;
            this.getUserlist();
          }
        } else {
          this.$message({
            type: "error",
            message: "请填写内容再试"
          });
          this.dialogFormVisibleAdd = true;
        }
      });
    },
    // 添加用户显示对话框
    showAddUserDia() {
      // 先点编辑 再点添加 打开表单清空表单
      this.form = {};
      // sessionStorage.setItem("unitIdss", userId.id);
      // this.unitId = userId.id;
      this.provincecode = sessionStorage.getItem("provinceCode");
      this.citycode = sessionStorage.getItem("cityCode");
      this.areacode = sessionStorage.getItem("areaCode");
      this.dialogFormVisibleAdd = true;
    },
    //清空搜索框搜索数据 点击清楚按钮清除数据重新发送请求
    loadUserList() {
      this.getUserlist();
      this.value = "";
      this.query.vestingCode = "";
    },
    // 搜索用户 给搜索框绑定query v-model="query"
    async searchUser() {
      // if (this.username != "") {

      const res = await this.$http.get(
        `/no-user/findPage?pageSize=${this.pageSize}&currPage=${this.currPage}&username=${this.username}`
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
      const res = await this.$http.get(`/chinese/address`);
      console.log(res);
      this.tyPe = res.data.data.type; //type
      console.log(this.tyPe);
      this.unitId = sessionStorage.getItem("Ids"); //省code
      if (res.data.data.type == 2) {
        sessionStorage.setItem("provinceCode", res.data.data.provinceCode);
        sessionStorage.setItem("cityCode", res.data.data.cityCode);
        this.codes = res.data.data.provinceCode; //省code
        this.provinceCode = res.data.data.province; //省搜索name
        this.form.provinceCode = res.data.data.province; //省表单name
        this.form.cityCode = res.data.data.city; //市表单name
        this.cityCode = res.data.data.city; //市搜索name
        this.citys = res.data.data.cityCode; //市code
        this.AreaId = res.data.data.area; //区数组
        this.showCmd = true;
        this.showCmds = false;
        this.showCmd_1 = true;
      } else if (res.data.data.type == 1) {
        sessionStorage.setItem("provinceCode", res.data.data.provinceCode);
        sessionStorage.setItem("cityCode", res.data.data.cityCode);
        sessionStorage.setItem("areaCode", res.data.data.areaCode);
        this.codes = res.data.data.provinceCode; //省code
        this.provinceCode = res.data.data.province; //省name
        this.cityCode = res.data.data.city; //市name
        this.form.provinceCode = res.data.data.province; //省表单name
        this.form.cityCode = res.data.data.city; //市表单name
        this.citys = res.data.data.cityCode; //市code
        this.areas = res.data.data.areaCode; //区code
        this.areaCode = res.data.data.area; //区name
        this.form.areaCode = res.data.data.area; //区name
         this.showCmd = true;
        this.showCmds = true;
        this.showCmd_1 = true;
      } else if(res.data.data.type==0) {
        this.ProvinceId = res.data.data.provinces;
       this.showCmd = false;
        this.showCmds = false;
        this.showCmd_1 = false;
      }else if(res.data.data.type==3){
           //省监管
        sessionStorage.setItem("provinceCode", res.data.data.provinceCode);
        sessionStorage.setItem("province", res.data.data.province);
        this.provinceCode = res.data.data.province; //省搜索name
        this.codes = res.data.data.provinceCode; //省code
        this.form.provinceCode = res.data.data.province; //省表单name
        this.CityId = res.data.data.city; //市数组
        this.showCmds = false; //区按钮
        this.showCmd = true; //省按钮
        this.showCmd_1 = false; //市按钮
      }

      if (this.tyPe == 1) {
        // &provinceCode=${this.codes}&cityCode=${this.citys}&areaCode=${this.areas}
        const res = await this.$http.get(
          `/app-user/findPage?pageSize=${this.pageSize}&currPage=${this.currPage}&unitId=${this.unitId}&provinceCode=${this.codes}&cityCode=${this.citys}&areaCode=${this.areas}`
        );
        console.log(res);
        this.userlist = res.data.data.list;
        this.total = res.data.data.totalCount;
      } else if (this.tyPe == 2) {
        // &cityCode=${this.citys}&areaCode=${this.areaCode}
        const res = await this.$http.get(
          `/no-user/findPage?pageSize=${this.pageSize}&currPage=${this.currPage}&unitId=${this.unitId}&cityCode=${this.citys}&areaCode=${this.areaCode}`
        );
        console.log(res);
        this.userlist = res.data.data.list;
        this.total = res.data.data.totalCount;
      } else if(this.tyPe==0) {
        // &provinceCode=${this.provinceCode}&cityCode=${this.cityCode}&areaCode=${this.areaCode}
        const res = await this.$http.get(
          `/no-user/findPage?pageSize=${this.pageSize}&currPage=${this.currPage}&unitId=${this.unitId}&provinceCode=${this.provinceCode}&cityCode=${this.cityCode}&areaCode=${this.areaCode}`
        );
        console.log(res);
        this.userlist = res.data.data.list;
        this.total = res.data.data.totalCount;
      }else if(this.tyPe==3){
        const res = await this.$http.get(
          `/no-user/findPage?pageSize=${this.pageSize}&currPage=${this.currPage}&unitId=${this.unitId}&provinceCode=${this.codes}&cityCode=${this.cityCode}&areaCode=${this.areaCode}`
        );
        console.log(res);
        this.userlist = res.data.data.list;
        this.total = res.data.data.totalCount;
      }
      // /no-user/findPage?pageSize=${this.pageSize}&currPage=${this.currPage}
      // const res = await this.$http.get(
      //   `/no-user/findPage?pageSize=${this.pageSize}&currPage=${this.currPage}&id=${this.idss}`
      // );
      // console.log(res);

      // this.userlist = res.data.data.list;
      // this.total = res.data.data.totalCount;
    }
  }
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