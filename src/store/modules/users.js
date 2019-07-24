// 会员管理
export default {
	state: {
		membersList: []
	},
	getters: {
		membersList: state=> state.membersList
	},
	mutations: {
		UPDATE_MEMBERLIST: (state, data) => {
			state.membersList = data
		}
	},
	actions: {
		getMembersList({commit}, data){
			console.log(data)
			return axios({
				url: '/api/user/getMembersList',
				params: data
			})
			.then(res => {
				if(res.data.status == 200){
					commit('UPDATE_MEMBERLIST', res.data.data)
				}
				return res
			})
		},
		updataMember({ commit }, data){

			return axios({
				url: 'api/user/updataMember',
				method: 'post',
				data: data
			})
			.then(res => res)
		},
		addMember({ commit }, data){

			return axios({
				url: 'api/user/addMember',
				method: 'post',
				data: data
			})
			.then(res => res)
		},
		delMember({ commit }, data){

			return axios({
				url: 'api/user/delMember',
				method: 'post',
				data: data
			})
			.then(res => res)
		},
		setMemberPermissions({commit}, data){
			return axios({
				url: 'api/user/setMemberPermissions',
				method: 'post',
				data: data
			})
		}
	}
}