<template>
  <div class="login" :style="{height:app_height}">
    <div class="header">
      <img src="../../../static/login/bg@2x.png" alt />
      <div class="header_top">
        <i class="iconfont icon-right" @click="goback"></i>
        <p>{{$store.state.loginUser}}</p>
      </div>
      <div class="header_bg">
        <img src="../../../static/login/logo@2x.png" alt />
      </div>
    </div>
    <div class="content">
      <div class="icon">
        <i class="iconfont icon-yonghu1"></i>
      </div>
      <div class="logindetail">
        <ul>
          <li>
            <span class="left">工号:</span>
            <span class="right">{{userName}}</span>
          </li>
          <li>
            <span class="left">职位:</span>
            <span class="right">检员</span>
          </li>
        </ul>
      </div>
      <div class="logout">
        <el-button type="success" @click="logout">退出登录</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import store from '@/store/store'
export default {
  data() {
    return {
       app_height: `${window.screen.availHeight}px`,
       userName:store.getters['Login/userName']
    };
  },
  created() {
  },
  methods: {
    goback() {
      this.$router.push("/");
    },
    logout() {

         this.$confirm('是否确认退出当前账号', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.$message({
            type: 'success',
            message: '退出成功'
          });
            store.commit("Login/SET_TOKEN", ''); //存储用户token到vuex
            store.commit("Login/SET_USERNAME", ''); //存储用户名到Vuex
            this.$router.push("/login");
        }).catch(() => {});
    
    }
  }
};
</script>
<style lang='scss'>
body {
  .login {
    position: relative;
    background-color: #f2f3f5;
    .header {
      width: 100%;
      height: 5rem;
      img {
        position: absolute;
        top: 0;
        left: 0;
        display: block;
        width: 100%;
        height: 5rem;
      }
      border-radius: 0 0 30px 30px;
      .header_top {
        position: relative;
        width: 100%;
        height: 1.3rem;
        color: #fff;
        p {
          font-size: 0.35rem;
          text-align: center;
          line-height: 1.3rem;
          font-weight: normal;
        }
        i {
          position: absolute;
          top: 0.4rem;
          left: 0.4rem;
          font-size: 0.7rem;
        }
      }
      .header_bg {
        width: 5rem;
        height: 1.5rem;
        margin-left: 0.3rem;
        margin-top: 0.3rem;
        img {
          position: absolute;
          top: 1.5rem;
          left: 0.5rem;
          display: block;
          width: 5rem;
          height: 1.5rem;
        }
      }
    }
    .content {
      position: absolute;
      top: 3.5rem;
      left: 5%;
      width: 90%;
      height: 6rem;
      margin: auto;
      background-color: #fff;
      border-radius: 10px;
      z-index: 999;
      .icon {
        width: 100%;
        height: 1rem;
        text-align: center;
        margin-top: 0.5rem;
        i {
          font-size: 1rem;
        }
      }
      .logindetail {
        width: 90%;
        height: 1.5rem;
        margin: 0.6rem auto;
        ul {
          li {
            display: flex;
            width: 90%;
            height: 0.8rem;
            margin-bottom: 0.1rem;
            margin: 0.2rem auto;
            border: 1px solid #ccc;
            .left {
              width: 30%;
              height: 0.768rem;
              background-color: #8d919a;
              color: #fff;
              font-size: 0.3rem;
              text-align: center;
              line-height: 0.8rem;
              border: none;
              outline: none;
            }
            .right {
              width: 70%;
              height: 0.8rem;
              font-size: 0.25rem;
              text-indent: 0.3rem;
              line-height: 0.8rem;
              border: none;
            }
          }
        }
      }
      .logout {
        width: 100%;
        margin: auto;
        text-align: center;
      }
    }
  }
}
</style>