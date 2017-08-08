<template>
    <div style="min-width:1150px;max-height:560px;">
        <Form ref="customerForm" :model="customerForm" :rules="customerRule" :label-width="100" inline>
            <Form-item label="用户名：" prop="realName">
                <Input v-model="customerForm.realName" placeholder="请输入用户名称!"></Input>
            </Form-item>
            <Form-item label="性别：" prop="sex" style="width:262px">
                <Radio-group v-model="customerForm.sex" >
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Radio label="1">男</Radio>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Radio label="2">女</Radio>
                </Radio-group>
            </Form-item>
            <Form-item label="年龄：" prop="age">
                <Input v-model="customerForm.age" placeholder="请输入用户年龄!"></Input>
            </Form-item>
            <Form-item label="籍贯：" prop="nativePlace">
                <Input v-model="customerForm.nativePlace" placeholder="请输入籍贯!"></Input>
            </Form-item>
            <Form-item label="电话：" prop="tel">
                <Input v-model="customerForm.tel" placeholder="请输入电话号码!"></Input>
            </Form-item>
            <Form-item label="微信：" prop="wechatNo">
                <Input v-model="customerForm.wechatNo" placeholder="请输入微信账号!"></Input>
            </Form-item>
            <Form-item label="QQ：" prop="qq">
                <Input v-model="customerForm.qq" placeholder="请输入QQ账号!"></Input>
            </Form-item>
            <Form-item label="学历：" style="width:263px" prop="educationBg">
                <Select v-model="customerForm.educationBg" placeholder="请选择学历!">
                    <Option v-for="eBg in eBgArr" :value="eBg.id">{{eBg.name}}</Option>
                </Select>
            </Form-item>
            <Form-item label="毕业时间：" prop="graduateTime">
                <Input v-model="customerForm.graduateTime" placeholder="请输入毕业时间!"></Input>
            </Form-item>
            <Form-item label="毕业院校：" prop="graduteFrom">
                <Input v-model="customerForm.graduteFrom" placeholder="请输入毕业院校!"></Input>
            </Form-item>
            <Form-item label="专业：" prop="majorIn">
                <Input v-model="customerForm.majorIn" placeholder="请输入专业!"></Input>
            </Form-item>
            <Form-item label="工作年限：" prop="workAge">
                <Input v-model="customerForm.workAge" placeholder="请输入工作年限!"></Input>
            </Form-item>
            <Form-item label="工作经历：" prop="workExperience">
                <Input v-model="customerForm.workExperience" placeholder="请输入工作经历!"></Input>
            </Form-item>
            <Form-item label="职业：" prop="job">
                <Input v-model="customerForm.job" placeholder="请输入职业!"></Input>
            </Form-item>
            <Form-item label="培训经历：" prop="educateExperience">
                <Input v-model="customerForm.educateExperience" placeholder="请输入培训经历!"></Input>
            </Form-item>
            <Form-item label="用户状态：" style="width:263px" prop="customerState">
                <Select v-model="customerForm.customerState" placeholder="请选择用户状态!">
                    <Option v-for="cState in cStateArr" :value="cState.id" v-text="cState.name"></Option>
                </Select>
            </Form-item>
            <Form-item label="用户级别：" style="width:263px" prop="customerLevel">
                <Select v-model="customerForm.customerLevel" placeholder="请选择用户级别!">
                    <Option v-for="cLevel in cLevelArr" :value="cLevel.id" v-text="cLevel.name"></Option>
                </Select>
            </Form-item>
            <Form-item label="目标技能：" style="width:263px" prop="targetSkill">
                <Select v-model="customerForm.targetSkill" placeholder="请选择目标技能!">
                    <Option v-for="tSkill in tSkillArr" :value="tSkill.id" v-text="tSkill.name"></Option>
                </Select>
            </Form-item>
            <Form-item label="咨询师：" style="width:263px" prop="userId">
                <Select v-model="customerForm.userId" placeholder="请选择咨询师!">
                    <Option v-for="uId in uIdArr" :value="uId.userId" v-text="uId.name"></Option>
                </Select>
            </Form-item>
            <Form-item label="会销：" prop="isMarket">
                <Radio-group v-model="customerForm.isMarket" >
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Radio label="1">是</Radio>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Radio label="2">否</Radio>
                </Radio-group>
            </Form-item>
            <Form-item label="应聘渠道：" style="width:263px" prop="recruitChannel">
                <Select v-model="customerForm.recruitChannel" placeholder="请选择应聘渠道!">
                    <Option v-for="rChannel in rChannelArr" :value="rChannel.id" v-text="rChannel.name"></Option>
                </Select>
            </Form-item>
            <Form-item label="邀约人：" style="width:263px" prop="introducer">
                <Select v-model="customerForm.introducer" placeholder="请选择邀约人!">
                    <Option v-for="introduce in introducersArr" :value="introduce.userId" v-text="introduce.name"></Option>
                </Select>
            </Form-item>
            <div>
                <Form-item label="备注：" prop="memo" style="width:1085px">
                    <Input type="textarea" :autosize="{minRows:5,maxRows:10}" v-model="customerForm.memo" placeholder="请输入备注"></Input>
                </Form-item>
            </div>
            <Form-item>
                <Button size='small' type="primary" @click="handleSubmit('customerForm')">保存</Button>
                <Button size='small' type="warning" @click="handleReset('customerForm')" style="margin-left: 8px">重置</Button>
                <router-link to="/zixun/customer">
                    <Button size='small' type="ghost" style="margin-left: 8px">返回</Button>
                </router-link>
            </Form-item>
        </Form>
    </div>
</template>
<script>
    import GLOBAL from '../GLOBAL.vue';
    export default {
        //组件的data必须是函数
        data() {
            const validateRealName = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入用户名!'));
                } else{
                    callback();
                }
            }
            const validateSex = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请选中性别!'));
                } else {
                    callback();
                }
            }
            const validateAge = (rule,value,callback) =>{
                if (value === ''){
                    callback(new Error('请输入年龄!'));
                }else{
                    callback();
                }
            }
            const validateNativePlace = (rule,value,callback) => {
                if (value ==='' ){
                    callback(new Error('请输入籍贯!'));
                }else{
                    callback();
                }
            }
            const validateTel = (rule, value, callback) => {
                var reg = /^1[3|4|5|8][0-9]\d{4,8}$/;
                if (value === '') {
                    callback(new Error('请输入手机号码!'));
                } else if (!reg.test(value)) {
                    callback(new Error('无效的手机号码!'));
                } else {
                    callback();
                }
            }
            const validateEducationBg = (rule,value,callback) => {
                if (value === ''){
                    callback(new Error("请选择学历!"));
                }else{
                    callback();
                }
            }
            const validateCustomerState = (rule,value,callback) => {
                if (value === ''){
                    callback(new Error("请选择客户状态!"));
                }else {
                    callback();
                }
            }
            const validateCustomerLevel = (rule,value,callback) => {
                if (value === ''){
                    callback(new Error("请选择客户级别!"));
                }else {
                    callback();
                }
            }
            const validateTargetSkill = (rule,value,callback) => {
                if (value === ''){
                    callback(new Error("请选择目标技能!"));
                }else {
                    callback();
                }
            }
            const validateUserId = (rule,value,callback) => {
                if (value === ''){
                    callback(new Error("请选择咨询师!"));
                }else {
                    callback();
                }
            }
            const validateIsMarket = (rule,value,callback) => {
                if (value === ''){
                    callback(new Error("请选择是否会销!"));
                }else {
                    callback();
                }
            }
            return {
                customerForm:{
                    realName:'',//验证
                    sex:'',//验证
                    age:'',//验证
                    nativePlace:'',//验证
                    tel:'',//验证
                    wechatNo:'',
                    qq:'',
                    educationBg:'',//验证
                    graduateTime:'',
                    graduteFrom:'',
                    majorIn:'',
                    workAge:'',
                    workExperience:'',
                    job:'',
                    educateExperience:'',
                    customerState:'',//验证
                    customerLevel:'',//验证
                    targetSkill:'',//验证
                    userId:'',//验证
                    isMarket:'',//验证
                    recruitChannel:'',
                    introducer:'',
                    memo:''
                },
                customerRule:{
                    realName:[
                        {validator:validateRealName,required:true,trigger:'blur'}
                    ],sex:[
                        {validator:validateSex,required:true}
                    ],age:[
                        {validator:validateAge,required:true,trigger:'blur'}
                    ],nativePlace:[
                        {validator:validateNativePlace,required:true,trigger:'blur'}
                    ],tel:[
                        {validator:validateTel,required:true,trigger:'blur'}
                    ],educationBg:[
                        {validator:validateEducationBg,required:true,trigger:'change'}
                    ],customerState:[
                        {validator:validateCustomerState,required:true,trigger:'change'}
                    ],customerLevel:[
                        {validator:validateCustomerLevel,required:true,trigger:'change'}
                    ],targetSkill:[
                        {validator:validateTargetSkill,required:true,trigger:'change'}
                    ],userId:[
                        {validator:validateUserId,required:true,trigger:'change'}
                    ],isMarket:[
                        {validator:validateIsMarket,required:true}
                    ]
                },
                eBgArr:[],//学历列表
                cStateArr:[],//用户状态列表
                cLevelArr:[],//用户级别列表
                tSkillArr:[],//目标技能列表
                uIdArr:[],//咨询师列表
                rChannelArr:[],//应聘渠道列表
                introducersArr:[]//邀约人列表
            }
        },
        mounted:function() {
            //当页面加载时，异步获取下拉列表中所需要的数据
            let _this = this;
            //获取数据字典中的所有学历
            _this.$.get(GLOBAL.serverUrl()+'/customer/getEducationBg').then(function(resp){
                _this.eBgArr= resp;
            });
            //获取数据字典中的所有用户状态
            _this.$.get(GLOBAL.serverUrl()+'/customer/getCustomerState').then(function(resp){
                _this.cStateArr= resp;
            });
            //获取数据字典中的所有用户级别
            _this.$.get(GLOBAL.serverUrl()+'/customer/getCustomerLevel').then(function(resp){
                _this.cLevelArr= resp;
            });
            //获取数据字典中的所有目标技能
            _this.$.get(GLOBAL.serverUrl()+'/customer/getTargetSkill').then(function(resp){
                _this.tSkillArr= resp;
            });
            //获取所有咨询师
            _this.$.get(GLOBAL.serverUrl()+'/customer/getUserId').then(function(resp){
                _this.uIdArr= resp;
            });
            // 获取数据字典中的所有应聘渠道
            _this.$.get(GLOBAL.serverUrl()+'/customer/getRecruitChannel').then(function(resp){
                _this.rChannelArr= resp;
            });
            //获取邀约人
            _this.$.get(GLOBAL.serverUrl()+'/customer/getIntroducer').then(function(resp){
                _this.introducersArr= resp;
            });
        },
        methods:{
            handleSubmit(name){
                let _this = this;
                _this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success("表单验证成功!");
                        //异步提交数据
                        this.$.post(GLOBAL.serverUrl()+"/customer/addCustomerInfo",_this.customerForm,function(resp){
                            if(resp.code === 600){
                                _this.success(resp.msg);
                                _this.handleReset(name);
                                //1秒后跳转到主页
                                setTimeout(function(){
                                    _this.$router.push('/zixun/customer');
                                },1000);
                            }else{
                                _this.error(resp.msg);
                            }
                        });
                    }else {
                        this.$Message.error("表单验证失败!");
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
