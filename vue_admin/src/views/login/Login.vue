<template>
    <div class="login">
        <div class="login_content">
            <div class="logo">
                <img src="~assets/img/logo.png">
            </div>

            <!--表单-->
           <el-form   ref="loginForm" :rules="loginRules" :model="loginForm">
             <el-form-item  prop="username">
              <el-input prefix-icon="iconfont icon-user" v-model="loginForm.username" ></el-input>
            </el-form-item>

            <el-form-item  prop="password">
              <el-input prefix-icon="iconfont icon-3702mima" v-model="loginForm.password" type="password"></el-input>
            </el-form-item>

            <el-form-item class="form_buts">
                <el-button type="primary" @click="loginClick">登录</el-button>
                <el-button >重置</el-button>
            </el-form-item>

          </el-form>


        </div>

        
        
    </div>
</template>
<script>
import {reqLogin} from "network/api"

export default {
    name:'Login',
    data(){
        return{
            loginForm:{
                username:'admin',
                password:'123456'

            },
            //表单验证规则
            loginRules:{
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                ],
                password:[
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
                ]
            }
        }
    },
    methods:{
        //点击登录
        loginClick(){
           this.$refs.loginForm.validate(async valid => {
            //对整个表单进行验证
          if (!valid) return
          //发送ajax请求
          const {data,meta} = await reqLogin(this.loginForm)
          console.log(data,meta)
          if (meta.status !== 200) return this.$message.error(meta.msg)
          const {token} = data
          //把token值存储到本地
          sessionStorage.setItem("token",token)
          this.$router.push("/home")
            })
        }
    }
}
</script>
<style scoped lang="less">
.login{
    background:#2b4b6b;
    height: 100%;
    position: relative;

    .login_content{
        width: 450px;
        height: 300px;
        background-color: #ffffff;
        border-radius: 3px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        .logo{
            width: 130px;
            height: 130px;
            background-color: #fff;
            border-radius: 50%;
            position: absolute;
            left: 50%;
            transform: translate(-50%,-50%);
            padding: 10px;
            box-shadow: 0 0 10px #dddddd;

            img{
                width: 100%;
                height: 100%;
                border-radius: 50%;
                background-color: #eee;
            }
        }
        .el-form{
            position: absolute;
            bottom: 0;
            width: 100%;
            padding: 0 20px;
            box-sizing: border-box;

            .form_buts{
                text-align: right;
            }
        }

    }
}

</style>