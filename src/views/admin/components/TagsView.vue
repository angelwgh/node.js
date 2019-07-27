<template>
    <div class="tags-view-container">
    	<scroll-pane>
    		<div class="views-list">
    			<div v-for="item in views"
    				:class="{active:activeView.name == item.name }">
    				{{item.meta.title}}
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
	background-color: #fff;
}

.views-list{
	display: flex;
}

.views-list div.active{
	background-color: #f00;
}
</style>
