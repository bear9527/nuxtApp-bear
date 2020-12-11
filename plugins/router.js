export default ({app,redirect})=>{
    app.router.beforeEach((to,from,next)=>{
        //全局前置的守卫，插件
        // console.log("全局前置的守卫，插件",to);
        // if(to.name=='login' || to.name=='reg'){
        //     next()
        // }else{
        //     redirect({name:'login'})
        // }
        next()
    })
    
    app.router.afterEach((to,from,next)=>{
        //全局前置的守卫，插件
        // console.log("全局后置的守卫，插件",to);
        // if(to.name=='login' || to.name=='reg'){
        //     // next()
        // }else{
        //     redirect({name:'login'})
        // }
    })
}