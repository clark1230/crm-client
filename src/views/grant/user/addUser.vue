<template>
    <Form :model="formItem" :label-width="80">
        <Form-item label="角色名称">
            <Input v-model="formItem.input" name="roleName" placeholder="请输入角色名称"></Input>
        </Form-item>
        
        <Form-item label="角色描述">
            <Input v-model="formItem.textarea" name="description" type="textarea" :autosize="{minRows: 4,maxRows: 7}" placeholder="请输入..."></Input>
        </Form-item>
        <Form-item>
            <Button type="primary">保存</Button>
            <router-link to="/user">
                <Button type="ghost" style="margin-left: 8px">返回</Button>
            </router-link>
    
        </Form-item>
    </Form>
</template>
<script>
export default {
    data() {
        return {
            formItem: {
                input: '',
                select: '',
                radio: 'male',
                checkbox: [],
                switch: true,
                date: '',
                time: '',
                slider: [20, 50],
                textarea: ''
            }
        }
    },
    created:function(){
        this.$.get('http://localhost:8090/getPersonList',function(data){
                console.log(data);
                
        });
    }
}
</script>
