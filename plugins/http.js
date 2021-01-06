export default function ({$axios,store}) {
  return {

    get: function (api,typeid) {

      return new Promise((resolve, reject) => {
        if (store.state.allList.length && api == '/err/list.php') {
          console.log('main get 有值')
          if(typeid){
            //如果有typeid证明是进的产品分类列表页
            resolve(store.getters['screenType'](typeid))
            store.commit('M_UPDATE_VIEWLIST',store.getters['screenType'](typeid));
          }
          resolve(store.state.allList)
          console.log('main---api', store.state.allList.length)
        } else {
          console.log('main get 无值 发送请求')
          resolve(this.set(api,typeid));
          // return this.set(api);
        }
      });
    },
    set:async function(api,typeid){
      let ajaxData= await $axios({url:api,params:{ajax:'pullload',typeid:0,page:1,pagesize:100}});
      if(typeid){
        console.log(typeid,store)
        store.commit('M_UPDATE_ALLLIST',ajaxData.data.list);
        //替换展示列表里的数据
        
        store.commit('M_UPDATE_VIEWLIST',store.getters['screenType'](typeid));
        return store.getters['screenType'](typeid);
      }else{
        return ajaxData.data.list;
      }
    }
  }

}
