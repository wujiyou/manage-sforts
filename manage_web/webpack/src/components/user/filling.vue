<template>
  <div>
    <div style="background:white;width:99.1%;padding-left:15px">
      <my-bread level1="单位登记" level2="人员登记" level3="app用户"></my-bread>
    </div>

    <el-card class="box-card" style="margin:20px 20px 0 20px;">
      <!--搜索  -->
      <el-row>
        <el-col :span="24">
          <h5 style="border-bottom:1px solid #ece8e8;padding-bottom:15px; padding-left:15px">查询用户</h5>
        </el-col>

        <el-col style="padding-left:15px" :span="22">
          <el-col :span="4">
            <el-select
              class="chioce"
              size="small"
              style=" width: 100%;"
              @clear="loadUserList()"
              clearable
              v-model="siteId"
              @input="searchUser()"
              placeholder="站点分类选择"
            >
              <el-option
                v-for="item in selects"
                :key="item.id"
                :label="item.siteName"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-col>

          <el-col style="margin-left:30px" :span="4">
            <el-input
              style="width:100%;"
              size="small"
              @clear="loadUserList()"
              clearable
              class="input-serach"
              placeholder="请输入姓名"
              v-model="name"
            ></el-input>
          </el-col>
          <el-col style="margin-left:30px" :span="4">
            <el-button
              size="small"
              style="width:100%"
              @click="searchUser()"
              class="el_button"
              icon="el-icon-search"
            >搜索</el-button>
          </el-col>
        </el-col>
      </el-row>
      <!-- 表格 -->
      <el-col :span="24">
        <p
          style="width:100%;height:1px;background:rgb(236, 232, 232);margin:20px 0px 0px 0px;z-index:999"
        ></p>
      </el-col>

      <el-col style="margin-bottom:10px;margin-top:10px" :span="24">
        <el-col :span="20">&nbsp;</el-col>
        <el-col :span="2">
          <el-button type="success" size="small" @click="showAddUserDia()">
            <i style="padding-right:10px" class="el-icon-plus"></i>新增
          </el-button>
        </el-col>
        <el-col :span="2">
          <el-button type="danger" size="mini" plain icon="el-icon-delete" @click="showDeleUserMsgBox">删除</el-button>

        </el-col>
      </el-col>

      <template>
        <el-table
          border
          :data="userlist"
          style="width: 100%;margin:10px 0px;padding-bottom:40px"
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
          <el-table-column prop="name" label="姓名" show-overflow-tooltip></el-table-column>
          <el-table-column prop="username" label="账号" show-overflow-tooltip></el-table-column>
          <el-table-column prop="idCard" label="身份证" show-overflow-tooltip></el-table-column>
          <!-- <el-table-column prop="sex" label="性别" show-overflow-tooltip></el-table-column> -->
          <el-table-column prop="workNumber" label="作业人员证号" width="170" show-overflow-tooltip></el-table-column>
          <el-table-column prop="siteName" label="所属站点" show-overflow-tooltip></el-table-column>
          <el-table-column prop="type" label="充装人员" show-overflow-tooltip>
            <template slot-scope="scope">
              <p v-if="userlist[scope.$index].type==0">充装人员</p>
              <p v-if="userlist[scope.$index].type==1">检验人员</p>
              <p v-if="userlist[scope.$index].type==2">配送人员</p>
            </template>
          </el-table-column>
          <el-table-column prop="certificateTime" label="发证日期" show-overflow-tooltip>
            <template slot-scope="socpe">{{socpe.row.certificateTime | fmtdate}}</template>
          </el-table-column>
          <el-table-column
            prop="renewalTime"
            :formatter="dateFormat"
            label="换证日期"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="phone" label="联系电话" show-overflow-tooltip></el-table-column>

          <!-- <el-table-column label="用户状态" show-overflow-tooltip>
            <template slot-scope="socpe">
              <el-switch
                @change="changeMgStatus(socpe.row)"
                v-model="socpe.row.enabled"
                active-color="#13ce66"
                inactive-color="#ff4949"
              ></el-switch>
            </template>
          </el-table-column>-->

          <!-- 表格操作 -->
          <!-- <el-table-column prop="address" label="操 作">
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
                  @click="showDeleUserMsgBox(scope.row.employeeId)"
                ></el-button>
              </el-tooltip>
            </template>
          </el-table-column>-->
        </el-table>
      </template>

      <el-pagination
        style="padding:5px 15px 15px 15px;display:flex; justify-content: flex-end;"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[10,15,20,25,30]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>

      <!-- 对话框 -->
      <!-- 添加对话框 -->
      <el-dialog
        title="添加信息"
        v-dialogDrag
        ref="dialog__wrapper"
        :close-on-click-modal="false"
        width="80%"
        :visible.sync="dialogFormVisibleAdd"
      >
        <el-form :model="form" :rules="rules" ref="form">
          <el-col :span="24">
            <el-col :span="11">
              <el-form-item label="姓名" label-width="150px" prop="name">
                <el-input v-model="form.name" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="2"></el-col>
            <el-col :span="11">
              <el-form-item label="账号" label-width="150px" prop="username">
                <el-input v-model="form.username" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="11">
              <el-form-item label="密码" label-width="150px" prop="password">
                <el-input v-model="form.password" type="password" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="2"></el-col>
            <el-col :span="11">
              <el-form-item label="身份证" label-width="150px" prop="idCard">
                <el-input v-model="form.idCard" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="11">
              <el-form-item label="确认密码" label-width="150px" prop="againPassword">
                <el-input v-model="form.againPassword" type="password" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="2"></el-col>
            <el-col :span="11">
              <el-form-item label="联系电话" label-width="150px" prop="phone">
                <el-input v-model="form.phone" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="11">
              <el-form-item label="员工类型" label-width="150px" prop="renewalTime">
                <el-select style="width: 100%" v-model="form.type">
                  <el-option
                    v-for="item in selectss"
                    :key="item.id"
                    :label="item.siteNames"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="2"></el-col>
            <el-col :span="11">
               <el-form-item label="作业人员证号" label-width="150px" prop="workNumber">
                <el-input v-model="form.workNumber" autocomplete="off"></el-input>
              </el-form-item>
              <!-- <el-form-item label="站点分类选择" label-width="150px" prop="siteId">
                <el-select style="width: 100%" v-model="form.siteId">
                  <el-option
                    v-for="item in selects"
                    :key="item.id"
                    :label="item.siteName"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item> -->
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="11">
              <el-form-item label="发证日期" label-width="150px" prop="certificateTime">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="form.certificateTime"
                  value-format="yyyy-MM-dd"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
            </el-col>

            <el-col :span="2"></el-col>
            <el-col :span="11">
              <el-form-item label="换证日期" label-width="150px" prop="renewalTime">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="form.renewalTime"
                  value-format="yyyy-MM-dd"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="11">
             
            </el-col>
            <el-col :span="2"></el-col>
            <el-col :span="11">
              <!-- <el-form-item label="详细地址" label-width="150px" prop="address">
                <el-input v-model="form.address" autocomplete="off"></el-input>
              </el-form-item> -->
            </el-col>
          </el-col>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="lose()">取 消</el-button>
          <el-button type="primary" @click="AddUser()">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 修改对话框 -->
      <el-dialog
        title="修改信息"
        v-dialogDrag
        ref="dialog__wrapper"
        :close-on-click-modal="false"
        width="80%"
        :visible.sync="dialogFormVisibleEdit"
      >
        <el-form :model="editUserForm" :rules="rules">
          <el-col :span="24">
            <el-col :span="11">
              <el-form-item label="姓名:" label-width="100px" prop="name">
                <el-input v-model="editUserForm.name" autocomplete="off"></el-input>
                <!-- disabled实现用户名禁止改动 -->
              </el-form-item>
            </el-col>
            <el-col :span="2"></el-col>

            <el-col :span="11">
              <el-form-item label="账号:" label-width="100px" prop="username">
                <el-input disabled v-model="editUserForm.username" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="11">
              <el-form-item label="编号:" label-width="100px" prop="number">
                <el-input disabled v-model="editUserForm.number" autocomplete="off"></el-input>
              </el-form-item>
              <!-- <el-form-item label="身份证:" label-width="100px" prop="idcard">
                <el-input v-model="editUserForm.idcard" autocomplete="off"></el-input>
              </el-form-item>-->
            </el-col>
            <el-col :span="2"></el-col>
            <el-col :span="11">
              <el-form-item label="联系电话:" label-width="100px" prop="phone">
                <el-input v-model="editUserForm.phone" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="11">
              <el-form-item label="发证日期" label-width="100px" prop="certificateTime">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="editUserForm.certificateTime"
                  style="width: 100%;"
                ></el-date-picker>
                <!-- <el-input v-model="form.nextTrialTime" autocomplete="off"></el-input> -->
              </el-form-item>
            </el-col>
            <el-col :span="2"></el-col>

            <el-col :span="11">
              <el-form-item label="换证日期" label-width="100px" prop="renewalTime">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="editUserForm.renewalTime"
                  style="width: 100%;"
                ></el-date-picker>
                <!-- <el-input v-model="form.nextTrialTime" autocomplete="off"></el-input> -->
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="11"></el-col>
            <el-col :span="2"></el-col>
            <el-col :span="11"></el-col>
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
import jwtDecode from "jwt-decode";
import $ from "jquery";
export default {
  name: "filling",
  data() {
    var validatePass2 = (rules, value, callback) => {
      console.log(rules);
      if (rules === "") {
        callback(new Error("请再次输入密码"));
      } else if (rules != this.form.againPassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    return {
      name: "",
      siteId: "",
      // deapp: "1",

      value: "",
      userlist: [],
      //分页相关数据
      total: -1,
      page: 1,
      rows: 10,
      // 添加对话框的属性
      dialogFormVisibleAdd: false,
      dialogFormVisibleEdit: false,
      selectss: [
        {
          id: 0,
          siteNames: "充装人员"
        },
        {
          id: 1,
          siteNames: "检验人员"
        },
        {
          id: 2,
          siteNames: "配送人员"
        }
      ],
      // defaultData: {
      //   //联级选择
      //   value: "id",
      //   label: "name",
      //   children: "class"
      // },

      selects: [],

      //添加用户的表单的数据
      form: {
        name: "",
        username: "",
        password: "",
        againPassword: "",
        idCard: "",
        phone: "",
        // siteId: "",

        photoUrl: "",
        renewalTime: "",
        certificateTime: "",
        workNumber:"",//作业人员证号
        // address:"",//详细地址
        type: ""
      },

      rules: {
        name: [{ required: true, message: "员工姓名", trigger: "blur" }],
        username: [{ required: true, message: "员工账号", trigger: "blur" }],
        password: [
          { required: true, message: "密码", trigger: "blur" },
          { min: 6, message: "请输入不少于6位的密码" }
        ],
        againPassword: [
          { required: true, message: "请再次确认密码", trigger: "blur" },
          { min: 6, message: "请再次确认密码" }
        ],
        idCard: [
          { required: true, message: "身份证", trigger: "blur" },
          {
            pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
            message: "证件号码格式有误！"
          }
        ],
        // sex: [{ required: true, message: "性别", trigger: "blur" }],
        // adminNo: [
        //   { required: true, message: "特种设备行政许可编号", trigger: "blur" }
        // ],
        // number: [
        //   { required: true, message: "员工编号", trigger: "blur" }
        // ],
        phone: [
          { required: true, message: "电话号码", trigger: "blur" },
          { min: 11, max: 11, message: "请输入11位手机号码", trigger: "blur" },
          {
            pattern: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
            message: "请输入正确的手机号码"
          }
        ],
        workNumber: [{ required: true, message: "作业人员账号不能为空", trigger: "blur" }],
        // address: [{ required: true, message: "详细地址不能为空", trigger: "blur" }],
   
        // siteId: [
        //   { required: true, message: "所属站点不能为空", trigger: "blur" }
        // ],

        certificateTime: [
          { required: true, message: "发证日期不能为空", trigger: "blur" }
        ],
        renewalTime: [{ required: true, message: "换证日期", trigger: "blur" }]
      },

      // 编辑
      editUserForm: {
        name: "", //员工姓名
        username: "", //员工账户
        // idcard: "", //身份证
        number: "", //员工编号
        phone: "", //电话号码
        certificateTime: "", //发证日期
        renewalTime: "" //换证日期
      },
      multipleSelection: [], //批量删除数据
      delarr: [] //批量删除id

      // header: {
      //   Authorization: localStorage.getItem("token")
      // }
    };
  },
  created() {
    this.getUserlist();
    this.function1();
  },
  watch: {
    dialogFormVisibleAdd: function(val, oldVla) {
      this.$refs["form"].resetFields();
    }
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
            `/pc-site-personnel/delete`,this.delarr
          );
          console.log(res);
         
          // 提示
          if (res.data.code == 0) {
            this.delarr = [];
            this.$message({
              type: "success",
              message: res.data.msg
            });
             this.getUserlist();
          } else if (res.data.code == 1) {
            this.delarr = [];
            this.$message({
              type: "warning",
              message: res.data.msg
            });
             this.getUserlist();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    dateFormat: function(row, column) {
      var date = row[column.property];
      if (date === null) {
        return "0:0:0";
      }
      var moment = require("moment");
      return moment(date).format("YYYY-MM-DD ");
      //HH:mm:ss
    },

    lose() {
      this.dialogFormVisibleAdd = false;
      // if (this.$refs.refdata) {
      //   this.$refs.refdata.clearValidate();
      // }
      this.visible = true;
      //  this.getUserlist();
      // this.form={}
    },
    // 站点分类查询
    async function1() {
      // /site/{siteClass}
      const res = await this.$http.get(`/site/findAll`);
      console.log(res);
      this.selects = res.data.data;
    },

    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },
    // 编辑用户发送请求
    async EditUser() {
      //   users/:id
      this.dialogFormVisibleEdit = false;
      // if (this.editUserForm.enabled == false) {
      //   this.editUserForm.enabled = "0";
      // } else {
      //   this.editUserForm.enabled = "1";
      // }
      // for (let i = 0; i < this.selects1.length; i++) {
      //   if (this.selects1[i].orders == this.editUserForm.vestingCode) {
      //     this.editUserForm.vestingCode = this.selects1[i].id;
      //   }
      // }
      const res = await this.$http.put(
        `/pc-site-personnel/update`,this.editUserForm
      );
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
      } else if (res.data.code === 1) {
        this.$message({
          type: "wraning",
          message: res.data.msg
        });
      } else if (res.data.code === 2) {
        this.$message({
          type: "wraning",
          message: res.data.msg
        });
      }
    },

    //file形参里面相关操作的图片信息
    handlePreview(file) {
      // this.picPreviewPath = file.response.data.url;
      // this.previewDialogVisible = true;
    },

    handleRemove(file) {
      // 1.获取将要删除图片的临时路径
      // const filePath = file.response.data.tmp_path;
      // 2.从pics数组中，找到图片对应的索引值
      // const i = this.addForm.pics.findIndex(x => x.pic === filePath);
      // 3.调用splice方法，移除图片信息
      this.addForm.splice(i, 1);
      //file.response.data.tmp_path 图片临时上传的路径
      //   从this.form.pics 移除当前数据x掉的图片
      // 先获取该图片的索引
      // findIndex ((item)=>{})遍历数组 把符合条件的元素的索引进行返回
      //   let Index = this.form.pics.findIndex(item => {
      //     item.pic === file.response.data.tmp_path;
      //   });
      //   this.form.pics.splice(Index, 1);
      // console.log("失败");

      // console.log(file);
    },

    handleSuccess(response) {
      // 1.拼接得到一个图片信息对象 临时路径
      const picInfo = { pic: response.data.tmp_path };
      // 2.将图片信息对象，push到pics数组中
      // this.addForm.pics.push(picInfo);
      // file.data.tem_path 图片临时上传的路径
      //console.log("成功");
      //   this.form.pics.push({
      //     pic: file.data.tep_path
      //   });
      //console.log(file);
    },

    //状态管理
    // async changeMgStatus(data) {
    //   this.form = {};
    //   this.form.employeeId = data.employeeId;
    //   if (data.enabled == false) {
    //     this.form.enabled = "0";
    //   } else {
    //     this.form.enabled = "1";
    //   }
    //   const res = await this.$http.put(
    //     `/employee-management/updateStatus`,
    //     this.form
    //   );
    //   console.log(res);
    //   if (res.data.code === 0) {
    //     // 回到第一页展示
    //     //this.pagenum = 1;
    //     // 重新请求数据
    //     this.getUserlist();
    //     // 提示
    //     this.$message({
    //       type: "success",
    //       message: res.data.msg
    //     });
    //   } else {
    //     this.$message({
    //       type: "danger",
    //       message: "启动失败"
    //     });
    //   }
    // },

    // 编辑对话框打开
    showEdituser(user) {
      // 2.添加对话框
      this.dialogFormVisibleEdit = true;
      this.editUserForm = user;
      this.getUserlist();
    },

    //   添加用户发送请求
    async AddUser() {
      // if (form.password != form.surepassword) {
      //       this.$message({
      //         type: "error",
      //         message: "两次输入密码不一致!"
      //       });
      //     } else {

      //     }
      this.$refs.form.validate(async valid => {
        if (valid) {
          // if (this.form.enabled == null) {
          //   this.form.enabled = "0";
          // }
          const res = await this.$http.post(
            `/pc-site-personnel/add`,this.form
          );
          console.log(res);
          if (res.data.code === 0) {
            // 回到第一页展示
            //this.pagenum = 1;
            // 重新请求数据
            
            // 提示
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
      // this.form = {};
      this.dialogFormVisibleAdd = true;
    },
    //清空搜索框搜索数据 点击清楚按钮清除数据重新发送请求
    loadUserList() {
      this.getUserlist();
      this.value = "";
      this.name = "";
    },
    // 搜索用户 给搜索框绑定query v-model="query"
    async searchUser() {
      this.unitId = sessionStorage.getItem("unitId");
      let access_token = sessionStorage.getItem("access_token");
      let decode = jwtDecode(access_token);
      let roles = decode.roles;
      // const rol =roless
      for (var i = 0; i < roles.length; i++) {
        // debugger;

        if (roles[i] == "admin") {
          const res = await this.$http.get(
            `/pc-site-personnel/findPage?page=${this.page}&size=${this.rows}&name=${this.name}&siteId=${this.siteId}`
          );
          console.log(res);

          if (res.data.code === 0) {
            // 回到第一页展示
            this.pagenum = 1;
            // 重新请求数据
            // for (let i = 0; i < res.data.data.list.length; i++) {
            //   if (res.data.data.list[i].enabled == 0) {
            //     res.data.data.list[i].enabled = false;
            //   } else {
            //     res.data.data.list[i].enabled = true;
            //   }
            // }
            this.userlist = res.data.data.list;
            this.total = res.data.data.totalCount;
            // this.$message({
            //   type: "success",
            //   message: res.data.msg
            // });
          } else if (res.data.code === 1) {
            this.userlist = res.data.data.list;
            this.total = res.data.data.totalCount;
            this.$message({
              type: "success",
              message: res.data.msg
            });
          }

          return;
        }
      }

      for (let i = 0; i < roles.length; i++) {
        if (roles[i] != "admin") {
          {
            // console.log(this.rol);
            //如果是普通管理员（也就是各单位管理员） 发送单位ID 给后端  查询各单位的单位成员 比如 vestingcode：｛1｝
            // /user/findAllEmployee/1/0/5
            const res = await this.$http.post(
              `/pc-site-personnel/findPage?page=${this.page}&size=${this.rows}&name=${this.name}&siteId=${this.siteId}&unitId=${this.unitId}`
            );
            if (res.data.code === 0) {
              // 回到第一页展示
              this.pagenum = 1;
              // 重新请求数据
              // for (let i = 0; i < res.data.data.list.length; i++) {
              //   if (res.data.data.list[i].enabled == 0) {
              //     res.data.data.list[i].enabled = false;
              //   } else {
              //     res.data.data.list[i].enabled = true;
              //   }
              // }
              this.userlist = res.data.data.list;
              this.total = res.data.data.totalCount;
              this.$message({
                type: "success",
                message: res.data.msg
              });
            } else {
              this.$message({
                type: "danger",
                message: "查询失败"
              });
            }
          }
        }
      }
      // }
    },

    //分页功能
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      // 1.每页显示条数的改变
      this.rows = val;
      // 回到第一页
      this.page = 1;
      this.getUserlist();
      // 希望当页条数改变时 从第一页开始显示 this.pagenum = 1 -》currPage=1?
      if (this.name == "") {
        this.getUserlist();
      } else {
        this.searchUser();
      }
    },

    handleCurrentChange(val) {
      //页码改变时
      console.log(`当前页: ${val}`);
      this.page = val;
      this.getUserlist();
      if (this.name == "") {
        this.getUserlist();
      } else {
        this.searchUser();
      }
    },

    async getUserlist() {
      // debugger;
      this.unitId = sessionStorage.getItem("unitId");
      let access_token = sessionStorage.getItem("access_token");
      // var ass = access_token.substring(7,access_token.length)
      let decode = jwtDecode(access_token);
      console.log(decode);
      const roles = decode.roles;
      // console.log(roles);

      for (let i = 0; i < roles.length; i++) {
        // this.role = roles[i];

        if (roles[i] == "admin") {
          // $(".chioce").show();
          const res = await this.$http.get(
            `/pc-site-personnel/findPage?page=${this.page}&size=${this.rows}&name=${this.name}&siteId=${this.siteId}`
          );
          console.log(res);
          // console.log(this.query);
          // for (let i = 0; i < res.data.data.list.length; i++) {
          //   if (res.data.data.list[i].enabled == 0) {
          //     res.data.data.list[i].enabled = false;
          //   } else {
          //     res.data.data.list[i].enabled = true;
          //   }
          // }
          this.userlist = res.data.data.list;
          this.total = res.data.data.totalCount;
          //如果是超级管理员角色   要请求接口 查询所有单位成员信息
          return;
        }
      }
      for (let i = 0; i < roles.length; i++) {
        if (roles[i] != "admin") {
          $(".chioce").hide();
          //如果是普通管理员（也就是各单位管理员） 发送单位ID 给后端  查询各单位的单位成员 比如 vestingcode：｛1｝
          // /user/findAllEmployee/1/0/5
          const res = await this.$http.get(
            `/employeeManagement/findPage?page=${this.page}&size=${this.rows}&name=${this.name}&siteId=${this.siteId}&unitId=${this.unitId}`
          );
          console.log(res);
          // console.log(this.query);()
          for (let i = 0; i < res.data.data.list.length; i++) {
            if (res.data.data.list[i].enabled == 0) {
              res.data.data.list[i].enabled = false;
            } else {
              res.data.data.list[i].enabled = true;
            }
          }
          this.userlist = res.data.data.list;
          this.total = res.data.data.totalCount;
          return;
        }
      }

      //需要授权的API ，必须在请求头中使用Authorization 字段token令牌
      //pagenum当前页面   pagesize每页显示条数
      //接口文档中 除了登录接口之外的所有请求都需要进行授权，设置请求头
      //找axios中关于请求头的代码  写在了http.js中
      // const AUTH_TOKEN = localStorage.getItem("token");
      // this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;
    }
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
<style>
.el-card__body {
  padding: 0;
}
.el-table td,
.el-table th {
  /* text-align: center !important; */
  font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
}
.el-table .warning-row {
  background: rgb(250, 249, 249) !important;
}

.el-table .success-row {
  background: rgb(250, 249, 249) !important;
}
</style>
