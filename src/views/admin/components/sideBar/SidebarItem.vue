<template>
	<div v-if="!item.hidden">
		<template v-if="showChildren.length > 0">
			<el-submenu :index="item.name||item.path">
				<template slot="title">
		          <i :class="[item.icon]"></i>
		          <span slot="title">{{item.label}}</span>
		        </template>
		        <template v-for="(child, index) in item.children" >
		        	<div @click="clickLink(child.path,$event)" :key="index">
		        		<el-menu-item :index="resolvePath(child.path)">{{child.label}}</el-menu-item>
		        	</div>
		        </template>
		        
			</el-submenu>
		</template>
		<template v-else>
			<div @click="clickLink(item.path,$event)">
        		<el-menu-item :index="resolvePath(item.path)"><i class="el-icon-setting"></i><span slot="title">{{item.label}}</span></el-menu-item>
        	</div>
		</template>
	</div>
</template>
<script>
	import path from 'path'
	import { validateURL } from '@/utils/validate'

	export default {
		props: {
			item: {
				type: Object,
				default: null
			},
			basePath: {
		      type: String,
		      default: ''
		    }
		},
		data() {
			return {
				
			}
		},
		computed: {
			showChildren() {
				// console.log(this.basePath)
				// console.log(this.item)
				const children = this.item.children || []
				return children.filter(child => {
					if(child.hidden){
						return false
					}else{
						return true
					}
				})

			}
		},
		methods:{
			resolvePath(routePath) {
				return path.resolve(this.basePath, routePath)
			},
			clickLink(routePath, e) {
				// console.log(routePath)
				if(!validateURL(routePath)){
					const path = this.resolvePath(routePath)
					this.$router.push(path)
				}else{
					location.href = routePath
				}
				
			}
		},
		mounted () {
			// console.log(this.item)
		}
	}
</script>