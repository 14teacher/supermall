<!-- 我们切换卡 只是文字不一样 -->
<template>
 <div class="tab-control">
    <div class="tab-control-item" v-for="(item, index) in titles"
         :key="index" :class="{active: index === currentIndex}" @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
 </div>
</template>

<script>
 export default {
   name: 'TabControl',
   props: {
    titles: {
      type: Array,
      default(){
        return []
      }
    }
   },
   data () {
     return {
      currentIndex: 0
     }
   },
   methods: {
    itemClick(index){
      this.currentIndex = index;
      //传回父组件
      this.$emit('tabClick', index)
    }
   },
   components: {

   }
 }
</script>

<style>
 .tab-control{
  display: flex;
  text-align: center;
  background-color: #fff;

  font-size: 16px;
  height: 40px;
  line-height: 40px;
 }
 .tab-control-item{
  flex: 1;
 }
 .tab-control-item span{
  padding: 5px;
 }
 .active{
   color: var(--color-high-text);
 }
 .active span{
  border-bottom: 3px solid var(--color-high-text);
 }
 
</style>
