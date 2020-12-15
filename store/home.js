export const state=()=>({
    err:1,
    data:{},
    allList: {}
})















//getters
export const getters = {
    // 家乡旅游
    screenjxly: state => {
        return state.allList.filter(item=>item.typeid == 35)
    }, 
    // 人物明星
    screenjxly: state => {
        return state.allList.filter(item=>item.typeid == 35)
    },
    // 个人博客
    screenjxly: state => {
        return state.allList.filter(item=>item.typeid == 35)
    },
    // 影视音乐
    screenjxly: state => {
        return state.allList.filter(item=>item.typeid == 35)
    },
    // 公司企业
    screenjxly: state => {
        return state.allList.filter(item=>item.typeid == 35)
    },
    // 游戏动漫
    screenjxly: state => {
        return state.allList.filter(item=>item.typeid == 35)
    },
    // 科技未来
    screenjxly: state => {
        return state.allList.filter(item=>item.typeid == 35)
    },
    // 餐饮美食
    screenjxly: state => {
        return state.allList.filter(item=>item.typeid == 35)
    },
    // 电子商务
    screenjxly: state => {
        return state.allList.filter(item=>item.typeid == 35)
    },
    // 运动体育
    screenjxly: state => {
        return state.allList.filter(item=>item.typeid == 35)
    },
    // 校园班级
    screenjxly: state => {
        return state.allList.filter(item=>item.typeid == 35)
    },
    // 节日环保
    screenjxly: state => {
        return state.allList.filter(item=>item.typeid == 35)
    },
    // 宠物花草
    screenjxly: state => {
        return state.allList.filter(item=>item.typeid == 35)
    },
    // 电商购物
    screenjxly: state => {
        return state.allList.filter(item=>item.typeid == 35)
    },
    // 文学文化
    screenjxly: state => {
        return state.allList.filter(item=>item.typeid == 35)
    },
}





export const mutations = {
    M_UPDATE_HOME(state,payload){
        state.err = payload.err;
        state.data = payload.data;
    },
    M_UPDATE_ALLLIST(state, payload){
        state.allList = payload;
    }
}

export const actions = {
    A_UPDATE_HOME({commit,state},payload){
        //异步处理
        commit('M_UPDATE_HOME',{err:0,data:{title:"home 模块 actions所传的数据"}})
    }
}