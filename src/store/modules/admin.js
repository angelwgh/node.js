import Axios from "axios";

export default {
	state: {
		sidebar: {
			opened: true
		},
		userInfo: {},//用户信息
		logined: false,//登录状态
		loaded: false, //页面初次加载完成
		sitePermissions: []
	},
	getters: {
		sidebar: state=> {
			// console.log(state)
			return state.sidebar
		},
		userInfo: state => state.userInfo,
		logined: state => state.logined,
		loaded: state => state.loaded,
		sitePermissions: state => state.sitePermissions
	},
	mutations: {
		/**
		 * 切换侧边栏状态
		 */
		TOGGLE_SIDEBAR: state=> {
			state.sidebar.opened = !state.sidebar.opened
		},

		/**
		 * [description] 更新用户信息
		 */
		UPDATA_USERINFO: (state, data)=>{
			if(data.data.status !== 200) return;
			if(data.flag == 'logout'){
				state.userInfo = {};
				state.logined = false
			}

			if(data.flag == 'login'){
				state.userInfo = data.data.data;
				state.logined = true;
			}
		},

		UPDATA_LOADED: (state, loaded) => {
			state.loaded = loaded
		},

		UPDATA_SITE_PERMISSIONS: (state, data) => {
			state.sitePermissions = data
		}

	},


	actions: {
		toggleSideBar({ commit }) {
	      	commit('TOGGLE_SIDEBAR')
		},
		logout({commit}) {
			return new Promise(resolve => {
				Axios({
					url: '/api/user/logout'
				}).then(res => {
					console.log(res)
					commit({
						type: 'UPDATA_USERINFO',
						data: res.data,
						flag: 'logout'
					})
					resolve(res)
				})
			})
		},
		getUserInfo({ commit }) {
			return new Promise(resolve => {
				Axios({
					url: '/api/user/getUserInfo'
				}).then(function(res){
					// console.log(res)
					commit({
						type: 'UPDATA_USERINFO',
						data: res.data,
						flag: 'login'
					})
					// commit('UPDATA_USERINFO', res.data)
					resolve(res)
				})
			})
			
		},

		async getSitePermissions({ commit }) {
			/**
			 * 获取网站的权限列表
			 */
			return await Axios({
				url:'/api/permission/getall',
				method: 'get',
			}).then(res=>{
				if(res.data.status == 200){
					commit('UPDATA_SITE_PERMISSIONS', res.data.data)
				}
			})
		},

		async addSitePermission({ commit, dispatch}, data){
			/**
			 * 添加权限
			 */
			return await Axios({
				url:'/api/permission/add',
					method: 'post',
					data
			}).then(res => {
				if(res.data.status == 200){
					dispatch('getSitePermissions')
				}
				return res
			})
		},
		async delSitePermission({ commit, dispatch}, data){
			/**
			 * 删除权限
			 */
			return await Axios({
				url:'/api/permission/del',
					method: 'post',
					data
			}).then(res => {
				if(res.data.status == 200){
					dispatch('getSitePermissions')
				}
				return res
			})
		}
	}
}