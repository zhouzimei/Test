<template>
    <div>
         <!--面包屑导航-->
         <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/users' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>商品列表</el-breadcrumb-item>
        </el-breadcrumb> 

        

        <el-card class="box-card">
            <el-row >
             <!--搜索框-->
            <el-col :span="10">
                <el-input placeholder="请输入内容"  clearable @clear="clearSearchKey" v-model="goodsParams.query" 
                class="input-with-select">
                    <el-button slot="append" icon="el-icon-search"  @click="searchClick"></el-button>
                </el-input>
            </el-col>
            <!--添加按钮-->
            <el-col :span="4" >
                <el-button type="primary" @click="addGoodsClick">添加商品</el-button>
            </el-col>
        </el-row>

            <el-table
                :data="goodsList" border  stripe style="width: 100%">

                <el-table-column  type="index"> </el-table-column>
                <el-table-column prop="goods_name" label="商品名称" > </el-table-column>
                <el-table-column prop="goods_price" label="商品价格(元)" width="100px"> </el-table-column>
                <el-table-column prop="goods_weight" label="商品重量(kg)" width="100px"> </el-table-column>
                <el-table-column prop="add_time" label="创建时间" width="150px"> 
                    <template v-slot="data">
                        <!--过滤器-->
                        {{data.row.add_time | dateFormat}}
                    </template>

                </el-table-column>
                <el-table-column  label="操作" width="140">
                    <template v-slot="data">
                        <!--修改-->
                        <el-button type="primary" icon="el-icon-edit" size="mini" @click="editUserClick(data.row)"></el-button>
                        <!--删除-->
                        <el-button type="danger" size="mini" icon="el-icon-delete" @click="delUser(data.row)" ></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!--分页-->
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="goodsParams.pagenum"
                :page-sizes="[5, 10, 15, 20]"
                :page-size="goodsParams.pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>

        </el-card>
    </div>
</template>
<script>
import {reqGoodsList,reqDelGoods} from "network/api"
export default {
    name:'Goods',
    data() {
        return {
            goodsList:[],
            goodsParams:{
                query:'',
                pagenum:1,
                pagesize:5
            }, //发请求的参数
            total:0

            
        }
    },
    created(){
        this.getGoodsList()
    },
    methods:{
        //获取商品列表
        async getGoodsList (){
            const {data,meta} = await reqGoodsList(this.goodsParams)
            if (meta.status !== 200) return this.$message.error(meta.msg)
            this.goodsList = data.goods
            this.total = data.total

        },

        //每页条数大小发生变化
        handleSizeChange(newSize){
            this.goodsParams.pagesize = newSize
            this.getGoodsList()

        },

        //页数发生变化
        handleCurrentChange(newPage){
            this.goodsParams.pagenum = newPage
            this.getGoodsList()

        },

        //搜索
       searchClick(){
            this.getGoodsList()
            this.$message.success("获取成功")
        },
        
        //清除搜索框内容
        clearSearchKey(){
            this.getGoodsList()

        },

        //添加商品(路由跳转页面)
        addGoodsClick(){
            this.$router.push("/goods/add")

        },

        //删除商品
        delUser(goodsInfo){
           
            this.$confirm("此操作将永久删除该用户, 是否继续?",'提示',{
                type: 'warning'
                }).then(async () => {
                const {meta} = await reqDelGoods(goodsInfo.goods_id)
                if (meta.status !== 200) return this.$message.error(meta.msg)
                this.$message.success(meta.msg)
                this.getGoodsList()
               
                }).catch(() => {
                this.$message.info("取消删除")
                
            })
        }
    }

}
</script>
<style scoped>
.el-col{
    margin: 10px;
}
</style>