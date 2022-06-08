<template>
  <div class="tabbar">
    <ul>
      <li>
        <router-link :to="{name:'index'}">
          <i class="iconfont icon-yemian-copy-copy"></i>
          <span>主页</span>
        </router-link>>
      </li>
      <li>
        <router-link :to="{name:'floorplan'}">
          <i class="iconfont icon-dingwei"></i>
          <span>展位图</span>
        </router-link>>
      </li>
      <li>
        <router-link :to="{name:'search'}">
          <i class="iconfont icon-sousuo"></i>
          <span>助手</span>
        </router-link>
      </li>
      <li>
        <router-link :to="{name:'qrcode'}">
          <i class="iconfont icon-saoma1"></i>
          <span>扫码</span>
        </router-link>
      </li>
      <li>
        <router-link :to="{name:'response'}">
          <i class="iconfont icon-lingdang"></i>
          <span>响应</span>
        </router-link>
      </li>
      <li>
        <router-link :to="{name:'my'}">
          <i class="iconfont icon-yonghuming"></i>
          <span>我的</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>
<style  lang="scss">
.tabbar {
  position: sticky;
  position: fixed;
  bottom: 0;
  left: 0;
  height: 1.1rem;
  width: 100%;
  font-size: 0.3rem;
  background-color: #f3f3f5;
  z-index: 999;
  ul {
    display: flex;
    justify-content: center;
    height: 100%;
    margin-top: 0.1rem;
    li {
      width: 20%;
      a {
        text-align: center;
        color: #a6abb8;
        i {
          width: 0.45rem;
          height: 0.45rem;
          font-size: 0.45rem;
        }
        span {
          display: block;
          font-size: 0.2rem;
          margin-top: 0.1rem;
          margin-left: -0.05rem;
        }
      }
    }
  }
}
</style>