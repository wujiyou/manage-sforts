<template>
  <div>
    <div style="background:white;width:99.1%;padding-left:15px">
      <my-bread level1="气瓶登记" level2="档案新增" level3="液化气瓶"></my-bread>
    </div>
    <el-card class="box-card" style="margin:20px 20px 0 20px;">
      <!--搜索  -->
      <el-row>
        <el-col :span="24">
          <h5 style="border-bottom:1px solid #ece8e8;padding-bottom:15px;padding-left:15px">查询单位</h5>
        </el-col>

        <el-col style="padding-left:15px;" :span="22">
          <el-col :span="4">
            <el-select
              size="small"
              style=" width: 80%;"
              @clear="loadUserList()"
              clearable
              v-model="sheng"
              placeholder="请选择行政区划"
            >
              <el-option v-for="item in division" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-col>

          <el-col :span="4">
            <el-input
              @clear="loadUserList()"
              clearable
              class="input-serach"
              placeholder="请输入登记机关"
              v-model="certification"
              size="small"
              style="width:100%"
            ></el-input>
          </el-col>

          <el-col style="padding-left:30px" :span="4">
            <el-input
              @clear="loadUserList()"
              clearable
              class="input-serach"
              placeholder="请输入登记证号"
              v-model="regId"
              size="small"
              style="width:100%"
            ></el-input>
          </el-col>

          <el-col style="padding-left:30px" :span="4">
            <el-input
              @clear="loadUserList()"
              clearable
              class="input-serach"
              placeholder="请输入使用单位"
              v-model="unitName"
              size="small"
              style="width:100%"
            ></el-input>
          </el-col>
          <el-col style="padding-left:30px" :span="4">
            <el-button
              @click="searchUser()"
              class="el_button"
              size="small"
              style="width:100%"
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
          :data="userlist"
          style="width: 100%;margin:20px 0px;padding-bottom:40px"
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
          <el-table-column prop="regId" label="登记证号" show-overflow-tooltip></el-table-column>
          <el-table-column prop="country" label="行政区划" show-overflow-tooltip></el-table-column>
          <el-table-column prop="num" label="气瓶数量" show-overflow-tooltip></el-table-column>
          <el-table-column prop="checkName" label="监督检验检测机构" show-overflow-tooltip></el-table-column>
          <el-table-column prop="useName" label="使用单位" show-overflow-tooltip></el-table-column>

          <el-table-column prop="certification" label="登记机关" show-overflow-tooltip></el-table-column>
          <el-table-column prop="cretificationDate" label="发证日期" show-overflow-tooltip>
            <template slot-scope="socpe">{{socpe.row.cretificationDate | fmtdate}}</template>
          </el-table-column>
          <!-- 表格操作 -->
          <el-table-column prop="address" fixed="right" width="180" label="操 作">
            <template slot-scope="scope">
              <el-tooltip
                class="item"
                effect="dark"
                content="登记证预览打印下载"
                :enterable="false"
                placement="top"
              >
                <el-button
                  type="success"
                  size="mini"
                  title="登记证打印"
                  plain
                  icon="el-icon-folder"
                  @click="registrationAddUserDia(scope.row)"
                  circle
                ></el-button>
              </el-tooltip>
              <el-tooltip
                class="item"
                effect="dark"
                content="登记表预览打印下载"
                :enterable="false"
                placement="top"
              >
                <el-button
                  type="success"
                  size="mini"
                  title="登记表预览打印下载"
                  plain
                  icon="el-icon-document"
                  @click="agricultural(scope.row)"
                  circle
                ></el-button>
              </el-tooltip>
              <el-tooltip
                class="item"
                effect="dark"
                content="气瓶信息批量下载"
                :enterable="false"
                placement="top"
              >
                <el-button
                  type="success"
                  size="mini"
                  title="气瓶信息批量下载"
                  plain
                  icon="el-icon-download"
                  @click="downtemplatee(scope.row)"
                  circle
                ></el-button>
              </el-tooltip>

              <!-- size 调整按钮大小 -->

              <!-- 查看信息 -->
              <el-tooltip
                class="item"
                effect="dark"
                content="查看信息"
                :enterable="false"
                placement="top"
              >
                <el-button
                  type="info"
                  icon="el-icon-message"
                  size="mini"
                  title="查看"
                  plain
                  @click="lookEdituser(scope.row)"
                  circle
                ></el-button>
              </el-tooltip>
              <!-- 编辑 -->

              <!-- <el-tooltip
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
              </el-tooltip>-->
              <!-- 删除 -->

              <!-- <el-tooltip
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
              
              </el-tooltip>-->
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
        :current-page="currpage"
        :page-sizes="[10,15,20,25,30]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>

      <!-- 对话框 -->
      <!-- 添加对话框 -->
      <el-dialog title="添加信息" top="2vh" :visible.sync="dialogFormVisibleAdd">
        <el-form :model="form" :rules="rules" ref="form">
          <el-col :span="24">
            <el-col :span="6">
              <el-form-item class="red_s" label="登记类别:" label-width="100px" prop="regType">
                <el-select style=" width: 100%" v-model="form.regType" :validate-event="false">
                  <el-option
                    v-for="item in selects3"
                    :key="item.id"
                    :label="item.orders"
                    :value="item.orders"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item class="red_s" prop="sheng" label-width="100px" label="行政省份:">
                <el-select
                  style=" width: 100%;"
                  @clear="loadUserList()"
                  clearable
                  v-model="form.sheng"
                  @change="function2(form.sheng)"
                  @input="searchUser()"
                  placeholder="请选择省份"
                  :disabled="showCmd"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.id"
                    :label="item.name"
                    :value="item.code"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item class="red_s" prop="city" label-width="100px" label="市级区域:">
                <el-select
                  style=" width: 100%;"
                  @clear="loadUserList()"
                  clearable
                  v-model="form.city"
                  :disabled="showCmd_1"
                  @input="searchUser()"
                  @change="function1(form.city)"
                  placeholder="请选择城市"
                >
                  <el-option
                    v-for="item in level"
                    :key="item.id"
                    :label="item.name"
                    :value="item.code"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item class="red_s" prop="country" label-width="100px" label="区级:">
                <el-select
                  style=" width: 100%;"
                  @clear="loadUserList()"
                  :disabled="showCmds"
                  clearable
                  v-model="form.country"
                  @input="searchUser()"
                  placeholder="请选择区域"
                >
                  <el-option
                    v-for="item in levels"
                    :key="item.id"
                    :label="item.name"
                    :value="item.name"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-col>

          <h3 style="border-bottom:1px solid #ece8e8;padding-bottom:5px">设备基本情况</h3>
          <el-col :span="24">
            <el-col :span="11">
              <!-- <el-form-item hidden label="档案号:" label-width="140px" prop="regId">
                <el-input v-model="form.regId" autocomplete="off"></el-input>
              </el-form-item>-->
              <el-form-item class="red_s" label="设备品种:" label-width="140px" prop="equipmentCode">
                <el-cascader
                  v-model="form.equipmentCode"
                  style=" width: 100%"
                  :options="optionsa"
                  :show-all-levels="false"
                ></el-cascader>
              </el-form-item>
              <!-- <el-form-item class="red_s" label="设备类型:" label-width="140px" prop="equipmentCode">
                <el-select
                  style=" width: 100%"
                  v-model="form.equipmentCode"
                  :validate-event="false"
                >
                  <el-option
                    v-for="item in selects1"
                    :key="item.id"
                    :label="item.orders"
                    :value="item.orders"
                  ></el-option>
                </el-select>
              </el-form-item>-->
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="11">
              <el-form-item class="red_s" label="产品名称:" label-width="140px" prop="productName">
                <el-select
                  disabled
                  style=" width: 100%"
                  v-model="form.productName"
                  :validate-event="false"
                >
                  <el-option
                    v-for="item in selects5"
                    :key="item.id"
                    :label="item.orders"
                    :value="item.orders"
                  ></el-option>
                </el-select>
                <!-- {{id}} -->
                <!-- <el-select
                  v-model="editUserForm.zoneId"
                  @change="function2(editUserForm.sheng)"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.id"
                    :label="item.name"
                    :value="item.name"
                  ></el-option>
                </el-select>-->
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="11">
              <el-form-item class="red_s" label="监督检验机构名称:" label-width="140px" prop="checkName">
                <el-select
                  style=" width: 100%;"
                  @clear="loadUserList()"
                  clearable
                  v-model="form.checkName"
                  placeholder="请选择监督检验机构"
                >
                  <el-option
                    v-for="item in optionsuse"
                    :key="item.inspectId"
                    :label="item.inspectName"
                    :value="item.inspectName"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-button style="font-size:13px" type="success" @click="tiaozhuan()">添加单位</el-button>
            </el-col>
            <el-col :span="11"></el-col>
          </el-col>

          <h3 style="border-bottom:1px solid #ece8e8;padding-bottom:5px">设备使用情况</h3>

          <el-col :span="24">
            <el-col :span="11">
              <el-form-item class="red_s" label="使用单位名称:" label-width="140px" prop="useName">
                <el-select
                  style=" width: 100%;"
                  clearable
                  filterable
                  v-model="form.useName"
                  @input="a"
                  placeholder="请选择单位名称"
                >
                  <el-option
                    v-for="(item , i) in selects6"
                    :key="i"
                    :label="item.name"
                    :value="item.name"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-button style="font-size:13px" type="success" @click="shiyong()">添加单位</el-button>
            </el-col>
            <el-col :span="11">
              <el-form-item class="red_s" label="使用单位地址:" label-width="140px" prop="address">
                <el-input v-model="form.address" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="11">
              <el-form-item label="统一社会信用代码:" label-width="140px" prop="code">
                <el-input v-model="form.code" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="11">
              <el-form-item label="邮政编码:" label-width="140px" prop="postalCode">
                <el-input v-model="form.postalCode" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="11">
              <el-form-item class="red_s" label="投入使用日期:" label-width="140px" prop="initData">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="form.initData"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="11">
              <el-form-item class="red_s" label="单位固定电话:" label-width="140px" prop="mobilePhone">
                <el-input v-model="form.mobilePhone" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="11">
              <el-form-item class="red_s" label="安全管理员:" label-width="140px" prop="useSafe">
                <el-input v-model="form.useSafe" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="11">
              <el-form-item class="red_s" label="移动电话:" label-width="140px" prop="telPhone">
                <el-input v-model="form.telPhone" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>

          <h3 style="border-bottom:1px solid #ece8e8;padding-bottom:5px">登记信息</h3>
          <el-col :span="24">
            <el-col :span="11">
              <el-form-item class="red_s" label="登记机关:" label-width="140px" prop="certification">
                <el-input v-model="form.certification" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="11">
              <el-form-item
                class="red_s"
                label="登记人员:"
                label-width="140px"
                prop="certificationPerson"
              >
                <el-input v-model="form.certificationPerson" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="10">
              <el-form-item
                class="red_s"
                label="登记证编号:"
                style="margin-left:10px"
                label-width="140px"
                prop="regId"
              >
                <el-input v-model="form.regId" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-button
                style="margin-left:5px;margin-right:5px"
                @click="Registration()"
                type="primary"
              >生成登记证号</el-button>
            </el-col>
            <el-col :span="10">
              <el-form-item
                class="red_s"
                label="发证日期:"
                label-width="140px"
                prop="cretificationDate"
              >
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="form.cretificationDate"
                  style="width: 100%;"
                ></el-date-picker>
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
      <el-dialog title="修改信息" :visible.sync="dialogFormVisibleEdit">
        <el-form :model="editUserForm" :rules="rules" ref="editUserForm">
          <el-col :span="24">
            <el-col :span="6">
              <el-form-item label="登记类别:" label-width="140px" prop="regType">
                <el-select
                  style=" width: 100%"
                  v-model="editUserForm.regType"
                  :validate-event="false"
                >
                  <el-option
                    v-for="item in selects3"
                    :key="item.id"
                    :label="item.orders"
                    :value="item.orders"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label-width="140px" label="行政省份:">
                <el-select
                  style=" width: 100%;"
                  @clear="loadUserList()"
                  clearable
                  v-model="editUserForm.sheng"
                  @change="function2(editUserForm.sheng)"
                  @input="searchUser()"
                  placeholder="请选择省份"
                  :disabled="showCmd"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.id"
                    :label="item.name"
                    :value="item.code"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="cityId" label-width="140px" label="市级区域:">
                <el-select
                  style=" width: 100%;"
                  @clear="loadUserList()"
                  clearable
                  v-model="editUserForm.city"
                  @input="searchUser()"
                  @change="function1(editUserForm.city)"
                  placeholder="请选择城市"
                  :disabled="showCmd_1"
                >
                  <el-option
                    v-for="item in level"
                    :key="item.id"
                    :label="item.name"
                    :value="item.code"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="country" label-width="140px" label="区级:">
                <el-select
                  style=" width: 100%;"
                  @clear="loadUserList()"
                  clearable
                  v-model="editUserForm.country"
                  @input="searchUser()"
                  placeholder="请选择区域"
                  :disabled="showCmds"
                >
                  <el-option
                    v-for="item in levels"
                    :key="item.id"
                    :label="item.name"
                    :value="item.name"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-col>

          <h3 style="border-bottom:1px solid #ece8e8;padding-bottom:5px">设备基本情况</h3>
          <el-col :span="24">
            <el-col :span="11">
              <!-- <el-form-item hidden label="档案号:" label-width="140px" prop="regId">
                <el-input v-model="form.regId" autocomplete="off"></el-input>
              </el-form-item>-->
              <el-form-item label="设备类型:" label-width="140px" prop="equipmentCode">
                <el-select
                  disabled
                  style=" width: 100%"
                  v-model="editUserForm.equipmentCode"
                  :validate-event="false"
                >
                  <el-option
                    v-for="item in selects1"
                    :key="item.id"
                    :label="item.orders"
                    :value="item.orders"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="11">
              <el-form-item label="产品名称:" label-width="140px" prop="productName">
                <el-select
                  disabled
                  style=" width: 100%"
                  v-model="editUserForm.productName"
                  :validate-event="false"
                >
                  <el-option
                    v-for="item in selects5"
                    :key="item.id"
                    :label="item.orders"
                    :value="item.orders"
                  ></el-option>
                </el-select>
                <!-- {{id}} -->
                <!-- <el-select
                  v-model="editUserForm.zoneId"
                  @change="function2(editUserForm.sheng)"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.id"
                    :label="item.name"
                    :value="item.name"
                  ></el-option>
                </el-select>-->
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="11">
              <el-form-item label="监督检验机构名称:" label-width="140px" prop="checkName">
                <el-input v-model="editUserForm.checkName" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="11"></el-col>
          </el-col>

          <h3 style="border-bottom:1px solid #ece8e8;padding-bottom:5px">设备使用情况</h3>

          <el-col :span="24">
            <el-col :span="11">
              <el-form-item label="使用单位名称:" label-width="140px" prop="useName">
                <el-select
                  style=" width: 100%;"
                  clearable
                  filterable
                  v-model="editUserForm.useName"
                  @input="aa"
                  placeholder="请选择单位名称"
                >
                  <el-option
                    v-for="(item , i) in selects6"
                    :key="i"
                    :label="item.name"
                    :value="item.name"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="11">
              <el-form-item label="使用单位地址:" label-width="140px" prop="address">
                <el-input v-model="editUserForm.address" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="11">
              <el-form-item label="使用单位统一社会信用代码:" label-width="140px" prop="code">
                <el-input v-model="editUserForm.code" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="11">
              <el-form-item label="邮政编码:" label-width="140px" prop="postalCode">
                <el-input v-model="editUserForm.postalCode" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="11">
              <el-form-item label="投入使用日期:" label-width="140px" prop="initData">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="editUserForm.initData"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="11">
              <el-form-item label="单位固定电话:" label-width="140px" prop="mobilePhone">
                <el-input v-model="editUserForm.mobilePhone" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="11">
              <el-form-item label="安全管理员:" label-width="140px" prop="useSafe">
                <el-input v-model="editUserForm.useSafe" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="11">
              <el-form-item label="移动电话:" label-width="140px" prop="telPhone">
                <el-input v-model="editUserForm.telPhone" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>

          <h3 style="border-bottom:1px solid #ece8e8;padding-bottom:5px">登记信息</h3>
          <el-col :span="24">
            <el-col :span="11">
              <el-form-item label="登记机关:" label-width="140px" prop="certification">
                <el-input v-model="editUserForm.certification" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="11">
              <el-form-item label="登记人员:" label-width="140px" prop="certificationPerson">
                <el-input v-model="editUserForm.certificationPerson" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="11">
              <el-form-item label="登记证编号:" label-width="140px" prop="regId">
                <el-input disabled v-model="editUserForm.regId" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="11">
              <el-form-item label="发证日期:" label-width="140px" prop="cretificationDate">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="editUserForm.cretificationDate"
                  style="width: 100%;"
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

      <!-- 查看信息 -->
      <el-dialog title="查看信息" :visible.sync="dialogTableVisible"></el-dialog>
      <!-- pdf查看 -->
      <el-dialog :visible.sync="pdfindex">
        <div class="indexs">
          <p class="imgs">
            <img :src="this.url" alt />
          </p>
        </div>
        <div class="indexs">
          <p class="imgs">
            <img :src="this.urls" alt />
          </p>
        </div>
      </el-dialog>
      <!-- 登记证打印下载 -->
      <el-dialog top="3vh" title="登记证预览下载" :visible.sync="dengdialogFormVisible">
        <el-form :model="dengform" :rules="rules">
          <el-col :span="24">
            <el-col :span="6">
              <el-form-item class="red_s" label="登记类别:" label-width="100px" prop="regType">
                <el-select style=" width: 100%" v-model="dengform.regType" :validate-event="false">
                  <el-option
                    v-for="item in selects3"
                    :key="item.id"
                    :label="item.orders"
                    :value="item.orders"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item class="red_s" label-width="100px" label="行政省份:">
                <el-select
                  style=" width: 100%;"
                  @clear="loadUserList()"
                  clearable
                  v-model="dengform.sheng"
                  @change="function2(dengform.sheng)"
                  @input="searchUser()"
                  placeholder="请选择省份"
                  :disabled="showCmd"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.id"
                    :label="item.name"
                    :value="item.name"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item class="red_s" prop="cityId" label-width="100px" label="市级区域:">
                <el-select
                  style=" width: 100%;"
                  @clear="loadUserList()"
                  clearable
                  v-model="dengform.city"
                  @input="searchUser()"
                  @change="function1(dengform.city)"
                  placeholder="请选择城市"
                  :disabled="showCmd_1"
                >
                  <el-option
                    v-for="item in level"
                    :key="item.id"
                    :label="item.name"
                    :value="item.code"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item class="red_s" prop="country" label-width="100px" label="区级:">
                <el-select
                  style=" width: 100%;"
                  @clear="loadUserList()"
                  clearable
                  v-model="dengform.country"
                  @input="searchUser()"
                  placeholder="请选择区域"
                  :disabled="showCmds"
                >
                  <el-option
                    v-for="item in levels"
                    :key="item.id"
                    :label="item.name"
                    :value="item.name"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-col>

          <h3 style="border-bottom:1px solid #ece8e8;padding-bottom:5px">设备基本情况</h3>
          <el-col :span="24">
            <el-col :span="11">
              <!-- <el-form-item hidden label="档案号:" label-width="140px" prop="regId">
                <el-input v-model="form.regId" autocomplete="off"></el-input>
              </el-form-item>-->
              <el-form-item class="red_s" label="设备品种:" label-width="140px" prop="equipmentCode">
                <el-cascader
                  v-model="dengform.equipmentCode"
                  style=" width: 100%"
                  :options="optionsa"
                  :show-all-levels="false"
                ></el-cascader>
              </el-form-item>
              <!-- <el-form-item class="red_s" label="设备类型:" label-width="140px" prop="equipmentCode">
                <el-select
                  style=" width: 100%"
                  v-model="dengform.equipmentCode"
                  :validate-event="false"
                >
                  <el-option
                    v-for="item in selects1"
                    :key="item.id"
                    :label="item.orders"
                    :value="item.orders"
                  ></el-option>
                </el-select>
              </el-form-item>-->
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="11">
              <el-form-item class="red_s" label="产品名称:" label-width="140px" prop="productName">
                <el-select
                  style=" width: 100%"
                  v-model="dengform.productName"
                  :validate-event="false"
                >
                  <el-option
                    v-for="item in selects5"
                    :key="item.id"
                    :label="item.orders"
                    :value="item.orders"
                  ></el-option>
                </el-select>
                <!-- {{id}} -->
                <!-- <el-select
                  v-model="editUserForm.zoneId"
                  @change="function2(editUserForm.sheng)"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.id"
                    :label="item.name"
                    :value="item.name"
                  ></el-option>
                </el-select>-->
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="11">
              <el-form-item class="red_s" label="监督检验机构名称:" label-width="140px" prop="checkName">
                <el-input v-model="dengform.checkName" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="11"></el-col>
          </el-col>

          <h3 style="border-bottom:1px solid #ece8e8;padding-bottom:5px">设备使用情况</h3>

          <el-col :span="24">
            <el-col :span="11">
              <el-form-item class="red_s" label="使用单位名称:" label-width="140px" prop="useName">
                <el-select
                  style=" width: 100%;"
                  clearable
                  filterable
                  v-model="dengform.useName"
                  @input="a"
                  placeholder="请选择单位名称"
                >
                  <el-option
                    v-for="(item , i) in selects6"
                    :key="i"
                    :label="item.name"
                    :value="item.name"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="11">
              <el-form-item class="red_s" label="使用单位地址:" label-width="140px" prop="address">
                <el-input v-model="dengform.address" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="11">
              <el-form-item class="red_s" label="统一社会信用代码:" label-width="140px" prop="code">
                <el-input v-model="dengform.code" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="11">
              <el-form-item label="邮政编码:" label-width="140px" prop="postalCode">
                <el-input v-model="dengform.postalCode" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="11">
              <el-form-item class="red_s" label="投入使用日期:" label-width="140px" prop="initData">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="dengform.initData"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="11">
              <el-form-item class="red_s" label="单位固定电话:" label-width="140px" prop="mobilePhone">
                <el-input v-model="dengform.mobilePhone" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="11">
              <el-form-item class="red_s" label="安全管理员:" label-width="140px" prop="  ">
                <el-input v-model="dengform.useSafe" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="11">
              <el-form-item class="red_s" label="移动电话:" label-width="140px" prop="telPhone">
                <el-input v-model="dengform.telPhone" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="11">
              <el-form-item class="red_s" label="使用单位填表人员:" label-width="140px" prop="userFill">
                <el-input v-model="dengform.userFill" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="11">
              <el-form-item class="red_s" label="日期:" label-width="140px" prop="fillDate">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="dengform.fillDate"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="11">
              <el-form-item
                class="red_s"
                label="使用单位安全管理人员:"
                label-width="140px"
                prop="userSafePerson"
              >
                <el-input v-model="dengform.userSafePerson" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="11">
              <el-form-item class="red_s" label="日期2:" label-width="140px" prop="verifyDate">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="dengform.verifyDate"
                  style="width: 100%;"
                ></el-date-picker>
                <!-- <el-input v-model="form.cretificationDate" autocomplete="off"></el-input> -->
              </el-form-item>
            </el-col>
          </el-col>

          <h3 style="border-bottom:1px solid #ece8e8;padding-bottom:5px">登记信息</h3>

          <el-col :span="24">
            <el-col :span="11">
              <el-form-item class="red_s" label="登记机关:" label-width="140px" prop="certification">
                <el-input v-model="dengform.certification" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="11">
              <el-form-item
                class="red_s"
                label="登记人员:"
                label-width="140px"
                prop="certificationPerson"
              >
                <el-input v-model="dengform.certificationPerson" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="11">
              <el-form-item class="red_s" label="登记证编号:" label-width="140px" prop="regId">
                <el-input disabled v-model="dengform.regId" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="11">
              <el-form-item
                class="red_s"
                label="发证日期:"
                label-width="140px"
                prop="cretificationDate"
              >
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="dengform.cretificationDate"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-col>
        </el-form>
        <p style="text-align: center;" slot="footer" class="dialog-footer">
          <el-button @click="dengdialogFormVisible = false">取 消</el-button>
          <el-button type="primary" :loading="loadingbut" @click="savencftpget()">{{loadingbuttext}}</el-button>
          <el-button type="primary" @click="ncftpget()">下载pdf文档</el-button>
          <el-button type="primary" @click="previewFile()">预览</el-button>
          <!-- <a :href="this.url" target="_blank">预览</a> -->
          <!-- <pdf src="../../assets/12345.pdf">123</pdf> -->
        </p>
      </el-dialog>

      <!-- 对话框 -->
      <!-- 检验单位 添加对话框 -->
      <el-dialog
        title="新增信息"
        v-dialogDrag
        ref="dialog__wrapper"
        :close-on-click-modal="false"
        :visible.sync="dialogFormVisibleAddad"
        width="80%"
      >
        <el-form :model="forma" :rules="rulses" ref="forma">
          <el-col :span="24">
            <el-col :span="8">
              <el-form-item label-width="140px" label="行政省份:">
                <el-select
                  style="width:100%"
                  v-model="forma.provinceCode"
                  @change="function2(forma.provinceCode)"
                  :disabled="showCmd"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.id"
                    :label="item.name"
                    :value="item.code"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label-width="140px" label="市级区域:">
                <el-select
                  style="width:100%"
                  v-model="forma.cityCode"
                  @change="function1(forma.cityCode)"
                  :disabled="showCmd_1"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in level"
                    :key="item.id"
                    :label="item.name"
                    :value="item.code"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label-width="140px" label="区级:">
                <el-select
                  style="width:100%"
                  v-model="forma.areaCode"
                  :disabled="showCmds"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in levels"
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
              <el-form-item label="单位名称:" class="red_s" label-width="140px" prop="name">
                <el-input v-model="forma.name" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="负责人:" label-width="140px">
                <el-input v-model="forma.personnelName" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="单位固定电话:" label-width="140px">
                <el-input v-model="forma.unitPhone" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="8">
              <el-form-item label="负责人联系电话:" label-width="140px">
                <el-input v-model="forma.phone" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="详细地址:" label-width="140px">
                <el-input v-model="forma.address" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="发证日期:" label-width="140px">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="forma.unitIssueTime"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="8">
              <el-form-item label="换证日期:" label-width="140px">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="forma.unitChangeTime"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="检验核准证书编号:" label-width="140px">
                <el-input v-model="forma.licence" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="统一社会信用代码:" label-width="140px">
                <el-input v-model="forma.code" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="8">
              <el-form-item label="邮政编码:" label-width="140px">
                <el-input v-model="forma.postalCode" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="气瓶类型:" label-width="140px">
                <el-select
                  disabled
                  style=" width: 100%;"
                  @clear="loadUserList()"
                  clearable
                  v-model="forma.bottleType"
                  placeholder="请选择类型"
                >
                  <el-option
                    v-for="item in optionsqip"
                    :key="item.id"
                    :label="item.usename"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="是否已购保险:" label-width="140px">
                <el-select
                  style=" width: 100%;"
                  @clear="loadUserList()"
                  clearable
                  v-model="forma.isSafe"
                  placeholder="请选择类型"
                >
                  <el-option
                    v-for="item in optionbao"
                    :key="item.id"
                    :label="item.bao"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="8">
              <el-form-item hidden label="单位类型:" label-width="140px">
                <el-select
                  style=" width: 100%;"
                  @clear="loadUserList()"
                  clearable
                  v-model="forma.type"
                  placeholder="请选择单位类型"
                >
                  <el-option
                    v-for="item in optionsuseName"
                    :key="item.icd"
                    :label="item.usenames"
                    :value="item.icd"
                  ></el-option>
                </el-select>
                <!-- <el-input v-model="form.type" autocomplete="off">0</el-input> -->
              </el-form-item>
            </el-col>
          </el-col>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibleAddad = false">取 消</el-button>
          <el-button type="primary" @click="AddUsersd()">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 使用单位 添加对话框 -->
      <el-dialog
        title="新增信息"
        v-dialogDrag
        ref="dialog__wrapper"
        :close-on-click-modal="false"
        width="80%"
        :visible.sync="dialogFormVisibleAddbb"
      >
        <el-form @keyup.enter.native="AddUser" :model="forms" :rules="rulsesad" ref="forms">
          <el-col :span="24">
            <el-col :span="8">
              <el-form-item label-width="140px" label="行政省份:">
                <el-select
                  style="width:100%"
                  v-model="forms.provinceCode"
                  @change="function2(forms.provinceCode)"
                  :disabled="showCmd"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.id"
                    :label="item.name"
                    :value="item.code"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label-width="140px" label="市级区域:">
                <el-select
                  style="width:100%"
                  v-model="forms.cityCode"
                  @change="function1(forms.cityCode)"
                  :disabled="showCmd_1"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in level"
                    :key="item.id"
                    :label="item.name"
                    :value="item.code"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label-width="140px" label="区级:">
                <el-select
                  style="width:100%"
                  v-model="forms.areaCode"
                  :disabled="showCmds"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in levels"
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
              <el-form-item label="单位名称:" class="red_s" label-width="140px" prop="name">
                <el-input v-model="forms.name" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="负责人:" class="red_s" label-width="140px" prop="personnelName">
                <el-input v-model="forms.personnelName" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="单位固定电话:" label-width="140px" prop="unitPhone">
                <el-input v-model="forms.unitPhone" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="8">
              <el-form-item label="负责人联系电话:" label-width="140px" prop="phone">
                <el-input v-model="forms.phone" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="单位地址:" class="red_s" label-width="140px" prop="address">
                <el-input v-model="forms.address" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="统一社会信用代码:" label-width="140px" prop="code">
                <el-input v-model="forms.code" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <!-- <el-col :span="8">
              <el-form-item label="使用登记证编号:" label-width="140px">
                <el-input v-model="form.licence" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>-->
          </el-col>

          <el-col :span="24">
            <el-col :span="8">
              <el-form-item label="邮政编码:" label-width="140px" prop="postalCode">
                <el-input v-model="forms.postalCode" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="气瓶类型:" label-width="140px">
                <el-select
                  disabled
                  style=" width: 100%;"
                  @clear="loadUserList()"
                  clearable
                  v-model="forms.bottleType"
                  placeholder="请选择类型"
                >
                  <el-option
                    v-for="item in optionsqip"
                    :key="item.id"
                    :label="item.usename"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="是否已购保险:" label-width="140px" prop="type">
                <el-select
                  style=" width: 100%;"
                  @clear="loadUserList()"
                  clearable
                  v-model="forms.isSafe"
                  placeholder="请选择类型"
                >
                  <el-option
                    v-for="item in optionbao"
                    :key="item.id"
                    :label="item.bao"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="8">
              <el-form-item hidden label="单位类型:" label-width="140px" prop="type">
                <el-select
                  style=" width: 100%;"
                  @clear="loadUserList()"
                  clearable
                  v-model="forms.type"
                  placeholder="请选择单位类型"
                >
                  <el-option
                    v-for="item in optionsuseName"
                    :key="item.icd"
                    :label="item.usenames"
                    :value="item.icd"
                  ></el-option>
                </el-select>
                <!-- <el-input v-model="form.type" autocomplete="off">0</el-input> -->
              </el-form-item>
            </el-col>
          </el-col>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibleAddbb = false">取 消</el-button>
          <el-button type="primary" @click="AddUserabb()">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 登记表打印下载 -->
      <el-dialog top="3vh" title="登记表预览下载" :visible.sync="dengtabledialogFormVisible">
        <el-form :model="dengtable" :rules="rules">
          <el-col :span="24">
            <el-col :span="6">
              <el-form-item class="red_s" label="登记类别:" label-width="100px" prop="regType">
                <el-select style=" width: 100%" v-model="dengtable.regType" :validate-event="false">
                  <el-option
                    v-for="item in selects3"
                    :key="item.id"
                    :label="item.orders"
                    :value="item.orders"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item class="red_s" label-width="100px" label="行政省份:">
                <el-select
                  style=" width: 100%;"
                  @clear="loadUserList()"
                  clearable
                  v-model="dengtable.sheng"
                  @change="function2(dengtable.sheng)"
                  @input="searchUser()"
                  placeholder="请选择省份"
                  :disabled="showCmd"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.id"
                    :label="item.name"
                    :value="item.name"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item class="red_s" prop="cityId" label-width="100px" label="市级区域:">
                <el-select
                  style=" width: 100%;"
                  @clear="loadUserList()"
                  clearable
                  v-model="dengtable.city"
                  @input="searchUser()"
                  @change="function1(dengtable.city)"
                  placeholder="请选择城市"
                  :disabled="showCmd_1"
                >
                  <el-option
                    v-for="item in level"
                    :key="item.id"
                    :label="item.name"
                    :value="item.code"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item class="red_s" prop="country" label-width="100px" label="区级:">
                <el-select
                  style=" width: 100%;"
                  @clear="loadUserList()"
                  clearable
                  v-model="dengtable.country"
                  @input="searchUser()"
                  placeholder="请选择区域"
                  :disabled="showCmds"
                >
                  <el-option
                    v-for="item in levels"
                    :key="item.id"
                    :label="item.name"
                    :value="item.name"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-col>

          <h3 style="border-bottom:1px solid #ece8e8;padding-bottom:5px">设备基本情况</h3>
          <el-col :span="24">
            <el-col :span="11">
              <!-- <el-form-item hidden label="档案号:" label-width="140px" prop="regId">
                <el-input v-model="form.regId" autocomplete="off"></el-input>
              </el-form-item>-->
              <el-form-item class="red_s" label="设备品种:" label-width="140px" prop="equipmentCode">
                <el-cascader
                  v-model="dengtable.equipmentCode"
                  style=" width: 100%"
                  :options="optionsa"
                  :show-all-levels="false"
                ></el-cascader>
              </el-form-item>
              <!-- <el-form-item class="red_s" label="设备类型:" label-width="140px" prop="equipmentCode">
                <el-select
                  style=" width: 100%"
                  v-model="dengtable.equipmentCode"
                  :validate-event="false"
                >
                  <el-option
                    v-for="item in selects1"
                    :key="item.id"
                    :label="item.orders"
                    :value="item.orders"
                  ></el-option>
                </el-select>
              </el-form-item>-->
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="11">
              <el-form-item class="red_s" label="产品名称:" label-width="140px" prop="productName">
                <el-select
                  style=" width: 100%"
                  v-model="dengtable.productName"
                  :validate-event="false"
                >
                  <el-option
                    v-for="item in selects5"
                    :key="item.id"
                    :label="item.orders"
                    :value="item.orders"
                  ></el-option>
                </el-select>
                <!-- {{id}} -->
                <!-- <el-select
                  v-model="editUserForm.zoneId"
                  @change="function2(editUserForm.sheng)"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.id"
                    :label="item.name"
                    :value="item.name"
                  ></el-option>
                </el-select>-->
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="11">
              <el-form-item class="red_s" label="监督检验机构名称:" label-width="140px" prop="checkName">
                <el-input v-model="dengtable.checkName" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="11"></el-col>
          </el-col>

          <h3 style="border-bottom:1px solid #ece8e8;padding-bottom:5px">设备使用情况</h3>

          <el-col :span="24">
            <el-col :span="11">
              <el-form-item class="red_s" label="使用单位名称:" label-width="140px" prop="useName">
                <el-select
                  style=" width: 100%;"
                  clearable
                  filterable
                  v-model="dengtable.useName"
                  @input="a"
                  placeholder="请选择单位名称"
                >
                  <el-option
                    v-for="(item , i) in selects6"
                    :key="i"
                    :label="item.name"
                    :value="item.name"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="11">
              <el-form-item class="red_s" label="使用单位地址:" label-width="140px" prop="address">
                <el-input v-model="dengtable.address" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="11">
              <el-form-item class="red_s" label="统一社会信用代码:" label-width="140px" prop="code">
                <el-input v-model="dengtable.code" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="11">
              <el-form-item label="邮政编码:" label-width="140px" prop="postalCode">
                <el-input v-model="dengtable.postalCode" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="11">
              <el-form-item class="red_s" label="投入使用日期:" label-width="140px" prop="initData">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="dengtable.initData"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="11">
              <el-form-item class="red_s" label="单位固定电话:" label-width="140px" prop="mobilePhone">
                <el-input v-model="dengtable.mobilePhone" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="11">
              <el-form-item class="red_s" label="安全管理员:" label-width="140px" prop>
                <el-input v-model="dengtable.useSafe" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="11">
              <el-form-item class="red_s" label="移动电话:" label-width="140px" prop="telPhone">
                <el-input v-model="dengtable.telPhone" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="11">
              <el-form-item class="red_s" label="使用单位填表人员:" label-width="140px" prop="userFill">
                <el-input v-model="dengtable.userFill" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="11">
              <el-form-item class="red_s" label="日期:" label-width="140px" prop="fillDate">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="dengtable.fillDate"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="11">
              <el-form-item
                class="red_s"
                label="使用单位安全管理人员:"
                label-width="140px"
                prop="userSafePerson"
              >
                <el-input v-model="dengtable.userSafePerson" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="11">
              <el-form-item class="red_s" label="日期2:" label-width="140px" prop="verifyDate">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="dengtable.verifyDate"
                  style="width: 100%;"
                ></el-date-picker>
                <!-- <el-input v-model="form.cretificationDate" autocomplete="off"></el-input> -->
              </el-form-item>
            </el-col>
          </el-col>

          <h3 style="border-bottom:1px solid #ece8e8;padding-bottom:5px">登记信息</h3>

          <el-col :span="24">
            <el-col :span="11">
              <el-form-item class="red_s" label="登记机关:" label-width="140px" prop="certification">
                <el-input v-model="dengtable.certification" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="11">
              <el-form-item
                class="red_s"
                label="登记人员:"
                label-width="140px"
                prop="certificationPerson"
              >
                <el-input v-model="dengtable.certificationPerson" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="11">
              <el-form-item class="red_s" label="登记证编号:" label-width="140px" prop="regId">
                <el-input disabled v-model="dengtable.regId" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="11">
              <el-form-item
                class="red_s"
                label="发证日期:"
                label-width="140px"
                prop="cretificationDate"
              >
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="dengtable.cretificationDate"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-col>
        </el-form>
        <p style="text-align: center;" slot="footer" class="dialog-footer">
          <el-button @click="dengtabledialogFormVisible = false">取 消</el-button>
          <el-button
            type="primary"
            :loading="loadingbuts"
            @click="savencftpgets()"
          >{{loadingbuttexts}}</el-button>
          <el-button type="primary" @click="ncftpgets()">下载pdf文档</el-button>
          <el-button type="primary" @click="previewFile()">预览</el-button>

          <!-- <pdf src="../../assets/12345.pdf">123</pdf> -->
        </p>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
// 气瓶信息管理
// import Message from "@/components/archives/message"
import cityData from "@/components/archives/citydata.js";
import $ from "jquery";
// import pdf from "vue-pdf";
export default {
  name: "cylinder",
  // components: {
  //   pdf
  // },
  data() {
    return {
      optionsuse: [],
      regId: "",
      fillDate: "",
      verifyDate: "",
      unitName: "",
      showCmd: true,
      showCmds: true,
      sheng: "", //行政区划
      division: [], //获取行政区划
      certification: "", //登记单位
      select: "",
      loadingbuttext: "保存登记证",
      loadingbuttexts: "保存登记表",
      loadingbut: false, //审核提交加载中
      loadingbuts: false, //审核提交加载中
      userlist: [],
      ProvinceId: [], //省
      CityId: [], //市
      AreaId: [], //区
      url: "", //图片地址
      urls: "", //图片地址
      cityData,
      dengtableId: "",
      ids: [],
      //分页相关数据
      total: -1,
      currpage: 1,
      page: 1,
      pageSize: 10,
      id: -1,
      Id: -1,
      codes: "",
      dengId: -1,
      options: [],
      level: [],
      levels: [],
      // 添加对话框的属性
      dialogFormVisibleAdd: false,
      dialogFormVisibleEdit: false,
      dialogTableVisible: false,
      dengdialogFormVisible: false,
      dialogFormVisibleAddad: false, //检验单位新增框
      dialogFormVisibleAddbb: false, //使用单位新增框
      dengtabledialogFormVisible: false, //登记表打印下载
      pdfindex: false,
      // dialogFormVisibleRoleshow: false,
      optionsa: [
        {
          value: "特种气瓶",
          label: "特种气瓶",
          children: [
            {
              value: "内装填料气瓶",
              label: "内装填料气瓶",
            },
            {
              value: "纤维缠绕气瓶",
              label: "纤维缠绕气瓶",
            },
            {
              value: "低温绝热气瓶",
              label: "低温绝热气瓶",
            },
          ],
        },
        {
          value: "无缝气瓶",
          label: "无缝气瓶",
        },
        {
          value: "焊接气瓶",
          label: "焊接气瓶",
        },
      ],
      selects1: [
        {
          id: 1,
          orders: "特种气瓶(内装填料气瓶、纤维缠绕气瓶、低温绝热气瓶)",
        },
        {
          id: 2,
          orders: "无缝气瓶",
        },
        {
          id: 3,
          orders: "焊接气瓶",
        },
      ],
      selects2: [
        {
          id: 1,
          orders: "CNG",
        },
        {
          id: 2,
          orders: "LPG",
        },
        {
          id: 3,
          orders: "LNG",
        },
        {
          id: 4,
          orders: "H2",
        },
        {
          id: 5,
          orders: "N2",
        },
      ],
      //登记类别
      selects3: [
        {
          id: 1,
          orders: "新设备首次启动",
        },
        {
          id: 2,
          orders: "改造",
        },
        {
          id: 3,
          orders: "使用单位更名",
        },
        {
          id: 4,
          orders: "使用地址变更",
        },
        {
          id: 5,
          orders: "过户",
        },
        {
          id: 6,
          orders: "移装",
        },
        {
          id: 7,
          orders: "达到设计使用年限",
        },
      ],
      selects5: [
        {
          id: 1,
          orders: "车用气瓶",
        },
        {
          id: 2,
          orders: "液化气瓶",
        },
        {
          id: 3,
          orders: "工业气瓶",
        },
      ],
      //添加用户的表单的数据
      form: {
        sheng: "", //省
        city: "", //市
        country: "", //区
        regType: "", //登记类型
        postalCode: "", //邮政编码
        code: "", //统一社会信用代码
        checkName: "", //监督机构名称
        useName: "", //使用单位名称
        address: "", //使用单位地址
        initData: "", //投入使用时间
        mobilePhone: "", //固定电话
        useSafe: "", //安全管理员
        certification: "", //登记机关
        cretificationDate: "", //登记日期
        certificationPerson: "", //登记人员
        telPhone: "", //移动电话
        equipmentCode: ["焊接气瓶"], //设备类型
        productName: "", //产品名称
        departmentId: "",
        regId: "",
      },
      Idd: "",
      dengform: {
        regType: "", //登记类别
        sheng: "", // 行政省份
        fillDate: "", //市级区域
        country: "", //区域
        equipmentCode: "", //设备类型
        productName: "", //产品名称
        checkName: "", //监督检验机构名称
        useName: "", //使用单位名称
        address: "", //使用单位地址
        code: "", //统一社会信用代码
        postalCode: "", //邮政编码
        initData: "", //投入使用日期
        mobilePhone: "", //单位固定电话
        useSafe: "", //安全管理员
        telPhone: "", //移动电话
        userFill: "", //使用单位填表人员
        fillDate: "", //日期
        userSafePerson: "", //使用单位安全管理人员
        verifyDate: "", //日期2
        certificationPerson: "", //登记机关管理人员
        certificationPerson: "", //登记人员
        certification: "", //登记机关
        cretificationDate: "", //发证日期
      },
      dengtable: {
        regType: "", //登记类别
        sheng: "", // 行政省份
        fillDate: "", //市级区域
        country: "", //区域
        equipmentCode: "", //设备类型
        productName: "", //产品名称
        checkName: "", //监督检验机构名称
        useName: "", //使用单位名称
        address: "", //使用单位地址
        code: "", //统一社会信用代码
        postalCode: "", //邮政编码
        initData: "", //投入使用日期
        mobilePhone: "", //单位固定电话
        useSafe: "", //安全管理员
        telPhone: "", //移动电话
        userFill: "", //使用单位填表人员
        fillDate: "", //日期
        userSafePerson: "", //使用单位安全管理人员
        verifyDate: "", //日期2
        certificationPerson: "", //登记机关管理人员
        certificationPerson: "", //登记人员
        certification: "", //登记机关
        cretificationDate: "", //发证日期
      },

      // 编辑
      editUserForm: {
        regId: "", //档案号
        sheng: "", //省级区域代码
        city: "", //市级区域代码
        country: "", //区级代码
        regType: "", //登记类型
        postalCode: "", //邮政编码
        code: "", //统一社会信用代码
        num: "", //气瓶数量
        checkName: "", //监督机构名称
        useName: "", //使用单位名称
        address: "", //使用单位地址
        initData: "", //投入使用时间
        mobilePhone: "", //固定电话
        useSafe: "", //安全管理员
        certification: "", //登记机关
        cretificationDate: "", //登记日期
        certificationPerson: "", //登记人员
        telPhone: "", //移动电话
        equipmentCode: "", //设备类型
        productName: "", //产品名称
        departmentId: "",
      },
      selects6: [],
      optionsse: [
        { id: 0, name: "合格" },
        { id: 1, name: "不合格" },
        { id: 2, name: "超期未检" },
        { id: 3, name: "即将超期" },
      ],
      optionsuseName: [
        {
          id: 1,
          usenames: "腾讯",
        },
        {
          id: 2,
          usenames: "微博",
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
      optionbao: [
        {
          id: 0,
          bao: "未购",
        },
        {
          id: 1,
          bao: "已购",
        },
      ],
      optionsqip: [
        {
          id: 0,
          usename: "车用气瓶",
        },
        {
          id: 1,
          usename: "液化气瓶",
        },
        {
          id: 2,
          usename: "工业气瓶",
        },
        {
          id: 3,
          usename: "移动充装",
        },
      ],
      forma: {
        provinceCode: "", //省
        cityCode: "", //市
        areaCode: "", //区
        name: "", //单位名称
        licence: "", //特种设备行政许可证号
        unitPhone: "", //单位固定电话
        phone: "", //负责人联系电话
        address: "", //单位地址
        unitIssueTime: "", //发证日期
        unitChangeTime: "", //换证日期
        code: "", //统一社会信用代码
        postalCode: "", //邮政编码
        type: 3, //单位类型
        personnelName: "", // 负责人
        bottleType: 1,
        isSafe: 0,
      },
      rulses: {
        provinceCode: [
          { required: true, message: "省级区域不能为空", trigger: "blur" },
        ], //省级区域验证
        cityCode: [
          { required: true, message: "市级区域不能为空", trigger: "blur" },
        ], //市级区域验证
        areaCode: [
          { required: true, message: "区级区域不能为空", trigger: "blur" },
        ], //区级区域验证
        name: [{ required: true, message: "请输入单位名称", trigger: "blur" }], //单位名称的验证
        licence: [
          {
            required: true,
            message: "检验核准证书编号不能为空",
            trigger: "blur",
          },
        ], //特种设备证号验证

        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: "手机号格式不对",
          },
        ], //固定电话验证
        unitPhone: [
          { required: true, message: "请输入固定电话", trigger: "blur" },
          {
            pattern: /^((0\d{2,3})-)?(\d{7,8})(-(\d{3,}))?$|(0\d{10})$/,
            message: "固定电话格式不对",
          },
        ],
        address: [
          { required: true, message: "请输入地址", trigger: "blur" },
          { min: 2, message: "请输入不少于2个字", trigger: "blur" },
        ], //地址验证
        type: [
          { required: true, message: "充装气体类别不能为空", trigger: "blur" },
        ],
        gasName: [
          { required: true, message: "气体名称不能为空", trigger: "blur" },
        ],
        note: [{ required: true, message: "备注不能为空", trigger: "blur" }],
        office: [
          { required: true, message: "发证机关不能为空", trigger: "blur" },
        ],
        unitChangeTime: [
          {
            required: true,
            message: "请选择时间",
            trigger: "blur",
          },
        ],
        unitIssueTime: [
          {
            required: true,
            message: "请选择时间",
            trigger: "blur",
          },
        ], //发证日期
        unitChangeTime: [
          {
            required: true,
            message: "请选择时间",
            trigger: "blur",
          },
        ], //换证日期
        code: [
          {
            required: true,
            message: "请输入统一社会信用代码",
            trigger: "blur",
          },
          // { min: 2, message: "请输入不少于2个字", trigger: "blur" }
        ], //统一社会信用代码
        postalCode: [
          { required: true, message: "请输入邮政编码", trigger: "blur" },
          { min: 6, message: "请输入6个字", trigger: "blur" },
          { pattern: /^[1-9][0-9]{5}$/, message: "邮政编码格式不对" },
        ], //邮政编码
      },
      rules: {
        regId: [{ required: true, message: "档案号不能为空", trigger: "blur" }],
        country: [{ required: true, message: "区不能为空", trigger: "blur" }],
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
        checkName: [
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
        ],
      },
      rulsesad: {
        provinceCode: [
          { required: true, message: "省级区域不能为空", trigger: "blur" },
        ], //省级区域验证
        cityCode: [
          { required: true, message: "市级区域不能为空", trigger: "blur" },
        ], //市级区域验证
        areaCode: [
          { required: true, message: "区级区域不能为空", trigger: "blur" },
        ], //区级区域验证
        name: [
          { required: true, message: "请输入单位名称", trigger: "blur" },
          { min: 2, message: "请输入不少于2个字", trigger: "blur" },
        ], //单位名称的验证
        licence: [
          {
            required: true,
            message: "使用登记证编号不能为空",
            trigger: "blur",
          },
        ], //特种设备证号验证
        personnelName: [
          { required: true, message: "负责人不能为空", trigger: "blur" },
        ], //特种设备证号验证
        address: [
          { required: true, message: "请输入地址", trigger: "blur" },
          { min: 2, message: "请输入不少于2个字", trigger: "blur" },
        ], //地址验证

        unitIssueTime: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "blur",
          },
        ], //发证日期
      },
      forms: {
        provinceCode: "", //省
        cityCode: "", //市
        areaCode: "", //区
        name: "", //单位名称
        licence: "", //特种设备行政许可证号
        unitPhone: "", //单位固定电话
        phone: "", //负责人联系电话
        address: "", //单位地址
        unitIssueTime: "", //发证日期
        unitChangeTime: "", //换证日期
        code: "", //统一社会信用代码
        postalCode: "", //邮政编码
        type: 4, //单位类型
        bottleType: 1,
        isSafe: 0,
      },
      // 分配角色,
      currRoleId: -1,
      //   分配当前用户id
      currusrId: -1,
      roles: [],
      currUsername: "",
      country: [],
      arealeve: 1,
      multipleSelection: [], //批量删除数据
      delarr: [], //批量删除id
      tyPe: "",
      provincecode: "",
      citycode: "",
      areacode: "",
      sshowCmd: true,
      showCmd_1: true,
      showCmds: true,

      //   保存所有角色数据
    };
  },
  watch: {
    dialogFormVisibleAdd: function (val, oldVla) {
      this.$refs["form"].resetFields();
    },
    dialogFormVisibleAddad: function (val, oldVla) {
      this.$refs["forma"].resetFields();
    },
    dialogFormVisibleAddbb: function (val, oldVla) {
      this.$refs["forms"].resetFields();
    },
  },
  methods: {
    //登记表下载
    async ncftpgets() {
      console.log(this.regId);
      const res = await this.$http
        .post(
          `/download/download/list/${this.regId}`,
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
            const fileName = "登记表打印模板.pdf";

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
    //登记表保存
    savencftpgets() {
      const regdata = this.fillDate.toString().slice(0, 10);
      const regdata2 = this.verifyDate.toString().slice(0, 10);
      this.loadingbuts = true;
      this.loadingbuttexts = "加载中...";
      this.$http
        .post(
          `/word/word/list?id=${this.dengtableId}&creditCode=${this.dengtable.creditCode}&sbAddress=${this.dengtable.sbAddress}&post=${this.dengtable.post}&mobilePhone=${this.dengtable.mobilePhone}&userFill=${this.dengtable.userFill}&fillDate=${regdata}&userSafePerson=${this.dengtable.userSafePerson}&verifyDate=${regdata2}&certificationPerson=${this.dengtable.certificationPerson}`
        )
        .then((res) => {
          console.log(res);
          if (res.data.code == 201) {
            this.$message({
              type: "warning",
              message: res.data.msg,
            });
            this.loadingbuts = false;
            this.loadingbuttexts = "保存登记表";
          } else if (res.data.code == 200) {
            this.$message({
              type: "success",
              message: res.data.msg,
            });
            this.codes = res.data.code;
            console.log(this.codes);
            this.url = res.data.data;
            // this.urls = res.data.data[1];
            this.loadingbuts = false;
            this.loadingbuttexts = "保存登记表";
            this.regId = this.dengtable.regId;
          }
        });
    },

    //登记表对话框
    async agricultural(row) {
      console.log(row);
      // this.regId = row.regId;
      this.dengtableId = row.id;
      const ress = await this.$http.get(
        `word/showTable?&id=${this.dengtableId}`
      );
      console.log(ress);
      if ((ress.data.code = 200)) {
        this.dengtable = ress.data.data;
        this.fillDate = ress.data.data.fillDate;
        this.verifyDate = ress.data.data.verifyDate;
      }
      this.dengtabledialogFormVisible = true;
      const res = await this.$http.get(`/unitdrop/select?bottleType=1`);
      this.selects6 = res.data.data;
      this.savencftpgets();
    },
    async downtemplatee(user) {
      console.log(user.regId);
      this.xiazai = this.$route.query.regId;
      this.loadingbut = true;
      this.loadingbuttext = "加载中...";
      const res = await this.$http
        .post(
          `excel/creat/${user.regId}`,
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
            this.loadingbut = false;
            this.loadingbuttext = "气瓶信息批量下载";
            const blob = new Blob([response.data], {
              type: "application/msword",
            });
            const fileName = "气瓶基本信息.xlsx";

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
              type: "error",
              message: "生成失败",
            });
            this.loadingbut = false;
            this.loadingbuttext = "气瓶信息批量下载";
          }
        })
        .catch((err) => {
          this.$message({
            type: "error",
            message: "生成失败",
          });
          //         _toastr.error(err)
          this.loadingbut = false;
          this.loadingbuttext = "气瓶信息批量下载";
        });
    },
    //使用单位添加
    async AddUserabb() {
      this.$refs.forms.validate(async (valid) => {
        if (valid) {
          if (this.tyPe == 1) {
            const res = await this.$http.post(`/unit`, this.forms);
            console.log(res);
            this.getUserlist();
            // console.log(res);
            if (res.data.code === 0) {
              // 提示
              this.$message({
                type: "success",
                message: res.data.msg,
              });
              this.dialogFormVisibleAddbb = false;
              this.shi();
              // this.form = {};
            } else if (res.data.code === 1) {
              this.$message({
                type: "warning",
                message: res.data.msg,
              });
            }
          } else if (this.tyPe == 2) {
            this.forms.provinceCode = sessionStorage.getItem("provinceCode"); //省code
            this.forms.cityCode = sessionStorage.getItem("cityCode"); //市code
            const res = await this.$http.post(`/unit`, this.forms);
            console.log(res);
            this.getUserlist();
            // console.log(res);
            if (res.data.code === 0) {
              // 提示
              this.$message({
                type: "success",
                message: res.data.msg,
              });
              this.dialogFormVisibleAddbb = false;
              this.shi();
              // this.form = {};
            } else if (res.data.code === 1) {
              this.$message({
                type: "warning",
                message: res.data.msg,
              });
            }
          } else if (this.tyPe == 0) {
            const res = await this.$http.post(`/unit`, this.forms);
            console.log(res);
            this.getUserlist();
            // console.log(res);
            if (res.data.code === 0) {
              // 提示
              this.$message({
                type: "success",
                message: res.data.msg,
              });
              this.dialogFormVisibleAddbb = false;
              this.shi();
            } else if (res.data.code === 1) {
              this.$message({
                type: "warning",
                message: res.data.msg,
              });
            }
          } else if (this.tyPe == 3) {
            this.forms.provinceCode = sessionStorage.getItem("provinceCode"); //省code

            const res = await this.$http.post(`/unit`, this.forms);
            console.log(res);
            this.getUserlist();
            // console.log(res);
            if (res.data.code === 0) {
              // 提示
              this.$message({
                type: "success",
                message: res.data.msg,
              });
              this.dialogFormVisibleAddbb = false;
              this.shi();
              // this.form = {};
            } else if (res.data.code === 1) {
              this.$message({
                type: "warning",
                message: res.data.msg,
              });
            }
          }
        } else {
          this.$message({
            type: "error",
            message: "请填写内容再试",
          });
          this.dialogFormVisibleAdd = true;
        }
      });
    },
    shiyong() {
      this.dialogFormVisibleAddbb = true;
    },
    async shi() {
      const res = await this.$http.get(`/unitdrop/select?bottleType=1`);
      this.selects6 = res.data.data;
    },
    //检验单位添加
    async AddUsersd() {
      this.$refs.forma.validate(async (valid) => {
        if (valid) {
          if (this.tyPe == 1) {
            const res = await this.$http.post(`/unit`, this.forma);
            console.log(res);
            this.getUserlist();
            // console.log(res);
            if (res.data.code === 0) {
              // 提示
              this.$message({
                type: "success",
                message: res.data.msg,
              });
              this.dialogFormVisibleAddad = false;
              this.sss();
              // this.form = {};
            } else if (res.data.code === 1) {
              this.$message({
                type: "warning",
                message: res.data.msg,
              });
            }
          } else if (this.tyPe == 2) {
            this.forma.provinceCode = sessionStorage.getItem("provinceCode"); //省code
            this.forma.cityCode = sessionStorage.getItem("cityCode"); //市code
            const res = await this.$http.post(`/unit`, this.forma);
            console.log(res);
            // console.log(res);
            if (res.data.code === 0) {
              // 提示
              this.$message({
                type: "success",
                message: res.data.msg,
              });
              this.dialogFormVisibleAddad = false;
              this.sss();
              // this.form = {};
            } else if (res.data.code === 1) {
              this.$message({
                type: "warning",
                message: res.data.msg,
              });
            }
          } else if (this.tyPe == 0) {
            const res = await this.$http.post(`/unit`, this.forma);
            console.log(res);
            this.getUserlist();
            // console.log(res);
            if (res.data.code === 0) {
              // 提示
              this.$message({
                type: "success",
                message: res.data.msg,
              });
              this.dialogFormVisibleAddad = false;
              this.sss();
              // this.form = {};
            } else if (res.data.code === 1) {
              this.$message({
                type: "warning",
                message: res.data.msg,
              });
            }
          } else if (this.tyPe == 3) {
            this.forma.provinceCode = sessionStorage.getItem("provinceCode"); //省code

            const res = await this.$http.post(`/unit`, this.forma);
            console.log(res);
            this.getUserlist();
            // console.log(res);
            if (res.data.code === 0) {
              // 提示67
              this.$message({
                type: "success",
                message: res.data.msg,
              });
              this.dialogFormVisibleAddad = false;
              this.sss();
              // this.form = {};
            } else if (res.data.code === 1) {
              this.$message({
                type: "warning",
                message: res.data.msg,
              });
            }
          }
        } else {
          this.$message({
            type: "error",
            message: "请填写内容再试",
          });
          this.dialogFormVisibleAdd = true;
        }
      });
    },
    async sss() {
      const resss = await this.$http.get(`unitdrop/detection?bottleType=1`);
      this.optionsuse = resss.data.data;
    },
    tiaozhuan() {
      this.dialogFormVisibleAddad = true;
    },
    handleCurrentChanges(val) {
      let arr = [];
      console.log(val);
      this.multipleSelection = val;
    },
    // 批量删除请求数据
    showDeleUserMsgBox() {
      for (let i = 0; i <= this.multipleSelection.length - 1; i++) {
        this.delarr.push(this.multipleSelection[i].id);
      }
      console.log(this.delarr);
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
            const res = await this.$http.post(`doucument/delete`, this.delarr);
            console.log(res);
            this.delarr = [];
            // 提示
            if (res.data.code == 200) {
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

    async a() {
      console.log(this.form.useName); //
      for (var key in this.selects6) {
        console.log(key);
        if (this.form.useName == this.selects6[key].name) {
          const res = await this.$http.get(`/unit/${this.selects6[key].id}`);
          console.log(res);
          this.form.address = res.data.data.address;
          this.form.code = res.data.data.code;
          this.form.mobilePhone = res.data.data.unitPhone;
          this.form.initData = res.data.data.unitIssueTime;
          this.form.postalCode = res.data.data.postalCode;
          this.form.telPhone = res.data.data.phone;
          this.form.useName = res.data.data.name;
          this.form.useSafe = res.data.data.personnelName;
          this.form.departmentId = res.data.data.id;
        }
      }

      // // console.log(this.form);
    },
    async aa() {
      for (var key in this.selects6) {
        if (this.editUserForm.useName == this.selects6[key].name) {
          const res = await this.$http.get(`/unit/${this.selects6[key].id}`);
          console.log(res);
          this.editUserForm.address = res.data.data.address;
          this.editUserForm.departmentId = res.data.data.id;
          this.editUserForm.code = res.data.data.code;
          this.editUserForm.postalCode = res.data.data.postalCode;
          this.editUserForm.initData = res.data.data.unitIssueTime;
          this.editUserForm.mobilePhone = res.data.data.unitPhone;
          this.editUserForm.telPhone = res.data.data.phone;
        }
      }
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },
    // 生成登记号
    async Registration() {
      let sheng = sessionStorage.getItem("provinceCode"); //省code
      let city = sessionStorage.getItem("cityCode"); //市code
      if (this.tyPe == 2) {
        console.log(city);
        if (
          this.form.sheng == "" ||
          this.form.city == "" ||
          this.form.equipmentCode == ""
        ) {
          this.$message({
            type: "error",
            message: "请先选择省市区和设备类型再试",
          });
        } else {
          const res = await this.$http.get(
            `/IDGenerate/create?city=${city}&equipmentCode=${this.form.equipmentCode}`
          );
          console.log(res);
          // $(".dengji").text(res.data);
          this.form.regId = res.data;
          console.log(this.form.regId);
        }
      } else if (this.tyPe == 1) {
        // console.log(1);
        console.log(this.form.sheng);
        console.log(this.form.city);
        if (
          this.form.sheng == "" ||
          this.form.city == "" ||
          this.form.equipmentCode == ""
        ) {
          this.$message({
            type: "error",
            message: "请先选择省市区和设备类型再试",
          });
        } else {
          const res = await this.$http.get(
            `/IDGenerate/create?city=${city}&equipmentCode=${this.form.equipmentCode}`
          );
          console.log(res);
          // $(".dengji").text(res.data);
          this.form.regId = res.data;
          console.log(this.form.regId);
        }
      } else if (this.tyPe == 0) {
        if (
          this.form.sheng == "" ||
          this.form.city == "" ||
          this.form.equipmentCode == ""
        ) {
          this.$message({
            type: "error",
            message: "请先选择省市区和设备类型再试",
          });
        } else {
          const res = await this.$http.get(
            `/IDGenerate/create?city=${this.form.city}&equipmentCode=${this.form.equipmentCode}`
          );
          console.log(res);
          // $(".dengji").text(res.data);
          this.form.regId = res.data;
          console.log(this.form.regId);
        }
      } else if (this.tyPe == 3) {
        if (
          this.form.sheng == "" ||
          this.form.city == "" ||
          this.form.equipmentCode == ""
        ) {
          this.$message({
            type: "error",
            message: "请先选择省市区和设备类型再试",
          });
        } else {
          const res = await this.$http.get(
            `/IDGenerate/create?city=${this.form.city}&equipmentCode=${this.form.equipmentCode}`
          );
          console.log(res);
          // $(".dengji").text(res.data);
          this.form.regId = res.data;
          console.log(this.form.regId);
        }
      }
    },

    // 保存文件
    savencftpget() {
      const regdata = this.fillDate.toString().slice(0, 10);
      const regdata2 = this.verifyDate.toString().slice(0, 10);

      // console.log(this.fillDate.slice(0,10));
      // console.log(this.verifyDate.slice(0,10));

      this.loadingbut = true;
      this.loadingbuttext = "加载中...";
      this.$http
        .post(
          `/word/word?id=${this.dengId}&creditCode=${this.dengform.creditCode}&sbAddress=${this.dengform.sbAddress}&post=${this.dengform.post}&mobilePhone=${this.dengform.mobilePhone}&userFill=${this.dengform.userFill}&fillDate=${regdata}&userSafePerson=${this.dengform.userSafePerson}&verifyDate=${regdata2}&certificationPerson=${this.dengform.certificationPerson}`
        )
        .then((res) => {
          console.log(res);
          if (res.data.code == 201) {
            this.$message({
              type: "warning",
              message: res.data.msg,
            });
            this.loadingbut = false;
            this.loadingbuttext = "保存登记证";
          } else if (res.data.code == 200) {
            this.$message({
              type: "success",
              message: res.data.msg,
            });
            this.codes = res.data.code;
            console.log(this.codes);
            this.url = res.data.data;
            // this.urls = res.data.data[1];
            this.loadingbut = false;
            this.loadingbuttext = "保存登记证";
            this.regId = this.dengform.regId;
          }
        });
    },
    // 下载world文档
    async ncftpget() {
      console.log(this.regId);
      const res = await this.$http
        .post(
          `/download/download/${this.regId}`,
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
            const fileName = "登记证打印模板.pdf";

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
    //预览pdf文件
    async previewFile() {
      if (this.codes == 200) {
        // this.pdfindex = true;
        window.open(this.url, "_blank");
      } else {
        this.$message({
          type: "error",
          message: "请先保存登记记再预览",
        });
      }
    },
    //登记证打印对话框打开
    async registrationAddUserDia(row) {
      console.log(row);
      // this.regId = row.regId;
      this.dengId = row.id;
      const ress = await this.$http.get(`word/showTable?&id=${this.dengId}`);
      console.log(ress);
      if ((ress.data.code = 200)) {
        this.dengform = ress.data.data;
        this.fillDate = ress.data.data.fillDate;
        this.verifyDate = ress.data.data.verifyDate;
      }
      this.dengdialogFormVisible = true;
      const res = await this.$http.get(`/unitdrop/select?bottleType=1`);
      this.selects6 = res.data.data;
      this.savencftpget();
    },
    // 省级区域显示
    // async provinceMessage() {

    // },

    //  市级
    async function2(val) {
      // this.options.map((s, index) => {
      //   if (s.name === val) {
      //     this.id = this.options[index].id;
      //     console.log(this.id);
      //   }
      // });
      this.code = val;
      this.form.city = "";
      this.form.country = "";
      this.editUserForm.city = "";
      this.editUserForm.country = "";
      this.dengform.city = "";
      this.dengform.country = "";
      const res = await this.$http.get(`/chinese/city/${this.code}`);
      console.log(res);
      this.level = res.data.data;
    },

    // 区域
    async function1(val) {
      // console.log(val);
      this.Idd = val;
      // this.level.map((s, index) => {
      //   if (s.code === val) {
      //     this.Idd = this.level[index].id;
      //   }
      // });
      const res = await this.$http.get(`/chinese/area/${this.Idd}`);
      console.log(res);
      this.levels = res.data.data;
    },

    // 查看信息
    async lookEdituser(user) {
      // console.log(userId);
      console.log(user);
      console.log(user.regId);

      // this.dialogTableVisible = true;
      this.$router.push({
        path: "/message",
        query: { id: user.id, regId: user.regId },
      });
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
        this.getUserlist();
      } else {
        this.$message({
          type: "danger",
          message: "修改失败",
        });
      }
    },

    // 编辑对话框打开
    async showEdituser(user) {
      console.log(user);
      // 2.添加对话框
      this.dialogFormVisibleEdit = true;

      this.editUserForm = user;
      const res = await this.$http.get(`/unitdrop/select?bottleType=1`);

      this.selects6 = res.data.data;
      this.getUserlist();
      //user其实就是scope.row也就是userlist
    },

    //   添加用户发送请求
    async AddUser() {
      console.log(this.form);
      // 2.关闭对话框
      this.$refs.form.validate(async (valid) => {
        console.log(this.form.equipmentCode);
        console.log(typeof this.form.equipmentCode);
        if ((typeof this.form.equipmentCode) === "string") {
          this.form.equipmentCode = this.form.equipmentCode;
          console.log(this.form.equipmentCode);
        } else {
          if (this.form.equipmentCode.length == 1) {
            this.form.equipmentCode = this.form.equipmentCode[0];
            console.log(this.form.equipmentCode);
          } else {
            this.form.equipmentCode = this.form.equipmentCode[1];
            console.log(this.form.equipmentCode);
          }
        }

        if (valid) {
          if (this.tyPe == 1) {
            this.form.sheng = sessionStorage.getItem("provinceCode"); //省code
            this.form.city = sessionStorage.getItem("cityCode"); //市code
            this.form.country = sessionStorage.getItem("country"); //区code
            const res = await this.$http.put(`/doucument/save`, this.form);
            // this.form.sheng="";
            // this.form.city="";
            if (res.data.code === 200) {
              // 回到第一页展示
              //this.pagenum = 1;
              // 重新请求数据
              // 提示
              this.$message({
                type: "success",
                message: res.data.msg,
              });
              this.dialogFormVisibleAdd = false;
              this.getUserlist();
              this.administrative();
            } else {
              this.$message({
                type: "error",
                message: res.data.msg,
              });
            }
          } else if (this.tyPe == 2) {
            this.form.sheng = sessionStorage.getItem("provinceCode"); //省code
            this.form.city = sessionStorage.getItem("cityCode"); //市code
            // this.form.areaCode = sessionStorage.getItem("areaCode"); //市code
            const res = await this.$http.put(`/doucument/save`, this.form);
            if (res.data.code === 200) {
              // 回到第一页展示
              //this.pagenum = 1;
              // 重新请求数据
              this.getUserlist();
              // 提示
              this.$message({
                type: "success",
                message: res.data.msg,
              });
              this.dialogFormVisibleAdd = false;
              this.getUserlist();
            } else {
              this.$message({
                type: "error",
                message: res.data.msg,
              });
            }
          } else if (this.tyPe == 3) {
            this.form.sheng = sessionStorage.getItem("provinceCode"); //省code
            // this.form.areaCode = sessionStorage.getItem("areaCode"); //市code
            const res = await this.$http.put(`/doucument/save`, this.form);
            if (res.data.code === 200) {
              // 回到第一页展示
              //this.pagenum = 1;
              // 重新请求数据
              this.getUserlist();
              // 提示
              this.$message({
                type: "success",
                message: res.data.msg,
              });
              this.dialogFormVisibleAdd = false;
              this.getUserlist();
            } else {
              this.$message({
                type: "error",
                message: res.data.msg,
              });
            }
          } else if (this.tyPe == 0) {
            const res = await this.$http.put(`/doucument/save`, this.form);
            if (res.data.code === 200) {
              // 回到第一页展示
              //this.pagenum = 1;
              // 重新请求数据
              this.getUserlist();
              // 提示
              this.$message({
                type: "success",
                message: res.data.msg,
              });
              this.dialogFormVisibleAdd = false;
              this.getUserlist();
            } else {
              this.$message({
                type: "error",
                message: res.data.msg,
              });
            }
          }
        } else {
          this.$message({
            type: "error",
            message: "请填写内容再试",
          });
          this.dialogFormVisibleAdd = true;
        }
      });
    },
    // 添加用户显示对话框
    async showAddUserDia() {
      // 先点编辑 再点添加 打开表单清空表单
      // this.form = {};
      this.form.postalCode = "";
      this.dialogFormVisibleAdd = true;

      const ress = await this.$http.get(`/unitdrop/show`);
      this.sss();
      this.shi();
      this.form.cretificationDate = ress.data.data.cretificationDate;
      this.form.certificationPerson = ress.data.data.certificationPerson;
      this.form.certification = ress.data.data.certification;
    },
    //清空搜索框搜索数据 点击清楚按钮清除数据重新发送请求
    loadUserList() {
      this.getUserlist();
    },
    //行政区划的获取
    async administrative() {
      const res = await this.$http.get(`/drop/liquefied`);
      console.log(res);
      this.division = res.data.data;
    },
    // 搜索用户 给搜索框绑定query v-model="query"
    async searchUser() {
      const res = await this.$http.get(
        `/doucument/select/all?unitName=${this.unitName}&pageSize=${this.pageSize}&currpage=1&certification=${this.certification}&regId=${this.regId}&sheng=${this.sheng}`
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
      this.getUserlist();
    },
    handleCurrentChange(val) {
      //页码改变时
      console.log(`当前页: ${val}`);
      this.currpage = val;
      this.getUserlist();
    },
    async getUserlist() {
      const ress = await this.$http.get(`/chinese/address`);
      console.log(ress);
      this.tyPe = ress.data.data.type; //type
      console.log(this.tyPe);
      if (ress.data.data.type == 2) {
        sessionStorage.setItem("provinceCode", ress.data.data.provinceCode);
        sessionStorage.setItem("cityCode", ress.data.data.cityCode);
        sessionStorage.setItem("sheng", ress.data.data.province);
        sessionStorage.setItem("city", ress.data.data.city);
        // this.codes = res.data.data.provinceCode; //省code
        this.form.sheng = ress.data.data.province; //省表单name
        this.forma.provinceCode = ress.data.data.province;
        this.forms.provinceCode = ress.data.data.province;
        this.form.city = ress.data.data.city; //市表单name
        this.forma.cityCode = ress.data.data.city;
        this.forms.cityCode = ress.data.data.city;
        this.levels = ress.data.data.area; //区数组

        this.showCmd = true;
        this.showCmds = false;
        this.showCmd_1 = true;
      } else if (ress.data.data.type == 1) {
        sessionStorage.setItem("provinceCode", ress.data.data.provinceCode);
        sessionStorage.setItem("cityCode", ress.data.data.cityCode);
        sessionStorage.setItem("areaCode", ress.data.data.areaCode);
        sessionStorage.setItem("sheng", ress.data.data.province);
        sessionStorage.setItem("city", ress.data.data.city);
        sessionStorage.setItem("country", ress.data.data.area);
        // this.codes = res.data.data.provinceCode; //省code
        this.form.sheng = ress.data.data.province; //省表单name
        this.forma.provinceCode = ress.data.data.province;
        this.forms.provinceCode = ress.data.data.province;
        this.form.city = ress.data.data.city; //市表单name
        this.forma.cityCode = ress.data.data.city;
        this.forms.cityCode = ress.data.data.city;
        this.form.country = ress.data.data.area; //区name
        this.forma.areaCode = ress.data.data.area;
        this.forms.areaCode = ress.data.data.area;
        this.showCmd = true;
        this.showCmds = true;
        this.showCmd_1 = true;
      } else if (ress.data.data.type == 0) {
        this.options = ress.data.data.provinces;
        this.showCmd = false;
        this.showCmds = false;
        this.showCmd_1 = false;
      } else if (ress.data.data.type == 3) {
        //省监管
        sessionStorage.setItem("provinceCode", ress.data.data.provinceCode);
        sessionStorage.setItem("sheng", ress.data.data.province);
        this.provinceCode = ress.data.data.province; //省搜索name
        // this.codes = ress.data.data.provinceCode; //省code
        this.form.sheng = ress.data.data.province; //省表单name
        this.forma.provinceCode = ress.data.data.province;
        this.forms.provinceCode = ress.data.data.province;
        this.level = ress.data.data.city; //市数组
        // this.AreaId = res.data.data.area; //区数组
        //
        this.showCmds = false; //区按钮
        this.showCmd = true; //省按钮
        this.showCmd_1 = false; //市按钮
      }
      //需要授权的API ，必须在请求头中使用Authorization 字段token令牌
      //pagenum当前页面   pagesize每页显示条数
      //接口文档中 除了登录接口之外的所有请求都需要进行授权，设置请求头
      //找axios中关于请求头的代码  写在了http.js中
      // const AUTH_TOKEN = localStorage.getItem("token");
      // this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;
      const res = await this.$http.get(
        `/doucument/select/all?unitName=${this.unitName}&pageSize=${this.pageSize}&currpage=${this.currpage}&certification=${this.certification}&regId=${this.regId}&sheng=${this.sheng}`
      );

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
  created() {
    this.getUserlist();
    // this.provinceMessage();
    this.administrative();
    this.form.regType = this.selects3[0].orders;
    this.form.productName = this.selects5[1].orders;
    // this.Municipal();
    // this.Municipals();
  },
  //   弹框组件
  // components:{
  //    Message
  // }
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
.imgs {
  text-align: center;
}
[class*="el-col-"] {
  margin-top: 7px;
}
</style>
<style>
.el-table td,
.el-table th {
  text-align: center !important;
}
.el-table .warning-row {
  background: rgb(250, 249, 249) !important;
}

.el-table .success-row {
  background: rgb(250, 249, 249) !important;
}
</style>
<style>
.red_s label {
  color: #f00 !important;
}
</style>