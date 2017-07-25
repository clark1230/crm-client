<style lang="">
    .layout-content{
        min-height: 200px;
        margin: 15px;
        overflow: hidden;
        background: #fff;
        border-radius: 4px;
    }
    .layout-assistant{
        height:40px;
        margin: 0 auto;
    }
    .bar{
        height:50px;
    }
</style>
<template>
    <div  id="permission">
        <Menu mode="horizontal"  class="bar" >
            <div class="layout-assistant">
                    <Menu-item :name="subMenuApp.id" v-for="subMenuApp in subMenuApps" >{{subMenuApp.name}}</Menu-item>
                    
            </div>
        </Menu>
         <div class="layout-content">
            <Table  size='small' :highlight-row='true' :border='true' :columns="menuAppColumn" :data="menuAppData">
                
            </Table>
        </div>
    </div>
</template>
<script>
    import global from "../../GLOBAL.vue";
    export default {
        data () {
            return {
                menuAppColumn:[
                    {
                        title:'权限',
                        key:'name'
                    },{
                        title:'父级权限',
                        key:'pname'
                    },{
                        title:'地址',
                        key:'url'
                    },{
                        title:'可用',
                        key:'available'
                    }
                ],
                menuAppData:[],
                subMenuApps:[]
            }
        },
        mounted:function(){
            var _this = this;
            _this.$.get(global.serverUrl()+'/permission/getMenuApp').then(function(resp){
                console.log(resp);
                _this.menuAppData =resp;
            });
            _this.$.get(global.serverUrl()+'/permission/getSubPermission').then(function(resp){
                _this.subMenuApps = resp;
            });
        }
    }
</script>