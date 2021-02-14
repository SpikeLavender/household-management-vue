const ORDER_API = {
    //注册
    register: {
        method: 'post',
        url: '/user/register'
    },
    //登录
    login: {
        method: 'post',
        url: '/user/login'
    },
    //登出
    logout: {
        method: 'delete',
        url: '/user/logout'
    },
    deleteUser: {
        method: 'delete',
        url: '/user/{userId}/delete'
    },
    updateUser: {
        method: 'post',
        url: '/user/{userId}/update'
    },
    getUsers: {
        method: 'get',
        url: '/user/userInfos'
    },
    getUsersById: {
        method: 'get',
        url: '/user//{userId}/userInfo'
    },
    getUsersByStatus: {
        method: 'get',
        url: '/user/status/{userStatus}'
    },
    verifyUser: {
        method: 'get',
        url: '/user/{userId}/verify/{status}'
    },
    getHouseholds: {
        method: 'get',
        url: '/household/all'
    },
    getHouseholdById: {
        method: 'get',
        url: '/household/{userId}'
    },
    deleteHouse: {
        method: 'delete',
        url: '/household/{userId}/{householdId}'
    },
    updateHouse: {
        method: 'put',
        url: '/household/{householdId}'
    },
    getNotices: {
        method: 'get',
        url: '/notice/notices'
    },
    creatNotice: {
        method: 'post',
        url: '/notice/notices'
    },
    updateNotice: {
        method: 'post',
        url: '/notice/{noticeId}'
    },
    deleteNotice: {
        method: 'delete',
        url: '/notice/{noticeId}'
    }

}

export default ORDER_API