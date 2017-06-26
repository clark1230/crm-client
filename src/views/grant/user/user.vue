<style>
.toolbar {
    padding: 10px;
    padding-top: 0px;
}
</style>

<template>
    <div id="user">
        <div class='toolbar'>
            <router-link to="/user/addUser" icon="plus">
                <Button  icon="plus">
                    添加
                </Button>
            </router-link>
            <Button  icon="edit" >修改</Button>
    
            <Button  icon="trash-a">删除</Button>
            <Button  icon="ios-gear">授权角色</Button>
   
            <Input  placeholder="请输入搜索内容!" style="width:200px;"></Input>
             
            <Button type="primary" @click="handleSubmit('formInline')" icon="search">搜索</Button>
           
            <Modal v-model="add" :mask-closable="false" title="添加" >
                <h1>添加</h1>
            </Modal>
            <Modal v-model="edit" :mask-closable="false" title="修改" >
                <h1>修改数据</h1>
            </Modal>
        </div>
        <router-view></router-view>
        <Table border :columns="columns1" :data="data1"></Table>
    </div>
</template>
<script>
export default {
    data() {
        return {
            columns1: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '姓名',
                    key: 'name'
                },
                {
                    title: '年龄',
                    key: 'age'
                },
                {
                    title: '地址',
                    key: 'address'
                }
            ],
            data1: [
               
            ],
            add: false,
            edit: false

        }
    },
    methods: {
        

    }
}
</script>