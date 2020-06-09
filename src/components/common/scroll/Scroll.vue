<!-- 滚动 -->
<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot>
        <!-- 插入滚动内容 -->
      </slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: 'Scroll',
    props:{
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        scroll: null
      }
    },
    mounted() {
      //1.创建BScroll
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      })
    // 回到顶部
    // this.scroll.scrollTo(0, 0)
    //2.监听滚动位置
    this.scroll.on('scroll', (position)=>{
      // console.log(position)
      this.$emit('scroll', position)
    })
    //3.监听上拉事件
    this.scroll.on('pullingUp', ()=>{
      this.$emit('pullingUp')
    //   setTimeout(()=>{
    //   this.scroll.finishPullUp()
    // }, 5000)
    })
    },
    components: {

    },
    methods: {
      scrollTo(x, y, time=1000){
        this.scroll.scrollTo(x, y, time)
      },
      finishPullUp(){
        this.scroll.finishPullUp()
      }
    },
  }

</script>

<style scoped>

</style>
