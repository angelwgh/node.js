<template>
	<div>
		<el-breadcrumb separator="/">
			<el-breadcrumb-item v-for="(item) in levelList" :key="item.path">
		        <router-link :to="item.redirect||item.path">{{ item.meta.title}}</router-link>
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
				// console.log(this.$route)
				let matched = this.$route.matched.filter(item => item.name)
				const first = matched[0]
			    if (first && first.name.trim().toLocaleLowerCase() !== 'home'.toLocaleLowerCase()) {
			        matched = [{ path: '/home', meta: { title: 'home', name:'首页' }}].concat(matched)
			    }
				this.levelList = matched
			}
		},
		watch: {
		    $route() {
		      this.getBreadcrumb()
		    }
		},
		created() {
		    this.getBreadcrumb()
		},
	}
</script>
