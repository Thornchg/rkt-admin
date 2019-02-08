// import Vue from 'vue'
// import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        User: {
            name: 'Thornchg'
        },
        msgCount: {
            messages: 2
        },
        siderCollapsed: false,
    },
    mutations: {
        updateAccount(state, data) {
            state.User = data;
        },
        updateSiderCollapse(state, isShow) {
            // G.trigger('page_resize');
            state.siderCollapsed = isShow;
        },
        updateMsgCount(state, data) {
            state.msgCount = data;
        }
    },
    actions: {},
    getters: {
        account: state => {
            return state.User
        },
        siderCollapsed: state => {
            return state.siderCollapsed
        },
        msgCount: state => {
            return state.msgCount
        }
    }
})
