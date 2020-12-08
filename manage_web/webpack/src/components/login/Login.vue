<template>
  <div class="container">
    <div class="headTitle">
      <div class="center">
        气瓶与移动式压力容器
        <br />安全追溯智能综合监督管理平台
      </div>
    </div>
    <div class="box">
      <div>
        <h1 class="hh1">欢迎登录智能监管平台</h1>
        <!-- <h1 class="hh1">欢迎登录兰州新区智能监管平台</h1> -->
        <el-form
          :label-position="labelPosition"
          label-width="185px"
          :model="formdata"
          :rules="loginFormRules"
          class="loginer_from"
        >
          <el-form-item class="input_margin" prop="username">
            <i class="el-icon-user" style="font-size:25px;color:black;"></i>
            <el-input
              placeholder="请输入账号"
              class="input_border"
              v-model="formdata.username"
              prefix-icon="iconfont icon-user"
            ></el-input>
          </el-form-item>
          <el-form-item class="input_margin" prop="password">
            <el-input
              placeholder="请输入密码"
              class="input_border"
              v-model="formdata.password"
              type="password"
              aria-placeholder="请输入密码"
              prefix-icon="iconfont icon-3702mima"
            ></el-input>
            <span>
              <i class="el-icon-unlock" style="font-size:25px;color:black;"></i>
            </span>
          </el-form-item>

          <el-form-item class="input_margin" id="box1" prop="seccode">
            <i class="el-icon-s-claim" style="font-size:25px;color:black;"></i>
            <el-input
              class="input_border1"
              style="width:220px"
              placeholder="请输入验证码"
              prefix-icon="iconfont icon-tijikongjian"
              @keydown.enter.native="handLogin('formdata')"
              v-model="formdata.seccode"
            ></el-input>
            <div class="code" id="checkCode" @click="createCode()">{{checkCode}}</div>
          </el-form-item>

          <el-button class="loginer_btn" @click.prevent="handLogin()" type="primary">登录</el-button>
        </el-form>
      </div>
    </div>
    <div class="box2">
      <span>Copyright ©2016-2020 技术支持：湖南长劲鹿网络科技有限公司 湘ICP备18008170号-2</span>
    </div>

    <el-dialog
      title="授权申请"
      v-dialogDrag
      ref="dialog__wrapper"
      :close-on-click-modal="false"
      :visible="dialogFormVisible"
      :showClose="false"
    >
      <!--   :showClose="false" -->
      <el-form :model="form">
        <p style="text-align: center;color:black;font-size:20px;margin-bottom:20px">系统还未授权，请授权后使用</p>
        <el-form-item label="申请码:">
          <p style="text-align: center;color:black;font-size:12px">{{this.sqm}}</p>
        </el-form-item>

        <el-form-item label="授权码:">
          <el-input style="width:80%" v-model="form.code"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="surece()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "loginer",
  data() {
    return {
      labelPosition: "left",
      formdata: {
        username: "",
        password: "",
        seccode: "",
      },
      form: {
        code: "",
      },
      dialogFormVisible: false,
      checkCode: "",
      sqm: "",
      // 表单验证
      loginFormRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "长度在 6 到 20 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入用户密码", trigger: "blur" },
          {
            min: 6,
            max: 18,
            message: "长度在 6 到 18 个字符",
            trigger: "blur",
          },
        ],
        seccode: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { message: "长度在4个字符", trigger: "blur" },
        ],
      },
    };
  },
  // created(){

  // },
  mounted() {
    this.login();
    this.createCode();
  },
  methods: {
    async login() {
      const res = await this.$http.get(`/license/getLicense`);
      console.log(res);
      if (res.data.success == false) {
        this.dialogFormVisible = true;
        this.sqm = res.data.license;
      } else if (res.data.success == true) {
        this.dialogFormVisible = false;
      }
    },
    async surece() {
      
      const res = await this.$http.get(`/license/store/${this.form.code}`);
      console.log(res);
      if (res.data.success == true) {
        this.dialogFormVisible = false;
        this.$message({
          message: res.data.msg,
          type: "success",
        });
      } else if (res.data.success == false) {
        this.$message({
          message: res.data.msg,
          type: "success",
        });
        this.dialogFormVisible = true;
      }
    },

    // 验证码
    createCode() {
      let yzm_code = "";
      let codeLength = 4; //验证码的长度
      let checkCode = document.getElementById("checkCode");
      let codeChars = new Array(
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z"
      ); //所有候选组成验证码的字符，当然也可以用中文的
      for (let i = 0; i < codeLength; i++) {
        let charNum = Math.floor(Math.random() * 26); //设置随机产生
        yzm_code += codeChars[charNum]; //根据下标获取指定字符并拼接
      }

      this.checkCode = yzm_code; //把code值赋给验证码
    },
    async handLogin() {
      if (
        this.formdata.seccode.toUpperCase() !== this.checkCode.toUpperCase()
      ) {
        this.$message({
          message: "验证码输入错误",
          type: "warning",
        });
        this.createCode();
        return false;
      }
      const res = await this.$http.post("/user/login", this.formdata);
      console.log(res);
      let data = res.data;
      if (res.data.code == 0) {
        if (res.data.data.route == 0) {
          sessionStorage.setItem(
            "access_token",
            "bearer " + data.data.access_token
          );

          sessionStorage.setItem("lat", data.data.lat);
          sessionStorage.setItem("lng", data.data.lng);
          sessionStorage.setItem("username", data.data.username);
          sessionStorage.setItem("unitId", data.data.unitId);
          sessionStorage.setItem("type", data.data.type);

          if (data.data.provinceCode) {
            sessionStorage.setItem("proName", data.data.provinceCode);
          } else if (data.data.cityName) {
            sessionStorage.setItem("proName", data.data.cityName);
          } else if (data.data.areaName) {
            sessionStorage.setItem("proName", data.data.areaName);
            sessionStorage.setItem("areCode", data.data.areaCode);
            sessionStorage.setItem("citCode", data.data.cityCode);
            sessionStorage.setItem("lat", data.data.lat);
            sessionStorage.setItem("lng", data.data.lng);
          }
          this.$router.push("/allMap");
          this.$message.success("登录成功");
        } else if (res.data.data.route == 1) {
          sessionStorage.setItem("lat", data.data.lat);
          sessionStorage.setItem("lng", data.data.lng);
          // 液化
          // unitId
          sessionStorage.setItem(
            "access_token",
            "bearer " + data.data.access_token
          );
          console.log("------------------------------------");
          console.log(res);

          sessionStorage.setItem("username", data.data.username);
          sessionStorage.setItem("unitId", data.data.unitId);
          sessionStorage.setItem("type", data.data.type);

          if (data.data.provinceCode) {
            sessionStorage.setItem("proName", data.data.provinceCode);
          } else if (data.data.cityName) {
            sessionStorage.setItem("proName", data.data.cityName);
          } else if (data.data.areaName) {
            sessionStorage.setItem("proName", data.data.areaName);
            sessionStorage.setItem("areCode", data.data.areaCode);
            sessionStorage.setItem("citCode", data.data.cityCode);
            sessionStorage.setItem("lat", data.data.lat);
            sessionStorage.setItem("lng", data.data.lng);
          }
          // sessionStorage.setItem("phone", data.data.phone);
          // sessionStorage.setItem("image", data.data.image);
          // sessionStorage.setItem("unitId", data.data.unitId);
          this.$router.push("/data/liquefied");
          this.$message.success("登录成功");
        } else if (res.data.data.route == 2) {
          console.log("============================================");
          // 工业
          sessionStorage.setItem("lat", data.data.lat);
          sessionStorage.setItem("lng", data.data.lng);
          sessionStorage.setItem(
            "access_token",
            "bearer " + data.data.access_token
          );

          sessionStorage.setItem("username", data.data.username);
          sessionStorage.setItem("unitId", data.data.unitId);
          sessionStorage.setItem("type", data.data.type);

          if (data.data.provinceCode) {
            sessionStorage.setItem("proName", data.data.provinceCode);
          } else if (data.data.cityName) {
            sessionStorage.setItem("proName", data.data.cityName);
          } else if (data.data.areaName) {
            sessionStorage.setItem("proName", data.data.areaName);
            sessionStorage.setItem("areCode", data.data.areaCode);
            sessionStorage.setItem("citCode", data.data.cityCode);
            sessionStorage.setItem("lat", data.data.lat);
            sessionStorage.setItem("lng", data.data.lng);
          }
          // sessionStorage.setItem("phone", data.data.phone);
          // sessionStorage.setItem("image", data.data.image);
          // sessionStorage.setItem("unitId", data.data.unitId);
          this.$router.push("/data/industrial");
          this.$message.success("登录成功");
        } else if (res.data.data.route == 3) {
          // 车用
          sessionStorage.setItem("lat", data.data.lat);
          sessionStorage.setItem("lng", data.data.lng);
          sessionStorage.setItem(
            "access_token",
            "bearer " + data.data.access_token
          );

          sessionStorage.setItem("username", data.data.username);
          sessionStorage.setItem("unitId", data.data.unitId);
          sessionStorage.setItem("type", data.data.type);

          if (data.data.provinceCode) {
            sessionStorage.setItem("proName", data.data.provinceCode);
          } else if (data.data.cityName) {
            sessionStorage.setItem("proName", data.data.cityName);
          } else if (data.data.areaName) {
            sessionStorage.setItem("proName", data.data.areaName);
            sessionStorage.setItem("areCode", data.data.areaCode);
            sessionStorage.setItem("citCode", data.data.cityCode);
            sessionStorage.setItem("lat", data.data.lat);
            sessionStorage.setItem("lng", data.data.lng);
          }
          // sessionStorage.setItem("phone", data.data.phone);
          // sessionStorage.setItem("image", data.data.image);
          // sessionStorage.setItem("unitId", data.data.unitId);
          this.$router.push("/data/car");
          this.$message.success("登录成功");
        } else if (res.data.data.route == 4) {
          // 移动
          // unitId
          sessionStorage.setItem(
            "access_token",
            "bearer " + data.data.access_token
          );
          sessionStorage.setItem("lat", data.data.lat);
          sessionStorage.setItem("lng", data.data.lng);
          sessionStorage.setItem("username", data.data.username);
          sessionStorage.setItem("unitId", data.data.unitId);
          // sessionStorage.setItem("phone", data.data.phone);
          // sessionStorage.setItem("image", data.data.image);
          // sessionStorage.setItem("unitId", data.data.unitId);
          this.$router.push("/data/phone");
          this.$message.success("登录成功");
        } else if (res.data.data.route == 5) {
          // 啥也没有 个人中心
          // unitId
          sessionStorage.setItem(
            "access_token",
            "bearer " + data.data.access_token
          );
          sessionStorage.setItem("lat", data.data.lat);
          sessionStorage.setItem("lng", data.data.lng);
          sessionStorage.setItem("username", data.data.username);
          sessionStorage.setItem("unitId", data.data.unitId);
          // sessionStorage.setItem("phone", data.data.phone);
          // sessionStorage.setItem("image", data.data.image);
          // sessionStorage.setItem("unitId", data.data.unitId);
          this.$router.push("/change");
          this.$message.success("登录成功");
        }
      } else if (res.data.code == 1) {
        this.$message({
          message: res.data.msg,
          type: "warning",
        });
      }
    },
  },
};
</script>

<style scoped>
@media screen and (max-width: 1200px) {
  .headTitle .center {
    font-size: 20px !important;
  }
  .hh1 {
    font-size: 20px !important;
  }
}
* {
  margin: 0px;
  padding: 0px;
}
.container {
  width: 100%;
  height: 100%;
  text-align: center;
  background-image: url(../../assets/images/a1.jpg);
  display: flex;
  flex-direction: column;
  background-repeat: no-repeat;
  justify-content: space-around;
  align-items: center;
}
.headTitle {
  width: 100%;
  height: 8vh;
  background: url("../../../static/images/liquefied/head2.png") no-repeat;
  background-size: 100% 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.headTitle .center {
  font-size: 28px;
  font-weight: 600;
  text-align: center;
  color: white !important;
  -webkit-background-clip: text;
  color: transparent;
}
.box {
  width: 100%;
  height: 100%;
  text-align: center;
  background-image: url(../../assets/images/bg09.png);
  display: flex;
  background-repeat: no-repeat;
  justify-content: space-around;
  align-items: center;
  background-position: center center;
  position: relative;
}
.box2 {
  position: absolute;
  bottom: 2%;
  color: white;
}
.box2>span{
  font-size:15px;
}
.hh1 {
  color: white;
  font-size: 28px;
  margin-top: 100px;
}
.input_border,
.input_border1 {
  border: 3px solid #6cb2d6;
  background-color: transparent;
  width: 100%;
  padding-left: 0px;
  text-align: center;
  margin-bottom: 10px;
}
.input_border1 {
  margin-left: -99px;
}
.input_margin {
  position: relative;
  margin-top: 25px;
  margin-left: -18%;
  color: white;
  width: 500px;
}
.el-form-item__content {
  margin-left: 0px !important;
}
.el-icon-user,
.el-icon-unlock,
.el-icon-s-claim {
  position: absolute;
  left: 2%;
  top: 16%;
  z-index: 100;
}
.code {
  cursor: pointer;
  color: white;
  height: 40px;
  line-height: 40px;
  background-color: black;
  border-radius: 5px;
  font-size: 30px;
  padding: 2px 2px;
}
#checkCode {
  display: inline-block;
  position: absolute;
  right: 1%;
  top: 8%;
}
#box1 {
  position: relative;
}
.loginer_btn {
  width: 63%;
  height: 50px;
  margin-top: 30px;
  background-color: #0099f2;
  border-radius: 10px;
}
</style>