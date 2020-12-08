<template>
  <div style=" cursor: pointer;" @mouseenter="mouseStops1()" @mouseleave="mouseStarts1()">
    <div class="rollScreen_once conHead">
      <span>气瓶号</span>
      <span>车牌号</span>
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
          v-for="(item,index) in tabeDatass"
          :key="index"
          :style="{height:height+'px'}"
        >
          <span>{{item.gasId}}</span>
          <span>{{item.carNum}}</span>
          <span>{{item.nextCheckData}}</span>
        </li>
        <li
          class="rollScreen_once"
          v-for="(item,index) in tabeDatass"
          :key="index+tabeDatass.length"
          :style="{height:height+'px'}"
        >
          <span>{{item.gasId}}</span>
          <span>{{item.carNum}}</span>
          <span>{{item.nextCheckData}}</span>
        </li>
      </ul>
    </div>
    <!-- <div>{{vehMapData.carInformation}}</div> -->
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
      tabeDatass: [],
      timerr: "",
    };
  },
  props: {
    height: {
      default: 30,
      type: Number,
    },
    liNum: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    ...mapState(["carInformation"]),

    transform: function () {
      return "translateY(-" + this.num * this.height + "px)";
    },
  },
  watch: {
    carInformation(v) {
      let _this = this;
      console.log(this.carInformation);
      this.tabeDatass = this.carInformation;
      clearInterval(this.timerr);
      this.timerr = setInterval(function () {
        if (
          _this.num !== _this.tabeDatass.length &&
          _this.tabeDatass.length !== 0
        ) {
          _this.num++;
        } else {
          _this.num = 0;
        }
      }, 1000);
    },
  },
  methods: {
    mouseStops1() {
      clearInterval(this.timerr);
    },
    mouseStarts1() {
      let _this = this;
      this.timerr = setInterval(function () {
        if (_this.num !== _this.tabeDatass.length) {
          _this.num++;
        } else {
          _this.num = 0;
        }
      }, 1000);
    },
    // ...mapMutations(["CARINFORMATION"]),
  },

  created() {
    // console.log(this.carInformation);
    // let _this = this;
    // clearInterval(this.timerr);
    // this.timerr = setInterval(function () {
    //   if (_this.num !== _this.tabeDatass.length) {
    //     _this.num++;
    //   } else {
    //     _this.num = 0;
    //   }
    // }, 1000);
  },

  mounted() {
    let _this = this;
    if (this.liNum) {
      this.lineNum = this.liNum;
    }
    this.timerr = setInterval(function () {
      if (_this.num !== _this.tabeDatass.length) {
        _this.num++;
      } else {
        _this.num = 0;
      }
    }, 1000);
    this.$once("hook:beforeDestroy", () => {
      clearInterval(this.timerr);
    });
  },

  // beforeDestroy() {
  //   if (this.timerr) {
  //     clearInterval(this.timerr);
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
  color: #fff;
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
}
.taTitle div:last-child {
  border: none;
}
</style>