<style scoped>
.layout {
  background-color: F5F7F9;
  border-radius: 5px;
}

.code-row-bg {
  background-color: lightgray;
}

.show {
  margin-left: 30px;
  margin-top: 6px;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}

.waitTime span {
  font-size: 15px;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}

/*客户等待列表样式*/

.wait-list {
  margin-left: 15px;
}

.wait-list-content {
  margin-top: -10px;
  margin-left: 15px;
  position: relative;
}

.wait-list-content:hover {
  background-color: #F5F7F9;
  cursor: pointer;
}

.wait-list-btn {
  position: absolute;
  right: 4px;
  top: 3px;
}
</style>

<template>
  <div id="register" class="layout">
    <h1 class="show">前台接待</h1>
    <Row type="flex" :gutter="35" justify="center" align="top">
      <Col span="8">
      <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
        <Form-item label="用户名" prop="realName">
          <Input type="text" v-model="formCustom.realName" placeholder="请输入姓名!"></Input>
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
          <Button size='small' type="primary" @click="handleSubmit('formCustom')">保存</Button>
          <Button size='small' type="ghost" @click="handleReset('formCustom')" style="margin-left: 8px">重置</Button>
        </Form-item>
      </Form>
      </Col>  
      <Col span="14">
      <Timeline class="waitTime">
        <Timeline-item color="green" v-for="(customer,item) in customers" >
          <Icon type="ios-timer" slot="dot"></Icon>
          <Alert class="wait-list-content">
            <span class="wait-list">
              <Icon type="android-person"></Icon>&nbsp;&nbsp;{{customer.realName}}&nbsp;&nbsp;&nbsp;
              <Icon type="ios-telephone"></Icon>&nbsp;{{customer.tel}}&nbsp;&nbsp;
              <span>
                <Icon type="clock"></Icon>&nbsp;&nbsp;{{customer.createTime}}&nbsp;&nbsp;
              </span>
              <Icon type="pin"></Icon>&nbsp;&nbsp;{{customer.realName}}&nbsp;&nbsp;
              <Icon type="ios-people"></Icon>&nbsp;&nbsp;{{customer.userIdMsg}}
          
            </span>
            <router-link :to="{path:'/register/editUser',query: {customerName:customer.realName}}" >
              <!--特别注意的地方，鼠标点击时回去数组的所有号，方便获取数据-->
              <Button @click="edit(item)" value=""  class="wait-list-btn" type="primary" size="small" icon="edit">修改</Button>
            </router-link>
            
          </Alert>
        </Timeline-item>
      </Timeline>
      </Col>
    </Row>
    <router-view></router-view>
  </div>
</template>
<script>

export default {
  data() {
    const validateRealName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户!'));
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
    //校验咨询师
    const validateUserId = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请选择咨询师'));
      } else {
        callback();
      }
    }

    return {
      formCustom: {  //表单数据
        realName: '',
        sex: '',
        tel: '',
        userId: '',
        companyId: 36
      },
      ruleCustom: {  //校验规则
        realName: [
          { validator: validateRealName, required: true, trigger: 'blur' }
        ],
        sex: [
          { validator: validateSex, required: true, trigger: 'blur' }
        ],
        tel: [
          { validator: validateTel, required: true, trigger: 'blur' }

        ],
        userId: [
          { validator: validateUserId, required: true, trigger: 'change' }
        ],

      },
      users: [],  //咨询师下拉列表
      customers: [],
      customerIndex:0
    }
  },
  methods: {
    handleSubmit(name) {//处理表单验证
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success('提交成功!');
          let _this = this;
          //提交表单数据
          this.$.post('http://localhost:8090/foreground/saveUser', this.formCustom).then(function (resp) {
            if (resp.code === 600) {
              _this.success(resp.msg);
              //处理成功后清空表单内容
              _this.handleReset(name);
              _this.getAjaxData();
            } else {
              _this.error(resp.msg);
            }

          }).catch(function (error) {
            this.error("服务器出错啦!");
          });
        } else {
          this.$Message.error('表单验证失败!');
        }
      });

    },
    handleReset(name) {//重置表单数据
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
    },
    edit(index) {//跳转到编辑
         //alert("hello kugou ");
         //获取选中数据
         this.customerIndex = index;
    },
   
    showTime(data) {
      let _this = this;
      var leftTime;
      var newDate = new Date();
      newDate.setTime(data);
      var currentDate = newDate;
      var date = new Date();
      var hour = Math.floor(Math.abs((date.getTime() - currentDate.getTime())) / 1000 / 60 / 60);
      var minute = Math.floor((Math.abs((date.getTime() - currentDate.getTime())) / 1000 / 60) - (hour * 60));
      var second = Math.floor((Math.abs(date.getTime() - currentDate.getTime())) / 1000 - (hour * 60 * 60 + minute * 60));
      if (hour < 10) {
        hour = "0" + hour;
      }
      if (minute < 10) {
        minute = '0' + minute;
      }
      if (second < 10) {
        second = '0' + second;
      }
      leftTime = hour + "小时" + minute + "分钟" + second + "秒";
      return leftTime;
    },
    changeTime(i) {
      let _this = this;
      //截取数据

      var dateTime = _this.customers[i].createTime;
      var hour = parseInt(dateTime.substr(0, dateTime.indexOf('小时')));
      var minute = parseInt(dateTime.substr(dateTime.indexOf('小时') + 2, dateTime.indexOf("分钟") - 4));
      var second = parseInt(dateTime.substr(dateTime.indexOf('分钟') + 2).replace('秒', ''));
      setInterval(function () {
        second++;
        if (second >= 59) {
          minute++;
          second = 0;
        }
        if (minute >= 59) {
          minute = 0;
          hour++;
        }

        _this.customers[i].createTime = ((hour < 10) ? '0' + hour : hour) + "小时" + ((minute < 10) ? '0' + minute : minute) + "分钟" + ((second < 10) ? '0' + second : second) + "秒";
      }, 1000);

    },
    getAjaxData() {
      let _this = this;
      //获取当前学员信息
      _this.$axios.get('http://localhost:8090/forground/getCurrentData?companyId=36').
        then(function (resp) {
          var userData = [];
          for (var i = 0; i < resp.data.length; i++) {
            var userJson = {};
            userJson.realName = resp.data[i].realName;
            userJson.userIdMsg = resp.data[i].userIdMsg;
            userJson.tel = resp.data[i].tel;
            //格式化日期
            var time = _this.showTime(resp.data[i].createTime);
            userJson.createTime = time;
            userData.push(userJson);//把数据添加到数组中
          }
          _this.customers = userData;
          //测试

          //   _this.changeTime(0);
          // _this.changeTime(1);
          for (i = 0; i < userData.length; i++) {
            _this.changeTime(i);
          }
        });
    }
  },
  mounted: function () {//挂载时，到服务器获取数据
    let _this = this;
    //获取咨询师信息
    this.$axios.get('http://localhost:8090/foreground/consultantData?companyId=36').
      then(function (response) {
        _this.users = response.data;
      });
    _this.getAjaxData();

    this.$Notice.config({
      top: 500,
      duration: 3
    });


  }
}
</script>
