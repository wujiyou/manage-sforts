<template>
  <div>
    <div style="background:white;width:99.1%;padding-left:15px">
      <my-bread level1="综合查询" level2="移动充装" level3="挂牌车头数据"></my-bread>
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
                placeholder="请输入车头号"
                v-model="beforeCar"
              ></el-input>
            </el-col>

            <el-col style="padding-left:30px" :span="4">
              <el-input
                size="small"
                style=" width: 100%;"
                @clear="loadUserList()"
                clearable
                class="input-serach"
                placeholder="请输入挂牌号"
                v-model="hangCar"
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
      <el-col style="margin-bottom:10px;margin-top:10px" :span="24">
        <el-col :span="20">&nbsp;</el-col>
        <el-col :span="2">
          <el-button style="font-size:13px" type="success" @click="showAddUserDia()" size="small">
            <i style="padding-right:10px" class="el-icon-plus"></i>新增
          </el-button>
        </el-col>
        <el-col :span="2">
          <el-button
            type="danger"
            size="small"
            plain
            icon="el-icon-delete"
            style="font-size:13px"
            @click="showDeleUserMsgBox"
          >删除</el-button>
        </el-col>
      </el-col>

      <!-- 表格 -->
      <template>
        <el-table
          border
          :row-style="{height:'40px'}"
          :cell-style="{padding:'0px'}"
          :data="userlist"
          style="width: 100%;margin:20px 0px;padding-bottom:40px"
          @selection-change="handleCurrentChanges"
        >
        <el-table-column type="selection" width="50"></el-table-column>
          <el-table-column type="index" label="序号" width="50" show-overflow-tooltip>
            <template slot-scope="socpe">
              <p style="cursor:pointer;" @click="showEdituser(socpe.row)">{{socpe.$index+1}}</p>
            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip  prop="beforeCar" label="车头"></el-table-column>
          <el-table-column show-overflow-tooltip prop="hangCar" label="挂牌"></el-table-column>
          <el-table-column sortable show-overflow-tooltip prop="createdTime" label="创建时间">
            <template slot-scope="socpe">{{socpe.row.createdTime | fmtdate}}</template>
          </el-table-column>
          <el-table-column sortable show-overflow-tooltip prop="updatedTime" label="修改时间">
            <template slot-scope="socpe">{{socpe.row.updatedTime | fmtdate}}</template>
          </el-table-column>

          <el-table-column show-overflow-tooltip prop="addName" label="创建人"></el-table-column>
          <!-- <el-table-column show-overflow-tooltip prop="czqjcsj" label="创建时间"></el-table-column> -->
          <!-- <el-table-column show-overflow-tooltip prop="czqjcsj" label="最后更新时间"></el-table-column> -->
          <el-table-column  show-overflow-tooltip prop="info" label="备注">
            
          </el-table-column>
          <!-- 表格操作 -->
          <!-- <el-table-column width="180" label="操作">
            <template slot-scope="scope">
              <el-tooltip
                class="item"
                effect="dark"
                content="查看信息"
                :enterable="false"
                placement="top"
              >
                <el-button
                  type="success"
                  size="mini"
                  title="查看信息"
                  plain
                  icon="el-icon-folder-opened"
                  @click="newUsers(scope.row)"
                  circle
                ></el-button>
              </el-tooltip>
            </template>
          </el-table-column> -->
          <!-- <el-table-column show-overflow-tooltip prop="nextCheckDate" label="最后更新时间"></el-table-column> -->
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

    <el-dialog
        title="新增信息"
        v-dialogDrag
        ref="dialog__wrapper"
        :close-on-click-modal="false"
        :visible.sync="dialogFormVisibleAdd"
        width="60%"
      >
        <el-form  :model="form" :rules="rules" ref="form">
          <el-col :span="24">
            <el-col :span="8">
              <el-form-item label="车头:" class="red_s" label-width="140px" prop="beforeCar" >
                <el-input v-model="form.beforeCar" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="挂牌:" class="red_s" label-width="140px" prop="hangCar">
                <el-input v-model="form.hangCar" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="备注:" class="red_s" label-width="140px" prop="info">
                <el-input v-model="form.info" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>

         
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
          <el-button type="primary" @click="AddUser()">确 定</el-button>
        </div>
      </el-dialog>
     
      <el-dialog
        title="修改信息"
        v-dialogDrag
        ref="dialog__wrapper"
        :close-on-click-modal="false"
        :visible.sync="dialogFormVisibleAadds"
        width="60%"
      >
        <el-form  :model="ersform" :rules="rules" ref="ersform">
          <el-col :span="24">
            <el-col :span="8">
              <el-form-item label="车头:" class="red_s" label-width="140px" prop="beforeCar" >
                <el-input v-model="ersform.beforeCar" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="挂牌:" class="red_s" label-width="140px" prop="hangCar">
                <el-input v-model="ersform.hangCar" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="备注:" class="red_s" label-width="140px" prop="info">
                <el-input v-model="ersform.info" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>

         
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibleAadds = false">取 消</el-button>
          <el-button type="primary" @click="Erhsct()">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 查看对话框 -->
      <el-dialog
        title="查看信息"
        v-dialogDrag
        :close-on-click-modal="false"
        width="80%"
        top="4vh"
        :visible.sync="dialogFormVisibleEdit"
      >
        <el-form :model="editUserForm">
          <p style="text-align: center;">
            <span style="padding:5px 30px">编号：{{this.editUserForm.no}}</span>
            <span style="padding:5px 30px">车牌号码：{{this.editUserForm.carNum}}</span>
            <span style="padding:5px 30px">罐车介质：{{this.editUserForm.czjz}}</span>
          </p>

          <el-col :span="24">
            <h3 style="border-bottom:1px solid #e0dede;padding-bottom:5px;text-align: center;"></h3>
          </el-col>

          <el-col :span="24">
            <h3
              style="border-bottom:2px solid #29b0a3;padding-bottom:5px;text-align: center;"
            >充装前记录扫描</h3>
          </el-col>

          <el-col :span="24" class="wborder">
            <el-col :span="6">
              <p class="ggong">检查时间：</p>
            </el-col>
            <el-col :span="6">
              <p class="ggong">{{this.editUserForm.czqjcsj}}</p>
            </el-col>
            <el-col :span="6">
              <p class="ggong">检查人员：</p>
            </el-col>
            <el-col :span="6">
              <p class="ggong">{{this.editUserForm.czqjcry}}</p>
            </el-col>
          </el-col>

          <el-col class="wborder" :span="24">
            <el-col :span="6">
              <p class="ggong">罐车下次检验日期：</p>
            </el-col>
            <el-col :span="6">
              <p class="ggong">{{this.editUserForm.nextCheckDate}}</p>
            </el-col>
            <el-col :span="6">
              <p class="ggong">特种设备使用证号：</p>
            </el-col>
            <el-col :span="6">
              <p class="ggong">{{ this.editUserForm.regId}}</p>
            </el-col>
          </el-col>
          <el-col class="wborder" :span="24">
            <el-col :span="6">
              <p class="ggong">随车文件资料、使用登记、随车人员证件：</p>
            </el-col>
            <el-col :span="6">
              <p class="ggong">{{this.editUserForm. issczl}}</p>
            </el-col>
            <el-col :span="6">
              <p class="ggong">充装介质与铭牌、使用登记证、标识一致：</p>
            </el-col>
            <el-col :span="6">
              <p class="ggong">{{this.editUserForm.isjzyz}}</p>
            </el-col>
          </el-col>
          <el-col class="wborder" :span="24">
            <el-col :span="6">
              <p class="ggong">铭牌和标识符合规定：</p>
            </el-col>
            <el-col :span="6">
              <p class="ggong">{{this.editUserForm.isjzyz}}</p>
            </el-col>
            <el-col :span="6">
              <p>&nbsp;</p>
            </el-col>
            <el-col :span="6">
              <p></p>
            </el-col>
          </el-col>
          <el-col class="wborder" :span="24">
            <el-col :span="6">
              <p class="ggong">罐体年检报告、安全附件校验报告：</p>
            </el-col>
            <el-col :span="6">
              <p class="ggong">{{this.editUserForm.isgtbg}}</p>
            </el-col>
            <el-col :span="6">
              <p class="ggong">温度、压力、充装量符合要求：</p>
            </el-col>
            <el-col :span="6">
              <p class="ggong">{{this.editUserForm.iswdylczl}}</p>
            </el-col>
          </el-col>
          <el-col class="wborder" :span="24">
            <el-col :span="6">
              <p class="ggong">密封状态完好：</p>
            </el-col>
            <el-col :span="6">
              <p class="ggong">{{this.editUserForm.isczqmfwh}}</p>
            </el-col>
            <el-col :span="6">
              <p class="ggong">随车防护工具、保养维护工具配备齐全：</p>
            </el-col>
            <el-col :span="6">
              <p class="ggong">{{this.editUserForm.isgjqq}}</p>
            </el-col>
          </el-col>
          <el-col class="wborder" :span="24">
            <el-col :span="6">
              <p class="ggong">阻火器、静电完好：</p>
            </el-col>
            <el-col :span="6">
              <p class="ggong">{{this.editUserForm.iszhjdwh}}</p>
            </el-col>
            <el-col :span="6">
              <p class="ggong">罐体和框架连接完好：</p>
            </el-col>
            <el-col :span="6">
              <p class="ggong">{{this.editUserForm.isljwh}}</p>
            </el-col>
          </el-col>
          <el-col class="wborder" :span="24">
            <el-col :span="6">
              <p class="ggong">备注：</p>
            </el-col>
            <el-col :span="6">
              <p class="ggong">{{this.editUserForm.czqremark}}</p>
            </el-col>
            <el-col :span="6">
              <p>&nbsp;</p>
            </el-col>
            <el-col :span="6">
              <p></p>
            </el-col>
          </el-col>

          <el-col :span="24">
            <h3
              style="border-bottom:2px solid #29b0a3;padding-bottom:5px;text-align: center;"
            >充装中检查记录</h3>
          </el-col>

          <el-col class="wborder" :span="24">
            <el-col :span="6">
              <p class="ggong">检查时间：</p>
            </el-col>
            <el-col :span="6">
              <p class="ggong">{{this.editUserForm.czzjcsj}}</p>
            </el-col>
            <el-col :span="6">
              <p class="ggong">检查人员：</p>
            </el-col>
            <el-col :span="6">
              <p class="ggong">{{this.editUserForm.czzjcry}}</p>
            </el-col>
          </el-col>

          <el-col class="wborder" :span="24">
            <el-col :span="6">
              <p class="ggong">充装人员持证上岗：</p>
            </el-col>
            <el-col :span="6">
              <p class="ggong">{{this.editUserForm.isczsg}}</p>
            </el-col>
            <el-col :span="6">
              <p class="ggong">按照规定充装工艺规程进行操作：</p>
            </el-col>
            <el-col :span="6">
              <p class="ggong">{{this.editUserForm.isgdcz}}</p>
            </el-col>
          </el-col>

          <el-col class="wborder" :span="24">
            <el-col :span="6">
              <p class="ggong">安全管理员巡回检查：</p>
            </el-col>
            <el-col :span="6">
              <p class="ggong">{{this.editUserForm.isaqxc}}</p>
            </el-col>
            <el-col :span="6">
              <p class="ggong">指定位置停车、熄火、断电、制动：</p>
            </el-col>
            <el-col :span="6">
              <p class="ggong">{{this.editUserForm.iszdwzcz}}</p>
            </el-col>
          </el-col>
          <el-col class="wborder" :span="24">
            <el-col :span="6">
              <p class="ggong">导静电装置可靠来连接：</p>
            </el-col>
            <el-col :span="6">
              <p class="ggong">{{this.editUserForm.isdjd}}</p>
            </el-col>
            <el-col :span="6">
              <p class="ggong">不得使用随车携带的充装用管：</p>
            </el-col>
            <el-col :span="6">
              <p class="ggong">{{this.editUserForm.isnoczyg}}</p>
            </el-col>
          </el-col>
          <el-col class="wborder" :span="24">
            <el-col :span="6">
              <p class="ggong">快装接头可靠连接：</p>
            </el-col>
            <el-col :span="6">
              <p class="ggong">{{this.editUserForm.iskzjt}}</p>
            </el-col>
            <el-col :span="6">
              <p class="ggong">充装人员在规定工作岗位：</p>
            </el-col>
            <el-col :span="6">
              <p class="ggong">{{this.editUserForm.isczrysg}}</p>
            </el-col>
          </el-col>
          <el-col class="wborder" :span="24">
            <el-col :span="6">
              <p class="ggong">压力、温度和柳宿符合技术标准：</p>
            </el-col>
            <el-col :span="6">
              <p class="ggong">{{this.editUserForm.iscsfhbz}}</p>
            </el-col>
            <el-col :span="6">
              <p class="ggong">紧急切断阀处于完好工作态度：</p>
            </el-col>
            <el-col :span="6">
              <p class="ggong">{{this.editUserForm.isjjqdfok}}</p>
            </el-col>
          </el-col>
          <el-col class="wborder" :span="24">
            <el-col :span="6">
              <p class="ggong">符合最大充装量需求、无错装、超装：</p>
            </el-col>
            <el-col :span="6">
              <p class="ggong">{{this.editUserForm.isinczyq}}</p>
            </el-col>
            <el-col :span="6">
              <p class="ggong">充装鹤位号：</p>
            </el-col>
            <el-col :span="6">
              <p class="ggong">{{this.editUserForm.czhwno}}</p>
            </el-col>
          </el-col>
          <el-col class="wborder" :span="24">
            <el-col :span="6">
              <p class="ggong">备注：</p>
            </el-col>
            <el-col :span="6">
              <p class="ggong">{{this.editUserForm.czzremark}}</p>
            </el-col>
            <el-col :span="6">
              <p class="ggong">&nbsp;</p>
            </el-col>
            <el-col :span="6">
              <p class="ggong"></p>
            </el-col>
          </el-col>

          <el-col :span="24">
            <h3
              style="border-bottom:2px solid #29b0a3;padding-bottom:5px; text-align: center;"
            >充装后的复查</h3>
          </el-col>

          <el-col class="wborder" :span="24">
            <el-col :span="6">
              <p class="ggong">检查时间：</p>
            </el-col>
            <el-col :span="6">
              <p class="ggong">{{this.editUserForm.czhjcsj}}</p>
            </el-col>
            <el-col :span="6">
              <p class="ggong">检查人员：</p>
            </el-col>
            <el-col :span="6">
              <p class="ggong">{{this.editUserForm.czhjcry}}</p>
            </el-col>
          </el-col>

          <el-col class="wborder" :span="24">
            <el-col :span="6">
              <p class="ggong">操作阀门置于闭止状态：</p>
            </el-col>
            <el-col :span="6">
              <p class="ggong">{{this.editUserForm.isczfmok}}</p>
            </el-col>
            <el-col :span="6">
              <p class="ggong">密封状态完好：</p>
            </el-col>
            <el-col :span="6">
              <p class="ggong"> {{this.editUserForm.czhyl}}</p>
            </el-col>
          </el-col>

          <el-col class="wborder" :span="24">
            <el-col :span="6">
              <p class="ggong">安全附件、充装附件完好：</p>
            </el-col>
            <el-col :span="6">
              <p class="ggong">{{this.editUserForm.isaqfjwh}}</p>
            </el-col>
            <el-col :span="6">
              <p class="ggong">长馆拖车/管束式集装箱与加气柱分离：</p>
            </el-col>
            <el-col :span="6">
              <p class="ggong">{{this.editUserForm.isfl}}</p>
            </el-col>
          </el-col>
          <el-col class="wborder" :span="24">
            <el-col :span="6">
              <p class="ggong">压力(Mpa)：</p>
            </el-col>
            <el-col :span="6">
              <p class="ggong">{{this.editUserForm.czhyl}}</p>
            </el-col>
            <el-col :span="6">
              <p class="ggong">温度(摄氏度)：</p>
            </el-col>
            <el-col :span="6">
              <p class="ggong">{{this.editUserForm.czhwd}}℃</p>
            </el-col>
          </el-col>
          <el-col class="wborder" :span="24">
            <el-col :span="6">
              <p class="ggong">充装量：</p>
            </el-col>
            <el-col :span="6">
              <p class="ggong">{{this.editUserForm.czl}}</p>
            </el-col>
            <el-col :span="6">
              <p class="ggong">备注：</p>
            </el-col>
            <el-col :span="6">
              <p>{{this.editUserForm.czhremark}}</p>
            </el-col>
          </el-col>
        </el-form>
        <p style="text-align:center;" slot="footer" class="dialog-footer">
          <el-button style="margin-top:10px !important" @click="close()">取 消</el-button>
          <el-button type="primary" @click="downtemplatee()">下 载</el-button>
        </p>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
export default {
  name: "trace",
  data() {
    return {
      no: "",
      regId: "",
      beforeCar:"",
      hangCar:"",
      multipleSelection: [], //批量删除数据
      delarr: [], //批量删除id
      form:{
         beforeCar:"",
         hangCar:"",
         info:"",
      },
      ersform:{
        beforeCar:"",
         hangCar:"",
         info:"",
      },
      rules: {
        beforeCar: [{ required: true, message: "车头不能为空", trigger: "blur" }],
        hangCar: [{ required: true, message: "挂牌不能为空", trigger: "blur" }],
        info: [{ required: true, message: "备注不能为空", trigger: "blur" }],
      },
      // createTime: "",
      // createTime2: "",
      userlist: [],
      //分页相关数据
      total: -1,
      currPage: 1,
      idss: "",
      page: 1,
      pageSize: 10,
      dialogFormVisibleEdit: false,
      dialogFormVisibleAdd:false,
      dialogFormVisibleAadds:false,
      editUserForm: {
        regId: "", //档案号
        carNum: "", //车牌号
        no: "", //编号
        czqjcsj: "", //充装前检查时间
        czqjcry: "", //充装前检查人员
        czjz: "", //充装介质
        seno: "",
        nextCheckDate: "", //下检日期
        issczl: "", //随车资料，登记证，人员
        isjzyz: "", //充装介质一致
        ismpfh: "", //铭牌标识
        isgtbg: "", // 罐体报告
        iswdylczl: "", //温度压力充装量符合
        isczqmfwh: "", //充装密封完好
        isgjqq: "", //防护，维护工具齐全
        iszhjdwh: "", //阻火静电完好
        isljwh: "", //罐体框架连接完好
        czqremark: "", //充装前备注
        czzjcsj: "", //充装中检查时间
        czzjcry: "", //充装中检查人员
        isczsg: "", //充装人员持证上岗
        isgdcz: "", //按照规定操作
        isaqxc: "", //安全管理人员巡回检查
        iszdwzcz: "", //指定位置操作
        isdjd: "", //导静电装置可靠连接
        isnoczyg: "", //不得使用随车携带的充装用管
        iskzjt: "", //快装接头可靠连接
        isczrysg: "", //充装人员在规定岗位
        isjjqdfok: "", //紧急切断阀处于完好工作状态
        iscsfhbz: "", //压力温度柳宿符合标准
        isinczyq: "", //充装要求
        czhwno: "", //充装鹤位号
        czzremark: "", //充装中备注
        czhjcsj: "", //充装后检查时间
        czhjcry: "", //充装后检查人员
        isczfmok: "", //操作阀门闭止状态
        czhyl: "", //充装后压力
        czhwd: "", //充装后温度
        czl: "", //充装量
        isczhmfwh: "", //充装后密封完好
        isaqfjwh: "", //安全附件，充装附件完好
        isfl: "", //长管拖车与加气柱分离
        czhremark: "", //充装后备注
      },
      // dialogFormVisibleRoleshow: false,
     
    };
  },
  watch: {
    dialogFormVisibleAdd: function (val, oldVla) {
      this.$refs["form"].resetFields();
    },
    dialogFormVisibleAadds: function (val, oldVla) {
      this.$refs["ersform"].resetFields();
    },
  },
  methods: {
    showEdituser(user){
       this.dialogFormVisibleAadds=true;
       this.ersform=user;
    },
    Erhsct(){
      this.$refs.ersform.validate(async (valid) => {
        if (valid) {
          const res = await this.$http.post(`mobile-data`, this.ersform);
          console.log(res);
          if(res.data.code==0){
            this.$message({
            type: "success",
            message: res.data.msg,
          });
          this.dialogFormVisibleAadds = false;
          this.getUserlist();
          }else{
            this.$message({
            type: "error",
            message: res.data.msg,
          });
          this.dialogFormVisibleAadds = false;
          this.getUserlist();
          }
        }else {
          this.$message({
            type: "error",
            message: "请填写内容再试",
          });
          this.dialogFormVisibleAadds = true;
        }
      });
    },
    async AddUser() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          const res = await this.$http.put(`mobile-data`, this.form);
          console.log(res);
          console.log(res.data.code);
          if(res.data.code==0){
            this.$message({
            type: "success",
            message: res.data.msg,
          });
          this.dialogFormVisibleAdd = false;
          this.getUserlist();
          }else{
            this.$message({
            type: "error",
            message: res.data.msg,
          });
          this.dialogFormVisibleAdd = false;
          this.getUserlist();
          }
        }else {
          this.$message({
            type: "error",
            message: "请填写内容再试",
          });
          this.dialogFormVisibleAdd = true;
        }
      });
    },
    handleCurrentChanges(val) {
      let arr = [];
      console.log(val);
      this.multipleSelection = val;
      console.log(this.multipleSelection);
    },
    showDeleUserMsgBox() {
      for (let i = 0; i <= this.multipleSelection.length - 1; i++) {
        this.delarr.push(this.multipleSelection[i].id);
         console.log(this.multipleSelection[i].id);
      }
     
      if (this.delarr == "") {
        this.$message({
          type: "error",
          message: "请选择需要删除的数据",
        });
      } else {
        this.$confirm("是否删除这条气瓶信息?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(async () => {
            // 注意async的位置，最近的位置
            // 发送删除请求:id:用户id
            // 1.data中找userId
            // 2.把userID以showDeleUserMsgBox参数形式传进来
            console.log(this.delarr);
            const res = await this.$http.post(`mobile-data/delete`, this.delarr);
            console.log(res);
            this.delarr = [];
            // 提示
            if (res.data.code == 0) {
              this.$message({
                type: "success",
                message: res.data.msg,
              });
              this.getUserlist();
            } else {
              this.$message({
                type: "warning",
                message: res.data.msg,
              });
            }
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
            this.delarr = [];
          });
      }
    },

    showAddUserDia(){
      this.dialogFormVisibleAdd=true;
    },
    close() {
      this.dialogFormVisibleEdit = false;
    },
    //   dateFormat: function(row, column) {
    //   var date = this.editUserForm.nextCheckDate;
    //   if (date === null) {
    //     return "0:0:0";
    //   }
    //   var moment = require("moment");
    //   return moment(date).format("YYYY-MM-DD hh:mm");
    //   //HH:mm:ss
    // },
    // 充装记录查看详情
    newUsers(user) {
      console.log(user);
      this.idss = user.id;
      this.dialogFormVisibleEdit = true;
      this.editUserForm.no = user.no;
      this.editUserForm.carNum = user.carNum;
      this.editUserForm.czjz = user.czjz;
      this.editUserForm.czqjcsj = user.czqjcsj;
      this.editUserForm.czqjcry = user.czqjcry;

      var dat = new Date(user.nextCheckDate)
        .toLocaleDateString()
        .replace(/\//g, "-");
      this.editUserForm.nextCheckDate = dat;

      /*重载方法*/
      // Date.prototype.toLocaleString = function () {
      //   return (
      //     this.getFullYear() +
      //     "/" +
      //     (this.getMonth() + 1) +
      //     "/" +
      //     this.getDate() +
      //     "/ " +
      //     this.getHours() +
      //     ":" +
      //     this.getMinutes() +
      //     ":" +
      //     this.getSeconds()
      //   );
      // };
      // commonTime = date.toLocaleString();
      // console.log(commonTime);
      // var ess=jutils.formatDate(new Date(data),"YYYY-MM-DD HH:ii:ss");
      // console.log(ess);

      this.editUserForm.regId = user.regId;
      this.editUserForm.issczl = user.issczl;
      this.editUserForm.isjzyz = user.isjzyz;
      this.editUserForm.ismpfh = user.ismpfh;
      this.editUserForm.isgtbg = user.isgtbg;
      this.editUserForm.iswdylczl = user.iswdylczl;
      this.editUserForm.isczqmfwh = user.isczqmfwh;
      this.editUserForm.isgjqq = user.isgjqq;
      this.editUserForm.iszhjdwh = user.iszhjdwh;
      this.editUserForm.isljwh = user.isljwh;
      this.editUserForm.czqremark = user.czqremark;
      this.editUserForm.czzjcsj = user.czzjcsj;
      this.editUserForm.czzjcry = user.czzjcry;
      this.editUserForm.isczsg = user.isczsg;
      this.editUserForm.isgdcz = user.isgdcz;
      this.editUserForm.isaqxc = user.isaqxc;
      this.editUserForm.iszdwzcz = user.iszdwzcz;
      this.editUserForm.isdjd = user.isdjd;
      this.editUserForm.isnoczyg = user.isnoczyg;
      this.editUserForm.iskzjt = user.iskzjt;
      this.editUserForm.isczrysg = user.isczrysg;
      this.editUserForm.isjjqdfok = user.isjjqdfok;
      this.editUserForm.iscsfhbz = user.iscsfhbz;
      this.editUserForm.isinczyq = user.isinczyq;
      this.editUserForm.czhwno = user.czhwno;
      this.editUserForm.czzremark = user.czzremark;
      this.editUserForm.czhjcsj = user.czhjcsj;
      this.editUserForm.czhjcry = user.czhjcry;
      this.editUserForm.isczfmok = user.isczfmok;
      this.editUserForm.czhyl = user.czhyl;
      this.editUserForm.czhwd = user.czhwd;
      this.editUserForm.isaqfjwh = user.isaqfjwh;
      this.editUserForm.isfl = user.isfl;
      this.editUserForm.czhremark = user.czhremark;
      this.editUserForm.czl = user.czl;
      this.editUserForm.czhyl = user.czhyl;
    },
    //清空搜索框搜索数据 点击清楚按钮清除数据重新发送请求
    loadUserList() {
      this.getUserlist();
    },
    // 搜索用户 给搜索框绑定query v-model="query"
    async searchUser() {
      const res = await this.$http.get(
        `mobile-data?pageSize=${this.pageSize}&currPage=${this.currPage}&beforeCar=${this.beforeCar}&hangCar=${this.hangCar}`
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
      // http://localhost:8081/public/gas/CylinderFilling/CylinderFillingPaging?pageSize=2&currPage=2&gunId=01&gasId=1588923670165&createTime=2020-05-10 10:44:22&createTime2=2020-05-11 10:44:22
      const res = await this.$http.get(
        `mobile-data?pageSize=${this.pageSize}&currPage=${this.currPage}&beforeCar=${this.beforeCar}&hangCar=${this.hangCar}`
      );
      // &name=${this.name}
      console.log(res);
      this.userlist = res.data.data.list;
      console.log(this.userlist);
      this.total = res.data.data.totalCount;
    },
  },
  created() {
    this.getUserlist();
  },
};
</script>
<style scoped>
.arrow_right {
  padding: 10px 0px;
  margin-bottom: 10px;
}
.wborder {
  border: 1px solid #e0dede;
}
.ggong {
  text-align: left;
  padding-left: 20px;
  line-height: 40px;
  /* border-right-width: 1px solid #e0dede; */
  border-right: 1px solid #e0dede;
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
.red_s label {
  color: #f00 !important;
}
</style>