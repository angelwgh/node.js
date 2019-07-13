<template>
    <div :class="classObj" class="main-wrapper">
        <sidebar class="sidebar-container"/>
        <div class="main-container">
            <Navbar/>
            <tags-view/>
            <main-content/>
        </div>
    </div>
</template>
<script>
import { mapGetters } from "vuex";
import { Navbar, Sidebar, mainContent, TagsView } from './components'
export default {
    name: 'admin',
    components: {
        Sidebar,
        Navbar,
        TagsView,
        mainContent
    },
    computed: {
        sidebar() {
          return this.$store.state.admin.sidebar
        },
        classObj() {
          return {
            hideSidebar: !this.sidebar.opened,
            openSidebar: this.sidebar.opened,
            loaded: this.loaded && this.logined
          }
        },
        ...mapGetters(["loaded", 'logined']),
    },
    mounted() {
        console.log(this.loaded)
    }

}
</script>

<style scoped>
    .main-wrapper{
        position: relative;
        width: 100%;
        height: 100%;
        opacity: 0;
        transition:0.4s;
    }
    .main-wrapper.loaded{
        opacity: 1;
    }
    .sidebar-container{
        transition: width 0.28s;
        width: 180px !important;
        height: 100%;
        position: fixed;
        font-size: 0px;
        top: 0;
        bottom: 0;
        left: 0;
        z-index: 1001;
        overflow: hidden;
    }

</style>

