export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  mode: 'universal',
  server:{
    port:3000,
    host:'0.0.0.0'
  },
  head: {
    title: 'nuxtApp --seo 公共标题',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '这是seo的description' },
      { hid: 'keywords', name: 'keywords', content: '这是seo的keywords' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  router:{
    middleware:'auth',
    //扩展路由
    extendRoutes(routers, resolve){
      // console.log(routers);
      routers.push({
        name:'root',
        path:'/index',
        component: resolve(__dirname,'pages/index.vue')
      })
    }
  },
  // 全局 CSS (https://go.nuxtjs.dev/config-css)
  css: [
    'assets/css/transition.css',
    'assets/css/reset.css',
    'element-ui/lib/theme-chalk/index.css'
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '~/plugins/router.js',
    '~/plugins/mixins.js',
    '~/plugins/http.js',
    // {
    //   src:'~/plugins/http',
    //   ssr: true
    // },
    {
      src:'~/plugins/axios',
      ssr: true
    },
    {
      src:'~/plugins/element-ui', 
      ssr: true //不支持服务端渲染的插件不要设为true
    }
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    '@nuxtjs/axios',
    'cookie-universal-nuxt',
    '@nuxtjs/style-resources'
  ],
  //
  styleResources:{
    scss:[
      './assets/scss/global.scss'
    ]
  },
  axios:{
    proxy:true, //开启axiox跨域
    // prefix: '/api', //baseURL
    credentials: true
  },
  proxy:{
    '/api/':{
      target:'http://127.0.0.1:8080',
      changeOrigin:true,
      pathRewrite:{
        // '^/api':''
      }
    },
    '/err/':{
      target:'https://bear9527.com',
      changeOrigin:true,
      pathRewrite:{
        // '^/api':''
      }
    },
    '/uploads/':{
      target:'https://bear9527.com',
      changeOrigin:true,
      pathRewrite:{
        // '^/api':''
      }
    }
  },
  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    transpile:[/^element-ui/]
  },

  //开启vuedetools
  vue:{
    config: {
      productionTip: false,
      devtools: true
    }
  },
  //加载条
  // loading: {color:'#60f',height:'3px'}
  loading: '~/components/loading.vue',
}
