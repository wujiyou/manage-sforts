<template>
  <div>
    <div style="background:white;width:99.1%;padding-left:15px">
      <my-bread level1="系统管理" level2="硬件appid配置"></my-bread>
    </div>
    <el-card class="box-card" style="margin:20px 20px 0 20px;">
      <!--搜索  -->
      <el-row>
        <el-col style="padding-left:15px" :span="24">
          <h5 style="border-bottom:1px solid #ece8e8;padding-bottom:15px;padding-left:15px">查询信息</h5>
        </el-col>

        <el-col>
          <el-col style="padding-left:15px" :span="22">
            <el-col :span="4">
              <el-select
                size="small"
                style=" width: 100%;"
                @clear="loadUserList()"
                @change="function3()"
                clearable
                v-model="bottleType"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in getgoodcate"
                  :key="item.id"
                  :label="item.label"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-col>
          </el-col>

          <!-- <el-input
          @clear="loadUserList()"
          clearable
          class="input-serach"
          placeholder="请输入内容"
          v-model="query"
        ></el-input>
          <el-button @click="searchUser" type="primary" icon="el-icon-search">搜索</el-button>-->
          <!-- <el-button @click="$router.push({name:'listadd'})" type="succes">添加商品</el-button> -->
        </el-col>
      </el-row>
      <!-- 液化气瓶表格 -->
      <template>
        <el-table
          class="yehua"
          border
          :data="userlist"
          style="width: 100%;margin:10px 0px;padding-bottom:40px"
          :row-style="{height:'40px'}"
          :cell-style="{padding:'0px'}"
        >
          <el-table-column type="index" label="序号" width="50" show-overflow-tooltip>
            <template slot-scope="socpe">
              <p style="cursor:pointer;" @click="showEdituser(socpe.row)">{{socpe.$index+1}}</p>
            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip label="单位名称" prop="name"></el-table-column>

          <!-- <el-table-column show-overflow-tooltip label="行政区划" prop="division"></el-table-column> -->
          <el-table-column show-overflow-tooltip label="地址" prop="address"></el-table-column>
          <!-- <el-table-column label="是否禁用">
            <template slot-scope="scope">
             
              <el-switch
                @change="changeMgStatus(scope.row)"
                v-model="scope.row.isDisable"
                active-color="#13ce66"
                inactive-color="#ff4949"
              ></el-switch>
            </template>
          </el-table-column>-->

          <el-table-column show-overflow-tooltip label="加气总次数" prop="count"></el-table-column>
        </el-table>
        <!-- 车用气瓶气瓶表格 -->
        <el-table
          class="cheyong"
          border
          :data="userlists"
          style="width: 100%;margin:10px 0px;padding-bottom:40px;display:none"
          :row-style="{height:'40px'}"
          :cell-style="{padding:'0px'}"
        >
          <el-table-column type="index" label="序号" width="70" show-overflow-tooltip>
            <template slot-scope="socpe">
              <p style="cursor:pointer;" @click="showEditusers(socpe.row)">{{socpe.$index+1}}</p>
            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip label="单位名称" prop="unitName"></el-table-column>
          <!-- <el-table-column show-overflow-tooltip label="行政区划" prop="division"></el-table-column> -->
          <el-table-column show-overflow-tooltip label="地址" prop="address"></el-table-column>
          <el-table-column show-overflow-tooltip label="AppId" prop="appId"></el-table-column>
          <!-- <template slot-scope="socpe">{{socpe.row.time | fmtdate}}</template> -->
        </el-table>

        <!-- 工业气瓶 -->
        <el-table
          class="gongye"
          border
          :data="userlistsss"
          style="width: 100%;margin:10px 0px;padding-bottom:40px;display:none"
          :row-style="{height:'40px'}"
          :cell-style="{padding:'0px'}"
        >
          <el-table-column type="index" label="序号" width="50" show-overflow-tooltip>
            <template slot-scope="socpe">
              <p style="cursor:pointer;" @click="gongEdituser(socpe.row)">{{socpe.$index+1}}</p>
            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip label="单位名称" prop="name"></el-table-column>

          <!-- <el-table-column show-overflow-tooltip label="行政区划" prop="division"></el-table-column> -->
          <el-table-column show-overflow-tooltip label="地址" prop="address"></el-table-column>

          <el-table-column show-overflow-tooltip label="加气总次数" prop="count"></el-table-column>
        </el-table>

        <!-- 移动充装 -->
        <el-table
          class="yidong"
          border
          :data="userlist"
          style="width: 100%;margin:10px 0px;padding-bottom:40px;display:none"
          :row-style="{height:'40px'}"
          :cell-style="{padding:'0px'}"
        >
          <el-table-column type="index" label="序号" width="50" show-overflow-tooltip>
            <template slot-scope="socpe">
              <p style="cursor:pointer;" @click="yiodngEdituser(socpe.row)">{{socpe.$index+1}}</p>
            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip label="单位名称" prop="name"></el-table-column>

          <!-- <el-table-column show-overflow-tooltip label="行政区划" prop="division"></el-table-column> -->
          <el-table-column show-overflow-tooltip label="地址" prop="address"></el-table-column>

          <el-table-column show-overflow-tooltip label="加气总次数" prop="count"></el-table-column>
        </el-table>
      </template>

      <el-pagination
        style="padding:5px 15px 15px 15px;display:flex; justify-content: flex-end;"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[10,15,20,25,30]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>

      <!-- 对话框 -->

      <!-- 液化修改对话框 -->
      <el-dialog
        title="硬件appid配置"
        v-dialogDrag
        :close-on-click-modal="false"
        width="90%"
        :visible.sync="dialogFormVisibleEdit"
      >
        <el-form :model="form">
          <!-- isDelete -->

          <el-form-item label="control(控制器)：" label-width="200px" prop="email">
            <el-input v-model="form.controlId" autocomplete="off"></el-input>
            <span>(多个控制器用英文逗号隔开)</span>
          </el-form-item>

          <el-form-item label="手持机编号：" label-width="200px" prop="userId">
            <el-input v-model="form.userId" autocomplete="off"></el-input>
            <span>（多个手持机用英文逗号隔开）</span>
          </el-form-item>

          <el-form-item label="*手持机MEID：" label-width="200px" prop="macId">
            <el-input v-model="form.macId" autocomplete="off"></el-input>
            <span>（多个手持机用英文逗号隔开）</span>
          </el-form-item>

          <el-form-item label="gunId(加气枪号(1-32)：" label-width="200px" prop="gunId">
            <el-input v-model="form.gunId" autocomplete="off"></el-input>
            <span>（一个控制器对应两把枪用英文逗号隔开,不同控制器的枪号用分号隔开）</span>
          </el-form-item>

          <el-form-item class="dlete" label="是否禁用：" label-width="200px" prop="isDelete">
            <el-switch
              v-model="form.isDelete"
              @change="changeMgStatus()"
              active-color="#13ce66"
              inactive-color="#ff4949"
            ></el-switch>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
          <el-button type="primary" @click="EditUser()">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 工业气瓶修改对话框 -->
      <el-dialog
        title="硬件appid配置"
        v-dialogDrag
        :close-on-click-modal="false"
        width="90%"
        :visible.sync="dialogFormVisiblegongye"
      >
        <el-form :model="formgy">
          <!-- <el-form-item label="control(控制器)：" label-width="200px" prop="email">
            <el-input v-model="formgy.controlId" autocomplete="off"></el-input>
            <span>(多个控制器用英文逗号隔开)</span>
          </el-form-item>

          <el-form-item label="手持机编号：" label-width="200px" prop="userId">
            <el-input v-model="formgy.userId" autocomplete="off"></el-input>
            <span>（多个手持机用英文逗号隔开）</span>
          </el-form-item> -->

          <el-form-item label="*手持机MEID：" label-width="200px" prop="macId">
            <el-input v-model="formgy.macId" autocomplete="off"></el-input>
            <span>（多个手持机用英文逗号隔开）</span>
          </el-form-item>

          <el-form-item label="介质：" label-width="200px" prop="medium">
            <el-input v-model="formgy.medium" autocomplete="off"></el-input>
            <span>（多个介质用英文分号隔开）</span>
          </el-form-item>

          <el-form-item label="gunId(加气枪号(1-32)：" label-width="200px" prop="gunId">
            <el-input v-model="formgy.gunId" autocomplete="off"></el-input>
            <span>（一个控制器对应两把枪用英文逗号隔开,不同控制器的枪号用分号隔开）</span>
          </el-form-item>

          <el-form-item class="dletes" label="是否禁用：" label-width="200px" prop="isDelete">
            <el-switch
              v-model="formgy.isDelete"
              @change="changeMgStatuses()"
              active-color="#13ce66"
              inactive-color="#ff4949"
            ></el-switch>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisiblegongye = false">取 消</el-button>
          <el-button type="primary" @click="gongyeUser()">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 移动充装修改对话框 -->
      <el-dialog
        title="硬件appid配置"
        v-dialogDrag
        :close-on-click-modal="false"
        width="90%"
        :visible.sync="dialogFormVisibleyidong"
      >
        <el-form :model="formyd">
          <el-form-item label="control(控制器)：" label-width="200px" prop="email">
            <el-input v-model="formyd.controlId" autocomplete="off"></el-input>
            <span>(多个控制器用英文逗号隔开)</span>
          </el-form-item>

          <el-form-item label="手持机编号：" label-width="200px" prop="userId">
            <el-input v-model="formyd.userId" autocomplete="off"></el-input>
            <span>（多个手持机用英文逗号隔开）</span>
          </el-form-item>

          <el-form-item label="*手持机MEID：" label-width="200px" prop="macId">
            <el-input v-model="formyd.macId" autocomplete="off"></el-input>
            <span>（多个手持机用英文逗号隔开）</span>
          </el-form-item>

          <el-form-item label="介质：" label-width="200px" prop="medium">
            <el-input v-model="formyd.medium" autocomplete="off"></el-input>
            <span>（多个介质用英文逗号隔开）</span>
          </el-form-item>

          <el-form-item label="gunId(加气枪号(1-32)：" label-width="200px" prop="gunId">
            <el-input v-model="formyd.gunId" autocomplete="off"></el-input>
            <span>（一个控制器对应两把枪用英文逗号隔开,不同控制器的枪号用分号隔开）</span>
          </el-form-item>
          <el-form-item class="dletess" label="是否禁用：" label-width="200px" prop="isDelete">
            <el-switch
              v-model="formyd.isDelete"
              @change="changeMgStatusesess()"
              active-color="#13ce66"
              inactive-color="#ff4949"
            ></el-switch>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibleyidong = false">取 消</el-button>
          <el-button type="primary" @click="yidongUser()">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 车用修改对话框 -->
      <el-dialog
        title="车用修改配置"
        v-dialogDrag
        :close-on-click-modal="false"
        width="90%"
        :visible.sync="dialogFormVisibleEdits"
      >
        <el-form :model="forms">
          <el-form-item hidden label="deptId" label-width="200px" prop="deptId">
            <el-input v-model="forms.deptId" autocomplete="off"></el-input>
          </el-form-item>
          <!-- 
          <el-form-item label="单位名称" label-width="200px" prop="siteName">
            <el-input v-model="forms.siteName" autocomplete="off"></el-input>
            
          </el-form-item>-->

          <el-form-item label="AppId(中继器)" label-width="200px" prop="appId">
            <el-input v-model="forms.appId" autocomplete="off"></el-input>
            <span>(编号十进制范围为10000-65000)</span>
          </el-form-item>

          <el-form-item label="control(控制器)" label-width="200px" prop="controllerId">
            <el-input v-model="forms.controlId" autocomplete="off"></el-input>
            <span>(多个控制器用英文逗号隔开)</span>
          </el-form-item>

          <el-form-item label="gunId(加气枪号(1-32))" label-width="200px" prop="gunId">
            <el-input v-model="forms.gunId" autocomplete="off"></el-input>
            <span>(一个控制器对应两把枪号隔开，不同控制器的枪号用分号隔开)</span>
          </el-form-item>

          <el-form-item label="手持机id" label-width="200px" prop="macId">
            <el-input v-model="forms.macId" autocomplete="off"></el-input>
            <span>(一个手持机对应两把枪号隔开，不同控制器的枪号用分号隔开)</span>
          </el-form-item>

          <el-form-item label="经度" label-width="200px" prop="x">
            <el-input v-model="forms.x" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="纬度" label-width="200px" prop="y">
            <el-input v-model="forms.y" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibleEdits = false">取 消</el-button>
          <el-button type="primary" @click="EditUsers()">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
import $ from "jquery";
export default {
  name: "list",
  data() {
    return {
      bottleType: 1,
      userlist: [],
      userlists: [],
      userlistss: [],
      userlistsss: [],
      //分页相关数据
      total: -1,
      currPage: 1,
      page: 1,
      rows: 10,
      getgoodcate: [
        {
          id: 0,
          label: "车用气瓶",
        },
        {
          id: 1,
          label: "液化气瓶",
        },
        {
          id: 2,
          label: "工业气瓶",
        },
        {
          id: 3,
          label: "移动充装",
        },
      ],
      // 添加对话框的属性

      dialogFormVisibleEdit: false,
      dialogFormVisibleEdits: false,
      dialogFormVisibleyidong: false, //移动充装
      dialogFormVisiblegongye: false, //工业气瓶
      //添加用户的表单的数据
      form: {
        controlId: "",
        departId: "",
        // name: "",
        gunId: "",
        macId: "",
        userId: "",
        id: "",
        unitId: "",
        form: "",
        isDelete: "",
      },
      // 移动充装
      formyd: {
        controlId: "",
        departId: "",
        // name: "",
        gunId: "",
        macId: "",
        userId: "",
        id: "",
        unitId: "",
        medium: "", //介质
        isDelete: "",
      },
      forms: {
        appid: "",
        companyId: "",
        unitName: "",
        controlId: "",
        count: "",
        gunId: "",
        macId: "",
        x: "",
        y: "",
        deptId: "",
        unitId: "",
      },
      formgy: {
        // controlId: "",
        departId: "",
        gunId: "",
        macId: "",
        // userId: "",
        id: "",
        unitId: "",
        medium: "", //介质
        isDelete: "",
      },
      idss: "",
      id: "",
      idsss: "",
      idssss: "",
      isDisable: 0,
    };
  },

  methods: {
  
    // 移动
    async changeMgStatusesess(val) {
      if (this.isDelete == 1) {
        // hardware-mobile/enabled
        const res = await this.$http.put(
          `hardware-mobile/enabled/${this.unitId}`
        );
        console.log(res);
        if (res.data.code == 1) {
          this.$message({
            type: "warning",
            message: res.data.msg,
          });
        } else if (res.data.code == 0) {
          this.$message({
            type: "success",
            message: res.data.msg,
          });
          this.dialogFormVisibleyidong = false;
        }
      } else if (this.isDelete == 0) {
        const res = await this.$http.put(
          `hardware-mobile/disable/${this.unitId}`
        );
        console.log(res);
        this.$message({
          type: "warning",
          message: res.data.msg,
        });
        this.dialogFormVisibleyidong = false;
      }
    },
    // 工业
    async changeMgStatuses(val) {
      if (this.isDelete == 1) {
        // hardware/enabled
        const res = await this.$http.put(
          `hardware-industrial/enabled/${this.unitId}`
        );
        console.log(res);
        if (res.data.code == 1) {
          this.$message({
            type: "warning",
            message: res.data.msg,
          });
          this.dialogFormVisiblegongye = false;
        } else if (res.data.code == 0) {
          this.$message({
            type: "success",
            message: res.data.msg,
          });
          this.dialogFormVisiblegongye = false;
        }
      } else if (this.isDelete == 0) {
        const res = await this.$http.put(
          `hardware-industrial/disable/${this.unitId}`
        );
        console.log(res);
        this.$message({
          type: "warning",
          message: res.data.msg,
        });
        this.dialogFormVisiblegongye = false;
      }
    },

    // 液化
    async changeMgStatus(val) {
      if (this.isDelete == 1) {
        // hardware/enabled
        const res = await this.$http.put(`hardware/enabled/${this.unitId}`);
        console.log(res);
        if (res.data.code == 1) {
          this.$message({
            type: "warning",
            message: res.data.msg,
          });
        } else if (res.data.code == 0) {
          this.$message({
            type: "success",
            message: res.data.msg,
          });
          this.dialogFormVisibleEdit = false;
        }
        // this.$message({
        //   type: "success",
        //   message: "启用成功",
        // });
        // this.getUserlist();
        // console.log(res);
      } else if (this.isDelete == 0) {
        const res = await this.$http.put(`hardware/disable/${this.unitId}`);
        console.log(res);
        this.$message({
          type: "warning",
          message: res.data.msg,
        });
        this.dialogFormVisibleEdit = false;
        // this.getUserlist();
        // console.log(res);
      }
    },
     // 工业气瓶对话框
    async gongEdituser(user) {
      this.formgy = {};
      console.log(user);
      this.idsss = user.id;
      // hardware-industrial/findByUnitId/{id}
      const res = await this.$http.get(
        `hardware-industrial/findByUnitId/${this.idsss}`
      );
      console.log(res);
      this.dialogFormVisiblegongye = true;
      if (res.data.code == 0) {

        if (res.data.data == null) {
          $(".dletes").hide();
          this.formgy.isDelete=""
        } else {
          $(".dletes").show();
          this.unitId = res.data.data.id;
          this.formgy = res.data.data;
          this.isDelete = res.data.data.isDelete;
          console.log(this.isDelete);
          if (res.data.data.isDelete == 0) {
            this.formgy.isDelete = true;
          } else if (res.data.data.isDelete == 1) {
            this.formgy.isDelete = false;
          }
        }
        //  this.form.id=
      }
    },
  //  工业发送确认请求
    async gongyeUser() {
      this.formgy.unitId = this.unitId; //硬件id
      this.formgy.id = this.idsss; //单位id
       if (this.formgy.isDelete == true) {
        this.formgy.isDelete = 0;
      } else if (this.formgy.isDelete = false) {
        this.formgy.isDelete = 1;
      }else if(this.formgy.isDelete==""){
        this.formgy.isDelete=""
      }
      const res = await this.$http.post(
        `hardware-industrial/save`,
        this.formgy
      );
      console.log(res);
      if (res.data.code === 0) {
        this.$message.success(res.data.msg);

        this.dialogFormVisiblegongye = false;
        this.function3();
      } else if (res.data.code === 1) {
        this.$message.warning(res.data.msg);
      }
    },

    // 液化对话框打开
    async showEdituser(user) {
      this.form = {};
      this.id = user.id;
      this.dialogFormVisibleEdit = true;
      const res = await this.$http.get(`hardware/findByUnitId/${this.id}`);
      console.log(res);
      //  this.form.name=user.name
      if (res.data.code == 0) {
        if (res.data.data == null) {
           this.form.isDelete=""
          $(".dlete").hide();
        } else {
          $(".dlete").show();
          this.unitId = res.data.data.id;
          this.form = res.data.data;
          this.isDelete = res.data.data.isDelete;
          console.log(this.isDelete);
          if (res.data.data.isDelete == 0) {
            this.form.isDelete = true;
          } else if (res.data.data.isDelete == 1) {
            this.form.isDelete = false;
          }
        }
      }
    },

    // 液化发送请求
    async EditUser() {
      //   users/:id
      this.form.unitId = this.unitId; //硬件id
      this.form.id = this.id; //单位id
      if (this.form.isDelete == true) {
        this.form.isDelete = 0;
      } else if (this.form.isDelete = false) {
        this.form.isDelete = 1;
      }else if(this.form.isDelete==""){
        this.form.isDelete=""
      }
      const res = await this.$http.post(`hardware/save`, this.form);
      // 2.关闭对话框
      // this.dialogFormVisibleEdit = false;

      console.log(res);
      if (res.data.code === 0) {
        this.$message.success(res.data.msg);

        this.dialogFormVisibleEdit = false;
        this.function3();
      } else if (res.data.code === 1) {
        this.$message.warning(res.data.msg);
      }
    },

    // 移动对话框打开
    async yiodngEdituser(user) {
      (this.formyd = {}), (this.idss = user.id);
      console.log(this.idss);
      this.dialogFormVisibleyidong = true;
      const res = await this.$http.get(
        `/hardware-mobile/findByUnitId/${this.idss}`
      );
      console.log(res);

      if (res.data.code == 0) {
        if (res.data.data == null) {
          this.formyd.isDelete=""
          $(".dletess").hide();
        } else {
          $(".dletess").show();
          this.unitId = res.data.data.id;
          this.formyd = res.data.data;
          this.isDelete = res.data.data.isDelete;
          console.log(this.isDelete);
          if (res.data.data.isDelete == 0) {
            this.formyd.isDelete = true;
          } else if (res.data.data.isDelete == 1) {
            this.formyd.isDelete = false;
          }
        }
      }
    },

    //移动发送请求
    async yidongUser() {
      this.formyd.unitId = this.unitId; //硬件id
      this.formyd.id = this.idss; //单位id
       if (this.formyd.isDelete == true) {
        this.formyd.isDelete = 0;
      } else if (this.formyd.isDelete = false) {
        this.formyd.isDelete = 1;
      }else if(this.formyd.isDelete==""){
        this.formyd.isDelete=""
      }
      const res = await this.$http.post(`hardware-mobile/save`, this.formyd);
      // 2.关闭对话框
      // this.dialogFormVisibleEdit = false;
      console.log(res);
      if (res.data.code === 0) {
        this.$message.success(res.data.msg);

        this.dialogFormVisibleyidong = false;
        this.function3();
      } else if (res.data.code === 1) {
        this.$message.warning(res.data.msg);
      }
    },

    // 车用对话框打开
    async showEditusers(users) {
      this.forms = {};
      console.log(users);
      this.idssss = users.deptId;
      this.dialogFormVisibleEdits = true;
      const res = await this.$http.get(
        `hardware-car/findByUnitId/${this.idssss}`
      );
      console.log(res);
      if (res.data.code == 0) {
        this.unitId = res.data.data.unitId;
        this.forms = res.data.data;
      }
    },

    //  车用修改
    async EditUsers() {
      //   users/:id
      this.forms.unitId = this.unitId; //硬件id
      this.forms.deptId = this.idssss; //单位id
     
      const res = await this.$http.post(`/hardware-car/save`, this.forms);

      console.log(res);
      if (res.data.code === 0) {
        this.$message.success(res.data.msg);
        this.dialogFormVisibleEdits = false;
        this.function3();
      }
    },

    //清空搜索框搜索数据 点击清楚按钮清除数据重新发送请求
    loadUserList() {
      this.function3();
    },
    // 搜索用户 给搜索框绑定query v-model="query"
    searchUser() {
      this.function3();
      // console.log("aaaaaa");
    },
    // 选择不同模块
    async function3() {
      // console.log(this.userID);

      if (this.bottleType === 1) {
        $(".cheyong").hide();
        $(".gongye").hide();
        $(".yidong").hide();
        $(".yehua").show();
        const res = await this.$http.get(
          `unit/findUnitHardware?page=${this.page}&rows=${this.rows}&bottleType=1`
        );
        console.log(res);
        this.userlist = res.data.data.list;
        this.total = res.data.data.totalCount;
        // for (let i = 0; i < res.data.data.list.length; i++) {
        //   if (res.data.data.list[i].isDisable == 0) {
        //     res.data.data.list[i].isDisable = true;
        //   } else {
        //     res.data.data.list[i].isDisable = false;
        //   }
        // }
      } else if (this.bottleType === 0) {
        $(".cheyong").show();
        $(".yehua").hide();
        $(".yidong").hide();
        $(".gongye").hide();
        const res = await this.$http.get(
          `/hardware-car/pageList?page=${this.page}&rows=${this.rows}`
        );
        console.log(res);
        this.userlists = res.data.list;
        this.total = res.data.totalCount;
        this.totalPage = res.data.totalPage;
      } else if (this.bottleType === 2) {
        const res = await this.$http.get(
          `unit/findUnitHardware?page=${this.page}&rows=${this.rows}&bottleType=2`
        );
        console.log(res);
        this.userlistsss = res.data.data.list;
        this.total = res.data.data.totalCount;
        $(".cheyong").hide();
        $(".yidong").hide();
        $(".yehua").hide();
        $(".gongye").show();
      } else if (this.bottleType === 3) {
        const res = await this.$http.get(
          `unit/findUnitHardware?page=${this.page}&rows=${this.rows}&bottleType=3`
        );
        console.log(res);
        this.userlist = res.data.data.list;
        this.total = res.data.data.totalCount;
        $(".cheyong").hide();
        $(".yidong").show();
        $(".yehua").hide();
        $(".gongye").hide();
      }
    },
    //分页功能
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      // 1.每页显示条数的改变
      this.rows = val;
      // 回到第一页
      this.page = 1;
      // 希望当页条数改变时 从第一页开始显示 this.pagenum = 1 -》currPage=1?
      this.function3();
    },
    handleCurrentChange(val) {
      //页码改变时
      console.log(`当前页: ${val}`);
      this.page = val;
      this.function3();
    },
    // async getUserlist() {

    // }
  },
  created() {
    this.function3();
  },
};
</script>
<style scoped>
.dlete {
  display: none;
}
.dletes {
  display: none;
}
.dletess {
  display: none;
}
.arrow_right {
  padding: 10px 0px;
  margin-bottom: 10px;
}
.input-serach {
  width: 300px;
}
</style>
<style>
.el-table td,
.el-table th {
  text-align: center !important;
}
</style>