<template>
   <div id="editUser">

       <h2>修改用户</h2>
        <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
        <input type="hidden" v-model="formCustom.customerId">
        <Form-item label="用户名" prop="realName">
            <Input type="text" v-model="formCustom.realName"></Input>
        </Form-item>
        <Form-item label="性别" prop="sex">
          <Radio-group v-model="formCustom.sex">
            <Radio label="1">男</Radio>
            <Radio label="2">女</Radio>
          </Radio-group>
        </Form-item>
        <Form-item label="电话号码" prop="tel">
          <Input type="text" v-model="formCustom.tel" value="13364167708" placeholder="请输入电话号码!"></Input>
        </Form-item>
        <Form-item label="面试官" prop="userId">
          <Select v-model="formCustom.userId" placeholder="请选择面试官!">
            <Option v-for="user in users" :value="user.userId">{{user.name}}</Option>
          </Select>
        </Form-item>
        <Form-item>
            <Button type="primary"  icon="edit" @click="handleSubmit('formCustom')">保存</Button>
            <Button type="ghost" icon="ios-refresh-empty" @click="handleReset('formCustom')" style="margin-left: 8px">重置</Button>
            <router-link  to="/register"><Button  icon="ios-undo">返回</Button></router-link>
        </Form-item>
    </Form>
       <router-view></router-view>
   </div>
</template>
<script>
    export default {
        data () {
            //校验用户名
            const validateRealName = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入用户名!'));
                } else {
                    callback();
                }
            };
            //校验性别
            const validateSex = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请选择性别!'));
                } else {
                    callback();
                }
            };
            //校验电话号码
            const validateTel = (rule, value, callback) => {
                 var reg = /^1[3|4|5|8][0-9]\d{4,8}$/;
                if (value === '') {
                    callback(new Error('请输入手机号码!'));
                } else if (!reg.test(value)) {
                    callback(new Error('手机号码格式不正确!'));
                } else {
                    callback();
                }
            };
            const validateUserId = (rule,value,callback) =>{
                 if (value === '') {
                    callback(new Error('请选择咨询师'));
                } else {
                    callback();
                }
            };
            return {
                formCustom: {
                    realName: '',
                    sex: '',
                    tel: '',
                    userId:'',
                    customerId:''
                },
                ruleCustom: {
                    realName: [
                        { validator: validateRealName, trigger: 'blur' }
                    ],
                    sex: [
                        { validator: validateSex, trigger: 'blur' }
                    ],
                    tel: [
                        { validator: validateTel, trigger: 'blur' }
                    ],
                    userId:[
                        {validator:validateUserId,required:true,trigger:'change'}
                    ]
                },
                users:[]
            }
        },
        mounted:function(){
            // /console.log(this.$route.query.id)
            let _this = this;
            let customerName = this.$route.query.customerName;
            //获取咨询师信息
            this.$axios.get('http://localhost:8090/foreground/consultantData?companyId=36').
            then(function (response) {
                _this.users = response.data;
                showCustomer();
            });
            function showCustomer(){
                //获取面试者姓名，到服务器中获取数据
                _this.$.get('http://localhost:8090/forground/editCustomer?realName='+customerName)
                .then(function(resp){
                    //数据回显
                    _this.formCustom.realName = resp.realName;
                    _this.formCustom.sex = resp.sex;
                    _this.formCustom.tel = resp.tel;
                    _this.formCustom.userId = resp.userId;
                    _this.formCustom.customerId = resp.customerId;
                });
            };
            this.$Notice.config({
                top: 500,
                duration: 3
            });
            
        },
        methods: {
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    let _this = this;
                    if (valid) {
                        this.$Message.success('表单验证成功!');
                        //保存修改的信息
                        //提交表单数据
                        _this.$.post('http://localhost:8090/forground/editCustomer',this.formCustom).then(function (resp) {
                            // _this.$route.push({path:'/register'});
                            if(resp.code === 600) {
                                 _this.success(resp.msg);
                                //跳转页面
                               setTimeout(function(){
                                    _this.$router.push('/register');
                               },1000);
                            } else {
                                _this.error(resp.msg);
                            }
                        }).catch(function (error) {
                            this.error("服务器出错啦!");
                        });
                    } else {
                        _this.$Message.error('表单验证失败!');
                    }
                   
                })
            },
            handleReset (name) {
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