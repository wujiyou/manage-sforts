<template>
  <div>
    <div style="background:white;width:99.1%;padding-left:15px">
      <my-bread level1="系统管理" level2="角色管理"></my-bread>
    </div>
    <el-card class="box-card" style="margin:20px 20px 0 20px;">
      <!--搜索  -->
      <el-row>
        <el-col :span="24">
          <h5 style="border-bottom:1px solid #ece8e8;padding-bottom:15px;padding-left:15px">查询信息</h5>
        </el-col>
        <el-col style="padding-left:15px" :span="22">
          <el-col :span="4">
            <el-date-picker
              size="small"
              style="width: 100%;"
              type="date"
              placeholder="操作时间"
              @clear="loadUserList()"
              clearable
              v-model="createdTime"
              @input="searchUser()"
            ></el-date-picker>
          </el-col>
          <el-col :span="4" style="margin-left:30px">
            <el-select
              size="small"
              style="width: 100%;"
              @clear="loadUserList()"
              clearable
              v-model="type"
              @input="searchUser()"
              placeholder="请选择角色类型"
            >
              <el-option
                v-for="item in optionsname"
                :key="item.id"
                :label="item.label"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-col>
          <el-col style="margin-left:30px" :span="4">
            <el-button
              style="width:100%;"
              size="small"
              @click="searchUser()"
              class="el_button"
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
          <el-button type="success" @click="showAddUserDia()" style="font-size:13px" size="small">
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
            @click="showDeleUserMsgBox"
          >删除</el-button>
        </el-col>
      </el-col>

      <!-- 表格 -->
      <template>
        <el-table
          border
          :data="userlist"
          style="width: 100%;margin:20px 5px;padding-bottom:40px"
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
          <!-- <el-table-column show-overflow-tooltip prop="code" label="角色编号"></el-table-column> -->
          <el-table-column prop="createdTime" label="创建时间" show-overflow-tooltip>
            <template slot-scope="socpe">{{socpe.row.createdTime | fmtdate}}</template>
          </el-table-column>
          <el-table-column prop="type" label="角色类型" :formatter="ifendcase" show-overflow-tooltip></el-table-column>
          <el-table-column prop="name" label="角色名称" show-overflow-tooltip></el-table-column>
          <el-table-column prop="note" label="备注" show-overflow-tooltip></el-table-column>
          <!-- 表格操作 -->
          <el-table-column prop="address" width="150" label="操 作">
            <template slot-scope="scope">
              <!-- size 调整按钮大小 -->
              <!-- 编辑 -->
              <!-- <el-tooltip
                class="item"
                effect="dark"
                content="修改角色"
                :enterable="false"
                placement="top"
              >
                <el-button
                  type="primary"
                  size="mini"
                  title="编辑"
                  plain
                  icon="el-icon-edit"
                  @click="showEdituser(scope.row)"
                  circle
                ></el-button>
              </el-tooltip>-->

              <el-tooltip
                class="item"
                effect="dark"
                content="授权管理"
                :enterable="false"
                placement="top"
              >
                <el-button
                  type="success"
                  size="mini"
                  title="授权管理"
                  plain
                  icon="el-icon-s-order"
                  @click="userNewRole(scope.row)"
                  circle
                ></el-button>
              </el-tooltip>

              <!-- 删除 -->

              <!-- <el-tooltip
                class="item"
                effect="dark"
                content="删除角色"
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
        title="添加角色"
        :close-on-click-modal="false"
        v-dialogDrag
        ref="dialog__wrapper"
        :visible.sync="dialogFormVisibleAdd"
      >
        <el-form :model="form" :rules="rules" ref="form">
          <el-col :span="24">
            <!-- <el-col :span="10">
              <el-form-item label="角色编号" label-width="100px" prop="code">
                <el-input v-model="form.code" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>-->
            <!-- <el-col :span="2">&nbsp;</el-col> -->
            <el-col :span="10">
              <el-form-item label="角色类型" class="red_s" label-width="100px" prop="type">
                <el-select width="100%" v-model="form.type" placeholder="请选择">
                  <el-option
                    v-for="item in optionsname"
                    :key="item.id"
                    :label="item.label"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="10">
              <el-form-item label="角色名称" label-width="100px" prop="name">
                <el-input v-model="form.name" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="10">
              <el-form-item label="备注" label-width="100px" prop="note">
                <el-input v-model="form.note" autocomplete="off"></el-input>
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
        :close-on-click-modal="false"
        :visible.sync="dialogFormVisibleEdit"
      >
        <el-form :model="editUserForm" :rules="rules">
          <el-col :span="24">
            <el-col :span="10">
              <el-form-item label="角色类型" label-width="100px" prop="type">
                <el-select v-model="editUserForm.type" placeholder="请选择">
                  <el-option
                    v-for="item in optionsname"
                    :key="item.id"
                    :label="item.label"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="10">
              <el-form-item label="角色名称"  label-width="100px" prop="name">
                <el-input v-model="editUserForm.name" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="10">
              <el-form-item label="备注" label-width="100px" prop="note">
                <el-input v-model="editUserForm.note" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-form-item hidden label="Id" label-width="100px" prop="id">
              <el-input v-model="editUserForm.id" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
          <el-button type="primary" @click="EditUser()">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 添加权限用户对话框 -->
      <el-dialog
        title="添加权限"
        :close-on-click-modal="false"
        :visible.sync="dialogFormVisiblesetrole"
      >
        <p style="margin:0px 20px 20px 20px">角色名称：{{this.jiaoname}}</p>
        <!-- <el-col :span="24">
          <el-form :model="editUserForm">
            <el-col :span="24">
              <el-form-item label="角色名称" label-width="100px" prop="name">
                <el-input v-model="editUserForm.name" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-form>
        </el-col>-->

        <!-- 树形结构 -->
        <!-- 
        data数据源
        show-checkbox选择框
        node-key每个节点的唯一标识 通常是data数据源key名id
        :default-expanded-keys默认展开[要展开的节点的id]
        :default-checked-keys="[5]" [要选择的节点的id]
        :props配置项 {label,children}
        label节点的文字标题和children节点的字节点
        值都来源于data所绑定的数据中的该数据的key名label和children
        :default-expanded-keys="[2, 3]"
        :default-checked-keys="[5]"
         :default-expanded-keys="arrexpand" 根据拿到所有id展示
          default-expand-all 自带属性展开
        -->
        <el-tree
          top="1vh"
          ref="tree"
          :data="treeRole"
          show-checkbox
          node-key="id"
          default-expand-all
          :default-checked-keys="arrcheck"
          :props="defaultProps"
        ></el-tree>

        <div slot="footer" class="dialog-footer">
          <el-button @click="Visiblesetrole()">取 消</el-button>
          <el-button type="primary" @click="dialogsetrole()">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
export default {
  name: "administration",
  data() {
    return {
      id: {
        id: "",
      },
      type: "",
      //角色类型
      optionsname: [
        {
          id: 0,
          label: "web管理员",
        },
        {
          id: 1,
          label: "企业",
        },
        {
          id: 2,
          label: "机构",
        },
      ],
      defaultProps: {
        label: "name",
        children: "children",
      },
      createdTime: "",
      unitId: "",
      userlist: [],
      //分页相关数据
      total: -1,
      rows: 10,
      page: 1,
      jiaoname: "",
      // 权限id
      arrcheck: [],
      // page=${this.page}&rows=${this.rows}
      // 添加对话框的属性
      dialogFormVisibleAdd: false,
      dialogFormVisibleEdit: false,
      dialogFormVisiblesetrole: false,
      // dialogFormVisibleRoleshow: false,
      //添加用户的表单的数据
      rules: {
        // code: [
        //   { required: true, message: "角色编号不能为空", trigger: "blur" }
        // ],
        // name: [
        //   { required: true, message: "角色编号不能为空", trigger: "blur" }
        // ],

        type: [
          { required: true, message: "角色类型不能为空", trigger: "blur" },
        ],
      },
      form: {
        // code: "",
        name: "",
        note: "",
        type: "",
      },
      // 编辑
      editUserForm: {
        id: "",
        // code: "",
        name: "",
        note: "",
        type: "",
      },
      // 分配角色,
      currRoleId: -1,

      // 当前即将分配权限的Id
      currRolesId: 0,
      //分配当前用户id
      currusrId: -1,
      // 用户权限数据
      treeRole: [],
      roles: [],
      currUsername: "",
      userId: [],
      multipleSelection: [], //批量删除数据
      delarr: [], //批量删除id
      //   保存所有角色数据
    };
  },
  watch: {
    dialogFormVisibleAdd: function (val, oldVla) {
      this.$refs["form"].resetFields();
    },
  },
  methods: {
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
          message: "请选择需要删除的角色",
        });
      } else {
        this.$confirm("是否删除角色?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(async () => {
            // 注意async的位置，最近的位置
            // 发送删除请求:id:用户id
            // 1.data中找userId
            // 2.把userID以showDeleUserMsgBox参数形式传进来
            const res = await this.$http.post(`/role/delete`, this.delarr);
            console.log(res);
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
                type: "success",
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
    //清空搜索框搜索数据 点击清楚按钮清除数据重新发送请求
    loadUserList() {
      this.getUserlist();
    },
    // 修改权限请求数据按钮
    async dialogsetrole() {
      // const res = await this.$http.post(`roles/:${this.currRolesId}/rights`,{rids:});
      //  roles/:roleId/rights
      // roleId当前修改角色权限id
      // rids树形节点中 所有全选和半选的角色id
      // 获取全选数组arr1  getChekedKeys
      // el-tree标签js方法
      // el-tree js 方法getChekedKeys
      // 给操作的dom元素 设置ref属性值 input ref='txt'
      // this.$refs.refs属性值.js方法名() this.$refs.txt.foucs()

      // div js方法/属性innerText
      // 1.获取div -》DOM元素
      // 2.DOM.innerText
      // var div = document.getElementById('div)
      // div.innerText;

      // 获取全选数组arr1
      let arr1 = this.$refs.tree.getCheckedKeys();
      console.log(arr1);

      // 获取半选数组arr2  getHalfChekedKeys
      let arr2 = this.$refs.tree.getHalfCheckedKeys();
      console.log(arr2);

      for (let i = 0; i < arr2.length; i++) {
        arr1.push(arr2[i]);
      }
      console.log(arr1);

      //  es6展开运算符
      // let arr = [...arr1, ...arr2];
      // const idStr = arr.join(",");
      this.userId = arr1;
      console.log(this.userId);

      const res = await this.$http.post(
        `/role-permission/${this.currRolesId}`,
        this.userId
      );
      console.log(res);
      if (res.data.code == 0) {
        this.$message.success(res.data.msg);
        this.dialogFormVisiblesetrole = false;
        this.getUserlist();
      } else if (res.data.code == 1) {
        this.$message.success(res.data.msg);
      }

      // 关闭对话框

      //arr=arr1+arr2
    },
    // 权限
    async userNewRole(role) {
      //  this.arrcheck = [];
      // this.getUserlist();
      this.jiaoname = role.name;
      this.dialogFormVisiblesetrole = true;
      this.currRolesId = role.id;
      const res = await this.$http.get(`/Permission/findAll`);
      this.treeRole = res.data;
      console.log(res);

      this.arrcheck = [];

      const ress = await this.$http.get(
        `/role-permission/role/${this.currRolesId}`
      );
      console.log(ress);

      if (ress.data.code == 0) {
        let roles = ress.data.data;
        let arrtemp2 = [];
        let arrt1=[]
        // roles.forEach(item1 => {
        //   arrtemp2.push(item1.id);
        // });
        console.log(roles)
        roles.forEach((item1) => {
          console.log(item1)
          if(item1.children !=""){
            item1.children.forEach(item2 =>{
              console.log(item2);
              if(item2.children !=""){
                  item2.children.forEach(item3 =>{
                    console.log(item3);
                    arrtemp2.push(item3.id);
                  })
              }else{
                  console.log("+++++++++++++++++");
                  arrtemp2.push(item2.id);
              }
            })
          }else{
            console.log("__+______________________________");
            arrtemp2.push(item1.id);
          }
        });
        console.log(arrtemp2);
        this.arrcheck = arrtemp2;
      }

      // console.log(role);
    },
    Visiblesetrole() {
      this.arrcheck = [];
      this.dialogFormVisiblesetrole = false;
      this.getUserlist();
    },
    //角色类型的添加和修改显示
    ifendcase(val) {
      // console.log(val);
      if (val.type == 0) {
        return "web管理员";
      } else if (val.type == 1) {
        return "企业";
      } else if (val.type == 2) {
        return "机构";
      }
      //  else if (val.type == 3) {
      //   return "充装单位";
      // } else if (val.type == 4) {
      //   return "配送单位";
      // } else if (val.type == 5) {
      //   return "使用单位";
      // } else if (val.type == 6) {
      //   return "其他单位";
      // }
    },
    // 编辑用户
    // 编辑用户发送请求
    async EditUser() {
      //   users/:id
      this.dialogFormVisibleEdit = false;
      const res = await this.$http.put(`/role`, this.editUserForm);
      console.log(res);
      if (res.data.code == 0) {
        this.$message({
          type: "success",
          message: res.data.msg,
        });
        this.getUserlist();
      } else {
        this.$message({
          type: "error",
          message: "新增失败",
        });
      }
    },

    // 编辑对话框打开
    showEdituser(user) {
      // 2.添加对话框
      this.dialogFormVisibleEdit = true;
      this.editUserForm = user;

      this.getUserlist();
      //user其实就是scope.row也就是userlist
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
    //       const res = await this.$http.delete(`/role/${userId}`);
    //       console.log(res);
    //       if (res.data.code == 0) {
    //         this.$message.success(res.data.msg);
    //       } else {
    //         this.$message.error("删除失败");
    //       }
    //       this.getUserlist();
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
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          const res = await this.$http.post(`/role`, this.form);
          console.log(res);
          if (res.data.code == 0) {
            this.$message({
              type: "success",
              message: "新增成功",
            });
            this.dialogFormVisibleAdd = false;
          } else {
            this.$message({
              type: "error",
              message: "新增失败",
            });
          }
          // 2.关闭对话框

          this.getUserlist();
        } else {
          this.$message({
            type: "error",
            message: "请填写内容再试",
          });
          this.dialogFormVisibleAdd = true;
        }
      });

      // console.log(res);
    },
    // 查询单位名称
    // async selectedDia() {
    //   const res = await this.$http.get(`/unit/findAll`);
    //   // console.log(res);
    //   this.options = res.data.data;
    // },
    // 添加用户显示对话框
    async showAddUserDia() {
      // 先点编辑 再点添加 打开表单清空表单

      this.dialogFormVisibleAdd = true;
    },
    //清空搜索框搜索数据 点击清楚按钮清除数据重新发送请求
    loadUserList() {
      this.createdTime = "";
      this.searchUser();
    },
    // 搜索功能
    async searchUser() {
      const dering = this.createdTime;
      if (dering == "") {
        this.getUserlist();
      } else if (dering === null) {
        this.createdTime = "";
        this.getUserlist();
      } else {
        const resDate =
          dering.getFullYear() +
          "-" +
          (dering.getMonth() + 1) +
          "-" +
          dering.getDate();
        const res = await this.$http.get(
          `/role/findPage?page=${this.page}&rows=${this.rows}&createdTime=${resDate}&type=${this.type}`
        );
        console.log(res);
        this.userlist = res.data.data.list;
        this.total = res.data.data.totalCount;
        this.page = 1;
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
      this.searchUser();
    },
    handleCurrentChange(val) {
      //页码改变时
      console.log(`当前页: ${val}`);
      this.page = val;
      this.searchUser();
    },
    async getUserlist() {
      //需要授权的API ，必须在请求头中使用Authorization 字段token令牌
      //pagenum当前页面   pagesize每页显示条数
      //接口文档中 除了登录接口之外的所有请求都需要进行授权，设置请求头
      //找axios中关于请求头的代码  写在了http.js中
      // const AUTH_TOKEN = localStorage.getItem("token");
      // this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;
      const res = await this.$http.get(
        `/role/findPage?page=${this.page}&rows=${this.rows}&createdTime=${this.createdTime}&type=${this.type}`
      );
      console.log(res);
      this.userlist = res.data.data.list;
      this.total = res.data.data.totalCount;
    },
  },
  created() {
    this.getUserlist();
    // this.selectedDia();
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

</style>
<style>
.el-table th,
.el-table td {
  text-align: center !important;
}
.red_s{
  color: red;
}
</style>