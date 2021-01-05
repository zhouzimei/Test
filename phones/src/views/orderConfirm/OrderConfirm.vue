<template>
    <div>
       <van-nav-bar title="确认订单" fixed class="b_border" left-text="返回" left-arrow 
        @click-left="$router.back()"></van-nav-bar>

        <main class="maincontent">
            <van-cell title="单元格" value="内容" />
        </main>
    </div>
</template>
<script>

export default {
    name:'OrderConfirm',
    data() {
        return {
            cartList:JSON.parse(sessionStorage.getItem("comfirmList")),
          
        }
    },
    methods:{

    }
}
</script>