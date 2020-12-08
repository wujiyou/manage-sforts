<template>
  <div>
    <div style="background:white;width:99.1%;padding-left:15px">
      <my-bread level1="综合查询" level2="移动充装" level3="检验变更记录"></my-bread>
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
                placeholder="使用登记证号"
                v-model="regNum"
              ></el-input>
            </el-col>

            <el-col style="padding-left:30px" :span="4">
              <el-input
                size="small"
                style=" width: 100%;"
                @clear="loadUserList()"
                clearable
                class="input-serach"
                placeholder="车牌号"
                v-model="carNum"
              ></el-input>
            </el-col>

            <el-col style="padding-left:30px" :span="4">
              <el-input
                size="small"
                style=" width: 100%;"
                @clear="loadUserList()"
                clearable
                class="input-serach"
                placeholder="铭牌号"
                v-model="nameplate"
              ></el-input>
            </el-col>

            <el-col style="padding-left:30px" :span="4">
              <el-input
                size="small"
                style=" width: 100%;"
                @clear="loadUserList()"
                clearable
                class="input-serach"
                placeholder="使用单位"
                v-model="useUnit"
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
      </el-row>

      <el-col :span="24">
        <p
          style="width:100%;height:1px;background:rgb(236, 232, 232);margin:20px 0px 0px 0px;z-index:999"
        ></p>
      </el-col>
      <el-col style="margin-bottom:5px;margin-top:5px" :span="24">
        <el-col :span="20">&nbsp;</el-col>

        <el-col :span="2">
          <el-button type="success" @click="showAddUserDia()" style="font-size:13px" size="small">
            <i style="padding-right:10px" class="el-icon-plus"></i>新增
          </el-button>
        </el-col>

        <el-col :span="2">
          <el-button
            size="small"
            type="danger"
            plain
            style="font-size:13px"
            icon="el-icon-delete"
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
          <el-table-column type="index" label="序号" width="50">
            <template slot-scope="socpe">
              <p style="cursor:pointer;" @click="showEdituser(socpe.row)">{{socpe.$index+1}}</p>
            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip prop="carNum" label="车牌号"></el-table-column>
          <el-table-column show-overflow-tooltip prop="regNum" label="登记证号"></el-table-column>
          <el-table-column show-overflow-tooltip prop="useUnit" label="使用单位"></el-table-column>
          <el-table-column show-overflow-tooltip prop="unitCode" label="单位内部编号"></el-table-column>

          <el-table-column show-overflow-tooltip prop="nameplate" label="铭牌编号"></el-table-column>
          <el-table-column sortable show-overflow-tooltip prop="checkDate" label="检验日期">
            <template slot-scope="socpe">{{socpe.row.checkDate | fmtdate}}</template>
          </el-table-column>
          <el-table-column sortable show-overflow-tooltip prop="nextCheckDate" label="下次检验时间">
            <template slot-scope="socpe">{{socpe.row.nextCheckDate | fmtdate}}</template>
          </el-table-column>
          <el-table-column show-overflow-tooltip prop="medium" label="介质"></el-table-column>
          <el-table-column sortable show-overflow-tooltip prop="createdTime" label="创建时间">
            <template slot-scope="socpe">{{socpe.row.createdTime | fmtdate}}</template>
          </el-table-column>
          <el-table-column sortable show-overflow-tooltip prop="updatedTime" label="修改日期">
            <template slot-scope="socpe">{{socpe.row.updatedTime | fmtdate}}</template>
          </el-table-column>
          <el-table-column  show-overflow-tooltip prop="img" label="上传图片">
            <template slot-scope="socpe">
              <img :src="socpe.row.img" min-width="70" height="70" />
            </template>
          </el-table-column>

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
        width="80%"
      >
        <el-form @keyup.enter.native="AddUser" :model="form" :rules="rulses" ref="form">
          <el-col :span="24">
            <el-col :span="8">
              <el-form-item label="车牌号:" label-width="140px">
                <el-input v-model="form.carNum" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="登记证号:" label-width="140px">
                <el-input v-model="form.regNum" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="使用单位:" prop="useUnit" label-width="140px">
                <el-input v-model="form.useUnit" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="8">
              <el-form-item label="单位内部编号:" label-width="140px" prop="unitCode">
                <el-input v-model="form.unitCode" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="铭牌号:" label-width="140px">
                <el-input v-model="form.nameplate" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="检验日期:" label-width="140px">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="form.checkDate"
                  value-format="yyyy-MM-dd"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="8">
              <el-form-item label="下次检验时间:" label-width="140px">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="form.nextCheckDate"
                  value-format="yyyy-MM-dd"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="介质:" label-width="140px">
                <el-input v-model="form.medium" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="创建日期:" label-width="140px">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="form.createdTime"
                  value-format="yyyy-MM-dd"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="8">
              <el-form-item label="修改日期:" label-width="140px">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="form.updatedTime"
                  value-format="yyyy-MM-dd"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="报告编号:" label-width="140px">
                <el-input v-model="form.reportNumber" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="设备名称:" label-width="140px">
                <el-input v-model="form.deviceName" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="8">
              <el-form-item label="检验类别:" label-width="140px">
                <el-select
                  style=" width: 100%;"
                  filterable
                  v-model="form.categoryCheck"
                  placeholder="请选择单位名称"
                >
                  <el-option
                    v-for="(item , i) in select6"
                    :key="i"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="制造单位:" label-width="140px">
                <el-input v-model="form.manufacturingUnit" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="下次全面检验日期:" label-width="140px">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="form.nextFullInspectionDate"
                  value-format="yyyy-MM-dd"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="8">
              <el-form-item label="图片上传:" label-width="140px">
                <el-upload
                  class="upload-demo"
                  action
                  :http-request="uploadFile"
                  :before-upload="beforeAvatarUpload"
                  list-type="picture"
                >
                  <el-button size="small" type="primary">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过1M</div>
                </el-upload>
                <!-- <el-upload
                  class="upload-demo"
                  action
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :before-remove="beforeRemove"
                  multiple
                  :limit="1"
                  :http-request="uploadFile"
                  :on-exceed="handleExceed"
                  accept="image/jpeg, image/png, image/bmp"
                  :file-list="fileList"
                >
                  <el-button size="small" type="primary">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过1M</div>
                </el-upload>-->
              </el-form-item>
            </el-col>
            <!-- <el-col :span="8">
              <el-form-item label="制造单位:" label-width="140px">
                <el-input v-model="form.manufacturingUnit" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="下次全面检验日期:" label-width="140px">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="form.nextFullInspectionDate"
                  value-format="yyyy-MM-dd"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
              
            </el-col>-->
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
        :visible.sync="dialogFormVisibledite"
        width="80%"
      >
        <el-form @keyup.enter.native="AddUsers" :model="form" :rules="rulses" ref="form">
          <el-col :span="24">
            <el-col :span="8">
              <el-form-item label="登记证号:" prop="regNum" label-width="140px">
                <el-input v-model="edform.regNum" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="使用单位:" prop="useUnit" label-width="140px">
                <el-input v-model="edform.useUnit" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="单位内部编号:" label-width="140px" prop="unitCode">
                <el-input v-model="edform.unitCode" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="8">
              <el-form-item label="铭牌号:" label-width="140px" prop="nameplate">
                <el-input v-model="edform.nameplate" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="检验日期:" label-width="140px">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="edform.checkDate"
                  value-format="yyyy-MM-dd"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="下次检验时间:" label-width="140px">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="edform.nextCheckDate"
                  value-format="yyyy-MM-dd"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="8">
              <el-form-item label="介质:" label-width="140px" prop="medium">
                <el-input v-model="edform.medium" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="创建日期:" label-width="140px">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="edform.createdTime"
                  value-format="yyyy-MM-dd"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="修改日期:" label-width="140px">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="edform.updatedTime"
                  value-format="yyyy-MM-dd"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="8">
              <el-form-item hidden label="id:" label-width="140px" prop="id">
                <el-input v-model="edform.id" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibledite = false">取 消</el-button>
          <el-button type="primary" @click="AddUsers()">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
export default {
  name: "trace",
  data() {
    return {
      regNum: "",
      carNum: "",
      nameplate: "",
      useUnit: "",
      // createTime: "",
      // createTime2: "",
      userlist: [],
      select6: [
        {
          id: 0,
          name: "年度检验",
        },
        {
          id: 1,
          name: "全面检验",
        },
      ],
      form: {
        carNum: "", //车牌号
        regNum: "", //档案登记
        useUnit: "", //单位内编号
        unitCode: "", //单位内编号
        nameplate: "", //铭牌号
        checkDate: "", //检验日期
        nextCheckDate: "", //下次检验日期
        medium: "", //介质
        createdTime: "", //创建日期
        updatedTime: "", //修改日期
        reportNumber: "", //报告编号
        deviceName: "", //设备名称
        categoryCheck: "", //检验类别
        manufacturingUnit: "", //制造单位
        nextFullInspectionDate: "", //下次全面检验日期
        img: "",
        // bottleType: ""
      },

      edform: {
        id: "",
        // carNum: "", //车牌号
        regNum: "", //档案登记
        useUnit: "", //单位内编号
        unitCode: "", //单位内编号
        nameplate: "", //铭牌号
        checkDate: "", //检验日期
        nextCheckDate: "", //下次检验日期
        medium: "", //介质
        createdTime: "", //创建日期
        updatedTime: "", //修改日期

        // bottleType: ""
      },
      rulses: {},
      //分页相关数据
      total: -1,
      currPage: 1,
      page: 1,
      pageSize: 10,

      dialogFormVisibleAdd: false,
      dialogFormVisibledite: false,
      multipleSelection: [], //批量删除数据
      delarr: [], //批量删除id
    };
  },
  watch: {
    dialogFormVisibleAdd: function (val, oldVla) {
      this.$refs["form"].resetFields();
    },
  },

  methods: {
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传图片大小不得超过2MB!");
      }
      //  校验不通过则不上传文件
      return isLt2M && isLt2M;
    },
    async uploadFile(item) {
      let file = item.file;
      console.log(file);
      let blod = new Blob([file]);
      let file1 = new File([blod], file.name, { type: file.type });
      let form = new FormData();
      form.append("file", file1);
      console.log(`看这里${JSON.stringify(this.form)}`);
      console.log(`这里${JSON.stringify(item)}`);
      await this.$http({
        method: "post",
        url: `/mobile-inspect/saveImage`,
        data: form,
        headers: {
          "Content-Type": "multipart/form-data",
          //  Authorization: localStorage.getItem("access_token")
        },
      }).then((res) => {
        console.log(res);
        this.form.img = res.data;
        // 提示
        this.$message({
          type: "success",
          message: "上传成功",
        });
      });
      // console.log(`数据${JSON.stringify(res)}`)
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
      // this.delarrs=JSON.stringify(this.delarr)
      console.log(this.delarr);
      if (this.delarr == "") {
        this.$message({
          type: "error",
          message: "请选择需要删除的数据",
        });
      } else {
        this.$confirm("删除用户, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(async () => {
            // 注意async的位置，最近的位置
            // 发送删除请求:id:用户id
            // 1.data中找userId
            // 2.把userID以showDeleUserMsgBox参数形式传进来
            const res = await this.$http.post(
              `/mobile-inspect/delete`,
              this.delarr
            );
            console.log(res);
            // this.getUserlist();
            this.delarr = [];
            // 提示
            if (res.data.code == 0) {
              this.$message({
                type: "success",
                message: res.data.msg,
              });
              this.getUserlist();
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
    // 修改
    showEdituser(user) {
      this.dialogFormVisibledite = true;
      this.edform = user;
    },
    async AddUsers() {
      const res = await this.$http.put(`/mobile-inspect`, this.edform);
      console.log(res);
      if (res.data.code == 0) {
        this.$message({
          type: "success",
          message: res.data.msg,
        });
        this.dialogFormVisibledite = false;
        this.getUserlist();
      } else if (res.data.code == 1) {
        this.$message({
          type: "error",
          message: res.data.msg,
        });
      }
    },
    //新增
    showAddUserDia() {
      this.form = {};
      this.dialogFormVisibleAdd = true;
    },
    async AddUser() {
      //  /mobile-inspect
      const res = await this.$http.post(`/mobile-inspect`, this.form);
      console.log(res);
      if (res.data.code == 0) {
        this.$message({
          type: "success",
          message: res.data.msg,
        });
        this.dialogFormVisibleAdd = false;
        this.getUserlist();
      } else if (res.data.code == 1) {
        this.$message({
          type: "error",
          message: res.data.msg,
        });
      }
    },
    //清空搜索框搜索数据 点击清楚按钮清除数据重新发送请求
    loadUserList() {
      this.getUserlist();
    },
    // 搜索用户 给搜索框绑定query v-model="query"
    async searchUser() {
      const res = await this.$http.get(
        `mobile-inspect/findPage?rows=${this.pageSize}&page=1&carNum=${this.carNum}&nameplate=${this.nameplate}&useUnit=${this.useUnit}&regNum=${this.regNum}`
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
        `mobile-inspect/findPage?rows=${this.pageSize}&page=${this.currPage}&carNum=${this.carNum}&nameplate=${this.nameplate}&useUnit=${this.useUnit}`
      );
      // &name=${this.name}
      console.log(res);
      this.userlist = res.data.data.list;
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