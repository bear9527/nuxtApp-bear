<template>
    <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b">
    <div class="logo"><h1>9527</h1></div>
    <el-menu-item 
        v-for="(item,index) of navs"
        :key="index"
        :index="index+''">{{item.title}}
    </el-menu-item>
    </el-menu>
</template>
<script>
export default {
    data(){
        return{
            activeIndex:"-1",
            navs:[
                {path:'/index',title:"首页"},
                {path:'/goods',title:"商品"},
                {path:'/login',title:"登录"},
                {path:'/reg',title:"注册"},
                {path:'/user',title:"用户中心"},
            ]
        }
    },
    methods:{
        handleSelect(key,keyPath){
            this.$router.push(this.navs[key].path)
        }
    },
    watch:{
        $route:{
            immediate:true,
            handler(route){
                if(route.path=='/') return this.$router.push('/index');
                let find = false;
                this.navs.map((item,index)=>{
                    if(item.path==route.path){
                        this.$router.push(route.path);
                        this.activeIndex= index+'';
                        find = true;
                    }
                });
                if(!find){
                        this.activeIndex= '-1';
                }
            }
        }
    }
}
</script>
<style scoped>
.logo{
    color:#fff;
    float: left;    
    font-weight: bold;
    height: 60px;
    display: flex;
    align-items: center;
    text-align: center;
    padding: 10px;

}
</style>