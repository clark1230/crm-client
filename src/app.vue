<style scoped>
.layout {
    border: 1px solid #d7dde4;
    background: #f5f7f9;
}

.layout-logo {
    width: 600px;
    height: 50px;
    background-image: url('./static/logo.png');
    border-radius: 3px;
    float: left;
    position: relative;
    top: 0px;
    left: -35px;
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
    <div class="layout">
        <Menu mode="horizontal" theme="dark" active-name="1">
            <div class="layout-logo">
            </div>
            <div class="layout-nav">
                <Row type="flex" justify="end" class="code-row-bg">
                    <Col span="6">
                    <Menu-item name="1">
                        <Icon type="home"></Icon>
                        咨询
                    </Menu-item>
                    </Col>
                    <Col span="6">
                    <Menu-item name="2">
                        <Icon type="medkit"></Icon>
                        管理
                    </Menu-item>
                    </Col>
                    <Col span="6">
                    <Menu-item name="3">
                        <Icon type="gear-a"></Icon>
                        设置
                    </Menu-item>
                    </Col>
                    <Col span="6">
                    <Menu-item name="4">
                        <Icon type="chatbox-working"></Icon>
                        消息
                    </Menu-item>
                    </Col>
                </Row>
            </div>
        </Menu>
    
        <div class="layout-content">
            <Row>
                <i-col span="4">
                    <Menu theme="dark" class="left-content" active-name="1-2" width="auto" :open-names="['1']">
                        <Submenu name="0">
                            <template slot="title">
                                <Icon type="person-stalker"></Icon>
                                前台录入
                            </template>
                            <Menu-item name="0-1">
                                <router-link to="/register" class="link">信息录入</router-link>
                            </Menu-item>
                            <Menu-item name="0-2">
                                <router-link to="/register/analyis" class="link">数据统计</router-link>
                            </Menu-item>
                        </Submenu>
                        <Submenu name="1">
                            <template slot="title">
                                <Icon type="person"></Icon>
                                权限管理
                            </template>
    
                            <Menu-item name="1-2" class="link">
                                <router-link to="/user" class="link">用户管理</router-link>
                            </Menu-item>
                            <Menu-item name="1-3">
                                <router-link to="/role" class="link">角色管理</router-link>
                            </Menu-item>
                            <Menu-item name="1-4">
                                权限管理
                            </Menu-item>
                        </Submenu>
                        <Submenu name="2">
                            <template slot="title">
                                <Icon type="ios-keypad"></Icon>
                                学员管理
                            </template>
                            <Menu-item name="2-1">学员信息</Menu-item>
                            <Menu-item name="2-2">回收站</Menu-item>
                            <Menu-item name="2-2">进班学员</Menu-item>
                            <Menu-item name="2-2">公共库</Menu-item>
                        </Submenu>
                        <Submenu name="2">
                            <template slot="title">
                                <Icon type="ios-keypad"></Icon>
                                系统设置
                            </template>
                            <Menu-item name="2-1">学员信息</Menu-item>
                            <Menu-item name="2-2">回收站</Menu-item>
                            <Menu-item name="2-2">进班学员</Menu-item>
                            <Menu-item name="2-2">公共库</Menu-item>
                        </Submenu>
                    </Menu>
                </i-col>
                <i-col span="20">
                    <div class="layout-content-main">
                        <router-view></router-view>
                    </div>
                </i-col>
            </Row>
        </div>
        <div class="layout-copy">
            2017&copy;合众艾特信息技术有限公司
        </div>
    </div>
</template>
<script>
export default {

}
</script>
