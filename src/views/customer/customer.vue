<style scope>
.toolbar {
    padding: 10px;
    padding-top: 0px;
}
</style>
<template>
<div id="customer">
            <div class='toolbar'>
                <!--跳转到添加页面-->
                <router-link to="/zixun/customer/addCustomer">
                    <Button size="small" type='primary'  icon="person-add" >添加</Button>
                </router-link>
                <Button size="small" type='success' @click="putInClass" icon="android-people" >学员进班</Button>
                <Button size="small" @click="removeAll" type='error'  icon="trash-a" >回收站</Button>
                <Select size='small' v-model="searchCondition" style="width:200px" placeholder='请选择搜索条件!'>
                    <Option v-for="item in conditionVlueas" :value="item.value" :key="item">{{ item.label }}</Option>
                </Select>
                <Input size="small"  placeholder="请输入搜索值!" style="width:200px;"></Input>
                <Button size="small" type="primary" icon="search">搜索</Button>
                <Button size="small" type="warning" icon="loop" @click="refresh">刷新</Button>
            </div>
            <Table  size='small' @on-selection-change="getCustomerIds" :highlight-row='true' :border='true' :columns="customerColumn" :data="customerData">
                
            </Table>
             <div style="margin: 10px;">
            <div style="float: right;">
                <Page :total="userTotal" @on-change="changePage" @on-page-size-change="changeSize" placement="top" show-sizer  show-elevator
                 :page-size="15"  :page-size-opts="[5,10,15,30,50]" ></Page>
            </div>
        </div>
    </div>
</template>

<script>
    import global from '../GLOBAL.vue';
    export default{
        data(){
            return {
                customerColumn:[
                    {
                        type:'selection',
                        width:60,
                        align:'center'
                    },
                    {title:'客户名称',key:'realName'},
                    {
                        title:'性别',
                        key:'sex',
                        width:80,
                        align:'center',
                        render: (h, params) => {
                            let sexIcon;
                            let sexIconColor;
                            if(params.row.sex === 1){
                                sexIcon = "man";
                                sexIconColor = '#0099FF';
                            }else if(params.row.sex === 2){
                                sexIcon = "woman";
                                sexIconColor = "deeppink";
                            }else{
                                sexIcon = 'help';
                                sexIconColor = 'orange';
                            }
                            return h('div', [
                                h('Icon', {
                                    props: {
                                        type: sexIcon,
                                        size:17,
                                        color:sexIconColor
                                    }
                                })
                            ]);
                        }
                    },
                    {title:'电话号码',key:'tel'},
                    {title:'级别',width:80,key:'customerLevelMsg'},
                    {title:'咨询师',key:'userIdMsg'},
                    {title:'关单人',key:'guandaMsg'},
                    {title:'状态',key:'customerStateMsg'},
                    {title:'邀约人',key:'introducerMsg'},
                    {title:'渠道',key:'recruitChannelMsg'},
                    {
                    title: '操作',
                    key: 'action',
                    width:160,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size:'small',
                                    icon:'ios-search-strong',
                                    shape:"circle"
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.show(params.index)//展示数据
                                    }
                                },
                                nativeOn:{
                                    mouseenter:()=>{
                                        this.$Message.info('显示详细信息!');
                                    }
                                }
                            }),
                            h('Button', {
                                props: {
                                    type: 'warning',
                                    icon:'edit',
                                    size:'small',
                                    shape:"circle"
                                },
                                style:{
                                    marginRight:'5px'
                                },
                                on: {
                                    click: () => {
                                        this.edit(params.index);//修改数据
                                    }
                                },
                                nativeOn:{
                                    mouseenter:()=>{
                                        this.$Message.info('修改客户信息!');
                                    }
                                }
                            }),h('Button', {//
                                props: {
                                    type: 'success',
                                    size:'small',
                                    icon:'ios-email-outline',
                                    shape:"circle"
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.follow(params.row.customerId)//授权
                                    }
                                },
                                nativeOn:{
                                    mouseenter:()=>{
                                        this.$Message.info('跟进信息!');
                                    }
                                }
                            }),
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size:'small',
                                    icon:'trash-a',
                                        shape:"circle"
                                },
                                on: {
                                    click: () => {
                                        this.remove(params.row.customerId)
                                    }
                                },
                                nativeOn:{
                                    mouseenter:()=>{
                                        this.$Message.info('丢进回收站!');
                                    }
                                }
                            })
                        ]);
                    }
                }
                ],
                customerData:[],
                customerIds:[],
                studentName:'',
                userTotal:0,
                pageSize:15,
                currentPage:1,
                searchCondition:'',
                conditionVlueas:[
                    {value:'realName',label:'姓名'},
                    {value:'userId',label:'咨询师'},
                    {value:'customerLevel',label:'客户级别'},
                    {value:'customerState',label:'状态'},
                    {value:'introducer',label:'邀约人'},
                    {value:'5',label:'渠道'}
                ]


            }
        },
        mounted:function(){
            this.getAjaxData(0,this.pageSize);
        },
        methods:{
            //异步获取表格数据
            getAjaxData(offset,limit){
                let _this = this;
                _this.$Message.loading({
                        content: '正在拼命加载数据...',
                        top:300,
                        duration: 30
                    });
                _this.$axios.get(global.serverUrl()+'/customer/getData?offset='+offset+"&limit="+limit).then(function(resp){
                    _this.$Message.destroy();
                    //  console.log(resp);
                    _this.customerData = resp.data.rows;
                    _this.userTotal= resp.data.total;

                });
            },
            //切换页面
            changePage(page){
                this.getAjaxData(page,this.pageSize);
                this.currentPage = page;
            },
            changeSize(size){//当改变每页显示条数时，把size保存在this中
                this.getAjaxData(0,size);
                this.pageSize = size;
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
            },
            refresh(){  //点击刷新按钮时，刷新表格数据
                this.getAjaxData(this.currentPage,this.pageSize);
            },
            show:function(index){
                var lastTime = new Date(this.customerData[index].lastTime);
                this.$Modal.info({
                    title: '学员详细信息',
                    width: 500,
                    content: `<table>
                        <tr>
                            <td width="200px"><h3>姓名:${this.customerData[index].realName}</h3></td>
                            <td><h3>性别:${this.customerData[index].sex}</h3></td>
                        </tr>
                        <tr>
                            <td width="200px"><h3>电话号码:${this.customerData[index].tel}</h3></td>
                            <td><h3>微信号:${this.customerData[index].wechatNo}</h3></td>
                        </tr>
                        <tr>
                            <td width="200px"><h3>QQ号:${this.customerData[index].qq}</h3></td>
                            <td><h3>学历:${this.customerData[index].educationBgMsg}</h3></td>
                        </tr>
                        <tr>
                            <td width="200px"><h3>毕业时间:${this.customerData[index].graduateTime}</h3></td>
                            <td><h3>毕业院校:${this.customerData[index].graduateFrom}</h3></td>
                        </tr>
                        <tr>
                            <td width="200px"><h3>专业:${this.customerData[index].majorIn}</h3></td>
                            <td><h3>工作年限:${this.customerData[index].workAge}</h3></td>
                        </tr>
                        <tr>
                            <td width="200px"><h3>工作经历:${this.customerData[index].workExperience}</h3></td>
                            <td><h3>从事职业:${this.customerData[index].job}</h3></td>
                        </tr>
                        <tr>
                            <td width="200px"><h3>教育培训经历:${this.customerData[index].educateExperience}</h3></td>
                            <td><h3>学员状态:${this.customerData[index].customerStateMsg}</h3></td>
                        </tr>
                        <tr>
                            <td width="200px"><h3>学员级别:${this.customerData[index].customerLevelMsg}</h3></td>
                            <td><h3>目标技能:${this.customerData[index].targetSkillMsg}</h3></td>
                        </tr>
                        <tr>
                            <td width="200px"><h3>咨询师:${this.customerData[index].userIdMsg}</h3></td>
                            <td><h3>招聘渠道:${this.customerData[index].recruitChannelMsg}</h3></td>
                        </tr>
                        <tr>
                            <td width="200px"><h3>邀约人:${this.customerData[index].introducerMsg}</h3></td>
                            <td><h3>关单人:${this.customerData[index].guandaMsg}</h3></td>
                        </tr>
                        <tr>
                            <td colspan="2"><h3>最后跟进时间:${lastTime.toLocaleString()}</h3></td>
                        </tr>
                        <tr>
                            <td colspan="2"><h3>所属校区:${this.customerData[index].companyIdMsg}</h3></td>
                        </tr>
                        <tr>
                            <td colspan="2"><h3>备注:${this.customerData[index].memo}</h3></td>
                        </tr>
                    </table>`
                });
            },
            follow:function(customerId){
                this.$router.push({path:'/zixun/customer/showCustomer',query:{customerId:customerId}});
            },
            edit:function(index){
                let customerId = this.customerData[index].customerId;
                this.$router.push({path:'/zixun/customer/editCustomer',query:{customerId:customerId}});
            },
            getCustomerIds(selection){//获取到要批量丢进回收站的数据的所有ID
                let _this = this;
                _this.customerIds = new Array(selection.length);
                _this.studentName = selection[0].realName;
                for (var i = 0; i < selection.length;i++){
                    _this.customerIds[i] = selection[i].customerId;
                }
            },
            removeAll (){
                var _this = this;
                if(_this.customerIds.length === 0){
                    this.$Message.info("未选中数据！！！");
                }else{
                    _this.$Modal.confirm({
                        title: '确认操作',
                        content: '<h2>是否丢进回收站!</h2>',
                        loading: true,
                        onOk: () => {
                            // var customerId = _this.customerData[index].customerId;
                            //异步删除数据
                            _this.$axios.get(global.serverUrl()+'/customer/hideData?customerId='+_this.customerIds).then(function(resp){
                                if(resp.data.code === 600){//删除成功
                                    _this.$Modal.remove();//移除模态框
                                    _this.success(resp.data.msg);
                                _this.getAjaxData(_this.currentPage,_this.pageSize);
                                }else{//删除失败
                                    _this.error(resp.data.msg);
                                }
                            });
                        },
                        onCancel: () => {
                            _this.$Message.info('取消删除数据!');
                        }
                    });
                }
            },
            remove (customerId) {//删除数据
                // console.log(params);
                var _this = this;
                _this.$Modal.confirm({
                    title: '确认操作',
                    content: '<h2>是否丢进回收站!</h2>',
                    loading: true,
                    onOk: () => {
                        // var customerId = _this.customerData[index].customerId;
                        //异步删除数据
                        _this.$axios.get(global.serverUrl()+'/customer/hideData?customerId='+customerId).then(function(resp){
                            if(resp.data.code === 600){//删除成功
                                _this.$Modal.remove();//移除模态框
                                _this.success(resp.data.msg);
                               _this.getAjaxData(_this.currentPage,_this.pageSize);
                            }else{//删除失败
                                _this.error(resp.data.msg);
                            }
                        });
                    },
                    onCancel: () => {
                        _this.$Message.info('取消删除数据!');
                    }
                });
            },
            putInClass:function(){
                let _this = this;
                if(_this.customerIds.length > 1){
                    _this.$Message.error("所选数据大于1条!");
                }else if(_this.customerIds.length === 0){
                    _this.$Message.info("请选择要进班的学员!");
                }else{
                    _this.$router.push({path:'/zixun/customer/putInClass',query:{customerId:_this.customerIds[0],studentName:_this.studentName}});
                }
            }
        }
    }
</script>