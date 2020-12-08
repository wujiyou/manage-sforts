<template>
  <div>
    <div style="background:white;width:99.1%;padding:10px 0px 15px 15px">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>个人中心</el-breadcrumb-item>
        <el-breadcrumb-item>修改密码</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-card class="box-card" style="margin:20px 20px 0 20px;">
      <el-col :span="24">
        <h3 style="border-bottom:1px solid #ece8e8;padding-bottom:5px;padding-left:15px">修改密码</h3>
      </el-col>

      <el-form
        style="width:800px;margin:40px auto"
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="旧密码" prop="oldpass">
          <el-input type="password" v-model="ruleForm.oldpass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newpassword">
          <el-input type="password" v-model="ruleForm.newpassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="surepassword">
          <el-input type="password" v-model="ruleForm.surepassword" autocomplete="off"></el-input>
        </el-form-item>
        <p style="text-align: center;">
          <el-button type="primary" @click="submitForm(ruleForm)">提交</el-button>
          <el-button @click="resetForm()">返回</el-button>
        </p>
      </el-form>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.surepassword !== "") {
          this.$refs.ruleForm.validateField("surepassword");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      console.log(value);
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.newpassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        oldpass: "",
        newpassword: "",
        surepassword: ""
      },
      rules: {
        newpassword: [
          { validator: validatePass, trigger: "blur" },
          { required: true, message: "请输入新密码", trigger: "blur" },
          { min: 6, message: "请输入不少于6位的密码", trigger: "blur" }
        ], //新密码
        surepassword: [
          { validator: validatePass2, trigger: "blur" },
          { required: true, message: "请再一次确认新密码", trigger: "blur" },
          { min: 6, message: "请输入不少于6位的密码", trigger: "blur" }
        ] //再次确认密码
      }
    };
  },
  methods: {
    resetForm() {
      this.$router.push({ path: "/change" });
    },
    async submitForm(ruleForm) {
      var reg = /^[a-zA-Z0-9 ]+[!@#$%^&*]{6,12}$/;
      console.log(ruleForm.surepassword.length);
      console.log(ruleForm.newpassword.length);
      console.log(reg.test(ruleForm.newpassword));
      console.log(reg.test(ruleForm.surepassword));
      if (
        (ruleForm.surepassword.length && ruleForm.newpassword.length) >=6 || (ruleForm.surepassword && ruleForm.newpassword) <14
      ) {
        if (ruleForm.newpassword != ruleForm.surepassword) {
          this.$message({
            type: "error",
            message: "两次输入密码不一致!"
          });
        } else {
          const res = await this.$http.put(
            `/user/me/password/by-old-password/${ruleForm.oldpass}/${ruleForm.surepassword}`
          );
          if(res.data.code === 0) {
            this.$message({
              type: "success",
              message: res.data.msg
            });
             localStorage.clear();
            this.$router.push({ name: "logins" });
            // this.$router.push({ path: "/change" });
          } else if (res.data.code === 1) {
            this.$message({
              type: "error",
              message: res.data.msg
            });
            this.$router.push({ path: "/change" });
          }
        }
      } else {
        this.$message({
          type: "error",
          message: "请输入至少6位以上的密码或者20位以下密码"
        });
      }

      // switch (res.data.code) {
      //   case 0:
      //     this.$message({
      //       type: "success",
      //       message: res.data.msg
      //     });
      //     this.$router.push({ path: "/change" });
      //     break;
      //   case 1:
      //     this.$message({
      //       type: "error",
      //       message: res.data.msg
      //     });
      //     this.$router.push({ path: "/change" });
      //     break;
      // }
      //   this.$refs[formName].validate(valid => {
      //     if (valid) {
      //       alert("submit!");
      //     } else {
      //       console.log("error submit!!");
      //       return false;
      //     }
      //   });
    }
    // resetForm(formName) {
    //   this.$refs[formName].resetFields();
    // }
  }
};
</script>
<style scoped>
</style>