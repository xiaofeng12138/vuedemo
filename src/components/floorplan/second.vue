<template>
  <div class="second">
    <img src="../../../static/zwt/bg5.png" alt />
     <router-link :to="{name:'zwxq',query:{id:1.2}}">
      <div class="firstt">
        <img src="../../../static/zwt/1.2.png" alt />
      </div>
    </router-link>
    <router-link :to="{name:'zwxq',query:{id:2.2}}">
      <div class="secondd">
        <img src="../../../static/zwt/2.2.png" alt />
      </div>
    </router-link>
    <router-link :to="{name:'zwxq',query:{id:5.2}}">
      <div class="fiv">
        <img src="../../../static/zwt/5.2.png" alt />
      </div>
    </router-link>

    <router-link :to="{name:'zwxq',query:{id:6.2}}">
      <div class="fir">
        <img src="../../../static/zwt/6.2@3x.png" alt />
      </div>
    </router-link>
    <router-link :to="{name:'zwxq',query:{id:7.2}}">
      <div class="sec">
        <img src="../../../static/zwt/7.2@3x.png" alt />
      </div>
    </router-link>
    <router-link :to="{name:'zwxq',query:{id:8.2}}">
      <div class="thr">
        <img src="../../../static/zwt/8.2@3x.png" alt />
      </div>
    </router-link>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>
<style lang='scss'>
.second {
  position: relative;
  width: 90%;
  height: 7rem;
  margin: auto;
  //background-color: pink;
  //background: url("../../../static/zwt/bg.png") no-repeat center center/cover;
  background-size: 100%, 100%;
  img {
    width: 100%;
    height: 7rem;
  }
  .fir {
    position: absolute;
    top: 4.35rem;
    left: 1.95rem;
    width: 0.8rem;
    height: 1.8rem;
    transform: rotate(45deg);
    img {
      width: 0.8rem;
      height: 1.8rem;
    }
  }
  .sec {
    position: absolute;
    top: 4.35rem;
    left: 3.9rem;
    width: 0.8rem;
    height: 1.8rem;
    transform: rotate(135deg);
    img {
      width: 0.8rem;
      height: 1.8rem;
    }
  }
  .thr {
    position: absolute;
    top: 3.6rem;
    left: 4.7rem;
    width: 0.8rem;
    height: 1.8rem;
    transform: rotate(135deg);
    img {
      width: 0.8rem;
      height: 1.8rem;
    }
  }
  .fiv {
    position: absolute;
    top: 3.6rem;
    left: 1.2rem;
    width: 0.8rem;
    height: 1.8rem;
    transform: rotate(45deg);
    img {
      width: 0.8rem;
      height: 1.8rem;
    }
  }
}
</style>