<template>
  <div class="second">
    <img src="../../../static/zwt/bg5.png" alt />
    <router-link :to="{name:'zwxq',query:{id:1.1}}">
      <div class="firstt">
        <img src="../../../static/zwt/1.1.png" alt />
      </div>
    </router-link>
    <router-link :to="{name:'zwxq',query:{id:2.1}}">
      <div class="secondd">
        <img src="../../../static/zwt/2.1.png" alt />
      </div>
    </router-link>
    <router-link :to="{name:'zwxq',query:{id:3}}">
      <div class="three">
        <img src="../../../static/zwt/3.png" alt />
      </div>
    </router-link>
    <router-link :to="{name:'zwxq',query:{id:4.1}}">
      <div class="four">
        <img src="../../../static/zwt/4.1@3x.png" alt />
      </div>
    </router-link>
    <router-link :to="{name:'zwxq',query:{id:5.1}}">
      <div class="five">
        <img src="../../../static/zwt/5.1@3x.png" alt />
      </div>
    </router-link>
    <router-link :to="{name:'zwxq',query:{id:6.1}}">
      <div class="six">
        <img src="../../../static/zwt/6.1@3x.png" alt />
      </div>
    </router-link>
    <router-link :to="{name:'zwxq',query:{id:7.1}}">
      <div class="seven">
        <img src="../../../static/zwt/7.1@3x.png" alt />
      </div>
    </router-link>
    <router-link :to="{name:'zwxq',query:{id:8.1}}">
      <div class="eight">
        <img src="../../../static/zwt/8.1@3x.png" alt />
      </div>
    </router-link>
    <router-link :to="{name:'north',query:{id:'MH'}}">
      <div class="nine">
        <img src="../../../static/zwt/northhall.png" alt />
      </div>
    </router-link>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {},
  methods: {
    fn() {}
  }
};
</script>
<style lang='scss'>
.second {
  position: relative;
  width: 90%;
  margin: auto;
  background-size: 100%, 100%;
  img {
    width: 100%;
    height: 7rem;
  }
  .firstt {
    position: absolute;
    top: 1.7rem;
    left: 4.7rem;
    width: 0.8rem;
    height: 1.8rem;
    transform: rotate(45deg);
    img {
      width: 0.8rem;
      height: 1.8rem;
    }
  }
  .secondd {
    position: absolute;
    top: 0.95rem;
    left: 3.9rem;
    width: 0.8rem;
    height: 1.8rem;
    transform: rotate(45deg);
    img {
      width: 0.8rem;
      height: 1.8rem;
    }
  }
  .three {
    position: absolute;
    top: 1rem;
    left: 1.95rem;
    width: 0.8rem;
    height: 1.8rem;
    transform: rotate(-45deg);
    img {
      width: 0.8rem;
      height: 1.8rem;
    }
  }
  .four {
    position: absolute;
    top: 1.75rem;
    left: 1.2rem;
    width: 0.8rem;
    height: 1.8rem;
    transform: rotate(-45deg);
    img {
      width: 0.8rem;
      height: 1.8rem;
    }
  }
  .five {
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
  .six {
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
  .seven {
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
  .eight {
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
  .nine {
    position: absolute;
    top: 1.2rem;
    left: 3.13rem;
    width: 0.5rem;
    height: 0.5rem;
    img {
      width: 0.5rem;
      height: 0.5rem;
    }
  }
}
</style>