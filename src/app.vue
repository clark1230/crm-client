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

.item:hover{
    background-color:#293655;
}
.left-content {
    height: 600px;
}
</style>
<template>
    <div class="layout">
    <!--@on-menu-item-select='menu()'-->
        <Menu mode="horizontal" theme="dark" active-name="1"  @on-select='menu' >
            <div class="layout-logo">
            </div>
            <div class="layout-nav">
                <Row type="flex" justify="end" class="code-row-bg">
                    <Col :lg="24">
                            <Menu-item name="1"  class='item'   @on-select='zixun' >
                                <Icon type="home"></Icon>
                                    咨询
                            </Menu-item>
                        &nbsp;&nbsp;
                        <Menu-item name="2" class='item'>
                            <Icon type="medkit"></Icon>
                            管理
                        </Menu-item>
                         &nbsp;&nbsp;
                        <Menu-item name="3" class='item'>
                            <Icon type="gear-a"></Icon>
                                设置
                        </Menu-item>
                    </Col>
                </Row>
            </div>
        </Menu>
        <router-view></router-view>
        <div class="layout-copy">
            2017&copy;合众艾特信息技术有限公司
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {

        }
    },
    methods:{
        zixun(){
           alert('hello'); 
        },
        menu(name){
            if(name === '1'){
                this.$router.push('/zixun');
            }else if(name === '2'){
                this.$router.push('/manager');
            }else if( name === '3'){
                this.$router.push('/settings');
            }
          //alert('菜单名称'+name);
        }
    }
}
</script>
