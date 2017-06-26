<style>
.toolbar {
    padding: 10px;
    padding-top: 0px;
}
</style>

<template>
    <div id="role">
        <div class="toolbar">
            <Button icon="plus">添加</Button>
            <Button icon="edit">修改</Button>
            <Button icon="trash-a">删除</Button>
            <Button icon="android-settings">授权</Button>
        </div>
        <!--<Button v-on:click="getData" type="default" icon="plus">异步获取数据</Button>-->
        <Table border stripe  :columns="roleColumn" :highlight-row="true" :data="roleData"></Table>
          <Page :total="100"></Page>
    </div>
</template>
<script>

export default {
  
    data() {
        return {
            roleColumn: [
                
                { type: 'selection', width: 60, align: 'center' },
                { title: '用户名', key: 'username' },
                { title: '密码', key: 'password' },
                { title: '性别', key: 'gender' }
                
                
            ],
            roleData: [

            ]

        }
    },
    
    mounted: function () {
    console.log('组件更新');
    var _this = this;
       //this.roleData =[];
     this.$axios.get('http://localhost:8090/getPersonList').then(function(response){  
              _this.roleData = response.data;
    }); //绑定vue实例到get函数中
        console.log(_this.roleData.length);//0
    },
   
    methods: {
       getData(){
           
       }
    }
}
</script>

