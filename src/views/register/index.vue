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
  margin-top: 5px;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}

.waitTime span {
  font-size: 14px;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}
</style>

<template>
  <div id="register" class="layout">
    <h1 class="show">前台接待</h1>
    <Row type="flex" :gutter="35" justify="center" align="top">
      <Col span="8">
      <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
        <Form-item label="用户名" prop="realName">
          <Input type="text" v-model="formCustom.realName" value="admin" placeholder="请输入姓名!"></Input>
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
        <Form-item label="咨询师" prop="userId">
          <Select v-model="formCustom.userId" placeholder="请选择面试官!">
            <Option v-for="user in users" :value="user.userId">{{user.name}}</Option>
          </Select>
        </Form-item>
        <Form-item>
          <Button type="primary" @click="handleSubmit('formCustom')">保存</Button>
          <Button type="ghost" @click="handleReset('formCustom')" style="margin-left: 8px">重置</Button>
        </Form-item>
      </Form>
      </Col>
      <Col span="14">
      <Timeline class="waitTime">
        <Timeline-item color="green">
          <Icon type="trophy" slot="dot"></Icon>
          <span>姓名:张三&nbsp;&nbsp;&nbsp;等待时间:1h20m30s 等待状态</span>
        </Timeline-item>
        <Timeline-item>发布1.0版本</Timeline-item>
        <Timeline-item>发布2.0版本</Timeline-item>
        <Timeline-item>发布3.0版本</Timeline-item>
      </Timeline>
      </Col>
    </Row>
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
    const validateSex = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请选择性别!'));
      } else {
        callback();
      }
    };
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
    const validateUserId = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请选择咨询师'));
      } else {
        callback();
      }
    }

    return {
      formCustom: {  //表示数据
        realName: '',
        sex: '',
        tel: '',
        userId: ''
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
        ]
      },
      users: []   //咨询师下拉列表
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
            console.log(resp.code);//服务器响应的数据
            _this.success(resp.msg);
            //处理成功后清空表单内容
            _this.handleReset(name);
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
    }
  },
  mounted: function () {//挂载时，到服务器获取数据
    let _this = this;
    //获取咨询师信息
    this.$axios.get('http://localhost:8090/foreground/consultantData?companyId=36').
      then(function (response) {
        console.log(response.data);
        _this.users = response.data;
      });
    this.$Notice.config({
      top: 500,
      duration: 3
    });
  }
}
</script>
