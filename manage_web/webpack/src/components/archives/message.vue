<template>
  <div>
    <div style="background: white; width: 99.1%; padding-left: 15px">
      <my-bread level1="气瓶登记" level2="液化气瓶信息查看"></my-bread>
    </div>
    <el-card class="box-card" style="margin: 20px 20px 0 20px">
      <!-- 面包屑 -->
      <!-- <el-breadcrumb separator-class="el-icon-arrow-right " class="arrow_right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
        <a href="/">用户管理</a>
      </el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      </el-breadcrumb>-->

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
          <el-col :span="4">
            <el-input
              size="small"
              style="width: 100%"
              @clear="loadUserList()"
              clearable
              class="input-serach"
              placeholder="请输入产品编号"
              v-model="gasId"
            ></el-input>
          </el-col>
          <el-col style="margin-left: 30px" :span="4">
            <el-select
              size="small"
              style="width: 80%"
              @clear="loadUserList()"
              clearable
              v-model="status"
              placeholder="请选择气瓶状态"
            >
              <el-option
                v-for="item in optionsse"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-col>
          <el-col style="margin-left: 30px" :span="4">
            <el-button
              size="small"
              style="width: 100%"
              @click="searchUser()"
              class="el_button"
              icon="el-icon-search"
              >搜索</el-button
            >
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

      <el-col style="margin-bottom: 5px; margin-top: 5px" :span="24">
        <el-col :span="11">&nbsp;</el-col>
        <el-col :span="2">
          <el-button
            type="success"
            style="font-size: 13px"
            size="small"
            @click="showAddUserDia()"
          >
            <i style="padding-right: 10px" class="el-icon-plus"></i>新&nbsp;增
          </el-button>
        </el-col>

        <el-col :span="2">
          <el-button
            type="info"
            size="small"
            style="margin-left: -5px; font-size: 13px"
            @click="firstAddUserDia()"
          >
            <i style="padding-right: 10px" class="el-icon-top"></i>返回上一界面
          </el-button>
        </el-col>

        <el-col :span="2" style="margin-left: 20px">
          <el-button
            type="success"
            plain
            size="small"
            style="font-size: 13px"
            @click="downTemplate()"
          >
            <i style="padding-right: 10px" class="el-icon-download"></i
            >下载excel模板
          </el-button>
        </el-col>
        <el-col :span="3" style="margin-left: 45px">
          <el-upload
            class="upload-demo"
            style="margin-left: 20px"
            action
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            :on-preview="handlePreviews"
            :on-remove="handleRemove"
            :http-request="uploadFile"
            multiple
            :limit="1"
          >
            <el-button
              type="success"
              plain
              size="small"
              style="font-size: 13px"
            >
              <i style="padding-right: 10px" class="el-icon-upload2"></i
              >点击数据批量上传
            </el-button>
            <!-- <div slot="tip" class="el-upload__tip">只能上传Excel文件</div> -->
          </el-upload>
        </el-col>
        <el-col :span="2" style="margin-left: 20px">
          <el-button
            type="danger"
            size="small"
            plain
            style="font-size: 13px"
            icon="el-icon-delete"
            @click="showDeleUserMsgBox"
            >批量删除</el-button
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
          style="width: 100%; margin: 20px 0px; padding-bottom: 40px"
          @selection-change="handleCurrentChanges"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column
            type="index"
            label="序号"
            width="70"
            show-overflow-tooltip
          >
            <template slot-scope="socpe">
              <p style="cursor: pointer" @click="showEdituser(socpe.row)">
                {{ socpe.$index + 1 }}
              </p>
            </template>
          </el-table-column>
          <!-- <el-table-column type="index" label="序号" width="70"></el-table-column> -->
          <el-table-column
            show-overflow-tooltip
            prop="equType"
            label="设备类型"
          ></el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="medium"
            label="充装介质"
          ></el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="gasId"
            label="产品编号"
          ></el-table-column>

          <el-table-column
            show-overflow-tooltip
            prop="makeInfo"
            label="生产(制造)单位"
          ></el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="makeData"
            label="制造年月"
          >
            <template slot-scope="socpe">{{
              socpe.row.makeData | fmtdate
            }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="pressure"
            label="公称工作压力（MPa）"
          ></el-table-column>

          <el-table-column
            show-overflow-tooltip
            prop="volume"
            label="容积（L）"
          ></el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="checkData"
            label="最近一次检验日期"
            width="100"
          >
            <template slot-scope="socpe">{{
              socpe.row.checkData | fmtdate
            }}</template>
          </el-table-column>

          <el-table-column
            show-overflow-tooltip
            prop="nextCheckData"
            label="下次检验日期"
          >
            <template slot-scope="socpe">{{
              socpe.row.nextCheckData | fmtdate
            }}</template>
          </el-table-column>

          <el-table-column
            show-overflow-tooltip
            prop="selfId"
            label="单位内编号"
          ></el-table-column>

          <el-table-column
            show-overflow-tooltip
            prop="changeStatus"
            label="变更或者停用情况"
          >
            <template slot-scope="scope">
              <p v-if="userlist[scope.$index].changeStatus == 1">新增</p>
              <p v-if="userlist[scope.$index].changeStatus == 0">停用</p>
              <p v-if="userlist[scope.$index].changeStatus == 2">注销</p>
              <p v-if="userlist[scope.$index].changeStatus == 3">报废</p>
            </template>
          </el-table-column>
          <el-table-column
            prop="address"
            fixed="right"
            width="80"
            label="操 作"
          >
            <template slot-scope="scope">
              <!-- 查看信息 -->
              <el-tooltip
                class="item"
                effect="dark"
                content="保险信息修改查看"
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
            </template>
          </el-table-column>
          <!-- <el-table-column label="用户状态">
          <template slot-scope="socpe">-->
          <!-- 找到开关@change="changeMgStatus(scope.row)" -->
          <!-- changeMgStatus  发送put请求 -->
          <!-- users/:uId/state/:type uid用户id -->
          <!-- <el-switch
              @change="changeMgStatus(socpe.row)"
              v-model="socpe.row.mg_state"
              active-color="#13ce66"
              inactive-color="#ff4949"
            ></el-switch>
          </template>
          </el-table-column>-->
        </el-table>
      </template>
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

      <el-dialog title="补卡" :visible.sync="dialogFormVisibleCard">
        <p style="text-align: center">
          <el-button @click="dialogFormVisibleCard = false">取消补卡</el-button>
          <el-button type="primary" @click="EditCard()">确认补卡</el-button>
        </p>
      </el-dialog>
      <!-- 对话框 -->
      <!-- 添加对话框 -->
      <el-dialog
        width="60%"
        title="添加信息"
        :visible.sync="dialogFormVisibleAdd"
      >
        <el-form :model="form" :rules="ruless" ref="form">
          <el-col :span="24">
            <el-col :span="12">
              <el-form-item
                class="red_s"
                label="设备类型"
                label-width="140px"
                prop="equType"
              >
                <el-select style="width: 100%" v-model="form.equType">
                  <el-option
                    v-for="item in selects1"
                    :key="item.id"
                    :label="item.orders"
                    :value="item.orders"
                  ></el-option>
                </el-select>
                <!-- <el-input v-model="editUserForm.equType" autocomplete="off"></el-input> -->
                <!-- disabled实现用户名禁止改动 -->
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                class="red_s"
                label="充装介质"
                label-width="140px"
                prop="medium"
              >
                <el-select style="width: 100%" v-model="form.medium">
                  <el-option
                    v-for="item in selects2"
                    :key="item.id"
                    :label="item.orders"
                    :value="item.orders"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="12">
              <el-form-item
                class="red_s"
                label="产品编号"
                label-width="140px"
                prop="gasId"
              >
                <el-input v-model="form.gasId" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                class="red_s"
                label="制造年月"
                label-width="140px"
                prop="makeData"
              >
                <!-- <el-input v-model="form.makeData" autocomplete="off"></el-input> -->
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="form.makeData"
                  style="width: 100%"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="12">
              <el-form-item
                class="red_s"
                label="公称工作压力（MPa）"
                label-width="140px"
                prop="pressure"
              >
                <el-input v-model="form.pressure" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                class="red_s"
                label="容积（L）"
                label-width="140px"
                prop="volume"
              >
                <el-input v-model="form.volume" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="12">
              <el-form-item
                class="red_s"
                label="最近一次检验日期"
                label-width="140px"
                prop="checkData"
              >
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="form.checkData"
                  style="width: 100%"
                  :picker-options="pickerOptions2"
                ></el-date-picker>
                <!-- <el-input v-model="form.checkData" autocomplete="off"></el-input> -->
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                class="red_s"
                label="下次检验日期"
                label-width="140px"
                prop="nextCheckData"
              >
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="form.nextCheckData"
                  style="width: 100%"
                  :picker-options="pickerOptions3"
                ></el-date-picker>
                <!-- <el-input v-model="form.nextCheckData" autocomplete="off"></el-input> -->
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="12">
              <el-form-item
                class="red_s"
                label="单位内编号"
                label-width="140px"
              >
                <el-input v-model="form.selfId" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                class="red_s"
                label="变更或者停用情况"
                label-width="140px"
                prop="changeStatus"
              >
                <el-select
                  style="width: 100%"
                  :validate-event="false"
                  v-model="form.changeStatus"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="(item, i) in options"
                    :key="i"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="12">
              <el-form-item
                class="red_s"
                label="生产(制造)单位"
                label-width="140px"
                prop="makeInfo"
              >
                <el-input v-model="form.makeInfo" autocomplete="off"></el-input>
                <!-- <el-select style=" width: 100%" v-model="form.makeInfo">
                  <el-option
                    v-for="item in selecttion"
                    :key="item.id"
                    :label="item.name"
                    :value="item.name"
                  ></el-option>
                </el-select>-->
              </el-form-item>
            </el-col>
            <el-col :span="9">
              <el-form-item
                class="red_s"
                label="设备代码:"
                label-width="140px"
                prop="sbCode"
              >
                <el-input v-model="form.sbCode" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-button
                style="margin-left: 5px; margin-right: 5px; widht: 60px"
                @click="Regtion()"
                type="primary"
                >生成设备代码</el-button
              >
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
        width="60%"
        title="修改信息"
        :visible.sync="dialogFormVisibleEdit"
      >
        <el-form :model="editUserForm" :rules="ruless">
          <el-form-item hidden label="ID" label-width="140px" prop="equType">
            <el-input v-model="editUserForm.id" autocomplete="off"></el-input>
            <!-- disabled实现用户名禁止改动 -->
          </el-form-item>
          <el-col :span="24">
            <el-col :span="12">
              <el-form-item label="设备类型" label-width="140px" prop="equType">
                <el-select style="width: 100%" v-model="editUserForm.equType">
                  <el-option
                    v-for="item in selects1"
                    :key="item.id"
                    :label="item.orders"
                    :value="item.orders"
                  ></el-option>
                </el-select>
                <!-- <el-input v-model="editUserForm.equType" autocomplete="off"></el-input> -->
                <!-- disabled实现用户名禁止改动 -->
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="充装介质" label-width="140px" prop="medium">
                <el-select style="width: 100%" v-model="editUserForm.medium">
                  <el-option
                    v-for="item in selects2"
                    :key="item.id"
                    :label="item.orders"
                    :value="item.orders"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="12">
              <el-form-item label="产品编号" label-width="140px" prop="gasId">
                <el-input
                  v-model="editUserForm.gasId"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="制造年月"
                label-width="140px"
                prop="makeData"
              >
                <!-- <el-input v-model="form.makeData" autocomplete="off"></el-input> -->
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="editUserForm.makeData"
                  style="width: 100%"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="12">
              <el-form-item
                label="公称工作压力（MPa）"
                label-width="140px"
                prop="pressure"
              >
                <el-input
                  v-model="editUserForm.pressure"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="容积（L）" label-width="140px" prop="volume">
                <el-input
                  v-model="editUserForm.volume"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="12">
              <el-form-item
                label="最近一次检验日期"
                label-width="140px"
                prop="checkData"
              >
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="editUserForm.checkData"
                  style="width: 100%"
                  :picker-options="pickerOptions2"
                ></el-date-picker>
                <!-- <el-input v-model="form.checkData" autocomplete="off"></el-input> -->
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="下次检验日期"
                label-width="140px"
                prop="nextCheckData"
              >
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="editUserForm.nextCheckData"
                  style="width: 100%"
                  :picker-options="pickerOptions3"
                ></el-date-picker>
                <!-- <el-input v-model="form.nextCheckData" autocomplete="off"></el-input> -->
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="12">
              <el-form-item label="单位内编号" label-width="140px">
                <el-input
                  v-model="editUserForm.selfId"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="变更或者停用情况"
                label-width="140px"
                prop="changeStatus"
              >
                <el-select
                  style="width: 100%"
                  :validate-event="false"
                  v-model="editUserForm.changeStatus"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="(item, i) in options"
                    :key="i"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="12">
              <el-form-item
                label="生产(制造)单位"
                label-width="140px"
                prop="makeInfo"
              >
                <el-select style="width: 100%" v-model="editUserForm.makeInfo">
                  <el-option
                    v-for="item in selecttion"
                    :key="item.id"
                    :label="item.name"
                    :value="item.name"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="9">
              <el-form-item label="设备代码:" label-width="140px" prop="sbCode">
                <el-input
                  v-model="editUserForm.sbCode"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-button
                style="margin-left: 5px; margin-right: 5px; widht: 60px"
                @click="Regtions()"
                type="primary"
                >生成设备代码</el-button
              >
            </el-col>
          </el-col>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
          <el-button type="primary" @click="EditUser()">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 查看对话框 -->
      <el-dialog
        width="60%"
        title="查看修改信息"
        :visible.sync="dialogFormVisibleAddsd"
      >
        <el-form :model="formls" :rules="ruless" ref="formls">
          <el-col :span="24">
            <el-col :span="12">
              <el-form-item
                class="red_s"
                label="保险档案编号"
                label-width="140px"
                prop="insuranceId"
              >
                <el-input v-model="formls.insuranceId" autocomplete="off"></el-input>
                <!-- <el-input v-model="editUserForm.equType" autocomplete="off"></el-input> -->
                <!-- disabled实现用户名禁止改动 -->
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                class="red_s"
                label="保险单位"
                label-width="140px"
                prop="insuranceUnit"
              >
                <el-input v-model="formls.insuranceUnit" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="12">
              <el-form-item
                class="red_s"
                label="保险公司社会信用代码"
                label-width="140px"
                prop="insuranceCode"
              >
                <el-input v-model="formls.insuranceCode" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                class="red_s"
                label="保险险种"
                label-width="140px"
                prop="insuranceType"
              >
                <!-- <el-input v-model="form.makeData" autocomplete="off"></el-input> -->
                <el-input v-model="formls.insuranceType" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="12">
              <el-form-item
                class="red_s"
                label="保险金额"
                label-width="140px"
                prop="insuranceMoney"
              >
                <el-input v-model="formls.insuranceMoney" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                class="red_s"
                label="保险价值"
                label-width="140px"
                prop="insuranceValue"
              >
                <el-input v-model="formls.insuranceValue" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="12">
              <el-form-item
                class="red_s"
                label="保险时间"
                label-width="140px"
                prop="insuranceTime"
              >
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="formls.insuranceTime"
                  style="width: 100%"
                  :picker-options="pickerOptions2"
                ></el-date-picker>
                <!-- <el-input v-model="form.checkData" autocomplete="off"></el-input> -->
              </el-form-item>
            </el-col>
          </el-col>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibleAddsd = false">取 消</el-button>
          <el-button type="primary" @click="AddUsersa()">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
export default {
  name: "message",
  data() {
    return {
      pickerOptions0: {
        disabledDate: (time) => {
          if (this.form.nextCheckData != "") {
            return time.getTime() > new Date(this.form.nextCheckData).getTime();
          }
        },
      },
      pickerOptions1: {
        disabledDate: (time) => {
          return (
            time.getTime() <
            new Date(this.form.checkData).getTime() + 1 * 24 * 60 * 60 * 1000
          ); //减去一天的时间代表可以选择同一天;
        },
      },
      pickerOptions2: {
        disabledDate: (time) => {
          if (this.editUserForm.nextCheckData != "") {
            return (
              time.getTime() >
              new Date(this.editUserForm.nextCheckData).getTime()
            );
          }
        },
      },
      pickerOptions3: {
        disabledDate: (time) => {
          return (
            time.getTime() <
            new Date(this.editUserForm.checkData).getTime() +
              1 * 24 * 60 * 60 * 1000
          ); //减去一天的时间代表可以选择同一天;
        },
      },
      userlist: [],
      gasId: "",
      //分页相关数据
      total: -1,
      status: "",
      selecttion: [],
      currpage: 1,
      pageSize: 10,
      xiazai: "",
      dengji: "",
      loadingbuttext: "气瓶信息批量下载",
      loadingbut: false, //审核提交加载中
      // id:1,
      // 添加对话框的属性
      dialogFormVisibleAdd: false,
      dialogFormVisibleEdit: false,
      Cardissuingdialogbox: false,
      dialogFormVisibleCard: false,
      dialogFormVisibleAddsd: false,

      selects1: [
        {
          id: 1,
          orders: "特种气瓶",
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
      // dialogFormVisibleRoleshow: false,
      //添加用户的表单的数据
      form: {
        regId: "",
        equType: "",
        medium: "",
        gasId: "",
        makeInfo: "",
        makeData: "",
        pressure: "",
        volume: "",
        checkData: "",
        nextCheckData: "",
        selfId: "",
        changeStatus: 1,
        sbCode: "",
      },
      formls: {
        gasId:'',
        insuranceId: "", //保险气瓶唯一编号
        insuranceUnit: "", //保险单位
        insuranceCode: "", //保险公司社会信用代码
        insuranceType: "", //保险险种
        insuranceMoney: "", //保险金额
        insuranceValue: "", //保险价值
        insuranceTime: "", // 保险时间
      },
      // 编辑
      editUserForm: {
        id: "",
        equType: "",
        medium: "",
        gasId: "",
        makeInfo: "",
        makeData: "",
        pressure: "",
        volume: "",
        checkData: "",
        nextCheckData: "",
        selfId: "",
        changeStatus: "",
        sbCode: "",
      },
      options: [
        { id: 0, name: "停用" },
        { id: 1, name: "新增" },
        { id: 2, name: "注销" },
        { id: 3, name: "报废" },
      ],
      optionsse: [
        { id: 1, name: "合格" },
        { id: 0, name: "不合格" },
        { id: 2, name: "超期未检" },
        { id: 3, name: "即将超期" },
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
      ids: -1,
      ruless: {
        equType: [
          { required: true, message: "设备类型不能为空", trigger: "blur" },
        ],
        insuranceId: [
          { required: true, message: "保险气瓶唯一编号不能为空", trigger: "blur" },
        ],
        insuranceUnit: [
          { required: true, message: "保险单位不能为空", trigger: "blur" },
        ],
        insuranceCode: [
          { required: true, message: "保险公司社会信用代码不能为空", trigger: "blur" },
        ],
        insuranceType: [
          { required: true, message: "保险险种不能为空", trigger: "blur" },
        ],
        insuranceMoney: [
          { required: true, message: "保险金额不能为空", trigger: "blur" },
        ],
        insuranceValue: [
          { required: true, message: "保险价值不能为空", trigger: "blur" },
        ],
        insuranceTime: [
          { required: true, message: "保险时间不能为空", trigger: "blur" },
        ],
        

        medium: [{ required: true, message: "介质不能为空", trigger: "blur" }],
        gasId: [{ required: true, message: "气瓶号不能为空", trigger: "blur" }],
        makeInfo: [
          { required: true, message: "生产厂家不能为空", trigger: "blur" },
        ],
        makeData: [
          {
            type: "date",
            required: true,
            message: "生产日期不能为空",
            trigger: "blur",
          },
        ],
        pressure: [
          { required: true, message: "气瓶公称压力不能为空", trigger: "blur" },
          {
            pattern: /^[0-9].*$/,
            message: "请输入正确的气瓶公称压力单位",
          },
        ],
        volume: [
          { required: true, message: "容积不能为空", trigger: "blur" },
          {
            pattern: /^[0-9].*$/,
            message: "请输入正确的容积单位",
          },
        ],
        checkData: [
          {
            type: "date",
            required: true,
            message: "检查日期不能为空",
            trigger: "blur",
          },
        ],
        nextCheckData: [
          {
            type: "date",
            required: true,
            message: "下次检查日期时间不能为空",
            trigger: "blur",
          },
        ],
        selfId: [
          { required: true, message: "单位内编号不能为空", trigger: "blur" },
        ],

        changeStatus: [
          { required: true, message: "停用情况", trigger: "blur" },
        ],
      },
      roles: [],
      currUsername: "",
      file: {},
      multipleSelection: [], //批量删除数据
      delarr: [], //批量删除id

      //   保存所有角色数据
    };
  },
  created() {
    this.getUserlist();
  },
  watch: {
    dialogFormVisibleAdd: function (val, oldVla) {
      this.$refs["form"].resetFields();
    },
    dialogFormVisibleAddsd: function (val, oldVla) {
      this.$refs["formls"].resetFields();
    },
  },
  methods: {
  async  AddUsersa(){
      this.$refs.formls.validate(async (valid) => {
        if (valid) {
          // 向后台发送请求
          const res = await this.$http.post(`insurance`, this.formls);
          console.log(res);
          if (res.data.code === 0) {
            // 回到第一页展示
            //this.pagenum = 1;
            // 重新请求数据
            // 提示
            this.$message({
              type: "success",
              message: res.data.msg,
            });
            this.getUserlist();
            this.dialogFormVisibleAddsd = false;
          } else {
            this.$message({
              type: "error",
              message: res.data.msg,
            });
            this.getUserlist();
          }
        } else {
          this.$message({
            type: "error",
            message: "请填写内容再试",
          });
          this.dialogFormVisibleAddsd = true;
        }
      });
    },
    async lookEdituser(user) {
      console.log(user); 
      const res=await this.$http.get(`insurance/show?gasId=${user.gasId}`);
      console.log(res);
      this.formls=res.data.data;
      this.formls.gasId=user.gasId;
       console.log(this.formls.gasId);
      this.dialogFormVisibleAddsd = true;
    },
    async Regtion() {
      let regId = this.$route.query.regId;
      console.log(this.form.makeData);
      if (this.form.makeData == "") {
        this.$message({
          type: "error",
          message: "请先填写制造日期",
        });
      } else {
        const data =
          this.form.makeData.getFullYear() +
          "-" +
          0 +
          (this.form.makeData.getMonth() + 1) +
          "-" +
          this.form.makeData.getDate();
        // let data=new Date(this.last.makeData).toLocaleDateString().replace(/\//g, '-')
        const res = await this.$http.get(
          `IDGenerate/CylinderCode?regId=${regId}&makeData=${data}`
        );
        console.log(res);
        this.form.sbCode = res.data;
      }
    },
    async Regtions() {
      let regId = this.$route.query.regId;
      console.log(this.editUserForm.makeData);
      if (this.editUserForm.makeData == "") {
        this.$message({
          type: "error",
          message: "请先填写制造日期",
        });
      } else {
        const data =
          this.editUserForm.makeData.getFullYear() +
          "-" +
          0 +
          (this.editUserForm.makeData.getMonth() + 1) +
          "-" +
          this.editUserForm.makeData.getDate();
        // let data=new Date(this.last.makeData).toLocaleDateString().replace(/\//g, '-')
        const res = await this.$http.get(
          `IDGenerate/CylinderCode?regId=${regId}&makeData=${data}`
        );
        console.log(res);
        this.editUserForm.sbCode = res.data;
      }
    },
    // 发卡发送请求
    async Confirmhairpin() {
      //   users/:id
      this.Cardissuingdialogbox = false;
      const res = await this.$http.get(
        `http://192.168.0.126:8081/send/card?id=${this.userId}`
      );
      console.log(res);
      if (res.data.code == 201) {
        this.$message({
          type: "error",
          message: res.data.msg,
        });
      } else if (res.data.code == 200) {
        this.$message({
          type: "success",
          message: res.data.msg,
        });
        this.getUserlist();
      }
    },
    // 发卡对话框打开
    async hairpin(userId) {
      // 2.添加对话框
      console.log(userId);
      this.userId = userId;
      this.Cardissuingdialogbox = true;
      const res = await this.$http.post(`/send/tuckComb`);
      console.log(res);
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
            const res = await this.$http.post(`/cylinder/delete`, this.delarr);
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
    ifendcases(val) {
      if (val.changeStatus == 0) {
        return "合格";
      } else {
        return "不合格";
      }
    },
    //`/ma/file/template/analysis?id=${this.id}`
    //上传excel
    uploadFile(item) {
      let file = item.file;
      console.log(file);
      let blod = new Blob([file]);
      let file1 = new File([blod], file.name, { type: file.type });
      let form = new FormData();
      form.append("file", file1);
      this.$http({
        method: "post",
        url: `/file/template/analysis?id=${this.ids}`,
        data: form,
        headers: {
          "Content-Type": "multipart/form-data",
          //  Authorization: localStorage.getItem("access_token")
        },
      }).then((res) => {
        console.log(res);
        if (res.data.code == 0) {
          this.$message({
            type: "success",
            message: "上传成功",
          });
          this.getUserlist();
        } else {
          this.$message({
            type: "error",
            message: res.data.msg,
          });
          this.getUserlist();
        }
        // 提示
      });
    },

    //下载模板
    downTemplate() {
      this.$http
        .post(
          `/file/template/download`,
          { headers: "application/x-download" },
          { responseType: "blob" }
        )
        .then((response) => {
          console.log(response);
          console.log(response.data);
          const blob = new Blob([response.data], {
            type: "application/vnd.ms-excel",
          });
          const fileName = "气瓶基本信息导入模板.xlsx";

          const elink = document.createElement("a");

          elink.download = fileName;

          elink.style.display = "none";

          elink.href = URL.createObjectURL(blob);

          document.body.appendChild(elink);

          elink.click();

          URL.revokeObjectURL(elink.href); // 释放URL 对象
          document.body.removeChild(elink);

          //  const url = URL.createObjectURL(blob);
          //   window.location.href = url;
          //  window.location.href = response.data;
        })
        .catch((err) => {
          //         _toastr.error(err)
        });
    },

    //生成一个文档

    firstAddUserDia() {
      this.$router.push({ name: "cylinder" });
    },
    // 编辑用户
    // 编辑用户发送请求
    async EditUser() {
      //   users/:id
      this.dialogFormVisibleEdit = false;
      const res = await this.$http.post(`/cylinder/update`, this.editUserForm);
      console.log(res);
      if (res.data.code === 200) {
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
          type: "error",
          message: res.data.msg,
        });
      }
      //  const { data: res } = await this.$http.get(`users/` + id)
      // if (res.data.meta.status !== 200) {
      //   return this.$message.error("查询用户信息失败！");
      // }
    },

    // 编辑对话框打开
    async showEdituser(user) {
      // 2.添加对话框
      this.dialogFormVisibleEdit = true;
      const res = await this.$http.get(`unitdrop/manufacturer?bottleType=1`);
      console.log(res);
      this.selecttion = res.data.data;
      this.editUserForm = user;
      //user其实就是scope.row也就是userlist
    },

    //删除用户 打开消息盒子

    // file形参里面相关操作的文件
    handlePreviews(file) {
      console.log(file);

      // this.picPreviewPath = file.response.data.url;
      // this.previewDialogVisible = true;
    },
    handleRemove(file) {
      console.log(file);

      // 1.获取将要删除图片的临时路径
      // const filePath = file.response.data.tmp_path;
      // 2.从pics数组中，找到图片对应的索引值
      // const i = this.addForm.pics.findIndex(x => x.pic === filePath);
      // 3.调用splice方法，移除图片信息
      // this.addForm.splice(i, 1);
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
      console.log(response);

      // 1.拼接得到一个图片信息对象 临时路径
      // const picInfo = { pic: response.data.tmp_path };
      // 2.将图片信息对象，push到pics数组中
      // this.addForm.pics.push(picInfo);
      // file.data.tem_path 图片临时上传的路径
      //console.log("成功");
      //   this.form.pics.push({
      //     pic: file.data.tep_path
      //   });
      //console.log(file);
    },

    //   添加用户发送请求
    async AddUser() {
      // 2.关闭对话框
      console.log(this.form);

      this.$refs.form.validate(async (valid) => {
        if (valid) {
          // 向后台发送请求
          const res = await this.$http.put(`cylinder/save`, this.form);
          if (res.data.code === 200) {
            // 回到第一页展示
            //this.pagenum = 1;
            // 重新请求数据
            // 提示
            this.$message({
              type: "success",
              message: res.data.msg,
            });
            this.getUserlist();
            this.dialogFormVisibleAdd = false;
          } else {
            this.$message({
              type: "error",
              message: res.data.msg,
            });
            this.getUserlist();
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
      this.dialogFormVisibleAdd = true;
      const res = await this.$http.get(`unitdrop/manufacturer?bottleType=1`);
      console.log(res);
      this.selecttion = res.data.data;
      this.form.regId = this.ids;
      this.form.equType = this.selects1[2].orders;
      this.form.medium = this.selects2[2].orders;

      // const res = await this.$http.get(`/carCylinder/save?id=${this.ids}`);
      // console.log(res);
    },
    //清空搜索框搜索数据 点击清楚按钮清除数据重新发送请求
    loadUserList() {
      this.getUserlist();
    },
    // 搜索用户 给搜索框绑定query v-model="query"
    async searchUser() {
      const res = await this.$http.get(
        `cylinder/selectIdByAll?id=${this.dengji}&pageSize=${this.pageSize}&currpage=1&gasId=${this.gasId}&status=${this.status}`
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

    getUserlist() {
      this.ids = this.$route.query.id;
      this.dengji = this.$route.query.regId;
      console.log(this.ids);
      this.$http
        .get(
          `cylinder/selectIdByAll?id=${this.dengji}&pageSize=${this.pageSize}&currpage=${this.currpage}&gasId=${this.gasId}&status=${this.status}`
        )
        .then((res) => {
          console.log(res);
          this.userlist = res.data.data.list;
          this.total = res.data.data.totalCount;
        });
    },
  },
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
[class*="el-col-"] {
  margin-top: 5px;
}
</style>
<style>
.el-table td,
.el-table th {
  text-align: center !important;
}
.red_s label {
  color: #f00 !important;
}
</style>