<template>
	<div>
		<el-breadcrumb separator="/">
			<el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
		        <router-link :to="item.redirect||item.path">{{ item.meta.name}}</router-link>
		    </el-breadcrumb-item>
		</el-breadcrumb>
		<!-- <span v-for="item in levelList">{{item.meta.name}}</span> -->
	</div>
</template>
<script>
	export default{
		name: 'Breadcrumb',
		data () {
			return {
		      levelList: []
		    }
		},
		methods: {
			getBreadcrumb() {
				let matched = this.$route.matched.filter(item => item.name)
				const first = matched[0]
			    if (first && first.name.trim().toLocaleLowerCase() !== 'home'.toLocaleLowerCase()) {
			        matched = [{ path: '/home', meta: { title: 'home', name:'首页' }}].concat(matched)
			    }
				console.log(matched)

				this.levelList = matched
			}
		},

		created() {
		    this.getBreadcrumb()
		},
	}
</script>
