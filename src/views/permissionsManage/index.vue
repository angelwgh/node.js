<template>
	<div class="permissions-manage">
		<form-dialog :dialog-data="formDialogData" :list="list"></form-dialog>
		<el-button @click.native="addSitePermission">添加</el-button>
		<el-tree :data="list" 
				 :props="defaultProps" 
				 default-expand-all
				 :expand-on-click-node="false"
				 @node-click="handleNodeClick">
			<span class="custom-tree-node" slot-scope="{ node, data }">
				<span>{{node.label}}</span>

				<span>
					<el-button size="mini" icon="el-icon-edit" type="primary" circle
								@click="editSitePermission(data)"></el-button>
					
					<el-button size="mini" icon="el-icon-plus" type="success" circle
								@click="addSitePermission(data)"
								:disabled="data.type == '1'">
						
					</el-button>
					<el-button 	size="mini" 
								icon="el-icon-delete" 
								type="danger" 
								circle
								@click="delSitePermission(data._id)">
					</el-button>
				</span>
			</span>
		</el-tree>
	</div>
</template>
<script>
	import formDialog from './formDialog.vue'
	import { mapGetters } from "vuex";
	import utils from '@/utils'

	export default{
		components: {
			formDialog
		},
		data() {
			return {
				dialogVisible: false,
				formDialogData: {
					show: false,
					type: '',
					data: null
				},
				defaultProps: {
					children: 'children',
					label: 'label'
				}
			}
		},
		computed: {
	    	...mapGetters(["sitePermissions"]),

	    	list() {

	    		return utils.buildTree(_.cloneDeep(this.sitePermissions))
	    	}
	    },
		methods: {
			getList() {
				this.$store.dispatch("getSitePermissions")
			},

			addSitePermission(data){
				this.formDialogData.type = 'add';
				this.formDialogData.data = data
				this.formDialogData.show = true;
			},
			// 编辑
			editSitePermission(data) {
				// console.log(data)
				this.formDialogData.type = 'edit';
				this.formDialogData.data = data
				this.formDialogData.show = true;
				
			},
			// 删除
			delSitePermission(id) {
				this.$confirm('此操作将永久删除这条记录，是否继续', '删除权限', {
		          distinguishCancelAndClose: true,
		          confirmButtonText: '确认删除',
		        })
		        .then(() => {
		        	return this.$store.dispatch("delSitePermission", {id})
		        })
		        .then( res => {
		        	console.log(res)
		        	if(res.data.status == 200){
		        		this.$message({
		        			message: res.data.message,
		        			type: 'success'
		        		})
		        	}else {
		        		this.$message({
		        			message: res.data.message,
		        			type: 'error'
		        		})
		        	}
		        })
		        .catch( action => {
		        	console.log(action)
		        })
			}
			
		},

		mounted () {
			this.getList();
		}
	}
</script>