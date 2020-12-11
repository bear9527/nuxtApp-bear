<template>
    <div v-if="loading" class="box">
        <div class="loader-12"></div>
    </div>
</template>
<script>
export default {
    data:()=>({
        loading:false
    }),
    methods:{
        start(){
            this.loading = true;
        },
        finish(){
            this.loading = false;
        },
    }
}
</script>
<style scoped>

.box {
    position: fixed;
    top: 0;
    z-index: -1;
    display: inline-block;
    width: 100vw;
    height: 100vh;
    font-size: 30px;
    color: rgba(200, 200, 200, 0.5);
    vertical-align: top;
    -webkit-transition: .3s color, .3s border;
    transition: .3s color, .3s border;
    font-size: 70px;
    line-height: 200px;
    color: #607d8b;
}
[class*="loader-"] {
    display: inline-block;
    width: 1em;
    height: 1em;
    color: inherit;
    vertical-align: middle;
    pointer-events: none;
}


.loader-12 {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
}
.loader-12:before,
.loader-12:after {
    content: '';
    display: block;
    position: absolute;
    background-color: currentcolor;
    left: 50%;
    right: 0;
    top: 0;
    bottom: 50%;
    box-shadow: -.5em 0 0 currentcolor;
    -webkit-animation: loader-12 1s linear infinite;
    animation: loader-12 1s linear infinite;
}
.loader-12:after {
    top: 50%;
    bottom: 0;
    -webkit-animation-delay: .25s;
    animation-delay: .25s;
}
@-webkit-keyframes loader-12 {
    0%, 100% {
        box-shadow: -.5em 0 0 transparent;
        background-color: currentcolor;
    }
    50% {
        box-shadow: -.5em 0 0 currentcolor;
        background-color: transparent;
    }
}
@keyframes loader-12 {
    0%, 100% {
        box-shadow: -.5em 0 0 transparent;
        background-color: currentcolor;
    }
    50% {
        box-shadow: -.5em 0 0 currentcolor;
        background-color: transparent;
    }
}



</style>