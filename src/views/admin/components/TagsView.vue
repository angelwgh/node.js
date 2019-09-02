<template>
    <div class="tags-view-container">
    	<scroll-pane>
    		<div class="views-list">
    			<div class="views-item" 
    				v-for="item in views"
    				:class="{active:activeView.name == item.name }"
    				@click="changeView(item)">
    				{{item.meta.title}}
    				<span class="el-icon-close" @click.prevent.stop="deleteView(item)"></span>
    			</div>
    		</div>
    	</scroll-pane>
    </div>
</template>

<script>
import ScrollPane from "@/components/ScrollPane";
export default {
    name: 'TagsView',
    components: { ScrollPane },
    data() {
    	return {
    		views: [],
    		activeView:{}
    	}
    },
    mounted () {
    	this.addViews()
    },
    methods: {
    	generateRoute() {
    		if (this.$route.name) {
		        return this.$route;
		    }
		    return false;
    	},
    	isActive(route) {
	      	return route.path === this.$route.path;
	    },
    	addViews() {
    		const route = this.generateRoute();
    		if (!route) {
		        return false;
		    }
		    this.activeView = route
		    if(this.views.some( v => v.name === route.name)){
		    	return false
		    }
		    
		    this.views.push(route)
		    console.log(this.views)
    	},
    	changeView (view) {
    		if(view.name !== this.activeView.name){
    			this.$router.push(view)
    		}
    	},
    	deleteView(view) {
    		// console.log(view)
    		for(let [i, v] of this.views.entries()){
    			console.log(i)
    			if(v.name === view.name){
    				this.views.splice(i,1)
    				break;
    			}
    		}

    		if(this.isActive(view)){
    			const latestView = this.views.slice(-1)[0];
    			if (latestView) {
		            this.$router.push(latestView);
		        } else {
		            this.$router.push("/");
		        }
    		}
    	}
    },
    watch: {
    	$route(v){
    		this.addViews()
    	}
    }
}
</script>

<style scoped>
.tags-view-container{
	height: 35px;
	line-height: 35px;
    width: 100%;
    background: #fff;
    border-bottom: 1px solid #d8dce5;
    -webkit-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
}

.views-list{
	display: flex;
}

.views-list .views-item{
	position: relative;
    height: 26px;
    line-height: 26px;
    border: 1px solid #d8dce5;
    color: #495060;
    background: #fff;
    padding: 0 8px;
    font-size: 12px;
    margin-left: 5px;
    margin-top: 4px;
    box-sizing: border-box;
    cursor: pointer;
}

.views-list .views-item:first-of-type{
	margin-left: 15px;
}
.views-list .views-item.active{
	background-color: #409eff;
	color: #fff;
	border-color: #409eff;
}

.views-list .views-item.active::before{
	content: "";
    background: #fff;
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    position: relative;
    margin-right: 2px;
}

.views-list .views-item .el-icon-close {
    width: 16px;
    height: 16px;
    vertical-align: 2px;
    border-radius: 50%;
    text-align: center;
    -webkit-transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    -o-transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    -webkit-transform-origin: 100% 50%;
    -ms-transform-origin: 100% 50%;
    transform-origin: 100% 50%;
}

.views-list .views-item .el-icon-close:before {
    -webkit-transform: scale(0.6);
    -ms-transform: scale(0.6);
    transform: scale(0.6);
    display: inline-block;
    vertical-align: -3px;
}

.views-list .views-item .el-icon-close:hover {
    background-color: #b4bccc;
    color: #fff;
}
</style>
