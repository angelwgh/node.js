<template>
	<div>
		<el-select></el-select>
	</div>
</template>
<script>
	export default {
		props: {
			list: {
				type: Object
			},

		},
		mounted () {
			console.log(this.list)
		}
	}
</script>