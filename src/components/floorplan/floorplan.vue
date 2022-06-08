<template>
  <div class="floorplan">
    <div class="header">
      <p>展位图</p>
    </div>
    <div class="layout" :style="{height:app_height}">
      <div class="lay_top">
        <i class="iconfont icon-weizhi_">&nbsp;北</i>
        <router-link :to="{name:'first'}">一楼</router-link>
        <router-link :to="{name:'second'}">二楼</router-link>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import getCookie from "../../util/getcookie";
export default {
  data() {
    return {
      app_height: `${window.screen.availHeight - 100}px`
    };
  },
  methods: {
    chooseone() {
      this.$router.push("/floorplan/first");
    },
    choosetwo() {
      this.$router.push("/floorplan/second");
    }
  }
};
</script>
<style lang='scss'>
.floorplan {
  .header {
    width: 100%;
    height: 1.3rem;
    background-color: #ffffff;
    p {
      font-size: 0.35rem;
      text-align: center;
      line-height: 1.3rem;
      font-weight: bold;
    }
  }
  .layout {
    width: 100%;
    background: linear-gradient(to right, #030e3c, #050f3a);
    .lay_top {
      position: relative;
      display: flex;
      justify-content: center;
      width: 100%;
      height: 2rem;
      a {
        display: block;
        float: left;
        width: 2rem;
        height: 0.9rem;
        border-radius: 0.1rem;
        font-size: 0.3rem;
        border: 1px solid #fff;
        color: #fff;
        text-align: center;
        line-height: 0.9rem;
        margin-top: 0.45rem;
        margin-left: 0.3rem;
      }
      .router-link-exact-active {
        background: linear-gradient(to right, #4697fd, #2467f3);
        border: none;
      }
      i {
        position: absolute;
        top: -0.1rem;
        left: 1rem;
        line-height: 2rem;
        margin-left: -0.5rem;
        color: #fff;
        font-size: 0.3rem;
      }
    }
  }
}
</style>

