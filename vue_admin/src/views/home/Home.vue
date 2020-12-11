<template>
    <div class="home">
        <el-container class="home-container">
            <el-header>
                <div class="header_logo">
                    <img src="~assets/img/logo.png" alt="">
                    <span>电商后台管理系统</span>
                </div>
                <el-button type="info" @click="logoutClick">退出</el-button>
            </el-header>

            <el-container>
                <el-aside width="200px">
                    <el-menu
                        default-active="2"
                        class="el-menu-vertical-demo"
                       
                        background-color="#333744"
                        text-color="#fff"
                        active-text-color="#3d9eff">
                    <el-submenu index="1-4">
                        <template slot="title">选项4</template>
                        <el-menu-item index="1-4-1">选项1</el-menu-item>
                    </el-submenu>
                    </el-menu>
                </el-aside>

                <el-main>Main</el-main>
            </el-container>
        </el-container>

    </div>
</template>
<script>
import {reqMenus} from 'network/api'
export default {
    name:'Home',
    data(){
        return{
            menuList:[],
        }
    },
    created(){
        this.getMenus()
    },
    methods: {
        //退出
        logoutClick(){
            this.$router.push("/login")
            sessionStorage.clear()
        },
        //请求侧边数据
        async getMenus(){
            const {data,meta} = await reqMenus()
            if (meta.status !== 200) return this.$message.error(meta.msg)
            this.menuList = data
        }

    },


    
}
</script>
<style scoped lang="less">
.home{
    height: 100%;
    .home-container{
        height: 100%;
        .el-header{
            background-color:#373d41 ;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .header_logo{
                display: flex;
                align-items: center;
                img{
                    height: 55px;
                    height: 55px;
                }
                span{
                    color: #ffffff;
                    font-size: 20px;
                    margin-left: 20px;
                }
                
            }
        }
        .el-aside{
            background-color: #333744;
        }
        .el-main{
            background-color: #eaedf1;
        }
    }

}

</style>