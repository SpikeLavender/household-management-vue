<template>
    <el-row class="container">
        <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px"
                 class="demo-ruleForm login-container">
            <h3 class="title">欢迎注册</h3>
            <el-form-item prop="username">
                <el-input type="text" v-model="ruleForm2.username" auto-complete="off"
                          placeholder="用户名" prefix-icon="el-icon-user">
                </el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password" v-model="ruleForm2.password" auto-complete="off"
                          placeholder="密码" prefix-icon="el-icon-lock"></el-input>
            </el-form-item>
            <el-form-item prop="email">
                <el-input type="email" v-model="ruleForm2.email" auto-complete="off"
                          placeholder="邮箱" prefix-icon="el-icon-lock"></el-input>
            </el-form-item>
            <el-form-item prop="phone">
                <el-input type="phone" v-model="ruleForm2.phone" auto-complete="off"
                          placeholder="手机号" prefix-icon="el-icon-lock"></el-input>
            </el-form-item>
            <el-form-item style="width:100%;">
                <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2" :loading="logining">立即注册
                </el-button>
            </el-form-item>
            <el-form-item style="width:100%;">
                <el-link :underline="false" type="primary" style="float: right;" @click.native.prevent="handleSubmit1" >去登录
                </el-link>
            </el-form-item>
        </el-form>
    </el-row>
</template>

<script>
    import {mapMutations} from "vuex";

    export default {
        data () {
            return {
                sysName: 'Business Distribution System',
                logining: false,
                ruleForm2: {
                    username: 'hetengjiao',
                    password: '123',
                    email: '',
                    phone: ''
                },
                rules2: {
                    username: [
                        { required: true, message: '请输入账号', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                },
                checked: true
            }
        },
        methods: {
            ...mapMutations(['changeLogin']),
            async register(data) {
                let res = await this.$Http.register(data)
                if (res !== undefined) {
                    await this.$router.push({ path: '/login' })
                }
                this.logining = false
            },

            async handleSubmit1 () {
                console.log("register start")
                await this.$router.push({ path: '/login' })
            },

            async handleSubmit2 () {
                this.$refs.ruleForm2.validate((valid) => {
                    if (valid) {
                        this.logining = true
                        let data = {
                            username: this.ruleForm2.username,
                            password: this.ruleForm2.password,
                            email: this.ruleForm2.email,
                            phone: this.ruleForm2.phone
                        }
                        this.register(data)
                    } else {
                        console.log('error submit!!')
                        return false
                    }
                })
            }
        }
    }

</script>

<style lang="less" scoped>
    .login-container {
        -webkit-border-radius: 5px;
        border-radius: 5px;
        -moz-border-radius: 5px;
        background-clip: padding-box;
        margin: 180px auto;
        width: 450px;
        padding: 35px 35px 15px 35px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;

        .title {
            margin: 0px auto 40px auto;
            text-align: center;
            color: #505458;
        }

        .remember {
            margin: 0px 0px 35px 0px;
        }
    }
</style>
