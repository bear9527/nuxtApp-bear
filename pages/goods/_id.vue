<template>
    <div class="goodsWrapper">
        <div class="goodsTop">
            <el-page-header @back="goBack" :content="goodsObj.title"></el-page-header>
            
        </div>
        <div class="goodsContainer">
            <div class="containerBg">
                <img src="/images/detailsbg.jpg" alt="">
            </div>
            <div class="containerMain">
                <h1>{{goodsObj.title}}</h1>
                <h4 class="money">19</h4>
                <div class="infoWrapper">
                    <p>作品编号： {{goodsObj.mbbh.mbbh}} 作品页数： {{goodsObj.title}} 布局方式： {{goodsObj.title}} 应用技术： {{goodsObj.title}}</p> 
                </div>
            </div>
        </div>
        <div class="sellTab">
            <ul>
                <li class="current">作品介绍</li>
                <li>下载记录（0）</li>
            </ul>
        </div>
        <div class="goodsPreview clearfix">
            <div class="imgWrapper"
                    v-for="item in goodsObj.imgurls"
                    :key="item"
            >
                <el-image 
                    :src="item"
                    style="width: 100px; height: 100px"
                    :preview-src-list="goodsObj.imgurls">
                    <div slot="placeholder" class="image-slot">
                        加载中<span class="dot">...</span>
                    </div>
                </el-image>
                <span class="imgInfo">简介</span>
            </div>
        </div>
    </div>
</template>

<script>
import http from '~/plugins/http'
export default {
    name:'goods-details',
    validate({params,query}){   //校验参数是否为数字 否则不让访问
        return typeof params.id === 'string'||'number'
    },
    async asyncData({$axios,params,store}){
        let goodsObjtemp = {};
        await http({$axios,store}).get("/err/list.php",null,params.id).then((res)=>{
            goodsObjtemp = Object.assign({},res);
            console.log('goods http',goodsObjtemp)
        })
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
        return this.$seo(this.goodsObj.title,this.goodsObj.description,[
            {hid:'keywords',name:'keywords',content:this.goodsObj.keywords}
        ])
    },
    transition:'goodsDetailsAni',
    beforeMount(){
        // setTimeout(()=>{
        // console.log('st',this.$store.getters.getAllList)
        // },50)
    },
    methods:{
      goBack() {
        this.$router.go(-1);  
        
      }
    }
}
</script>
<style lang="scss" scoped>
.goodsWrapper{
    width: 100%;
    .el-page-header{
        border: 1px solid #ccc;
        background-color: #fff;
    }
    .goodsContainer{
        position: relative;
        height: 300px;
        overflow: hidden;
        .containerBg{
            width: 100%;
            position: absolute;
            top: 0;
            z-index: -1;
            filter: blur(6px); /* 模糊效果，与宽高搭配做适当调整，把白边推出边界隐藏掉 */
            img{
                width: 100%;
            }
        }
        .containerMain{
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            z-index: 1;
            color:#fff;
            background-color: rgba(8,8,16,0.7);
            text-align: center;
            h1{
                font-size: 28px;
                width: auto;
                margin: 64px auto 0;
                color: #fff;
                letter-spacing: 3.89px;
                text-indent: 3.89px;
            }
            .money {
                margin-top: 34px;
                margin-bottom: 31px;
                font-size: 28px;
                color: #e0c69b;
                letter-spacing: 3.89px;
                text-indent: 3.89px;
            }
            .infoWrapper{
                font-size: 12px;
                color: #9c9c9c;
                margin-bottom: 52px;
            }
        }
    }
    
        .sellTab{
            position: relative;
            z-index: 2;
            margin: 0 auto;
            width: 80%;
            height: 70px;
            -webkit-box-shadow: 0 4px 12px 0 rgba(99,117,138,0.23);
            box-shadow: 0 4px 12px 0 rgba(99,117,138,0.23);
            margin-top: -38px;
            background: #fff;
            padding-left: 50px;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            ul{
                li{
                    font-size: 14px;
                    color: #666;
                    line-height: 70px;
                    margin-right: 52px;
                    float: left;
                    cursor: pointer;
                    -webkit-transition: color 0.3s;
                    transition: color 0.3s;
                    &.current {
                        color: #bda460;
                    }
                }
            }
        }
    .goodsPreview{
        width: 80%;
        margin: 30px auto;
        background-color: #000;
        .imgWrapper{
            display: inline;
            float: left;
            margin: 5px;
            border-radius: 3px;
            position: relative;
            .el-image{
                background-color: #eee;
                text-align: center;
            }
            .imgInfo{
                width: 100%;
                position: absolute;
                bottom: 0;
                left: 0;
                display: block;
                text-align: center;
                height: 22px;
                color: #fff;
                line-height: 22px;
                background-color: rgba(0,0,0,0.53);
            }
        }
    }
}
</style>