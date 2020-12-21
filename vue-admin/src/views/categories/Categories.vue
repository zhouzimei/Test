<template>
    <div>
         <!--面包屑导航-->
         <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/users' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>商品列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!--卡片区域-->
        <el-card class="box-card">
            <el-row>
                <el-col>
                    <el-button type="primary" @click="addCateClick">添加分类</el-button>
                </el-col>
            </el-row>

            <!--第三方表格-->
            <ZkTable
                :data="cate_list"
                :columns ="columns"
                :expand-type="false"
                show-index
                :selection-type="false"
                class="zk-table"
                border
            >
            <template v-slot:isOk="data">
                <i class="el-icon-success" style="color:greenyellow" v-if="!data.row.cat_deleted"></i>
                <i class="el-icon-error" style="color:red" v-else></i>
            </template>
            <template v-slot:order="data">
                <el-tag size="mini" v-if="data.row.cat_level == 0">一级</el-tag>
                <el-tag size="mini" v-else-if="data.row.cat_level == 1" type="success">二级</el-tag>
                <el-tag size="mini" v-else type="warning">三级</el-tag>

            </template>
            <template v-slot:option="data">
                <el-button type="primary" icon="el-icon-edit" 
                size="mini" @click="editCateClick(data.row)"
                ref="editDialog"
                >编辑</el-button>
                <el-button type="danger" icon="el-icon-delete" size="mini" @click="delCateClick(data.row)">删除</el-button>
            </template>

            </ZkTable>

            <!--分页-->
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="cate_params.pagenum"
                :page-sizes="[3, 5, 10, 15 ]"
                :page-size="100"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </el-card>
        <!--添加的子组件-->
        <add-categories  ref="addCate" ></add-categories>
        <!--编辑的子组件-->
        <edit-categories ref="ediCate" 
        :currentCate="currentCate"
        :getCategoriesList="getCategoriesList"
        ></edit-categories>
        
        
        
    </div>
</template>
<script>
import {reqCategories,reqDelCategories,} from "network/api"

import AddCategories from './childComp/AddCategories.vue'
import EditCategories from './childComp/EditCategories.vue'

export default {
  components: { AddCategories,EditCategories},
    name:'Categories',
    data(){
        return{
            cate_params:{
                type:3,
                pagenum:1,
                pagesize:3,
            },
            cate_list:[],
            total:0,
            dialogVisible:false,
            currentCate:{},
            columns:[
                //表格标题
                {
                    label:'分类名称',
                    prop:'cat_name'
                },
                {
                    label:'是否有效',
                    type:'template',
                    template:'isOk'

                },
                {
                    label:'排序',
                    type:'template',
                    template:'order'

                },
                {
                    label:'操作',
                    type:'template',
                    template:'option'

                },
            ]

        }
    },
    created(){
        this.getCategoriesList()
    },
    methods:{
        //获取商品分类列表
        async getCategoriesList(){
            const {data,meta} = await reqCategories(this.cate_params)
            if (meta.status !== 200) return this.$message.error(meta.msg)
            this.cate_list = data.result
            this.total = data.total
        },

        //改变每页显示条数
        handleSizeChange(newsize){
            this.cate_params.pagesize = newsize
            this.getCategoriesList()
        },
        //当前页面改变
        handleCurrentChange(newpage){
            this.cate_params.pagenum = newpage
            this.getCategoriesList()
        },

        //点击添加分类
        addCateClick(){
            this.$refs.addCate.getCateList()
            this.$refs.addCate.dialogVisible = true
        },

        //删除分类
        delCateClick(cateInfor){
            this.$confirm('此操作将永久删除该分类, 是否继续?','提示',{
                type:'warning'
            }).then(async () => {
                const {meta} = await reqDelCategories(cateInfor.cat_id) 
                if (meta.status !== 200) return this.$message.error(meta.msg)
                this.$message.success("删除分类成功")
                this.getCategoriesList()
            }).catch(() => {
                this.$message.info("您取消了该操作")
            })
            
        },

        //编辑分类
        editCateClick(currentCatInfo){
            this.currentCate = currentCatInfo
            this.$refs.ediCate.cateForm.cat_name = currentCatInfo.cat_name
            this.$refs.ediCate.dialogVisible = true
        }

    }
}
</script>
<style scoped>
    .zk-table{
        margin: 15px 0 ;
        
    }
</style>