<template>
  <div class="pageWrapper">
    <div class="pageLeft">
      <appHeader v-if="isTrue" :navShowFun.sync='navShow' />
    </div>
    <div class="pageMain" :class="{'pageMainAll': navShow}">
      <Nuxt />
    </div>
    <div class="pageBottom">
      COPYRIGHT © 2021 小熊的网页库 <a href="https://beian.miit.gov.cn" target="_blank">京ICP备18049828号-2</a>
      <a href="/sitemap">站点地图</a>友链：<a href="bear9527.com">网页库</a>
    </div>
  </div>
</template>

<script>
import appHeader from "../layouts/app-header"
export default {
  // middleware:'auth',
  middleware({redirect}){
    //context 服务端上下文
    // 全局守卫前置业务
    // store状态树信息
    // route 一条目标路由信息
    // redirect 强制跳转
    // // params,query 校验参数合理性
    // console.log('middleware layouts 全局守卫前置业务')
    // redirect('/login')
  },
  data(){
    return{
      isTrue :true,
      navShow:true, //双向数据绑定
    }
  },
  methods:{
        // changeValue(){
        //   console.log("changeValue")
        //     this.navShow = !this.navShow
        // }
  },
  watch:{
    $route:{
      immediate:true,
      handler(route){
        if(/reg|login/.test(route.path)){
          this.isTrue = false;
        }else{
          this.isTrue = true;

        }
      }
    }
  },
  components:{
    appHeader
  }
}
</script>
<style lang="scss">
html {
  font-family:
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
body{
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
}
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
.pageWrapper{
  .pageLeft{
    position: fixed;
    top: 68px;
    height: 100%;
    background-color: #fff;
  }
  .pageMain{
    margin-left: 64px;
    margin-top: 64px;
    position: relative;
    z-index: 1;
    width: calc(100% - 64px);
    // min-height: calc(100vh - 68px);
    height: calc(100vh - 98px);
    overflow-x: hidden;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    background: #f7f7f7;
  }
  .pageMainAll{
    margin-left: 0;
    width: calc(100%);
  }
}
.pageBottom{
  height: 30px;
  line-height: 30px;
  text-align: center;
  a{
    color:#000;
  }
}
</style>
