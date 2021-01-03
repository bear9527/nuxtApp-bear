export default function ({$axios,store}) {
    // 
        console.log($axios)
  return {

    get: function (api) {

      return new Promise((resolve, reject) => {
        // store.getters.getAllList
        if (store.state.allList.length && api == '/err/list.php') {
          console.log('main get 有值')
          resolve(store.state.allList)
          console.log('main---api', store.state.allList.length)
        } else {
          console.log('main get 无值 发送请求')
          resolve(this.set(api));
          // return this.set(api);
        }





      })
      // .then((res)=>{
      //   return this.set(res);
      // })
    },
    set:async function(api){
      let eee= await $axios({url:api,params:{ajax:'pullload',typeid:0,page:1,pagesize:100}});
      // return new Promise((resolve, reject) => {
      //   resolve(eee.data.list)
      // });
      return eee.data.list
    }
  }

}
