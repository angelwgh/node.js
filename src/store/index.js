import admin from './modules/admin'
import permission from './modules/permission'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        admin,
        permission
    },
    getters: {
        sidebar1: state => {
          return state.admin.sidebar
        }
    }
})
  

export default store