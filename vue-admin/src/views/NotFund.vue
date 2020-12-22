<template>
    <div>
  <div class="container">
    
      <div class="col-md-6 align-self-center">
        <h1>404</h1>
        <h2>页面丢失</h2>
        <p>您所寻找的页面不存在。你可以点击下面的按钮，返回主页。
        </p>
       <button class="btn green" @click="back">返回首页</button>
      </div>
    </div>
  </div>

    
</template>
<script>
export default {
    name:'NotFund',
    methods:{
        back(){
            this.$router.push("/welcome")
        }
    }
}
</script>
<style scoped>
@import "../assets/css/bootstrap.min.css";



</style>