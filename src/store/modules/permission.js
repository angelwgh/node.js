/**
*	路由权限状态管理
*/

import { asyncRouterMap, constantRouterMap } from '@/router'

export default {
	state: {
		routers: constantRouterMap,
    	addRouters: [],
    	status: false,
	},
	getters: {
			permission_routers: state => state.routers,
			addRouters: state => state.addRouters,
			permission_status: state => state.status
	},
	mutations: {
	    SET_ROUTERS: (state, routers) => {
	      state.addRouters = routers
	      state.routers = constantRouterMap.concat(routers)
	    },
	    SET_PER_STATUS: (state, status) => {
	    	state.status = status	    
	    }
	},
	actions: {
	    GenerateRoutes({ commit }, data) {
		    return new Promise(resolve => {
					asyncRouterMap.then(router => {
						commit('SET_ROUTERS', router)
								resolve()
					})
		        // commit('SET_ROUTERS', asyncRouterMap)
		        // resolve()
		    })
	    },
	    setPermissionStatus({ commit }, status) {
	    	commit('SET_PER_STATUS', status)
	    }
	 }
}