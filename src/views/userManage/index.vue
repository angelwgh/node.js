<template>
	<div class="user-manage" v-loading="loading">
		<form-dialog @update="getMembersList" :dialog-data="formDialogData" :list="list"></form-dialog>
		<el-button @click="addMember">添加</el-button>
		<el-table
		    :data="membersList.list"
		    stripe
		    style="width: 100%"
		    >
		    <el-table-column
		      prop="username"
		      label="用户名"
		      width="180">
		    </el-table-column>
		    <el-table-column
		      prop="date"
		      label="日期"
		      width="180">
		    </el-table-column>
		    <el-table-column
		      prop="permissions"
		      label="权限">
		    </el-table-column>
		     <el-table-column
		      prop="email"
		      label="邮箱">
		    </el-table-column>
		    <el-table-column
		      fixed="right"
		      label="操作"
		      width="100">
		      <template slot-scope="scope">
		        <el-button @click="editMemberInfo(scope.row)" type="text" size="small">编辑</el-button>
		        <el-button @click="delMember(scope.row._id)" type="text" size="small">删除</el-button>
		      </template>
		    </el-table-column>
		</el-table>
		<el-pagination
	      @size-change="handleSizeChange"
	      @current-change="handleCurrentChange"
	      :current-page="pageno"
	      :page-sizes="[10, 20, 30, 40]"
	      :page-size="pagesize"
	      style="text-align: right"
	      layout="total, sizes, prev, pager, next, jumper"
	      :total="membersList.total">
	    </el-pagination>
	</div>
</template>
<script>
import { mapGetters } from "vuex";
import formDialog from './formDialog.vue';
	export default {
		components: {
			formDialog
		},
		data() {
	      return {
	      	loading: false,
	      	pageno: 1,
	      	pagesize: 10,
	      	formDialogData: {
				show: false,
				data: {},
				type: ''
			}
	      }
	    },
	    computed: {
	    	...mapGetters(["membersList"]),
	    },
	    methods: {
	    	handleCurrentChange (pageno) {
	    		this.pageno = pageno;
	    		this.getMembersList()
	    	},
	    	handleSizeChange (pagesize) {
	    		this.pagesize = pagesize;
	    		this.getMembersList()
	    	},
	    	getMembersList() {
	    		this.loading = true
				this.$store.dispatch("getMembersList", {
			    		pageno: this.pageno,
			    		pagesize: this.pagesize
			    	})
		    		.then(res=>{
		    			
		    			this.loading =false
		    			// console.log(this.membersList)
		    		})
	    	},
	    	editMemberInfo: function (data) {
	    		console.log(data)
	    		this.formDialogData.show = true
	    		this.formDialogData.data = _.cloneDeep(data)
	    		this.formDialogData.type = '1'
	    	},

	    	addMember: function () {
	    		this.formDialogData.show = true
	    		this.formDialogData.data = {}
	    		this.formDialogData.type = '0'
	    	},
	    	delMember: function (_id) {
	    		this.$confirm('此操作将永久删除这条记录，是否继续', '删除会员',{
	    			distinguishCancelAndClose: true,
		          	confirmButtonText: '确认删除',
	    		})
	    		.then(() => {
	    			return this.$store.dispatch('delMember', { _id })
	    		}).then(res => {
	    			if(res.data.status == 200){
	    				this.getMembersList()
	    				this.$message({
							message: res.data.message,
							type: 'success'
						})
	    			}
	    		})
	    	}
	    },
	    mounted () {
	    	this.getMembersList()
	    }
	}
</script>