<style>
    .warp{
        width:500px;
        height:600px;
        margin: 50px auto;
    }
</style>
<template>
    <div class="warp">
        <Form ref="studentForm" :rules="studentRule" :model="studentForm" :label-width="100" inline>
            <Input type="hidden" v-model="studentForm.customerId"></Input>
            <Form-item label="学生姓名：" style="width:350px" prop="studentName">
                <Input v-model="studentForm.studentName" readonly></Input>
            </Form-item>
            <Form-item label="班级：" prop="studentClass" style="width:350px">
                <Select v-model="studentForm.studentClass" placeholder="请选择班级!">
                    <Option v-for="clazz in classList" :value="clazz.classId" v-text="clazz.classname"></Option>
                </Select>
            </Form-item>
            <Form-item label="贷款类型：" prop="studentStatus" style="width:350px">
                <Select v-model="studentForm.studentStatus" placeholder="请选择贷款类型!">
                    <Option v-for="status in statusList" :value="status.name" v-text="status.name"></Option>
                </Select>
            </Form-item>
            <Form-item label="日期：" prop="studentintime" style="width:350px">
                <Date-picker type="date" v-model="studentForm.studentintime" confirm placeholder="请选择贷款日期!(2017-01-01)" style="width: 250px"></Date-picker>
            </Form-item>
            <Form-item label="备注：" prop="studentdes" style="width:350px">
                    <Input type="textarea" :autosize="{minRows:5,maxRows:10}" v-model="studentForm.studentdes" placeholder="请输入备注"></Input>
            </Form-item>
            <Form-item>
                <Button size='small' @click="addStudentinfo('studentForm')" type="primary" >保存</Button>
                <router-link to="/zixun/customer">
                    <Button size='small' type="ghost" style="margin-left: 10px">返回</Button>
                </router-link>
            </Form-item>
        </Form>
    </div>
</template>
<script>
    import GLOBAL from '../GLOBAL.vue';
    export default {
        data(){
            const validateStudentClass = (rule,value,callback) => {
                if(value === 0){
                    callback(new Error("请选择班级!"));
                }else{
                    callback();
                }
            }
            const validateStudentStatus = (rule,value,callback) => {
                if(value !== ""){
                    callback();
                }else{
                    callback(new Error("请选择贷款类型!"));
                }
            }
            const validateStudentintime = (rule,value,callback) =>{
                if (value === "" ){
                    callback(new Error("请选择日期!"));
                }else{
                    callback();
                }
            }
            return {
                studentForm:{
                    customerId:0,
                    studentName:'',
                    studentClass:0,
                    studentStatus:0,
                    studentintime:'',
                    studentdes:''
                },
                studentRule:{
                    studentClass:[
                        {validator:validateStudentClass,required:true,trigger:'change'}
                    ],studentStatus:[
                        {validator:validateStudentStatus,required:true,trigger:'change'}
                    ],studentintime:[
                        {validator:validateStudentintime,required:true,trigger:'blur'}
                    ]
                },
                classList:[],
                statusList:[],
                
            }
        },
        mounted:function(){
            let _this=this;
            _this.studentForm.customerId = this.$route.query.customerId;
            _this.studentForm.studentName = this.$route.query.studentName;
            _this.$.get(GLOBAL.serverUrl()+'/classinfo/getClassinfo',function(resp){
                _this.classList = resp;
            });
            this.$.get(GLOBAL.serverUrl()+'/customer/getStudentStatus',function(resp){
                _this.statusList = resp;
            });
        },
        methods:{
            addStudentinfo(name){
                let _this=this;
                // _this.studetnForm.studentintime.toLocaleString();
                _this.studentForm.studentintime = _this.studentForm.studentintime.getFullYear()+"-"+_this.studentForm.studentintime.getMonth()+"-"+_this.studentForm.studentintime.getDate();
                _this.$refs[name].validate((valid) => {
                    if(valid){
                        _this.$Message.success("表单验证成功!");
                        _this.$.post(GLOBAL.serverUrl()+'/student/addStudentinfo',_this.studentForm,function(resp){
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
                    }else{
                        _this.$Message.error("表单验证失败!");
                    }
                })
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