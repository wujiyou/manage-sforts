<template>
 
  <!-- <div> -->
    <video style="width:100%;height:95%;" id="my-player" class="video-js vjs-default-skin vjs-big-play-centered vjs-big-play-button"></video>
  <!-- </div> -->
  
</template>

<script>
/*  下载的包
     "video.js": "^5.6.0",
     "videojs-flash": "^2.2.0"
     "videojs-swf": "^5.4.2",
  */
// import videojs from "video.js";
// import "video.js/dist/video-js.css";
// import "vue-video-player/src/custom-theme.css";
// // Vue.prototype.$videojs = videojs; 
// import "videojs-flash";
// import SWF_URL from "videojs-swf/dist/video-js.swf";
// videojs.options.flash.swf = SWF_URL; // 设置flash路径，Video.js会在不支持html5的浏览中使用flash播放视频文件

export default {
  name: "videojsTest",
  mounted() {
    const player = this.$video("my-player", {
      controls: true,
      preload: "auto",
      
      playbackRates: [0.5, 1, 1.5, 2],
      controlBar: {
        playToggle: {
          replay: false
        },
        volumePanel: {
          inline: false
        }
      },
      language: "zh-CN"
    });
    player.src({
      src: "rtmp://localhost:1935/oflaDemo/hk",
      type: "rtmp"
      // Sample720.mp4 为本地文件，与该 index.html 文件目录相同
      // 改变 player 的 src 值可以切换视频源
    });
  }
  // mounted(){
  //       this.player1 = videojs('my-player', this.VideoOptions, function onPlayerReady() {
  //         videojs.log('播放器已经准备好了!')
  //         // this.on('play', function() {
  //         //     console.log('开始/恢复播放')
  //         // })
  //         // this.on('pause', function() {
  //         //     console.log('暂停播放')
  //         // })
  //         // this.on('ended', function() {
  //         //     console.log('结束播放')
  //         // })
  //     })
  //     setTimeout(() => {
  //         this.player1.player()
  //     }, 1000)
  // },
  // data () {
  //     return {
  //         VideoOptions: {
  //            autoplay: "muted", // //自动播放属性,muted:静音播放
  //             muted: false, // 是否静音
  //             width:1600,
  //             height:400,
  //             controls:false,
  //             fluid: false, // 宽高自适应
  //              playbackRates: [0.5, 1, 1.5, 2],
  //               controlBar: {
  //                 playToggle: {
  //                   replay: false
  //                 },
  //                 volumePanel: {
  //                   inline: false
  //                 }
  //               },

  //             techOrder: ["flash"],
  //             sources: [{
  //                 src: 'rtmp://localhost:1935/oflaDemo/hk',
  //                 type: 'rtmp'
  //             }]
  //         },
  //     }
  // }
};
</script>
<style scoped>
</style>