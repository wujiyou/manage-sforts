<template>
  <div>
    <div style="background:white;width:99.1%;padding:10px 0px 15px 15px">
       <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>个人中心</el-breadcrumb-item>
      <el-breadcrumb-item>设置安全中心</el-breadcrumb-item>
    </el-breadcrumb>
    </div>
    <el-card class="box-card" style="margin:20px 20px 0 20px;">
    

    <el-col :span="24">
      <h3 style="border-bottom:1px solid #ece8e8;padding-bottom:5px;padding-left:15px">设置安全问题</h3>
    </el-col>

    <el-form
      :label-position="labelPosition"
      style="width:800px;margin:40px auto"
      label-width="80px"
      :model="formLabelAlign"
    >
      <el-form-item label="问题一" prop="question">
        <el-select v-model="formLabelAlign.question" placeholder="你中学名称是什么？">
          <el-option label="你小学名称是什么？" value="shanghai"></el-option>
          <el-option label="你母亲的姓名是什么？" value="beijing"></el-option>
          <el-option label="你中学名称是什么？" value="beijing"></el-option>
          <el-option label="你父亲的姓名是什么？" value="shanghai"></el-option>
          <el-option label="你第一个宠物的名字叫什么？" value="beijing"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="答案">
        <el-input v-model="formLabelAlign.anwser1"></el-input>
      </el-form-item>

      <el-form-item label="问题二">
         <el-select v-model="formLabelAlign.question1" placeholder="你出生的城市的名称是什么？">
          <el-option label="你小学名称是什么？" value="shanghai"></el-option>
          <el-option label="你出生的城市的名称是什么？" value="beijing"></el-option>
          <el-option label="你母亲的生日是哪一天？" value="beijing"></el-option>
          <el-option label="你父亲的姓名是什么？" value="shanghai"></el-option>
          <el-option label="你父亲的姓名是什么？" value="beijing"></el-option>
        </el-select>
      </el-form-item>

       <el-form-item label="答案">
        <el-input v-model="formLabelAlign.anwser2"></el-input>
      </el-form-item>
       <el-form-item label="问题三">
         <el-select v-model="formLabelAlign.question3" placeholder="你好朋友的姓名是什么？">
          <el-option label="你小学名称是什么？" value="shanghai"></el-option>
          <el-option label="你母亲的姓名是什么？" value="beijing"></el-option>
          <el-option label="你母亲的生日是哪一天？" value="beijing"></el-option>
          <el-option label="你父亲的生日是哪一天？" value="shanghai"></el-option>
          <el-option label="你好朋友的姓名是什么？" value="beijing"></el-option>
        </el-select>
      </el-form-item>

       <p style="text-align: center;">
          <el-button type="primary" @click="submitForm()">提交</el-button>
          <el-button @click="resetForm()">返回</el-button>
        </p>
    </el-form>
  </el-card>
  </div>
</template>
<script>
export default {
  data() {
    // var checkAge = (rule, value, callback) => {
    //   if (!value) {
    //     return callback(new Error("年龄不能为空"));
    //   }
    //   setTimeout(() => {
    //     if (!Number.isInteger(value)) {
    //       callback(new Error("请输入数字值"));
    //     } else {
    //       if (value < 18) {
    //         callback(new Error("必须年满18岁"));
    //       } else {
    //         callback();
    //       }
    //     }
    //   }, 1000);
    // };
    // var validatePass = (rule, value, callback) => {
    //   if (value === "") {
    //     callback(new Error("请输入密码"));
    //   } else {
    //     if (this.ruleForm.checkPass !== "") {
    //       this.$refs.ruleForm.validateField("checkPass");
    //     }
    //     callback();
    //   }
    // };
    // var validatePass2 = (rule, value, callback) => {
    //   if (value === "") {
    //     callback(new Error("请再次输入密码"));
    //   } else if (value !== this.ruleForm.pass) {
    //     callback(new Error("两次输入密码不一致!"));
    //   } else {
    //     callback();
    //   }
    // };
    return {
      labelPosition: "top",
      formLabelAlign: {
        name: "",
        region: "",
        type: "",
        regions: "",
        question:"",
        anwser1:"",
        anwser2:"",
        question3:"",

      }
    };
  },
  methods: {
    resetForm() {
      this.$router.push({ path: "/change" });
    },
    resetForm(){
      this.$router.push({ path: "/change" });
    },
    submitForm() {
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