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
                <Button size="small" type='primary'  icon="plus" >添加</Button>
                <Select size='small' v-model="searchCondition" style="width:200px" placeholder='请选择搜索条件!'>
                    <Option v-for="item in conditionVlueas" :value="item.value" :key="item">{{ item.label }}</Option>
                </Select>
                <Input size="small"  placeholder="请输入搜索值!" style="width:200px;"></Input>
                <Button size="small" type="primary" icon="search">搜索</Button>
                <Button size="small" type="warning" icon="loop" @click="refresh">刷新</Button>
            </div>
            <router-view></router-view>
            <Table  size='small' :highlight-row='true' :border='true' :columns="customerColumn" :data="customerData">
                
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
                    {title:'客户名称',key:'realName'},
                    {title:'性别',key:'sexMsg'},
                    {title:'电话号码',key:'tel'},
                     {title:'级别',key:'customerLevelMsg'},
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
                                        this.follow(params.index)//授权
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
                                        this.remove(params.index)
                                    }
                                },
                                nativeOn:{
                                    mouseenter:()=>{
                                        this.$Message.info('删除客户信息!');
                                    }
                                }
                            })
                        ]);
                    }
                }
                ],
                customerData:[],
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
                console.log(resp);
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
                alert('哈哈');
            },
            follow:function(index){

            },
            edit:function(index){

            },
            remove (index) {//删除数据
                var _this = this;
                _this.$Modal.confirm({
                    title: '确认操作',
                    content: '<h2>是否删除该数据!</h2>',
                    loading: true,
                    onOk: () => {
                        var customerId = _this.customerData[index].customerId;
                        console.log(customerId);
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
            }
        }
    }
</script>