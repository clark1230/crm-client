<style scope>
.toolbar {
    padding: 10px;
    padding-top: 0px;
}
</style>
<template>
<div id="customer">
            <div class='toolbar'>
            </div>
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
                    {
                        title:'性别',
                        key:'sex',
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
                    {title:'级别',key:'customerLevelMsg'},
                    {title:'咨询师',key:'userIdMsg'},
                    {title:'关单人',key:'guandaMsg'},
                    {title:'状态',key:'customerStateMsg'},
                    {title:'邀约人',key:'introducerMsg'},
                    {title:'渠道',key:'recruitChannelMsg'},
                    {title: '所属公司',key: 'companyIdMsg',width:140}
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
                _this.$axios.get(global.serverUrl()+'/customer/getInClassCustomer?offset='+offset+"&limit="+limit).then(function(resp){
                    _this.$Message.destroy();
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
            }
        }
    }
</script>