
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
    height: 950px;
}
</style>
<template>
            <Row>
                <i-col span="3">
                    <Menu theme="dark" class="left-content" active-name="0" width="auto" :open-names="['1']"  @on-select='menu' >
                        <Submenu name="1">
                            <template slot="title">
                                <Icon type="person-stalker"></Icon>
                                前台录入
                            </template>
                            <Menu-item name="1-1">
                                信息录入
                            </Menu-item>
                            <Menu-item name="1-2">
                                数据统计
                            </Menu-item>
                        </Submenu>
                        
                        <Submenu name="2">
                            <template slot="title">
                                <Icon type="ios-keypad"></Icon>
                                学员管理
                            </template>
                            <Menu-item name="2-1">学员信息</Menu-item>
                            <Menu-item name="2-2">回收站</Menu-item>
                            <Menu-item name="2-3">进班学员</Menu-item>
                            <Menu-item name="2-4">公共库</Menu-item>
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
            this.$router.push('/zixun/customer');
        },
        methods:{
            menu(name){//点击菜单跳转到别的组件
                if(name === '1-1'){
                    this.$router.push('/zixun/register');
                }else if(name === '1-2'){
                    this.$router.push('/zixun/register/analyis'); 
                }else if(name==='2-1'){
                    this.$router.push('/zixun/customer');
                }else if(name==='2-2'){
                    this.$router.push('/zixun/customer/recycler');
                }else if(name==='2-3'){
                    this.$router.push('/zixun/customer/inClassCustomer');
                }
            }
        }
    }
</script>