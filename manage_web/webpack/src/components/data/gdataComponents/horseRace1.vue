<template>
  <div @mouseenter="mouseStop()" @mouseleave="mouseStart()">
    <div class="taTitle">
      <div>气瓶充装记录</div>
    </div>
    <div class="rollScreen_once conHead">
      <span>充装单位</span>
      <span>充装员工</span>
      <span>充装时间</span>
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
          v-for="(item,index) in tabeData"
          :key="index"
          :style="{height:height+'px'}"
        >
          <span style="color:white">{{item.name}}</span>
          <span style="color:white">{{item.user_name}}</span>
          <span style="color:white">{{item.date}}</span>
        </li>
        <li
          class="rollScreen_once"
          v-for="(item,index) in tabeData"
          :key="index+tabeData.length"
          :style="{height:height+'px'}"
        >
          <span style="color:white">{{item.name}}</span>
          <span style="color:white">{{item.user_name}}</span>
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
      contentArr: [
        "内容1",
        "内容2",
        "内容3",
        "内容4",
        "内容5",
        "内容6",
        "内容7",
      ],
      lineNum: document.body.clientWidth / 300,
      w: document.body.clientWidth,
      num: 0,
      tabeData: [],
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
    ...mapState(["totalRecord"]),
    transform: function () {
      return "translateY(-" + this.num * this.height + "px)";
    },
  },
  watch: {
    totalRecord: {
      deep: true,
      handler(newVal) {
        let _this = this;
        clearInterval(this.timer);
        console.log(this.totalRecord);
        this.tabeData = newVal;
        this.timer = setInterval(function () {
          if (
            _this.num !== _this.tabeData.length &&
            _this.tabeData.length !== 0
          ) {
            _this.num++;
          } else {
            _this.num = 0;
          }
        }, 1000);
      },
    },
  },
  methods: {
    mouseStop() {
      clearInterval(this.timer);
    },
    mouseStart() {
      let _this = this;
      this.timer = setInterval(function () {
        if (_this.num !== _this.tabeData.length) {
          _this.num++;
        } else {
          _this.num = 0;
        }
      }, 1000);
    },
  },
  created() {
    let _this = this;
    clearInterval(this.timer);
    this.timer = setInterval(function () {
      if (_this.num !== _this.tabeData.length) {
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