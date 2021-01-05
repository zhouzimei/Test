<template>
    <div>
       <van-nav-bar  fixed class="b_border" left-text="返回" left-arrow 
        @click-left="$router.back()">
        <template v-slot:title>
            <van-search v-model="searchKey" placeholder="请输入搜索关键词" @input="debounce(search)"/>
        </template>
        </van-nav-bar>

        <main class="maincontent" ref="main"   >
            <section class="item" v-for="item in productList" :key="item.id" @click="itemClick(item.id)">
                <img :src="item.cover" alt="" height="50"/>
                <div class="item_bottom">
                    <h3>{{item.name}}</h3>
                    <span>{{item.price | priceFormat}}</span>
                </div>
            </section>
        </main>
    </div>
</template>
<script>
import {reqPagination} from 'network/api'
export default {
    name:'Search',
    data(){
        return{
            searchKey:'',
            productList:[],
        }
    },
    methods:{
        //搜索
        async search(){
            const {data} = await reqPagination({page:1,size:10,key:this.searchKey})
            this.productList = [...this.productList,...data.data]
 
        },
        //防抖动函数
        debounce(fn){
            clearTimeout(this.timeId)
            this.timeId = setTimeout(() => {
                if (this.searchKey.trim() === ""){
                    return
                }
                fn()
            },500)
        },
        //详情页
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
    .van-search{
        width: 180px;
        padding: 0;
    }
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

</style>