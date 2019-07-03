<template>
    <div class="navbar">
    	<hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"></hamburger>
    	<breadcrumb class="breadcrumb-container"/>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import Hamburger from "@/components/Hamburger";
import Breadcrumb from "@/components/Breadcrumb";
export default {
    name: 'navbar',
    components: {
    	Hamburger,
        Breadcrumb
    },
    computed: {
    	...mapGetters(["sidebar"]),
    },
    methods: {
    	toggleSideBar () {
    		// console.log(this.sidebar)
    		this.$store.dispatch("toggleSideBar");
    	}
    }
}
</script>

<style style rel="stylesheet/scss" lang="scss" scoped>
.navbar{
	height: 50px;
    line-height: 50px;
    border-radius: 0px !important;
}

.hamburger-container{
	line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
}
</style>
