<style lang='less'>
  .page-500-vue {
    position: absolute;
    left: 50%;
    top: 50%;
    margin-top: -200px;
    margin-left: -150px;
    height: 300px;
    width: 300px;
    text-align: center;
    .background-image {
      height: 300px;
      max-width: 500px;
      background: url(../assets/img/500.png) no-repeat center;
      background-size: contain;
      margin: 0 auto 50px;
    }
    p {
      font-size: 22px;
      color: #3788ee;
    }
  }
</style>
<template>
  <div class="page-500-vue">
    <div class="background-image"></div>
    <p>您访问的页面出现错误~~</p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      
    }
  },
  computed: {
    
  }
}
</script>