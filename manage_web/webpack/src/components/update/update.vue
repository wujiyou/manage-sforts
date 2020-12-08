<template>
  <div>
    <div style="background:white;width:99.1%;padding-left:15px">
      <my-bread level1="系统管理" level2="应用更新"></my-bread>
    </div>
    <el-card class="box-card" style="margin:20px 20px 0 20px;">
      <el-col style="margin-bottom:10px;margin-top:10px" :span="24">
        <el-col :span="20">&nbsp;</el-col>
        <el-col :span="2">
          <el-button type="success" @click="showAddUserDia()" style="font-size:13px" size="small">
            <i style="padding-right:10px" class="el-icon-plus"></i>新增
          </el-button>
        </el-col>

        <!-- <el-col :span="2">
          <el-button type="danger" size="mini" plain icon="el-icon-delete" @click="showDeleUserMsgBox">删除</el-button>
        </el-col>-->
      </el-col>
      <!--搜索  -->
      <!-- <el-row>
      <el-col :span="3">
        <el-button @click="showAddUserDia()" type="primary">
          <i style="padding-right:10px" class="el-icon-plus"></i>新增
        </el-button>
      </el-col>
      </el-row>-->
      <!-- 表格 -->
      <el-col :span="24">
        <p
          style="width:100%;height:1px;background:rgb(236, 232, 232);margin:20px 0px 0px 0px;z-index:999"
        ></p>
      </el-col>
      <template>
        <el-table
          border
          :data="userlist"
          style="width: 100%;margin:10px 0px;padding-bottom:40px"
          :row-style="{height:'40px'}"
          :cell-style="{padding:'0px'}"
        >
          <el-table-column type="index" label="序号" width="50">
            <template slot-scope="socpe">
              <p style="cursor:pointer;" @click="showEdituser(socpe.row)">{{socpe.$index+1}}</p>
            </template>
          </el-table-column>
          <el-table-column prop="name" show-overflow-tooltip label="系统名称"></el-table-column>
          <el-table-column prop="packageName" show-overflow-tooltip label="包名"></el-table-column>
          <el-table-column prop="editionNo" show-overflow-tooltip label="版本"></el-table-column>
          <el-table-column prop="editionCreateName" show-overflow-tooltip label="发布人"></el-table-column>
          <el-table-column prop="editionType" show-overflow-tooltip label="是否发布">
            <template slot-scope="scope">
              <p v-if="userlist[scope.$index].editionType==0">否</p>
              <p v-if="userlist[scope.$index].editionType==1">是</p>
            </template>
          </el-table-column>
          <el-table-column prop="editionCreateTime" show-overflow-tooltip label="发布时间">
            <template slot-scope="socpe">{{socpe.row.editionCreateTime | fmtdate}}</template>
          </el-table-column>
          <!-- <el-table-column prop="num" label="更新内容"></el-table-column> -->
        </el-table>
      </template>

      <el-dialog
        title="应用更新"
        width="70%"
        v-dialogDrag
        ref="dialog__wrapper"
        :close-on-click-modal="false"
        :visible.sync="dialogFormVisibleAdd"
      >
        <el-form :model="form">
          <el-col :span="24">
            <el-form-item label="包名:" label-width="140px" prop="packageName">
              <el-input v-model="form.packageName" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="发布人:" label-width="140px" prop="editionCreateName">
              <el-input v-model="form.editionCreateName" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="版本号:" label-width="140px" prop="editionNo">
              <el-input v-model="form.editionNo" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-form>
        <p slot="footer" class="dialog-footer" style="text-align: center;">
          <el-col :span="10">&nbsp;</el-col>

          <el-col :span="2">
            <el-upload
              class="upload-demo"
              action
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :http-request="uploadFile"
              :on-success="handleSuccess"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-col>

          <span style="display:inline-block;position:relative;left:-260px;">
            <el-button size="small" @click="dialogFormVisibleAdd = false">取 消</el-button>

            <el-button size="small" type="primary" @click="AddUser()">确 定</el-button>
          </span>

          <!-- http://192.168.0.16:8081/edition/appUpload -->
        </p>
      </el-dialog>

      <el-dialog
        title="修改应用更新"
        width="70%"
        v-dialogDrag
        ref="dialog__wrapper"
        :close-on-click-modal="false"
        :visible.sync="dialogFormedite"
      >
        <el-form :model="form">
          <el-col :span="24">
            <el-form-item label="包名:" label-width="140px" prop="packageName">
              <el-input v-model="editeForm.packageName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item hidden label="包名:" label-width="140px" prop="id">
              <el-input v-model="editeForm.id" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="发布人:" label-width="140px" prop="editionCreateName">
              <el-input v-model="editeForm.editionCreateName" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="版本号:" label-width="140px" prop="editionNo">
              <el-input v-model="editeForm.editionNo" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-form>
        <p slot="footer" class="dialog-footer" style="text-align: center;">
          <el-col :span="10">&nbsp;</el-col>

          <el-col :span="2">
            <el-upload
              class="upload-demo"
              action
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :http-request="uploadFile"
              :on-success="handleSuccess"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-col>

          <span style="display:inline-block;position:relative;left:-260px;">
            <el-button size="small" @click="dialogFormedite = false">取 消</el-button>

            <el-button size="small" type="primary" @click="EditeUser()">确 定</el-button>
          </span>

          <!-- http://192.168.0.16:8081/edition/appUpload -->
        </p>
      </el-dialog>
      <!-- <el-pagination
      style="border:1px solid #ebeef5;padding:5px 15px;display:flex; justify-content: flex-end;"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currpage"
      :page-sizes="[1,4,8,12,16]"
      :page-size="4"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      ></el-pagination>-->
    </el-card>
  </div>
</template>
<script>
// 气瓶信息管理
// import Message from "@/components/archives/message"
import cityData from "@/components/archives/citydata.js";
export default {
  name: "cylinder",
  data() {
    return {
      userlist: [],
      form: {
        editionNo: "",
        packageName: "",
        editionCreateName: "",
        name: ""
      },
      dialogFormVisibleAdd: false,
      dialogFormedite: false,
      headers: {
        Authorization: sessionStorage.getItem("access_token")
      },
      editeForm: {
        id: "",
        editionNo: "",
        packageName: "",
        editionCreateName: "",
        name: ""
      },
      name: "",
      codes: ""
      //   //分页相关数据
      // total: -1,
      // currpage: 1,
      // page: 1,
      // pageSize: 4,
    };
  },
  methods: {
    // 修改弹出框
    showEdituser(user) {
      this.editeForm = user;
      this.dialogFormedite = true;
    },
    async EditeUser() {
      if (this.codes === 0) {
        this.editeForm.name = sessionStorage.getItem("name");
        const res = await this.$http.post(`/edition/update`, this.editeForm);
        console.log(res);
        if (res.data.code == 0) {
          this.$message({
            type: "success",
            message: res.data.msg
          });
          this.dialogFormVisibleAdd = false;
          this.getUserlist();
        } else if (res.data.code == 1) {
          this.$message({
            type: "warning",
            message: res.data.msg
          });
        }
      } else {
        this.$message({
          type: "warning",
          message: "请先上传文件"
        });
      }
    },

    showAddUserDia() {
      this.dialogFormVisibleAdd = true;
    },
    uploadFile(item) {
      sessionStorage.setItem("name", item.file.name);
      // this.name = item.file.name;
      console.log(this.name);
      console.log(item);
      let files = item.file;
      console.log(files);
      let blod = new Blob([files]);
      let file1 = new File([blod], files.name, { type: files.type });
      let form = new FormData();
      form.append("files", file1);
      this.$http({
        method: "post",
        url: `edition/appUpload`,
        data: form,
        headers: {
          "Content-Type": "multipart/form-data"
          //  Authorization: localStorage.getItem("access_token")
        }
      }).then(res => {
        console.log(res);
        this.codes = res.data.code;
        if (res.data.code == 0) {
          this.$message({
            type: "success",
            message: res.data.msg
          });
        }
        // this.getUserlist();
        // 提示
      });
    },
    // file形参里面相关操作的图片信息
    handlePreview(files) {
      //on-remove--移除/删除待上传列表中的图片触发的事件
      console.log(files);

      // this.picPreviewPath = file.response.data.url;
      // this.previewDialogVisible = true;
    },
    handleRemove(files) {
      //on-preview--点击待上传列表中的图片所触发的事件
      console.log(files);
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
    handleSuccess(response, files) {
      console.log(files);
      // if (response.code == 0) {
      //   this.$message({
      //     type: "success",
      //     message: response.msg
      //   });
      //   // this.img=response.data
      //   // console.log(this.img);
      // }
      // 1.拼接得到一个图片信息对象 临时路径
      // const picInfo = {pic: response.data.imageFile};
      // 2.将图片信息对象，push到pics数组中
      // this.addForm.pics.push(picInfo);
      // file.data.tem_path 图片临时上传的路径
      //console.log("成功");
      //   this.form.pics.push({
      //     pic: file.data.tep_path
      //   });
      //console.log(file);
    },
    async AddUser() {
      if (this.codes === 0) {
        this.form.name = sessionStorage.getItem("name");
        const res = await this.$http.post(`edition/insert`, this.form);
        console.log(res);
        if (res.data.code == 0) {
          this.$message({
            type: "success",
            message: res.data.msg
          });
          this.dialogFormVisibleAdd = false;
          this.getUserlist();
        } else if (res.data.code == 1) {
          this.$message({
            type: "warning",
            message: res.data.msg
          });
        }
      } else {
        this.$message({
          type: "warning",
          message: "请先上传文件"
        });
      }
    },
    async getUserlist() {
      const res = await this.$http.get(`/edition/selectEdition`);
      this.userlist = res.data.data;
      console.log(res);
    }
  },
  created() {
    this.getUserlist();
  }
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