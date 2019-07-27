<template>
	<div>
		<el-dialog
			title="选择图标"
			:visible.sync="dialogData.show"
			width="800px">
			<ul class="icons-list">
				<li v-for="icon in icons">
					<i :class="[icon]" @click="selectIcon(icon)"></i>
				</li>
			</ul>
			<span slot="footer" class="dialog-footer">
			    <el-button @click="selectIcon('')">取 消</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<script>
	import { mapGetters } from "vuex";

	export default {
		props: {
			dialogData: Object
		},
		computed: {
	    	...mapGetters(["icons"]),
	    },
	    methods: {
	    	selectIcon(icon) {
	    		this.dialogData.show = false;
	    		this.$emit('select', icon)
	    	}
	    },
	    mounted() {
	    	this.$store.dispatch('getIcons')
	    }
	}
</script>
<style scoped>
	.icons-list{
		display: flex;
		flex-wrap: wrap;
		height: 500px;
		overflow: auto;
	}

	.icons-list li{
		width: 10%;
		height: 70px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.icons-list li i{
		font-size: 30px;
		width: 60px;
		height: 60px;
		line-height: 60px;
		text-align: center;
		border-radius: 5px;
		border: 1px solid #ccc;
		transition:0.2s;
		cursor: pointer;
	}

	.icons-list li i:hover{
		color: #5cb6ff;
		border-color:  #5cb6ff;
	}
</style>