<template>
    <el-scrollbar wrap-class="scrollbar-wrapper">
        <el-menu
            :default-active="$route.path"
            class="el-menu-vertical-demo"
             background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            @open="handleOpen"
            :collapse="isCollapse"
            @close="handleClose">
            <sidebaritem v-for="route in permission_routers" :key="route.name" :item="route" :base-path="route.path"></sidebaritem>
        </el-menu>
    </el-scrollbar>
</template>
<script>
import { mapGetters } from "vuex";
import sidebaritem from './SidebarItem'



export default {
    name: 'sidebar',
    components: {
        sidebaritem
    },
    computed: {
        ...mapGetters(["sidebar", 'permission_routers']),
        isCollapse() {
            // console.log(this.$store)
        return !this.sidebar.opened;
        }
    },

    mounted: function () {
        // console.log(this.$route.path)
    },
    
}
</script>

