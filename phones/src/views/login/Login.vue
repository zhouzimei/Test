<template>
    <div>
        <van-nav-bar title="登录/注册" fixed class="b_border" left-text="返回" left-arrow 
            @click-left="$router.back()"></van-nav-bar>
        
        <!--表单-->
        <div class="maincontent">
            <van-form @submit="onSubmit" style="magin-top:46px">
            <van-field
                v-model="loginForm.name"
                name="用户名"
                label="用户名"
                placeholder="用户名"
                :rules="[{ required: true, message: '请填写用户名' }]"
            />
            <van-field
                v-model="loginForm.password"
                type="password"
                name="密码"
                label="密码"
                placeholder="密码"
                :rules="[{ required: true, message: '请填写密码' }]"
            />
            <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit">提交</van-button>
            </div>
        </van-form>

        </div>
    </div>
</template>
<script>
import {reqLogin} from "network/api"
import {mapMutations} from "vuex"
export default {
    name:'Login',
    data() {
        return {
            loginForm:{
              name:'',
              password:''
            }, //发请求的参数
        }
    },
    methods:{
        //解构vuex里面的mapMutations
      ...mapMutations(["saveUserInfo"]),
      //表单提交
     async  onSubmit(){
            const {data} = await reqLogin(this.loginForm)
            //存储用户信息
            this.saveUserInfo(data)
            sessionStorage.setItem("token",data.token)
            this.$router.back()
           
        }
    }
}
</script>