<template>
  <div>
    <div style="background:white;width:99.1%;padding-left:15px">
      <my-bread level1="单位登记" level2="单位登记" level3="其他单位"></my-bread>
    </div>
    <el-card class="box-card" style="margin:20px 20px 0 20px;">
      <!--搜索  -->
      <el-row>
        <el-col :span="24">
          <h5 style="border-bottom:1px solid #ece8e8;padding-bottom:15px;padding-left:15px">查询信息</h5>
        </el-col>
        <el-col style="padding-left:15px" :span="22">
          <el-col :span="24">
            <el-col :span="4">
              <el-select
                size="small"
                style=" width: 100%;"
                @clear="loadUserList()"
                clearable
                v-model="provinceId"
                @change="functions2(provinceId)"
                @input="searchUser()"
                placeholder="请选择省份"
              >
                <el-option
                  v-for="item in ProvinceIds"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-col>

            <el-col style="margin-left:30px" :span="4">
              <el-select
                size="small"
                style=" width: 100%;"
                clearable
                v-model="cityId"
                @change="functions1(cityId)"
                placeholder="请选择城市"
                @input="searchUser()"
              >
                <el-option
                  v-for="item in CityIds"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-col>
            <el-col style="margin-left:30px" :span="4">
              <el-select
                size="small"
                style=" width: 100%;"
                @clear="loadUserList()"
                clearable
                v-model="areaId"
                placeholder="请选择区域"
                @input="searchUser()"
              >
                <el-option
                  v-for="item in AreaIds"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-col>
            <el-col style="margin-left:30px" :span="4">
              <el-select
                filterable
                size="small"
                style=" width: 100%;"
                @clear="loadUserList()"
                @change="searchUser()"
                clearable
                v-model="unitName"
                placeholder="请选择单位名称"
              >
                <el-option
                  v-for="item in options"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
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

          <el-col style="margin-top:20px" :span="24">
            <!-- <el-col :span="4">
              <el-input
                size="small"
                style=" width: 100%;"
                @clear="loadUserList()"
                clearable
                class="input-serach"
                placeholder="请输入特种设备许可证"
                v-model="licence"
              ></el-input>
            </el-col>-->
          </el-col>
        </el-col>
      </el-row>
      <el-col :span="24">
        <p
          style="width:100%;height:1px;background:rgb(236, 232, 232);margin:20px 0px 0px 0px;z-index:999"
        ></p>
      </el-col>
      <el-col style="margin-bottom:5px;margin-top:5px" :span="24">
        <el-col :span="20">&nbsp;</el-col>

        <el-col :span="2">
          <el-button type="success" @click="showAddUserDia()" size="mini">
            <i style="padding-right:10px" class="el-icon-plus"></i>新增
          </el-button>
        </el-col>

        <el-col :span="2">
          <el-button
            size="mini"
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
          border
          :data="userlist"
          style="width: 100%;margin:10px 0;padding-bottom:40px"
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

          <el-table-column show-overflow-tooltip prop="name" label="单位名称"></el-table-column>
          <el-table-column show-overflow-tooltip prop="licence" label="行政区划"></el-table-column>
          <el-table-column show-overflow-tooltip prop="licence" label="负责人"></el-table-column>
          <el-table-column show-overflow-tooltip prop="phone" label="负责人联系电话"></el-table-column>
          <el-table-column show-overflow-tooltip prop="address" label="单位地址"></el-table-column>
          <!-- <el-table-column show-overflow-tooltip prop="unitIssueTime" label="发证日期">
            <template slot-scope="socpe">{{socpe.row.unitIssueTime | fmtdate}}</template>
          </el-table-column>
          <el-table-column show-overflow-tooltip prop="unitChangeTime" label="换证日期">
            <template slot-scope="socpe">{{socpe.row.unitChangeTime | fmtdate}}</template>
          </el-table-column>-->
          <!-- 表格操作 -->
          <el-table-column width="150" label="操作">
            <template slot-scope="scope">
              <el-tooltip
                class="item"
                effect="dark"
                content="新增系统用户"
                :enterable="false"
                placement="top"
              >
                <el-button
                  type="success"
                  size="mini"
                  title="新增系统用户"
                  plain
                  icon="el-icon-s-platform"
                  @click="newUsers(scope.row)"
                  circle
                ></el-button>
              </el-tooltip>

              <el-tooltip
                class="item"
                effect="dark"
                content="新增app用户"
                :enterable="false"
                placement="top"
              >
                <el-button
                type="primary"
                 
                  content="新增app用户"
                  size="mini"
                  plain
                  icon="el-icon-mobile-phone"
                  circle
                  @click="appUserssure(scope.row)"
                ></el-button>
              </el-tooltip>

              <el-tooltip
                class="item"
                effect="dark"
                content="新增人员"
                :enterable="false"
                placement="top"
              >
                <el-button
                  type="success"
                  content="新增人员"
                  size="mini"
                  plain
                  icon="el-icon-place"
                  circle
                  @click="newStaff(scope.row)"
                ></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
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
        width="60%"
        :close-on-click-modal="false"
        :visible.sync="dialogFormVisibleAdd"
      >
        <el-form @keyup.enter.native="AddUser" :model="form" ref="form" :rules="rulses">
          <el-col :span="24">
            <el-col :span="8">
              <el-form-item prop="provinceId" label-width="140px" label="行政省份:">
                <el-select
                  v-model="form.provinceId"
                  @change="function2(form.provinceId)"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in ProvinceId"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="cityId" label-width="140px" label="市级区域:">
                <el-select v-model="form.cityId" @change="function1(form.cityId)" placeholder="请选择">
                  <el-option
                    v-for="item in CityId"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="areaId" label-width="140px" label="区级:">
                <el-select v-model="form.areaId" placeholder="请选择">
                  <el-option
                    v-for="item in AreaId"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="8">
              <el-form-item label="单位名称:" label-width="140px" prop="name">
                <el-input v-model="form.name" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="负责人:" label-width="140px" prop="personnelName">
                <el-input v-model="form.personnelName" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="单位固定电话:" label-width="140px" prop="unitPhone">
                <el-input v-model="form.unitPhone" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="8">
              <el-form-item label="负责人联系电话:" label-width="140px" prop="phone">
                <el-input v-model="form.phone" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="详细地址:" label-width="140px" prop="address">
                <el-input v-model="form.address" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="统一社会信用代码:" label-width="140px" prop="code">
                <el-input v-model="form.code" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="8">
              <el-form-item hidden label="单位类型:" label-width="140px" prop="type">
                <el-select
                  style=" width: 100%;"
                  @clear="loadUserList()"
                  value-key="usenames"
                  clearable
                  v-model="form.type"
                >
                  <el-option
                    v-for="item in optionsuseName"
                    :key="item.icd"
                    :label="item.usenames"
                    :value="item.icd"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="邮政编码:" label-width="140px" prop="postalCode">
                <el-input v-model="form.postalCode" autocomplete="off"></el-input>
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
        title="修改信息"
        v-dialogDrag
        ref="dialog__wrapper"
        :close-on-click-modal="false"
        :visible.sync="dialogFormVisibleEdit"
      >
        <el-form @keyup.enter.native="EditUser" :model="editUserForm" :rules="rulses">
          <el-col :span="24">
            <el-col :span="8">
              <el-form-item prop="provinceId" label-width="140px" label="行政省份:">
                <el-select
                  v-model="editUserForm.provinceId"
                  @change="function2(editUserForm.provinceId)"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in ProvinceId"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="cityId" label-width="140px" label="市级区域:">
                <el-select
                  v-model="editUserForm.cityId"
                  @change="function1(editUserForm.cityId)"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in CityId"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="areaId" label-width="140px" label="区级:">
                <el-select v-model="editUserForm.areaId" placeholder="请选择">
                  <el-option
                    v-for="item in AreaId"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="8">
              <el-form-item label="单位名称:" label-width="140px" prop="type">
                <el-input disabled v-model="editUserForm.name" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="邮政编码:" label-width="140px" prop="postalCode">
                <el-input v-model="editUserForm.postalCode" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="单位固定电话:" label-width="140px" prop="unitPhone">
                <el-input v-model="editUserForm.unitPhone" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="8">
              <el-form-item label="负责人联系电话:" label-width="140px" prop="phone">
                <el-input v-model="editUserForm.phone" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="详细地址:" label-width="140px" prop="address">
                <el-input v-model="editUserForm.address" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="统一社会信用代码:" label-width="140px" prop="code">
                <el-input v-model="editUserForm.code" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="8">
              <el-form-item hidden label="单位类型:" label-width="140px" prop="type">
                <el-input v-model="editUserForm.type" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8"></el-col>
            <el-col :span="8"></el-col>
          </el-col>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
          <el-button type="primary" @click="EditUser()">确 定</el-button>
        </div>
      </el-dialog>

     <!-- 新增系统用户 -->
      <el-dialog
        title="新增系统用户"
        v-dialogDrag
        ref="dialog__wrapper"
        width="95%"
        top="5vh"
        :close-on-click-modal="false"
        :visible.sync="dialogFormVisiblenewUsers"
      >
        <House></House>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisiblenewUsers = false">取 消</el-button>
          <!-- <el-button type="primary" @click="newUserssure()">确 定</el-button> -->
        </div>
      </el-dialog>

         <!-- 新增app用户 -->
      <el-dialog
        title="新增app用户"
        v-dialogDrag
        top="4vh"
        ref="dialog__wrapper"
        width="95%"
        :close-on-click-modal="false"
        :visible.sync="dialogFormVisiblenewUserapp"
      >
         <Fillings></Fillings>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisiblenewUserapp = false">取 消</el-button>
          <!-- <el-button type="primary" @click="Appsures()">确 定</el-button> -->
        </div>
      </el-dialog>


     
      <!-- 新增人员 -->
      <el-dialog
        title="新增人员"
        v-dialogDrag
        ref="dialog__wrapper"
        width="95%"
        :close-on-click-modal="false"
        :visible.sync="dialogFormnewStaff"
         top="4vh"
      >
        <Sufficients></Sufficients>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormnewStaff = false">取 消</el-button>
          <!-- <el-button type="primary" @click="newStaff()">确 定</el-button> -->
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
// 气瓶信息管理
import House from "@/components/user/houses"
import Fillings from "@/components/user/fillings"
import Sufficients from "@/components/user/sufficients"
import cityData from "@/components/archives/citydata.js";
export default {
  name: "cylinder",
   components: {
    House,
    Fillings,
    Sufficients
  },
  data() {
    return {
      licence: "", //特种设备行政许可证
      unitName: "", //单位名称
      ProvinceId: [], //省
      ProvinceIds: [], //搜索省
      provinceId: "", //搜索省绑定参数
      vestingCityId: "",
      CityId: [], //市
      CityIds: [], //搜索市
      cityId: "", //搜索市绑定参数
      // vestingAreaId: "",
      AreaId: [], //区
      AreaIds: [], //搜索区
      areaId: "", //搜索区绑定参数
      select: "",
      userlist: [], //table绑定数据
      options: [],

      // cityData,
      //分页相关数据
      total: -1,
      optionsuseName: [
        {
          icd: 0,
          usenames: "监管机构"
        },
        {
          icd: 1,
          usenames: "制造单位"
        },
        {
          icd: 2,
          usenames: "充装单位"
        },
        {
          icd: 3,
          usenames: "检验单位"
        },
        {
          icd: 4,
          usenames: "使用单位"
        },
        {
          icd: 5,
          usenames: "配送单位"
        }
      ],
      
      page: 1,
      rows: 10,
      curr: 1,
      id: "", //市级参数id
      Id: "", // 区级省份id
      cityData,
      // dengId: -1,
      // vestingType: "监管机构",
      // 添加对话框的属性

      dialogFormVisibleEdit: false,
      dialogTableVisible: false,
      dengdialogFormVisible: false,

      dialogFormVisibleAdd: false,
      dialogFormnewStaff: false,
      dialogFormVisiblenewUsers: false,
       dialogFormVisiblenewUserapp:false,
      // dialogFormVisibleRoleshow: false,
      //添加用户的表单的数据
      form: {
        provinceId: "", //省
        cityId: "", //市
        areaId: "", //区
        name: "", //单位名称
        // licence: "", //特种设备行政许可证号
        unitPhone: "", //单位固定电话
        phone: "", //负责人联系电话
        address: "", //单位地址
        code: "", //统一社会信用代码
        postalCode: "", //邮政编码
        type: 0 ,//单位类型
        personnelName:"" //负责人

      },
      // type:0,
      // 编辑
      editUserForm: {
        provinceId: "", //省
        cityId: "", //市
        areaId: "", //区
        name: "", //单位名称
        unitPhone: "", //单位固定电话
        phone: "", //负责人联系电话
        address: "", //单位地址
        code: "", //统一社会信用代码
        postalCode: "", //邮政编码
        type: 0 //单位类型
      },
  
      // optionsuseName: ["车用气瓶", "液化气瓶", "工业气瓶"],
      //表单验证
      rulses: {
        provinceId: [
          { provinceId: true, message: "省级区域不能为空", trigger: "blur" }
        ], //省级区域验证
        cityId: [
          { required: true, message: "市级区域不能为空", trigger: "blur" }
        ], //市级区域验证
        areaId: [
          { required: true, message: "区级区域不能为空", trigger: "blur" }
        ], //区级区域验证
        name: [
          { required: true, message: "请输入单位名称", trigger: "blur" },
          { min: 2, message: "请输入不少于2个字", trigger: "blur" }
        ], //单位名称的验证
        // licence: [
        //   { required: true, message: "特种设备证号不能为空", trigger: "blur" }
        // ],
          personnelName: [
          { required: true, message: "负责人不能为空", trigger: "blur" }
        ], 

        // phone: [
        //   { required: true, message: "请输入手机号", trigger: "blur" },
        //   {
        //     pattern: /^1[3456789]\d{9}$/,
        //     message: "手机号格式不对"
        //   }
        // ], //固定电话验证
        // unitPhone: [
        //   { required: true, message: "请输入固定电话", trigger: "blur" },
        //   {
        //     pattern: /^((0\d{2,3})-)?(\d{7,8})(-(\d{3,}))?$|(0\d{10})$/,
        //     message: "固定电话格式不对"
        //   }
        // ],
        address: [
          { required: true, message: "请输入地址", trigger: "blur" },
          { min: 2, message: "请输入不少于2个字", trigger: "blur" }
        ], //地址验证
        // code: [
        //   { required: true, message: "请输入统一社会信用代码", trigger: "blur" }
        //   // { min: 2, message: "请输入不少于2个字", trigger: "blur" }
        // ], //统一社会信用代码
        // postalCode: [
        //   { required: true, message: "请输入邮政编码", trigger: "blur" },
        //   { min: 6, message: "请输入6个字", trigger: "blur" },
        //   { pattern: /^[1-9][0-9]{5}$/, message: "邮政编码格式不对" }
        // ] //邮政编码

        // unitIssueTime: [
        //   {
        //     type: "date",
        //     required: true,
        //     message: "请选择时间",
        //     trigger: "blur"
        //   }
        // ], //发证日期
        // unitChangeTime: [
        //   {
        //     type: "date",
        //     required: true,
        //     message: "请选择时间",
        //     trigger: "blur"
        //   }
        // ] //换证日期
      },
      multipleSelection: [], //批量删除数据
      delarr: [] //批量删除id
    };
  },
  watch: {
    dialogFormVisibleAdd: function(val, oldVla) {
      this.$refs["form"].resetFields();
    }
  },

  methods: {
    // 新增人员
    newStaff(){
      this.dialogFormnewStaff=true
    },
    // 新增app用户
    appUserssure(){
         this.dialogFormVisiblenewUserapp=true
    },
    // 新增系统用户
    newUsers() {
      this.dialogFormVisiblenewUsers = true;
    },
    // 多选
    handleCurrentChanges(val) {
      this.multipleSelection = val;
      // this.showDeleUserMsgBox = val.length;
    },
    // 批量删除请求数据
    showDeleUserMsgBox() {
      let arr1 = [];
      for (let i = 0; i <= this.multipleSelection.length - 1; i++) {
        arr1.push(this.multipleSelection[i].id);
      }
      this.delarr = arr1;
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
          // let idss={
          //   ids:this.delarr
          // }
          const res = await this.$http.post(`/unit-record/delete`, this.delarr);
          console.log(res);
          this.getUserlist();
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
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    // 查询单位名称
    async selectedDia() {
      const res = await this.$http.get(`/unit-record/findAll`);
      // console.log(res);
      this.options = res.data.data;
    },
    // 省级区域显示
    async provinceMessage() {
      const res = await this.$http.get(`/chinese/province`);
      // console.log(res);
      this.ProvinceId = res.data.data;
      // this.form.provinceId=this.Id
    },
    //

    //  市级
    async function2(val) {
      this.id = val;
      // console.log(this.id);

      const res = await this.$http.get(`/chinese/city/${this.id}`);
      // console.log(res);
      this.CityId = res.data.data;
    },

    // 区域
    async function1(val) {
      this.Id = val;
      const res = await this.$http.get(`/chinese/area/${this.Id}`);
      // console.log(res);
      this.AreaId = res.data.data;
    },

    // 搜索省份
    async provinceMessages() {
      const res = await this.$http.get(`/chinese/province`);
      // console.log(res);
      this.ProvinceIds = res.data.data;
      // this.form.sheng=this.Id
    },

    //  搜索市级
    async functions2(val) {
      this.id = val;
      console.log(this.id);
      const res = await this.$http.get(`/chinese/city/${this.id}`);
      console.log(res);
      this.CityIds = res.data.data;
    },

    // 搜索区域
    async functions1(val) {
      this.Id = val;
      const res = await this.$http.get(`/chinese/area/${this.Id}`);
      console.log(res);
      this.AreaIds = res.data.data;
    },

    // 修改用户发送请求
    async EditUser() {
      //   users/:id
      this.dialogFormVisibleEdit = false;
      const res = await this.$http.put(`/unit-record`, this.editUserForm);
      console.log(res);
      if (res.data.code === 0) {
        // 回到第一页展示
        //this.pagenum = 1;
        // 重新请求数据
        // this.getUserlist();
        // 提示
        this.$message({
          type: "success",
          message: res.data.msg
        });
        this.getUserlist();
      } else {
        this.$message({
          type: "danger",
          message: "修改失败"
        });
      }
    },

    // 编辑对话框打开
    async showEdituser(user) {
      this.dialogFormVisibleEdit = true;
      this.editUserForm = user;
      this.Id = user.cityId;
      const res = await this.$http.get(`/chinese/city/by/${this.Id}`);
      console.log(res);
      this.editUserForm.cityId = res.data.data;
      // console.log(typeof(user));
      this.Ids = user.areaId;
      // /chinese/area/by/
      const ress = await this.$http.get(`/chinese/area/by/${this.Ids}`);
      console.log(ress);
      this.editUserForm.areaId = ress.data.data;
      this.getUserlist();
    },

    //删除用户 打开消息盒子
    // showDeleUserMsgBox(userId) {
    //   console.log(userId);

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
    //       const res = await this.$http.delete(`/unit-record/${userId}`);
    //       console.log(res);
    //       this.getUserlist();
    //       // 提示
    //       this.$message({
    //         type: "success",
    //         message: res.data.msg
    //       });
    //     })
    //     .catch(() => {
    //       this.$message({
    //         type: "info",
    //         message: "已取消删除"
    //       });
    //     });
    // },

    //   添加用户发送请求
    async AddUser() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          const res = await this.$http.post(`/unit-record`, this.form);
          console.log(res);
          // console.log(res);
          if (res.data.code === 0) {
            // 提示
            this.$message({
              type: "success",
              message: res.data.msg
            });
            // this.form = {};
            this.getUserlist();
            this.dialogFormVisibleAdd = false;
          } else if (res.data.code === 1) {
            this.$message({
              type: "warning",
              message: res.data.msg
            });
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
      // this.form.type = 0;
      // console.log(this.form.type);
      // 先点编辑 再点添加 打开表单清空表单
      // this.form = {};
      this.dialogFormVisibleAdd = true;
    },
    //清空搜索框搜索数据 点击清楚按钮清除数据重新发送请求
    loadUserList() {
      this.getUserlist();
    },
    // 搜索用户 给搜索框绑定query v-model="query"
    async searchUser() {
      const res = await this.$http.get(
        `/unit-record/findPage?rows=${this.rows}&page=${this.curr}&type=0&unitName=${this.unitName}&licence=${this.licence}&provinceId=${this.provinceId}&cityId=${this.cityId}&areaId=${this.areaId}`
      );
      console.log(res);
      this.userlist = res.data.data.list;
      this.total = res.data.data.totalCount;
      // console.log("aaaaaa");
    },
    //分页功能
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      // 1.每页显示条数的改变
      this.rows = val;
      // 回到第一页
      this.page = 1;
      // 希望当页条数改变时 从第一页开始显示 this.pagenum = 1 -》currPage=1?
      this.getUserlist();
    },
    handleCurrentChange(val) {
      //页码改变时
      console.log(`当前页: ${val}`);
      this.page = val;
      this.getUserlist();
    },
    async getUserlist() {
      //需要授权的API ，必须在请求头中使用Authorization 字段token令牌
      //pagenum当前页面   pagesize每页显示条数
      //接口文档中 除了登录接口之外的所有请求都需要进行授权，设置请求头
      //找axios中关于请求头的代码  写在了http.js中
      // const AUTH_TOKEN = localStorage.getItem("token");
      // this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;

      const res = await this.$http.get(
        `/unit-record/findPage?rows=${this.rows}&page=${this.page}&type=0&unitName=${this.unitName}&licence=${this.licence}&provinceId=${this.provinceId}&cityId=${this.cityId}&areaId=${this.areaId}`
      );
      console.log(res);
      this.userlist = res.data.data.list;
      this.total = res.data.data.totalCount;
      // const {
      //   meta: { status, msg },
      //   data: { users, total }
      // } = res.data;
      // if (status === 200) {
      //   // 1.给表格数据赋值
      //   // 给总数赋值
      //   // 提示
      //   // 表格通过prop进行赋值展示一般数据
      //   this.userlist = users;
      //   this.total = total;
      //   this.$message.success(msg);
      // } else {
      //   this.$message.warning(msg);
      // }
    }
  },
  created() {
    // this.showEdituser()
    // this.city();
    this.getUserlist();
    this.provinceMessage();
    this.selectedDia();
    this.function2();
    this.function1();
    this.provinceMessages();
    // this.Municipal();
    // this.Municipals();
  }
  //   弹框组件
  // components:{
  //    Message
  // }
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
[class*=el-col-] {
  margin-top:5px;
}
</style>
<style>
.el-table th,
.el-table td {
  text-align: center !important;
}
</style>