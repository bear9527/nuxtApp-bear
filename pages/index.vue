<template>
  <div class="container">
    <div class="listWrapper">
      <el-scrollbar style="height:100%;">
        <el-row
          :gutter="0"
          class="infinite-list goodsInfinite"
          v-infinite-scroll="loadMore"
          infinite-scroll-disabled="listState"
        >
          <el-col
            :span="6"
            :xs="12"
            :sm="8"
            :md="6"
            :lg="6"
            v-for="item in viewList"
            :key="item.id"
            class="listItem infinite-list-item"
          >
            <el-card :body-style="{ padding: '0px' }">
              <nuxt-link :to="{name:'goods-id',params:{id:item.id}}">
                <div class="imgWrapper">
                  <img
                    :src="item.litpic"
                    class="image"
                    :alt="item.title"
                    lazy
                  >
                </div>
                <div class="infoWrapper">
                  <span>好吃的汉堡</span>
                  <div class="bottom clearfix">
                    <time class="time">{{item.title}}</time>
                    <el-button
                      type="text"
                      class="button"
                    >操作按钮</el-button>
                  </div>
                </div>
              </nuxt-link>
            </el-card>
          </el-col>

          <el-col>
            <div
              class="listState"
              v-show="listState"
            >{{listStateTxt}}</div>
          </el-col>
        </el-row>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import http from "../plugins/http";
import { mapActions, mapGetters, mapState, mapMutations } from "vuex";
export default {
  async asyncData({ $axios, store }) {
    let resObj = {};
    await http({ $axios, store })
      .get("/err/list.php")
      .then(
        function (res) {
          resObj = res;
        },
        function (res) {
          console.log("reject", res);
        }
      );
    return {
      goodsList: resObj,
      viewList: resObj.slice(0, 20), //显示的列表
    };
  },
  // async asyncData({$axios,store}){
  //   let res = await $axios({url:'/err/list.php',params:{ajax:'pullload',typeid:0,page:1,pagesize:100}});
  //   return{
  //     goodsList:res.data.list,
  //     viewList:res.data.list.slice(0,20),  //显示的列表
  //   }
  // },
  async fetch({ $axios, store, error }) {
    // let res2 = await $axios({url:'/api/list.json',params:{_limit:1}})
    // res2.data && store.commit('home/M_UPDATE_HOME',{err:0,data:res2.data})
    // store.commit('home/M_UPDATE_USER',{err:0,msg:'登录成功',token:'',data:{title:'user模块的actions提交过来的数据'}});
    // console.log('store.getters.allList',store.getters.getAllList);
  },
  data() {
    return {
      count: 20,
      // goodsList:[], //全部列表
      viewList: [], //显示的列表
      listState: false,
      listStateTxt: "正在加载...",
    };
  },
  watch: {},
  methods: {
    loadMore() {
      this.listState = true;
      setTimeout(() => {
        let tempNum = 3;
        for (let i = 0; i < 3; i++) {
          if (this.viewList.length >= this.goodsList.length) {
            this.listState = true;
            this.listStateTxt = "没有更多的啦啦啦";
            return;
          }
          this.viewList.push(this.goodsList[this.count++]);
        }
        this.listState = false;
      }, 500);
    },
    getStore() {
      //编程式访问vuex
      console.log("getSotre", this);
      //发出actions请求给user模块
      // this.$store.dispatch('user/A_UPDATE_USER',{err:0,msg:'登录成功',token:'',data:{title:'user模块的actions提交过来的数据'}});
      // this.$store.commit('user/M_UPDATE_USER',{err:0,msg:'登录成功',token:'',data:{title:'user模块的actions提交过来的数据'}});
      // this.A_UPDATE_USER({err:0,msg:'登录成功',token:'001',data:{title:'001'}});
      this.M_UPDATE_USER({
        err: 0,
        msg: "登录成功",
        token: "002",
        data: { title: "002" },
      });
    },
    ...mapActions("user", ["A_UPDATE_USER"]),
    ...mapMutations("user", ["M_UPDATE_USER"]),
  },
  computed: {
    XX() {},
    ...mapGetters(["getNav"]),
    ...mapGetters(["getAllList"]),
    ...mapState(["bNav", "allList"]),
    ...mapState("user", ["data"]),
    ...mapState({ home: (state) => state.home.data }),
  },
};
</script>

<style lang="scss" scoped>
body {
  overflow: hidden;
  font-family: cursive;
}
.container {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  // overflow-y:auto;
}
.listWrapper {
  width: 100%;
  height: 100%;
  .imgWrapper {
    height: 272px;
    overflow: hidden;
    display: flex;
    align-items: center;
    background-color: #000;
    img {
    }
  }
  .infoWrapper {
    padding: 10px;
    color: #303133;
  }
}
.listState {
  font-family: cursive;
  background-color: #000;

  position: relative;
  color: #fff;
  font-weight: 100;
  font-size: 90px;
  padding: 0;
  margin: 0;
  line-height: 1;
  text-shadow: 0 0 10px #ff006c, 0 0 20px #ff006c, 0 0 30px #ff006c,
    0 0 40px #ff417d, 0 0 70px #ff417d, 0 0 80px #ff417d, 0 0 100px #ff417d,
    0 0 150px #ff417d;
}

.goodsInfinite {
  width: 100%;
  height: 100%;
  overflow-y: hidden;
}

.listItem {
  // height: 350px;
  max-height: 350px;
  // min-height: 300px;
  overflow: hidden;
  background-color: white;
  box-sizing: border-box;
  // padding: 10px;
  border: 2px solid #656565;
  img {
    width: 100%;
    display: block;
  }
}
</style>
