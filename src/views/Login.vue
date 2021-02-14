<template>
    <el-row class="container">
        <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px"
                 class="demo-ruleForm login-container">
            <h3 class="title">登录</h3>
            <el-form-item prop="username">
                <el-input type="text" v-model="ruleForm2.username" auto-complete="off"
                          placeholder="用户名" prefix-icon="el-icon-user">
                </el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password" v-model="ruleForm2.password" auto-complete="off"
                          placeholder="密码" prefix-icon="el-icon-lock"></el-input>
            </el-form-item>
            <el-form-item style="width:100%;">
                <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2" :loading="logining">登录
                </el-button>
            </el-form-item>
            <el-form-item style="width:100%;">
                <el-link :underline="false" type="primary" style="float: left;" @click.native.prevent="" >忘记密码？
                </el-link>
                <el-link :underline="false" type="primary" style="float: right;" @click.native.prevent="handleSubmit1" >去注册
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
                    password: '123'
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
            async login(data) {
                let res = await this.$Http.login(data)
                if (res !== undefined) {

                    this.changeLogin({
                        Authorization: res.data,
                        username: res.data.username,
                        userId: res.data.id
                    });
                    if (res.data.role === 0) {
                        await this.$router.push({ path: '/adminHome' })
                    } else {
                        await this.$router.push({ path: '/userHome' })
                    }
                }
                this.logining = false
            },

            async handleSubmit2 () {
                this.$refs.ruleForm2.validate((valid) => {
                    if (valid) {
                        this.logining = true
                        let data = {
                            username: this.ruleForm2.username,
                            password: this.ruleForm2.password
                        }
                        this.login(data)
                    } else {
                        console.log('error submit!!')
                        return false
                    }
                })
            },

            async handleSubmit1 () {
                console.log("register start")
                await this.$router.push({ path: '/register' })
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
