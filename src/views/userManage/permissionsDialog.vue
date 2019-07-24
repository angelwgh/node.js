<template>
	<div>
		<el-dialog
			width="800px"
			:visible.sync="dialogData.show"
			@open="handleOpen">
			<el-tree
				 :data="list" 
				 :props="defaultProps"
				 node-key="_id"
				 default-expand-all
				 show-checkbox
				 :expand-on-click-node="false"
				 :default-checked-keys="[]"
				 @check="handleCheck"
				 ref="tree"
				>
			</el-tree>
			<span slot="footer" class="dialog-footer">
			    <el-button @click="dialogData.show=false">取 消</el-button>
			    <el-button type="primary" @click="save">保存</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<script>
	import utils from '@/utils';

	export default {
		props: {
			dialogData: Object
		},
		data () {
			return {
				defaultProps: {
					children: 'children',
					label: 'label'
				},
				id: '',
				permissions: ['6RrtdZ9gE'],
				list: []
			}
		},
		computed: {
	    	// list() {
	    	// 	const list = this.$store.getters.sitePermissions;
	    	// 	return utils.buildTree(_.cloneDeep(list))
	    	// }
	    },
		methods: {
			handleOpen () {

				this.permissions = this.dialogData.data.permissions || [];
				this.id = this.dialogData.data._id
				
				if(this.list.length == 0){
					this.$store.dispatch('getSitePermissions')
						.then(res => {
							this.setDefaultCheck()
						})
				}else{
					this.setDefaultCheck()
				}

				
			},
			setDefaultCheck() {
				this.list = utils.buildTree(_.cloneDeep(this.$store.getters.sitePermissions))
				this.$nextTick(()=>{
					const tree = this.$refs.tree
					// console.log(this.permissions)
					this.permissions.forEach(key => {
						console.log(key)
						tree.setChecked(key, true)
					})
				})
				
				// console.log(tree)
			},

			handleCheck (data1, data2) {
				console.log(data1)
				console.log(data2)
			},
			save () {
				const permissions = this.$refs.tree.getCheckedNodes(false, true).map(item=>{
					return item._id
				})

				this.$store.dispatch('setMemberPermissions',{
					id: this.id,
					permissions
				})
				.then(res => {
					this.$message({
						message: res.data.message,
						type: 'success'
					})
					this.$emit('update')
					this.dialogData.show = false
				})

			}
		},
		
	}
</script>