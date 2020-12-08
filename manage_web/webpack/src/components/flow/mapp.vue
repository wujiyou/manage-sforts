<template>
 
    <el-card class="box-card">
      <my-bread level1="液化气瓶流转管理" level2="气瓶地图显示"></my-bread>
      <div id="allmap" ref="allmap"></div>
      <!-- <baidu-map class="bm-view" center="长沙" :scroll-wheel-zoom="true">
         放大缩小
            <bm-navigation style="margin-top:50px" anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
            <搜索城市
             <bm-city-list anchor="BMAP_ANCHOR_TOP_LEFT"></bm-city-list>
              全景
              <bm-panorama></bm-panorama>
      </baidu-map>-->
    </el-card>

</template>
<script>
import $ from "jquery";
export default {
  name:"mapp",
  data() {
    return {};
  },
  methods: {
   
  },
 
};
</script>
<style scoped>
#allmap {
  margin-top: 30px;
  height: 500px;
  overflow: hidden;
}
</style>