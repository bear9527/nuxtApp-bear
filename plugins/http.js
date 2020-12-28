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
          // let eee= $axios({url:'/err/list.php',params:{ajax:'pullload',typeid:0,page:1,pagesize:100}}).then(function(res){
          //   console.log(res)
          //   // resolve(res)
          // });
          resolve(eee)
        }





      })
    }
  }

}
