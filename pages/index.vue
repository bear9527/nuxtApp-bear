<template>
  <div class="container">
    <div>
      <el-carousel indicator-position="outside">
        <el-carousel-item v-for="item in banner" :key="item._id">
          
          <nuxt-link :to="{name:'goods-id',params:{id:item._id},query:{collectionName:'banner'}}">
            <!-- {{item.title}} -->
            <img :src="item.litpic" :alt="item.title">
          </nuxt-link>
        </el-carousel-item>
      </el-carousel>

      <el-row :gutter="20">
        <el-col 
          v-for="item in title"
          :key="item.id + 'col'"
          :span="6"
          class="listItem"
        >
          <nuxt-link :to="{name:'goods-id',params:{id:item.id},query:{collectionName:'banner'}}">
            <img :src="item.litpic" :alt="item.title">
          </nuxt-link>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapState, mapMutations} from 'vuex'
export default {
  async asyncData({$axios}){
    // let res = await $axios({url:'/data/list.json'})
    // console.log('list.json:',res.data)
    // let banner = await $axios({url:'/api/list.json',params:{_limit:1}})
    // console.log(banner.data)
    let res = await $axios({url:'/err/list.php',params:{ajax:'pullload',typeid:0,page:1,pagesize:20}})
    let banner = await $axios({url:'/err/list.php',params:{ajax:'pullload',typeid:4,page:1,pagesize:999}})
    // console.log('res',res)
    console.log('res',res.data)
    return{
      title:res.data.list,
      banner:banner.data.list
    }
  },
  async fetch({$axios,store,error}){
    let res2 = await $axios({url:'/api/list.json',params:{_limit:1}})
    res2.data && store.commit('home/M_UPDATE_HOME',{err:0,data:res2.data})
    // store.commit('home/M_UPDATE_USER',{err:0,msg:'登录成功',token:'',data:{title:'user模块的actions提交过来的数据'}});
  },
  mounted(){
    console.log('this',this)
  }
  ,
  methods:{
    getStore(){
      //编程式访问vuex
      console.log(this)
      //发出actions请求给user模块
      // this.$store.dispatch('user/A_UPDATE_USER',{err:0,msg:'登录成功',token:'',data:{title:'user模块的actions提交过来的数据'}});
      // this.$store.commit('user/M_UPDATE_USER',{err:0,msg:'登录成功',token:'',data:{title:'user模块的actions提交过来的数据'}});
      // this.A_UPDATE_USER({err:0,msg:'登录成功',token:'001',data:{title:'001'}});
      this.M_UPDATE_USER({err:0,msg:'登录成功',token:'002',data:{title:'002'}});
    },
    ...mapActions('user',['A_UPDATE_USER']),
    ...mapMutations('user',['M_UPDATE_USER'])
  },
  computed:{
    XX(){},
    ...mapGetters(['getNav']),
    ...mapState(['bNav']),
    ...mapState('user',['data']),
    ...mapState({home:state=>state.home.data})
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}

.el-carousel__container{
  a{
    display: block;
  }
  img{
    width:100%;
  }
}





.el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .listItem{
    height: 240px;
    max-height: 240px;
    overflow: hidden;
    background-color: white;
    box-sizing: border-box;
    padding: 10px;
    border: 2px solid #656565;
    img{
      width:100%;
      display: block;
    }
  }
</style>
