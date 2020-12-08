<template>
  <div style=" cursor: pointer;" @mouseenter="mouseStops3()" @mouseleave="mouseStarts3()">
    <div class="rollScreen_once conHead">
      <span>气瓶编号</span>
      <span>所属单位</span>
      <span>下检日期</span>
      <span>充装人员</span>
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
          v-for="(item,index) in tabeDatas3"
          :key="index"
          :style="{height:height+'px'}"
        >
          <span>{{item.gasApp}}</span>
          <span>{{item.unitName}}</span>
          <span>{{item.createTime}}</span>
          <span>{{item.userName}}</span>
        </li>
        <li
          class="rollScreen_once"
          v-for="(item,index) in tabeDatas3"
          :key="index+tabeDatas3.length"
          :style="{height:height+'px'}"
        >
          <span>{{item.gasApp}}</span>
          <span>{{item.unitName}}</span>
          <span>{{item.createTime}}</span>
          <span>{{item.userName}}</span>
        </li>
      </ul>
    </div>
    <!-- <div>{{vehMapData.carInformation}}</div> -->
  </div>
</template>
 
<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      lineNum: document.body.clientWidth / 200,
      w: document.body.clientWidth,
      num: 0,
      tabeDatas3: [],
      timerr2: "",
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
    ...mapState(["carRecord"]),
    transform: function () {
      return "translateY(-" + this.num * this.height + "px)";
    },
  },
  watch: {
    carRecord: {
      deep: true,
      handler(newVals) {
        console.log(newVals);
        let _this = this;
        clearInterval(this.timerr2);
        this.tabeDatas3 = newVals;
        this.timerr2 = setInterval(function () {
          if (
            _this.num !== _this.tabeDatas3.length &&
            _this.tabeDatas3.length !== 0
          ) {
            _this.num++;
          } else {
            _this.num = 0;
          }
        }, 1000);
      },
    },
    // carRecord(v) {

    //   //   let _this = this;
    //   //  clearInterval(this.timerr2);
    //   // console.log(this.carRecord);
    //   // this.tabeDatas3 = this.carRecord;

    //   // this.timerr2 = setInterval(function () {
    //   //   if (
    //   //     _this.num !== _this.tabeDatas3.length &&
    //   //     _this.tabeDatas3.length !== 0
    //   //   ) {
    //   //     _this.num++;
    //   //   } else {
    //   //     _this.num = 0;
    //   //   }
    //   // }, 1000);

    // },
  },
  methods: {
    mouseStops3() {
      clearInterval(this.timerr2);
    },
    mouseStarts3() {
      let _this = this;
      this.timerr2 = setInterval(function () {
        if (_this.num !== _this.tabeDatas3.length) {
          _this.num++;
        } else {
          _this.num = 0;
        }
      }, 1000);
    },
  },
  created() {
    let _this = this;
    clearInterval(this.timerr2);
    this.timerr2 = setInterval(function () {
      if (_this.num !== _this.tabeDatas3.length) {
        _this.num++;
      } else {
        _this.num = 0;
      }
    }, 1000);
  },

  mounted() {
    var _this = this;
    if (this.liNum) {
      this.lineNum = this.liNum;
    }
  },
  // beforeDestroy() {
  //   if (this.timerr2) {
  //     clearInterval(this.timerr2);
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