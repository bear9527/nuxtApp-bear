<template>
  <div class="container">
    <div>
      <el-row :gutter="0" class="infinite-list goodsInfinite" v-infinite-scroll="load">
        <el-col 
          v-for="item in viewList"
          :key="item.id + 'col'"
          :span="6"
          :xs="24" 
          :sm="8"
          :md="6"
          class="listItem infinite-list-item">
          <nuxt-link :to="{name:'goods-id',params:{id:item.id},query:{collectionName:'detail'}}">
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
  async asyncData({$axios,store}){
    let res = await $axios({url:'/err/list.php',params:{ajax:'pullload',typeid:0,page:1,pagesize:100}});
    return{
      goodsList:res.data.list,
    }
  },
  async fetch({$axios,store,error}){
    let res2 = await $axios({url:'/api/list.json',params:{_limit:1}})
    res2.data && store.commit('home/M_UPDATE_HOME',{err:0,data:res2.data})
    // store.commit('home/M_UPDATE_USER',{err:0,msg:'登录成功',token:'',data:{title:'user模块的actions提交过来的数据'}});

    
    // console.log('store.getters.allList',store.getters.getAllList);
  },
    data () {
      return {
        count: 0,
        viewList:[],
        goodsList:[]
      }
    },
    beforeCreate(){
      console.log('index beforeCreate',this.$store.getters.getAllList);
        // this.goodsList = this.$store.getters.getAllList
      },
      created(){
               setTimeout(()=>{
                // console.log(this.$store.state.allList)
                console.log(this.$store.getters.getAllList)
                  this.goodsList = this.$store.getters.getAllList
                },500)
        console.log(this.$store.state.getAllList)
      // this.goodsList = this.$store.getters.getAllList
    },
    mounted(){
      console.log('index mounted',this.$store.getters.getAllList);
      // this.goodsList = this.$store.getters.getAllList
    },
    watch:{
      '$store.state.allList'(){
        // this.goodsList = this.$store.getters.getAllList
      },
      '$store.state.viewList'(){
        console.log('viewList 改变了');
        // this.viewList.shift(this.$store.getters.getViewList);
        console.log(this)
             setTimeout(()=>{
            this.viewList = this.$store.getters.getviewList;
          // this.viewList = this.$store.getters['screenType'](35);
            // console.log(this.$store.getters.getViewList)
          console.log(35,this.$store.getters['screenType'](35));
          console.log(35,this.$store.getters.getviewList);
          },1500)
      }
    },
  methods:{
      load () {
        console.log('执行 load')
        this.count += 3;  //每次加三个
        let tempNum = 3;  
        for(let i = 0;i<3;i++){
          this.viewList.push(this.goodsList[this.count - tempNum--]);
        }
      },  
    getStore(){
      //编程式访问vuex
      console.log('getSotre',this)
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
    ...mapGetters(['getAllList']),
    ...mapState(['bNav','allList']),
    ...mapState('user',['data']),
    ...mapState({home:state=>state.home.data})
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: auto;
  margin: 0 auto;
  min-height: 100vh;
  // height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  // overflow-y:auto;
}
.container >div{
  width: 100%;
  height: 100%;
}
.goodsInfinite{
  width: 100%;
  height: 1px;
  min-height: 100vh;
overflow-y:auto;

  // position: relative;
  //   width: 100%;
  //   display: inline-flex;
  //   flex-direction: column;
  //   align-items: center;
  //   background: #f7f7f7;
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
