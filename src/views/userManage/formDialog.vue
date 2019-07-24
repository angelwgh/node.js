<template>
	<div>
		<el-dialog
			title="编辑会员资料"
			:visible.sync="dialogData.show"
			width="800px"
			@open="handleOpen"
			>
				<el-form label-width="150px" ref="form">
					<el-form-item label="会员名">
						<el-input v-if="dialogData.type ==='0'" v-model="form.username"></el-input>
						<span v-else>{{form.username}}</span>
					</el-form-item>
					<el-form-item label="姓名">
						<el-input v-model="form.name"></el-input>
					</el-form-item>
					<el-form-item label="email">
						<el-input v-model="form.email"></el-input>
					</el-form-item>
					<el-form-item label="手机">
						<el-input v-model="form.tel"></el-input>
					</el-form-item>
					<el-form-item label="注册日期" v-if="dialogData.type==='1'">
						<el-input v-model="form.date" disabled></el-input>
					</el-form-item>
					
					<el-form-item label="会员状态">
						<el-input v-model="form.enable"></el-input>
					</el-form-item>
					<el-form-item label="用户类型状态">
						<el-input v-model="form.group"></el-input>
					</el-form-item>
				</el-form>
				<span slot="footer" class="dialog-footer">
				    <el-button @click="dialogData.show = false">取 消</el-button>
				    <el-button type="primary" @click="save">保存</el-button>
				</span>
		</el-dialog>
		
	</div>
</template>
<script>
	

	export default {
		props: {
			dialogData: Object,
		},

		data() {
			return {
				
				form: {

				}


			}
		},
		methods: {
			handleOpen() {
				this.form = this.dialogData.data
			},
			save() {
				const dispatch = this.dialogData.type == '0' ? 'addMember' : 'updataMember'
				
				this.$store.dispatch(dispatch, this.form)
					.then(res => {

						if(res.data.status == 200){
							this.dialogData.show = false;
							this.$message({
								message: res.data.message,
								type: 'success'
							})
							this.$emit('update')
						}
					})
			},
			

		}

	}
</script>