<style lang='less' scoped>
.a-item-vue {
  padding: 20px 0;
  margin: 0 10px;
  .topic {
    font-size: 15px;
    font-weight: bold;
  }

  &:first-of-type {
    padding-top: 0;
  }

  + .a-item-vue {
    border-top: @border;
  }
  .desc{
    font-weight: 800;
    p{
      display: inline-block;
      margin-left: 25px;
      line-height: 25px;
      .h-btn{
        vertical-align: bottom;
      }
    }
  }
}
</style>
<template>
  <div class="a-item-vue d-flex justify-space-between">
    <p class="topic">{{item.title}}</p>
    <!--<p class="tags"><TagInput v-model="item.tags" readonly></TagInput></p>-->
    <!--<p class="desc">{{item.desc}}</p>-->
    <div class="desc">
      <p>{{item.subjectName}}</p>
      <p>{{paperType}}</p>
      <!--<p>题数 <span class="count primary-color font-size-l">{{item.count}}</span></p>-->
      <p>已添加题数 <span class="count yellow-color font-size-l">{{item.questions?item.questions.length:'0'}}</span></p>
      <p>状态 <span class="count  font-size-l" :class="item.status===0?'red-color':'green-color'">{{item.status===0?'未发布':'已发布'}}</span></p>
      <p><Button color="green" :disabled="item.status===1">编辑</Button></p>
      <p><Button :color="item.status===0?'yellow':'gray'" @click="updataStatus">{{item.status===0?'发布':'撤下'}}</Button></p>
      <p>
        <Poptip content="确定删除该试卷？" @confirm="remove" style="margin-left: 5px">
          <Button color="red">删除</Button>
        </Poptip>
      </p>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    item: Object
  },
  data() {
    return {
      
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      
    },
    updataStatus(){
      axios.post("/paper/updateStatus",{
        id:this.item.id,
        status:this.item.status===0?1:0
      }).then(response=>{
        this.item.status=this.item.status===0?1:0;
        if (this.item.status===0) {
          this.$Message.success('成功撤下该试卷！');
        }
        else {
          this.$Message.success('成功发布该试卷！');
        }
      })
    },
    remove(){
      axios.post("/paper/delete",this.item.id,
              {headers: {'Content-Type': 'application/json'}})
              .then(response=>{
          this.$Message.success('成功删除该试卷！');
          this.$emit('remove')
      }).catch(error=>{
        console.error(error);
      })
    }
  },
  computed: {
    paperType(){
      switch (this.item.paperTypeId) {
        case 2:return '全真模拟试卷';
        case 3:return '历年真题试卷';

      }
    }
    
  }
}
</script>