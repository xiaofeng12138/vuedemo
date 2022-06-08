<template>
  <div class="floorplandetail">
    <div class="header">
      <p>展位详情</p>
      <div class="header_search">
        <i class="iconfont icon-zuojiantou" @click="goback"></i>
      </div>
    </div>
    <div class="detail_nav">
      <router-link :to="{name:'zwxx'}">展位信息</router-link>
      <router-link :to="{name:'xgjl'}">巡馆记录</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    goback() {
      this.$router.go("-1");
    }
  }
};
</script>
<style lang='scss'>
.floorplandetail {
  margin-bottom: 1.1rem;
  .header {
    position: relative;
    position: sticky;
    top: 0;
    left: 0;
    width: 100%;
    height: 1.3rem;
    background-color: #f6f6f8;
    z-index: 999;
    p {
      position: relative;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 1.2rem;
      font-size: 0.35rem;
      text-align: center;
      line-height: 1.2rem;
      font-weight: bold;
    }
    .header_search {
      position: relative;
      width: 100%;
      padding-top: 0.6rem;
      .icon-zuojiantou {
        position: absolute;
        top: 0.3rem;
        left: 0.2rem;
        font-size: 0.7rem;
        color: #8d919a;
      }
    }
  }
  .detail_nav {
    display: flex;
    height: 0.8rem;
    width: 100%;
    line-height: 0.8rem;
    border: 1px solid #ccc;
    a {
      width: 50%;
      height: 100%;
      font-size: 0.35rem;
      text-align: center;
      color: #666666;
      font-weight: bold;
    }
    .router-link-exact-active {
      background: linear-gradient(to right, #4697fd, #2467f3);
      color: #fff;
    }
  }
}
</style>