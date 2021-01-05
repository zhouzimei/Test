<template>
    <div>
        <van-nav-bar title="我的收藏" left-text="返回" @click-left="$router.back()" left-arrow fixed
                     class="b_border"></van-nav-bar>

       
        <main  ref="main" class="maincontent" @scroll="mainScroll">
            <section class="item" v-for="item in likeList" :key="item.id" @click="itemClick(item.id)">
                <img :src="item.cover"
                     alt="" height="50">
                <div class="item_bottom">
                    <h3>{{item.name}}</h3>
                    <span>{{item.price | priceFormat}}</span>
                </div>
            </section>
        </main>
            <van-icon name="upgrade" class="backTop" v-if="backTopFlag" @click="backTopClick"/>
    </div>

</template>
<script>
import {reqLikeList} from "network/api"
import backTopMixin from "../../mixins/backTopMixin"
export default {
    name:'LikeList',
    mixins:[backTopMixin],
    data() {
        return {
            likeList:[]
        }
    },
    created(){
        this.getLikes()
    },
    methods:{
        //获取收藏列表
        async getLikes(){
            const res = await reqLikeList()
            this.likeList = res.data
           
        },

        mainScroll(){
            const {clientHeight,scrollHeight,scrollTop} = this.$refs.main       // eslint-disable-line no-unused-vars
            this.isShowBackTop()
        },
    }
}
</script>
<style scoped lang="less">
    main {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding: 0 10px;

        .item {
            width: 48%;
            box-shadow: 0 0 2px rgba(0, 0, 0, .3);
            border-radius: 3px;
            padding: 5px;
            height: 200px;
            margin-top: 5px;
            position: relative;
            img {
                width: 100%;
            }
            .item_bottom {
                width: 100%;
                position: absolute;
                margin: -7px 0;
                bottom: 5px;

                h3 {
                    white-space: nowrap;
                    overflow-x: hidden;
                    text-overflow: ellipsis;
                    font-size: 14px;
                    font-weight: bold;
                }
                span {
                    font-size: 13px;
                    color: #f50;
                }
            }
        }
    }
.backTop{
    position: fixed;
    right: 18px;
    bottom: 62px;
    z-index: 99;
    font-size: 50px;
    color: #ddd;
}

</style>
