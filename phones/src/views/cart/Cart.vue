<template>
    <div>
        <van-nav-bar title="购物车" fixed class="b_border" left-text="返回" left-arrow 
            @click-left="$router.back()"></van-nav-bar>

        <!--主要内容-->
        <main class="maincontent"  >
            <div class="pro_item" v-for="item in cartAllList" :key="item.product_id">
                <van-checkbox v-model="item.checked" @change="checkChange(item.product_id,item.checked)" >
                    <van-card
                        :title="item.name"
                        :thumb="item.cover"
                        @click.stop             
                    >
                    <template v-slot:num>
                        <!--计步器-->
                        <van-stepper v-model="item.count"  disable-input  @change="countChange(item.product_id,item.count)"/>
                        <van-tag type="danger" size="large" @click="delCart(item.product_id)">删除</van-tag>
                    </template>
                    <template v-slot:price>
                        <div style="color:#f50" v-html="price(item.price)" ></div>
                    </template>
                    </van-card>
                </van-checkbox>
            </div>
        </main>
        
        

        

        <!--底部提交-->
        <van-submit-bar :price="totalPrice" button-text="提交订单" class="t_border" >
            <template v-slot>
                <span>共计：{{totalCount}}件</span>
            </template>
        </van-submit-bar>
    </div>
</template>
<script>
import {reqCartAll,reqUpdateCart,reqDelCart} from 'network/api'
export default {
    name:'Cart',
    data() {
        return {
            cartAllList:[],
        }
    },
    created(){
        this.getCarAll()
    },
    methods:{
        //获取购物车数据
        async getCarAll(){
            const {data} = await reqCartAll()
            this.cartAllList = data
            
        },
        //改变购物车选中状态
        async checkChange(product_id,checked){
            const res = await reqUpdateCart({product_id,checked:checked ? 1 : 0})       // eslint-disable-line no-unused-vars
           
        },

        //数量发生改变时
        async countChange(product_id,count){
            const res = await reqUpdateCart({product_id,count})     // eslint-disable-line no-unused-vars
        },

        //删除购物车
        async delCart(product_id){
            const res  = await reqDelCart(product_id)
            //从数组中删除
            if (res.errcode === 0){
                this.cartAllList.splice( this.cartAllList.findIndex(item => item.product_id == product_id),1)
            }
          
        }
        
    },
    computed:{
        price(){
            return function (price) {
                price += ""
                let intNumber = parseInt(price)
                let floatNumber
                let index = price.indexOf(".")
                if (index <= -1){
                    floatNumber = "00"
                }else{
                    floatNumber = price.slice(index+1)
                }
                return `￥<span class="item_price">${intNumber}</span>.${floatNumber}`
            }
        },
        
        //总价
        totalPrice(){
            if (!this.cartAllList) return 0
            return this.cartAllList.reduce((pre,current)  => pre += current.checked ? current.count * current.price : 0,0 ) * 100
        },

        //总件数
        totalCount(){
            if (!this.cartAllList) return "0"
            return this.cartAllList.reduce((pre,current) => pre += current.checked ? current.count : 0,0)

        }
    }
}
</script>
<style scoped lang="less">
    main{
        padding: 0 10px;

        .pro_item{
            box-shadow: 0 0 2px rgba(0,0,0,.4);
            margin-top: 5px;
            padding: 0 3px;
            .van-card{
                width:85vw;
                background-color: #fff;
            }
        }
    }
    .van-tag{
        margin-top: 3px;
    }

</style>