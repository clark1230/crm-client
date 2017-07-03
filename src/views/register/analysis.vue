<template>
  <div id="register-analyis">
    <h1>信息统计</h1>
    <Button  v-on:click="show" type="info" icon="plus" html-type="button">点击</Button>
    <hr>
     <Table border stripe :columns="testColumn" :data="testData"></Table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      message: '哈哈',
      testColumn:[
        {title:'编号',key:'id'},
        {title:'姓名',key:'username'}
      ],
      testData:[]
    }
  },
  methods: {
    show: function () {
      let data1 = [{id:1,username:'jack'}];
      this.testData = data1;
    }
  }
}
</script>

