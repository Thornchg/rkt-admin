<style lang='less'>
.search-filter-wrap {
  display: flex;
  margin-bottom: 10px;
  .search-picker-title {
    font-weight: bold;
    line-height: 20px;
    color: rgba(0, 0, 0, 0.65);
    width: 60px;
    margin-right: 15px;
    color: rgba(0,0,0,.85);
  }
  .search-picker-item-group {
    flex: 1;
  }
  .picker-item {
    cursor: pointer;
    margin-right: 8px;
    padding: 3px 8px;
    border-radius: 2px;
    transition: 0.2s;
    &:hover, &.selected {
      background: @primary-color;
      color: #FFF;
    }
  }
}
</style>
<template>
  <div class="search-filter-wrap">
    <div class="search-picker-title">{{title}}</div>
    <div class="search-picker-item-group">
      <span @click="clear" class="picker-item" :class="{selected: isEmpty}">不限</span>
      <span v-for="d of datas" @click="change(d)" :key="d[keyName]" :class="{selected: isSelected(d)}" class="picker-item">{{d[titleName]}}</span>
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: String,
    datas: Array,
    prop: String,
    value: Object,
    multiple: {
      type: Boolean,
      default: false
    },
    range: {
      type: Boolean,
      default: false
    },
    keyName:{
      type:String,
      default:'key'
    },
    titleName:{
      type:String,
      default:'title'
    }
  },
  data() {
    return {
      
    }
  },
  mounted() {
  },
  methods: {
    isSelected(data) {
      if (this.range) {
        return data.max == this.nowValue.max && data.min == this.nowValue.min;
      } else if (this.multiple) {
        return this.nowValue.indexOf(data[this.keyName]) > -1
      } else {
        return this.nowValue == data[this.keyName]
      }
    },
    change(data) {
      let result = null;
      if (this.range) {
        result = {max: data.max, min: data.min}
      } else if (this.multiple) {
        result = Utils.copy(this.nowValue);
        Utils.toggleValue(result, data[this.keyName]);
      } else {
        result = data[this.keyName]
      }
      this.setvalue(result);
      this.$emit("change");
    },
    clear() {
      if (this.range) {
        this.setvalue({min: null, max: null});
      } else if (this.multiple) {
        this.setvalue([]);
      } else {
        this.setvalue(null);
      }
      this.$emit("change");
    },
    setvalue(data) {
      let value = Utils.copy(this.value);
      value[this.prop] = data;
      this.$emit('input', value);
    }
  },
  computed: {
    isEmpty() {
      if (this.range) {
        return !this.nowValue.max && !this.nowValue.min;
      } else if (this.multiple) {
        return !this.nowValue || this.nowValue.length == 0;
      } else {
        return !this.nowValue;
      }
    },
    nowValue() {
      return this.value[this.prop];
    }
  }
}
</script>