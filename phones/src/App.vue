<template>
  <div id="app">
    
    <router-view/>
    <van-tabbar v-model="active" class="t_border" v-if="showTabbar" route>
      <van-tabbar-item icon="star-o" to="/home">精选</van-tabbar-item>
      <van-tabbar-item icon="cart-o" to="/cart">购物车</van-tabbar-item>
      <van-tabbar-item icon="contact" to="/me">我的</van-tabbar-item>
    </van-tabbar>

  </div>
</template>
<script>
export default {
  name:'App',
  data() {
    return {
      active:0
    }
  },
  computed:{
    showTabbar(){
      return this.$route.meta.isShowTabBar
    }
  }
}
</script>

<style lang="less">
.van-icon-like{
  color: red !important;
}
.item_price{
    font-size: 15px;
  }

</style>
