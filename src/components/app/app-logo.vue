<style lang='less'>
.app-logo{
  font-family: Futura,Helvetica Neue For Number,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif;
  font-size: 20px;
  text-align: center;
  font-weight: bold;
  padding: 0px 24px;
  margin-bottom: 30px;
  line-height: @layout-header-height;
  height: @layout-header-height;
  overflow: hidden;
  white-space: nowrap;
  transition: padding .3s;
}
</style>
<template>
  <div class="app-logo"><router-link to="/">软考通<span v-if="!siderCollapsed">后台管理</span></router-link></div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {},
  methods: {},
  computed: {
    siderCollapsed(){
      return this.$store.state.siderCollapsed;
    }
  }
};
</script>