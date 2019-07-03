<template>
	<div>home</div>
</template>
<script>
	export default{
		mounted () {

			this.$store.dispatch('GenerateRoutes')
				.then(()=> {
					console.log(this.$store.getters.permission_routers)
				})
		}
	}
</script>