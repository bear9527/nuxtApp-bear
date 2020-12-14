<template>
  <div class="menuWrapper">
    <div class="topNav">
      <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;" class="">
        <el-radio-button :label="false">展开</el-radio-button>
        <el-radio-button :label="true">收起</el-radio-button>
      </el-radio-group> -->
       <div class="logoWrapper">
            <div class="navBtn" @click="tapNavBtn();">
                <span></span>
                <span></span>
                <span></span>
            </div>
            <nuxt-link to="/">
                <img src="/images/logo.png" alt="">
            </nuxt-link>
        </div>
        <div class="searchWrapper">
            <div class="search">
                <input type="text" value="vue网页系统">
                <a class="searchBth" href="javascript:;">搜索</a>
            </div>
        </div>
    </div>
    <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
      :collapse="isCollapse">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location zdyIcon">
            <p class="zdyTitle">静态</p>
          </i>
          <span slot="title">导航一</span>
        </template>
        <el-menu-item-group>
          <span slot="title">静态网页</span>
          <el-menu-item 
          v-for="(item,index) of navData"
          :key="item.typeid"
          :index="'1-'+index"
          :typeid="item.typeid"
          >{{item.typename}}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="2">
        <i class="el-icon-menu zdyIcon">
            <p class="zdyTitle">动态</p>
        </i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-document zdyIcon">
            <p class="zdyTitle">定制</p>
        </i>
        <span slot="title">导航三</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-document zdyIcon">
            <p class="zdyTitle">帮助</p>
        </i>
        <span slot="title">导航四</span>
      </el-menu-item>
    </el-menu>
  </div>


</template>
<style lang="scss" scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .zdyIcon{
      vertical-align: top;
      padding-top: 6px;
  }
  .zdyTitle{
    line-height: 1.8;
    font-size: 14px;
    // margin-top: -10px;
  }
  .topNav{
    width: 100vw;
    position: fixed;
    background-color: #fff;
    top: 0;
  }
  .logoWrapper{
    width: 300px;
    margin: 16px 0;
    float: left;
  }
  .logoWrapper{
    a {
        display: block;
    }

  }
  .navBtn {
    width: 66px;
    margin: 6px 0px;
    float: left;
    box-sizing: border-box;
    span{
        width: 22px;
        height: 2px;
        background-color: black;
        display: block;
        margin: 4px auto;
    }
  }

  .searchWrapper{
    width: 360px;
    margin: 18px auto;
      .search{
          display: flex;
          width: 360px;
            border-radius: 10px;
            overflow: hidden;
              border:1px solid #ff142b;
          input{
              flex: 1;
              height: 30px;
              border: none;
              padding: 0 6px;
              color: #8c8282;
          }
          .searchBth{
              width:60px;
              display: block;
              height: 30px;
              line-height: 30px;
              border-left: none;
              color: #fff;
              text-align: center;
                background-image: -webkit-gradient(linear, right top, left top, from(#ff3183), to(#ff102b));
                background-image: linear-gradient(to left, #ff3183, #ff102b);
          }
      }
  }
</style>

<script>
  export default {
    data() {
      return {
        isCollapse: true, //导航详情是否显示
        allData:{},
        navData:[],

      };
    },
    mounted(){
        var navThis = this;
        let res = this.$axios({
                url:'/err/list.php',
                params:{ajax:'pullload',
                typeid:0,
                page:1,
                pagesize:100
            }}).then(function(res){
                //赋值给data
                navThis.allData = res.data.list;
                let tempData = [];  //创建空数组 用于字段比对
                let eliminate = [4,6,29,11,81,12,9,38];
                //遍历数组赋值
                navThis.allData.map(item=>{
                    if(eliminate.includes(parseInt(item.typeid))){
                        console.log("剔除了",item.typename)
                    }else{

                        if(!tempData.includes(item.typeid)){
                            tempData.push(item.typeid);
                            navThis.navData.push({"typeid":item.typeid,"typename":item.typename})
                        }
                    }
                })
                console.log('匹配',navThis.navData);
            })
    },
    methods: {
      tapNavBtn(){
          if(this.isCollapse){
              this.isCollapse = false;
          }else{
              this.isCollapse = true;
          }
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }

</script>