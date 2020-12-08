<template>
  <div>
    <div style="background: white; width: 99.1%; padding-left: 15px">
      <my-bread
        level1="气瓶登记"
        level2="标签发卡"
        level3="车用气瓶"
      ></my-bread>
    </div>
    <el-card class="box-card" style="margin: 20px 20px 0 20px">
      <!--搜索  -->
      <el-row>
        <el-col :span="24">
          <h5
            style="
              border-bottom: 1px solid #ece8e8;
              padding-bottom: 15px;
              padding-left: 15px;
            "
          >
            查询信息
          </h5>
        </el-col>

        <el-col style="padding-left: 15px" :span="22">
          <el-col :span="24">
            <el-col :span="4">
              <el-input
                size="small"
                style="width: 100%"
                @clear="loadUserList()"
                clearable
                class="input-serach"
                placeholder="请输入气瓶编号"
                v-model="gasId"
              ></el-input>
            </el-col>
            <el-col style="margin-left: 30px" :span="4">
              <el-input
                size="small"
                style="width: 100%"
                @clear="loadUserList()"
                clearable
                class="input-serach"
                placeholder="请输入登记证编号"
                v-model="regId"
              ></el-input>
            </el-col>
            <el-col style="margin-left: 30px" :span="4">
              <el-input
                size="small"
                style="width: 100%"
                @clear="loadUserList()"
                clearable
                class="input-serach"
                placeholder="请输入车牌号码"
                v-model="carNum"
              ></el-input>
            </el-col>
            <el-col style="margin-left: 30px" :span="4">
              <el-select
                size="small"
                v-model="isCard"
                clearable
                @clear="loadUserList()"
                placeholder="请选择是否发卡"
              >
                <el-option
                  v-for="item in optionsle"
                  :key="item.id"
                  :label="item.lei"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-col>
            <el-col style="margin-left: 30px" :span="4">
              <el-button
                @click="searchUser()"
                size="small"
                style="width: 100%"
                class="el_button"
                icon="el-icon-search"
                >搜索</el-button
              >
            </el-col>
          </el-col>
        </el-col>
      </el-row>

      <el-col :span="24">
        <p
          style="
            width: 100%;
            height: 1px;
            background: rgb(236, 232, 232);
            margin: 20px 0px 0px 0px;
            z-index: 999;
          "
        ></p>
      </el-col>

      <el-col style="margin-bottom: 15px; margin-top: 15px" :span="24">
        <el-col :span="16">&nbsp;</el-col>
        <el-col :span="2">
          <el-button
            style="font-size: 14px"
            type="success"
            @click="Readcard()"
            size="small"
            >读气瓶标签</el-button
          >
        </el-col>
        <el-col :span="2">
          <el-button
            style="font-size: 14px"
            type="success"
            @click="Readstaff()"
            size="small"
            >读员工标签</el-button
          >
        </el-col>
        <el-col :span="2">
          <el-button
            style="font-size: 14px"
            type="success"
            @click="ClearLabel()"
            size="small"
            >清空标签卡</el-button
          >
        </el-col>
        <el-col :span="2">
          <el-button
            style="font-size: 14px"
            type="success"
            @click="Clearstaff()"
            size="small"
            >清空员工卡</el-button
          >
        </el-col>
      </el-col>

      <!-- 表格 -->
      <template>
        <el-table
          :row-style="{ height: '40px' }"
          :cell-style="{ padding: '0px' }"
          border
          :data="userlist"
          style="width: 100%; padding-bottom: 40px"
        >
          <el-table-column
            type="index"
            label="序号"
            width="50"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="regId"
            label="登记证号"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="gasId"
            label="气瓶编号"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="appId"
            label="标签号"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="carNum"
            label="车牌号码"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="inspectName"
            label="检验单位"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="isCard" label="是否发卡" show-overflow-tooltip>
            <template slot-scope="scope">
              <p v-if="userlist[scope.$index].isCard == 0">未发卡</p>
              <p v-if="userlist[scope.$index].isCard == 1">已发卡</p>
            </template>
          </el-table-column>

          <el-table-column
            prop="checkData"
            label="检验日期"
            show-overflow-tooltip
          >
            <template slot-scope="socpe">{{
              socpe.row.checkData | fmtdate
            }}</template>
          </el-table-column>
          <el-table-column
            prop="nextCheckData"
            label="下次检验日期"
            show-overflow-tooltip
          >
            <template slot-scope="socpe">{{
              socpe.row.nextCheckData | fmtdate
            }}</template>
          </el-table-column>

          <!-- 表格操作 -->
          <el-table-column prop="address" width="150" label="操 作">
            <template slot-scope="scope">
              <el-tooltip
                class="item"
                effect="dark"
                content="发卡"
                :enterable="false"
                placement="top"
              >
                <el-button
                  type="primary"
                  size="mini"
                  title="发卡"
                  :disabled="scope.row.isCard != 0"
                  plain
                  @click="sendLabel(scope.row.id)"
                  >发卡</el-button
                >
              </el-tooltip>
              <el-tooltip
                class="item"
                effect="dark"
                content="补卡"
                :enterable="false"
                placement="top"
              >
                <el-button
                  :disabled="scope.row.isCard != 1"
                  type="success"
                  size="mini"
                  title="补卡"
                  plain
                  @click="reissueLabel(scope.row.id)"
                  >补卡</el-button
                >
              </el-tooltip>
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
        style="
          padding: 5px 15px 15px 15px;
          display: flex;
          justify-content: flex-end;
        "
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currpage"
        :page-sizes="[10, 15, 20, 25, 30]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>

 
    </el-card>
    <!-- 读气瓶标签 -->
    <el-dialog title="气瓶信息" :visible.sync="dialogFormVisible">
      <el-form :model="ReadcardFrom">
        <el-form-item label="登记证号" :label-width="formLabelWidth">
          <el-input v-model="ReadcardFrom.regId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="气瓶编号" :label-width="formLabelWidth">
          <el-input v-model="ReadcardFrom.gasId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="车牌号" :label-width="formLabelWidth">
          <el-input
            v-model="ReadcardFrom.carNumber"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="检验单位" :label-width="formLabelWidth">
          <el-input
            v-model="ReadcardFrom.unitName"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="检验日期" :label-width="formLabelWidth">
          <el-input v-model="ReadcardFrom.time" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="检验结论" :label-width="formLabelWidth">
          <el-input v-model="ReadcardFrom.status" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="标签号" :label-width="formLabelWidth">
          <el-input
            v-model="ReadcardFrom.lableNo"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="下次检验日期" :label-width="formLabelWidth">
          <el-input
            v-model="ReadcardFrom.checkDate"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <!-- 读员工标签 -->
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible3">
      <el-form :model="staffFrom">
        <el-form-item label="ID号" :label-width="formLabelWidth">
          <el-input v-model="staffFrom.appId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="编号" :label-width="formLabelWidth">
          <el-input v-model="staffFrom.code" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="staffFrom.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="时间" :label-width="formLabelWidth">
          <el-input
            v-model="staffFrom.expireTime"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible3 = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible3 = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
// 气瓶信息管理
// import Message from "@/components/archives/message"
import cityData from "@/components/archives/citydata.js";
import jwtDecode from "jwt-decode";
export default {
  name: "cylinder",

  data() {
    return {
      dialogFormVisible: false,
      dialogFormVisible3: false,
      formLabelWidth: 100 + "px",
      ReadcardFrom: {
        regId: "",
        gasId: "",
        unitName: "",
        time: "",
        status: "",
        lableNo: "",
        checkDate: "",
        carNumber: "",
      },
      staffFrom: {
        appId: "",
        code: "",
        username: "",
        expireTime: "",
      },
      wsr: "",
      unitName: "",
      select: "",
      regId: "",
      gasId: "",
      carNum: "",
      isCard: "",
      userlist: [],
      token: [],
      cityData,
      //分页相关数据
      total: -1,
      currpage: 1,
      page: 1,
      pageSize: 10,
      id: -1,
      Id: -1,
      dengId: -1,
      options: [],
      level: [],
      levels: [],
      fakas: "",
      optionsle: [
        {
          id: 1,
          lei: "已发卡",
        },
        {
          id: 0,
          lei: "未发卡",
        },
      ],
      // 添加对话框的属性
      dialogFormVisibleAdd: false,
      dialogFormVisibleEdit: false,
      dialogTableVisible: false,
      dengdialogFormVisible: false,
      // dialogFormVisibleRoleshow: false,
      //添加用户的表单的数据
      form: {
        regId: "",
        sheng: "",
        city: "",
        lei: "",
        country: "",
        regType: "",
        email: "",
        daima: "",
        num: "",
        supervisoryOrg: "",
        checkName: "",
        useName: "",
        address: "",
        initData: "",
        mobilePhone: "",
        sbdm: "",
        useSafe: "",
        certification: "",
        cretificationDate: "",
        certificationPerson: "",
        telPhone: "",
      },

      dengform: {
        regId: "",
        regType: "",
        num: "",
        supervisoryOrg: "",
        checkName: "",
        useName: "",
        address: "",
        initData: "",

        useSafe: "",
        certification: "",
        cretificationDate: "",

        telPhone: "",
        creditCode: "",
        // productName:"",
        sbAddress: "",
        post: "",
        mobilePhone: "",
        userFill: "",
        fillDate: "",
        userSafePerson: "",
        verifyDate: "",
        certificationPerson: "",
      },

      // 编辑
      editUserForm: {
        regId: "",
        sheng: "",
        city: "",
        country: "",
        regType: "",
        num: "",
        supervisoryOrg: "",
        checkName: "",
        useName: "",
        address: "",
        initData: "",
        mobilePhone: "",
        useSafe: "",
        certification: "",
        cretificationDate: "",
        certificationPerson: "",
        telPhone: "",
      },
      optionsuseName: [
        {
          id: 1,
          usenames: "待定1",
        },
        {
          id: 2,
          usenames: "待定2",
        },
      ],
      optionslei: [
        {
          id: 1,
          lei: "新设备首次启用",
        },
        {
          id: 2,
          lei: "改造",
        },
        {
          id: 3,
          lei: "使用单位更名",
        },
        {
          id: 4,
          lei: "使用地址变更",
        },
        {
          id: 5,
          lei: "过户",
        },
        {
          id: 6,
          lei: "移装",
        },
        {
          id: 7,
          lei: "达到设计使用年限",
        },
      ],

      rules: {
        regId: [{ required: true, message: "档案号不能为空", trigger: "blur" }],
        sheng: [
          { required: true, message: "省级区域代码不能为空", trigger: "blur" },
        ],
        city: [
          { required: true, message: "市级区域代码不能为空", trigger: "blur" },
        ],
        country: [
          { required: true, message: "区域代码不能为空", trigger: "blur" },
        ],
        regType: [
          { required: true, message: "登记类型不能为空", trigger: "blur" },
        ],
        num: [{ required: true, message: "气瓶数量不能为空", trigger: "blur" }],
        supervisoryOrg: [
          { required: true, message: "请输入监督机构", trigger: "blur" },
        ],
        checkName: [
          { required: true, message: "请输入定期检验名称", trigger: "blur" },
        ],

        useName: [
          { required: true, message: "请输入使用单位", trigger: "blur" },
        ],
        address: [
          { required: true, message: "请输入使用地址", trigger: "blur" },
        ],
        initData: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "blur",
          },
        ],
        mobilePhone: [
          { required: true, message: "固定电话不能为空", trigger: "blur" },
        ],
        useSafe: [
          { required: true, message: "请输入安全管理员", trigger: "blur" },
        ],
        certification: [
          { required: true, message: "请输入登记机关", trigger: "blur" },
        ],
        cretificationDate: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "blur",
          },
        ],
        certificationPerson: [
          { required: true, message: "请输入登记人员", trigger: "blur" },
        ],
        telPhone: [
          { required: true, message: "联系电话不能为空", trigger: "blur" },
          { min: 11, max: 11, message: "请输入11位手机号码", trigger: "blur" },
          {
            pattern: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
            message: "请输入正确的手机号码",
          },
        ],
        // type: [
        //   {
        //     type: "array",
        //     required: true,
        //     message: "请至少选择一个活动性质",
        //     trigger: "change"
        //   }
        // ],
      },
      // 分配角色,
      currRoleId: -1,
      //   分配当前用户id
      currusrId: -1,
      roles: [],
      currUsername: "",
      country: [],
      arealeve: 1,
      //   保存所有角色数据
    };
  },
  created() {
    this.getUserlist();
    this.provinceMessage();
    // this.Municipal();
    // this.Municipals();
  },
  mounted() {
    console.log(wsrProxy);
    this.wsr = wsrProxy;
    this.wsr.init();
    // this.getAllVehLabelDate();
  },
  methods: {
    //清除员工卡
    Clearstaff() {
      var passa = "ABCDEABBCC12";
      var passb = "CCABEAAAEE21";
      var rt = 0;
      var port = 0;
      var keyType = 0;
      var keytype2 = 1;
      var key = passa;
      var keyb = passb;
      var v1 = 5000,
        v2 = 0;
      var block = 12;
      var delaytime = 2;
      var obj = { cardno: "", uid: "", len: 0 };
      rt = this.wsr.ws_openPort(port);
      console.log("open:" + rt);
      try {
        this.wsr.ws_set_mode(this.wsr.MODE_TIMEOUT, 300);
        this.wsr.ws_beep(port);
        rt = this.wsr.ws_getCardNo_String(port, obj);
        if (rt < 0) {
          this.$message.warning("请放入卡片");
          return rt;
        }
        rt = this.wsr.ws_loadKey(port, key, keyType);
        rt = this.wsr.ws_loadKey(port, keyb, keytype2);
        this.wsr.client_datatype = 1;
        rt = this.wsr.ws_readBlock(port, 12 * 4, obj);
        if (rt < 0) this.$message.error("卡片类型错误");
        else {
          rt = this.wsr.ws_writeBlock(
            port,
            12 * 4,
            "00000000000000000000000000000000"
          );
          rt = this.wsr.ws_changeKey(
            port,
            12,
            "FFFFFFFFFFFF",
            "FF078069",
            "FFFFFFFFFFFF"
          );
          if (rt > 0) {
            this.$message.success("清除成功");
          }
        }
      } finally {
        this.wsr.ws_closePort(port);
      }
    },
    //读员工卡标签
    Readstaff() {
      var passworda = "ABCDEABBCC12";
      var passwordb = "CCABEAAAEE21";
      //读标签
      var rt = 0;
      var port = 0;
      var keyType = 0;
      var key = passworda;
      var key2 = passwordb;
      var v1 = 5000,
        v2 = 0;
      var block = 12;
      var delaytime = 2;
      var obj = { cardno: "", uid: "", len: 0 };
      rt = this.wsr.ws_openPort(port);
      console.log("open:" + rt);
      try {
        this.wsr.ws_set_mode(this.wsr.MODE_TIMEOUT, 300);
        this.wsr.ws_beep(port);
        rt = this.wsr.ws_getCardNo_String(port, obj);
        console.log(rt);//0
        if (rt < 0) {
          this.$message.error("请放入卡片");
          return rt;
        }
        rt = this.wsr.ws_loadKey(port, key, 0);
        console.log(rt);//1
        rt = this.wsr.ws_loadKey(port, key2, 1);
        console.log(rt);//1
        this.wsr.client_datatype = 1;
        obj.data = "";
        rt = this.wsr.ws_readBlock(port, 12 * 4, obj);
        console.log(rt);
        if (rt < 0) {this.$message.error("卡片类型错误");
        // layui.use('layer', function () {
        //     var layer = layui.layer;
        //     layer.msg('卡片类型错误');
        // });
        }else {
          this.dialogFormVisible3 = true;
          rt = this.wsr.ws_readBlock(port, 48, obj);
          var str = obj.data;
          console.log(str);
          var num1 = parseInt(str.substring(0, 4), 16);
          var num2 = parseInt(str.substring(4, 8), 16);
          var num3 = this.hexCharCodeToStr(str.substring(8, 24));
          var date1 = parseInt(str.substring(24, 28), 16);
          var date2 = parseInt(str.substring(28, 30), 16);
          var date3 = parseInt(str.substring(30, 32), 16);
          var endTime = date1 + "-" + date2 + "-" + date3;
          //表单赋值
          this.staffFrom = {
            appId: num1,
            code: num2,
            username: num3,
            expireTime: endTime,
          };
          // layui.use('form', function () {
          //     var form = layui.form;
          //     form.val('examples', {
          //         "appId": num1
          //         , "code": num2
          //         , "username": num3
          //         , "expireTime": endTime
          //     })

          // })
          // layui.use('layer', function () {
          //     var layer = layui.layer;
          //     layer.open({
          //         type: 1,
          //         title: '员工信息',
          //         shade: 0,
          //         area: ['580px', '550px'],
          //         content: $('#formUserCard')
          //     });
          // });
        }
      } finally {
        this.wsr.ws_closePort(port);
      }
    },
    
    hexCharCodeToStr(hexCharCodeStr) {
      var trimedStr = hexCharCodeStr.trim();
      var rawStr =
        trimedStr.substr(0, 2).toLowerCase() === "0x"
          ? trimedStr.substr(2)
          : trimedStr;
      var len = rawStr.length;
      if (len % 2 !== 0) {
        alert("Illegal Format ASCII Code!");
        return "";
      }
      var curCharCode;
      var resultStr = [];
      for (var i = 0; i < len; i = i + 2) {
        curCharCode = parseInt(rawStr.substr(i, 2), 16); // ASCII Code Value
        resultStr.push(String.fromCharCode(curCharCode));
      }
      return resultStr.join("");
    },
    // // 清除发卡标签
    ClearLabel() {
      var passworda = "837210987622";
      var passwordb = "12BBADDAEA11";
      var rt = 0;
      var port = 0;
      var keyType = 0;
      var key = passworda;
      var keyb = passwordb;
      var v1 = 5000,
        v2 = 0;
      var block = 12;
      var delaytime = 2;
      var obj = { cardno: "", uid: "", len: 0 };
      rt = this.wsr.ws_openPort(port);
      console.log("open:" + rt);
      try {
        this.wsr.ws_set_mode(this.wsr.MODE_TIMEOUT, 300);
        this.wsr.ws_beep(port);
        rt = this.wsr.ws_getCardNo_String(port, obj);
        if (rt < 0) {
          this.$message.warning("请放入卡片");
          // layui.use('layer', function () {
          //     var layer = layui.layer;
          //     layer.msg('请放入卡片');
          // });
          return rt;
        }
        rt = this.wsr.ws_loadKey(port, key, 0);
        rt = this.wsr.ws_loadKey(port, keyb, 1);
        this.wsr.client_datatype = 1;
        rt = this.wsr.ws_readBlock(port, 13 * 4, obj);
        if (rt < 0) this.$message.error("卡片类型错误");
        // layui.use('layer', function () {
        //     var layer = layui.layer;
        //     layer.msg('卡片类型错误');
        // });
        else {
          rt = this.wsr.ws_initValue(port, block, v1);
          this.wsr.ws_writeBlock(
            port,
            2 * 4,
            "00000000000000000000000000000000"
          );
          this.wsr.ws_writeBlock(port, 9, "00000000000000000000000000000000");
          this.wsr.ws_writeBlock(
            port,
            3 * 4,
            "00000000000000000000000000000000"
          );
          this.wsr.ws_writeBlock(
            port,
            4 * 4,
            "00000000000000000000000000000000"
          );
          this.wsr.ws_writeBlock(port, 17, "00000000000000000000000000000000");
          this.wsr.ws_writeBlock(
            port,
            5 * 4,
            "00000000000000000000000000000000"
          );
          this.wsr.ws_writeBlock(
            port,
            6 * 4,
            "00000000000000000000000000000000"
          );
          this.wsr.ws_writeBlock(
            port,
            13 * 4,
            "00000000000000000000000000000000"
          );
          rt = this.wsr.ws_changeKey(
            port,
            2,
            "FFFFFFFFFFFF",
            "FF078069",
            "FFFFFFFFFFFF"
          );
          this.wsr.ws_changeKey(
            port,
            3,
            "FFFFFFFFFFFF",
            "FF078069",
            "FFFFFFFFFFFF"
          );
          this.wsr.ws_changeKey(
            port,
            4,
            "FFFFFFFFFFFF",
            "FF078069",
            "FFFFFFFFFFFF"
          );
          this.wsr.ws_changeKey(
            port,
            5,
            "FFFFFFFFFFFF",
            "FF078069",
            "FFFFFFFFFFFF"
          );
          this.wsr.ws_changeKey(
            port,
            6,
            "FFFFFFFFFFFF",
            "FF078069",
            "FFFFFFFFFFFF"
          );
          this.wsr.ws_changeKey(
            port,
            13,
            "FFFFFFFFFFFF",
            "FF078069",
            "FFFFFFFFFFFF"
          );
          if (rt > 0) {
            this.$message.success("清除成功");
            // layui.use('layer', function () {
            //     var layer = layui.layer;
            //     layer.msg('清除成功');
            // });
          }
        }
      } finally {
        this.wsr.ws_closePort(port);
      }
    },
    //补卡标签
    reissueLabel(obj) {
      var rt = 0;
      var port = 0;
      var keyType = 0;
      var key = "FFFFFFFFFFFF";
      var v1 = 5000,
        v2 = 0;
      var block = 12;
      var delaytime = 2;
      var objs = { cardno: "", uid: "", len: 0 };
      rt = this.wsr.ws_openPort(port);
      console.log("open:" + rt);
      try {
        this.wsr.ws_set_mode(this.wsr.MODE_TIMEOUT, 300);
        this.wsr.ws_beep(port);
        rt = this.wsr.ws_getCardNo_String(port, objs);
        if (rt < 0) {
          this.$message.warning("请放入卡片");
          return rt;
        }
        rt = this.wsr.ws_loadKey(port, key, 0);
        rt = this.wsr.ws_readBlock(port, 13 * 4, objs);
        if (rt < 0) {
          this.$message.error("卡类型错误或该卡已有数据");
          return rt;
        }
        rt = this.wsr.client_datatype = 1;
        this.$http.post(`/send/fillCarTuckComb?id=${obj}`).then((res) => {
          console.log(res);
          let checkCode = res.data.checkCode;
          let regId = res.data.regId;
          let gasId = res.data.gasId;
          let unit = res.data.unit;
          let checkStatus = res.data.status;
          let times = res.data.times;
          let date = res.data.date;
          rt = this.wsr.ws_openPort(port);
          rt = this.wsr.ws_verifyKey(port, key, 0);
           rt = this.wsr.ws_writeBlock(port, 4, checkCode)
          rt = this.wsr.ws_writeBlock(port, 8, regId);
          if (regId.length > 32) {
            regId = regId.substring(32);
            this.wsr.ws_writeBlock(port, 9, regId);
          } else if (regId.length > 64) {
            regId = regId.substring(64);
            this.wsr.ws_writeBlock(port, 10, regId);
          }
          rt = this.wsr.ws_writeBlock(port, 12, gasId);
          if (gasId.length > 32) {
            gasId = gasId.substring(32);
            this.wsr.ws_writeBlock(port, 13, gasId);
          } else if (gasId.length > 64) {
            gasId = gasId.substring(64);
            this.wsr.ws_writeBlock(port, 14, gasId);
          }
          rt = this.wsr.ws_writeBlock(port, 16, unit);
          if (unit.length > 32) {
            unit = unit.substring(32);
            this.wsr.ws_writeBlock(port, 17, unit);
          } else if (unit.length > 64) {
            unit = unit.substring(64);
            this.wsr.ws_writeBlock(port, 18, unit);
          }
          rt = this.wsr.ws_writeBlock(port, 20, times);
          if (times.length > 32) {
            times = times.substring(32);
            this.wsr.ws_writeBlock(port, 21, times);
          } else if (times.length > 64) {
            times = unit.substring(64);
            this.wsr.ws_writeBlock(port, 22, times);
          }
          rt = this.wsr.ws_writeBlock(port, 24, checkStatus);
          if (checkStatus.length > 32) {
            checkStatus = checkStatus.substring(32);
            this.wsr.ws_writeBlock(port, 25, checkStatus);
          } else if (checkStatus.length > 64) {
            checkStatus = unit.substring(64);
            this.wsr.ws_writeBlock(port, 26, checkStatus);
          }
          rt = this.wsr.ws_writeBlock(port, 52, date);
          rt = this.wsr.ws_changeKey(
            port,
            2,
            "837210987622",
            "7F078869",
            "12BBADDAEA11"
          );
          this.wsr.ws_changeKey(
            port,
            3,
            "837210987622",
            "7F078869",
            "12BBADDAEA11"
          );
          this.wsr.ws_changeKey(
            port,
            4,
            "837210987622",
            "7F078869",
            "12BBADDAEA11"
          );
          this.wsr.ws_changeKey(
            port,
            5,
            "837210987622",
            "7F078869",
            "12BBADDAEA11"
          );
          this.wsr.ws_changeKey(
            port,
            6,
            "837210987622",
            "7F078869",
            "12BBADDAEA11"
          );
          this.wsr.ws_changeKey(
            port,
            13,
            "837210987622",
            "7F078869",
            "12BBADDAEA11"
          );
          if (rt > 0) {
            this.$message.success("补卡成功");
          }
        });
      } finally {
        this.wsr.ws_closePort(port);
      }
    },
    //发卡标签
    sendLabel(obj) {
      var rt = 0;
      var port = 0;
      var keyType = 0;
      var key = "FFFFFFFFFFFF";
      var v1 = 5000,
        v2 = 0;
      var block = 12;
      var delaytime = 2;
      var objs = { cardno: "", uid: "", len: 0 };
      rt = this.wsr.ws_openPort(port);
      console.log("open:" + rt);
      try {
        this.wsr.ws_set_mode(this.wsr.MODE_TIMEOUT, 300);
        this.wsr.ws_beep(port);
        rt = this.wsr.ws_getCardNo_String(port, objs);
        if (rt < 0) {
          this.$message.warning("请放入卡片");
          return rt;
        }
        rt = this.wsr.ws_loadKey(port, key, 0);
        rt = this.wsr.ws_readBlock(port, 13 * 4, objs);
        if (rt < 0) {
          this.$message.error("卡类型错误或该卡已有数据");
          return rt;
        }
        rt = this.wsr.client_datatype = 1;
        this.$http
          .post(`/send/getAppId?appId=${objs.cardno}&type=2`)
          .then((res) => {
            console.log(res.data.data);
            if (res.data.data < 1) {
              this.$http
                .post(`/send/updateCarTuckComb?appId=${objs.cardno}&id=${obj}`)
                .then((val) => {
                  console.log("--------------");
                  console.log(val);
                  let checkCode = val.data.checkCode;
                  let regId = val.data.regId;
                  let gasId = val.data.gasId;
                  let unit = val.data.unit;
                  let checkStatus = val.data.status;
                  let times = val.data.times;
                  let date = val.data.date;
                  console.log("====================");
                  console.log(checkCode);
                  console.log(regId);
                  rt = this.wsr.ws_openPort(port);
                  rt = this.wsr.ws_verifyKey(port, key, 0);
                   rt = this.wsr.ws_writeBlock(port, 4, checkCode)
                  rt = this.wsr.ws_writeBlock(port, 8, regId);
                  if (regId.length > 32) {
                    regId = regId.substring(32);
                    this.wsr.ws_writeBlock(port, 9, regId);
                  } else if (regId.length > 64) {
                    regId = regId.substring(64);
                    this.wsr.ws_writeBlock(port, 10, regId);
                  }
                  rt = this.wsr.ws_writeBlock(port, 12, gasId);
                  if (gasId.length > 32) {
                    gasId = gasId.substring(32);
                    this.wsr.ws_writeBlock(port, 13, gasId);
                  } else if (gasId.length > 64) {
                    gasId = gasId.substring(64);
                    this.wsr.ws_writeBlock(port, 14, gasId);
                  }
                  rt = this.wsr.ws_writeBlock(port, 16, unit);
                  if (unit.length > 32) {
                    unit = unit.substring(32);
                    this.wsr.ws_writeBlock(port, 17, unit);
                  } else if (unit.length > 64) {
                    unit = unit.substring(64);
                    this.wsr.ws_writeBlock(port, 18, unit);
                  }
                  rt = this.wsr.ws_writeBlock(port, 20, times);
                  if (times.length > 32) {
                    times = times.substring(32);
                    this.wsr.ws_writeBlock(port, 21, times);
                  } else if (times.length > 64) {
                    times = unit.substring(64);
                    this.wsr.ws_writeBlock(port, 22, times);
                  }
                  rt = this.wsr.ws_writeBlock(port, 24, checkStatus);
                  if (checkStatus.length > 32) {
                    checkStatus = checkStatus.substring(32);
                    this.wsr.ws_writeBlock(port, 25, checkStatus);
                  } else if (checkStatus.length > 64) {
                    checkStatus = unit.substring(64);
                    this.wsr.ws_writeBlock(port, 26, checkStatus);
                  }
                  rt = this.wsr.ws_writeBlock(port, 52, date);
                  rt = this.wsr.ws_changeKey(
                    port,
                    2,
                    "837210987622",
                    "7F078869",
                    "12BBADDAEA11"
                  );
                  this.wsr.ws_changeKey(
                    port,
                    3,
                    "837210987622",
                    "7F078869",
                    "12BBADDAEA11"
                  );
                  this.wsr.ws_changeKey(
                    port,
                    4,
                    "837210987622",
                    "7F078869",
                    "12BBADDAEA11"
                  );
                  this.wsr.ws_changeKey(
                    port,
                    5,
                    "837210987622",
                    "7F078869",
                    "12BBADDAEA11"
                  );
                  this.wsr.ws_changeKey(
                    port,
                    6,
                    "837210987622",
                    "7F078869",
                    "12BBADDAEA11"
                  );
                  this.wsr.ws_changeKey(
                    port,
                    13,
                    "837210987622",
                    "7F078869",
                    "12BBADDAEA11"
                  );
                  if (rt > 0) {
                    this.$message.success("发卡成功");
                    this.getUserlist();
                  }
                });
            } else {
              this.$message.warning("标签号已存在");
            }
          });
      } finally {
        this.wsr.ws_closePort(port);
      }
    },
    //读气瓶标签
    Readcard() {
      
      var passworda = "837210987622";
      var passwordb = "12BBADDAEA11";
      //读标签
      var rt = 0;
      var port = 0;
      var keyType = 0;
      var key = passworda;
      var key2 = passwordb;
      var v1 = 5000,
        v2 = 0;
      var block = 12;
      var delaytime = 2;
      var obj = { cardno: "", uid: "", len: 0 };

      rt = this.wsr.ws_openPort(port);
      console.log("open:" + rt);
      try {
        this.wsr.ws_set_mode(this.wsr.MODE_TIMEOUT, 300);
        this.wsr.ws_beep(port);
        rt = this.wsr.ws_getCardNo_String(port, obj);
        if (rt < 0) {
          this.$message.error("请放入卡片");
          return rt;
        }
        rt = this.wsr.ws_loadKey(port, key, 0);
        {
          rt = this.wsr.ws_loadKey(port, key2, 1);
        }
        this.wsr.client_datatype = 0;
        obj.data = "";
        rt = this.wsr.ws_readBlock(port, 13 * 4, obj);
        if (rt < 0) this.$message.error("卡片类型错误");
        else {
          this.dialogFormVisible = true;
          rt = this.wsr.ws_readBlock(port, 8, obj);
          var regId = obj.data;
          console.log(obj.data);
          rt = this.wsr.ws_readBlock(port, 12, obj);
          var gasId = obj.data;
          console.log(obj.data);
          rt = this.wsr.ws_readBlock(port, 16, obj);
          var unit = obj.data;
          console.log(obj.data);
          rt = this.wsr.ws_readBlock(port, 17, obj);
          var unit2 = obj.data;
          var unitName = unit + unit2;
          this.wsr.client_datatype = 1;
          rt = this.wsr.ws_readBlock(port, 20, obj);
          var str = obj.data;
          var num1 = parseInt(str.substring(0, 4), 16);
          var num2 = parseInt(str.substring(4, 6), 16);
          var num3 = parseInt(str.substring(6, 8), 16);
          var time = num1 + "-" + num2 + "-" + num3;
          this.wsr.client_datatype = 0;
          rt = this.wsr.ws_readBlock(port, 24, obj);
          var status = obj.data;
          this.wsr.client_datatype = 1;
          rt = this.wsr.ws_readBlock(port, 52, obj);
          var car = obj.data;
          var lableNo = parseInt(car.substring(0, 8), 16);
          
          var date1 = parseInt(car.substring(8, 12), 16);
          var date2 = parseInt(car.substring(12, 14), 16);
          var date3 = parseInt(car.substring(14, 16), 16);
          var checkDate = date1 + "-" + date2 + "-" + date3;
          var carNumber = this.hexCharCodeToStr(car.substring(16, 32));
          console.log(carNumber);
          this.ReadcardFrom = {
            regId: regId,
            gasId: gasId,
            unitName: unitName,
            time: time,
            status: status,
            lableNo: lableNo,
            checkDate: checkDate,
            carNumber: carNumber,
          };
        }
      } finally {
        this.wsr.ws_closePort(port);
      }
    },
    
    
    Editusertion() {
      this.getUserlist();
    },
    // 保存文件
    savencftpget() {
      this.$http
        .post(
          `/word/word?id=${this.dengId}&creditCode=${this.dengform.creditCode}&sbAddress=${this.dengform.sbAddress}&post=${this.dengform.post}&mobilePhone=${this.dengform.mobilePhone}&userFill=${this.dengform.userFill}&fillDate=${this.dengform.fillDate}&userSafePerson=${this.dengform.userSafePerson}&verifyDate=${this.dengform.verifyDate}&certificationPerson=${this.dengform.certificationPerson}`
        )
        .then((res) => {
          console.log(res);
          if (res.data.code == 1) {
            this.$message({
              type: "warning",
              message: res.data.msg,
            });
          } else if (res.data.code == 200) {
            this.$message({
              type: "success",
              message: res.data.msg,
            });
          }
        });
    },
    // 下载world文档
    ncftpget() {
      this.$http
        .post(
          `/word/download`,
          { headers: "application/x-download" },
          { responseType: "blob" }
        )
        .then((response) => {
          console.log(response);

          if (response.status === 200) {
            this.getUserlist();
            // 提示
            this.$message({
              type: "success",
              message: "下载成功",
            });
            const blob = new Blob([response.data], {
              type: "application/msword",
            });
            const fileName = "登记证打印模板.docx";

            const elink = document.createElement("a");

            elink.download = fileName;

            elink.style.display = "none";

            elink.href = URL.createObjectURL(blob);

            document.body.appendChild(elink);

            elink.click();

            URL.revokeObjectURL(elink.href); // 释放URL 对象
            document.body.removeChild(elink);
            this.dengdialogFormVisible = false;
          } else if (res.data.code == 201) {
            this.$message({
              type: "danger",
              message: "请填写所需要的内容",
            });
          }
        })
        .catch((err) => {
          this.$message({
            type: "danger",
            message: "请填写所需要的内容",
          });
          //         _toastr.error(err)
        });
    },
    registrationAddUserDia(row) {
      this.dengId = row.id;
      this.dengdialogFormVisible = true;
      this.dengform = row;
    },
    // 省级区域显示
    async provinceMessage() {
      const res = await this.$http.get(`/chinese/province`);
      console.log(res);
      this.options = res.data.data;
      // this.form.sheng=this.Id
    },

    //  市级
    async function2(val) {
      console.log(val);

      // this.id = val;
      // console.log(this.id);
      this.options.map((s, index) => {
        if (s.name === val) {
          this.id = this.options[index].id;
          console.log(this.id);
        }
      });

      const res = await this.$http.get(`/chinese/city/${this.id}`);
      console.log(res);
      this.level = res.data.data;
    },

    // 区域
    async function1(val) {
      this.level.map((s, index) => {
        if (s.name === val) {
          this.Id = this.level[index].id;
          console.log(this.Id);
        }
      });
      // this.Id = val;
      const res = await this.$http.get(`/chinese/area/${this.id}`);
      console.log(res);
      this.levels = res.data.data;
    },

    // 查看信息
    async lookEdituser(user) {
      // console.log(userId);
      console.log(user);

      // this.dialogTableVisible = true;
      this.$router.push({ path: "/message", query: { id: user.id } });
    },
    // 编辑用户
    // 编辑用户发送请求
    async EditUser() {
      //   users/:id
      this.dialogFormVisibleEdit = false;
      const res = await this.$http.post(`/doucument/update`, this.editUserForm);
      console.log(res);
      if (res.data.code === 0) {
        // 回到第一页展示
        //this.pagenum = 1;
        // 重新请求数据
        // this.getUserlist();
        // 提示
        this.$message({
          type: "success",
          message: res.data.msg,
        });
      } else {
        this.$message({
          type: "danger",
          message: "修改失败",
        });
      }
    },

    // 编辑对话框打开
    async showEdituser(user) {
      // console.log(user);
      let tokens = this.token;
      let token = sessionStorage.getItem("access_token");
      let unitId = sessionStorage.getItem("unitId");
      const res = await this.$http.post(`send/sendService`, tokens);
      console.log(res);
      if (res.data.code == 201) {
        this.$message({
          type: "error",
          message: res.data.msg,
        });
      } else {
        let http = res.data.data;
        window.open(`${http}/send/carTuckComb?unitId=${unitId}`, "_blank");
      }
      // 2.添加对话框
      // this.dialogFormVisibleEdit = true;
      // this.editUserForm = user;
      //user其实就是scope.row也就是userlist
    },

    //删除用户 打开消息盒子
    showDeleUserMsgBox(userId) {
      console.log(userId);

      // 提示框 点击确定走.then
      // 点取消 走.catch
      this.$confirm("删除数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          // 注意async的位置，最近的位置
          // 发送删除请求:id:用户id
          // 1.data中找userId
          // 2.把userID以showDeleUserMsgBox参数形式传进来
          const res = await this.$http.get(`/doucument/delete/${userId}`);
          console.log(res);
          this.getUserlist();
          // 提示
          this.$message({
            type: "success",
            message: res.data.msg,
          });
          // if (res.data.status === 200) {
          //   // 回到第一页展示
          //   //this.pagenum = 1;
          //   // 重新请求数据
          //   this.getUserlist();
          //   // 提示
          //   this.$message({
          //     type: "success",
          //     message: res.data.msg
          //   });
          // }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    //   添加用户发送请求
    async AddUser() {
      //   let test = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
      //   if (this.form.mobilePhone !=test){
      //   this.$message({
      //     message: "手机号格式错误",
      //     type: "warning"
      //   });
      //   return false;
      // }
      // else if(this.form.telPhone !=test){
      //   this.$message({
      //     message: "手机号格式错误",
      //     type: "warning"
      //   });
      // }
      console.log(this.form);
      // 2.关闭对话框
      this.dialogFormVisibleAdd = false;
      const res = await this.$http.post(`/doucument/save`, this.form);

      console.log(res);
      if (res.data.code === 0) {
        // 回到第一页展示
        //this.pagenum = 1;
        // 重新请求数据
        this.getUserlist();
        // 提示
        this.$message({
          type: "success",
          message: res.data.msg,
        });
      } else {
        this.$message({
          type: "danger",
          message: "修改失败",
        });
      }
    },
    // 添加用户显示对话框
    showAddUserDia() {
      // 先点编辑 再点添加 打开表单清空表单
      this.form = {};
      this.dialogFormVisibleAdd = true;
    },
    //清空搜索框搜索数据 点击清楚按钮清除数据重新发送请求
    loadUserList() {
      this.getUserlist();
    },
    // 搜索用户 给搜索框绑定query v-model="query"
    async searchUser() {
      const res = await this.$http.get(
        `/car/cylinder-card/findPage?regId=${this.regId}&rows=${this.pageSize}&page=${this.currpage}&carNum=${this.carNum}&gasId=${this.gasId}&isCard=${this.isCard}`
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
      this.pageSize = val;
      // 回到第一页
      this.currpage = 1;
      // 希望当页条数改变时 从第一页开始显示 this.pagenum = 1 -》currPage=1?
      this.searchUser();
    },
    handleCurrentChange(val) {
      //页码改变时
      console.log(`当前页: ${val}`);
      this.currpage = val;
      this.searchUser();
    },
    async getUserlist() {
      //需要授权的API ，必须在请求头中使用Authorization 字段token令牌
      //pagenum当前页面   pagesize每页显示条数
      //接口文档中 除了登录接口之外的所有请求都需要进行授权，设置请求头
      //找axios中关于请求头的代码  写在了http.js中
      // const AUTH_TOKEN = localStorage.getItem("token");
      // this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;
      let access_token = sessionStorage.getItem("access_token");
      let decode = jwtDecode(access_token);
      console.log(decode);
      this.token = decode.authorities;
      const res = await this.$http.get(
        `/car/cylinder-card/findPage?regId=${this.regId}&rows=${this.pageSize}&page=${this.currpage}&carNum=${this.carNum}&gasId=${this.gasId}&isCard=${this.isCard}`
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
    },
  },

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
.input1 {
  width: 200px;
}
</style>
<style>
el-table td,
.el-table th {
  text-align: center !important;
}
.el-table .warning-row {
  background: rgb(250, 249, 249) !important;
}

.el-table .success-row {
  background: rgb(250, 249, 249) !important;
}
[class*="el-col-"] {
  margin-top: 5px;
}
</style>