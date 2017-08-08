<style>
    .trace-wrap{
        margin: 0px 100px;
        border: 2px solid gray;
        border-radius:5px;
        width:980px;
        height:400px;
    }
    .trace-record{
        width:100%;
        height:150px;
        border-bottom:1px solid #DDDDDD;
        overflow-y:scroll;
    }
</style>
<template>
    <div style="min-width:1150px;">
        <Form ref="customerForm" :model="customerForm" :label-width="100" inline>
            <Input type="hidden" v-model="customerForm.customerId"></Input>
            <Form-item label="用户名：" prop="realName">
                <Input v-model="customerForm.realName" placeholder="暂无该学员此项信息" readonly></Input>
            </Form-item>
            <Form-item label="性别：" prop="sex" style="width:262px">
                <Radio-group v-model="customerForm.sex" style="pointer-events:none;">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Radio label="1"  >男</Radio>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Radio label="2" >女</Radio>
                </Radio-group>
            </Form-item>
            <Form-item label="年龄：" prop="age">
                <Input v-model="customerForm.age" placeholder="暂无该学员此项信息"readonly ></Input>
            </Form-item>
            <Form-item label="籍贯：" prop="nativePlace">
                <Input v-model="customerForm.nativePlace" placeholder="暂无该学员此项信息" readonly></Input>
            </Form-item>
            <Form-item label="电话：" prop="tel">
                <Input v-model="customerForm.tel" placeholder="暂无该学员此项信息" readonly></Input>
            </Form-item>
            <Form-item label="微信：" prop="wechatNo">
                <Input v-model="customerForm.wechatNo" placeholder="暂无该学员此项信息" readonly></Input>
            </Form-item>
            <Form-item label="QQ：" prop="qq">
                <Input v-model="customerForm.qq" placeholder="暂无该学员此项信息" readonly></Input>
            </Form-item>
            <Form-item label="学历：" style="width:263px" prop="educationBg">
                <Select v-model="customerForm.educationBg" placeholder="暂无该学员此项信息" style="pointer-events:none;">
                    <Option v-for="eBg in eBgArr" :value="eBg.id">{{eBg.name}}</Option>
                </Select>
            </Form-item>
            <Form-item label="毕业时间：" prop="graduateTime">
                <Input v-model="customerForm.graduateTime" placeholder="暂无该学员此项信息" readonly></Input>
            </Form-item>
            <Form-item label="毕业院校：" prop="graduteFrom">
                <Input v-model="customerForm.graduteFrom" placeholder="暂无该学员此项信息" readonly></Input>
            </Form-item>
            <Form-item label="专业：" prop="majorIn">
                <Input v-model="customerForm.majorIn" placeholder="暂无该学员此项信息" readonly></Input>
            </Form-item>
            <Form-item label="工作年限：" prop="workAge">
                <Input v-model="customerForm.workAge" placeholder="暂无该学员此项信息" readonly></Input>
            </Form-item>
            <Form-item label="工作经历：" prop="workExperience">
                <Input v-model="customerForm.workExperience" placeholder="暂无该学员此项信息" readonly></Input>
            </Form-item>
            <Form-item label="职业：" prop="job">
                <Input v-model="customerForm.job" placeholder="暂无该学员此项信息" readonly></Input>
            </Form-item>
            <Form-item label="培训经历：" prop="educateExperience">
                <Input v-model="customerForm.educateExperience" placeholder="暂无该学员此项信息" readonly></Input>
            </Form-item>
            <Form-item label="用户状态：" style="width:263px" prop="customerState">
                <Select v-model="customerForm.customerState" placeholder="暂无该学员此项信息" style="pointer-events:none;">
                    <Option v-for="cState in cStateArr" :value="cState.id" v-text="cState.name"></Option>
                </Select>
            </Form-item>
            <Form-item label="用户级别：" style="width:263px" prop="暂无该学员此项信息">
                <Select v-model="customerForm.customerLevel" placeholder="暂无该学员此项信息" style="pointer-events:none;">
                    <Option v-for="cLevel in cLevelArr" :value="cLevel.id" v-text="cLevel.name"></Option>
                </Select>
            </Form-item>
            <Form-item label="目标技能：" style="width:263px" prop="targetSkill">
                <Select v-model="customerForm.targetSkill" placeholder="暂无该学员此项信息" style="pointer-events:none;">
                    <Option v-for="tSkill in tSkillArr" :value="tSkill.id" v-text="tSkill.name"></Option>
                </Select>
            </Form-item>
            <Form-item label="咨询师：" style="width:263px" prop="userId">
                <Select v-model="customerForm.userId" placeholder="暂无该学员此项信息" style="pointer-events:none;">
                    <Option v-for="uId in uIdArr" :value="uId.userId" v-text="uId.name" ></Option>
                </Select>
            </Form-item>
            <Form-item label="关单人：" style="width:263px" prop="guandan">
                <Select v-model="customerForm.guandan" placeholder="暂无该学员此项信息" style="pointer-events:none;">
                    <Option v-for="gd in gdArr" :value="gd.userId" v-text="gd.name"></Option>
                </Select>
            </Form-item>
            <Form-item label="会销：" style="width:263px" prop="isMarket">
                <Radio-group v-model="customerForm.isMarket" style="pointer-events:none;">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Radio label="1" >是</Radio>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Radio label="2" >否</Radio>
                </Radio-group>
            </Form-item>
            <Form-item label="应聘渠道：" style="width:263px" prop="recruitChannel">
                <Select v-model="customerForm.recruitChannel" placeholder="暂无该学员此项信息" style="pointer-events:none;">
                    <Option v-for="rChannel in rChannelArr" :value="rChannel.id" v-text="rChannel.name"></Option>
                </Select>
            </Form-item>
            <Form-item label="邀约人：" style="width:263px" prop="introducer">
                <Select v-model="customerForm.introducer" placeholder="暂无该学员此项信息" style="pointer-events:none;">
                    <Option v-for="introduce in introducersArr" :value="introduce.userId" v-text="introduce.name" ></Option>
                </Select>
            </Form-item>
            <div>
                <Form-item label="备注：" prop="memo" style="width:1085px">
                    <Input type="textarea" :autosize="{minRows:5,maxRows:10}" v-model="customerForm.memo" placeholder="暂无该学员此项信息" readonly></Input>
                </Form-item>
            </div>
        </Form>
        <div class="trace-wrap">
            <div class="trace-record"> 
                <p v-text="tipMsg" style="padding-left:20px;margin-top:10px;"></p>
                <ol>
                    <li v-for="traceRecord in traceRecords" style="margin:10px 30px;font-size:14px;">
                        <p>创建时间：{{traceRecord.recordDate}}</p>
                        <p>{{traceRecord.content}}</p>
                    </li>
                </ol>
            </div>
            <p style="width:100%;height:38px;padding-left:40px;line-height:38px;border-bottom:1px solid #DDDDDD;font-size:16px;">请输入跟进信息......</p>
            <Input type="textarea" :autosize="{minRows:7,maxRows:7}" v-model="customerTraceRecord.content" placeholder="请输入跟进信息......"></Input>
            <div style="margin: 15px 20px;">
                <Button size='small' type="primary" @click="submit">添加</Button>
                <Button size='small' type="warning" @click="reset" style="margin-left: 8px">重置</Button>
                <router-link to="/zixun/customer">
                    <Button size='small' type="ghost" style="margin-left: 8px">返回</Button>
                </router-link>
            </div>
            
        </div>
    </div>
</template>
<script>
    import GLOBAL from '../GLOBAL.vue';
    export default {
        //组件的data必须是函数
        data() {
            return {
                customerForm:{
                    customerId:'',
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
                    guandan:'',//验证
                    isMarket:'',//验证
                    recruitChannel:'',
                    introducer:'',
                    memo:''
                },
                customerTraceRecord:{
                    customerId:0,
                    userId:0,
                    content:''
                },
                eBgArr:[],//学历列表
                cStateArr:[],//用户状态列表
                cLevelArr:[],//用户级别列表
                tSkillArr:[],//目标技能列表
                uIdArr:[],//咨询师列表
                gdArr:[],//关单人列表
                rChannelArr:[],//应聘渠道列表
                introducersArr:[],//邀约人列表
                traceRecords:[],//学员跟进信息
                tipMsg:''
            }
        },
        mounted:function() {
            //当页面加载时，异步获取下拉列表中所需要的数据
            let customerId = this.$route.query.customerId;
            let _this = this;
            _this.$.get(GLOBAL.serverUrl()+'/customer/getCustomerInfoById?customerId='+customerId,function(resp){
                _this.customerForm = resp.customerInfo;
                _this.customerForm.customerLevel = resp.customerLevel;
                _this.customerForm.targetSkill = resp.targetSkill;
            });
            _this.$.get(GLOBAL.serverUrl()+'/customer/getTraceRecordsByCusId?customerId='+customerId,function(resp){
                // console.log(resp.length);
                if(resp.length === 0){
                    _this.tipMsg = "该学员暂无跟进记录!";
                }else{
                    for(var i=0;i<resp.length;i++){
                        resp[i].recordDate = new Date(resp[i].recordDate).toLocaleString();
                    }
                    _this.traceRecords = resp;
                    console.log(_this.traceRecords);
                }
            });
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
            //获取所有关单人
            _this.$.get(GLOBAL.serverUrl()+'/customer/getGuanDan').then(function(resp){
                _this.gdArr= resp;
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
            submit:function(){
                let _this = this;
                this.customerTraceRecord.customerId = this.customerForm.customerId;
                this.customerTraceRecord.userId = this.customerForm.userId;
                if(_this.customerTraceRecord.content === ''){
                    _this.$Message.error("添加的跟进信息不能为空!");
                }else{
                    _this.$.post(GLOBAL.serverUrl()+'/customer/addCustomerTraceRecord',_this.customerTraceRecord).then(function(resp){
                        if(resp.code === 600){
                            _this.success(resp.msg);
                            _this.reset();
                            //1秒后跳转到主页
                            setTimeout(function(){
                                _this.$router.push('/zixun/customer');
                            },1000);
                        }else{
                            _this.error(resp.msg);
                        }
                    });
                }
            },
            reset:function(){
                this.customerTraceRecord.content = '';
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
