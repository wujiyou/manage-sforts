<template>
  <div @mouseenter="mouseStop()" @mouseleave="mouseStart()">
    <!-- <div class="taTitle">
      <div>合格 :{{totalStatus[1]}}</div>
      <div>即将超期 : {{totalStatus[2]}}</div>
      <div>逾期未检 :{{totalStatus[3]}}</div>
      <div>报废 : {{totalStatus[0]}}</div>
    </div>-->
    <div class="taTitle">
      <div>气瓶信息</div>
    </div>
    <div class="rollScreen_once conHead">
      <span>气瓶编号</span>
      <span>使用单位</span>
      <span>下检日期</span>
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
          v-for="(item,index) in tabeData3"
          :key="index"
          :style="{height:height+'px'}"
        >
          <span style="color:white">{{item.gas_id}}</span>
          <span style="color:white">{{item.name}}</span>
          <span style="color:white">{{item.date}}</span>
        </li>
        <li
          class="rollScreen_once"
          v-for="(item,index) in tabeData3"
          :key="index+tabeData3.length"
          :style="{height:height+'px'}"
        >
          <span style="color:white">{{item.gas_id}}</span>
          <span style="color:white">{{item.name}}</span>
          <span style="color:white">{{item.date}}</span>
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
      lineNum: document.body.clientWidth / 300,
      w: document.body.clientWidth,
      num: 0,
      tabeData3: [],
      tim: "",
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
    ...mapState(["totalBottle", "totalStatus"]),
    transform: function () {
      return "translateY(-" + this.num * this.height + "px)";
    },
  },
  watch: {
    totalBottle(v) {
      console.log(this.totalBottle);
      let _this = this;
      this.tabeData3 = this.totalBottle;
      // if(this.tabeData3==0){
      clearInterval(this.tim);
      // }
      console.log(this.tabeData3.length);
      // if(this.tabeData3>0){
      this.tim = setInterval(function () {
        if (
          _this.num !== _this.tabeData3.length &&
          _this.tabeData3.length !== 0
        ) {
          _this.num++;
        } else {
          _this.num = 0;
        }
      }, 1000);

      //  }
    },
    totalStatus(v) {
      console.log(this.totalStatus);
      // this.init();
    },
  },
  methods: {
    mouseStop() {
      clearInterval(this.tim);
    },
    mouseStart() {
      let _this = this;
      this.tim = setInterval(function () {
        if (_this.num !== _this.tabeData3.length) {
          _this.num++;
        } else {
          _this.num = 0;
        }
      }, 1000);
    },
  },
  created() {
    // console.log(this.liNum);
    // console.log(1111111111111111);
  },
  mounted() {
    let _this = this;
    if (this.liNum) {
      this.lineNum = this.liNum;
    }
    this.tim = setInterval(function () {
      if (_this.num !== _this.tabeData3.length) {
        _this.num++;
      } else {
        _this.num = 0;
      }
    }, 1000);
    this.$once("hook:beforeDestroy", () => {
      clearInterval(this.tim);
    });
  },
  // beforeDestroy() {
  //   if (this.tim) {
  //     clearInterval(this.tim);
  //   }
  // },
};
</script>
 
<style scoped>
.rollScreen_container {
  width: 100%;
  display: inline-block;
  position: relative;
  overflow: hidden;
}
.rollScreen_list {
  transition: 1s linear;
  /* margin-top: 5%; */
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
  color: #2c4e92;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
}
.conHead {
  background-color: RGBA(41, 40, 65, 1);
  opacity: 0.5;
  font-weight: 600;
  /* padding: 1% 0; */
  margin-top: 3%;
  padding-left: 4%;
}
.conHead span {
  color: RGBA(0, 244, 248, 1);
}

.taTitle {
  display: flex;
  width: 100%;
  /* padding-left: 4%; */
  /* padding-top: 2%; */
}
.taTitle div {
  flex: 1;
  height: 16px;
  text-align: center;
  color: white;
  border-right: 2px solid #6abfc7;
}
.taTitle div:last-child {
  border: none;
}
</style>