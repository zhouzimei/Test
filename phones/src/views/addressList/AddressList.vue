<template>
    <div>
       <van-nav-bar :title="fromMe ? '我的收货地址' : '请选择地址'" fixed class="b_border" left-text="返回" left-arrow 
        @click-left="$router.back()"></van-nav-bar>

        <main class="maincontent">
            <van-address-list
                v-model="chosenAddressId"
                :list="addressList"
                :switchable="!fromMe"
                @select="selectAddr"
                @add="addAddr"
                @edit="editAddr"
            />
        </main>
    </div>
</template>
<script>
import {mapState} from "vuex"
export default {
    name:'AddressList',
    data() {
        return {
            chosenAddressId:''
        }
    },
    methods:{
        //切换选中
        selectAddr(item){
            sessionStorage.setItem("selectAddr",JSON.stringify(item))
            this.$router.back()
        },
        //添加收货地址
        addAddr(){
           this.$router.push({
               path:'/addressEdit',
               query:{id:0}
           })
        },
        //编辑收货地址
        editAddr(item){
            this.$router.push({
                path:"/addressEdit",
                query:{id:item.id}
            })
        }

    },
    computed:{
        ...mapState(["userInfo"]),
        fromMe(){
            return this.$route.query.from === "me"
        },
        addressList(){
            let addList = []
            const {addressList} = this.userInfo
            if (!addressList) return
            addressList.forEach(item => {
                let {id,name,mobile:tel,province,city,country,detail} = item
                addList.push ({id,name,tel,address:`${province} ${city} ${country} ${detail}`})
            })
            return addList
        }

    }
}
</script>