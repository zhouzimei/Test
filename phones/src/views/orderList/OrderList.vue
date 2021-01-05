<template>
    <div>
        <van-nav-bar title="我的订单" left-text="返回" @click-left="$router.back()" left-arrow fixed
                     class="b_border"></van-nav-bar>
        <main class="maincontent">
            <van-cell-group v-for="item in orderList" :key="item.id">
                <van-cell :title="'订单ID:' + item.id" is-link :to="{path:'/orderInfo',query:{id:item.id}}"  />
                <div v-for="citem in item.orderProducts" :key="citem.id">
                    <van-cell :title="citem.name"  is-link :icon="citem.cover"
                            :value="citem.count + '件'"
                            :to="{path:'/detail',query:{id:citem.id}}"
                    />
                </div>
                
            </van-cell-group>
        
        </main>             
    </div>
</template>
<script>
import {reqOrderList} from "network/api"
export default {
    name:'OrderList',
    data() {
        return {
            orderList:[],       //订单列表
        }
    },  
    created(){
        this.getOrderList()
    },
    methods:{
        async getOrderList(){
            const res = await reqOrderList()
            if (res.errcode === 0){
                this.orderList = res.data.data
            }
            console.log(this.orderList)
        }

    }
}
</script>
<style lang="less" scoped>
    .maincontent{
        height: calc(100vh - 46px)!important;
    }
    .van-cell__left-icon{
        font-size: 50px;
    }
    .van-cell-group{
        border-top: 10px solid rgba(150,150,150,.1);
    }

</style>