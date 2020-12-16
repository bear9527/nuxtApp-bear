export const state=()=>({
    err:1,
    data:{},
    allList: {} //不变动的全部数据
})


//getters
export const getters = {
    // 获取typeid 筛选出去
    screenType: state => (typeid) => {
        return state.allList.filter(item=>item.typeid == typeid)
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