<style>
.toolbar {
    padding: 10px;
    padding-top: 0px;
}
</style>

<template>
    <div id="user">
        <div class='toolbar'>
            <!--跳转到添加页面-->
            <router-link to="/manager/user/addUser" icon="plus">
                <Button size="small" type='primary'  icon="plus" >添加</Button>
            </router-link>
            <Button size="small" type="success" @click="batchRemove" icon="close-circled">批量删除</Button>
            <Input size="small" v-model="employeeName" v-on:input="dynamicSearch(employeeName)" placeholder="请输入姓名搜索!" style="width:200px;"></Input>
            <Button size="small" type="primary" @click="search" icon="search">搜索</Button>
            <Button size="small" type="warning" icon="loop" @click="refresh">刷新</Button>
            <!--模态框-->
           
        </div>
        <!--路由视图-->
        <router-view></router-view>
        <Table  size='small' :highlight-row='true' :border='true' :columns="employeeColumn" :data="employeeData"   @on-selection-change="selectChange">
         
        </Table>
       <div style="margin: 10px;">
            <div style="float: right;">
                <Page :total="userTotal" @on-change="changePage" @on-page-size-change="changeSize" placement="top" show-sizer  show-elevator
                 :page-size="15"  :page-size-opts="[5,10,15,30,50,100]"></Page>
            </div>
        </div>
    </div>
</template>
<script>
import global from '../../GLOBAL.vue';
export default {
    data() {
        return {
            employeeColumn: [
                {
                    type: 'selection',
                    width: 60,
                    key: 'userId',
                    align: 'center'
                },
                {
                    title: '姓名',
                    key: 'name',
                    render: (h, params) => {
                        return h('div', [
                            h('Icon', {
                                props: {
                                    type: 'person'
                                }
                            }),
                            h('strong', params.row.name)
                        ]);
                    },
                    width:120
                },{
                    title:'微信号',
                    key:'wechatNo',
                    width:120
                },
                {
                    title: '性别',
                    key: 'gender',
                    width:70,
                    align:'center',
                    render: (h, params) => {
                        let genderIcon;
                        let genderIconColor;
                        if(params.row.gender === "1"){
                            genderIcon = "man";
                            genderIconColor = '#0099FF';
                        }else if(params.row.gender === "2"){
                            genderIcon = "woman";
                            genderIconColor = "deeppink";
                        }else{
                            genderIcon = 'help';
                            genderIconColor = 'orange';
                        }
                        return h('div', [
                            h('Icon', {
                                props: {
                                    type: genderIcon,
                                    size:17,
                                    color:genderIconColor
                                }
                            })
                        ]);
                    },
                },{
                    title:'电话号码',
                    key:'tel',
                    width:130
                },{
                    title:'启用',
                    key:'isLocked',
                    align:'center',
                    width:70,
                    render:(h,params) =>{
                        let iconColor;
                        let icon;
                        if(params.row.isLocked ==='0'){//启用
                             icon='checkmark-circled';
                             iconColor='green';
                        }else if(params.row.isLocked ==='1'){//禁用
                            icon = 'close-circled';
                            iconColor='red';
                        }
                        return h('Icon',{
                            props:{
                                type:icon,
                                size:16,
                                color:iconColor
                            }
                        });
                    }
                },{
                    title:'咨询师',
                    key:'isConsultant',
                    width:80,
                    align:'center',
                    render:(h,params) =>{
                        let iconColor;
                        let icon;
                        if(params.row.isConsultant ==='0'){//非咨询师
                            icon = 'close-circled';
                            iconColor='red';
                        }else if(params.row.isConsultant ==='1'){//咨询师
                             icon='checkmark-circled';
                             iconColor='green';
                        }
                        return h('Icon',{
                            props:{
                                type:icon,
                                size:16,
                                color:iconColor
                            }
                        });
                    }
                },{
                    title:'激活邮箱',
                    key:'isEmailActive',
                    width:90,
                    align:'center',
                    render:(h,params) =>{
                        let iconColor;
                        let icon;
                        if(params.row.isEmailActive ==='0'){//非咨询师
                            icon = 'close-circled';
                            iconColor='red';
                        }else if(params.row.isEmailActive ==='1'){//咨询师
                             icon='checkmark-circled';
                             iconColor='green';
                        }
                        return h('Icon',{
                            props:{
                                type:icon,
                                size:16,
                                color:iconColor
                            }
                        });
                    }
                },
                {
                    title: '邮箱',
                    key: 'email',
                    width:180,
                    ellipsis:true,
                },{
                    title:'角色',
                    key:'roleName',
                    width:90
                },
                 {
                    title: '操作',
                    key: 'action',
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
                                        this.$Message.info('显示数据!');
                                    }
                                }
                            }),h('Button', {//角色授权
                                props: {
                                    type: 'success',
                                    size:'small',
                                    icon:'android-settings',
                                    shape:"circle"
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.grant(params.index)//授权
                                    }
                                },
                                nativeOn:{
                                    mouseenter:()=>{
                                        this.$Message.info('授予角色!');
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
                                        this.editUser(params.index);//修改数据
                                    }
                                },
                                nativeOn:{
                                    mouseenter:()=>{
                                        this.$Message.info('修改用户!');
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
                                        this.$Message.info('删除用户!');
                                    }
                                }
                            })
                        ]);
                    }
                }
            ],
            employeeData: [],
            userTotal:0,
            pageSize:15,
            currentPage:1,
            employeeName:'',
            ids:[]
        }
    },
    watch:{//监听属性值的变化
            employeeName:{
                 handler:(val,oldVal)=>{
                    
                }
            },
            ids:{
                 handler:(val,oldVal)=>{
                    
                }
            }
    },
    mounted:function(){
        this.$Message.config({
            top: 85
        }); 
        this.getAjaxData(0,this.pageSize,this.employeeName);
    },
    methods: {
        //异步获取表格数据
        getAjaxData(limit,size,employeeName){
            let _this = this;
            _this.$Message.loading({
                    content: '正在拼命加载数据...',
                    top:300,
                    duration: 30
                });
            _this.$axios.get(global.serverUrl()+'/employee/getEmployeeList?limit='+limit+"&size="+size+"&employeeName="+employeeName).then(function(resp){
                _this.$Message.destroy();
                _this.employeeData = resp.data.rows;
                _this.userTotal = resp.data.total;

            });
        },
        //展示选中行的数据
       show (index) {//显示选中的数据
            this.$Modal.info({
                title: '用户信息',
                content: `<h3>姓名:${this.employeeData[index].name}</h3>
                 <h3>微信号:${this.employeeData[index].wechatNo}</h3>
                 <h3>电话号码:${this.employeeData[index].tel}</h3>
                 <h3>邮箱:${this.employeeData[index].email}</h3>
                 <h3>角色名称:${this.employeeData[index].roleName}</h3>`
            });
        },
        //删除选中行的数据
        remove (index) {//删除数据
            let _this = this;
            _this.$Modal.confirm({
                title: '确认操作',
                content: '<h2>是否删除该数据!</h2>',
                loading: true,
                onOk: () => {
                    console.log(index);
                    // this.$Modal.remove();
                        //this.$Message.info('异步关闭了对话框');
                    let userId = _this.employeeData[index].userId;
                    console.log(userId);
                    //异步删除数据
                    _this.$axios.get(global.serverUrl()+'/employee/removeEmployee?userId='+userId).then(function(resp){
                        if(resp.data.code === 600){//删除成功
                            _this.$Modal.remove();//移除模态框
                            _this.success(resp.data.msg);
                            _this.employeeData.splice(index, 1);//客户端删除，减少数据库查询
                        }else{//删除失败
                            _this.error(resp.data.msg);
                        }
                    });
                },
                onCancel: () => {
                    _this.$Message.info('取消删除数据!');
                }
            });
          
           // _this.employeeData.splice(index, 1);
        },
        //批量删除选中行的数据
        batchRemove () {
            let _this = this;
            _this.$Modal.confirm({
                title: '确认操作',
                content: '<h2>是否删除勾选的所有数据!</h2>',
                loading: true,
                onOk: () => {
                    // console.log(index);
                    // this.$Modal.remove();
                        //this.$Message.info('异步关闭了对话框');
                    let ids = _this.ids;
                    console.log(ids);
                    // this.$Message.info('hello');
                    // 异步删除数据
                    _this.$axios.get(global.serverUrl()+'/employee/batchRemoveEmployee?ids='+ids).then(function(resp){
                        if(resp.data.code === 600){//删除成功
                            _this.$Modal.remove();//移除模态框
                            _this.success(resp.data.msg);
                            // _this.employeeData.splice(index, 1);//客户端删除，减少数据库查询
                            _this.refresh();
                        }else{//删除失败
                            _this.error(resp.data.msg);
                        }
                    });
                },
                onCancel: () => {
                    _this.$Message.info('取消删除数据!');
                }
            });
          
           // _this.employeeData.splice(index, 1);
        },
        editUser(index){//修改用户数据
           let userId = this.employeeData[index].userId;
           //跳转到修改页
           //{path:'/zixun/register/editUser',query: {customerName:customer.realName}}
           this.$router.push({path:'/manager/user/editUser',query:{userId:userId}});
        },
        grant(index){//用户授予角色
            alert('角色授权');
        },
        //切换页面
        changePage(page){
               this.getAjaxData(page,this.pageSize,this.employeeName);
               this.currentPage = page;
        },
        changeSize(size){//当改变每页显示条数时，把size保存在this中
            this.pageSize = size;
        },
        selectChange(selection ,row ,ids){
            // this.$Message.info(selection);
            this.ids = [];
             ids = this.ids;
            selection.forEach(function(item,index){  
            //    console.log(item.userId);
            //    console.log(index);
               ids.push(item.userId);
              
            });         
        //    alert(ids);
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
            this.getAjaxData(this.currentPage,this.pageSize,'');
        },
        search(){//搜索用户
        //    console.log(this.employeeName);
            this.getAjaxData(0,this.pageSize,this.employeeName);
        }
    }
}
</script>