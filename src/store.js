import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        contadorMails: 0
    },
    actions: {
        contadorUp({commit},cant) {
            commit('incrementar', cant)
        }        
    },
    mutations: {
        incrementar(state, cant) {
            state.contadorMails += cant
        }        
    }
})