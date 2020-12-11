import Vue from 'vue'
let sayHello = ()=>console.log('hello vue 全局');
Vue.prototype.$sayHellow = sayHello;

//混入methods
Vue.mixin({
    // beforeCreate(){
    // },
    methods:{
        $seo(title,content,payload = []){
            return {
                title,
                meta:[{
                    hid:'description',
                    name:'description',
                    content
                }].concat(payload)
            }
        },
    },

})

