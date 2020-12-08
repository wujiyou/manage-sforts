
<template>
  <el-card class="box-card">
    <!-- 面包屑 -->
    <my-bread level1="订单管理" level2="订单列表"></my-bread>

    <!-- 搜索 -->
    <el-row style="margin-top:20px;margin-bottom:20px">
      <el-col :span="6">
        <el-input placeholder="请输入内容">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
    </el-row>

    <!-- 表格 -->
    <el-table :data="orderList" border stripe>
      <el-table-column type="index" label="#"></el-table-column>
      <el-table-column label="订单编号" prop="order_number"></el-table-column>
      <el-table-column label="订单价格" prop="order_price"></el-table-column>
      <el-table-column label="是否付款">
        <template slot-scope="scope">
          <el-tag type="danger" size="mini" v-if="scope.row.pay_status">未付款</el-tag>
          <el-tag type="success" size="mini" v-else>已付款</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="是否发货" prop="is_send"></el-table-column>
      <el-table-column label="下单时间" prop="create_time"></el-table-column>
      <el-table-column label="操作">
        <template slot>
          <el-button type="primary" size="mini" icon="el-icon-edit"></el-button>
          <el-button type="success" size="mini" icon="el-icon-location"></el-button>
        </template>
      </el-table-column>
    </el-table>

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
      style="border:1px solid #ebeef5;padding:5px 15px"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pagenum"
      :page-sizes="[2, 5, 8,10]"
      :page-size="5"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>

  </el-card>
</template>

<script>
export default {
  name: "orders",
  data() {
    return {
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 5
      },
      total: 0,
      // 订单列表
      orderList: []
    };
  },
  created() {
    this.getOrderList();
  },
  methods: {
    //   表格数据
    async getOrderList() {
      const res = await this.$http.get("orders", {
        params: this.queryInfo
      });
      console.log(res);

      if (res.data.meta.status !== 200) {
        return this.$message.error("获取订单列表失败！");
      }
      this.total = res.data.data.total;
      this.orderList = res.data.data.goods;
    },
      // 分页
    handleSizeChange (newSize) {
      this.queryInfo.pagesize = newSize
      this.getOrderList()
    },
    handleCurrentChange (newSize) {
      this.queryInfo.pagenum = newSize
      this.getOrderList()
    },
  }
};
</script>

<style scoped>
</style>