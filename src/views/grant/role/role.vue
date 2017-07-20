<style>
.toolbar {
    padding: 10px;
    padding-top: 0px;
}
</style>

<template>
    <div id="role">
        <div class="toolbar">
            <Button size='small' type="primary" @click="addRole" icon="plus">添加</Button>
            <Button size='small' type="success" icon="android-settings">批量授权</Button>
            <Input  size="small" v-model="roleName" v-on:input="dynamicSearch(roleName)" placeholder="请输入角色名搜索!" style="width:200px;"></Input>
            <Button size="small" type="primary" @click="search" icon="search">搜索</Button>
            <Button size="small" type="warning" @click="refresh" icon="ios-refresh-empty">刷新</Button>
        </div>
        <!--<Button v-on:click="getData" type="default" icon="plus">异步获取数据</Button>-->
        <Table border stripe  :columns="roleColumn" :highlight-row="true" :data="roleData"></Table>
        <div style="margin: 10px;">
            <div style="float: right;">
                <Page :total="roleTotal" @on-change="changePage" @on-page-size-change="changeSize" placement="top" show-sizer  show-elevator
                 :page-size="15"  :page-size-opts="[5,10,15,30,50]" ></Page>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            roleColumn: [
                {type: 'selection', width: 60, align: 'center' },
                {
                    title: '角色',
                     key: 'role',
                     width:100
                },
                {
                    title:'可用',
                    key:'available',
                    align:'center',
                    width:70,
                    render:(h,params) =>{
                        let iconColor;
                        let icon;
                        if(params.row.available =='0'){//禁用
                            icon = 'close-circled';
                            iconColor='red';
                        }else if(params.row.available =='1'){//启用
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
                    title:'录入人',
                    key:'createByMsg',
                    align:'center',
                    width:100
                },
                {
                    title:'录入时间',
                    key:'createTime',
                    render:(h,params) =>{
                        //时间格式化
                        var date = '暂无';
                        if(params.row.createTime  != null){
                           date  = new Date(parseInt(params.row.createTime)).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ")+"  ";
                        }
                        return h('div',[
                            h('Icon',{
                                props:{
                                    type:'ios-time-outline'
                                }
                            }),
                            h('span',{

                            },date)
                            
                        ]);
                    },
                    width:180
                },
                {
                    title:'修改人',
                    key:'updateByMsg',
                    width:100,
                    align:'center'
                },
                {
                    title:'修改时间',
                    key:'updateTime',
                    render:(h,params) =>{
                        //时间格式化
                        var date = '暂无';
                        if(params.row.updateTime  != null){
                            date  = new Date(parseInt(params.row.updateTime)).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ")+"  ";
                        }
                        return h('div',[
                            h('Icon',{
                                props:{
                                    type:'ios-time-outline'
                                }
                            }),
                            h('span',{

                            },date)
                            
                        ]);
                    },
                    width:180
                },
                {
                    title:'描述',
                    key:'description',
                    ellipsis:true // 超出部分使用省略号替代
                },{
                    title:'操作',
                    key:'operate',
                    width:150,
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
                            }),
                            h('Button', {
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
                                        this.$Message.info('角色授权!');
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
                                        this.etitRole(params.index);//修改数据
                                    }
                                },
                                nativeOn:{
                                    mouseenter:()=>{
                                        this.$Message.info('修改角色!');
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
                                        this.remove(params.index);//删除数据
                                    }
                                },
                                nativeOn:{
                                    mouseenter:()=>{
                                        this.$Message.info('删除角色!');
                                    }
                                }
                            })
                        ]);
                    }
                }
            ],
            roleData:[],
            roleTotal:0,
            pageSize:15,
            currentPage:1,
            roleName:''
        }
        
    },
    watch:{//监听属性值的变化
            roleName:{
                 handler:(val,oldVal)=>{
                    
                }
            }
    },
    mounted: function () {
        this.getAjaxData(0,this.pageSize,this.roleName);
    },
   
    methods: {
       getData(){
           
       },
       //切换页面
        changePage(page){
               this.getAjaxData(page,this.pageSize,this.roleName);
               this.currentPage = page;
        },
        changeSize(size){//当改变每页显示条数时，把size保存在this中
            this.pageSize = size;
            this.getAjaxData(this.currentPage,size,this.roleName);
        },
        getAjaxData(limit,size,roleName){
            var _this = this;
            _this.$Message.loading({
                    content: '正在拼命加载数据...',
                    top:300,
                    duration: 30
                });
            this.$axios.get('http://localhost:8090/role/getRoleList?limit='+limit+'&size='+size+"&roleName="+roleName).then(function(resp){  
                _this.roleData = resp.data.rows;
                _this.roleTotal = resp.data.total;
                _this.$Message.destroy();
            }); 
        },
        addRole(){//添加角色
            //跳转到添加角色页面
            this.$router.push('/manager/role/addRole');
        },
        show(index){//展示数据
            var avi = '';
            if(this.roleData[index].available == '0'){
                avi ='禁用';
            }else{
                avi = '启用';
            }
            var createTime = '暂无';
            if(this.roleData[index].createTime != null){
                createTime =new Date(parseInt(this.roleData[index].createTime)).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
            }

            var updateTime = '暂无';
            if(this.roleData[index].updateTime!=null){
               updateTime = new Date(parseInt(this.roleData[index].updateTime)).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
            }
            var updateBy = this.roleData[index].updateByMsg;
            updateBy = (updateBy ==null)?'暂无':updateBy;
            var createBy = this.roleData[index].createByMsg;
            createBy = (createBy == null)?'暂无':createBy;
            this.$Modal.info({
                title: '角色信息',
                content: 
                `<p>角色:${this.roleData[index].role}</p>
                 <p>可用:`+avi+`</p>
                 <p>录入人:`+createBy+`</p>
                 <p>录入时间:`+createTime+`</p>
                 <p>修改人:`+updateBy+`</p>
                 <p>修改时间:`+updateTime+`</p>
                 <p>描述:${this.roleData[index].description}</p>
                 `
            });
        },
        grant(index){

        },
        etitRole(index){
            //跳转到角色修改页
            this.$router.push({path:'/manager/role/editRole',query:{roleId:this.roleData[index].id}});
        },
        remove(index){
            var _this = this;
            _this.$Modal.confirm({
                title: '确认操作',
                content: '<h2>是否删除该数据!</h2>',
                loading: true,
                onOk: () => {
                    let roleId = _this.roleData[index].id;
                    //异步删除数据
                    _this.$axios.get('http://localhost:8090/role/removeRole?roleId='+roleId).then(function(resp){
                        console.log(resp);
                        if(resp.data.code === 600){//删除成功
                            _this.$Modal.remove();//移除模态框
                            _this.success(resp.data.msg);
                            _this.roleData.splice(index, 1);//客户端删除，减少数据库查询
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
        search(){//搜索用户
           // console.log(this.roleName);
            this.getAjaxData(0,this.pageSize,this.roleName);
        },
        refresh(){//刷新页面
            this.roleName='';
            this.getAjaxData(0,this.pageSize,'');
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
        dynamicSearch(roleName){
           var _this = this;
           setTimeout(function(){
               _this.getAjaxData(0,_this.pageSize,roleName);
           },2000);
        }
    }
}
</script>

