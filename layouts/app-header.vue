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
                <input type="text" placeholder="vue网页系统">
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
          class="popItem"
          @click="switchType()"
          >全部</el-menu-item>
          <el-menu-item 
          class="popItem"
          v-for="(item,index) of navData"
          :key="item.typeid"
          :index="'1-'+index"
          :typeid="item.typeid"
          @click="switchType(item.typeid)"
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
    width: 200px;
    margin: 16px 0;
    float: left;
  }
  .logoWrapper{
    a {
        display: block;
    }


  }
  /deep/ .el-menu-item-group{
    padding: 0;
    background-color: #fff;
  }
  /deep/ .popItem{
    height:40px;
    line-height: 40px;
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
          border-radius: 26px;
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
  import {mapActions, mapGetters, mapState, mapMutations} from 'vuex'
  export default {
    async fetch({$axios,store}){
        console.log('header async');

      return{
        goodsList:123,
      }
    },
    fetchOnServer: true,
    data() {
      return {
        isCollapse: true, //导航详情是否显示
        allData:{},
        navData:[],

      };
    },
    beforeCreate(){
      var _this = this;
      let res = this.$axios({url:'/err/list.php',params:{ajax:'pullload',typeid:0,page:1,pagesize:100}}).then(function(res){
  

        _this.$store.commit('M_UPDATE_ALLLIST',res.data.list);

                _this.allData = res.data.list;
                // console.log('screenType',navThis.$store.getters['home/screenType'](66));
                let tempData = [];  //创建空数组 用于字段比对
                let eliminate = [4,6,29,11,81,12,9,38];
                //遍历数组赋值
                _this.allData.map(item=>{
                    if(eliminate.includes(parseInt(item.typeid))){
                        // console.log("剔除了",item.typename)
                    }else{

                        if(!tempData.includes(item.typeid)){
                            tempData.push(item.typeid);
                            _this.navData.push({"typeid":item.typeid,"typename":item.typename})
                        }
                    }
                })

      });
    },
    mounted(){

    },
    methods: {
      tapNavBtn(){
          if(this.isCollapse){
              this.isCollapse = false;
          }else{
              this.isCollapse = true;
          }
      },
      //筛选分类
      switchType(typeid){
        //切换分类的时候跳转
        this.$router.push({name:'goods',query:{'typeid':typeid}});
        //替换展示列表里的数据
        this.$store.commit('M_UPDATE_VIEWLIST',this.$store.getters['screenType'](typeid));
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    },
    computed:{
      // ...mapGetters(['getNav','getAllList']),
    }
  }

</script>