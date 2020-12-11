<template>
    <div class="goods">
        <h3>商品详情</h3>
        <h4>{{detaTitle}}</h4>
        <h4>{{detaContent}}</h4>
    </div>
</template>

<script>
export default {
    name:'goods-details',
    validate({params,query}){   //校验参数是否为数字 否则不让访问
        return typeof params.id === 'string'||'number'
    },
    async asyncData({$axios,params}){
        let detailObj = await $axios({
            url:'/api/list.json'
        })
        let detaTitle = '';
        let detaContent = '';
        detailObj.data.data.map((item)=>{
            if(params.id == item._id){
                detaTitle = item.title;
                detaContent = item.content;
            }
        })
        return{
            detaTitle,
            detaContent
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