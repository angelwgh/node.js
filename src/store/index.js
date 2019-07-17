import admin from './modules/admin'
import permission from './modules/permission'
import users from './modules/users'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        admin,
        permission,
        users
    },
    getters: {
        sidebar1: state => {
          return state.admin.sidebar
        }
    }
})
  

export default store