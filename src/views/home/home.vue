<template>
	<div>
		<el-form>
			<el-form-item label="权限名称">
				<el-input v-model="name"></el-input>
			</el-form-item>
			<el-button @click.native="add">新增权限</el-button>
		</el-form>
		<div class="permission-list">
			<ul>
				<li v-for="item in  permissions" :key="">
					<div> <span>{{item.name}}</span> <el-button @click="addUserPermission(item._id)">添加</el-button><el-button @click.native="del(item._id)">删除</el-button></div>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
	export default{
		data() {
			return {
				name: '',
				permissions: []
			}
		},
		methods: {
			add() {
				this.$ajax({
					url:'/api/permission/add',
					method: 'post',
					data: {
						name: this.name
					}
				})
				.then(res=> {
					 this.$message({
                          message: res.data.message,
                          type: 'success',
                        });
					 this.name = '';
					 this.get()

				})

			},
			get() {
				this.$ajax({
					url:'/api/permission/getall',
					method: 'get',
				})
				.then(res=> {
					 console.log(res)
					if(res.data.status == 200){
						this.permissions = res.data.data
					}
				})
			},
			del(id) {
				this.$ajax({
					url:'/api/permission/del',
					method: 'post',
					data: {
						id: id
					}
				})
				.then(res => {
					console.log(res)
					this.$message({
                          message: res.data.message,
                          type: 'success',
                        });
					this.get()
				})
			},
			addUserPermission(id){
				this.$ajax({
					url:'/api/user/addPermission',
					method: 'post',
					data: {
						id: id
					}
				})
				.then(res => {
					console.log(res)
					// this.$message({
     //                      message: res.data.message,
     //                      type: 'success',
     //                    });
					// this.get()
				})
			}
		},
		mounted () {
			// this.get()
		}
	}
</script>