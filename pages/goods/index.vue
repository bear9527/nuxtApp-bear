<template>
    <div class="goods">
        <h3>商品页</h3>
        <nuxt-link to="/goods/1?a=">商品01</nuxt-link>
        <nuxt-link :to="{name:'goods-id',params:{id:2},query:{a:111,b:222}}">商品02</nuxt-link>
        <nuxt-link :to="{name:'goods-id',params:{id:3},query:{a:111,b:222}}">商品03</nuxt-link>
        <nuxt-link to="/goods/comment">评价</nuxt-link>
        <nuxt></nuxt>
    </div>
</template>
<script>
export default {
    head(){
        return{
            title:'商品页seo ',
            meta: [
                {hid:'description',name:'description',content:'商品页seo description'}
            ]
        }
    },
}
</script>