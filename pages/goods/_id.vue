<template>
    <div class="goodsWrapper">
        <div class="goodsTop">
            <h1>{{goodsObj.title}}</h1>
            <h4>{{goodsObj.title}}</h4>
        </div>
        <div class="demo-image__preview">
            <el-image 
                style="width: 100px; height: 100px"
                v-for="item in goodsObj.imgurls"
                :key="item"
                :src="item"
                :preview-src-list="goodsObj.imgurls">
                
                <div slot="placeholder" class="image-slot">
                    加载中<span class="dot">...</span>
                </div>
            </el-image>
        </div>
    </div>
</template>

<script>
export default {
    name:'goods-details',
    validate({params,query}){   //校验参数是否为数字 否则不让访问
        return typeof params.id === 'string'||'number'
    },
    async asyncData({$axios,params,store}){
        console.log("_id asyncData")
        // let detailObj = await $axios({url:'/err/list.php',params:{ajax:'pullload',typeid:0,page:1,pagesize:20}})
        // let detailObj = await store.getters.getviewList
        // console.log('st',store.getters.getAllList)
        // Object.assign({}, state.playList);
        //深层拷贝到变量上，浅拷贝会把vuex的引用拷过去
        let goodsObjtemp = Object.assign({}, store.getters['screenGoods'](params.id)[0]);
        var p=/\{dede:img[^\}]*\}(.*?)\{\/dede:img\}/g;
        var arr=[];
        var m=null;
        while(m=p.exec(goodsObjtemp.imgurls.imgurls)){
                arr.push(RegExp.$1);  
        }    
        goodsObjtemp.imgurls = arr;
        return{
            goodsObj:goodsObjtemp 
        }
    },
    head(){
        return this.$seo(this.detaTitle,this.detaContent,[
            {hid:'keywords',name:'keywords',content:'woshiguanjianzi'}
        ])
    },
    transition:'goodsDetailsAni',
    beforeMount(){
        // setTimeout(()=>{
        // console.log('st',this.$store.getters.getAllList)
        // },50)
    }
}
</script>
<style lang="scss" scoped>
h3{
    background: $bear-color;
}
</style>