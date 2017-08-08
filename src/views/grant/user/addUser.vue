<template>
    <Form  ref="employeeForm" :model="employeeForm"  :rules="employeeRule" :label-width="100">
        <Form-item label="用户名" prop="name">
            <Input v-model="employeeForm.name"  placeholder="请输入用户名!"></Input>
        </Form-item>
        
        <Form-item label="性别" prop="gender">
            <Radio-group v-model="employeeForm.gender">
                <Radio label="1" checked>男</Radio>
                <Radio label="2">女</Radio>
            </Radio-group>
        </Form-item>
         <Form-item label="手机号码" prop="tel">
            <Input v-model="employeeForm.tel"  type="text"  placeholder="请输入手机号码!"></Input>
        </Form-item>
        <Form-item label="邮箱" prop="email">
            <Input v-model="employeeForm.email"  type="text"  placeholder="请输入邮箱!"></Input>
        </Form-item>
        <Form-item label="微信号" prop="wechatNo">
            <Input v-model="employeeForm.wechatNo"  type="text"  placeholder="请输入微信号!"></Input>
        </Form-item>
        <Form-item label="所属公司" prop="companyId">
            <Select v-model="employeeForm.companyId" placeholder="请选择所属公司!">
                 <Option v-for="tbDict in tbDicts" :value="tbDict.id">{{tbDict.name}}</Option>
            </Select>
        </Form-item>
        <Form-item label="所属部门" prop="deptId">
            <Select v-model="employeeForm.deptId" placeholder="请选择所属部门!">
                <Option v-for="tbDict in tbDicts2" :value="tbDict.id">{{tbDict.name}}</Option>
            </Select>
        </Form-item>
         <Form-item label="咨询师" prop="isConsultant">
           <Radio-group v-model="employeeForm.isConsultant">
                <Radio label="1">是</Radio>
                <Radio label="0">否</Radio>
            </Radio-group>
        </Form-item>
        <Form-item>
            <Button size='small' type="primary" @click="handleSubmit('employeeForm')">保存</Button>
            <Button size='small' type="warning" @click="handleReset('employeeForm')" style="margin-left: 8px">重置</Button>
            <router-link to="/manager/user">
                <Button size='small' type="ghost" style="margin-left: 8px">返回</Button>
            </router-link>
        </Form-item>
    </Form>
</template>
<script>
import global from '../../GLOBAL.vue';
export default {
    data() {
        const validateName = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入用户!'));
            } else{
                callback();
            }
        };
        const validateGender = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请选中性别!'));
            } else {
                callback();
            }
        };
        const validateEmail = (rule, value, callback) => {
            //利用正则表达式校验邮箱的合法性
            var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
            /*
                else if(!reg.test(value)){
                callback(new Error('邮箱格式不正确!'));
            }
             */
            if (value === '') {
                callback(new Error('请输入邮箱!'));
            }else if(!reg.test(value)){
                callback(new Error('邮箱格式不正确!'));
            }else {
                callback();
            }
        };
        const validateWechatNo = (rule, value, callback) => {
            //校验微信号的合法性
            //var reg = /^[a-zA-Z]{1}[-_a-zA-Z0-9]{5,19}+$/;
            if (value === '') {
                callback(new Error('请输入微信号!'));
            }else{
                callback();
            }
        };
        const validateCompanyId = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请选择公司!'));
            } else {
                callback();
            }
        };
        const validateDeptId = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请选择部门!'));
            } else {
                callback();
            }
        };
        const validateIsConsultant = (role,value,callback) =>{
            if(value === ''){
                callback(new Error('请选择是否是咨询师!'));
            }else{
                callback();
            }
        }
        return {
            //表单数据
            employeeForm: {
                name: '',
                gender: '',
                tel:'',
                email: '',
                wechatNo: '',
                companyId: '',
                deptId: '',
                isConsultant: '',
            },
            //表单校验规则
            employeeRule:{
                name: [
                    { validator: validateName, required: true, trigger: 'blur' }
                ],
                gender:[
                    {validator:validateGender,required:true}
                ],
                email:[
                    {validator:validateEmail,required:true,trigger:'blur'}
                ],
                wechatNo:[
                    {validator:validateWechatNo,required:true,trigger:'blur'}
                ],
                companyId:[
                    {validator:validateCompanyId,required:true,trigger:'change'}
                ],
                deptId:[
                    {validator:validateDeptId,required:true,trigger:'change'}
                ],
                isConsultant:[
                    {validator:validateIsConsultant,required:true,trigger:'change'}
                ]
            },
            tbDicts:[],//公司数据
            tbDicts2:[]//部门数据
        }
    },
    mounted:function(){
        //组件加载时到服务器获取公司和部门信息
        let _this = this;
        _this.$.get(global.serverUrl()+'/employee/getCompany').then(function(resp){
            // console.log(resp);
            _this.tbDicts= resp;
        });
        _this.$.get(global.serverUrl()+'/employee/getDept').then(function(resp){
            // console.log(resp);
            _this.tbDicts2= resp;
        }).catch(function(){
             _this.$Message.error('网络错误!');
        });
       
    },
    methods:{
        handleSubmit(name){
            let _this = this;
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$Message.success('表单验证成功!');
                    //异步提交数据
                    this.$.post(global.serverUrl()+'/employee/addEmployee',this.employeeForm).then(function(resp){
                        // console.log(resp.data);
                        if(resp.code ===600){//服务器成功处理请求
                            _this.success(resp.msg);
                            _this.handleReset(name);
                            //1秒后跳转到主页
                            setTimeout(function(){
                                _this.$router.push('/manager/user');
                            },1000);
                        }else{
                            _this.error(resp.msg);
                        }
                    });
                } else {
                    this.$Message.error('表单验证失败!');
                }
            });
        },
        handleReset(name){
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
