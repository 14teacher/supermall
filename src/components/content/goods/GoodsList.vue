<template>
 <div class="goods">
  <goods-list-item class="goods-list" v-for="(item, index) in goods" :key="index" :goodsItem="item"/>
 </div>
</template>

<script>
  import GoodsListItem from './GoodsListItem.vue';
 export default {
   name: 'GoodsList',
   data () {
     return {

     }
   },
   props: {
    goods: {
      type: Array,
      default(){
        return []
      }
    }
   },
   components: {
    GoodsListItem
   }
 }
</script>

<style>
 .goods{
  display: flex;
  /*设置包裹*/
  flex-wrap: wrap;
  /*设置均等分*/
  justify-content: space-around;

  padding: 2px;
 }
 
</style>
