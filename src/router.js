 const routers = [{//路由管理
    path: '/',
    meta: {
        title: '咨询系统'
    },
    component: (resolve) => require(['./views/zixun.vue'], resolve)
},{
    path:'/login',
    meta:{title:'系统登录'},
    component:(resolve) =>require(['./views/login.vue'],resolve)
},
{
    path:'/manager',//系统管理
    mata:{title:'修改数据' },
    component:(resolve) => require(['./views/manager.vue'],resolve),
    children:[//路由嵌套
       
        { 
            path: '/manager/user', 
            component:(resolve) => require(['./views/grant/user/user.vue'],resolve)   
        },
        {
            path:'/manager/user/addUser',
            meta:{title:'添加用户'},
            component:(resolve) => require(['./views/grant/user/addUser.vue'],resolve)
        },{
            path:'/manager/user/editUser',
            meta:{title:'修改用户'},
            component:(resolve)  => require(['./views/grant/user/editUser.vue'],resolve)
        }, {
            path:'/manager/role',//角色主页
            meta:{title:'角色信息'},
            component:(resolve)  => require(['./views/grant//role/role.vue'],resolve)
        }, {
            path:'/manager/role/addRole',//角色主页
            meta:{title:'添加角色'},
            component:(resolve)  => require(['./views/grant/role/addRole.vue'],resolve)
        }, {
            path:'/manager/role/editRole',//角色主页
            meta:{title:'修改角色'},
            component:(resolve)  => require(['./views/grant/role/editRole.vue'],resolve)
        },{
            path:'/manager/permission',
            meta:{title:'权限信息'},
            component:(resolve)  => require(['./views/grant/permission/permission.vue'],resolve)
        }
    ]
},
{
    path:'/zixun',  //咨询模块
    mata:{title:'咨询'},
    component:(resolve) => require(['./views/zixun.vue'],resolve),
    children:[//嵌套路由
        {
            path:'/zixun/register',
            meta:{title:'前台录入'},
            component:(resolve)  => require(['./views/register/index.vue'],resolve)
        },
        {
            path:'/zixun/register/editUser',
            mata:{title:'修改数据'},
            component:(resolve) => require(['./views/register/editUser.vue'],resolve)
        },{
            path:'/zixun/register/analyis',
            mata:{
                title:'前台统计'
            },
            component:(resolve)  => require(['./views/register/analysis.vue'],resolve)
        },{
            path:'/zixun/customer',
            meta:{title:'客户信息'},
            component:(resolve)  => require(['./views/customer/customer.vue'],resolve),
            children:[
                {
                    path:'/zixun/customer/search',
                    meta:{title:'搜索'},
                    component:(resolve)  => require(['./views/customer/search.vue'],resolve)
                }
            ]
        },{
            path:'/zixun/customer/addCustomer',
            meta:{title:'添加客户'},
            component:(resolve)  => require(['./views/customer/addCustomer.vue'],resolve)
        },{
            path:'/zixun/customer/editCustomer',
            meta:{title:'修改客户'},
            component:(resolve)  => require(['./views/customer/editCustomer.vue'],resolve)
        },{
            path:'/zixun/customer/recycler',
            meta:{title:'回收站'},
            component:(resolve) => require(['./views/customer/recycler.vue'],resolve)
        },{
            path:'/zixun/customer/inClassCustomer',
            meta:{title:'进班学员'},
            component:(resolve) => require(['./views/customer/inClassCustomer.vue'],resolve)
        },{
            path:'/zixun/customer/showCustomer',
            meta:{title:'学员跟进'},
            component:(resolve) => require(['./views/customer/showCustomer.vue'],resolve)
        },{
            path:'/zixun/customer/putInClass',
            meta:{title:'学员进班'},
            component:(resolve) => require(['./views/customer/putInClass.vue'],resolve)
        }
    ]
},{
    path:'/settings',//系统设置
    meta:{title:'系统设置'},
    component:(resolve) => require(['./views/settings.vue'],resolve)
}];
export default routers;