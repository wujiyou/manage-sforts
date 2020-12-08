<template>
  <div>
    <div style="background:white;width:99.1%;padding:10px 0px 15px 15px">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>个人中心</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-card class="box-card" style="margin:20px 20px 0 20px;">
      <el-col :span="24">
        <h3 style="border-bottom:1px solid #ece8e8;padding-bottom:5px;padding-left:15px">修改个人信息</h3>
      </el-col>

      <el-col :span="24">
        <el-col :span="4">
          <el-col style="padding-left:15px;padding-right:15px" :span="24">
            <p style="padding-bottom:5px">头像</p>
          </el-col>
          <el-col style="padding-left:15px" :span="24">
            <!-- <el-upload action="http://192.168.0.111:8081/user/image" list-type="picture-card">
          <img width="100%" src="../../assets/images/logo.jpg" alt />
          
            </el-upload>-->

            <el-upload
              class="avatar-uploader"
              action="http://39.98.74.46:8081/user/image"
              :on-preview="handlePreview"
              :headers="headers"
              :on-remove="handleRemove"
              :on-success="handleSuccess"
              list-type="picture-card"
            >
              <!-- <img v-if="imageUrl" :src="imageUrl" class="avatar" /> -->
              <img :src="this.image" width="100%" alt />
              <i class="el-icon-plus avatar-uploader-icon"></i>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-col>
        </el-col>

        <el-col style="margin-top:30px;display:none" :span="20">
          <!-- <el-col style="text-align:center;border:1px solid #d9d7d7" :span="10">
            <h1>基本信息</h1>
          </el-col>-->
          <el-col :span="2">&nbsp;</el-col>
          <el-col style="text-align:center;border:1px solid #d9d7d7" :span="10">
            <h1>气瓶价格</h1>
            <el-col :span="20">&nbsp;</el-col>
            <el-col style="margin:5px 1px" :span="2">
              <el-button @click="showAddUserDia()" size="mini">
                <i style="padding-right:10px" class="el-icon-plus"></i>新增
              </el-button>
            </el-col>
            <template>
              <el-table
                :row-style="{height:'40px'}"
                :cell-style="{padding:'0px'}"
                border
                :data="userlist"
                style="width: 100%;margin:10px 0px;padding-bottom:40px"
              >
                <el-table-column type="index" label="序号" width="50" show-overflow-tooltip>
                  <template slot-scope="socpe">
                    <p style="cursor:pointer;" @click="showEdituser(socpe.row)">{{socpe.$index+1}}</p>
                  </template>
                </el-table-column>
                <el-table-column prop="volume" label="规格(kg)"></el-table-column>
                <el-table-column prop="medium" label="介质"></el-table-column>
                <el-table-column prop="price" label="价格(元)"></el-table-column>
              </el-table>
            </template>
          </el-col>
        </el-col>
      </el-col>

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

      <!-- <el-col :span="3">
        <el-upload
          action="#"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>
      </el-col>-->

      <el-col style="padding-left:15px;padding-right:15px" :span="24">
        <el-form
          style="margin-top:50px"
          :label-position="labelPosition"
          label-width="80px"
          :model="formLabelAlign"
        >
          <el-form-item label="账号">
            {{this.username}}
            <!-- <el-input v-model="formLabelAlign.name"></el-input> -->
          </el-form-item>
          <el-form-item label="昵称">
            <el-input style="width:50%" v-model="formLabelAlign.name"></el-input>
          </el-form-item>

          <el-form-item hidden label="昵称">
            <el-input style="width:50%" v-model="formLabelAlign.image"></el-input>
          </el-form-item>

          <el-form-item class="hide" label="气瓶价格查看">
            <el-button style="width:50%" size="small" @click="look()">价格查看</el-button>
          </el-form-item>
          <!-- <el-form-item label="手机号码" prop="phone">
            <el-input v-model="formLabelAlign.phone"></el-input>
          </el-form-item>-->

          <!-- <el-form-item label="密码">
          <el-input v-model="formLabelAlign.password"></el-input>
          </el-form-item>-->

          <p style="text-align:center;padding-bottom:10px" size="large">
            <el-button type="primary" @click="onSubmit(formLabelAlign)">保存</el-button>
            <el-button @click="lose()">返回</el-button>
          </p>
        </el-form>
      </el-col>
    </el-card>

    <el-card style="margin-top:10px;padding:15px 5px">
      <el-col :span="8">
        <p class="ys" style="color: #303133;">修改密码</p>
      </el-col>
      <el-col :span="8">
        <p class="ys" style="color:#909399">安全性高的密码可以使账号更安全，密码长度要求至少6位。</p>
      </el-col>
      <el-col :span="8">
        <p
          class="ys"
          @click="xiugai()"
          style="text-align:right;color: #409eff;
    cursor: pointer;"
        >修改</p>
      </el-col>
    </el-card>

    <el-card style="margin-top:10px;;padding:15px 5px">
      <el-col :span="8">
        <p class="ys" style="color: #303133;">安全问题</p>
      </el-col>
      <el-col :span="8">
        <p class="ys" style="color:#909399">填写安全问题后，您可通过安全问题找回密码。</p>
      </el-col>
      <el-col :span="8">
        <p
          class="ys"
          @click="anquna()"
          style="text-align:right;color: #409eff;
    cursor: pointer;"
        >设置</p>
      </el-col>
    </el-card>
  </div>
</template>
<script>
import $ from "jquery";
import { log } from "util";
export default {
  data() {
    return {
      labelPosition: "top",
      formLabelAlign: {
        name: "",
        image: ""
      },
      form: {
        unitId: "",
        medium: "",
        volume: "",
        price: ""
      },
      dialogFormVisibleAdd: false,
      dialogFormVisiblexiu: false,
      userlist: [],
      dialogImageUrl: "",
      dialogVisible: false,
      // rules: {
      //   phone: [
      //     { required: true, message: "联系电话不能为空", trigger: "blur" },
      //     { min: 11, max: 11, message: "请输入11位手机号码", trigger: "blur" },
      //     {
      //       pattern: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
      //       message: "请输入正确的手机号码"
      //     }
      //   ]
      // },
      headers: {
        Authorization: sessionStorage.getItem("access_token")
      },
      image: ""
    };
  },
  methods: {
   async price(){
       const res_1 = await this.$http.get(`/user`);
      console.log(res_1);
      this.image=res_1.data.data.image
      this.formLabelAlign.name=res_1.data.data.name
    },
    look() {
      this.$router.push({ path: "/lookprice" });
    },
    async sureSrice() {},
    // file形参里面相关操作的图片信息
    handlePreview(file) {
      //on-remove--移除/删除待上传列表中的图片触发的事件
      console.log(file);

      // this.picPreviewPath = file.response.data.url;
      // this.previewDialogVisible = true;
    },
    handleRemove(file) {
      //on-preview--点击待上传列表中的图片所触发的事件
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
      if (response.code == 0) {
        this.$message({
          type: "success",
          message: response.msg
        });
        this.image = response.data;
        console.log(this.image);
        // this.img=response.data
        // console.log(this.img);
      }

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
    anquna() {
      this.$router.push({ path: "/anquan" });
    },
    lose() {
      this.$router.push({ path: "/home" });
    },
    xiugai() {
      this.$router.push({ path: "/Password" });
    },
    async onSubmit(formLabelAlign) {
      this.formLabelAlign.image = this.image;
      // formLabelAlign.phone = sessionStorage.getItem("phone");
      // console.log(formLabelAlign.phone);
      const res = await this.$http.put(`user/myUpdate`, this.formLabelAlign);
      console.log(res);
      if (res.data.code == 0) {
        this.$message({
          type: "success",
          message: res.data.msg
        });
        location.reload()
        // this.$router.push({ path: "/home" });
      }
      // this.dialogFormVisibleEdit = false;
      // console.log(formLabelAlign);
      // var reg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
      // if (reg.test(formLabelAlign.phone) == true) {
      //   const res = await this.$http.put(
      //     `/user/me/phone-number/${formLabelAlign.phone} `
      //   );
      //   console.log(res);

      //   if (res.data.code == 0) {
      //     this.$message({
      //       type: "success",
      //       message: res.data.msg
      //     });
      //     // localStorage.clear('phone');
      //     // localStorage.setItem('phone',res.data.data);
      //     formLabelAlign.phone = res.data.data;
      //     console.log(formLabelAlign.phone);
      //   } else {
      //     this.$message({
      //       type: "error",
      //       message: res.data.msg
      //     });
      //     this.handuserlist();
      //   }
      // } else {
      //   this.$message({
      //     type: "error",
      //     message: "请输入正确的手机号码"
      //   });
      // }
      // this.formLabelAlign = res.data.data;
      // if (res.data.code === 0) {
      //   // 回到第一页展示
      //   //this.pagenum = 1;
      //   // 重新请求数据
      //   // this.getUserlist();
      //   // 提示
      //   this.$message({
      //     type: "success",
      //     message: res.data.msg
      //   });
      // } else {
      //   this.$message({
      //     type: "error",
      //     message: "修改失败"
      //   });
      // }
      // this.$router.push({ path: "/change" });
    },

    handlePictureCardPreview() {},
    handleRemove() {},
    handuserlist() {
      // console.log(localStorage.getItem("phone"));
      this.username = sessionStorage.getItem("username");
      // this.formLabelAlign.phone = sessionStorage.getItem("phone");
      // this.image = sessionStorage.getItem("image");
      // formLabelAlign.phone = localStorage.getItem("phone");
      // this.username = list;
      // console.log(this.username);
    },

    // 修改价格
    // showEdituser(user) {
    //   this.form = user;
    //   this.dialogFormVisiblexiu = true;
    //   this.getUserlist();
    // },
    // changUser() {
    //   this.AddUser();
    //   this.dialogFormVisiblexiu = false;
    // },

    // 新增价格
    showAddUserDia() {
      this.form = {};
      this.dialogFormVisibleAdd = true;
    },
    AddUser() {
      this.form.unitId = sessionStorage.getItem("unitId");
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
    getUser() {
      this.unitId = sessionStorage.getItem("unitId");
      this.$http.get(`/unit/findById/${this.unitId}`).then(res => {
        console.log(res);
        if (res.data.data.type == 2 || res.data.data.type == 5) {
          $(".hide").show();
          this.getUserlist();
        } else {
          $(".hide").hide();
        }
        // this.userlist = res.data.data;
        // if(res.data.data[0].type==0){
        //    $('.hide').hide()
        // }else{
        //   $('.hide').show()
        // }
        //   this.total = res.data.data.totalCount;
      });
    },
    getUserlist() {
      // /unit-prices/{unitId}
      this.unitId = sessionStorage.getItem("unitId");
      console.log(this.unitId);
      this.$http.get(`/unit-prices/${this.unitId}`).then(res => {
        console.log(res);
        this.userlist = res.data.data;
        // if(res.data.data[0].type==0){
        //    $('.hide').hide()
        // }else{
        //   $('.hide').show()
        // }
        //   this.total = res.data.data.totalCount;
      });
    }
  },
  created() {
    this.getUser();
    this.handuserlist();
    this.price();
  }
};
</script>
<style scoped>
.hide {
  /* display: none; */
}
.ys {
  font-size: 14px;
  margin-top: -8px;
}
.el-row {
  margin-bottom: 20px;
  /* &:last-child {
    margin-bottom: 0;
  } */
}
.el-col {
  border-radius: 4px;
}
</style>