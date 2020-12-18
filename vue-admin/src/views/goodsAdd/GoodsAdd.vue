<template>
    <div class="addGoods">
      <!--面包屑导航-->
         <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/users' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>添加商品</el-breadcrumb-item>
        </el-breadcrumb> 

        <el-card class="box-card">
             <el-alert title="添加商品信息" type="info" center show-icon :closable="false"></el-alert>
             <!--步骤条-->
             <el-steps :space="200" :active="+activeIndex" finish-status="success" align-center> 
                <el-step title="基本信息"></el-step>
                <el-step title="商品参数"></el-step>
                <el-step title="商品属性"></el-step>
                 <el-step title="商品图片"></el-step>
                  <el-step title="商品内容"></el-step>
                  <el-step title="完成"></el-step>
            </el-steps>

            <!--标签页-->
            <el-form :v-model="addGoodsForm" label-position="top" :rules="addGoodsRules">
                <el-tabs tab-position="left" v-model="activeIndex" >

                <el-tab-pane label="基本信息">
                    <el-form-item prop="goods_name" label="商品名称" >
                        <el-input v-model="addGoodsForm.goods_name" ></el-input>
                    </el-form-item>
                    <el-form-item prop="goods_price" label="商品价格" >
                        <el-input v-model="addGoodsForm.goods_price"></el-input>
                    </el-form-item>
                    <el-form-item prop="goods_weight" label="商品重量" >
                        <el-input v-model="addGoodsForm.goods_weight" ></el-input>
                    </el-form-item>
                    <el-form-item prop="goods_number" label="商品数量" >
                        <el-input v-model="addGoodsForm.goods_number"></el-input>
                    </el-form-item>
                    <el-form-item prop="goods_cat" label="商品分类" >
                        <!--级联选择器-->
                        <el-cascader
                            v-model="addGoodsForm.goods_cat"
                            :options="cateList"
                            :props="cascProps"
                            @change="handleChange">
                        </el-cascader>
                    </el-form-item>
                </el-tab-pane>

                <el-tab-pane label="商品参数">配置管理</el-tab-pane>
                <el-tab-pane label="商品属性">角色管理</el-tab-pane>
                <el-tab-pane label="商品图片">定时任务补偿</el-tab-pane>
                <el-tab-pane label="商品内容">定时任务补偿</el-tab-pane>
            </el-tabs>

            </el-form>

            

        </el-card>
    </div>
</template>
<script>
import {reqCategories} from "network/api"
export default {
    name:'GoodsAdd',
    data() {
        return {
            activeIndex:'0',
            addGoodsForm:{
                goods_name:'',      //商品名称
                goods_cat:[],       //商品分类
                goods_price:0,     //商品价格
                goods_number:0,
                goods_weight:0,
            },      //发请求的参数
            addGoodsRules:{
                goods_name:[{required: true, message: '请输入商品名称', trigger: 'blur'}],
                goods_price:[{required: true, message: '请输入商品价格', trigger: 'blur'}],
                goods_weight:[{required: true, message: '请输入商品重量', trigger: 'blur'}],
                goods_number:[{required: true, message: '请输入商品数量', trigger: 'blur'}],
                goods_cat:[{required: true, message: '请选择商品分类', trigger: 'blur'}],

            },
            cateList:[],    //商品分类列表
            cascProps:{
               expandTrigger: 'hover',
               label:'cat_name',
               value:'cat_id',
               children:'children'
            },      //级联选择器配置


        }
    },
    created(){
        this.getCateList()
    },
    methods:{
        //获取商品分类列表
        async getCateList(){
            const {data,meta} = await reqCategories()
            if (meta.status !== 200) return this.$message.error(meta.msg)
            this.cateList = data
        },

        //级联选择器发生变化
        handleChange(){
            //只能选择第三级
            
            if (this.addGoodsForm.goods_cat.length !== 3) return this.addGoodsForm.goods_cat = []
        }
    }
}
</script>
<style scoped>
    /*vue 深度选择器 只用于css */
    .addGoods >>> .el-steps{
        margin: 15px 0;
       
    }
    .addGoods >>> .el-step__title {
        font-size: 13px !important;
    }

   

</style>