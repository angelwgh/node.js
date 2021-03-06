
import admin from '@/views/admin'
import login from '@/views/login/login'
import util from '@/utils'

Vue.use(VueRouter)


// console.log(_)


/**
 * hidden: true							if `hidden:true` will not show in the sidebar(default is false)
 */

export const constantRouterMap = [
	{
		path: '',
		component:admin,
		redirect:'home',
		hidden: true,
		children: [{
			path: 'home',
			name: 'home',
			meta:{
				// allow: 'all',
				title: '首页'
			},
			component: () => import('@/views/home/home'),
		}]
	},
	{
		path: '/login',
		component:login,
		hidden: true,
		meta:{
			allow: 'all',
		},
	},
	{
	    path: '/404',
	    component: () => import('@/views/error/404'),
		hidden: true,
		meta:{
			allow: 'all',
		}
	  },
]


/**
 * 获取权限数据
 */
// function renderLeftMenu() {

// 		let cateDataDom = document.getElementById('cateValue');
// 		let cateList = JSON.parse(cateDataDom.value);

//   	return buildTree(cateList);
// }

// 获取当前用户权限信息

async function getUserPermission() {
	return await axios({
		url: 'api/user/getUserPermissions',
	})
	.then(res=>{
		if(res.data.status == 200){
			let list = res.data.data.filter(item => {
				return item.type === '0'
			})
			list = buildTree(list)
			console.log(list)
			return list
		}
	})
}


// getUserPermission().then(res => {

// 	console.log(util.buildTree(res.data.data))
// })
async function renderLeftMenu () {
		return new Promise((resolve)=> {
			let cateDataDom = document.getElementById('cateValue');
			let cateList = JSON.parse(cateDataDom.value);
			// console.log(cateList)
			setTimeout(()=>{
				resolve(buildTree(cateList))
			}, 1000)
			
		})
}




/**
 * 将一维的扁平数组转换为多层级对象
 * @param  {[type]} list 一维数组，数组中每一个元素需包含id和parentId两个属性 
 * @return {[type]} tree 多层级树状结构
 */
function buildTree(list) {
	const currentArr = [];
	const temp = {};
	const tree = {}
	// console.log(list)
	for(let i in list){
		temp[list[i]._id] = list[i]
	}

	for(let i in temp){

		// console.log(temp[i].parentId)
		if(temp[i].parentId && temp[i].parentId != '0'){
			if(!temp[temp[i].parentId].children){
				temp[temp[i].parentId].children = new Array();
			}

			let currentTemp = renderTemp(temp[i]);

			temp[temp[i].parentId].children.push(currentTemp)
		}else {
			tree[temp[i]._id] = renderTemp(temp[i], true);
		}


	}
	for (var item in tree) {
	    currentArr.push(tree[item]);
	}

	return currentArr;
}

// 处理路由参数
function renderTemp(temp, parent = false) {
	// console.log(temp)
	if(parent){
		temp.path = '';
		temp.component = admin;
	}else{
		temp.path = temp.routePath;
		temp.component = ()=> import('../views/' + temp.componentPath)
	}
	temp.hidden = !temp.enable;
	// temp.name = temp.label;
	temp.meta = {
	    title: temp.label,
	    name: temp.name
	}
	  if (temp.icon) {
	    temp.meta.icon = temp.icon;
	}
	return temp;
}

const baseRoute = [

  { path: '*', redirect: '/404', hidden: true }
]

let exRoute = getUserPermission()

// console.log(exRoute)

export default new VueRouter({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})


// export const asyncRouterMap = exRoute.concat(baseRoute)
export const asyncRouterMap = exRoute.then(router => {
	return router.concat(baseRoute)
});