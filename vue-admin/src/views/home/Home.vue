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
                <el-aside :width="isShowMenus? '64px':'200px'">
                    <div class="toggleMenu" @click="toggleMenuClick">|||</div>
                    <el-menu
                        class="el-menu-vertical-demo"
                        :collapse="isShowMenus"
                        :collapse-transition="false"
                        unique-opened
                        :default-active="activeItem"
                        router
                        background-color="#333744"
                        text-color="#fff"
                        active-text-color="#3d9eff"
                        >
                        <el-submenu :index="item.path + ''" v-for="item in menuList" :key="item.id">
                        <template slot="title">
                            <i :class="['iconfont',icons[item.id]]"></i>
                            <span>{{item.authName}}</span>
                        </template>
                        <el-menu-item 
                            :index="'/' + citem.path "
                            v-for ="citem in item.children"
                            :key="citem.id"
                            :route="'/' + citem.path "
                            @click="menuItemClick(citem.path)"

                        >
                        <template v-slot:title>
                            <i class="el-icon-menu"></i>
                            <span>{{citem.authName}}</span>
                        </template>

                        </el-menu-item>
                    </el-submenu>
                    </el-menu>
                </el-aside>

                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>

    </div>
</template>
<script>
import {reqMenus} from 'network/api'
import {authDynamicRouter} from "@/router/index"
export default {
    name:'Home',
    data(){
        return{
            menuList:[],
            isShowMenus:false,
            icons:{
                '125':'icon-user',
                '103':'icon-tijikongjian',
                '101':'icon-shangpin',
                '102':'icon-danju',
                '145':'icon-baobiao'
            },
            activeItem:''

        }
    },
    created(){
        this.getMenus()
        this.activeItem = sessionStorage.getItem("path")
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
            data.forEach(item => {
                item.children.forEach(citem => {
                    if (citem.authName === "商品列表"){
                        citem.authOps = {
                            add: true
                        }
                    }else{
                        citem.authOps = {
                            add:false
                        }
                    }
                })
            })
            this.menuList = data

            //将侧边栏数据存储到本地
            sessionStorage.setItem("authMenus",JSON.stringify(data))
            authDynamicRouter()
        },
        //侧边栏的隐藏与收起
        toggleMenuClick(){
            this.isShowMenus = !this.isShowMenus
        },

        //保持列表刷新后，被选中那项的状态
        menuItemClick(path){
            sessionStorage.setItem("path",'/'+path)
            this.activeItem ='/' + path
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
.toggleMenu{
        background-color:#4a5064 ;
        text-align: center;
        line-height: 25px;
        color: #fff;
        font-size: 12px;
        letter-spacing: 2px;
    }
    .iconfont{
        margin-left: 10px;
    }
    .el-menu{
        border-right:none;
    }


</style>