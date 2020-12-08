<template>
  <div style=" cursor: pointer;"  @mouseenter="mouseStop()" @mouseleave="mouseStart()">
    <div class="rollScreen_once conHead">
      <span>车牌号</span>
      <span>使用单位</span>
      <span>铭牌号</span>
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
          <span>{{item.car_num}}</span>
          <span>{{item.nameplate}}</span>
          <span>{{item.use_unit}}</span>
        </li>
        <li
          class="rollScreen_once"
          v-for="(item,index) in tabeData"
          :key="index+tabeData.length"
          :style="{height:height+'px'}"
        >
          <span>{{item.car_num}}</span>
          <span>{{item.nameplate}}</span>
          <span>{{item.use_unit}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
 
<script>
export default {
  data() {
    return {
      lineNum: document.body.clientWidth / 250,
      w: document.body.clientWidth,
      num: 0,
      tabeData: [],
      timer: "",
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
  created() {
    this.jl();
    let _this = this;
    clearInterval(this.timer);
    this.timer = setInterval(function () {
      if (_this.num !== _this.tabeData.length) {
        _this.num++;
        // console.log("------------------------");
      } else {
        _this.num = 0;
        // console.log(11111111111111111111);
      }
    }, 1000);
    // console.log(this.liNum);
    // console.log(1111111111111111);
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
    async jl() {
      const res = await this.$http.get(`/mobile-stats/new/changeRecord`);
      console.log(res);
      this.tabeData = res.data.data;
    },
  },
  mounted() {
    var _this = this;
    if (this.liNum) {
      this.lineNum = this.liNum;
    }
    // var w  = document.body.clientWidth
    // var h  = document.body.clientHeight
    // this.lineNum=this.w/5
  },
  watch: {
    //   h(v){
    //      window.addEventListener("onresize", function() {
    //      console.log(h+"--------------")
    //     // _this.myChart.resize();
    //   });
    //   }
  },
  computed: {
    transform: function () {
      return "translateY(-" + this.num * this.height + "px)";
    },
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
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
  /* line-height: 30%; */
  padding-left: 4%;
}
.rollScreen_once span {
  flex: 1;
  color: white;
}
.conHead {
  background-color: RGBA(41, 40, 65, 1);
  opacity: 0.5;
  font-weight: 600;
  padding: 2% 0;
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