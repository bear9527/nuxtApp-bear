<template>
    <div class="user">
        <h3>个人中心</h3>
        
        <el-button type="primary" @click="logout()">注销</el-button>
    </div>
</template>
<script>
export default {
    middleware({redirect}){
        // console.log('middleware 组件独享的守卫')
        // redirect('./login')
    },
    data(){
        return{
        }
    },
    methods:{
        logout(){
            
            //同步vuex && cookie
            this.$cookies.remove("user")
            this.$store.commit('user/M_UPDATE_USER',{
                err:1,
                msg:'未登录',
                token:'',
                data:{}
            });
            this.$router.push('/login')
        }
    }
}
</script>