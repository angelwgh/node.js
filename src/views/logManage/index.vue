<template>
	<div>日志管理</div>
</template>
<script>
	export default{
		mounted() {
			axios({
				url: '/api/log/getlist'
			})
			.then(res=> {
				console.log(res)
			})
		}
	}
</script>