<template>
  <div id="app">
    <router-view />
    <lg-preview></lg-preview>
    <fdnav />
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style lang='scss'>
html {
  font-family: "Helvetica Neue", Tahoma, Arial, PingFangSC-Regular,
    "Hiragino Sans GB", "Microsoft Yahei", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;
  color: #333;
  -webkit-user-select: none;
  user-select: none;
  font-size: 13.3333vw;
}
* {
  margin: 0;
  padding: 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.el-message-box{
    width:300px;
  }
a {
  text-decoration: none;
  display: block;
}
img {
  vertical-align: top;
}
li {
  list-style: none;
}
.router-link-exact-active {
  i {
    color: #3883f9;
    font-weight: bold;
  }
  span {
    color: #3883f9;
    font-weight: bold;
  }
}
</style>
