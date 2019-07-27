import router from './router'
import store from './store'

// router.beforeEach( (to, from, next) => {
// 	store.dispatch('GenerateRoutes').then(() => { // 根据roles权限生成可访问的路由表
//     	// router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
//     	next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
//  	})
// })

router.beforeEach( (to, from, next) => {
	if(to.meta.allow === 'all'){
		next()
	}else if(!store.getters.permission_status){
		store.dispatch('GenerateRoutes').then(()=> {
			const addRouters = store.getters.addRouters
			router.addRoutes(addRouters); // 动态添加可访问路由表
			store.dispatch('setPermissionStatus', true)
			// console.log(to)
			// console.log(addRouters)
			// next({ ...to, replace: true})
			// to.meta.replace = true
			next({...to, replace: true})
		})
		// next(false)
	}else{
		next()
	}
	
})