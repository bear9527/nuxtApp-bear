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
            v-for="item in viewList"
            :key="item.id + 'col'"
            :span="6"
            :xs="12"
            :sm="8"
            :md="6"
            :lg="6"
            class="listItem infinite-list-item"
          >
            <div class="listItemWrapper">
              <nuxt-link
                class="linkA"
                :to="{name:'goods-id',params:{id:item.id},query:{collectionName:'detail'}}"
              >
                <el-image
                  :src="item.litpic"
                  :alt="item.title"
                  lazy
                ></el-image>
              </nuxt-link>
              <p>
              <p><span>{{item.mbbh.mbbh}}</span>{{item.title}}</p>
            </div>
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
import http from "../../plugins/http";
export default {
  async asyncData({ $axios, store, route }) {
    let typeid = route.query.typeid;
    let resObj = {};
    await http({ $axios, store })
      .get("/err/list.php", typeid)
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
      viewList: resObj.slice(0, 10), //显示的列表
    };
    // })
  },

  head() {
    return {
      title: "商品页seo ",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "商品页seo description",
        },
      ],
    };
  },
  data() {
    return {
      count: 10,
      // viewList:[],  //显示的列表
      listState: false,
      listStateTxt: "正在加载...",
    };
  },
  methods: {
    loadMore() {
      console.log("loadmore");
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
      }, 200);
    },
  },
  watch: {
    $route(to, from) {
      let typeid = to.query.typeid;

      this.count = 0;
      this.listState = false;
      this.listStateTxt = "正在加载...";
      this.goodsList = this.$store.getters["screenType"](typeid);
      this.viewList = this.goodsList;
    },
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

.el-carousel__container {
  a {
    display: block;
  }
  img {
    width: 100%;
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

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.listItemWrapper {
  background-color: white;
  border: 2px solid #ffffff;
  box-shadow: 0px 0px 6px 0px #e2d6d7;
}
.linkA {
  display: block;
}
/deep/ .el-image {
  width: 284px;
  height: 284px;
  display: block;
  margin: 0 auto;
}
.listItem {
  // height: 240px;
  // max-height: 240px;
  overflow: hidden;
  // background-color: white;
  box-sizing: border-box;
  padding: 10px;
  img {
    width: 100%;
    display: block;
  }
}
</style>
