<template>
    <div class="navbar">
    	<hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"></hamburger>
    	<breadcrumb class="breadcrumb-container"/>
        <el-button @click.native="getUserInfo">获取用户信息</el-button>
        <div class="userinfo">
            <el-dropdown trigger="click">
                <span class="drop-link">{{userInfo.name || userInfo.username}}<i class="el-icon-arrow-down el-icon--right"></i></span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人中心</el-dropdown-item>
                    <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>

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
    	...mapGetters(["sidebar", 'userInfo', 'logined', 'loaded']),
    },
    methods: {
    	toggleSideBar () {
    		// console.log(this.sidebar)
    		this.$store.dispatch("toggleSideBar");
    	},
        logout () {
            this.$store.dispatch("logout")
                .then(res => {
                    // console.log(res)
                    if(res.data && res.data.status == 200){
                        this.$message({
                          message: res.data.message,
                          type: 'success',
                        });
                        this.$router.push({path:'/login'})
                        
                    }
                })
        },
        getUserInfo () {
            this.$store.dispatch('getUserInfo')
                .then((res)=> {
                    this.$store.commit('UPDATA_LOADED', true)
                    if(this.logined === false){
                        this.$router.push({path:'/login', query: {back: '/home'}})
                        this.$message.error(res.data.message)
                    }
                })
        }
    },
    mounted() {
        this.getUserInfo()
    }
}
</script>

<style style rel="stylesheet/scss" lang="scss" scoped>
.navbar{
	height: 50px;
    line-height: 50px;
    border-radius: 0px !important;
}

.hamburger-container, .breadcrumb-container{
	line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
}

.userinfo{
    float: right;
    margin-right: 10px;
}

.drop-link{
    cursor: pointer;
}
</style>
