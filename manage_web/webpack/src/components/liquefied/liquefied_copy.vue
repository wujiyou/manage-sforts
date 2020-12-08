<template>
  <div class="container">
    <!-- <nav-menu :menuFlag="menuFlag" :showMenu="showMenu" :hideMenu="hideMenu"></nav-menu> -->
    <div class="appContainer" @click="hideMenu">
      <div class="big_head">
        <div class="big_head_title">液化气瓶大数据</div>
        <!--<div class="big_head_bottom_line"></div>-->
        <div class="big_head_date">{{date | formatDate}}</div>
        <div class="fsmall gradient-text-one _tq">
          <span>今日</span>
          <span class="_tip_d">{{wd}}</span>
          <span>{{tq}}</span>
        </div>
      </div>
      <div class="map_box">
        <div>
          <!-- <div  style="background:white;width:99.1%;padding:10px 0px 15px 15px"><my-bread level1="数据平台" level2="液化气瓶" level3="气瓶地图显示"></my-bread></div> -->
          <!-- <el-card class="box-card" style="margin:20px 20px 0 20px;"> -->
          <div id="allmap" ref="allmap"></div>
          <!-- </el-card> -->
          <baidu-map
            class="map"
            :scroll-wheel-zoom="true"
            :center="center"
            :zoom="zoom"
            @ready="handler"
            :mapStyle="mapStyle"
          >
            <bm-view style="width: 80%; height:100%; flex: 1"></bm-view>
            <!-- 比例尺的控件 -->
            <bm-scale anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-scale>
            <!-- 地图右侧的缩放 -->
            <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
            <!-- 定位 -->
            <bm-geolocation
              anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
              :showAddressBar="true"
              :autoLocation="true"
            ></bm-geolocation>
            <!-- 标记点 -->
            <!-- <bm-marker :position="{lng:center.lng,lat:center.lat}"></bm-marker> -->
            <!-- 添加自定义的点 -->
            <bm-marker
              v-for="(item,i) in markerPoint"
              :key="i"
              :position="{lng:item.x,lat:item.y}"
              :dragging="false"
              :icon="{url:item.status, size: {width:32, height: 32}}"
              @click="infoWindowOpen(i)"
            >
              <bm-info-window
                title="详情信息"
                :position="{lng:item.x,lat:item.y}"
                :show="i === text"
                @clickclose="infoWindowClose"
              >
                <h1>气瓶信息</h1>
                <p>
                  <span>气瓶所属单位:</span>
                  <span v-text="item.buildingUser"></span>
                </p>
                <p>
                  <span>登记证号:</span>
                  <span v-text="item.regId"></span>
                </p>
                <p>
                  <span>气瓶编号:</span>
                  <span v-text="item.appid"></span>
                </p>
                <p>
                  <span>下次检验日期:</span>
                  <span v-text="item.nextCheckData"></span>
                </p>
                <h1>客户信息</h1>
                <p>
                  <span>客户姓名:</span>
                  <span v-text="item.customerName"></span>
                </p>
                <p>
                  <span>客户电话:</span>
                  <span v-text="item.customerTelephone"></span>
                </p>
                <p>
                  <span>客户地址:</span>
                  <span v-text="item.customerAddress"></span>
                </p>
              </bm-info-window>
            </bm-marker>
            <div class="tishi">
              <div>
                <span style="color:#23cdfd">气瓶状态:</span>

                <div class="anchor">
                  <img :src="tishi.hege" />
                  <span style="color:#1afa29;">合格</span>
                </div>
              </div>
              <div class="anchor">
                <img :src="tishi.weijian" />
                <span style="color:#2a5caa;">即将超期</span>
              </div>
              <div class="anchor">
                <img :src="tishi.chaoqi" />
                <span style="color:#f4ea2a;">超期未检</span>
              </div>

              <div class="anchor">
                <img :src="tishi.buhege" />
                <span style="color:#d81e06;">不合格</span>
              </div>
            </div>
          </baidu-map>
        </div>
        <!-- <div class="map_center_title">长沙液化气瓶分布图</div> -->
        <!-- <div id="myChart" :style="{width: '100%', height: '100%'}"></div> -->
      </div>
      <div class="big_left_chart1">
        <div class="big_left_chart1_title">
          统计数据
          <div class="big_heng_line"></div>
        </div>
        <div class="big_left_chart1_box">
          <div class="info-main">
            <div class="box1">
              <img
                src="~@/../static/images/a.png"
                alt
                class="img1"
                style="cursor:pointer;"
                @click="dialogTableVisible = true"
              />
              <span class="span1">充装站</span>
              <p id="listedCompany">{{this.cong}}</p>
            </div>
            <el-dialog title="查看信息" :visible.sync="dialogTableVisible">
              <span slot="title">
                <span style="color: #23cdfd">查看信息</span>
              </span>
              <el-table
                :data="gridData"
                border
                :row-style="{height:'40px'}"
                :cell-style="{padding:'0px'}"
              >
                <el-table-column show-overflow-tooltip prop="name" label="单位名称"></el-table-column>
                <el-table-column show-overflow-tooltip prop="licence" label="充装许可证号"></el-table-column>
                <!-- <el-table-column show-overflow-tooltip prop="division" label="行政区划"></el-table-column> -->
                <el-table-column show-overflow-tooltip prop="personnel_name" label="负责人"></el-table-column>
                <el-table-column show-overflow-tooltip prop="phone" label="负责人联系电话"></el-table-column>
                <el-table-column show-overflow-tooltip prop="address" label="单位地址"></el-table-column>
                <el-table-column show-overflow-tooltip prop="unitIssueTime" label="发证日期">
                  <template slot-scope="socpe">{{socpe.row.unitIssueTime | fmtdate}}</template>
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="unitChangeTime" label="换证日期">
                  <template slot-scope="socpe">{{socpe.row.unitChangeTime | fmtdate}}</template>
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
            </el-dialog>
            <div class="box2">
              <img
                src="~@/../static/images/e.png"
                alt
                class="img2"
                style="cursor:pointer;"
                @click="dialogTableVisible1 = true"
              />
              <span class="span2">配送站</span>
              <p id="listedCompany1">{{this.pei}}</p>
            </div>
            <el-dialog title="查看信息" :visible.sync="dialogTableVisible1">
              <span slot="title">
                <span style="color: #23cdfd">查看信息</span>
              </span>
              <el-table border :data="gridData1">
                <el-table-column show-overflow-tooltip prop="name" label="单位名称"></el-table-column>
                <!-- <el-table-column show-overflow-tooltip prop="division" label="行政区划"></el-table-column> -->
                <el-table-column show-overflow-tooltip prop="personnel_name" label="负责人"></el-table-column>
                <el-table-column show-overflow-tooltip prop="licence" label="特种设备许可证号"></el-table-column>
                <el-table-column show-overflow-tooltip prop="phone" label="负责人联系电话"></el-table-column>
                <el-table-column show-overflow-tooltip prop="address" label="单位地址"></el-table-column>
                <el-table-column show-overflow-tooltip prop="unitIssueTime" label="发证日期">
                  <template slot-scope="socpe">{{socpe.row.unitIssueTime | fmtdate}}</template>
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="unitChangeTime" label="换证日期">
                  <template slot-scope="socpe">{{socpe.row.unitChangeTime | fmtdate}}</template>
                </el-table-column>
              </el-table>
              <el-pagination
                style="padding:5px 15px 15px 15px;display:flex; justify-content: flex-end;"
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currPage"
                :page-sizes="[10,15,20,25,30]"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total1"
              ></el-pagination>
            </el-dialog>
            <div class="box3">
              <img
                src="~@/../static/images/b.png"
                alt
                class="img3"
                style="cursor:pointer;"
                @click="dialogTableVisible9 = true"
              />
              <span class="span3">已登记气瓶数</span>
              <p id="listedCompany2">{{this.deng}}</p>
            </div>
            <el-dialog title="查看信息" :visible.sync="dialogTableVisible2">
              <span slot="title">
                <span style="color: #23cdfd">查看信息</span>
              </span>
              <el-table :data="gridData2" border>
                <!-- <el-table-column prop="name" label="登记单位" width="180"></el-table-column>
                <el-table-column prop="num" label="登记证号" width="180"></el-table-column>
                <el-table-column prop="number" label="气瓶编号"></el-table-column>
                <el-table-column prop="qiang" label="加气枪号"></el-table-column>
                <el-table-column prop="liang" label="加气量"></el-table-column>
                <el-table-column prop="time" label="加气时间"></el-table-column>-->
                <el-table-column prop="equType" label="设备类型"></el-table-column>
                <el-table-column prop="medium" label="充装介质"></el-table-column>
                <el-table-column prop="gasId" label="产品编号"></el-table-column>
                <el-table-column prop="makeInfo" label="生产(制造)单位"></el-table-column>
                <el-table-column prop="makeData" label="制造年月">
                  <template slot-scope="socpe">{{socpe.row.makeData| fmtdate}}</template>
                </el-table-column>
                <el-table-column prop="pressure" label="公称工作压力(Mpa)"></el-table-column>
                <el-table-column prop="volume" label="容积(L)"></el-table-column>
                <el-table-column prop="checkData" label="检验日期">
                  <template slot-scope="socpe">{{socpe.row.checkData| fmtdate}}</template>
                </el-table-column>
                <el-table-column prop="nextCheckData" label="下次检验日期">
                  <template slot-scope="socpe">{{socpe.row.nextCheckDate | fmtdate}}</template>
                </el-table-column>
                <el-table-column prop="selfId" label="自身编号"></el-table-column>
                <el-table-column prop="changeStatus" label="变更或者停用情况">
                  <template slot-scope="scope">
                    <p v-if="gridData2[scope.$index].changeStatus==0">新增</p>
                    <p v-if="gridData2[scope.$index].changeStatus==1">停用</p>
                    <p v-if="gridData2[scope.$index].changeStatus==2">注销</p>
                    <p v-if="gridData2[scope.$index].changeStatus==3">报废</p>
                  </template>
                </el-table-column>
              </el-table>
              <el-pagination
                style="padding:5px 15px 15px 15px;display:flex; justify-content: flex-end;"
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currPage"
                :page-sizes="[10,15,20,25,30]"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total2"
              ></el-pagination>
            </el-dialog>

            <el-dialog title="查看信息" :visible.sync="dialogTableVisible9">
              <span slot="title">
                <span style="color: #23cdfd">查看信息</span>
              </span>
              <el-table :data="gridData10" border>
                <el-table-column type="index" label="序号" width="50" show-overflow-tooltip>
                  <template slot-scope="socpe">
                    <p style="cursor:pointer;" @click="showEdituser(socpe.row)">{{socpe.$index+1}}</p>
                  </template>
                </el-table-column>
                <el-table-column prop="regId" label="登记证号" show-overflow-tooltip></el-table-column>
                <el-table-column prop="country" label="行政区划" show-overflow-tooltip></el-table-column>
                <el-table-column prop="num" label="气瓶数量" show-overflow-tooltip></el-table-column>
                <el-table-column prop="checkName" label="监督检验检测机构" show-overflow-tooltip></el-table-column>
                <el-table-column prop="useName" label="使用单位" show-overflow-tooltip></el-table-column>
                <el-table-column prop="certification" label="登记机关" show-overflow-tooltip></el-table-column>
                <el-table-column prop="cretificationDate" label="发证日期" show-overflow-tooltip>
                  <template slot-scope="socpe">{{socpe.row.cretificationDate | fmtdate}}</template>
                </el-table-column>
              </el-table>
              <el-pagination
                style="padding:5px 15px 15px 15px;display:flex; justify-content: flex-end;"
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currPage"
                :page-sizes="[10,15,20,25,30]"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total3"
              ></el-pagination>
            </el-dialog>

            <div class="box4">
              <img
                src="~@/../static/images/d.png"
                alt
                class="img4"
                style="cursor:pointer;"
                @click="dialogTableVisible3 = false"
              />
              <span class="span4">加气机数</span>
              <p id="listedCompany3">{{this.jia}}</p>
            </div>
            <el-dialog title="查看信息" :visible.sync="dialogTableVisible3">
              <span slot="title">
                <span style="color: #23cdfd">查看信息</span>
              </span>
              <el-table :data="gridData3" border>
                <el-table-column prop="name" label="加气单位名称" width="180"></el-table-column>
                <el-table-column prop="num" label="登记证号" width="180"></el-table-column>
                <el-table-column prop="number" label="气瓶编号"></el-table-column>
                <el-table-column prop="qiang" label="加气枪号"></el-table-column>
                <el-table-column prop="liang" label="加气量"></el-table-column>
                <el-table-column prop="time" label="加气时间"></el-table-column>
              </el-table>
              <el-pagination
                style="padding:5px 15px 15px 15px;display:flex; justify-content: flex-end;"
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currPage"
                :page-sizes="[10,15,20,25,30]"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total4"
              ></el-pagination>
            </el-dialog>
            <div class="box5">
              <img
                src="~@/../static/images/f.png"
                alt
                class="img5"
                style="cursor:pointer;"
                @click="dialogTableVisible8 = true"
              />
              <span class="span5">检验站</span>
              <p id="listedCompany4">{{this.jianyan}}</p>
            </div>
            <el-dialog title="查看信息" :visible.sync="dialogTableVisible8">
              <span slot="title">
                <span style="color: #23cdfd">查看信息</span>f
              </span>
              <el-table border :data="gridData8">
                <el-table-column show-overflow-tooltip prop="name" label="单位名称"></el-table-column>
                <!-- <el-table-column show-overflow-tooltip prop="division" label="行政区划"></el-table-column> -->
                <el-table-column show-overflow-tooltip prop="personnel_name" label="负责人"></el-table-column>
                <el-table-column show-overflow-tooltip prop="licence" label="特种设备许可证号"></el-table-column>
                <el-table-column show-overflow-tooltip prop="phone" label="负责人联系电话"></el-table-column>
                <el-table-column show-overflow-tooltip prop="address" label="单位地址"></el-table-column>
                <el-table-column show-overflow-tooltip prop="unitIssueTime" label="发证日期">
                  <template slot-scope="socpe">{{socpe.row.unitIssueTime | fmtdate}}</template>
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="unitChangeTime" label="换证日期">
                  <template slot-scope="socpe">{{socpe.row.unitChangeTime | fmtdate}}</template>
                </el-table-column>
              </el-table>
              <el-pagination
                style="padding:5px 15px 15px 15px;display:flex; justify-content: flex-end;"
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currPage"
                :page-sizes="[10,15,20,25,30]"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total5"
              ></el-pagination>
            </el-dialog>
            <div class="box6">
              <img
                src="~@/../static/images/c.png"
                alt
                class="img6"
                style="cursor:pointer;"
                @click="dialogTableVisible5 = true"
              />
              <span class="span6">发证员工</span>
              <p id="listedCompany5">{{this.fa}}</p>
            </div>
            <el-dialog title="查看信息" :visible.sync="dialogTableVisible5">
              <span slot="title">
                <span style="color: #23cdfd">查看信息</span>
              </span>
              <el-table border :data="gridData11">
                <el-table-column show-overflow-tooltip prop="unitName" label="单位名称"></el-table-column>
                <el-table-column show-overflow-tooltip prop="name" label="真实姓名"></el-table-column>
                <el-table-column show-overflow-tooltip prop="workNumber" label="作业证号"></el-table-column>
                <el-table-column show-overflow-tooltip prop="phone" label="联系电话"></el-table-column>
                <el-table-column show-overflow-tooltip prop="address" label="单位地址"></el-table-column>
                <el-table-column show-overflow-tooltip prop="certificateTime" label="发证日期">
                  <template slot-scope="socpe">{{socpe.row.unitIssueTime | fmtdate}}</template>
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="renewalTime" label="换证日期">
                  <template slot-scope="socpe">{{socpe.row.unitChangeTime | fmtdate}}</template>
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="type" label="人员类型">
                  <template slot-scope="scope">
                    <p v-if="gridData11[scope.$index].type==0">充装人员</p>
                    <p v-if="gridData11[scope.$index].type==1">检验人员</p>
                    <p v-if="gridData11[scope.$index].type==2">配送人员</p>
                  </template>
                </el-table-column>
              </el-table>
              <el-pagination
                style="padding:5px 15px 15px 15px;display:flex; justify-content: flex-end;"
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currPage"
                :page-sizes="[10,15,20,25,30]"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total6"
              ></el-pagination>
            </el-dialog>
          </div>
        </div>
      </div>
      <div class="big_left_chart2">
        <div class="big_left_chart2_title">归属单位发布</div>
        <div class="big_left_chart2_box">
          <div id="myChart2" :style="{width: '100%', height: '100%'}"></div>
        </div>
      </div>
      <div class="big_right_chart1">
        <div class="big_right_chart1_title">
          本月气站活跃情况
          <div class="big_heng_line"></div>
        </div>
        <div class="big_right_chart1_box">
          <div id="myChart3" :style="{width: '100%', height: '100%'}"></div>
        </div>
      </div>
      <div class="big_right_chart2">
        <div class="big_right_chart2_title">检验状态</div>
        <el-row class="elb">
          <!-- <el-button
            type="danger"
            round
            @mouseover="enter()"
            class="elb1"
          >即将超期:{{this.hei}}</el-button>-->

          <!-- <el-dialog title="查看信息" :visible.sync="dialogTableVisible10">
            <span slot="title">
              <span style="color: #23cdfd">查看信息</span>
          </span>-->
          <!-- <div ref="tlb" class="box11" :style="active" >
            <el-table border :data="gridData5"  >
              <el-table-column prop="name" label="单位名称"></el-table-column>
              <el-table-column prop="count" label="数量"></el-table-column>
              <el-table-column prop="pre" label="百分比"></el-table-column>
            </el-table>
          </div>-->
          <!-- </el-dialog> -->
          <div @mouseover="mouseOver" @mouseleave="mouseLeave" style="width:100%;">
            <el-button type="success" round class="elb1">合格:{{this.hege}}</el-button>
          </div>
          <div ref="tlb" class="box11" :style="active">
            <el-table border :data="gridData4">
              <el-table-column prop="name" label="单位名称"></el-table-column>
              <el-table-column prop="count" label="数量"></el-table-column>
              <el-table-column prop="pre" label="百分比">
                <template slot-scope="scope">
                  <span>{{scope.row.pre * 100 | rounding}}%</span>
                </template>
              </el-table-column>
            </el-table>
          </div>

          <div @mouseover="mouseOver1" @mouseleave="mouseLeave1" class="d1" style="width:100%;">
            <el-button type="primary" round class="elb1">即将超期:{{this.hei}}</el-button>
          </div>
          <div ref="tlb" class="box12" :style="active1">
            <el-table border :data="gridData5">
              <el-table-column prop="name" label="单位名称"></el-table-column>
              <el-table-column prop="count" label="数量"></el-table-column>
              <el-table-column prop="pre" label="百分比">
                <template slot-scope="scope">
                  <span>{{scope.row.pre * 100 | rounding}}%</span>
                </template>
              </el-table-column>
            </el-table>
          </div>

          <div @mouseover="mouseOver2" @mouseleave="mouseLeave2" style="width:100%;" class="d3">
            <el-button type="warning" round class="elb1">逾期未检:{{this.yuqi}}</el-button>
          </div>
          <div ref="tlb" class="box13" :style="active2">
            <el-table border :data="gridData7">
              <el-table-column prop="name" label="单位名称"></el-table-column>
              <el-table-column prop="count" label="数量"></el-table-column>
              <el-table-column prop="pre" label="百分比">
                <template slot-scope="scope">
                  <span>{{scope.row.pre * 100 | rounding}}%</span>
                </template>
              </el-table-column>
            </el-table>
          </div>

          <div @mouseover="mouseOver3" @mouseleave="mouseLeave3" class="d2" style="width:100%;">
            <el-button type="danger" round class="elb1">不合格:{{this.bhege}}</el-button>
          </div>
          <div ref="tlb" class="box14" :style="active3">
            <el-table border :data="gridData6">
              <el-table-column prop="name" label="单位名称"></el-table-column>
              <el-table-column prop="count" label="数量"></el-table-column>
              <el-table-column prop="pre" label="百分比">
                <template slot-scope="scope">
                  <span>{{scope.row.pre * 100 | rounding}}%</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <!-- <el-button
            type="success"
            round
            style="cursor:pointer;"
            @click="dialogTableVisible4 = true"
          >合格:{{this.hege}}</el-button>
          <el-dialog title="查看信息" :visible.sync="dialogTableVisible4">
            <span slot="title">
              <span style="color: #23cdfd">查看信息</span>
            </span>
            <el-table border :data="gridData4">
              <el-table-column prop="name" label="单位名称"></el-table-column>
              <el-table-column prop="count" label="数量"></el-table-column>
              <el-table-column prop="pre" label="百分比"></el-table-column>
            </el-table>
          </el-dialog>-->
          <!-- <el-button
            type="warning"
            round
            style="cursor:pointer;"
            @click="dialogTableVisible6 = true"
          >不合格:{{this.bhege}}</el-button>
          <el-dialog title="查看信息" :visible.sync="dialogTableVisible6">
            <span slot="title">
              <span style="color: #23cdfd">查看信息</span>
            </span>
            <el-table border :data="gridData6">
              <el-table-column prop="name" label="单位名称"></el-table-column>
              <el-table-column prop="count" label="数量"></el-table-column>
              <el-table-column prop="pre" label="百分比"></el-table-column>
            </el-table>
          </el-dialog>
          <el-button
            type="primary"
            round
            style="cursor:pointer;padding-left:10px;"
            @click="dialogTableVisible7 = true"
          >逾期未检:{{this.yuqi}}</el-button>
          <el-dialog title="查看信息" :visible.sync="dialogTableVisible7">
            <span slot="title">
              <span style="color: #23cdfd">查看信息</span>
            </span>
            <el-table border :data="gridData7">
              <el-table-column prop="name" label="单位名称"></el-table-column>
              <el-table-column prop="count" label="数量"></el-table-column>
              <el-table-column prop="pre" label="百分比"></el-table-column>
            </el-table>
          </el-dialog>-->
        </el-row>
      </div>
      <div class="big_bottom_right">
        <div class="big_bottom_right_title">数量趋势</div>
        <div class="big_bottom_right_box">
          <div id="myChart4" :style="{width: '100%', height: '100%'}"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import jilin from "../../data/jilin.json";
// import ditu from "../../data/ditu.json";
import img0 from "../../assets/images/buhege.svg";
import img1 from "../../assets/images/hege.svg";
import img2 from "../../assets/images/chaoqi.svg";
import img3 from "../../assets/images/jijiang.svg";
let echarts = require("echarts/lib/echarts");
const padDate = function(value) {
  return value < 10 ? `0${value}` : value;
};
export default {
  name: "Home",
  data() {
    return {
      center: { lng: 112.94086156659164, lat: 28.23351373249851 }, //经纬度
      zoom: 11, //地图展示级别
      // location: "长沙市",
      dialogVisible: false,
      keyword: "请输入搜索关键字",
      markerPoint: [], //数据
      text: "", //传的单条数据
      total: -1,
      total1: -1,
      total2: 12,
      total3: -1,
      total4: -1,
      total5: -1,
      total6: -1,
      currPage: 1,
      page: 1,
      pageSize: 10,
      userlist: [],
      tishi: {
        buhege: img0,
        hege: img1,
        chaoqi: img2,
        weijian: img3
      },
      date: new Date(),
      wd: "",
      tq: "",
      menuFlag: "0",
      mapStyle: {
        styleJson: [
          {
            featureType: "land",
            elementType: "geometry",
            stylers: {
              color: "#091220"
            }
          },
          {
            featureType: "building",
            elementType: "geometry",
            stylers: {
              color: "#2b2b2b"
            }
          },
          {
            featureType: "highway",
            elementType: "all",
            stylers: {
              lightness: -42,
              saturation: -91
            }
          },
          {
            featureType: "arterial",
            elementType: "geometry",
            stylers: {
              lightness: -77,
              saturation: -94
            }
          },
          {
            featureType: "green",
            elementType: "geometry",
            stylers: {
              color: "#1b1b1b"
            }
          },
          {
            featureType: "water",
            elementType: "geometry",
            stylers: {
              color: "#181818"
            }
          },
          {
            featureType: "subway",
            elementType: "geometry.stroke",
            stylers: {
              color: "#181818"
            }
          },
          {
            featureType: "railway",
            elementType: "geometry",
            stylers: {
              lightness: -52
            }
          },
          {
            featureType: "all",
            elementType: "labels.text.stroke",
            stylers: {
              color: "#313131"
            }
          },
          {
            featureType: "all",
            elementType: "labels.text.fill",
            stylers: {
              color: "#8b8787"
            }
          },
          {
            featureType: "manmade",
            elementType: "geometry",
            stylers: {
              color: "#1b1b1b"
            }
          },
          {
            featureType: "local",
            elementType: "geometry",
            stylers: {
              lightness: -75,
              saturation: -91
            }
          },
          {
            featureType: "subway",
            elementType: "geometry",
            stylers: {
              lightness: -65
            }
          },
          {
            featureType: "railway",
            elementType: "all",
            stylers: {
              lightness: -40
            }
          },
          {
            featureType: "boundary",
            elementType: "geometry",
            stylers: {
              color: "#8b8787",
              weight: "1",
              lightness: -29
            }
          }
        ]
      },
      // myChart: undefined,
      myChart2: undefined,
      myChart3: undefined,
      myChart4: undefined,

      // tableData: [],
      gridData: [],
      gridData1: [],
      gridData2: [],
      gridData3: [],
      gridData4: [],
      gridData5: [],
      gridData6: [],
      gridData7: [],
      gridData11: [],
      dialogTableVisible: false,
      dialogTableVisible1: false,
      dialogTableVisible2: false,
      dialogTableVisible3: false,
      dialogTableVisible4: false,
      dialogTableVisible5: false,
      dialogTableVisible6: false,
      dialogTableVisible7: false,
      dialogTableVisible8: false,
      dialogTableVisible9: false,
      dialogTableVisible10: false,
      cong: "",
      pei: "",
      deng: "",
      jia: "",
      hei: "",
      gui: "",
      hege: "",
      bhege: "",
      yuqi: "",
      jianyan: "",
      fa: "",
      gridData8: [],
      gridData10: [],
      active: "display: none",
      active1: "display: none",
      active2: "display: none",
      active3: "display: none"
    };
  },
  async created() {
    this.change1();
    this.change2();
    this.change3();
    this.change4();
    this.change5();
    this.change6();
    const res6 = await this.$http.get(`/stats/map`);
    console.log(res6);
    this.markerPoint = res6.data.data;
      value2: 0,
    this.markerPoint.forEach(e => {
      if (e.status == "0") {
        e.status = img0;
      } else if (e.status == "1") {
        e.status = img1;
      } else if (e.status == "2") {
        e.status = img2;
      } else if (e.status == "3") {
        e.status = img3;
      }
    });
  },
  filters: {
    formatDate: function(value) {
      const date = new Date(value);
      const year = date.getFullYear();
      const month = padDate(date.getMonth() + 1);
      const day = padDate(date.getDate());
      const hours = padDate(date.getHours());
      const minutes = padDate(date.getMinutes());
      const seconds = padDate(date.getSeconds());
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    },
    rounding(value) {
      return value.toFixed(2);
    }
  },
  mounted() {
    // console.log(ditu);
    this.getUserlist().then(data => {
      this.gui = data;
      const _this = this;
      this.timer = setInterval(function() {
        _this.date = new Date();
      }, 1000);
      this.$http
        .get("http://wthrcdn.etouch.cn/weather_mini?city=长沙")
        .then(res => {
          const tqMsg = res.data.data.forecast[0];
          this.wd =
            parseInt(tqMsg.low.split(" ")[1]) +
            " ~ " +
            tqMsg.high.split(" ")[1];
          this.tq = tqMsg.type;
          this.fx = tqMsg.fengxiang;
        });
      this.initChart();
      this.drawMap(jilin, "jilin");
      this.drawMap2();
      this.drawMap3();
      this.drawMap4();
    });
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  },
  methods: {
    async showEdituser(user) {
      this.dialogTableVisible2 = true;
      this.dialogTableVisible9 = false;
      console.log(user);
      //已登记气瓶表格第二次点击详细信息
      const res7 = await this.$http.get(
        `/stats/findBottle/${user.regId}?pageSize=${this.pageSize}&currPage=${this.currPage}`
      );
      console.log(res7);
      this.gridData2 = res7.data.data.list;
      this.total2 = res7.data.data.totalCount;
    },
    async change1() {
      const res8 = await this.$http.get(`/stats/findByType/1`);
      this.hege = res8.data.data;

      //检验站表格详细信息
      const res18 = await this.$http.get(
        `/stats/findUnit/3?pageSize=${this.pageSize}&currPage=${this.currPage}`
      );
      this.gridData8 = res18.data.data.list;
      this.total5 = res18.data.data.totalCount;
    },
    async change2() {
      const res9 = await this.$http.get(`/stats/findByType/0`);
      this.bhege = res9.data.data;
    },
    async change3() {
      const res10 = await this.$http.get(`/stats/findByType/2`);
      this.yuqi = res10.data.data;

      //检验状态合格
      const res11 = await this.$http.get(`/stats/findByTypeAndUnit/1`);
      console.log(res11)
      this.gridData4 = res11.data.data.list;
    },
    async change4() {
      //发证员工表格详细信息
      const res1 = await this.$http.get(
        `/stats/app?pageSize=${this.pageSize}&currPage=${this.currPage}`
      );
      console.log(res1);
      this.gridData11 = res1.data.data.list;
      this.total6 = res1.data.data.totalCount;

      //充装站表格详细信息
      const res12 = await this.$http.get(
        `/stats/findUnit/2?pageSize=${this.pageSize}&currPage=${this.currPage}`
      );
      console.log(res12)
      this.gridData = res12.data.data.list;
      this.total = res12.data.data.totalCount;

      //配送站表格详细信息
      const res13 = await this.$http.get(
        `/stats/findUnit/5?pageSize=${this.pageSize}&currPage=${this.currPage}`
      );
      this.gridData1 = res13.data.data.list;
      this.total1 = res13.data.data.totalCount;

      //已登记气瓶表格第一次点击详细信息
      const res19 = await this.$http.get(
        `/stats/findDoucument?pageSize=${this.pageSize}&currPage=${this.currPage}`
      );
      console.log(res19);
      this.gridData10 = res19.data.data.list;
      console.log(this.gridData10);
      this.total3 = res19.data.data.totalCount;
      console.log(this.total3);
    },

    async change5() {
      //检验状态即将超期表单
      const res14 = await this.$http.get(`/stats/findByTypeAndUnit/3`);
      console.log(res14);
      this.gridData5 = res14.data.data.list;

      //检验状态不合格表单
      const res15 = await this.$http.get(`/stats/findByTypeAndUnit/0`);
      this.gridData6 = res15.data.data.list;

      //检验状态逾期未检表单
      const res16 = await this.$http.get(`/stats/findByTypeAndUnit/2`);
      this.gridData7 = res16.data.data.list;
    },
    async change6() {},
    //百度地图初始化
    handler({ BMap, map }) {},
    // 关闭信息窗口 @close 自带的方法
    infoWindowClose(e) {
      this.text = "";
    },
    //首先点击marker时开启信息窗口
    infoWindowOpen(e) {
      if (this.text !== e) {
        console.log(this.text);
        this.text = e;
      } else {
        console.log(this.text);
        this.text = "";
      }
    },
    //点击获取到当前经纬度
    getClickInfo(e) {
      console.log(e.point.lng);
      console.log(e.point.lat);
      this.center.lng = e.point.lng;
      this.center.lat = e.point.lat;
    },
    //双向绑定经纬度以及缩放尺寸
    syncCenterAndZoom(e) {
      const { lng, lat } = e.target.getCenter();
      this.center.lng = lng;
      this.center.lat = lat;
      // this.zoom = e.target.getZoom();
    },
    //经纬度同步
    baidumap() {
      this.baiduDevicelocationx = this.center.lng;
      this.baiduDevicelocationy = this.center.lat;
    },
    hideMenu() {
      if (this.menuFlag === "1") {
        this.menuFlag = "0";
      }
    },
    showMenu() {
      if (this.menuFlag === "0") {
        this.menuFlag = "1";
      }
    },
    showMessage() {
      console.log(1);
    },
    // 移入
    mouseOver() {
      this.active = "display:block";
    },
    // 移出
    mouseLeave() {
      this.active = "display:none";
    },
    // 移入
    mouseOver1() {
      this.active1 = "display:block";
    },
    // 移出
    mouseLeave1() {
      this.active1 = "display:none";
    },
    // 移入
    mouseOver2() {
      this.active2 = "display:block";
    },
    // 移出
    mouseLeave2() {
      this.active2 = "display:none";
    },
    // 移入
    mouseOver3() {
      this.active3 = "display:block";
      console.log(111);
    },
    // 移出
    mouseLeave3() {
      this.active3 = "display:none";
    },
    initChart() {
      // 基于准备好的dom，初始化echarts实例
      // this.myChart = echarts.init(document.getElementById("myChart"));
      // this.myChart1 = echarts.init(document.getElementById("myChart1"));
      this.myChart2 = echarts.init(document.getElementById("myChart2"));
      this.myChart3 = echarts.init(document.getElementById("myChart3"));
      this.myChart4 = echarts.init(document.getElementById("myChart4"));
    },
    toPercent(pre){
      var str = Number(pre * 100).toFixed(1);
      str += "%";
      return str;
    },
    async drawMap2(){
      // const _this = this;
      const res = await this.$http.get(`/stats/findByUseUnit`);
      console.log(res);

      const option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        grid: {
          top: "5%",
          bottom: "20%",
          left: "15%",
          right: "0%"
        },
        series: [
          {
            name: "加气站",
            type: "pie",
            radius: ["30%", "50%"],
            center: ["55%", "50%"],
            label: {
              color: "#fff",
              fontSize: 12
            },
            data: res.data.data,
            label: {
              show: true,
              formatter: " {b} : \n {c} \n ({d}%) ",

              align: "left",
              normal: {
                formatter(v) {
                  let text = Math.round(v.percent) + "%," + "：" + v.name;

                  if (text.length <= 4) {
                    return text;
                  } else if (text.length > 4 && text.length <= 8) {
                    return (text = `${text.slice(0, 4)}\n${text.slice(4)}`);
                  } else if (text.length > 6 && text.length <= 12) {
                    return (text = `${text.slice(0, 4)}\n${text.slice(
                      4,
                      8
                    )}\n${text.slice(8)}`);
                  } else if (text.length > 12 && text.length <= 16) {
                    return (text = `${text.slice(0, 4)}\n${text.slice(
                      4,
                      8
                    )}\n${text.slice(8, 12)}\n${text.slice(12)}`);
                  } else if (text.length > 16) {
                    return (text = `${text.slice(0, 4)}\n${text.slice(
                      4,
                      8
                    )}\n${text.slice(8, 12)}\n${text.slice(
                      12,
                      16
                    )}\n${text.slice(16)}`);
                  }
                },
                textStyle: {
                  fontSize: 10
                }
              },
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
            // [
            //   {
            //     value: res.data.data[0].baiFen,
            //     name: res.data.data[0].buildingUser,
            //     // itemStyle: {
            //     //   color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            //     //     { offset: 0, color: "rgba(235,101,47,1)" },
            //     //     { offset: 1, color: "rgba(247,153,58,1)" }
            //     //   ])
            //     // }
            //   },
            //   {
            //     value: res.data.data[1].baiFen,
            //     name: res.data.data[1].buildingUser,
            //     // itemStyle: {
            //     //   color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            //     //     { offset: 0, color: "rgba(231,231,50,1)" },
            //     //     { offset: 1, color: "rgba(231,231,50,0.8)" }
            //     //   ])
            //     // }
            //   }
            // ]
          }
        ]
      };
      this.myChart2.setOption(option);
    },
    async drawMap3() {
      const res17 = await this.$http.get(`/stats/RecordNumber`);
      const datad1 = [];
      const datadd1 = [];
      for (var key in res17.data.data) {
        datad1.push(res17.data.data[key].name);

        datadd1.push(res17.data.data[key].count);
      }
      const option = {
        color: ["#4e72b8"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: datad1,
            axisTick: {
              alignWithLabel: true
            },
            axisLine: {
              lineStyle: {
                color: "#0087ed",
                width: 1
              }
            },
            axisLabel: {
              interval: 0,
              formatter: function(params) {
                var newParamsName = ""; // 最终拼接成的字符串
                var paramsNameNumber = params.length; // 实际标签的个数
                var provideNumber = 2; // 每行能显示的字的个数
                var rowNumber = Math.ceil(paramsNameNumber / provideNumber); // 换行的话，需要显示几行，向上取整
                /**
                 * 判断标签的个数是否大于规定的个数， 如果大于，则进行换行处理 如果不大于，即等于或小于，就返回原标签
                 */
                // 条件等同于rowNumber>1
                if (paramsNameNumber > provideNumber) {
                  /** 循环每一行,p表示行 */
                  for (var p = 0; p < rowNumber; p++) {
                    var tempStr = ""; // 表示每一次截取的字符串
                    var start = p * provideNumber; // 开始截取的位置
                    var end = start + provideNumber; // 结束截取的位置
                    // 此处特殊处理最后一行的索引值
                    if (p == rowNumber - 1) {
                      // 最后一次不换行
                      tempStr = params.substring(start, paramsNameNumber);
                    } else {
                      // 每一次拼接字符串并换行
                      tempStr = params.substring(start, end) + "\n";
                    }
                    newParamsName += tempStr; // 最终拼成的字符串
                  }
                } else {
                  // 将旧标签的值赋给新标签
                  newParamsName = params;
                }
                //将最终的字符串返回
                return newParamsName;
              }
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "单位/次数",
            splitLine: {
              lineStyle: {
                color: ["#0087ed"]
              }
            },
            nameTextStyle: {
              color: ["white"]
            },
            axisLine: {
              lineStyle: {
                color: "#0087ed",
                width: 1
              }
            }
          }
        ],
        series: [
          {
            name: "加气站",
            type: "bar",
            barWidth: 30,
            data: datadd1
          }
        ]
      };
      this.myChart3.setOption(option);
    },
    async drawMap4() {
      const res = await this.$http.get(`/stats/recordCount`);
      console.log(res);

      const datad = [];
      const datadd = [];
      const zhexian = res.data.data;
      for (var key in res.data.data) {
        datad.push(res.data.data[key].year);
        datadd.push(res.data.data[key].num);
      }

      const option = {
        xAxis: [
          {
            type: "category",
            data: datad,
            axisTick: {
              alignWithLabel: true
            },
            axisLine: {
              lineStyle: {
                color: "#0087ed",
                width: 1
              }
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "气瓶数/个",
            splitLine: {
              lineStyle: {
                color: ["#0087ed"]
              }
            },
            nameTextStyle: {
              color: ["white"]
            },
            axisLine: {
              lineStyle: {
                color: "#0087ed",
                width: 1
              }
            }
          }
        ],
        series: [
          {
            data: datadd,
            type: "line",
            itemStyle: {
              normal: {
                color: "#8cd5c2", //改变折线点的颜色
                lineStyle: {
                  color: "#8cd5c2" //改变折线颜色
                }
              }
            }
          }
        ]
      };
      this.myChart4.setOption(option);
    },
    drawMap(_d, _name) {
      echarts.registerMap(_name, _d);
      const mapData = [];
      const scatterColor = [
        "rgba(44,236,129,1)",
        "rgba(224,224,51,1)",
        "rgba(205,204,48,1)"
      ];
      _d.features.forEach((item, i) => {
        mapData.push({
          name: item.properties.name,
          value: item.properties.cp.concat([Math.round(Math.random() * 10000)]),
          label: {
            show: false,
            normal: {
              position: "top"
            }
          },
          itemStyle: {
            color: "#fff",
            normal: {
              color: scatterColor[i % 3]
            }
          }
        });
      });
      const color = [
        "rgba(255,255,255,0.8)",
        "rgba(205,204,48,1)",
        "rgba(255,255,255,0.8)"
      ];
    },
    //分页功能
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      // 1.每页显示条数的改变
      this.pageSize = val;
      // 回到第一页
      this.currPage = 1;
      // 希望当页条数改变时 从第一页开始显示 this.pagenum = 1 -》currPage=1?
      this.change4();
    },
    handleCurrentChange(val) {
      //页码改变时
      console.log(`当前页: ${val}`);
      this.currPage = val;
      this.change4();
    },
    async getUserlist() {
      const res = await this.$http.get(`/stats/findUnitNumber/2`);
      this.cong = res.data.data;

      const res1 = await this.$http.get(`/stats/findUnitNumber/5`);
      this.pei = res1.data.data;

      const res8 = await this.$http.get(`/stats/appNumber`);
      this.fa = res8.data.data;

      const res6 = await this.$http.get(`/stats/findUnitNumber/3`);
      this.jianyan = res6.data.data;

      const res2 = await this.$http.get(`/stats/findBottleNumber`);
      this.deng = res2.data.data;

      const res3 = await this.$http.get(`/stats/findHardWare`);
      this.jia = res3.data.data;

      const res4 = await this.$http.get(`/stats/findByType/3`);
      this.hei = res4.data.data;
    }
  }
};
</script>

<style  scoped>
.map_box {
  position: absolute;
  left: 14%;
  top: 8%;
  width: 73%;
  height: 80%;
}
.container {
  width: 100%;
  height: 100%;
  background-image: url("~@/../static/images/big_bg2.png");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100% 100%;
  background-color: rgba(10, 2, 24, 1);
  position: relative;
}
.big_head {
  position: relative;
  padding-top: 10px;
  height: 60px;
}
.big_head_title {
  line-height: 14px;
  font-size: 28px;
  text-align: center;
  /* color: rgba(220, 250, 250, 1); */
  color: rgb(35, 205, 253);
}

.big_head_bottom_line {
  width: 1920px;
  height: 144px;
  position: absolute;
  left: 50%;
  margin-left: -960px;
  bottom: -44px;
  background-image: url("~@/../static/images/big_head_line.png");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100% 100%;
}
.big_head_date {
  position: absolute;
  left: 5%;
  bottom: 45%;
  /* border-bottom: 3px solid rgba(35, 205, 253, 1); */
  color: rgba(35, 205, 253, 1);
  font-size: 18px;
  /* line-height: 22px; */
}

._tq {
  position: absolute;
  bottom: 45%;
  right: 5%;
  color: rgb(35, 205, 253);
  font-size: 18px;
}
.sanjiao_l_t {
  position: absolute;
  left: -5%;
  top: -6%;
  width: 13px;
  height: 13px;
  background-image: url("~@/../static/images/sanjiao_l_t.png");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100% 100%;
}
.sanjiao_r_t {
  position: absolute;
  right: -7%;
  top: -6%;
  width: 13px;
  height: 13px;
  background-image: url("~@/../static/images/sanjiao_r_t.png");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100% 100%;
}
.sanjiao_l_b {
  position: absolute;
  left: -5%;
  bottom: 0;
  width: 13px;
  height: 13px;
  background-image: url("~@/../static/images/sanjiao_l_b.png");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100% 100%;
}
.sanjiao_r_b {
  position: absolute;
  right: -7%;
  bottom: 0;
  width: 13px;
  height: 13px;
  background-image: url("~@/../static/images/sanjiao_r_b.png");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100% 100%;
}
.map_card1 {
  position: absolute;
  right: -6.5%;
  top: -5%;
  width: 177px;
  height: 95px;
  background-image: url("~@/../static/images/card_bg.png");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100% 100%;
}
.map_card_title1 {
  color: rgba(243, 232, 68, 1);
  font-size: 14px;
  position: absolute;
  top: 15%;
  left: 29%;
  /* text-align: center; */
  /* line-height: 30px; */
}
.map_card_count1 {
  color: rgba(243, 232, 68, 1);
  font-size: 32px;
  position: absolute;
  bottom: 18%;
  left: 5%;
}
.map_card_count2 {
  color: rgba(57, 250, 177, 1);
  font-size: 10px;
  position: absolute;
  bottom: 38%;
  right: 0%;
}
.map_card_count3 {
  color: rgba(236, 102, 34, 1);
  font-size: 10px;
  position: absolute;
  bottom: 20%;
  right: 17%;
}
.map_card2 {
  position: absolute;
  left: -4%;
  bottom: 1.5%;
  width: 195px;
  height: 95px;
  background-image: url("~@/../static/images/card_bg.png");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100% 100%;
}
.map_card_title2 {
  color: rgba(255, 255, 255, 1);
  font-size: 14px;
  position: absolute;
  top: 9px;
  left: 0;
  right: 0;
  text-align: center;
  line-height: 30px;
}
.map_card_num1 {
  color: rgba(243, 232, 68, 1);
  font-size: 28px;
  position: absolute;
  top: 48px;
  left: 3%;
  width: 31%;
  line-height: 30px;
  text-align: center;
}
.map_card_num2 {
  color: rgba(244, 72, 75, 1);
  font-size: 28px;
  position: absolute;
  top: 48px;
  left: 34%;
  width: 31%;
  line-height: 30px;
  text-align: center;
}
.map_card_num3 {
  color: rgba(118, 243, 246, 1);
  font-size: 28px;
  position: absolute;
  top: 48px;
  left: 65%;
  width: 31%;
  line-height: 30px;
  text-align: center;
}
.map_card3 {
  position: absolute;
  right: -6.5%;
  bottom: 1.5%;
  width: 187px;
  height: 95px;
  background-image: url("~@/../static/images/card_bg.png");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100% 100%;
}
.map_card_title3 {
  color: rgba(255, 255, 255, 1);
  font-size: 14px;
  position: absolute;
  top: 9px;
  left: 0;
  right: 0;
  text-align: center;
  line-height: 30px;
}
.map_card_sum {
  color: rgba(51, 219, 251, 1);
  font-size: 30px;
  position: absolute;
  top: 48px;
  left: 0;
  right: 0;
  line-height: 30px;
  text-align: center;
}
.map_center_title {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  line-height: 36px;
  font-size: 30px;
  font-weight: bold;
  color: rgba(35, 205, 253, 1);
  text-align: center;
}
.info-main {
  position: relative;
  width: 100%;
  height: 100%;
}
.img1,
.img2,
.img3,
.img4,
.img5,
.img6 {
  display: inline-block;
  width: 25%;
}
.img1 {
  position: absolute;
  left: 10%;
  top: 5%;
}
.img2 {
  position: absolute;
  right: 10%;
  top: 5%;
}
.img3 {
  position: absolute;
  left: 10%;
  bottom: 16%;
}
.img4 {
  position: absolute;
  right: 10%;
  bottom: 16%;
}
.img5 {
  position: absolute;
  right: 38%;
  top: 5%;
}
.img6 {
  position: absolute;
  right: 38%;
  bottom: 16%;
}
.span1,
.span2,
.span3,
.span4,
.span5,
.span6 {
  display: inline-block;
  font-size: 12px;
}
.span1 {
  position: absolute;
  left: 10%;
  top: 30%;
  color: white;
}
.span2 {
  position: absolute;
  right: 12%;
  top: 30%;
  color: white;
}
.span3 {
  position: absolute;
  left: 10%;
  bottom: 5%;
  color: white;
}
.span4 {
  position: absolute;
  right: 10%;
  bottom: 5%;
  color: white;
}
.span5 {
  position: absolute;
  right: 40%;
  top: 30%;
  color: white;
}
.span6 {
  position: absolute;
  right: 42%;
  bottom: 5%;
  color: white;
}
#listedCompany {
  position: absolute;
  left: 18%;
  top: 35%;
  color: white;
  font-size: 24px;
  font-weight: bold;
}
#listedCompany1 {
  position: absolute;
  right: 18%;
  top: 35%;
  color: white;
  font-size: 24px;
  font-weight: bold;
}
#listedCompany2 {
  position: absolute;
  left: 12%;
  bottom: -10%;
  color: white;
  font-size: 24px;
  font-weight: bold;
}
#listedCompany3 {
  position: absolute;
  right: 18%;
  bottom: -10%;
  color: white;
  font-size: 24px;
  font-weight: bold;
}
#listedCompany4 {
  position: absolute;
  right: 48%;
  top: 35%;
  color: white;
  font-size: 24px;
  font-weight: bold;
}
#listedCompany5 {
  position: absolute;
  right: 46%;
  bottom: -10%;
  color: white;
  font-size: 24px;
  font-weight: bold;
}
.big_left_chart1 {
  position: absolute;
  left: 1%;
  top: 6%;
  width: 18%;
  height: 42%;
  /* opacity: 0.5; */
  /* border: 1px solid rgba(255, 255, 255, 0.5); */
  /* background-image: url("~@/../static/images/panel.png"); */
  /* background-size:350px*200px; */
  /* background: rgba(0, 0, 0, 0.4); */
}
.big_left_chart2 {
  position: absolute;
  left: 1%;
  top: 57%;
  width: 18%;
  height: 42%;
  /* border: 1px solid rgba(255, 255, 255, 0.5); */
  /* background: rgba(0, 0, 0, 0.4); */
}
.big_center_chart {
  position: absolute;
  left: 28%;
  top: 15%;
  width: 42%;
  height: 19%;
}
.big_center_chart_title {
  position: absolute;
  left: 28%;
  top: 10%;
  line-height: 36px;
  font-size: 23px;
  font-weight: bold;
  color: rgba(35, 205, 253, 1);
  text-align: center;
}
.big_right_chart1 {
  position: absolute;
  right: 0%;
  top: 6%;
  width: 20%;
  height: 40%;
  /* border: 1px solid rgba(255, 255, 255, 0.5); */
  /* background: rgba(0, 0, 0, 0.4); */
}
.big_right_chart1_box {
  position: absolute;
  right: 0;
  top: 5%;
  width: 100%;
  height: 100%;
}
.big_right_chart2 {
  position: absolute;
  right: 1%;
  top: 48%;
  width: 18%;
  height: 20%;
  /* border: 1px solid rgba(255, 255, 255, 0.5); */
  /* background: rgba(0, 0, 0, 0.4); */
  /* margin: 0;
  padding: 0; */
}
.big_bottom_left {
  position: absolute;
  left: 1%;
  bottom: 4%;
  width: 46%;
  height: 20%;
  /* border: 1px solid rgba(255, 255, 255, 0.5); */
  background: rgba(0, 0, 0, 0.4);
  overflow: hidden;
}
.big_left_chart1_title {
  position: absolute;
  left: 0%;
  right: 0%;
  top: 2%;
  line-height: 36px;
  font-size: 18px;
  font-weight: bold;
  color: rgba(35, 205, 253, 1);
  text-align: center;
}
.big_left_chart2_title {
  position: absolute;
  left: 0px;
  right: 0;
  top: 2%;
  line-height: 36px;
  font-size: 18px;
  font-weight: bold;
  color: rgba(35, 205, 253, 1);
  text-align: center;
}
.big_right_chart1_title {
  position: absolute;
  left: 0px;
  right: 0px;
  top: 2%;
  line-height: 36px;
  font-size: 18px;
  font-weight: bold;
  color: rgba(35, 205, 253, 1);
  text-align: center;
}
.big_right_chart2_title {
  position: absolute;
  left: 12%;
  right: 6%;
  top: -10%;
  line-height: 36px;
  font-size: 18px;
  font-weight: bold;
  color: rgba(35, 205, 253, 1);
  text-align: center;
}
.big_bottom_left_title {
  position: absolute;
  left: 3%;
  top: 8%;
  width: 30px;
  line-height: 28px;
  font-size: 23px;
  font-weight: bold;
  color: rgba(35, 205, 253, 1);
  text-align: center;
}
.big_bottom_right {
  position: absolute;
  right: 0%;
  bottom: 1%;
  width: 18%;
  height: 30%;
  /* border: 1px solid rgba(255, 255, 255, 0.5); */
  /* background: rgba(0, 0, 0, 0.4); */
  /* overflow: hidden; */
}
.big_bottom_right_title {
  position: absolute;
  left: 0%;
  right: 0%;
  top: -10%;
  line-height: 36px;
  font-size: 18px;
  font-weight: bold;
  color: rgba(35, 205, 253, 1);
  text-align: center;
}
.big_bottom_right_box {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0%;
  top: 0%;
  right: 0;
  bottom: 0;
}
.big_heng_line {
  position: absolute;
  bottom: -10%;
  width: 100%;
  height: 10%;
  /* align-content: center; */
  /* width: 300px;
  height: 4px; */
  left: 50%;
  margin-left: -50%;
  background: -webkit-radial-gradient(
    ellipse,
    rgba(35, 205, 253, 1),
    rgba(35, 205, 253, 0),
    rgba(35, 205, 253, 0)
  );
}
.big_shu_line {
  position: absolute;
  right: 0;
  width: 10%;
  height: 200%;
  top: 50%;
  margin-top: -170px;
  background: -webkit-radial-gradient(
    ellipse,
    rgba(35, 205, 253, 1),
    rgba(35, 205, 253, 0),
    rgba(35, 205, 253, 0)
  );
}
.big_left_chart1_box {
  position: absolute;
  left: 0;
  top: 19%;
  bottom: 0;
  right: 0;
}

.big_left_chart2_box {
  position: absolute;
  right: 5%;
  top: 2%;
  width: 100%;
  height: 90%;
  /* width: 350px;
  height: 265px; */
}
.big_right_chart1_title1 {
  position: absolute;
  left: 0;
  top: 15%;
  line-height: 30px;
  right: 0;
  text-align: center;
  font-size: 16px;
  color: rgba(57, 253, 179, 1);
}
.big_right_chart1_title1 span {
  font-size: 26px;
}
.big_right_chart1_tab_l {
  width: 33%;
  text-align: center;
  float: left;
  box-shadow: inset 0px 0px 5px 1px rgba(255, 255, 255, 0.2);
}
.elb1 {
  /* margin: 10px 10px; */
  width: 20%;
  height: 3px;
  font-size: 12px;
  transform: scale(0.9);
  text-align: center;

}
.big_right_chart1_tab_c {
  width: 34%;
  text-align: center;
  float: left;
  border-left: 1px solid rgba(31, 71, 166, 1);
  border-right: 1px solid rgba(31, 71, 166, 1);
  margin: 0 -1px;
  box-shadow: inset 0px 0px 5px 1px rgba(255, 255, 255, 0.2);
}
.big_right_chart1_tab_r {
  width: 33%;
  text-align: center;
  float: left;
  box-shadow: inset 0px 0px 5px 1px rgba(255, 255, 255, 0.2);
}
.big_right_chart1_tab {
  height: 8%;
  line-height: 30px;
  font-size: 16px;
  width: 80%;
  position: absolute;
  top: 24%;
  left: 49%;
  margin-left: -37%;
  border-radius: 5px;
  border: 1px solid rgba(31, 71, 166, 1);
  color: rgba(33, 193, 239, 1);
  overflow: hidden;
}
.big_right_chart1_tab .active {
  color: rgba(240, 228, 63, 1);
}
.big_right_chart1_progress {
  position: absolute;
  left: 0%;
  top: 33%;
  right: 0%;
}
.big_progress_item {
  height: 20px;
  line-height: 20px;
  font-size: 14px;
  overflow: hidden;
  position: relative;
}
.big_progress_item_label {
  position: absolute;
  left: 0;
  width: 37%;
  text-align: right;
  color: rgba(52, 231, 165, 1);
}
.big_progress_item_bg {
  position: absolute;
  top: 32%;
  left: 42%;
  height: 6px;
  border-radius: 6px;
  overflow: hidden;
  right: 30%;
  background: -webkit-linear-gradient(
    right,
    rgba(137, 210, 118, 1),
    rgba(34, 188, 182, 1)
  );
  background: -o-linear-gradient(
    right,
    rgba(137, 210, 118, 1),
    rgba(34, 188, 182, 1)
  );
  background: -moz-linear-gradient(
    right,
    rgba(137, 210, 118, 1),
    rgba(34, 188, 182, 1)
  );
  background: linear-gradient(
    right,
    rgba(137, 210, 118, 1),
    rgba(34, 188, 182, 1)
  );
}
.big_progress_item_gray {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(25, 77, 107, 1);
}
.big_progress_item_count {
  position: absolute;
  right: 0;
  width: 25%;
  text-align: left;
  font-size: 14px;
  color: rgba(241, 229, 63, 1);
}
.big_right_chart2_box {
  position: absolute;
  left: 5%;
  top: 16%;
  width: 100%;
  height: 100%;
}
.elb {
  position: absolute;
  top: 25%;
  left: -8%;
}
p {
  margin: 0;
  padding: 0;
}
.tishi {
  width: 10%;
  position: absolute;
  left: 1%;
  top: 1%;
}
.anchor {
  margin-top: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #0087ed;
  font-size: 13px;
  font-weight: bold;
}
#allmap {
  overflow: hidden;
}
.map {
  height: 400px;
  position: relative;
  left: 8%;
}
.map >>> .BMap_cpyCtrl {
  display: none !important;
}

>>> .anchorBL {
  display: none;
}
.el-button.is-round {
  width: 50%;
  padding-left: 5px;
  /* padding-left: px; */
}
.box11,
.box12,
.box13,
.box14 {
  position: fixed;
  top: 20%;
  left: 40%;
  width: 600px;
  height: 500px;
}
.d1 {
  width: 50%;
  position: absolute;
  left: 50%;
  top: 0;
}
.d2 {
  position: absolute;
  left: 170%;
  bottom: 0;
}
.d3{
  position: absolute;
  left: 110%;
  top: 0;
}
</style>