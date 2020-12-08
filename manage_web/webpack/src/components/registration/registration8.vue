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
                :disabled="showCmd"
                size="small"
                style=" width: 100%;"
                @clear="loadUserList()"
                clearable
                v-model="provinceCode"
                @change="function2(provinceCode)"
                placeholder="请选择省份"
              >
                <el-option
                  v-for="item in ProvinceId"
                  :key="item.id"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-col>
            <el-col style="margin-left:30px" :span="4">
              <el-select
                size="small"
                :disabled="showCmd_1"
                style=" width: 100%;"
                @clear="loadUserList()"
                clearable
                v-model="cityCode"
                @input="searchUser()"
                @change="function1(cityCode)"
                placeholder="请选择城市"
              >
                <el-option
                  v-for="item in CityId"
                  :key="item.id"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-col>
            <el-col style="margin-left:30px" :span="4">
              <el-select
                size="small"
                style=" width: 100%;"
                @clear="loadUserList()"
                clearable
                :disabled="showCmds"
                @input="searchUser()"
                v-model="areaCode"
                placeholder="请选择区域"
              >
                <el-option
                  v-for="item in AreaId"
                  :key="item.id"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-col>

            <el-col style="margin-left:30px" :span="4">
              <el-select
                filterable
                size="small"
                style=" width: 100%;"
                @clear="loadUserList()"
                @input="searchUser()"
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
          border
          :data="userlist"
          style="width: 100%;margin:10px 0;padding-bottom:40px"
          :row-style="{height:'40px'}"
          :cell-style="{padding:'0px'}"
          @selection-change="handleCurrentChang"
        >
          <el-table-column type="selection" width="50"></el-table-column>
          <el-table-column type="index" label="序号" width="50" show-overflow-tooltip>
            <template slot-scope="socpe">
              <p style="cursor:pointer;" @click="showEdituser(socpe.row)">{{socpe.$index+1}}</p>
            </template>
          </el-table-column>
          <el-table-column width="250" show-overflow-tooltip prop="name" label="单位名称">
            <template slot-scope="socpe">
              <p style="cursor:pointer;" @click="danwei(socpe.row)">{{socpe.row.name}}</p>
            </template>
          </el-table-column>

          <el-table-column show-overflow-tooltip prop="personnelName" label="负责人"></el-table-column>
          <el-table-column show-overflow-tooltip prop="code" label="统一社会信用代码"></el-table-column>
          <el-table-column show-overflow-tooltip prop="division" label="行政区划"></el-table-column>
          <!-- 
          <el-table-column show-overflow-tooltip prop="licence" label="负责人"></el-table-column>-->
          <!-- <el-table-column show-overflow-tooltip prop="unitPhone" label="单位固定电话"></el-table-column> -->
          <el-table-column show-overflow-tooltip prop="phone" label="负责人联系电话"></el-table-column>
          <el-table-column show-overflow-tooltip prop="address" label="单位地址"></el-table-column>
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
        :current-page="page"
        :page-sizes="[10,15,20,25,30]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>

      <!-- 对话框 -->
      <!-- 添加对话框 -->
      <el-dialog
        title="新增信息"
        v-dialogDrag
        ref="dialog__wrapper"
        :close-on-click-modal="false"
        width="80%"
        :visible.sync="dialogFormVisibleAdd"
      >
        <el-form @keyup.enter.native="AddUser" :model="form" :rules="rulses" ref="form">
          <el-col :span="24">
            <el-col :span="8">
              <el-form-item label-width="140px" label="行政省份:">
                <el-select
                  style="width:100%"
                  v-model="form.provinceCode"
                  @change="function2(form.provinceCode)"
                  :disabled="showCmd"
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
              <el-form-item label-width="140px" label="市级区域:">
                <el-select
                  style="width:100%"
                  v-model="form.cityCode"
                  @change="function1(form.cityCode)"
                  :disabled="showCmd_1"
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
              <el-form-item label-width="140px" label="区级:">
                <el-select
                  style="width:100%"
                  v-model="form.areaCode"
                  :disabled="showCmds"
                  placeholder="请选择"
                >
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
              <el-form-item label="单位名称:" class="red_s" label-width="140px" prop="name">
                <el-input v-model="form.name" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="负责人:" class="red_s" label-width="140px" prop="personnelName">
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
              <el-form-item label="单位地址:" class="red_s" label-width="140px" prop="address">
                <el-input v-model="form.address" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="统一社会信用代码:" label-width="140px" prop="code">
                <el-input v-model="form.code" autocomplete="off"></el-input>
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
                <el-input v-model="form.postalCode" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>

            <!-- <el-col :span="8">
              <el-form-item label="气瓶类型:" label-width="140px">
                <el-select
                 
                  style=" width: 100%;"
                  @clear="loadUserList()"
                  clearable
                  v-model="form.bottleType"
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
            </el-col> -->
            <!-- <el-col :span="8">
              <el-form-item label="是否已购保险:" label-width="140px" prop="type">
                <el-select
                  style=" width: 100%;"
                  @clear="loadUserList()"
                  clearable
                  v-model="form.isSafe"
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
            </el-col> -->
          </el-col>

          <el-col :span="24">
            <el-col :span="8">
              <el-form-item hidden label="单位类型:" label-width="140px" prop="type">
                <el-select
                  style=" width: 100%;"
                  @clear="loadUserList()"
                  clearable
                  v-model="form.type"
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
        width="80%"
      >
        <el-form @keyup.enter.native="EditUser" :model="editUserForm" :rules="rulses" re>
          <el-col :span="24">
            <el-col :span="8">
              <el-form-item label-width="140px" label="行政省份:">
                <el-select
                  style="width:100%"
                  v-model="editUserForm.provinceCode"
                  @change="function2(editUserForm.provinceCode)"
                  :disabled="showCmd"
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
              <el-form-item label-width="140px" label="市级区域:">
                <el-select
                  style="width:100%"
                  v-model="editUserForm.cityCode"
                  @change="function1(editUserForm.cityCode)"
                  :disabled="showCmd_1"
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
              <el-form-item label-width="140px" label="区级:">
                <el-select
                  style="width:100%"
                  v-model="editUserForm.areaCode"
                  :disabled="showCmds"
                  placeholder="请选择"
                >
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
              <el-form-item label="单位名称:" label-width="140px" prop="name">
                <el-input v-model="editUserForm.name" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="负责人:" label-width="140px" prop="personnelName">
                <el-input v-model="editUserForm.personnelName" autocomplete="off"></el-input>
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
              <el-form-item label="单位地址:" label-width="140px" prop="address">
                <el-input v-model="editUserForm.address" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="统一社会信用代码:" label-width="140px" prop="code">
                <el-input v-model="editUserForm.code" autocomplete="off"></el-input>
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
                <el-input v-model="editUserForm.postalCode" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>

            
            <!-- <el-col :span="8">
              <el-form-item label="是否已购保险:" label-width="140px" prop="type">
                <el-select
                  style=" width: 100%;"
                  @clear="loadUserList()"
                  clearable
                  v-model="editUserForm.isSafe"
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
            </el-col>-->
          </el-col>

          <el-col :span="24">
            <el-col :span="8">
              <el-form-item hidden label="单位类型:" label-width="140px" prop="type">
                <el-select
                  style=" width: 100%;"
                  @clear="loadUserList()"
                  clearable
                  v-model="form.type"
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
          <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
          <el-button type="primary" @click="EditUser()">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 新增系统用户弹框显示数据 -->
      <el-dialog
        title="新增系统用户"
        v-dialogDrag
        ref="dialog__wrapper"
        width="95%"
        top="5vh"
        :close-on-click-modal="false"
        :visible.sync="dialogFormVisiblenewUsers"
      >
        <el-col :span="24">
          <h5 style="border-bottom:1px solid #ece8e8;padding-bottom:15px;padding-left:15px"></h5>
        </el-col>
        <el-col :span="24">
          <el-col :span="22">&nbsp;</el-col>
          <el-col :span="2" style="margin-bottom:10px">
            <el-button type="success" size="small" style="font-size:13px" @click="showSystem()">
              <i style="padding-right:10px" class="el-icon-plus"></i>新增
            </el-button>
          </el-col>
        </el-col>
        <!-- 表格 -->
        <template>
          <el-table
            border
            :data="userlistsystem"
            style="width: 100%;margin:10px 0px;padding-bottom:40px;"
            :row-style="{height:'40px'}"
            :cell-style="{padding:'0px'}"
          >
            <el-table-column type="index" label="序号" width="50"></el-table-column>
            <el-table-column show-overflow-tooltip prop="username" label="用户名"></el-table-column>
            <el-table-column show-overflow-tooltip prop="unitName" label="单位名称"></el-table-column>
            <el-table-column show-overflow-tooltip prop="name" label="姓名"></el-table-column>
            <el-table-column prop="phone" label="联系电话"></el-table-column>
            <el-table-column show-overflow-tooltip prop="code" label="工作证编号"></el-table-column>
            <el-table-column show-overflow-tooltip prop="address" label="地址"></el-table-column>
            <el-table-column show-overflow-tooltip prop="note" label="备注"></el-table-column>
          </el-table>
        </template>

        <el-pagination
          style="border:1px solid #ebeef5;padding:5px 15px;display:flex; justify-content: flex-end;"
          background
          @size-change="handleSizeChanges"
          @current-change="handleCurrentChanges"
          :current-page="pages"
          :page-sizes="[10,15,20,25,30]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totals"
        ></el-pagination>

        <!-- <House></House> -->
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisiblenewUsers = false">取 消</el-button>
          <!-- <el-button type="primary" @click="newUserssure()">确 定</el-button> -->
        </div>
      </el-dialog>

      <!-- 新增系统用户对话框 -->
      <el-dialog
        title="添加用户"
        v-dialogDrag
        ref="dialog__wrapper"
        :close-on-click-modal="false"
        :visible.sync="dialogFormVisibleAddsystem"
        width="80%"
        append-to-body
      >
        <el-form
          @keyup.enter.native="AddUsersystem"
          :model="formers"
          ref="formers"
          :rules="rulseses"
        >
          <el-col :span="24">
            <el-col :span="8">
              <el-form-item hidden prop="provinceCode" label-width="140px" label="行政省份:">
                <el-select
                  :disabled="showCmd"
                  v-model="formers.provinceCode"
                  @change="function2(formers.provinceCode)"
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
                  v-model="formers.cityCode"
                  @change="function1(formers.cityCode)"
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
                <el-select :disabled="showCmds" v-model="formers.areaCode" placeholder="请选择">
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
              <el-form-item label="用户名:" label-width="140px" prop="name">
                <el-input v-model="formers.username" autocomplete="off"></el-input>
              </el-form-item>
              <!-- <el-form-item label="单位名称:" label-width="140px" prop="name">
                <el-input v-model="formers.unitName" autocomplete="off"></el-input>
              </el-form-item>-->
            </el-col>
            <el-col :span="8">
              <el-form-item label="姓名:" label-width="140px" prop="name">
                <el-input v-model="formers.name" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="联系电话:" label-width="140px" prop="name">
                <el-input v-model="formers.phone" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="8">
              <el-form-item label="身份证:" label-width="140px" prop="idCard">
                <el-input v-model="formers.idCard" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="工作证编号:" label-width="140px" prop="name">
                <el-input v-model="formers.code" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="地址:" label-width="140px" prop="地址">
                <el-input v-model="formers.address" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="8">
              <el-form-item label="备注:" label-width="140px" prop="name">
                <el-input v-model="formers.note" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibleAddsystem = false">取 消</el-button>
          <el-button type="primary" @click="AddUsersystem()">确 定</el-button>
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
        <!-- <Fillings></Fillings> -->
        <el-col :span="24">
          <h5 style="border-bottom:1px solid #ece8e8;padding-bottom:15px;padding-left:15px"></h5>
        </el-col>

        <el-col style="margin-bottom:10px;margin-top:10px" :span="24">
          <el-col :span="20">&nbsp;</el-col>
          <el-col :span="2">
            <el-button
              type="success"
              size="small"
              style="font-size:13px"
              @click="showAddUserDias()"
            >
              <i style="padding-right:10px" class="el-icon-plus"></i>新增
            </el-button>
          </el-col>
          <el-col :span="2">
            <el-button
              type="danger"
              size="small"
              style="font-size:13px"
              plain
              icon="el-icon-delete"
              @click="showDelete"
            >删除</el-button>
          </el-col>
        </el-col>

        <el-col :span="24">
          <p
            style="width:100%;height:1px;background:rgb(236, 232, 232);margin:20px 0px 0px 0px;z-index:999"
          ></p>
        </el-col>

        <template>
          <el-table
            border
            :data="userlists"
            style="width: 100%;margin:10px 0px;padding-bottom:40px"
            :row-style="{height:'40px'}"
            :cell-style="{padding:'0px'}"
            @selection-change="handleCurrentChang"
          >
            <el-table-column type="selection" width="50"></el-table-column>
            <el-table-column type="index" label="序号" width="50" show-overflow-tooltip>
              <template slot-scope="socpe">
                <p style="cursor:pointer;" @click="xiugaiusers(socpe.row)">{{socpe.$index+1}}</p>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="姓名" show-overflow-tooltip></el-table-column>
            <el-table-column prop="username" label="账号" show-overflow-tooltip></el-table-column>
            <!-- <el-table-column prop="idCard" label="身份证" show-overflow-tooltip></el-table-column> -->
            <el-table-column prop="workNumber" label="作业人员证号" width="170" show-overflow-tooltip></el-table-column>
            <!-- <el-table-column prop="siteName" label="所属站点" show-overflow-tooltip></el-table-column> -->
            <el-table-column prop="type" label="充装人员" show-overflow-tooltip>
              <template slot-scope="scope">
                <p v-if="userlists[scope.$index].type==0">充装人员</p>
                <p v-if="userlists[scope.$index].type==1">检验人员</p>
                <p v-if="userlists[scope.$index].type==2">配送人员</p>
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
          </el-table>
        </template>

        <el-pagination
          style="padding:5px 15px 15px 15px;display:flex; justify-content: flex-end;"
          background
          @size-change="handleSizeChangess"
          @current-change="handleCurrentChangess"
          :current-page="pagess"
          :page-sizes="[10,15,20,25,30]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalss"
        ></el-pagination>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisiblenewUserapp = false">取 消</el-button>
        </div>
      </el-dialog>

      <!-- 新增app用户数据弹出框 -->
      <el-dialog
        title="添加信息"
        v-dialogDrag
        ref="dialog__wrapper"
        :close-on-click-modal="false"
        width="80%"
        :visible.sync="dialogFormVisibleAddapp"
        append-to-body
      >
        <el-form :model="former" ref="former" :rules="rulesss">
          <el-col :span="24">
            <el-col :span="8">
              <el-form-item hidden prop="provinceCode" label-width="140px" label="行政省份:">
                <el-select
                  :disabled="showCmd"
                  v-model="former.provinceCode"
                  @change="function2(former.provinceCode)"
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
                  v-model="former.cityCode"
                  @change="function1(former.cityCode)"
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
                <el-select :disabled="showCmds" v-model="former.areaCode" placeholder="请选择">
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
            <el-col :span="11">
              <el-form-item class="red_s" label="姓名" label-width="150px" prop="name">
                <el-input v-model="former.name" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="2"></el-col>
            <el-col :span="11">
              <el-form-item class="red_s" label="账号" label-width="150px" prop="username">
                <el-input v-model="former.username" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="11">
              <el-form-item class="red_s" label="密码" label-width="150px" prop="password">
                <el-input v-model="former.password" type="password" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="2"></el-col>
            <el-col :span="11">
              <el-form-item label="身份证" label-width="150px" prop="idCard">
                <el-input v-model="former.idCard" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="11">
              <el-form-item class="red_s" label="确认密码" label-width="150px" prop="againPassword">
                <el-input
                  @change="mima()"
                  v-model="former.againPassword"
                  type="password"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="2"></el-col>
            <el-col :span="11">
              <el-form-item label="联系电话" label-width="150px" prop="phone">
                <el-input v-model="former.phone" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="11">
              <el-form-item label="员工类型" label-width="150px" prop="type">
                <el-select style="width: 100%" v-model="former.type">
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
              <el-form-item class="red_s" label="作业人员证号" label-width="150px" prop="workNumber">
                <el-input v-model="former.workNumber" autocomplete="off"></el-input>
              </el-form-item>

              <el-form-item hidden label="id" label-width="150px" prop="unitId">
                <el-input v-model="former.unitId" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="11">
              <el-form-item class="red_s" label="发证日期" label-width="150px" prop="certificateTime">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="former.certificateTime"
                  value-format="yyyy-MM-dd"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
            </el-col>

            <el-col :span="2"></el-col>
            <el-col :span="11">
              <el-form-item class="red_s" label="换证日期" label-width="150px" prop="renewalTime">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="former.renewalTime"
                  value-format="yyyy-MM-dd"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-col>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="lose()">取 消</el-button>
          <el-button type="primary" @click="AddUserapp()">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 修改app用户数据弹出框 -->
      <el-dialog
        title="修改信息"
        v-dialogDrag
        ref="dialog__wrapper"
        :close-on-click-modal="false"
        width="80%"
        :visible.sync="changeVisibleAddapp"
        append-to-body
      >
        <el-form :model="former" ref="former" :rules="rulesss">
          <el-col :span="24">
            <el-col :span="8">
              <el-form-item hidden prop="provinceCode" label-width="140px" label="行政省份:">
                <el-select
                  :disabled="showCmd"
                  v-model="former.provinceCode"
                  @change="function2(former.provinceCode)"
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
                  v-model="former.cityCode"
                  @change="function1(former.cityCode)"
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
                <el-select :disabled="showCmds" v-model="former.areaCode" placeholder="请选择">
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
            <el-col :span="11">
              <el-form-item label="姓名" label-width="150px" prop="name">
                <el-input v-model="former.name" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="2"></el-col>
            <el-col :span="11">
              <el-form-item label="账号" label-width="150px" prop="username">
                <el-input v-model="former.username" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="11">
              <el-form-item label="联系电话" label-width="150px">
                <el-input v-model="former.phone" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="2"></el-col>
            <el-col :span="11">
              <el-form-item label="身份证" label-width="150px">
                <el-input v-model="former.idCard" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24">
            <!-- <el-col :span="11">
              <el-form-item label="确认密码" label-width="150px" prop="againPassword">
                <el-input v-model="former.againPassword" type="password" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>-->

            <el-col :span="2"></el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="11">
              <el-form-item label="员工类型" label-width="150px" prop="type">
                <el-select style="width: 100%" v-model="former.type">
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
                <el-input v-model="former.workNumber" autocomplete="off"></el-input>
              </el-form-item>

              <el-form-item hidden label="作业人员证号" label-width="150px" prop="unitId">
                <el-input v-model="former.unitId" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="11">
              <el-form-item label="发证日期" label-width="150px" prop="certificateTime">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="former.certificateTime"
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
                  v-model="former.renewalTime"
                  value-format="yyyy-MM-dd"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="11">
              <el-form-item hidden label="密码" label-width="150px">
                <el-input v-model="former.password" type="password" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="changeVisibleAddapp = false">取 消</el-button>
          <el-button type="primary" @click="xiugaUserapp()">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 新增人员 -->
      <el-dialog
        title="新增人员"
        v-dialogDrag
        ref="dialog__wrapper"
        width="95%"
        :close-on-click-modal="false"
        v-if="dialogFormnewStaff"
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
// import Message from "@/components/archives/message"
import House from "@/components/user/houses";
import Fillings from "@/components/user/fillings";
import Sufficients from "@/components/user/sufficients";
import cityData from "@/components/archives/citydata.js";
export default {
  name: "cylinder",
  components: {
    House,
    Fillings,
    Sufficients,
  },
  data() {
    return {
      showCmd: true,
      showCmds: true,
      showCmd_1: true,
      licence: "", //特种设备行政许可证
      unitName: "", //单位名称
      bottleType: "",
      name: "",
      ProvinceId: [], //省
      provinceCode: "",
      vestingCityId: "",
      CityId: [], //市
      cityCode: "",
      vestingAreaId: "",
      AreaId: [], //区
      areaCode: "",
      select: "",
      userlist: [],
      userlists: [],
      chelist: [],
      yelist: [],
      gonglist: [],
      userlistsystem: [],
      options: [],
      cityData,
      //分页相关数据
      total: -1,
      totals: -1,
      totalss: -1,
      chetotal: -1,
      yetotal: -1,
      gongtotal: -1,
      optionsuseName: [
        {
          icd: 0,
          usenames: "监管机构",
        },
        {
          icd: 1,
          usenames: "制造单位",
        },
        {
          icd: 2,
          usenames: "充装单位",
        },
        {
          icd: 3,
          usenames: "检验单位",
        },
        {
          icd: 4,
          usenames: "使用单位",
        },
        {
          icd: 5,
          usenames: "配送单位",
        },
      ],
      cheyong: "",
      yehua: "",
      gongye: "",
      users: "",
      chepage: 1,
      cherows: 10,
      yepage: 1,
      yerows: 10,
      gongpage: 1,
      gongrows: 10,
      page: 1,
      pages: 1,
      pagess: 1,
      rows: 10,
      curr: 1,
      id: "",
      Id: "",
      dengId: -1,
      // vestingType: "监管机构",
      // 添加对话框的属性
      dialogFormVisibleAdd: false,
      dialogFormVisibleEdit: false,
      dialogTableVisible: false,
      dengdialogFormVisible: false,
      dialogFormnewStaff: false,
      dialogFormVisiblenewUsers: false,
      dialogFormVisibleAddapp: false, //app添加弹出框
      dialogFormVisibleAddsystem: false, //系统用户新增弹出框
      dialogFormVisiblenewUserapp: false,
      changeVisibleAddapp: false, //修改app弹出框
      dialogFormcheyong: false, //车用弹框
      dialogFormyehua: false, //液化弹框
      dialogFormgongye: false, //工业弹框
      //添加用户的表单的数据
      form: {
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
        type: 6, //单位类型
        // bottleType: "",
        // isSafe: 0,
      },
      formers: {
        provinceCode: "", //省
        cityCode: "", //市
        areaCode: "", //区
        idCard: "",
        username: "",
        name: "",
        phone: "",
        address: "",
        code: "",
        note: "",
      },
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
      // 编辑
      editUserForm: {
        provinceCode: "", //省
        cityCode: "", //市
        areaCode: "", //区

        name: "", //单位名称
        // licence: "", //特种设备行政许可证号
        unitPhone: "", //单位固定电话
        phone: "", //负责人联系电话
        address: "", //单位地址
        unitIssueTime: "", //发证日期
        unitChangeTime: "", //换证日期
        code: "", //统一社会信用代码
        postalCode: "", //邮政编码
        bottleType: "",
        // createdTime: ""
        // type: 0 //单位类型
      },
      former: {
        provinceCode: "", //省
        cityCode: "", //市
        areaCode: "", //区
        name: "",
        username: "",
        password: "",
        againPassword: "",
        idCard: "",
        phone: "",
        renewalTime: "",
        certificateTime: "",
        workNumber: "", //作业人员证号
        type: "",
        unitId: "",
      },
      selectss: [
        {
          id: 0,
          siteNames: "充装人员",
        },
        {
          id: 1,
          siteNames: "检验人员",
        },
        {
          id: 2,
          siteNames: "配送人员",
        },
      ],
      // 新增系统表单验证
      rulseses: {},
      // app新增表单验证
      rulesss: {
        name: [{ required: true, message: "员工姓名", trigger: "blur" }],
        username: [{ required: true, message: "员工账号", trigger: "blur" }],
        password: [
          { required: true, message: "密码", trigger: "blur" },
          { min: 6, message: "请输入不少于6位的密码" },
        ],
        againPassword: [
          { required: true, message: "请再次确认密码", trigger: "blur" },
          { min: 6, message: "请再次确认密码" },
        ],
        // idCard: [
        //   { required: true, message: "身份证", trigger: "blur" },
        //   {
        //     pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
        //     message: "证件号码格式有误！"
        //   }
        // ],
        // sex: [{ required: true, message: "性别", trigger: "blur" }],
        // adminNo: [
        //   { required: true, message: "特种设备行政许可编号", trigger: "blur" }
        // ],
        // number: [
        //   { required: true, message: "员工编号", trigger: "blur" }
        // ],
        // phone: [
        //   { required: true, message: "电话号码", trigger: "blur" },
        //   { min: 11, max: 11, message: "请输入11位手机号码", trigger: "blur" },
        //   {
        //     pattern: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
        //     message: "请输入正确的手机号码"
        //   }
        // ],
        workNumber: [
          { required: true, message: "作业人员账号不能为空", trigger: "blur" },
        ],
        // address: [{ required: true, message: "详细地址不能为空", trigger: "blur" }],

        // siteId: [
        //   { required: true, message: "所属站点不能为空", trigger: "blur" }
        // ],

        certificateTime: [
          { required: true, message: "发证日期不能为空", trigger: "blur" },
        ],
        renewalTime: [{ required: true, message: "换证日期", trigger: "blur" }],
      },
      // optionsuseName: ["车用气瓶", "液化气瓶", "工业气瓶"],
      //表单验证
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
        // code: [
        //   { required: true, message: "请输入统一社会信用代码", trigger: "blur" }
        //   // { min: 2, message: "请输入不少于2个字", trigger: "blur" }
        // ], //统一社会信用代码
        // postalCode: [
        //   { required: true, message: "请输入邮政编码", trigger: "blur" },
        //   { min: 6, message: "请输入6个字", trigger: "blur" },
        //   { pattern: /^[1-9][0-9]{5}$/, message: "邮政编码格式不对" }
        // ] //邮政编码

        // unitChangeTime: [
        //   {
        //     type: "date",
        //     required: true,
        //     message: "请选择时间",
        //     trigger: "blur"
        //   }
        // ] //换证日期
      },
      // 分配角色,

      currUsername: "",
      country: [],
      arealeve: 1,
      multipleSelection: [], //批量删除数据
      delarr: [],
      provincecode: "",
      citycode: "",
      areacode: "",
      tyPe: "",
      //   保存所有角色数据
    };
  },
  watch: {
    dialogFormVisibleAdd: function (val, oldVla) {
      this.$refs["form"].resetFields();
    },
    dialogFormVisibleAdd: function (val, oldVla) {
      this.$refs["former"].resetFields();
    },
    dialogFormVisibleAdd: function (val, oldVla) {
      this.$refs["formers"].resetFields();
    },
  },
  methods: {
    async danwei(user) {
      console.log(user);
      this.users = user;
      if (user.bottleType == 0) {
        this.cheyong = user.bottleType;
        const res = await this.$http.get(
          `/unit/cylinder/liquidation?unitId=${user.id}&bottleType=${this.cheyong}&currPage=${this.chepage}&pageSize=${this.cherows}`
        );
        console.log(res);
        this.chelist = res.data.data.list;
        this.chetotal = res.data.data.totalCount;
        this.dialogFormcheyong = true;
      } else if (user.bottleType == 1) {
        this.yehua = user.bottleType;
        const res = await this.$http.get(
          `/unit/cylinder/liquidation?unitId=${user.id}&bottleType=${this.yehua}&currPage=${this.yepage}&pageSize=${this.yerows}`
        );
        console.log(res);
        this.yelist = res.data.data.list;
        this.yetotal = res.data.data.totalCount;
        this.dialogFormyehua = true;
      } else if (user.bottleType == 2) {
        this.gongye = user.bottleType;
        ("?");
        const res = await this.$http.get(
          `/unit/cylinder/liquidation?unitId=${user.id}&bottleType=${this.gongye}&currPage=${this.gongpage}&pageSize=${this.gongrows}`
        );
        console.log(res);
        this.gonglist = res.data.data.list;
        this.gongtotal = res.data.data.totalCount;
        this.dialogFormgongye = true;
      } else if (user.bottleType == "null") {
        this.$message({
          type: "error",
          message: "气瓶类别未选择",
        });
      }
    },
    //分页功能
    handleSizeChangess(val) {
      console.log(`每页 ${val} 条`);
      // 1.每页显示条数的改变
      this.rows = val;
      // 回到第一页
      this.pagess = 1;
      // 希望当页条数改变时 从第一页开始显示 this.pagenum = 1 -》currPage=1?
      this.appuser();
    },
    handleCurrentChangess(val) {
      //页码改变时
      console.log(`当前页: ${val}`);
      this.pagess = val;
      this.appuser();
    },

    //分页功能
    handleSizeChanges(val) {
      console.log(`每页 ${val} 条`);
      // 1.每页显示条数的改变
      this.rows = val;
      // 回到第一页
      this.pages = 1;
      // 希望当页条数改变时 从第一页开始显示 this.pagenum = 1 -》currPage=1?
      this.systemuser();
    },
    handleCurrentChanges(val) {
      //页码改变时
      console.log(`当前页: ${val}`);
      this.pages = val;
      this.systemuser();
    },
    // 车用的分页
    handleSizeChangecy(val) {
      console.log(`每页 ${val} 条`);
      // 1.每页显示条数的改变
      this.cherows = val;
      // 回到第一页
      this.chepage = 1;
      // 希望当页条数改变时 从第一页开始显示 this.pagenum = 1 -》currPage=1?
      this.danwei(this.users);
    },
    handleCurrentChangecy(val) {
      //页码改变时
      console.log(`当前页: ${val}`);
      this.chepage = val;
      this.danwei(this.users);
    },
    //液化的分页
    handleSizeChangeyh(val) {
      console.log(`每页 ${val} 条`);
      // 1.每页显示条数的改变
      this.yerows = val;
      // 回到第一页
      this.yepage = 1;
      // 希望当页条数改变时 从第一页开始显示 this.pagenum = 1 -》currPage=1?
      this.danwei(this.users);
    },
    handleCurrentChangeyh(val) {
      //页码改变时
      console.log(`当前页: ${val}`);
      this.yepage = val;
      this.danwei(this.users);
    },
    //工业的分页
    handleSizeChangegy(val) {
      console.log(`每页 ${val} 条`);
      // 1.每页显示条数的改变
      this.gongrows = val;
      // 回到第一页
      this.gongpage = 1;
      // 希望当页条数改变时 从第一页开始显示 this.pagenum = 1 -》currPage=1?
      this.danwei(this.users);
    },
    handleCurrentChangegy(val) {
      //页码改变时
      console.log(`当前页: ${val}`);
      this.gongpage = val;
      this.danwei(this.users);
    },

    mima() {
      if (this.former.password != this.former.againPassword) {
        console.log(this.former.password);
        console.log(this.former.againPassword);
        this.$message({
          type: "error",
          message: "再次输入的密码不一致",
        });
      }
    },
    // 批量删除app用户请求数据
    showDelete() {
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
        this.$confirm("是否删除这条信息?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(async () => {
            // 注意async的位置，最近的位置
            // 发送删除请求:id:用户id
            // 1.data中找userId
            // 2.把userID以showDeleUserMsgBox参数形式传进来
            const res = await this.$http.post(`app-user/delete`, this.delarr);
            console.log(res);
            this.delarr = [];
            // this.getUserlist();
            // 提示
            if (res.data.code == 0) {
              // this.delarr = [];
              this.$message({
                type: "success",
                message: res.data.msg,
              });
              this.appuser();
            } else if (res.data.code == 1) {
              // this.delarr = [];
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

    // 修改app用户弹出框
    xiugaiusers(user) {
      this.former = user;
      this.changeVisibleAddapp = true;
      this.appuser();
    },
    // 修改app用户确认发送请求
    async xiugaUserapp() {
      this.$refs.former.validate(async (valid) => {
        if (valid) {
          this.former.unitId = sessionStorage.getItem("unitIdss");
          this.former.provinceCode = this.provincecode;
          this.former.cityCode = this.citycode;
          this.former.areaCode = this.areacode;
          const res = await this.$http.put(`/app-user`, this.former);
          console.log(res);
          if (res.data.code === 0) {
            this.$message({
              type: "success",
              message: res.data.msg,
            });
            this.changeVisibleAddapp = false;

            // this.form = {};
            this.appuser();
          } else if (res.data.code === 1) {
            this.$message({
              type: "warning",
              message: res.data.msg,
            });
            this.changeVisibleAddapp = true;
          } else if (res.data.code === 2) {
            this.$message({
              type: "warning",
              message: res.data.msg,
            });
            this.changeVisibleAddapp = true;
          }
        } else {
          this.$message({
            type: "error",
            message: "请填写内容再试",
          });
          this.changeVisibleAddapp = true;
        }
      });
    },
    // 新增app弹出框关闭
    lose() {
      this.dialogFormVisibleAddapp = false;
    },
    dateFormat: function (row, column) {
      var date = row[column.property];
      if (date === null) {
        return "0:0:0";
      }
      var moment = require("moment");
      return moment(date).format("YYYY-MM-DD ");
      //HH:mm:ss
    },
    //  市级
    async function2(val) {
      this.code = val;
      console.log(this.code);
      const res = await this.$http.get(`/chinese/city/${this.code}`);
      console.log(res);
      this.CityId = res.data.data;
      this.getUserlist();
    },
    // 区域
    async function1(val) {
      this.Id = val;
      const res = await this.$http.get(`/chinese/area/${this.Id}`);
      console.log(res);
      this.AreaId = res.data.data;
      this.getUserlist();
    },

    //  市级修改
    async function22(val) {
      this.code = sessionStorage.getItem("sid"); //省code
      // this.code = val;
      console.log(this.code);
      const res = await this.$http.get(`/chinese/city/${this.code}`);
      console.log(res);
      this.CityId = res.data.data;
      this.getUserlist();
    },

    // 区域修改
    async function11(val) {
      this.Id = sessionStorage.getItem("sids");
      const res = await this.$http.get(`/chinese/area/${this.Id}`);
      console.log(res);
      this.AreaId = res.data.data;
      this.getUserlist();
    },
    // 新增人员
    newStaff(user) {
      sessionStorage.setItem("Ids", user.id);
      sessionStorage.setItem("provinceCode", user.provinceCode);
      sessionStorage.setItem("cityCode", user.cityCode);
      sessionStorage.setItem("areaCode", user.areaCode);
      this.dialogFormnewStaff = true;
      this.dialogFormnewStaff = true;
    },
    // 新增app分页数据查询
    async appuser() {
      const res = await this.$http.get(`/chinese/address`);
      console.log(res);
      this.tyPe = res.data.data.type; //type
      console.log(this.tyPe);

      if (res.data.data.type == 2) {
        sessionStorage.setItem("provinceCode", res.data.data.provinceCode);
        sessionStorage.setItem("cityCode", res.data.data.cityCode);
        this.codes = res.data.data.provinceCode; //省code
        this.provinceCode = res.data.data.province; //省搜索name
        this.former.provinceCode = res.data.data.province; //省表单name
        this.former.cityCode = res.data.data.city; //市表单name
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
        this.former.provinceCode = res.data.data.province; //省表单name
        this.former.cityCode = res.data.data.city; //市表单name
        this.citys = res.data.data.cityCode; //市code
        this.areas = res.data.data.areaCode; //区code
        this.areaCode = res.data.data.area; //区name
        this.former.areaCode = res.data.data.area; //区name
        this.showCmd = true;
        this.showCmds = true;
        this.showCmd_1 = true;
      } else if (res.data.data.type == 0) {
        this.ProvinceId = res.data.data.provinces;
        this.showCmd = false;
        this.showCmds = false;
        this.showCmd_1 = false;
      } else if (res.data.data.type == 3) {
        //省监管
        sessionStorage.setItem("provinceCode", res.data.data.provinceCode);
        sessionStorage.setItem("province", res.data.data.province);
        this.provinceCode = res.data.data.province; //省搜索name
        this.codes = res.data.data.provinceCode; //省code
        this.form.provinceCode = res.data.data.province; //省表单name
        this.CityId = res.data.data.city; //市数组
        // this.AreaId = res.data.data.area; //区数组
        //
        this.showCmds = false; //区按钮
        this.showCmd = true; //省按钮
        this.showCmd_1 = false; //市按钮
      }
      // sessionStorage.setItem("unitIdss", userId);

      console.log(1);
      if (this.tyPe == 1) {
        const res = await this.$http.get(
          `/app-user/findPage?pagess=${this.page}&rows=${this.rows}&provinceCode=${this.codes}&cityCode=${this.citys}&areaCode=${this.areas}&unitId=${this.unitId}`
        );
        console.log(res);
        this.userlists = res.data.data.list;
        this.totalss = res.data.data.totalCount;
      } else if (this.tyPe == 2) {
        const res = await this.$http.get(
          `/app-user/findPage?pagess=${this.page}&rows=${this.rows}&provinceCode=${this.codes}&cityCode=${this.citys}&areaCode=${this.areaCode}&unitId=${this.unitId}`
        );
        console.log(res);
        this.userlists = res.data.data.list;
        this.totalss = res.data.data.totalCount;
      } else if (this.tyPe == 0) {
        const res = await this.$http.get(
          `/app-user/findPage?pagess=${this.page}&rows=${this.rows}&provinceCode=${this.provinceCode}&cityCode=${this.cityCode}&areaCode=${this.areaCode}&unitId=${this.unitId}`
        );
        console.log(res);
        this.userlists = res.data.data.list;
        this.totalss = res.data.data.totalCount;
      } else if (this.tyPe == 3) {
        const res = await this.$http.get(
          `/app-user/findPage?pagess=${this.page}&rows=${this.rows}&provinceCode=${this.codes}&cityCode=${this.cityCode}&areaCode=${this.areaCode}&unitId=${this.unitId}`
        );
        console.log(res);
        this.userlists = res.data.data.list;
        this.totalss = res.data.data.totalCount;
      }
    },
    // 新增app用户弹框查询数据
    async appUserssure(userId) {
      sessionStorage.setItem("unitIdss", userId.id);
      this.unitId = userId.id;
      this.provincecode = userId.provinceCode;
      this.citycode = userId.cityCode;
      this.areacode = userId.areaCode;
      this.dialogFormVisiblenewUserapp = true;
      this.appuser();
    },
    // 新增app用户弹框
    showAddUserDias() {
      this.former = {};
      this.dialogFormVisibleAddapp = true;
    },
    //  新增app用户发送请求
    async AddUserapp() {
      if (this.former.password != this.former.againPassword) {
        this.$message({
          type: "error",
          message: "再次输入的密码不一致",
        });
        this.dialogFormVisibleAddapp = true;
      } else {
        this.$refs.former.validate(async (valid) => {
          if (valid) {
            this.former.unitId = sessionStorage.getItem("unitIdss");
            this.former.provinceCode = this.provincecode;
            this.former.cityCode = this.citycode;
            this.former.areaCode = this.areacode;
            const res = await this.$http.post(`/app-user`, this.former);
            console.log(res);
            if (res.data.code === 0) {
              this.$message({
                type: "success",
                message: res.data.msg,
              });
              this.dialogFormVisibleAddapp = false;

              // this.form = {};
              this.appuser();
            } else if (res.data.code === 1) {
              this.$message({
                type: "warning",
                message: res.data.msg,
              });
              this.dialogFormVisibleAddapp = true;
            } else if (res.data.code === 2) {
              this.$message({
                type: "warning",
                message: res.data.msg,
              });
              this.dialogFormVisibleAddapp = true;
            }
          } else {
            this.$message({
              type: "error",
              message: "请填写内容再试",
            });
            this.dialogFormVisiblenewUserapp = true;
          }
        });
      }
    },

    // 新增系统用户分页查询
    async systemuser() {
      const res = await this.$http.get(`/chinese/address`);
      console.log(res);
      this.tyPe = res.data.data.type; //type
      console.log(this.tyPe);

      if (res.data.data.type == 2) {
        sessionStorage.setItem("provinceCode", res.data.data.provinceCode);
        sessionStorage.setItem("cityCode", res.data.data.cityCode);
        this.codes = res.data.data.provinceCode; //省code
        this.provinceCode = res.data.data.province; //省搜索name
        this.former.provinceCode = res.data.data.province; //省表单name
        this.former.cityCode = res.data.data.city; //市表单name
        this.cityCode = res.data.data.city; //市搜索name
        this.citys = res.data.data.cityCode; //市code
        this.AreaId = res.data.data.area; //区数组
        this.showCmd = true;
        this.showCmds = false;
      } else if (res.data.data.type == 1) {
        sessionStorage.setItem("provinceCode", res.data.data.provinceCode);
        sessionStorage.setItem("cityCode", res.data.data.cityCode);
        sessionStorage.setItem("areaCode", res.data.data.areaCode);
        this.codes = res.data.data.provinceCode; //省code
        this.provinceCode = res.data.data.province; //省name
        this.cityCode = res.data.data.city; //市name
        this.former.provinceCode = res.data.data.province; //省表单name
        this.former.cityCode = res.data.data.city; //市表单name
        this.citys = res.data.data.cityCode; //市code
        this.areas = res.data.data.areaCode; //区code
        this.areaCode = res.data.data.area; //区name
        this.former.areaCode = res.data.data.area; //区name
        this.showCmd = true;
        this.showCmds = true;
      } else if (res.data.data.type == 0) {
        this.ProvinceId = res.data.data.provinces;
        this.showCmd = false;
        this.showCmds = false;
      } else if (res.data.data.type == 3) {
        //省监管
        sessionStorage.setItem("provinceCode", res.data.data.provinceCode);
        sessionStorage.setItem("province", res.data.data.province);
        this.provinceCode = res.data.data.province; //省搜索name
        this.codes = res.data.data.provinceCode; //省code
        this.form.provinceCode = res.data.data.province; //省表单name
        this.CityId = res.data.data.city; //市数组
        // this.AreaId = res.data.data.area; //区数组
        //
        this.showCmds = false; //区按钮
        this.showCmd = true; //省按钮
        this.showCmd_1 = false; //市按钮
      }
      // sessionStorage.setItem("unitIdss", userId);

      console.log(1);
      if (this.tyPe == 1) {
        const res = await this.$http.get(
          `/user/findPage?page=${this.pages}&rows=${this.rows}&provinceCode=${this.codes}&cityCode=${this.citys}&areaCode=${this.areas}&unitId=${this.unitId}`
        );
        console.log(res);
        this.userlistsystem = res.data.data.list;
        this.totals = res.data.data.totalCount;
      } else if (this.tyPe == 2) {
        const res = await this.$http.get(
          `/user/findPage?page=${this.pages}&rows=${this.rows}&provinceCode=${this.codes}&cityCode=${this.citys}&areaCode=${this.areaCode}&unitId=${this.unitId}`
        );
        console.log(res);
        this.userlistsystem = res.data.data.list;
        this.totals = res.data.data.totalCount;
      } else if (this.tyPe == 0) {
        const res = await this.$http.get(
          `/user/findPage?page=${this.pages}&rows=${this.rows}&provinceCode=${this.provinceCode}&cityCode=${this.cityCode}&areaCode=${this.areaCode}&unitId=${this.unitId}`
        );
        console.log(res);
        this.userlistsystem = res.data.data.list;
        this.totals = res.data.data.totalCount;
      } else if (this.tyPe == 3) {
        const res = await this.$http.get(
          `/user/findPage?page=${this.pages}&rows=${this.rows}&provinceCode=${this.codes}&cityCode=${this.cityCode}&areaCode=${this.areaCode}&unitId=${this.unitId}`
        );
        console.log(res);
        this.userlistsystem = res.data.data.list;
        this.totals = res.data.data.totalCount;
      }
    },
    // 新增系统用户弹出显示数据
    newUsers(userId) {
      sessionStorage.setItem("unitIdss", userId.id);
      this.unitId = userId.id;
      this.provincecode = userId.provinceCode;
      this.citycode = userId.cityCode;
      this.areacode = userId.areaCode;
      this.dialogFormVisiblenewUsers = true;
      this.systemuser();
    },

    // 新增系统用户弹出框
    showSystem() {
      this.formers = {};
      this.dialogFormVisibleAddsystem = true;
    },

    // 新增系统用户新增发送请求
    async AddUsersystem() {
      this.$refs.formers.validate(async (valid) => {
        if (valid) {
          // this.formers={}
          this.formers.unitId = sessionStorage.getItem("unitIdss");
          this.formers.provinceCode = this.provincecode;
          this.formers.cityCode = this.citycode;
          this.formers.areaCode = this.areacode;
          const res = await this.$http.post(`user`, this.formers);
          console.log(res);
          if (res.data.code === 0) {
            this.$message({
              type: "success",
              message: res.data.msg,
            });
            this.dialogFormVisibleAddsystem = false;

            // this.form = {};
            this.systemuser();
          } else if (res.data.code === 1) {
            this.$message({
              type: "warning",
              message: res.data.msg,
            });
            this.dialogFormVisibleAddsystem = true;
          } else if (res.data.code === 2) {
            this.$message({
              type: "warning",
              message: res.data.msg,
            });
            this.dialogFormVisibleAddsystem = true;
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
    // 多选
    handleCurrentChang(val) {
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
        this.$confirm("是否删除这条信息?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(async () => {
            // 注意async的位置，最近的位置
            // 发送删除请求:id:用户id
            // 1.data中找userId
            // 2.把userID以showDeleUserMsgBox参数形式传进来
            const res = await this.$http.post(`/unit/delete`, this.delarr);
            console.log(res);
            this.delarr = [];
            this.getUserlist();
            // 提示
            if (res.data.code == 0) {
              this.$message({
                type: "success",
                message: res.data.msg,
              });
            } else if (res.data.code == 1) {
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
    registrationAddUserDia(row) {
      this.dengId = row.id;
      this.dengdialogFormVisible = true;
      this.dengform = row;
    },
    // 查询单位名称
    async selectedDia() {
      const res = await this.$http.get(`/unit/findByUnitType/4`);
      console.log(res);
      this.options = res.data.data;
    },

    // 修改对话框打开
    async showEdituser(user) {
      this.dialogFormVisibleEdit = true;
      this.editUserForm = user;
      this.getUserlist();
      if (this.tyPe == 1) {
        this.editUserForm.provinceCode = this.provinceCode; //省name
        this.editUserForm.cityCode = this.cityCode; //市name
        this.editUserForm.areaCode = this.areaCode;
        // this.editUserForm.provinceCode = sessionStorage.getItem("province"); //省code
        // this.editUserForm.cityCode = sessionStorage.getItem("city"); //市code
        // this.editUserForm.areaCode = sessionStorage.getItem("area"); //市code
      } else if (this.tyPe == 2) {
        this.editUserForm.provinceCode = this.provinceCode; //省name
        this.editUserForm.cityCode = this.cityCode; //市name
        // this.editUserForm.provinceCode = sessionStorage.getItem("province"); //省code
        // this.editUserForm.cityCode = sessionStorage.getItem("city"); //市code
      } else if (this.tyPe == 0) {
        this.Id = user.cityCode;
        // 省code
        // this.sid = user.provinceCode;
        sessionStorage.setItem("sid", user.provinceCode); //省
        sessionStorage.setItem("sids", user.cityCode); //市
        sessionStorage.setItem("sidarea", user.areaCode); //区
        const res = await this.$http.get(`/chinese/findCity/${this.Id}`);
        console.log(res);
        if (res.data.code == 0) {
          this.editUserForm.cityCode = res.data.data.name;
          sessionStorage.setItem("cityname", res.data.data.name);
          this.function11();
          this.function22();
          // const res1 = await this.$http.get(`/chinese/city/${this.sid}`);
          // console.log(res1);
          // this.CityId = res.data.data;
        }
        // 传省获取市
        // const res1 = await this.$http.get(`/chinese/city/${this.sid}`);
        // console.log(res1);
        // this.CityId = res.data.data;
        this.Ids = user.areaCode;

        const ress = await this.$http.get(`/chinese/findArea/${this.Ids}`);
        console.log(ress);
        this.editUserForm.areaCode = ress.data.data.name;
        sessionStorage.setItem("arename", ress.data.data.name);
        this.getUserlist();
      } else if (this.tyPe == 3) {
        this.Ids = user.areaCode;
        sessionStorage.setItem("sids", user.cityCode);
        this.editUserForm.provinceCode = this.provinceCode; //省name
        const ress = await this.$http.get(`/chinese/findArea/${this.Ids}`);
        console.log(ress);

        if (ress.data.code == 0) {
          this.editUserForm.areaCode = ress.data.data.name;
          this.function11();
        }
      }
    },

    // 修改用户发送请求
    async EditUser() {
      //   users/:id
      if (this.tyPe == 1) {
        this.editUserForm.provinceCode = sessionStorage.getItem("provinceCode"); //省code
        this.editUserForm.cityCode = sessionStorage.getItem("cityCode"); //市code
        this.editUserForm.areaCode = sessionStorage.getItem("areaCode"); //市code
        const res = await this.$http.put(`/unit`, this.editUserForm);
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
          this.dialogFormVisibleEdit = false;
          this.getUserlist();
        } else {
          this.$message({
            type: "danger",
            message: "修改失败",
          });
        }
      } else if (this.tyPe == 2) {
        this.editUserForm.provinceCode = sessionStorage.getItem("provinceCode"); //省code
        this.editUserForm.cityCode = sessionStorage.getItem("cityCode"); //市code
        const res = await this.$http.put(`/unit`, this.editUserForm);
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
          this.dialogFormVisibleEdit = false;
          this.getUserlist();
        } else {
          this.$message({
            type: "danger",
            message: "修改失败",
          });
        }
      } else if (this.tyPe == 0) {
        this.proid = sessionStorage.getItem("sid"); //省
        this.cityid = sessionStorage.getItem("sids"); //市
        this.areaid = sessionStorage.getItem("sidarea"); //区
        this.cityname = sessionStorage.getItem("cityname"); //市name
        this.arename = sessionStorage.getItem("arename"); //区name
        console.log(this.proid);
        console.log(this.cityid);
        console.log(this.areaid);
        if (
          this.editUserForm.areaCode == this.arename &&
          this.editUserForm.cityCode == this.cityname
        ) {
          console.log("======================");
          delete this.editUserForm.provinceCode;
          delete this.editUserForm.cityCode;
          delete this.editUserForm.areaCode;
          const res = await this.$http.put(`/unit`, this.editUserForm);
          console.log(res);
          if (res.data.code === 0) {
            this.$message({
              type: "success",
              message: res.data.msg,
            });
            this.dialogFormVisibleEdit = false;
            this.getUserlist();
          } else {
            this.$message({
              type: "danger",
              message: "修改失败",
            });
          }
        } else if (
          this.editUserForm.cityCode == this.cityname &&
          this.editUserForm.areaCode != this.arename
        ) {
          console.log("----------------------------");
          this.editUserForm.cityCode = this.cityid;
          const res = await this.$http.put(`/unit`, this.editUserForm);
          console.log(res);
          if (res.data.code === 0) {
            this.$message({
              type: "success",
              message: res.data.msg,
            });
            this.dialogFormVisibleEdit = false;
            this.getUserlist();
          } else {
            this.$message({
              type: "danger",
              message: "修改失败",
            });
          }
        } else if (this.editUserForm.cityCode != this.cityname) {
          console.log("+++++++++++++++++++++++++++++++++");
          const res = await this.$http.put(`/unit`, this.editUserForm);
          console.log(res);
          if (res.data.code === 0) {
            this.$message({
              type: "success",
              message: res.data.msg,
            });
            this.dialogFormVisibleEdit = false;
            this.getUserlist();
          } else {
            this.$message({
              type: "danger",
              message: "修改失败",
            });
          }
        }
      } else if (this.tyPe == 3) {
        this.editUserForm.provinceCode = sessionStorage.getItem("provinceCode"); //省code
        const res = await this.$http.put(`/unit`, this.editUserForm);
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
          this.dialogFormVisibleEdit = false;
          this.getUserlist();
        } else {
          this.$message({
            type: "danger",
            message: "修改失败",
          });
        }
      }
    },

    //   添加用户发送请求
    async AddUser() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          if (this.tyPe == 1) {
            const res = await this.$http.post(`/unit`, this.form);
            console.log(res);
            this.getUserlist();
            // console.log(res);
            if (res.data.code === 0) {
              // 提示
              this.$message({
                type: "success",
                message: res.data.msg,
              });
              this.getUserlist();
              this.dialogFormVisibleAdd = false;
              // this.form = {};
            } else if (res.data.code === 1) {
              this.$message({
                type: "warning",
                message: res.data.msg,
              });
            }
          } else if (this.tyPe == 2) {
            this.form.provinceCode = sessionStorage.getItem("provinceCode"); //省code
            this.form.cityCode = sessionStorage.getItem("cityCode"); //市code
            const res = await this.$http.post(`/unit`, this.form);
            console.log(res);
            this.getUserlist();
            // console.log(res);
            if (res.data.code === 0) {
              // 提示
              this.$message({
                type: "success",
                message: res.data.msg,
              });
              this.getUserlist();
              this.dialogFormVisibleAdd = false;
              // this.form = {};
            } else if (res.data.code === 1) {
              this.$message({
                type: "warning",
                message: res.data.msg,
              });
            }
          } else if (this.tyPe == 0) {
            const res = await this.$http.post(`/unit`, this.form);
            console.log(res);
            this.getUserlist();
            // console.log(res);
            if (res.data.code === 0) {
              // 提示
              this.$message({
                type: "success",
                message: res.data.msg,
              });
              this.getUserlist();
              this.dialogFormVisibleAdd = false;
              // this.form = {};
            } else if (res.data.code === 1) {
              this.$message({
                type: "warning",
                message: res.data.msg,
              });
            }
          } else if (this.tyPe == 3) {
            this.form.provinceCode = sessionStorage.getItem("provinceCode"); //省code

            const res = await this.$http.post(`/unit`, this.form);
            console.log(res);
            this.getUserlist();
            // console.log(res);
            if (res.data.code === 0) {
              // 提示
              this.$message({
                type: "success",
                message: res.data.msg,
              });
              this.getUserlist();
              this.dialogFormVisibleAdd = false;
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
    // 添加用户显示对话框
    showAddUserDia() {
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
      if (this.tyPe == 1) {
        const res = await this.$http.get(
          `/unit/findPage?rows=${this.rows}&page=${this.curr}&type=6&unitName=${this.unitName}&bottleType=${this.bottleType}&licence=${this.licence}&provinceCode=${this.codes}&cityCode=${this.citys}&areaCode=${this.areas}`
        );
        console.log(res);
        this.userlist = res.data.data.list;
        this.total = res.data.data.totalCount;
      } else if (this.tyPe == 2) {
        const res = await this.$http.get(
          `/unit/findPage?rows=${this.rows}&page=${this.curr}&type=6&unitName=${this.unitName}&bottleType=${this.bottleType}&licence=${this.licence}&provinceCode=${this.codes}&cityCode=${this.citys}&areaCode=${this.areaCode}`
        );
        console.log(res);
        this.userlist = res.data.data.list;
        this.total = res.data.data.totalCount;
      } else if (this.tyPe == 0) {
        const res = await this.$http.get(
          `/unit/findPage?rows=${this.rows}&page=${this.curr}&type=6&unitName=${this.unitName}&bottleType=${this.bottleType}&licence=${this.licence}&provinceCode=${this.provinceCode}&cityCode=${this.cityCode}&areaCode=${this.areaCode}`
        );
        console.log(res);
        this.userlist = res.data.data.list;
        this.total = res.data.data.totalCount;
      } else if (this.tyPe == 3) {
        const res = await this.$http.get(
          `/unit/findPage?rows=${this.rows}&page=${this.curr}&type=6&unitName=${this.unitName}&bottleType=${this.bottleType}&licence=${this.licence}&provinceCode=${this.provinceCode}&cityCode=${this.cityCode}&areaCode=${this.areaCode}`
        );
        console.log(res);
        this.userlist = res.data.data.list;
        this.total = res.data.data.totalCount;
      }
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
      const res = await this.$http.get(`/chinese/address`);
      console.log(res);
      this.tyPe = res.data.data.type; //type
      console.log(this.tyPe);

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
      } else if (res.data.data.type == 0) {
        this.ProvinceId = res.data.data.provinces;
        this.showCmd = false;
        this.showCmds = false;
        this.showCmd_1 = false;
      } else if (res.data.data.type == 3) {
        //省监管
        sessionStorage.setItem("provinceCode", res.data.data.provinceCode);
        sessionStorage.setItem("province", res.data.data.province);
        this.provinceCode = res.data.data.province; //省搜索name
        this.codes = res.data.data.provinceCode; //省code
        this.form.provinceCode = res.data.data.province; //省表单name
        this.CityId = res.data.data.city; //市数组
        // this.AreaId = res.data.data.area; //区数组
        //
        this.showCmds = false; //区按钮
        this.showCmd = true; //省按钮
        this.showCmd_1 = false; //市按钮
      }
      if (this.tyPe == 1) {
        const res = await this.$http.get(
          `/unit/findPage?rows=${this.rows}&page=${this.page}&type=6&unitName=${this.unitName}&bottleType=${this.bottleType}&licence=${this.licence}&provinceCode=${this.codes}&cityCode=${this.citys}&areaCode=${this.areas}`
        );
        console.log(res);
        this.userlist = res.data.data.list;
        this.total = res.data.data.totalCount;
      } else if (this.tyPe == 2) {
        const res = await this.$http.get(
          `/unit/findPage?rows=${this.rows}&page=${this.page}&type=6&unitName=${this.unitName}&bottleType=${this.bottleType}&licence=${this.licence}&provinceCode=${this.codes}&cityCode=${this.citys}&areaCode=${this.areaCode}`
        );
        console.log(res);
        this.userlist = res.data.data.list;
        this.total = res.data.data.totalCount;
      } else if (this.tyPe == 0) {
        const res = await this.$http.get(
          `/unit/findPage?rows=${this.rows}&page=${this.page}&type=6&unitName=${this.unitName}&bottleType=${this.bottleType}&licence=${this.licence}&provinceCode=${this.provinceCode}&cityCode=${this.cityCode}&areaCode=${this.areaCode}`
        );
        console.log(res);
        this.userlist = res.data.data.list;
        this.total = res.data.data.totalCount;
      } else if (this.tyPe == 3) {
        const res = await this.$http.get(
          `/unit/findPage?rows=${this.rows}&page=${this.page}&type=4&unitName=${this.unitName}&bottleType=${this.bottleType}&licence=${this.licence}&provinceCode=${this.codes}&cityCode=${this.cityCode}&areaCode=${this.areaCode}`
        );
        console.log(res);
        this.userlist = res.data.data.list;
        this.total = res.data.data.totalCount;
      }
    },
  },
  created() {
    this.getUserlist();
    // this.provinceMessage();
    this.selectedDia();
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
[class*="el-col-"] {
  margin-top: 5px;
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
.red_s {
  color: red;
}
</style>