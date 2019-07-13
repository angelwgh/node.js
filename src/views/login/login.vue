<template>
    <div class="login-box">
        <el-form :model="form" :rules="rules" ref="form">
            <el-form-item prop="username">
                <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
            </el-form-item>
             <el-form-item >
                <el-button class="login-btn" type="primary" @click.native="login">登录</el-button>
            </el-form-item>
            <router-link to="/404">asdasd</router-link>
        </el-form>
    </div>
</template>

<script>
import validata from '../../utils/validate'
import '../../style/login.scss'
export default {
    name: 'login',
    data () {
        return {
            back:'/home',
            form: {
                username:'angelwgh',
                password:'990738wgh'
            },
            rules:{
                username: [
                    { validator: validata.username, trigger: 'blur' }
                ],
                password: [
                    { validator: validata.password, trigger: 'blur' },
                ]
            }
        }
    },
    methods: {
        login() {
            this.$refs.form.validate((valid) => {
            if (valid) {
                // console.log(this.$ajax)
                this.$ajax({
                    url: '/api/user/login',
                    params: this.form
                }).then(res=> {
                    // console.log(this)
                    if(res.data.status == 200){
                        this.$router.push({path: this.back})
                    }else{
                        this.$message.error(res.data.message)
                    }
                })
            } else {

                return false;
            }
            });
        }
    },
    mounted() {
        this.back = this.$route.query.back || '/home'
        // console.log(this.$route)
    }
}
</script>

<style>

</style>
