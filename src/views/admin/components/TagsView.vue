<template>
    <div class="tags-view-container">tags</div>
</template>

<script>
export default {
    name: 'TagsView',
    mounted () {
    	console.log(this.$route)
    }
}
</script>

<style scoped>
.tags-view-container{
	height: 35px;
	line-height: 35px;
	background-color: #f1f1f1;
}
</style>
