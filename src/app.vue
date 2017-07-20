<style scoped>
.layout {
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    min-width:1200px;
}

.layout-logo {
    width: 40%;
    height: 50px;
    background-image: url('./static/logo.png');
    background-repeat:no-repeat;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 0px;
    left: -70px;
}

.layout-nav {
    width: 60%;
    margin: 0 auto;
}

.layout-assistant {
    width: 300px;
    margin: 0 auto;
    height: inherit;
}

.layout-breadcrumb {
    /*padding: 5px 10px 0;*/
}

.layout-content {
    min-height: 700px;
    margin: 0px;
    overflow: hidden;
    background: #fff;
    /*border-radius: 4px;*/
}

.layout-content-main {
    /* padding: 5px;*/
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
.menu{
    position:absolute;
    right:10px;
    color:#808484;
    font-size:35px;
    text-align:center;
}
.menu-a{
    width:70px;
    height:50px;
    display:inline-block;
}
.menu:hover{
    background-color:#293655;
}
</style>
<template>
    <div class="layout">
    <!--@on-menu-item-select='menu()'-->
        <Menu mode="horizontal" theme="dark" active-name="1"  @on-select='menu' >
            <div class="layout-logo">
            </div>
            <div class="layout-nav">
                <Row type="flex" j class="code-row-bg">
                    <Col >
                            <Menu-item name="1"  class='item'   @on-select='zixun' >
                                <Icon type="home"></Icon>咨询
                            </Menu-item>
                        &nbsp;&nbsp;
                        <Menu-item name="2" class='item'>
                            <Icon type="medkit"></Icon>管理
                        </Menu-item>
                         &nbsp;&nbsp;
                        <Menu-item name="3" class='item'>
                            <Icon type="gear-a"></Icon>设置
                        </Menu-item>
                        
                    </Col>
                     <div  class="menu">
                            <Dropdown>
                            <a href="javascript:void(0)"  style="color:#808484" class="menu-a">
                                
                                <Icon type="person"></Icon>
                            </a>
                            
                            <Dropdown-menu slot="list">
                                <Dropdown-item>
                                    <a href="#">修改密码</a>
                                </Dropdown-item>
                                <Dropdown-item divided>
                                    <a href="#" @click="loginModel=true">注销系统</a>
                                </Dropdown-item>
                                <Dropdown-item >北京烤鸭</Dropdown-item>
                                </Dropdown-menu>
                            </Dropdown>
                            <Modal
                                v-model="loginModel"
                                title="注意"
                                @on-ok="ok"
                                @on-cancel="cancel">
                                <h3>是否退出本系统!</h3>
                            </Modal>
                        </div>
                </Row>
                
            </div>

        </Menu>
         <div class="layout-content">
            <router-view></router-view>
        </div>
        
        <div class="layout-copy">
            2017&copy;合众艾特信息技术有限公司
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            loginModel:false
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
        },
        logout:function(){
            alert("是否退出系统");
        },
        ok:function(){
            alert('退出本系统了');
        },
        cancel:function(){

        }
    }
}
</script>
