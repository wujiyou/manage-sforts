<template>
  <div class="hoseCon" @mouseenter="mouseStop2()" @mouseleave="mouseStart2()">
    <div class="taTitle">
      <div>充装记录</div>
    </div>
    <div class="rollScreen_once conHead">
      <span>充装时间</span>
      <span>充装站</span>
      <span>充装人</span>
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
          v-for="(item,index) in tabeData2"
          :key="index"
          :style="{height:height+'px'}"
        >
          <span>{{item.createTime}}</span>
          <span>{{item.name}}</span>
          <span>{{item.userName}}</span>
        </li>
        <li
          class="rollScreen_once"
          v-for="(item,index) in tabeData2"
          :key="index+tabeData2.length"
          :style="{height:height+'px'}"
        >
          <span>{{item.createTime}}</span>
          <span>{{item.name}}</span>
          <span>{{item.userName}}</span>
        </li>
      </ul>
    </div>
    <!-- <div>{{tabeData}}</div> -->
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
      tabeData2: [],
      time2: "",
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
    ...mapState(["liqueRecord"]),
    transform: function () {
      return "translateY(-" + this.num * this.height + "px)";
    },
  },
  watch: {
    liqueRecord: {
      deep: true,
      handler(newVal) {
        let _this = this;
        clearInterval(this.time2);
        console.log(this.liqueRecord);
        this.tabeData2 = newVal;
        this.time2 = setInterval(function () {
          if (
            _this.num !== _this.tabeData2.length &&
            _this.tabeData2.length !== 0
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
    mouseStop2() {
      clearInterval(this.time2);
    },
    mouseStart2() {
      let _this = this;
      this.time2 = setInterval(function () {
        if (_this.num !== _this.tabeData2.length) {
          _this.num++;
        } else {
          _this.num = 0;
        }
      }, 1000);
    },
  },
  created() {
    let _this = this;
    clearInterval(this.time2);
    this.time2 = setInterval(function () {
      if (_this.num !== _this.tabeData2.length) {
        _this.num++;
      } else {
        _this.num = 0;
      }
    }, 1000);
  },
  mounted() {
    if (this.liNum) {
      this.lineNum = this.liNum;
    }
  },
};
</script>
 
<style scoped>
.hoseCon {
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
}
.taTitle div:last-child {
  border: none;
}
</style>