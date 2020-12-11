<template>
    <div class="comment">
        <h3>评论</h3>
        <nuxt-link :to="{name:'goods-comment-uid',params:{uid:1},query:{a:111,b:111}}">评论01</nuxt-link>
        <nuxt-link :to="{name:'goods-comment-uid',params:{uid:2},query:{a:222,b:222}}">评论02</nuxt-link>
        <nuxt-link to="/goods/comment/3?a=333&b=333">评论03</nuxt-link>
        <nuxt></nuxt>
    </div>
</template>