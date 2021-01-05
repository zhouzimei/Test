<template>
    <div>
        <!--NavBar-->
        <van-nav-bar title="精选" fixed class="b_border" 
        @click-right="$router.push('/search')" @click-left="$router.push('/citySelect')">
            <template v-slot:left>
                <van-icon name="location-o" />
                <span>{{$store.state.currentCity}}</span>
            </template>
            <template v-slot:right>
                <van-icon name="search" size="20"/>
            </template>
        </van-nav-bar>
        <!--主要内容-->
        <main class="maincontent" ref="main"  @scroll="mainScroll" >
            <section class="item" v-for="item in productList" :key="item.id" @click="itemClick(item.id)">
                <img :src="item.cover" alt="" height="50"/>
                <div class="item_bottom">
                    <h3>{{item.name}}</h3>
                    <span>{{item.price | priceFormat}}</span>
                </div>
            </section>
        </main>
        <!--返回顶部-->
        <van-icon name="upgrade" class="backTop" v-if="backTopFlag" @click="backTopClick" />
    </div>
</template>
<script>
import {reqPagination} from "network/api"
export default {
    name:'Home',
    data() {
        return {
            productParams:{
                page:1,
                size:10
            },
            productList:[],     //商品的数组
            totalPages:0,       //总页数
            flag:true,
            backTopFlag:false
        }
    },
    created(){
        this.getProductList()
    },
    methods:{
        //获取首页商品列表
        async getProductList(){
            this.flag = true
            const {data} = await reqPagination(this.productParams)
            this.productList = [...this.productList,...data.data]
            this.totalPages = data.totalPages
            this.flag = false
           
        },

        //监听mian的滚动事件
        mainScroll(){
            const {clientHeight,scrollHeight,scrollTop} = this.$refs.main
            //当滑到底部显示回顶部的按钮
            this.backTopFlag = scrollTop >= 1500 ? true : false
            if (this.flag)  return
            if (scrollHeight - scrollTop <= clientHeight + 1){
                //获取新页面数据
                this.productParams.page++
                if (this.productParams.page > this.totalPages){
                    //显示提示
                    this.$toast("没有更多数据")
                    return
                }
                this.getProductList()
            }
        },
        //返回顶部
        backTopClick(){
            this.$refs.main.scrollTop = 0;
        },

        //点击跳转到详情页
        itemClick(id){
            this.$router.push({
                name:'Detail',
                query:{id}      //路由携带参数
            })
        }

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
