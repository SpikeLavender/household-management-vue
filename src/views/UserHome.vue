<template>
    <el-container class="container">
        <el-header class="header">
            <el-col :span="10" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">
                {{collapsed?'':sysName}}
            </el-col>

            <el-col :span="4" class="userinfo">
                <span class="user-icon">
                    <svg t="1567574734757" class="icon"
                         viewBox="0 0 1024 1024"
                         version="1.1"
                         xmlns="http://www.w3.org/2000/svg"
                         p-id="1458" width="32" height="32">
                    <path d="M768 728.615385v-7.876923-11.815385c-11.815385-110.276923-122.092308-196.923077-256-196.923077s-244.184615 86.646154-256 192.984615v23.63077c0 43.323077 35.446154 78.769231 78.769231 78.76923h354.461538c43.323077 0 78.769231-35.446154 78.769231-78.76923zM512 1024C228.430769 1024 0 795.569231 0 512S228.430769 0 512 0s512 228.430769 512 512-228.430769 512-512 512z m0-555.323077c94.523077 0 169.353846-74.830769 169.353846-169.353846S606.523077 126.030769 512 126.030769s-169.353846 78.769231-169.353846 173.292308 74.830769 169.353846 169.353846 169.353846z" p-id="1459" fill="#32C9B5" class="selected">
                    </path>
                </svg>
                </span>

                <span class="userinfo-inner">
<!--                    <img :src="this.sysUserAvatar"/> -->
                    {{sysUserName}}
                </span>
                <el-button type="text" @click.native="logout" style="color: #FFFFFF">退出</el-button>
            </el-col>
        </el-header>
        <el-container>
            <el-aside>
<!--                <el-checkbox-group v-model="isCollapse">-->
<!--                    <el-checkbox-button :label="true"><i :class="isCollapse?'el-icon-d-arrow-right':'el-icon-d-arrow-left'"></i></el-checkbox-button>-->
<!--                </el-checkbox-group>-->
                <!--            <h5>自定义颜色</h5>-->
                <el-menu
                    default-active="1"
                    class="el-menu-vertical-demo"
                    @select="handleSelect"
                    @open="handleOpen"
                    @close="handleClose"
                    :collapse="isCollapse"
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#ffd04b">
                    <el-menu-item index="1">
                        <i class="el-icon-user"></i>
                        <span slot="title">个人信息</span>
                    </el-menu-item>
                    <el-menu-item index="2">
                        <i class="el-icon-menu"></i>
                        <span slot="title">户籍信息</span>
                    </el-menu-item>
                    <el-menu-item index="3">
                        <i class="el-icon-bell"></i>
                        <span slot="title">查看通知</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-container>
                <el-main :class="curIndex === '1' ?'user-table':'user-table-hidden'">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>个人信息</span>
                        </div>
                        <div class="text item">
                            <el-row :gutter="20">
                                <el-col :span="4">
                                    <div class="grid-content bg-purple">
                                        用户名
                                    </div>
                                </el-col>
                                <el-col :span="16">
                                    <div class="grid-content bg-purple">
                                        {{userInfo.username}}
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                        <div class="text item">
                            <el-row :gutter="20">
                                <el-col :span="4">
                                    <div class="grid-content bg-purple">
                                        邮箱
                                    </div>
                                </el-col>
                                <el-col :span="16">
                                    <div class="grid-content bg-purple">
                                        {{userInfo.email}}
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                        <div class="text item">
                            <el-row :gutter="20">
                                <el-col :span="4">
                                    <div class="grid-content bg-purple">
                                        联系电话
                                    </div>
                                </el-col>
                                <el-col :span="16">
                                    <div class="grid-content bg-purple">
                                        {{userInfo.phone}}
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                        <div class="text item">
                            <el-row :gutter="20">
                                <el-col :span="4">
                                    <div class="grid-content bg-purple">
                                        账号状态
                                    </div>
                                </el-col>
                                <el-col :span="16">
                                    <div class="grid-content bg-purple" >
                                        {{formatStatus(userInfo.status)}}
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                        <div class="clearfix">
                            <el-button type="primary" size="small" @click="handleVe()">修改</el-button>
                            <el-button type="danger" size="small" @click="handleDel()">删除</el-button>
                        </div>

                    </el-card>

                    <el-dialog title="个人信息" :visible.sync="dialogFormVisibleForUser">
                        <el-form :model="userForm">
                            <el-form-item label="id" :label-width="formLabelWidth" style="display: none">
                                <el-input v-model="userForm.id" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="用户名" :label-width="formLabelWidth" >
                                <span v-model="userForm.username" >{{userForm.username}}</span>
                            </el-form-item>
                            <el-form-item label="邮箱" :label-width="formLabelWidth">
                                <el-input v-model="userForm.email" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="联系电话" :label-width="formLabelWidth">
                                <el-input v-model="userForm.phone" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="账号状态" :label-width="formLabelWidth" >
                                <span v-model="userForm.status">{{formatStatus(userForm.status)}}</span>
                            </el-form-item>

                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="dialogFormVisibleForUser = false">取 消</el-button>
                            <el-button type="primary" @click="updateUserBtn">确 定</el-button>
                        </div>
                    </el-dialog>
                </el-main>
                <el-main :class="curIndex === '2' ?'user-table':'user-table-hidden'">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>个人信息</span>
                        </div>
                        <div class="text item">
                            <el-row :gutter="20">
                                <el-col :span="4">
                                    <div class="grid-content bg-purple">
                                        姓名
                                    </div>
                                </el-col>
                                <el-col :span="16">
                                    <div class="grid-content bg-purple">
                                        {{household.name}}
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                        <div class="text item">
                            <el-row :gutter="20">
                                <el-col :span="4">
                                    <div class="grid-content bg-purple">
                                        身份证号
                                    </div>
                                </el-col>
                                <el-col :span="16">
                                    <div class="grid-content bg-purple">
                                        {{household.identityCardId}}
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                        <div class="text item">
                            <el-row :gutter="20">
                                <el-col :span="4">
                                    <div class="grid-content bg-purple">
                                        出生年月
                                    </div>
                                </el-col>
                                <el-col :span="16">
                                    <div class="grid-content bg-purple">
                                        {{formatHouseTime(household.birthday)}}
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                        <div class="text item">
                            <el-row :gutter="20">
                                <el-col :span="4">
                                    <div class="grid-content bg-purple">
                                        性别
                                    </div>
                                </el-col>
                                <el-col :span="16">
                                    <div class="grid-content bg-purple">
                                        {{formatGender(household.gender)}}
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                        <div class="text item">
                            <el-row :gutter="20">
                                <el-col :span="4">
                                    <div class="grid-content bg-purple">
                                        家庭住址
                                    </div>
                                </el-col>
                                <el-col :span="16">
                                    <div class="grid-content bg-purple">
                                        {{household.address}}
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                        <div class="text item">
                            <el-row :gutter="20">
                                <el-col :span="4">
                                    <div class="grid-content bg-purple">
                                        更新时间
                                    </div>
                                </el-col>
                                <el-col :span="16">
                                    <div class="grid-content bg-purple" >
                                        {{formatHouseTime(household.updateTime)}}
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                        <div class="clearfix">
                            <el-button type="primary" size="small" @click="handleUpdateHouse()">修改</el-button>
                            <el-button type="danger" size="small" @click="handleDelHouse()">删除</el-button>
                        </div>

                    </el-card>
                    <el-dialog title="户籍信息" :visible.sync="dialogFormVisibleHouse">
                        <el-form :model="formHouse">
                            <el-form-item label="id" :label-width="formLabelWidth" style="display: none">
                                <el-input v-model="formHouse.id" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="userId" :label-width="formLabelWidth" style="display: none">
                                <el-input v-model="formHouse.userId" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="姓名" :label-width="formLabelWidth" >
                                <el-input v-model="formHouse.name" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="身份证号" :label-width="formLabelWidth">
                                <el-input v-model="formHouse.identityCardId" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="生日" :label-width="formLabelWidth" >
                                <el-date-picker
                                    v-model="formHouse.birthday"
                                    type="date"
                                    placeholder="选择日期">
                                </el-date-picker>
                            </el-form-item>

                            <el-form-item label="性别" :label-width="formLabelWidth">
                                <template>
                                    <el-radio-group v-model="formHouse.gender">
                                        <el-radio label='1'>男</el-radio>
                                        <el-radio label='2'>女</el-radio>
                                    </el-radio-group>
                                </template>
                            </el-form-item>
                            <el-form-item label="家庭住址" :label-width="formLabelWidth">
                                <el-input
                                    type="textarea"
                                    :autosize="{ minRows: 2, maxRows: 4}"
                                    placeholder="请输入地址"
                                    v-model="formHouse.address">
                                </el-input>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="dialogFormVisibleHouse = false">取 消</el-button>
                            <el-button type="primary" @click="houseAdd">确 定</el-button>
                        </div>
                    </el-dialog>
                </el-main>
                <el-main :class="curIndex === '3' ?'user-table':'user-table-hidden'">
                    <el-table :data="notices"
                              style="width: 100%;"
                    >
                        <el-table-column type="selection"  width="55">
                        </el-table-column>
                        <el-table-column prop="id" label="ID" width="105">
                        </el-table-column>
                        <!--                        <el-table-column prop="userId" label="用户ID" width="0" >-->
                        <!--                        </el-table-column>-->
                        <el-table-column prop="title" label="标题" width="200">
                        </el-table-column>
                        <el-table-column prop="detail" label="内容" width="600">
                        </el-table-column>
                        <el-table-column prop="createTime" label="创建时间" width="205" :formatter="formatCreateTime">
                        </el-table-column>
                        <el-table-column prop="updateTime" label="更新时间" :formatter="formatUpdateTime">
                        </el-table-column>
                    </el-table>
                    <!--工具条-->
                    <el-col :span="24" class="toolbar">
                        <!--            <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0" size="small">批量删除</el-button>-->
                        <el-pagination layout="prev, pager, next"
                                       @current-change="handleCurrentChange"
                                       :current-page="page"
                                       :page-size="size"
                                       :total="total"
                                       style="float:right;">
                        </el-pagination>
                    </el-col>

                </el-main>
            </el-container>
        </el-container>
    </el-container>
</template>

<script>
import moment from "moment";

export default {
    data () {
        return {
            isCollapse: false,
            iconName: 'el-icon-d-arrow-right',
            activeIndex: '1-1',
            activeIndex2: '1',
            sysName: '户籍管理系统',
            dialogFormVisibleForUser: false,
            verifyHidden: false,
            userForm: {
                status: '2'
            },
            dialogFormVisibleHouse: false,
            formHouse: {
                id: '',
                userId: '',
                address: '',
                name: '',
                identityCardId: '',
                birthday: '',
                gender: '1'
            },
            collapsed: false,
            sysUserName: '',
            sysUserAvatar: '',
            userInfo: {},
            household: {},
            notices: [],
            page: 1,
            size: 10,
            total: 0,
            curIndex: '1',
            statusMap: {
                    0: '未审核',
                    2: '已通过',
                    3: '审核未通过',
                },
            filters:[
                {
                    value: '0',
                    text: '未审核'
                },
                {
                    value: '2',
                    text: '已通过'
                },
                {
                    value: '3',
                    text: '未通过'
                }],
            formLabelWidth: '120px'
        }
    },
    computed: {
        // 关于v-for v-if，data里未定义的变量遍历使用计算属性。否则使用v-for v-if配合使用
        routes: function () {
            //console.log("this.$router.options.routes" + this.$router.options.routes.filter)
            return this.$router.options.routes.filter(function (item) {
                return !item.hidden
            })
        },
        // 利用闭包实现计算属性传参。
        routeChildren: function () {
            return function (route) {
                return route.children.filter(function (child) {
                    return !child.hidden
                })
            }
        }
    },
    methods: {
        // 获取用户列表
        async getUsersById () {
            //this.listLoading = true
            let data = {};
            data.userId = this.userId;

            let res = await this.$Http.getUsersById({}, false, {}, data);
            //todo: 异常处理
            if (res !== undefined) {
                this.userInfo = res.data;
            }
        },

        handleVe() {
            this.userForm = this.userInfo
            this.dialogFormVisibleForUser = true
        },

        updateUserBtn() {
            let _this = this
            this.$confirm('确认更新吗?', '提示', {
                // type: 'warning'
            }).then(() => {
                _this.updateUser(this.userId)
                this.dialogFormVisibleForUser = false
            }).catch(() => {

            })
        },

        async updateUser() {
            let data = {};
            data = this.userForm;
            let params = {};
            params.userId = this.userId;
            let res = await this.$Http.updateUser(data, false, {}, params);
            //todo: 异常处理
            if (res !== undefined) {
                await this.getUsersById()
            }
        },

        handleDel() {
            let _this = this
            this.$confirm('确认删除吗?', '提示', {
                // type: 'warning'
            }).then(() => {
                _this.deleteUser(this.userId)
                this.dialogFormVisibleForUser = false
            }).catch(() => {

            })
        },

        async deleteUser(userId) {
            let params = {};
            params.userId = userId;
            let res = await this.$Http.deleteUser({}, false, {}, params);
            //todo: 异常处理
            if (res !== undefined) {
                await this.getUsersById()
            }
        },

        handleUpdateHouse() {
            this.formHouse = this.household
            this.dialogFormVisibleHouse = true
            console.log(this.formHouse)
        },

        houseAdd() {
            let _this = this
            this.$confirm('确认提交吗?', '提示', {
                // type: 'warning'
            }).then(() => {
                _this.updateHouse();
            }).catch(() => {

            })
            this.dialogFormVisibleHouse = false
        },

        handleDelHouse() {
            let _this = this
            this.$confirm('确认删除吗?', '提示', {
                // type: 'warning'
            }).then(() => {
                _this.delHouse(this.household.id, this.userId)
            }).catch(() => {

            })
        },

        async updateHouse() {
            let data = {};
            data = this.formHouse
            let params = {}
            params.householdId = this.formHouse.id
            let res = this.$Http.updateHouse(data, false, {}, params);
            //todo: 异常处理
            if (res !== undefined) {
                await this.getHouseholdById()
            }
        },

        async delHouse(houseId, userId) {
            let data = {};
            let params = {}
            params.householdId = houseId
            params.userId = userId
            let res = this.$Http.deleteHouse(data, false, {}, params);
            //todo: 异常处理
            if (res !== undefined) {
                await this.getHouseholdById()
            }
        },

        formatStatus: function (status) {
            return this.statusMap[status]
        },

        formatCreateTime: function (row, column) {
            let orderTime = row.createTime
            return moment(orderTime).format('YYYY-MM-DD')
        },

        formatUpdateTime: function (row, column) {
            let orderTime = row.updateTime
            return moment(orderTime).format('YYYY-MM-DD')
        },

        formatHouseTime: function (time) {
            if (time === null) {
                return ''
            }
            return moment(time).format('YYYY-MM-DD')
        },

        formatGender: function (gender) {
            if (gender === 1) {
                return '男'
            }
            if (gender === 2) {
                return '女'
            }
            return ''
        },

        // 退出登录
        logout: function () {
            let _this = this
            this.$confirm('确认退出吗?', '提示', {
                // type: 'warning'
            }).then(() => {
                localStorage.removeItem('Authorization');
                localStorage.removeItem('username');
                _this.$router.push('/login')
            }).catch(() => {

            })
        },

        async getHouseholdById () {
            //this.listLoading = true
            let data = {};
            data.userId = this.userId;

            let res = await this.$Http.getHouseholdById({}, false, {}, data);
            //todo: 异常处理
            if (res !== undefined) {
                console.log(res.data)
                this.household = res.data;
            }
        },

        async getNotices () {
            //this.listLoading = true
            let data = {};
            data.pageNum = this.page;
            data.pageSize = this.size;

            let res = await this.$Http.getNotices(data);
            //todo: 异常处理
            if (res !== undefined) {
                console.log(res.data)
                this.notices = res.data.list;
                this.total = res.data.total;
            }
        },

        handleSelect(key, keyPath) {
            //console.log(key, keyPath);
            console.log("this.curIndex:" + key.split('-'))
            this.curIndex = key.split('-')[0]
            this.activeIndex = key
            if (key === '1') {
                this.getUsersById()
            }
            if (key === '2') {
                this.getHouseholdById()
            }
            if (key === '3') {
                this.getNotices()
            }
        },
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },

        handleCurrentChange (val) {
            this.page = val;
            this.getNotices()
        },
    },
    mounted () {
        this.userId = this.$store.state.userId
        this.sysUserName = this.$store.state.username
        this.getUsersById()
    }
}

</script>

<style scoped lang="less">

.text {
    font-size: 14px;
}

.item {
    margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}
.clearfix:after {
    clear: both
}

.user-table {
}

.user-table-hidden {
    display: none;
}

.el-row {
    margin-bottom: 20px;
    &:last-child {
        margin-bottom: 0;
    }
}
.el-col {
    border-radius: 4px;
}

.grid-content {
    border-radius: 4px;
    min-height: 36px;
}
.row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
}

.el-header {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
}

.el-footer {
    bottom: 0;
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
}

.el-aside {
    background-color: rgb(84, 92, 100);
    color: #333;
    text-align: left;
    line-height: 200px;
    min-height: 850px;
}

.el-main {
    //background-color: #E9EEF3;
    color: #333;
    text-align: left;
    //width: 100%;
}

body > .el-container {
    margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
    line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
    line-height: 320px;
}

//.el-menu-vertical-demo:not(.el-menu--collapse) {
//    //width: 400px;
//    min-height: 600px;
//    text-align: left;
//}
.container {
    width: 100%;
    //height: 920px;
    //background: #EBF0F4;

    .header {
        height: 60px;
        line-height: 60px;
        background: #121111;
        color: #fff;

        .logo {
            width: 25%;
            font-size: 21px;
            padding-left: 10px;
            text-align: left;
        }
        .el-menu-demo {
            float: left;
            text-align: center;
            padding-left: 10px;
            margin-left: 10px;
            background: #409EFF;
            .el-menu-item {
                padding: 0 70px;
                font-size: 14px;
                font-family:SFUIDisplay;
                font-weight: 400;
                color: #FFFFFF;
                opacity: 0.7;
            }
            :hover {
                background: #42b983;
                color: #FFFFFF;
            }
            .el-menu-item.is-active {
                border-bottom: none;
                background: #42b983 !important;
                //border-bottom-color: #fc3f34 !important;
                opacity: 1;
                //border-bottom-color: transparent;
            }
        }

        .userinfo {
            text-align: right;
            padding-right: 35px;
            float: right;
            .user-icon {
                margin: 14px 10px 0px 0px;
                float: left;
                overflow: inherit;
                position: relative;
                //padding-left: 20px;
                border-radius: 30px;
                line-height: 10px;
                background: #FFFFFF;
                .icon {
                    margin: 0;
                    padding: 0;
                }
            }
            .userinfo-inner {
                cursor: pointer;
                color: #fff;
                float: left;
            }
        }
    }

    .main {
        display: flex;
        position: absolute;
        top: 60px;
        bottom: 0px;
        overflow: hidden;

        .content-container {
            flex: 1;
            overflow-y: scroll;
            padding: 20px;

            .content-wrapper {
                //background-color: #fff;
                box-sizing: border-box;
            }
        }
    }
}
</style>
