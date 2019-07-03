import router from './router'
import store from './store'

// router.beforeEach( (to, from, next) => {
// 	store.dispatch('GenerateRoutes').then(() => { // 根据roles权限生成可访问的路由表
//     	// router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
//     	next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
//  	})
// })

router.beforeEach( (to, from, next) => {
	console.log(store.getters.permission_status)
	if(!store.getters.permission_status){
		store.dispatch('GenerateRoutes').then(()=> {
			router.addRoutes(store.getters.addRouters);
			store.dispatch('setPermissionStatus', true)
			next({ ...to, replace: true })
		})
	}else{
		next()
	}
	
})