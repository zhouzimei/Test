<template>
    <div>
        <!--NavBar-->
        <van-nav-bar title="商品详情" fixed class="b_border" left-text="返回" left-arrow 
        @click-left="$router.back()"></van-nav-bar>

         <main class="maincontent">
             <!--轮播图-->
             <van-swipe class="d_swipe" :autoplay="3000" indicator-color="#1989fa">
                <van-swipe-item v-for="item in productDetail.imgList" :key="item.id">
                    <img :src="item.path"/>
                </van-swipe-item>
            </van-swipe>
            <!--标题和价格-->
              <van-cell :title="productDetail.name"  :label="productDetail.price | priceFormat" ></van-cell>

              <div class="ser">
                <van-row>
                    <van-col :span="12">免运费</van-col>
                    <van-col :span="12">剩余：{{productDetail.stock || 0}}</van-col>
                </van-row>
                <van-row>
                    <van-col :span="12">销售：{{productDetail.sales}}</van-col>
                    <van-col :span="12">收藏：{{productDetail.stock || 0}}</van-col>
                </van-row>
              </div>
                <!--tab切换-->
              <van-tabs v-model="tabActive" offset-top="46px" sticky>
                <van-tab title="图片">
                    <img :src="item.path"  v-for="item in productDetail.detailImgList" :key="item.id" />
                </van-tab>
                <van-tab title="参数">
                    <div class="ser">
                        <van-row v-for="item in productDetail.properties" :key="item.id">
                            <van-col :span="12">{{item.name}}</van-col>
                            <van-col :span="12">{{item.detail}}</van-col>
                        </van-row>
                    </div>
                </van-tab>
            </van-tabs>
         </main>

         <!--提交栏-->
         <van-goods-action class="t_border bottom">
            <van-goods-action-icon :icon="isLike ?'like':'like-o'" text="收藏" @click="likeClick"  />
            <van-goods-action-icon icon="cart-o" text="购物车" @click="$router.push('/cart')"  />
            <van-goods-action-button type="warning" text="加入购物车" @click="addClick" />
            <van-goods-action-button type="danger" text="立即购买" @click="toOrderConfirm" />
        </van-goods-action>

    </div>
</template>
<script>
import {reqProductDetail,reqAddLike,reqDelLike, reqUpdateCart} from "network/api"
import {mapState,mapGetters,mapMutations} from "vuex"

export default {
    name:'Detail',
    data() {
        return {
            id:this.$route.query.id,
            productDetail:{},
            tabActive:0
        }
    },
    created(){
        this.getProductDetail()
    },
    methods:{
        

        //获取商品详情
        async getProductDetail(){
            const {data} = await reqProductDetail(this.id)
            this.productDetail = data
            
        },
         ...mapMutations(["changeLikeList"]),
        //点击收藏
        async likeClick(){
            if (!this.isLogin) return this.$router.push("/login")
            //登录过可以发送收藏请求
            if (this.isLike){
                //已经收藏，可取消收藏
                const res = await reqDelLike(this.id)
                if(res.errcode === 0){
                    this.$toast("取消收藏成功")
                    this.changeLikeList(this.id)
                }
            }else{
                //没有收藏，可收藏
                const res = await reqAddLike(this.id)
                if(res.errcode === 0){
                    this.$toast("收藏成功")
                    const {cover,name,price} = this.productDetail
                    this.changeLikeList({cover,name,price,product_id:this.id})
                }
            }
        },
        //添加购物车
       async addClick(){
            if (!this.isLogin) return this.$route.push("/login")
            const res = await  reqUpdateCart({product_id:this.id})
            if (res.errcode === 0){
                this.$toast("加入购物车成功")
            } 
        },
        //点击购买
        toOrderConfirm(){
            const {price,name,cover} = this.productDetail
            sessionStorage.setItem("comfirmList",JSON.stringify([{
                count:1,
                product_id:this.id,
                price,name,cover
            }]))
            this.$router.push("/orderConfirm")
        }
    },
    computed:{
        ...mapGetters(["isLogin"]),
        ...mapState(["userInfo"]),
        isLike(){
            if (!this.userInfo.likeList) return
            return this.userInfo.likeList.some(item => item.product_id == this.id)
        }
    }
}
</script>
<style scoped lang="less">
main{
        .d_swiper{
            height: 300px;
        }
        .ser{
            padding: 0 15px;
            font-size: 12px;
            .van-row{
                line-height: 30px;
            }
        }

    }
    .van-cell__label{
        color: #f50;
    }
</style>