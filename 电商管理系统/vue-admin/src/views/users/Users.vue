<template>
    <div>
        <!--面包屑导航-->
         <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/users' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>

        <el-card class="box-card">
         <el-row :gutter="20">
             <!--搜索框-->
            <el-col :span="10">
                <el-input placeholder="请输入内容" @click="clearSearchKey" v-model="usersParams.query" clearable>
                    <el-button slot="append" icon="el-icon-search" @click="searchClick"></el-button>
                </el-input>
            </el-col>
            <!--添加按钮-->
            <el-col :span="4">
                <el-button type="primary" @click="addUserClick">添加用户</el-button>
            </el-col>
        </el-row>

        <!--表格-->
        <el-table
            :data="userList"
            stripe
            style="width: 100%"
            border
            >
            <el-table-column type="index"></el-table-column>
            <el-table-column prop="username" label="姓名"></el-table-column>
            <el-table-column prop="email" label="邮箱"></el-table-column>
            <el-table-column prop="mobile" label="电话"></el-table-column>
            <el-table-column prop="role_name" label="角色"></el-table-column>
            <el-table-column prop="mg_state" label="状态" >
                <template v-slot="data">
                    <!--data.row这一行各项的信息-->
                    <el-switch v-model="data.row.mg_state" @change="changeState(data.row)"></el-switch>
                </template>
            </el-table-column>
            <el-table-column  label="操作">
                <template v-slot="data">
                    <!--修改-->
                     <el-button type="primary" icon="el-icon-edit" size="mini" @click="editUserClick(data.row)"></el-button>
                    <!--删除-->
                     <el-button type="danger" size="mini" icon="el-icon-delete" @click="delUser(data.row)" ></el-button>
                    <!--分配角色-->
                    <el-tooltip class="item" 
                    effect="dark" content="分配角色" 
                    placement="top" :enterable="false"
                    >
                       <el-button type="warning" size="mini" icon="el-icon-setting" @click="rolesClick(data.row)"></el-button>
                    </el-tooltip>

                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[2, 3, 5, 10]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
    </el-pagination>
       </el-card>

 
    <child-dialog ref="childDialog" :currentUser="currentUser" @aaa="getUsersList"></child-dialog>
     <roles-dialog ref="rolesDialog" :currentUser="currentUser"></roles-dialog>   
    </div>
</template>
<script>
import {reqUserList,reqUpdateUserState,reqDeletUser} from 'network/api'

import ChildDialog from './childCom/ChildDialog.vue'
import RolesDialog from './childCom/RolesDialog.vue'


export default {
    name:'Users',
    components:{
        ChildDialog,
        RolesDialog
    
    },
    data(){
        return{
            input3:'',
            //请求参数
            usersParams:{
                query:'',
                pagenum:1,
                pagesize:2
            },
            //用户列表
            userList:[],
            //总页数
            total:0,
            currentUser:{}

        }
    },
    created(){
        this.getUsersList()
    },
    methods:{
        //请求用户列表
        async getUsersList(){
            const {meta,data} = await reqUserList(this.usersParams)
           if (meta.status !== 200) return this.$message.error(meta.msg)
           this.userList = data.users
           this.total = data.total
        },

        //改变每页显示的条数
        handleSizeChange(pageSize){
            this.userParams.pagesize = pageSize
            this.getUsersList()

        },

        //当页数发生改变时
        handleCurrentChange(page){
            this.usersParams.pagenum = page
            this.getUsersList()
        },

        //点击搜索
        searchClick(){
            this.usersParams.pagenum = 1
            this.getUsersList()
        },

        //点击搜索框的清除按钮
        clearSearchKey(){
            this.usersParams.pagenum = 1
            this.getUsersList()
        },

        //改变用户状态
          async changeState(userInfo) {
            const {mg_state, id} = userInfo
            const {data, meta} = await reqUpdateUserState(id, mg_state)  // eslint-disable-line no-unused-vars
            if (meta.status !== 200) return this.$message.error(meta.msg)
            this.$message.success(meta.msg)
        },

        //点击添加用户
        addUserClick(){
            this.currentUser = {}
            this.$refs.childDialog.dialogVisible = true
        },
        
        //编辑用户
        editUserClick(currentUserInfo){
            this.currentUser = currentUserInfo
            this.$refs.childDialog.dialogVisible = true
        },

        //删除当前用户
        delUser(userInfo){
            this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(async() => {
          const {meta} = await reqDeletUser(userInfo.id)
          if(meta.status !== 200) return this.$message.error(meta.msg)
          this.$message.success(meta.msg)
          //刷新列表
          this.getUsersList()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消删除'
          });          
        });
        },

        //分配角色
        rolesClick(userInfo){
            this.currentUser = userInfo
            this.$refs.rolesDialog.dialogVisible = true
        }


      





    }
}
</script>
<style  scoped lang="less">
  
</style>