<style scoped>
.layout {
    border: 1px solid #d7dde4;
    background: #f5f7f9;
}

.layout-nav {
    width: 420px;
    margin: 0 auto;
}

.layout-assistant {
    width: 300px;
    margin: 0 auto;
    height: inherit;
}

.layout-breadcrumb {
    padding: 10px 15px 0;
}

.layout-content {
    min-height: 200px;
    margin: 15px;
    overflow: hidden;
    background: #fff;
    border-radius: 4px;
}

.layout-content-main {
    padding: 10px;
}

.layout-copy {
    text-align: center;
    padding: 10px 0 20px;
    color: #9ea7b4;
}

.link {
    color: lightgray;
    width: 100%;
    height: 40px;
}

.left-content {
    height: 600px;
}
</style>
<template>
        <Row>
            <i-col span="3">
                <Menu theme="dark" class="left-content" active-name="1" width="auto" :open-names="['1']"  @on-select='menu'>
                    <Submenu name="1">
                        <template slot="title">
                            <Icon type="person"></Icon>
                            权限管理
                        </template>
                        <Menu-item name="1-1">
                            用户管理
                        </Menu-item>
                        <Menu-item name="1-2">
                            角色管理
                        </Menu-item>
                        <Menu-item name="1-3">
                            权限管理
                        </Menu-item>
                      
                    </Submenu>
                    <Submenu name="2">
                        <template slot="title">
                            <Icon type="navicon"></Icon>
                            其他
                        </template>
                        <Menu-item name="2-1">
                           数据字典
                        </Menu-item>
                    </Submenu>
                </Menu>
            </i-col>
            <i-col span="21">
                <div class="layout-content-main">
                    <router-view></router-view>
                </div>
            </i-col>
        </Row>
</template>
<script>
    export default{
        data(){
            return {}
        },
        mounted:function(){
            this.$router.push('/manager/user');
        },
        methods:{
            menu(name){
                if(name ==='1-1'){
                    this.$router.push('/manager/user');//跳转到用户列表
                }else if(name ==='1-2'){
                    this.$router.push('/manager/role');//跳转到角色列表
                }else if(name === '1-3'){
                    this.$router.push('/manager/permission');//跳转到权限列表
                }else if(name ==='1-4'){
                    this.$router.push('/login');
                }else if(name ==='2-1'){
                    this.$router.push('/login');
                }
            }
        }
    }
</script>