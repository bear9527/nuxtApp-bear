
//主模块


//state
export const state =() => ({
    bNav: false,
    bLoading: false,
    allList: {},
    viewList:[],
});

//mutations
export const mutations = {
    M_UPDATE_NAV(state, payload) {
        state.bNav = payload;
    },
    M_UPDATE_ALLLIST(state, payload){
        state.allList = payload;
        // console.log("M_UPDATE_ALLLIST",state.allList)
    },
    M_UPDATE_VIEWLIST(state, payload) {
        state.viewList = payload;
    }
}

//actions
export const actions = {
    nuxtServerInit(store,{app:{$cookies}}){
        //初始化token东西到store当中
        let user = $cookies.get("user") ? $cookies.get("user") : {err:2,msg:"未登录",token:""};
        store.commit("user/M_UPDATE_USER",user);
    }
}

//getters
export const getters = {
    getNav(state){
        return state.bNav ? '显示':'隐藏'
    },
    getAllList:(state)=>{
        return state.allList
    },
    getViewList:(state)=>{
        return state.viewList
    },
    // 获取typeid 筛选分类
    screenType: state => (typeid) => {
        if(typeid){
            return state.allList.filter(item=>item.typeid == typeid);
        }else{
            return state.allList;
        }
    },
    // 获取id 筛选产品
    screenGoods: state => (id) => {
        if(id){
            return state.allList.filter(item=>item.id == id);
        }else{
            return '没有这个吧';
        }
    },
}