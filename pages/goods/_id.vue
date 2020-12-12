<template>
    <div class="goods">
        <h3>商品详情</h3>
        <h4>{{detaObj.title}}</h4>
        <h4>{{detaContent}}</h4>
        <img :src="detaObj.picname" alt="">
    </div>
</template>

<script>
export default {
    name:'goods-details',
    validate({params,query}){   //校验参数是否为数字 否则不让访问
        return typeof params.id === 'string'||'number'
    },
    async asyncData({$axios,params}){
        let detailObj = await $axios({url:'/err/list.php',params:{ajax:'pullload',typeid:0,page:1,pagesize:20}})
        let detaTitle = '';
        let detaContent = '';
        let detaObj = {};
        detailObj.data.list.map((item)=>{
            if(params.id == item.id){
                detaTitle = item.title;
                detaContent = item.keywords;
                detaObj = item;
            }
        })
        return{
            detaTitle,
            detaContent,
            detaObj
        }
    },
    head(){
        return this.$seo(this.detaTitle,this.detaContent,[
            {hid:'keywords',name:'keywords',content:'woshiguanjianzi'}
        ])
    },
    transition:'goodsDetailsAni'
}
</script>
<style lang="scss" scoped>
h3{
    background: $bear-color;
}
</style>