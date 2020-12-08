<template>
  <div class="horserConn" @mouseenter="mouseStop_top()" @mouseleave="mouseStart_start()">
    <div class="taTitle">
      <div>
        合格：
        <span>{{liqueNumber[0]}}</span>
      </div>
      <div>
        即将超期：
        <span>{{liqueNumber[1]}}</span>
      </div>
      <div>
        逾期未检：
        <span>{{liqueNumber[2]}}</span>
      </div>
      <div>
        报废：
        <span>{{liqueNumber[3]}}</span>
      </div>
    </div>
    <div class="mess">气瓶信息</div>
    <div class="rollScreen_once conHead">
      <span>下检日期</span>
      <span>所属单位</span>
      <span>气瓶编号</span>
    </div>
    <div
      :style="{height:height*lineNum + 'px'}"
      class="rollScreen_container"
      id="rollScreen_container"
    >
      <ul
        class="rollScreen_list"
        :style="{transform:transform}"
        :class="{rollScreen_list_unanim:num===0}"
      >
        <li
          class="rollScreen_once"
          v-for="(item,index) in tabeData33"
          :key="index"
          :style="{height:height+'px'}"
        >
          <span>{{item.nextCheckData}}</span>
          <span>{{item.buildingUser}}</span>
          <span>{{item.gasId}}</span>
        </li>
        <li
          class="rollScreen_once"
          v-for="(item,index) in tabeData33"
          :key="index+tabeData33.length"
          :style="{height:height+'px'}"
        >
          <span>{{item.nextCheckData}}</span>
          <span>{{item.buildingUser}}</span>
          <span>{{item.gasId}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
 
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      lineNum: document.body.clientWidth / 200,
      w: document.body.clientWidth,
      num: 0,
      tabeData33: [],
      timer: "",
    };
  },
  props: {
    height: {
      default: 40,
      type: Number,
    },
    liNum: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    ...mapState(["liqueStatus", "liqueNumber"]),
    transform: function () {
      return "translateY(-" + this.num * this.height + "px)";
    },
  },
  watch: {
    liqueStatus(v) {
      let _this = this;
      console.log(this.liqueStatus);
      this.tabeData33 = this.liqueStatus;
      clearInterval(this.timer);
      this.timer = setInterval(function () {
        if (
          _this.num !== _this.tabeData33.length &&
          _this.tabeData33.length !== 0
        ) {
          _this.num++;
        } else {
          _this.num = 0;
        }
      }, 1000);
      // this.init();
    },
    liqueNumber(v) {
      console.log("----------------------------");
      console.log(this.liqueNumber);
    },
  },
  methods: {
    mouseStop_top() {
      clearInterval(this.timer);
    },
    mouseStart_start() {
      let _this = this;
      this.timer = setInterval(function () {
        if (_this.num !== _this.tabeData33.length) {
          _this.num++;
        } else {
          _this.num = 0;
        }
      }, 1000);
    },
  },
  created() {},
  mounted() {
    let _this = this;
    if (this.liNum) {
      this.lineNum = this.liNum;
    }
    this.timer = setInterval(function () {
      if (_this.num !== _this.tabeData33.length) {
        _this.num++;
      } else {
        _this.num = 0;
      }
    }, 1000);
    this.$once("hook:beforeDestroy", () => {
      clearInterval(this.timer);
    });
  },
};
</script>
 
<style scoped>
.mess {
  color: white;
  text-align: center;
  padding-top: 2%;
}
.horserConn {
  cursor: pointer;
}
.rollScreen_container {
  width: 100%;
  display: inline-block;
  position: relative;
  overflow: hidden;
}
.rollScreen_list {
  transition: 1s linear;
  margin-top: 5%;
}
.rollScreen_list_unanim {
  transition: none;
}
.rollScreen_once {
  width: 100%;
  display: flex;
  padding-left: 4%;
}
.rollScreen_once span {
  flex: 1;
  color: white;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
}
.conHead {
  background-color: RGBA(41, 40, 65, 1);
  opacity: 0.5;
  font-weight: 600;
  padding: 1% 0;
  margin-top: 3%;
  padding-left: 4%;
}
.conHead span {
  color: RGBA(0, 244, 248, 1);
}

.taTitle {
  display: flex;
  /* padding-left: 4%; */
  /* padding-top: 2%; */
}
.taTitle div {
  flex: 1;
  height: 16px;
  text-align: center;
  color: white;
  border-right: 2px solid #6abfc7;
  font-size: 12px;
  /* transform: scale(0.8); */
}
.taTitle div:last-child {
  border: none;
}
</style>