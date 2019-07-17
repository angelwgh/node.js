<template>
	<div>
		<el-dialog
			title="填写权限信息"
			:visible.sync="dialogData.show"
			width="800px" 
			@open="handleOpen">
			<el-form label-width="150px" :model="form" :rules="rules" ref="form">
				<el-form-item label="上级菜单">
					<el-cascader
					v-model="cascader"
				    :options="list"
				    :props="{ checkStrictly: true, value: '_id'}"
				    :disabled="dialogData.type == 'edit'" 
					clearable
				    @change="cascaderChange"></el-cascader>
				</el-form-item>
				<el-form-item label="权限描述" prop="label">
					<el-input v-model="form.label"></el-input>
				</el-form-item>
				<el-form-item label="权限名称" prop="name">
					<el-input v-model="form.name"></el-input>
				</el-form-item>
				<el-form-item label="权限类型" prop="type">
					<el-select v-model="form.type" placeholder="请选择">
						<el-option
						      v-for="item in types"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
					</el-select>
				</el-form-item>
				<div v-if="form.type == '0'">
					<el-form-item label="菜单图标">
						<el-input v-model="form.icon"></el-input>
					</el-form-item>
					<el-form-item label="路由key">
						<el-input v-model="form.routePath"></el-input>
					</el-form-item>
					<el-form-item label="模板路径">
						<el-input v-model="form.componentPath">
							<template slot="prepend">/src/views/</template>
						</el-input>
					</el-form-item>					
					<el-form-item label="是否在菜单显示">
						<el-switch
						  v-model="form.enable">
						</el-switch>
					</el-form-item>
				</div>
				
				<el-form-item label="接口地址" v-if="form.type == '1'">
					<el-input v-model="form.api"></el-input>
				</el-form-item>
				<el-form-item label="排序">
					<el-input-number v-model="form.sortId" :min="0" :max="10" label="描述文字"></el-input-number>
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
	import { mapGetters } from "vuex";

	const defaultForm = {
		name: '',
	    api: '',
	    enable: true,
	    icon: '',
	    label: '',
	    type: '0', 
	    parentId: '',
	    routePath: '',
	    componentPath: '',
	    sortId: 0,
	}

	export default {
		props: {
			dialogData: Object,
			list: Object
		},
		data () {
			return{
				form: JSON.parse(JSON.stringify(defaultForm)),
				types: [
					{
						value: '0',
						label: '基础菜都'
					},
					{
						value: '1',
						label: '操作和功能'
					}
				],
				cascader: [],
				rules: {
					name: [{required: true, message: '请输入权限描述', trigger: 'blur' }],
					label: [{required: true, message: '请输入权限名称', trigger: 'blur' }],
					type: [{required: true, message: '请选择权限类型', trigger: 'change' }],
				}
			}
		},
		computed: {
	    	...mapGetters(["sitePermissions"]),
	    },
		methods: {
			cascaderChange(value) {
				// console.log(this.form.parentId)
				console.log(value)
				// this.form.parentId = value[0]

			},
			save() {
				this.$refs.form.validate(valid => {
					if(valid){
						const form ={};
						this.form.parentId = this.cascader[0]
						this.$store.dispatch('addSitePermission', this.form)
							.then(res =>{
								if(res.data.status == 200){
									this.$message({
										message: res.data.message,
										type: 'success'
									})
									this.initFormData(defaultForm)
									// this.form = JSON.parse(JSON.stringify(defaultForm))
								}
							})
						this.dialogData.show = false;
					}
				})
			},
			// 初始化表单数据
			initFormData(data) {

				for(let key in this.form){
					if(data[key] !== undefined){
						this.form[key] = data[key]
					}
				}
			},
			handleOpen() {
				this.initFormData(defaultForm)
				let data = {};
				let parentId = this.dialogData.data ? this.dialogData.data.parentId : '0';
				if(this.dialogData.type == 'edit'){
					data = this.dialogData.data
					
				}
				if(this.dialogData.type == 'add'){
					parentId = this.dialogData.data ? this.dialogData.data._id : '0';
				}
				this.cascader = [parentId]
				this.initFormData(data)
			}
		},
		mounted() {
			
		}
	}
</script>