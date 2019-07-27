<template>
	<div class="icons-wrap">
		<ul ref="ul" class="icons-list">
			<li v-for="icon in icons">
				<i :class="[icon]"></i>
				<span>{{icon}}</span>
			</li>
		</ul>
	</div>
</template>
<script>

	export default {
		data() {
			return {
				width: 120
			}
		},
		computed: {
			icons () {
				return this.$store.getters.icons
			}
		},
		methods: {
			setWidth(){

			}
		},
		mounted() {
			
			this.$store.dispatch('getIcons')

		}
	}
</script>
<style scoped>
	.icons-wrap{
		overflow: hidden;
		padding: 20px;
		background-color: #fff;
	}
	.icons-list{
		display: flex;
		flex-wrap: wrap;
		margin: 10px 0;
	    font-size: 14px;
	    color: #5e6d82;
	    line-height: 2em;
	    box-sizing: content-box;
	    border: 1px solid #eaeefb;
    	border-radius: 4px;
		background-color: #fff;
	}

	.icons-list li{
		width: 12.5%;
		height: 120px;
		border-bottom: 1px solid #eee;
		border-right: 1px solid #eee;
		margin-right: -1px;
		margin-bottom: -1px;
		overflow: hidden;
	}

	.icons-list li i{
		display: block;
		margin-top: 10px;
		font-size: 32px;
	    margin-bottom: 15px;
	    color: #606266;
	    text-align: center;
	    transition: color .15s linear;
	}
	.icons-list li:hover i,
	.icons-list li:hover span{
		color: #5cb6ff
	}

	.icons-list li span{
		display: block;
		text-align: center;
		padding: 0 20px;
	}
</style>