<template>
    <div class="main-content-view">
    	<router-view></router-view>
    </div>
</template>

<script>
export default {
    name: 'mainContent.vue'
}
</script>

<style scoped>
.main-content-view{
	position: absolute;
	width: 100%;
	left: 0;
	top: 90px;
	bottom: 0;
	overflow: auto;
	background-color: #f2f2f2;
}
</style>
