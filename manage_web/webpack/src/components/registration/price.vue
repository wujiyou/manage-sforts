<template>
  <div>
    <div style="background:white;width:99.1%;padding-left:15px">
      <my-bread level1="气瓶登记" level2="气瓶价格查看"></my-bread>
    </div>
    <el-card class="box-card" style="margin:20px 20px 0 20px;">
      <!--搜索  -->
      <el-row></el-row>

      <el-col :span="24">
        <p
          style="width:100%;height:1px;background:rgb(236, 232, 232);margin:20px 0px 0px 0px;z-index:999"
        ></p>
      </el-col>

      <el-col style="margin-bottom:5px;margin-top:5px" :span="24">
         <el-col :span="20">&nbsp;</el-col>
        <el-col :span="2">
          <el-button size="small" type="success" style="margin-left:10px;font-size:13px" @click="firstAddUserDia()">
            <i style="padding-right:10px" class="el-icon-top"></i>返回上一界面
          </el-button>
        </el-col>
        
        <el-col style="margin-left:10px;" hidden :span="2">
          <el-button  @click="showAddUserDia()" size="small" style="font-size:13px">
            <i style="padding-right:10px" class="el-icon-plus"></i>新增
          </el-button>
        </el-col>
      </el-col>
      <!-- 表格 -->
      <template>
        <el-table
          :row-style="{height:'40px'}"
          :cell-style="{padding:'0px'}"
          border
          :data="userlist"
          style="width: 100%;margin:10px 0px;padding-bottom:40px"
        >
          <el-table-column type="index" label="序号" width="70" show-overflow-tooltip></el-table-column>
          <el-table-column prop="volume" label="规格(kg)"></el-table-column>
          <el-table-column prop="medium" label="介质"></el-table-column>
          <el-table-column prop="price" label="价格(元)"></el-table-column>
        </el-table>
      </template>

      <el-dialog
        title="价格添加"
        v-dialogDrag
        ref="dialog__wrapper"
        :close-on-click-modal="false"
        :visible.sync="dialogFormVisibleAdd"
      >
        <el-form :model="form" ref="form">
          <el-col :span="24">
            <el-col :span="11">
              <el-form-item label="规格(kg)" label-width="100px" prop="volume">
                <el-input v-model="form.volume" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="2"></el-col>
            <el-col :span="11">
              <el-form-item label="介质" label-width="100px" prop=" medium">
                <el-input v-model="form.medium" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="11">
              <el-form-item label="价格(元)" label-width="100px" prop="price">
                <el-input v-model="form.price" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
          <el-button type="primary" @click="AddUser()">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
export default {
  name: "price",
  data() {
    return {
      userlist: [],
      unitId: "",
      dialogFormVisibleAdd: false,
      form: {
        unitId: "",
        medium: "",
        volume: "",
        price: ""
      }
    };
  },
  created() {
    this.getUserlist();
  },
  methods: {
    firstAddUserDia() {
      this.$router.push({ name: "registration6" });
    },
    showAddUserDia() {
      this.dialogFormVisibleAdd = true;
    },
    AddUser() {
      this.form.unitId = this.unitId;
      this.$http.post(`/unit-prices/add`, this.form).then(res => {
        console.log(res);
        if (res.data.code == 0) {
          this.$message({
            type: "success",
            message: res.data.msg
          });
          this.dialogFormVisibleAdd = false;
          this.getUserlist();
        }

        //   this.total = res.data.data.totalCount;
      });
    },
    getUserlist() {
      // /unit-prices/{unitId}
      this.unitId = this.$route.query.id;
      console.log(this.unitId);
      console.log(this.ids);
      this.$http.get(`/unit-prices/${this.unitId}`).then(res => {
        console.log(res);
        this.userlist = res.data.data;
        //   this.total = res.data.data.totalCount;
      });
    }
  }
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
.el-table td,
.el-table th {
  text-align: center !important;
}
</style>