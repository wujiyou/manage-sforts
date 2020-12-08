<template>
  <div>
    <div style="background:white;width:99.1%;padding-left:15px">
      <my-bread level1="单位登记" level2="运输车档案登记" level3="运输车档案管理"></my-bread>
    </div>
    <el-card class="box-card" style="margin:20px 20px 0 20px;">
      <!--搜索  -->
      <el-row>
        <el-col :span="24">
          <h5 style="border-bottom:1px solid #ece8e8;padding-bottom:15px;padding-left:15px">查询信息</h5>
        </el-col>
        <el-col style="margin:10px 20px 0 20px;" :span="22">
          <el-col :span="4">
            <el-input
              size="small"
              @clear="loadUserList()"
              clearable
              style=" width: 100%;"
              class="input-serach"
              placeholder="请输入车牌号"
              v-model="carNo"
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
          <el-button type="success" @click="showAddUserDia()" style="font-size:13px"  size="small">
            <i style="padding-right:10px" class="el-icon-plus"></i>新增
          </el-button>
        </el-col>

        <el-col :span="2">
          <el-button
            type="danger"
            style="font-size:13px"
            size="small"
            plain
            icon="el-icon-delete"
            @click="showDeleUserMsgBox"
          >删除</el-button>
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
          <el-table-column prop="carNo" label="车牌号" show-overflow-tooltip></el-table-column>
          <el-table-column prop="vehicleType" label="车辆型号" show-overflow-tooltip></el-table-column>
          <el-table-column prop="vehicleSpecifications" label="车辆规格" show-overflow-tooltip></el-table-column>
          <el-table-column prop="deadweight" label="载重量(kg)" show-overflow-tooltip></el-table-column>
          <el-table-column prop="manufacturer" label="生产厂家" show-overflow-tooltip></el-table-column>
          <!-- <el-table-column prop="productionDate" label="出厂日期"></el-table-column> -->
          <el-table-column label="出厂日期" show-overflow-tooltip>
            <template slot-scope="socpe">{{socpe.row.productionDate | fmtdate}}</template>
          </el-table-column>
          <el-table-column prop="dangerousCarNo" label="危运证编号" show-overflow-tooltip></el-table-column>
          <el-table-column
            prop="certificationDate"
            label="发证日期"
            show-overflow-tooltip
            :formatter="ifendcase"
          >
            <template slot-scope="socpe">{{socpe.row.certificationDate | fmtdate}}</template>
          </el-table-column>
          <el-table-column
            prop="cancellationDate"
            label="截止日期"
            show-overflow-tooltip
            :formatter="ifendcase"
          >
            <template slot-scope="socpe">{{socpe.row.cancellationDate | fmtdate}}</template>
          </el-table-column>
          <el-table-column prop="certificationCompany" show-overflow-tooltip label="发证机关"></el-table-column>
          <el-table-column prop="state" label="车辆签约状态" show-overflow-tooltip>
            <template slot-scope="scope">
              <p v-if="userlist[scope.$index].state==0">未签约</p>
              <p v-if="userlist[scope.$index].state==1">已签约</p>
            </template>
          </el-table-column>
          <el-table-column
            prop="enterpriseId"
            label="所服务的燃气经营企业名称"
            width="190"
            show-overflow-tooltip
          ></el-table-column>

          <!-- <el-table-column prop="create_time" label="创建时间"></el-table-column> -->
          <!-- <el-table-column label="创建时间"> -->
          <!-- main.js写了一个全局过滤器 -->
          <!-- 如果单元格内显示的内容不是字符串（文本）
          需要给被显示的内容包裹一个template-->
          <!-- template内部要用数据 设置slot-scope属性
          该属性的值是要用数据create_time的数据源userlist-->
          <!-- slot-scope的值userlist其实就是el-table绑定的数据userlist
          userlist.row >数组中的每个对象-->
          <!-- slot-scope自动去找上一级所绑定的数据 userlist-->
          <!-- <template slot-scope="socpe">{{socpe.row.create_time | fmtdate}}</template> -->
          <!-- </el-table-column> -->

          <!-- 表格操作 -->
          <!-- <el-table-column prop="address" width="150" label="操 作">
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
                  @click="showDeleUserMsgBox(scope.row.id)"
                ></el-button>
              </el-tooltip>
            </template>
          </el-table-column>-->
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
        :visible.sync="dialogFormVisibleAdd"
      >
        <el-form @keyup.enter.native="AddUser" :model="form" ref="form" :rules="rules">
          <el-col :span="24">
            <el-col :span="11">
              <el-form-item label="车牌号" class="red_s" label-width="150px" prop="carNo">
                <el-input v-model="form.carNo" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="2"></el-col>
            <el-col :span="11">
              <el-form-item label="车辆型号" class="red_s" label-width="150px" prop="vehicleType">
                <el-input v-model="form.vehicleType" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="11">
              <el-form-item label="载重量(kg)" class="red_s" label-width="150px" prop="deadweight">
                <el-input v-model="form.deadweight" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="2"></el-col>
            <el-col :span="11">
              <el-form-item label="车辆规格" class="red_s" label-width="150px" prop="vehicleSpecifications">
                <el-input v-model="form.vehicleSpecifications" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="11">
              <el-form-item label="生产厂家" class="red_s" label-width="150px" prop="manufacturer">
                <el-input v-model="form.manufacturer" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="2"></el-col>
            <el-col :span="11">
              <el-form-item label="出厂日期" class="red_s" label-width="150px" prop="productionDate">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="form.productionDate"
                  style="width: 100%;"
                ></el-date-picker>
                <!-- <el-input  type="date" placeholder="选择日期" v-model="form.productionDate" autocomplete="off"></el-input> -->
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="11">
              <el-form-item label="危机证编号" class="red_s" label-width="150px" prop="dangerousCarNo">
                <el-input v-model="form.dangerousCarNo" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="2"></el-col>
            <el-col :span="11">
              <el-form-item label="发证日期" class="red_s" label-width="150px" prop="certificationDate">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="form.certificationDate"
                  style="width: 100%;"
                ></el-date-picker>
                <!-- <el-input v-model="form.certificationDate" autocomplete="off"></el-input> -->
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="11">
              <el-form-item label="截止日期" class="red_s" label-width="150px" prop="cancellationDate">
                <!-- <el-input v-model="form.cancellationDate" autocomplete="off"></el-input> -->
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="form.cancellationDate"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
            </el-col>

            <el-col :span="2"></el-col>
            <el-col :span="11">
              <el-form-item label="发证机关" class="red_s" label-width="150px" prop="cancellationDate">
                <!-- <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="form.cancellationDate"
                style="width: 100%;"
                ></el-date-picker>-->
                <el-input v-model="form.certificationCompany" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="11">
              <el-form-item label="车辆签约状态" label-width="150px" prop="state">
                <el-select style=" width: 100%;" v-model="form.state" placeholder="请选择车辆签约状态">
                  <el-option
                    v-for="item in options"
                    :key="item.id"
                    :label="item.usenames"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="2"></el-col>
            <el-col :span="11">
              <el-form-item label="燃气经营企业名称" label-width="150px" prop="name">
                <el-select
                  filterable
                  style=" width: 100%;"
                  v-model="form.enterpriseId"
                  placeholder="燃气经营企业名称"
                >
                  <el-option
                    v-for="item in ops"
                    :key="item.id"
                    :label="item.name"
                    :value="item.name"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-col>
          <!-- <el-form-item label="特别设备行政许可证" label-width="100px" prop="mobile">
          <el-input v-model="editUserForm.licence" autocomplete="off"></el-input>
          </el-form-item>-->
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
        <el-form @keyup.enter.native="EditUser" :model="editUserForm" :rules="rules">
          <el-col :span="24">
            <el-col :span="11">
              <el-form-item label="车牌号" label-width="150px" prop="carNo">
                <el-input v-model="editUserForm.carNo" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="2"></el-col>
            <el-col :span="11">
              <el-form-item label="车辆型号" label-width="150px" prop="vehicleType">
                <el-input v-model="editUserForm.vehicleType" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="11">
              <el-form-item label="载重量(kg)" label-width="150px" prop="deadweight">
                <el-input v-model="editUserForm.deadweight" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="2"></el-col>
            <el-col :span="11">
              <el-form-item label="车辆规格" label-width="150px" prop="vehicleSpecifications">
                <el-input v-model="editUserForm.vehicleSpecifications" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="11">
              <el-form-item label="生产厂家" label-width="150px" prop="manufacturer">
                <el-input v-model="editUserForm.manufacturer" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="2"></el-col>
            <el-col :span="11">
              <el-form-item label="出厂日期" label-width="150px" prop="productionDate">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="editUserForm.productionDate"
                  style="width: 100%;"
                ></el-date-picker>
                <!-- <el-input  type="date" placeholder="选择日期" v-model="form.productionDate" autocomplete="off"></el-input> -->
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="11">
              <el-form-item label="危机证编号" label-width="150px" prop="dangerousCarNo">
                <el-input v-model="editUserForm.dangerousCarNo" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="2"></el-col>
            <el-col :span="11">
              <el-form-item label="发证日期" label-width="150px" prop="certificationDate">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="editUserForm.certificationDate"
                  style="width: 100%;"
                ></el-date-picker>
                <!-- <el-input v-model="form.certificationDate" autocomplete="off"></el-input> -->
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="11">
              <el-form-item label="截止日期" label-width="150px" prop="cancellationDate">
                <!-- <el-input v-model="form.cancellationDate" autocomplete="off"></el-input> -->
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="editUserForm.cancellationDate"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
            </el-col>

            <el-col :span="2"></el-col>
            <el-col :span="11">
              <el-form-item label="发证机关" label-width="150px" prop="certificationCompany">
                <!-- <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="editUserForm.cancellationDate"
                style="width: 100%;"
                ></el-date-picker>-->
                <el-input v-model="editUserForm.certificationCompany" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="11">
              <el-form-item label="车辆签约状态" label-width="150px" prop="state">
                <el-select
                  style=" width: 100%;"
                  v-model="editUserForm.state"
                  placeholder="请选择车辆签约状态"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.id"
                    :label="item.usenames"
                    :value="item.id"
                  ></el-option>
                </el-select>
                <!-- <el-input disabled v-model="editUserForm.state" autocomplete="off"></el-input> -->
              </el-form-item>
            </el-col>

            <el-col :span="2"></el-col>
            <el-col :span="11">
              <el-form-item label="燃气经营企业名称" label-width="150px" prop="enterpriseId">
                <el-select filterable style=" width: 100%;" v-model="editUserForm.enterpriseId" placeholder="燃气经营企业名称">
                  <el-option
                    v-for="item in ops"
                    :key="item.id"
                    :label="item.name"
                    :value="item.name"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
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
export default {
  name: "record",
  data() {
    return {
      carNo: "",
      userlist: [],
      //分页相关数据
      total: -1,
      currPage: 1,
      pageSize: 10,
      // 添加对话框的属性
      dialogFormVisibleAdd: false,
      dialogFormVisibleEdit: false,
      // dialogFormVisibleRoleshow: false,
      // options:[],
      ops: [],
      options: [
        {
          id: 0,
          usenames: "未签约"
        },
        {
          id: 1,
          usenames: "已签约"
        }
      ],
      //添加用户的表单的数据
      form: {
        carNo: "",
        vehicleType: "",
        vehicleSpecifications: "",
        deadweight: "",
        manufacturer: "",
        productionDate: "",
        dangerousCarNo: "",
        certificationDate: "",
        cancellationDate: "",
        certificationCompany: "",
        state:1,
        enterpriseId: ""
      },
      rules: {
        carNo: [{ required: true, message: "车牌号不能为空", trigger: "blur" }],
        vehicleType: [
          { required: true, message: "车牌型号不能为空", trigger: "blur" }
        ],
        vehicleSpecifications: [
          { required: true, message: "车辆规格不能为空", trigger: "blur" }
        ],
        deadweight: [
          { required: true, message: "载重量不能为空", trigger: "blur" }
        ],
        manufacturer: [
          { required: true, message: "生产厂家不能为空", trigger: "blur" }
        ],
        productionDate: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "blur"
          }
        ],
        dangerousCarNo: [
          { required: true, message: "危机证编号不能为空", trigger: "blur" }
        ],
        certificationDate: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "blur"
          }
        ],
        cancellationDate: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "blur"
          }
        ],
        certificationCompany: [
          { required: true, message: "发证机关不能为空", trigger: "blur" }
        ],

        // state: [{ required: true, message: "请输入签约状态", trigger: "blur" }],
        enterpriseId: [
          {
            required: true,
            message: "请输入服务的燃气经营企业名称",
            trigger: "blur"
          }
        ]

        // telPhone: [
        //   { required: true, message: "移动电话不能为空", trigger: "blur" },
        //   { min: 11, max: 11, message: "请输入11位手机号码", trigger: "blur" },
        //   {
        //     pattern: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
        //     message: "请输入正确的手机号码"
        //   }
        // ]
        // type: [
        //   {
        //     type: "array",
        //     required: true,
        //     message: "请至少选择一个活动性质",
        //     trigger: "change"
        //   }
        // ],
      },
      // 编辑
      editUserForm: {
        carNo: "",
        vehicleType: "",
        vehicleSpecifications: "",
        deadweight: "",
        manufacturer: "",
        productionDate: "",
        dangerousCarNo: "",
        certificationDate: "",
        cancellationDate: "",
        certificationCompany: "",
        state: "",
        enterpriseId: ""
      },
      roles: [],
      currUsername: "",
      multipleSelection: [], //批量删除数据
      delarr: [] //批量删除id
      //   保存所有角色数据
    };
  },
  watch: {
    dialogFormVisibleAdd: function(val, oldVla) {
      this.$refs["form"].resetFields();
    }
  },
  methods: {
    async Car() {
      // /transport/dropUnitName
      const res = await this.$http.get(`/transport/dropUnitName`);
      console.log(res);
      this.ops = res.data.data;
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
            const res = await this.$http.post(`/transport/delete`, this.delarr);
            console.log(res);
            this.delarr = [];
            this.getUserlist();
            // 提示
            if (res.data.code == 0) {
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
            this.delarr = [];
          });
      }
    },
    ifendcase(val) {
      if (val.certificationDate === null) {
        return "暂无时间";
      }
    },
    // 编辑用户
    // 编辑用户发送请求
    async EditUser() {
      //   users/:id
      this.dialogFormVisibleEdit = false;
      const res = await this.$http.put(`/transport`, this.editUserForm);
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
        // this.currPage = 1;
      }
      //  const { data: res } = await this.$http.get(`users/` + id)
      // if (res.data.meta.status !== 200) {
      //   return this.$message.error("查询用户信息失败！");
      // }
    },

    // 编辑对话框打开
    showEdituser(user) {
      this.Car();
      // 2.添加对话框
      this.dialogFormVisibleEdit = true;
      this.editUserForm = user;
      this.getUserlist();
      //user其实就是scope.row也就是userlist
    },

    //   添加用户发送请求
    async AddUser() {
      // 2.关闭对话框
      this.$refs.form.validate(async valid => {
        if (valid) {
          const res = await this.$http.post(`/transport`, this.form);
          console.log(res);
          if (res.data.code === 0) {
            // 回到第一页展示
            // 重新请求数据
            this.getUserlist();
            // 提示
            this.$message({
              type: "success",
              message: res.data.msg
            });
            this.dialogFormVisibleAdd = false;
            // this.currPage = 1;
          } else {
            this.$message({
              type: "warning",
              message: "添加失败"
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
      this.Car();
      // 先点编辑 再点添加 打开表单清空表单
      this.form = {};
      this.form.state=1
      this.dialogFormVisibleAdd = true;
    },
    //清空搜索框搜索数据 点击清楚按钮清除数据重新发送请求
    loadUserList() {
      this.getUserlist();
    },
    // 搜索用户 给搜索框绑定query v-model="query"
    async searchUser() {
      const res = await this.$http.get(
        `/transport/findPage?rows=${this.pageSize}&page=${this.currPage}&carNo=${this.carNo}`
      );
      this.userlist = res.data.data.list;
      this.total = res.data.data.totalCount;
      //  console.log(this.userlist);
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
    },
    async getUserlist() {
      //需要授权的API ，必须在请求头中使用Authorization 字段token令牌
      //pagenum当前页面   pagesize每页显示条数
      //接口文档中 除了登录接口之外的所有请求都需要进行授权，设置请求头
      //找axios中关于请求头的代码  写在了http.js中
      // const AUTH_TOKEN = localStorage.getItem("token");
      // this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;
      const res = await this.$http.get(
        `/transport/findPage?rows=${this.pageSize}&page=${this.currPage}&carNo=${this.carNo}`
      );
      console.log(res);

      // const {
      //   meta: { status, msg },
      //   data: { users, total }
      // } = res.data;
      if (res.status === 200) {
        // 1.给表格数据赋值
        // 给总数赋值
        // 提示
        // 表格通过prop进行赋值展示一般数据
        this.userlist = res.data.data.list;
        this.total = res.data.data.totalCount;
        // this.$message.success(msg);
      } else {
        this.$message.warning("获取失败");
      }
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
.el-tooltip__popper {
  max-width: 0%;
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
.red_s{
  color: red;
}
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

