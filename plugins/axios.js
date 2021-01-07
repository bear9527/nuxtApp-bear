export default function({$axios,redirect,route,store}){
    const whiteUrl = [ '/login' ];  // 请求白名单，不需要携带 Token 的请求
    //基本配置
    $axios.defaults.timeout = 10000;
    //请求拦截
    $axios.onRequest(config=>{
        console.log('请求拦截');
        const url = config.url.replace(config.baseURL, '')
        // 判断请求的url是否在白名单中，存在就直接 return config ，不携带 Token
          if (whiteUrl.some(wl => url === wl)) {
            return config
        }
        // console.log(config);
        // console.log("local allList",localStorage);
        config.headers.token = store.state.user.token;
        return config;
    })

    //响应拦截
    $axios.onResponse(res=>{
        // console.log("route.fullPath",route.fullPath)
        // console.log("res222",res.data)
        // if(res.data.err == 2 && route.fullPath !== '/login'){
        //     redirect('/login?path='+ route.fullPath);
        // }

        return res;
    })

    //错误处理
    $axios.onError(error=>{
        //处理

        return error;
    })


}