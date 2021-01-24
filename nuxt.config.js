export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  mode: 'universal',
  server:{
    port:3000,
    host:'0.0.0.0'
  },
  head: {
    title: '小熊的网页库 - HTML静态网页成品下载 DW大学生网页作业制作毕业设计 Dreamweaver简单网页成品',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'HTML静态网页作业成品下载，DW大学生网页制作毕业设计，Dreamweaver简单网页成品，简单学生HTML静态DW Dreamweaver网页毕业设计制作作业成品下载代做，DIV CSS源码模板。' },
      { hid: 'keywords', name: 'keywords', content: '网页毕业设计,网页作业,网页作业成品,网页作业成品下载,静态网页作业,网页设计作业,学生网页作业,网页制作作业,学生网页制作,成品网页' }
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
