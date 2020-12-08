<template>
  <div>
    <div style="background:white;width:99.1%;padding-left:15px">
      <my-bread level1="综合查询" level2="移动充装" level3="移动充装档案查询"></my-bread>
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
                placeholder="请输入车牌号"
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
                placeholder="制造单位"
                v-model="makeCom"
              ></el-input>
            </el-col>

            <el-col style="padding-left:30px" :span="4">
              <el-input
                size="small"
                style=" width: 100%;"
                @clear="loadUserList()"
                clearable
                class="input-serach"
                placeholder="请输入介质"
                v-model="medium"
              ></el-input>
            </el-col>

            <el-col style="padding-left:30px" :span="4">
              <el-input
                size="small"
                style=" width: 100%;"
                @clear="loadUserList()"
                clearable
                class="input-serach"
                placeholder="请输入注册代码"
                v-model="regDemo"
              ></el-input>
            </el-col>
          </el-col>

          <el-col style="margin-top:10px;padding-left:15px" :span="24">
            <el-col :span="4">
              <el-input
                size="small"
                style=" width: 100%;"
                @clear="loadUserList()"
                clearable
                class="input-serach"
                placeholder="请输使用登记证号"
                v-model="regId"
              ></el-input>
            </el-col>
            <el-col style="padding-left:30px" :span="4">
              <el-input
                size="small"
                style=" width: 100%;"
                @clear="loadUserList()"
                clearable
                class="input-serach"
                placeholder="请输入使用单位"
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
        <!-- <el-col :span="3">
        &nbsp;
        <el-button @click="showAddUserDia()" type="primary">
          <i style="padding-right:10px" class="el-icon-plus"></i>新增
        </el-button>
        </el-col>-->
      </el-row>

      <el-col :span="24">
        <p
          style="width:100%;height:1px;background:rgb(236, 232, 232);margin:20px 0px 0px 0px;z-index:999"
        ></p>
      </el-col>
      <el-col style="margin-bottom:5px;margin-top:5px" :span="24">
        <el-col :span="21">&nbsp;</el-col>

        <el-col :span="2">
          <el-button
            type="success"
            plain
            size="small"
            style="margin-left:10px;font-size:13px"
            @click="downtemplatee()"
          >
            <i style="padding-right:10px;" class="el-icon-download"></i>批量下载excel
          </el-button>
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
        >
          <el-table-column type="index" label="序号" width="50">
            <template slot-scope="socpe">
              <p style="cursor:pointer;" @click="showEdituser(socpe.row)">{{socpe.$index+1}}</p>
            </template>
             <!-- <template slot-scope="socpe">
              <p style="cursor:pointer;" @click="showEdituser(socpe.$index)">{{socpe.$index+1}}</p>
            </template> -->
          </el-table-column>
          <el-table-column show-overflow-tooltip prop="carNum" label="车牌" width="200"></el-table-column>
          <el-table-column show-overflow-tooltip prop="useUnit" label="使用单位"></el-table-column>
          <el-table-column show-overflow-tooltip prop="makeCom" label="制造厂商"></el-table-column>
          <el-table-column show-overflow-tooltip prop="regDemo" label="注册代码"></el-table-column>
          <el-table-column show-overflow-tooltip prop="regId" label="使用登记证号"></el-table-column>
          <el-table-column show-overflow-tooltip prop="useCode" label="单位内编号"></el-table-column>
          <el-table-column show-overflow-tooltip prop="medium" label="介质"></el-table-column>
          <el-table-column show-overflow-tooltip prop="volume" label="容积"></el-table-column>
          <el-table-column show-overflow-tooltip prop="nextCheckDate" label="下次检验日期">
            <template slot-scope="socpe">{{socpe.row.nextCheckDate | fmtdate}}</template>
          </el-table-column>
          <el-table-column show-overflow-tooltip prop="checkAllDate" label="下次全面检验日期">
            <template slot-scope="socpe">{{socpe.row.checkAllDate | fmtdate}}</template>
          </el-table-column>
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
    </el-card>
  </div>
</template>
<script>
export default {
  name: "trace",
  data() {
    return {
      carNum: "",
      makeCom: "",
      medium: "",
      regDemo: "",
      regId: "",
      useUnit: "",
      userlist: [],
      //分页相关数据
      total: -1,
      currPage: 1,
      page: 1,
      pageSize: 10,
      wangye: [],
      // dialogFormVisibleEdit: false,
      // dialogFormVisibleRoleshow: false,
      
    };
  },

  methods: {
    //生成一个文档
      async downtemplatee() {
        this.loadingbut = true;
        this.loadingbuttext = "加载中...";
        const res = await this.$http
          .get(
            `pc-mobile/creat/doucument?carNum=${this.carNum}&makeCom=${this.makeCom}&medium=${this.medium}&regDemo=${this.regDemo}&regId=${this.regId}&useUnit=${this.useUnit}`,
            // { headers: "application/x-download" },
            { responseType: "blob" }
          )
          .then(response => {
            console.log(response);
            if (response.status === 200) {
              this.getUserlist();
              // 提示
              this.$message({
                type: "success",
                message: "下载成功"
              });
              this.loadingbut = false;
              this.loadingbuttext = "生成一个excel文档";
              const blob = new Blob([response.data], {
                type: "application/msword"
              });
              const fileName = "气瓶基本信息.xlsx";

              const elink = document.createElement("a");

              elink.download = fileName;

              elink.style.display = "none";

              elink.href = URL.createObjectURL(blob);

              document.body.appendChild(elink);

              elink.click();

              URL.revokeObjectURL(elink.href); // 释放URL 对象
              document.body.removeChild(elink);
            } else if (res.data.code == 201) {
              this.$message({
                type: "error",
                message: "生成失败"
              });
              this.loadingbut = false;
              this.loadingbuttext = "生成一个excel文档";
            }
          })
          .catch(err => {
            this.$message({
              type: "error",
              message: "生成失败"
            });
            //         _toastr.error(err)
            this.loadingbut = false;
            this.loadingbuttext = "生成一个excel文档";
          });
      },
    //清空搜索框搜索数据 点击清楚按钮清除数据重新发送请求
    loadUserList() {
      this.getUserlist();
    },
    // 搜索用户 给搜索框绑定query v-model="query"
    async searchUser() {
      const res = await this.$http.get(
        `/pc-mobile/doucument/findPage?rows=${this.pageSize}&page=1&carNum=${this.carNum}&makeCom=${this.makeCom}&medium=${this.medium}&regDemo=${this.regDemo}&regId=${this.regId}&useUnit=${this.useUnit}`
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
        `/pc-mobile/doucument/findPage?rows=${this.pageSize}&page=${this.currPage}&carNum=${this.carNum}&makeCom=${this.makeCom}&medium=${this.medium}&regDemo=${this.regDemo}&regId=${this.regId}&useUnit=${this.useUnit}`
      );
      // &name=${this.name}
      console.log(res);
      this.userlist = res.data.data.list;
      this.total = res.data.data.totalCount;
      for (var i=0;i<this.userlist.length;i++) {
           this.wangye.push(this.userlist[i].netaddress)
          
      }  
    },
    showEdituser(user) {
      var url= user.netaddress
      window.location.href=url
      //通过下标获取链接地址
      //    for (var i=0;i<this.wangye.length;i++) {
      //       if(index==i){
      //         console.log(this.wangye[i])
      //         window.location.href=this.wangye[i]  
      //       }
      // }
           
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

.input-serach {
  width: 400px;
}
.el_button {
  background-color: #66b1ff !important;
  border-color: #66b1ff !important;
  color: #fff !important;
}
</style>