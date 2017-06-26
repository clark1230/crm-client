const routers = [{
    path: '/',
    meta: {
        title: '咨询系统'
    },
    component: (resolve) => require(['./views/index.vue'], resolve)
}, {
    path: '/user',//用户主页
    meta: {
        title: '用户信息'
    },
    component: (resolve) => require(['./views/grant/user/user.vue'], resolve)
},{
    path:'/role',//角色主页
    meta:{
        title:'角色信息'
    },
    component:(resolve)  => require(['./views/grant/role.vue'],resolve)
},{
    path:'/user/addUser',//添加用户
    meta:{
        title:'添加用户'
    },
    component:(resolve) => require(['./views/grant/user/addUser.vue'],resolve)
},{
    path:'/register',
    meta:{
        title:'前台录入'
    },
    component:(resolve)  => require(['./views/register/index.vue'],resolve)
},{
    path:'/register/analyis',
    mata:{
        title:'前台统计'
    },
    component:(resolve)  => require(['./views/register/analysis.vue'],resolve)
}];
export default routers;