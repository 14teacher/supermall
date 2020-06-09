<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <scroll 
          ref="scroll" 
          class="content" 
          :probe-type="3" 
          :pull-up-load="true" 
          @scroll="contentScroll"
          @pullingUp="loadMore">
        <!-- 轮播图组件 -->
        <home-swiper :banners="banners" />
        <!-- 推荐信息组件 -->
        <recommend-view :recommends="recommends" />
        <!-- 本周流行组件 -->
        <feature-view />
        <!-- 选项卡 -->
        <tab-control class="tab-control" :titles="['流行', '新款', '精选']" @tabClick="tabClick" />
        <!-- 展示商品数据 -->
        <goods-list :goods="showGoods" />
    </scroll>
    <!-- 回到顶部 -->
    <back-top class="back-top" @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  import GoodsListItem from 'components/content/goods/GoodsListItem'
  import Scroll from 'components/common/scroll/Scroll'
  import BackTop from 'components/content/backTop/BackTop'

  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView'

  import {
    getHomeMultidata,
    getHomeGoods
  } from 'network/home'



  export default {
    name: 'Home',
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {
            page: 0,
            list: []
          },
          'new': {
            page: 0,
            list: []
          },
          'sell': {
            page: 0,
            list: []
          },
        },
        currentType: 'pop',
        isShowBackTop: false
      }
    },
    // 计算属性
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    components: {
      NavBar,
      Scroll,

      BackTop,
      TabControl,
      GoodsList,
      GoodsListItem,

      HomeSwiper,
      RecommendView,
      FeatureView,
    },
    created() {
      //1.请求轮播图和推荐数据
      this.getHomeMultidata()
      //2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    methods: {
      /*
       *事件监听相关的方法
       */
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
          default:
            this.currentType = 'pop'
        }
      },
      backClick(){
        // console.log('点击了 backClick ')
        this.$refs.scroll.scrollTo(0, 0, 1000)//scrollTo(x, y, 1000ms)
      },

      contentScroll(position){
        // console.log(position.y)
        this.isShowBackTop = (-position.y) > 800
      },

      loadMore(){
        // console.log('上拉加载更多')
        this.getHomeGoods(this.currentType)
        //刷新，重新计算高度
        this.$refs.scroll.scroll.refresh()
      },
      /**
       * 都是网络请求的方法
       * */
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          // console.log(res.data.banner.list)
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        })
      },

      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          // console.log(res.data.list)
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1
          //多次加载
          this.$refs.scroll.finishPullUp()
        })
      }
    },
  }

</script>

<style scoped>
  #home {
    height: 100vh;
  }

  /* #home{
    padding-top: 44px;
    height: 100vh;
    position: relative;
  } */
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }

  .tab-control {
    position: sticky;
    top: 44px;
    z-index: 9;
  }
  .content{
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  /* .content{
    height: calc(100% - 93px);
    overflow: hidden;
    margin-top: 44px;
  } */

</style>
