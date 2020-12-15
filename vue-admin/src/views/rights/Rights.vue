<template>
    <div>
        <!--面包屑导航-->
         <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/users' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>权限列表</el-breadcrumb-item>
        </el-breadcrumb>

        <!--卡片区域-->
        <el-card class="box-card">
            <el-table
                :data="rightsList"
                stripe
                style="width: 100%">
                <el-table-column type="index"></el-table-column>
                <el-table-column
                    prop="authName"
                    label="权限名称"
                >
                </el-table-column>
                <el-table-column
                    prop="path"
                    label="路径"
                >
                </el-table-column>
                <el-table-column
                    
                    label="权限等级">
                    <template v-slot="data">
                        <el-tag v-if="data.row.level == 0">一级</el-tag>
                        <el-tag type="success" v-else-if="data.row.level == 1">二级</el-tag>
                        <el-tag type="warning" v-else>三级</el-tag>
                    </template>
                </el-table-column>
  </el-table>
        </el-card>
    </div>
</template>
<script>
import {reqRights} from "network/api"
export default {
    name:'Rights',
    data(){
        return{
            rightsList:[]
        }
    },
    created(){
        this.getRightsList()
    },
    methods: {
        //获取权限列表
        async getRightsList(){
            //以list列表显示权限
            const {data,meta} = await reqRights("list")
            if (meta.status !== 200) return this.$message.error(meta.msg)
            this.rightsList = data
        }
    },

    
}
</script>