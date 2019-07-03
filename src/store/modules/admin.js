export default {
	state: {
		sidebar: {
			opened: true
		}
	},
	getters: {
		sidebar: state=> {
			// console.log(state)
			return state.sidebar
		}
	},
	mutations: {
		TOGGLE_SIDEBAR: state=> {
			state.sidebar.opened = !state.sidebar.opened
		}
	},


	actions: {
		toggleSideBar({ commit }) {
	      	commit('TOGGLE_SIDEBAR')
	    },
	}
}