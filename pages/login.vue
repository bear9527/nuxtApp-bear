<template>
    <div class="login">
        <h3>登录页</h3>
        <el-divider></el-divider>
        <el-input placeholder="用户名" v-model="username" class="mb">
            <template slot="prepend">用户名</template>
        </el-input>
        <el-input placeholder="密码" v-model="password" class="mb">
            <template slot="prepend">密 码</template>
        </el-input>
        <div class="error">{{msg}}</div>
        <el-button type="primary" @click="login()">登录</el-button>
        <el-button type="default" @click="$router.push('/reg')">注册</el-button>
    </div>
</template>
<script>
export default {
    data:()=>({
        username:'',
        password:'', //'bear9527'
        msg:''
    }),
    methods:{
        login(){
            this.$axios({
                url:'/api/login',
                method:'post',
                data:{
                    username: this.username,
                    password: this.password
                }
            }).then(
                res=>{
                    if(res.data.err == 0){
                        //同步vuex && cookie
                        this.$cookies.set("user",res.data)
                        this.$store.commit('user/M_UPDATE_USER',res.data)
                        //信息同步后 如果是空、登录或者注册页面就跳到用户页 否则哪来回哪去
                        if(!this.$route.query.path || /login|reg/.test(this.$route.query.path)){
                            this.$router.replace('/user')
                        }else{
                            this.$router.replace(this.$route.query.path)
                        }
                    }else{
                        //显示错误提示
                        this.msg = res.data.msg
                    }
                }
            )
        }
    }
}
</script>
<style scoped>
.login{
    width:50%;
    margin:18% auto;
}
.mb{
    margin: 20px 0;
}
.error{
    color: red;
}
</style>