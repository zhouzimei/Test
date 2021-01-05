<template>
    <div>
        <header>
            <div class="box" v-if="!isLogin">
                <div class="logo">
                    <img src="~assets/img/avatar.jpg" />
                </div>
                <span class="nickname" @click="goLogin">登录</span>
            </div>
            <div class="box" v-else>
                <div class="logo">
                    <img :src="'http://192.168.0.198:8360'+userInfo.avatar" alt=""/>
                </div>
                 <span class="nickname">{{userInfo.nickname}}</span>
            </div>

        </header>

        <van-grid>
            <van-grid-item icon="photo-o" text="文字" />
            <van-grid-item icon="photo-o" text="文字" />
            <van-grid-item icon="photo-o" text="文字" />
            <van-grid-item icon="photo-o" text="文字" />
        </van-grid>

        <van-cell-group >
            <van-cell title="我的订单" icon="records" is-link to="/orderList"/>
            <van-cell title="我的收藏" icon="like-o" is-link to="/likeList"/>
            <van-cell title="收货地址" icon="location-o" is-link to="/addressList"/>
            <van-cell title="用户设置" icon="setting-o" is-link to="/setting"/>
        </van-cell-group>
    </div>
</template>
<script>
import {mapGetters,mapState} from "vuex"
export default {
    name:"Me",
    data() {
        return {
            
        }
    },
    methods:{
        goLogin(){
            this.$router.push("/login")
        }
    },
    computed:{
        ...mapState(["userInfo"]),
        ...mapGetters(["isLogin"])
    }
}
</script>
<style lang="less" scoped>
    header{
        height: 90px;
        background-color: #f37d0f;
        .box{
            display: flex;
            align-items: center;
            height: 100%;
            .logo{
                width: 70px;
                height: 70px;
                box-shadow: 0 0 2px rgba(0, 0, 0, .6);
                margin-left: 20px;
                margin-right: 20px;
                border-radius: 50%;
                background-color: #fff;
                img{
                    width: 100%;
                    height: 100%;
                    border-radius:50% ;
                }
            }
            span{
                color: #fff;
            }
        }
    }
</style>