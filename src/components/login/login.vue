<template>
  <div class="login" :style="{height:app_height}">
    <div class="header">
      <img src="../../../static/login/bg@2x.png" alt />
      <div class="header_top">
        <i class="iconfont icon-right" @click="goback"></i>
        <p>登录</p>
      </div>
      <div class="header_bg">
        <img src="../../../static/login/logo@2x.png" alt />
      </div>
    </div>
    <div class="content">
      <form action>
        <ul>
          <li>
            <i class="iconfont icon-yonghuming"></i>
            <input type="text" v-model="username" placeholder="请输入用户名" />
          </li>
          <li>
            <i class="iconfont icon-mima"></i>
            <input type="password" v-model="password" placeholder="请输入密码" />
          </li>
          <!-- <li>
            <i class="iconfont icon-yanzhengma"></i>
            <input type="text" v-model="repass" placeholder="请输入验证码" />
            <img :src="imgurl" alt @click="change" />
          </li> -->
        </ul>
      </form>
      <button @click="login" class="btn">登录</button>
    </div>
  </div>
</template>
<script>
import setCookie from "../../util/setcookie";
import getCookie from "../../util/getcookie";
import { publicInter } from "../../api/http";
import interfaceUrl from "../../api/interfaceUrl";
import { JSEncrypt } from 'jsencrypt'
import baseURL from '@/util/env.js'
import store from '@/store/store.js'



export default {
  data() {
    return {
      app_height: `${window.screen.availHeight}px`,
      username: "",
      password: "",
      repass: "",
      imgurl: "",
      sign: "",
      retail:'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAh/PSTjHMsAhzbUMDGl1f0BugdXtOJneQi02ecca4qxsv5qZPIdO/MWM01S1XZ0o/4BF6hlxp8b7opmILkGroJ2lguMr5CiY6cRE6gsCD+Aw3EpLFDtvwEuvLG4ZJcuuvN5GVd4efc9sYJGS1gUWKsJWCnUf/a3c6f1wTR2APB+5kr9rIfRjPbrwf6DQGjiRQZ4gB+gj0uiUWy3XnDKhIqVe0tFUaOtzYgStMm2ItV2Mqh3JdFrVg0Fd6hirHaGv/q8BIOo1NDVSWHkHAZk6/YFU3ASU+CXglOjTUmFFw+ALklzuaM4C5hXH3qmBzUlmdI5RIYxuyBacxI4F9DbegSQIDAQAB',
    };
  },

  methods: {
    goback() {
      this.$router.push("/");
    },
    change() {
      publicInter(interfaceUrl.kaptcha + new Date()).then(res => {
        this.imgurl = res.imageCode;
        this.sign = res.sign;
      });
    },
    login() {
      function urlSearchParmas(dataObj) {
        let qs = "",
          split = "&",
          keys = Object.keys(dataObj);
        for (let i = 0; i < keys.length; i++) {
          if (i === keys.length - 1) {
            split = "";
          }
          qs += keys[i] + "=" + dataObj[keys[i]] + split;
        }
        return qs;
      }
      
      //密码加密
      var encrypt = new JSEncrypt();
      encrypt.setPublicKey(this.retail);
      var d =encrypt.encrypt(this.password);
      var ps= encodeURI(d).replace(/\+/g, '%2B');
      let data = urlSearchParmas({
        username: this.username,
        password: ps,
        client_id: "m1",
        client_secret: "s1",
        grant_type: "password",
        scope: "read",
        // f1: true,
        sign: this.sign,
        kaptcha: this.repass, //验证码
        expoStartTime:'2020-01-01',
        expoEndTime:'2020-12-31',
        app_type:'appPhone'
      });

      if (
        this.username.trim().length === 0 ||
        this.password.trim().length === 0 
      ) {
        this.$message.error("用户名或密码不能为空");
      } else {
        this
          .$Axios({
            method: "post",
            url: baseURL + "/seaadmin/auth",
            data: data,
            headers: {
              "Content-type": "application/x-www-form-urlencoded",
              Accept: "*/*"
            }
          })
          .then(res => {
            console.log(res)
            if (res.data.code == "400") {
              this.$message.error(res.data.msg);
              // this.$router.go(0)
              return false;
            } else {
              localStorage.setItem('setToken',res.data.token)
              store.commit("Login/SET_TOKEN", res.data.token); //存储用户token到vuex
              store.commit("Login/SET_USERNAME", this.username); //存储用户名到Vuex
              this.$message.success("登录成功");
              setTimeout(() => {
                this.$router.push('/')
              }, 1500);
            }
          });
      }
    }
  },
    mounted() {
    this.change()
    // publicInter(interfaceUrl.kaptcha + new Date()).then(res => {
    //   this.imgurl = res.imageCode;
    //   this.sign = res.sign;
    // });
  },
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
          font-size: 0.4rem;
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
      height: 4.5rem;
      margin: auto;
      background-color: #fff;
      border-radius: 10px;
      z-index: 999;
      ul {
        li {
          position: relative;
          width: 6rem;
          height: 1rem;
          margin: auto;
          margin: 0.4rem 0.4rem;
          border: none;
          border-bottom: 2px solid #ccc;
          i {
            position: absolute;
            top: 0.2rem;
            left: 0.3rem;
            font-size: 0.4rem;
          }
          input {
            position: absolute;
            top: 0;
            left: 1rem;
            width: 5rem;
            height: 1rem;
            text-indent: 0.3rem;
            outline: none;
            border: none;
            font-size: 0.3rem;
            border-bottom: 2px solid #ccc;
          }
          img {
            position: absolute;
            top: 0.1rem;
            right: 0.2rem;
            display: block;
            width: 1.6rem;
            height: 0.8rem;
          }
        }
      }
      .btn {
        position: absolute;
        width: 6rem;
        height: 1rem;
        margin: 0 auto;
        border: none;
        font-size: 0.3rem;
        color: #fff;
        margin-left: 0.4rem;
        background: linear-gradient(to right, #4697fd, #2467f3);
      }
    }
  }
}
</style>