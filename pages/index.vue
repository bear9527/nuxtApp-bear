<template>
  <div class="container">
    <div class="listWrapper">
      <el-row :gutter="0" class="infinite-list goodsInfinite" v-infinite-scroll="loadMore">
        <el-col 
          v-for="item in viewList"
          :key="item.id + 'col'"
          :span="6"
          :xs="24" 
          :sm="8"
          :md="6"
          :lg="6"
          class="listItem infinite-list-item">
          <nuxt-link :to="{name:'goods-id',params:{id:item.id},query:{collectionName:'detail'}}">
            <img :src="item.litpic" :alt="item.title">
          </nuxt-link>
        </el-col>
        <el-col>
          <div class="listState" v-show="listState">{{listStateTxt}}</div>
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
        goodsList:[], //全部列表
        viewList:[],  //显示的列表
        listState:false,
        listStateTxt:'正在加载...'
      }
    },
    beforeCreate(){
      console.log('index beforeCreate',this.$store.getters.getAllList);
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

        //更新显示列表
        setTimeout(()=>{
          let vLength = this.$store.getters.getviewList.length;
          console.log('vLength',vLength);

          //少于20个直接全部显示
          if(vLength <= 20){
            this.viewList = this.$store.getters.getviewList;
            this.goodsList = [];
            this.listState = false;
          }else{
            this.viewList = this.$store.getters.getviewList.slice(0,20);
            this.goodsList = this.$store.getters.getviewList.slice(20,vLength - 1);
            this.listState = false;
          }
        },500)
      }
    },
  methods:{
      loadMore () {
        console.log('执行 loadMore');
        this.listState = true;
        setTimeout(()=>{
          this.count += 3;  //每次加三个
          let tempNum = 3;  
          for(let i = 0;i<3;i++){
            if(this.goodsList[this.count - 3] == undefined||this.goodsList[this.count - 2] == undefined||this.goodsList[this.count - 2] == undefined){
              this.listState = true;
              this.listStateTxt = '没有更多的啦啦啦';
              return;
            }
            this.viewList.push(this.goodsList[this.count - tempNum--]);
          }
          this.listState = false;
        },1000)
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
body{
  overflow: hidden;
  font-family: cursive;
}
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
.listState{
  // width: 100%;
  // height: 100px;
  //   line-height: 3;
  //   text-align: center;
  //   color: #fff;
  //   background-color: #ff142b;

    font-family: cursive;
    background-color: #000;

    position: relative;
    color: #FFF;
    font-weight: 100;
    font-size: 90px;
    padding: 0;
    margin: 0;
    line-height: 1;
    text-shadow: 0 0 10px #ff006c, 0 0 20px #ff006c, 0 0 30px #ff006c, 0 0 40px #ff417d, 0 0 70px #ff417d, 0 0 80px #ff417d, 0 0 100px #ff417d, 0 0 150px #ff417d;


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
