<template>
    <div id='addRole'>
        <Form ref="addRoleForm" :model="addRoleForm" :rules="ruleCustom" :label-width="80">
        <Form-item label="角色" prop="role">
            <Input type="text" v-model="addRoleForm.role" placeholder='请输入觉名称!'></Input>
        </Form-item>
        <Form-item label="启用" prop="available">
            <Radio-group v-model="addRoleForm.available">
                <Radio label="0" >不启用</Radio>
                <Radio label="1">启用</Radio>
            </Radio-group>
        </Form-item>
        <Form-item label="描述" prop="description">
            <Input v-model="addRoleForm.description"   type="textarea" :autosize="{minRows: 5,maxRows: 6}" placeholder="请输入角色描述!"></Input>
        </Form-item>
        <Form-item>
            <Button size='small' type="primary" @click="handleSubmit('addRoleForm')">提交</Button>
            <Button size="small" type="ghost" @click="handleReset('addRoleForm')" style="margin-left: 8px">重置</Button>
            <router-link to="/manager/role">
                <Button size='small' type="ghost" style="margin-left: 8px">返回</Button>
            </router-link>
        </Form-item>
    </Form>
    </div>
</template>
<script>
    import global from "../../GLOBAL.vue";
    export default {
        data () {
            const validateRole = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入角色名称'));
                } else {
                    callback();
                }
            };
            const validateAvailable = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请选择是否启用!'));
                }else {
                    callback();
                }
            };
            return {
                addRoleForm: {
                    role: '',
                    available: '',
                    description: ''
                },
                ruleCustom: {
                    role: [
                        { validator: validateRole,required: true, trigger: 'blur' }
                    ],
                    available: [
                        { validator: validateAvailable,required: true, trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            handleSubmit (name) {//提交表单
                var _this = this;
                _this.$refs[name].validate((valid) => {
                    if (valid) {
                       _this.$Message.success('表单验证成功!');
                       //提交表单
                       //异步提交数据
                        _this.$.post(global.serverUrl()+'/role/addRole',this.addRoleForm).then(function(resp){
                            console.log(resp.data);
                            if(resp.code ===600){//服务器成功处理请求
                                _this.success(resp.msg);
                                _this.handleReset(name);
                                //1秒后跳转到主页
                                setTimeout(function(){
                                    _this.$router.push('/manager/role');
                                },1000);
                            }else{
                                _this.error(resp.msg);
                            }
                        });
                    } else {
                       _this.$Message.error('表单验证失败!');
                    }
                })
            },
            handleReset (name) {//重置表单
                this.$refs[name].resetFields();
            },
            success(nodesc) {  //处理成功的消息提醒
                this.$Notice.success({
                    title: '处理结果',
                    desc: nodesc
                });
            },
            error(nodesc) {  //处理失败的消息提醒
                this.$Notice.error({
                    title: '处理结果',
                    desc: nodesc
                });
            }
        }
    }
</script>