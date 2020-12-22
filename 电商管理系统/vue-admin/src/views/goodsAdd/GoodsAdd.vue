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
            <el-form :model="addGoodsForm" label-position="top" :rules="addGoodsRules">
                <el-tabs tab-position="left" v-model="activeIndex" :before-leave="tabClick">
                    <!--表单验证-->
                    <el-tab-pane label="基本信息" name="0">
                        <el-form-item prop="goods_name" label="商品名称" >
                            <el-input v-model="addGoodsForm.goods_name" ></el-input>
                        </el-form-item>
                        <el-form-item prop="goods_price" label="商品价格" >
                            <el-input v-model="addGoodsForm.goods_price" type="number" min="0"></el-input>
                        </el-form-item>
                        <el-form-item prop="goods_weight" label="商品重量" >
                            <el-input v-model="addGoodsForm.goods_weight" type="number" min="0"></el-input>
                        </el-form-item>
                        <el-form-item prop="goods_number" label="商品数量" >
                            <el-input v-model="addGoodsForm.goods_number" type="number" min="0"></el-input>
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

                    <el-tab-pane label="商品参数" name="1">
                        <el-form-item v-for="item in manyList" :key="item.attr_id" :label="item.attr_name">
                            <el-checkbox-group v-model="item.attr_vals">
                                <!--复选框-->
                                <el-checkbox :label="citem" v-for="(citem,index) in item.attr_vals" :key="index" border></el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                    </el-tab-pane>
                    <el-tab-pane label="商品属性" name="2">
                        <el-form-item v-for="item in onlyList" :key="item.attr_id" :label="item.attr_name">
                            <el-input v-model="item.attr_vals"></el-input>
                        </el-form-item>
                    </el-tab-pane>

                    <!--图片传-->
                    <el-tab-pane label="商品图片" name="3">
                        <el-upload
                            class="upload-demo"
                            action="http://127.0.0.1:8888/api/private/v1/upload"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :on-success ="uploadSuccess"
                            :headers="uploadHeader"
                            list-type="picture">
                            <el-button size="small" type="primary">点击上传</el-button>
                        </el-upload>
                    </el-tab-pane>
                    <el-tab-pane label="商品内容" name="4">
                        <!--富文本编辑器-->
                        <quill-editor/>
                        <el-button  type="primary" class="addBtn" @click="addGoods">添加商品</el-button>
                    </el-tab-pane>
                </el-tabs>

            </el-form>
        </el-card>

        <!--图片预览的dialog-->
        <el-dialog
            title="图片预览"
            :visible.sync="dialogVisible"
            width="30%"
            >
            <img :src="previewUrl" style="width:100%"/>
            
        
        </el-dialog>
    </div>
</template>
<script>
import {reqCategories,reqAttrList,reqAddGoods} from "network/api"
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
                pics:[],     //上传的图片临时路径
                attrs:[],    //参数列表
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
               children:'children',
               
            },      //级联选择器配置
            manyList:[],    //动态参数
            onlyList:[],    //静态属性
            uploadHeader:{
                Authorization: sessionStorage.getItem("token")
            },
            dialogVisible:false,
            previewUrl:''

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
        },

        //切换标签
        tabClick(activeName,oldActiveName){
            //在第一个tab，并且级联选择器没有选中第三级
            if (oldActiveName === '0' && this.addGoodsForm.goods_cat.length !== 3){
                this.$message.error("请选择商品分类")
                return false
            }
            if (activeName === "1"){
                this.getManyList()
            }
            else if (activeName === "2"){
                this.getOnlyList()
            }
            
        },

        //获取动态参数
        async getManyList(){
            const {data,meta} = await reqAttrList(this.addGoodsForm.goods_cat[2],"many")
            if (meta.status !== 200 ) return this.$message.error(meta.msg)
            //遍历数组，字符串用空格分割成字符串数组
            data.forEach(item => {
                item.attr_vals = item.attr_vals.length <= 0 ? [] : item.attr_vals.split(" ")  
            })
            this.manyList = data
        },

        //获取静态参数
        async getOnlyList(){
            const {meta,data} = await reqAttrList(this.addGoodsForm.goods_cat[2],"only")
            if (meta.status !== 200) return this.$message.error(meta.msg)
            this.onlyList = data
        },

        //图片上传成功
        uploadSuccess(response){
            const {data,meta}  = response
            if (meta.status !== 200) return this.$message.error(meta.msg)
            this.$message.success("图片上传成功")
            //以对象的形式存入
            this.addGoodsForm.pics.push({pics:data.tmp_path})
            
        },

        //图片预览
        handlePreview(file){
            this.previewUrl = file.response.data.url
            this.dialogVisible = true
        },

        //图片删除
        handleRemove(file){
            const index = this.addGoodsForm.pics.findIndex( item => item.pics === file.response.data.tmp_path )
            this.addGoodsForm.pics.splice(index,1)
            console.log(this.addGoodsForm)

        },

        //添加商品
        async addGoods(){
            const {addGoodsForm} = this
            addGoodsForm.goods_cat = addGoodsForm.goods_cat.join(",")       //将数组以逗号分割
            this.manyList.forEach(item => {
                addGoodsForm.attrs.push({attr_id:item.attr_id, attr_value:item.attr_vals.join(" ")})

            })
            this.onlyList.forEach(item => {
                addGoodsForm.attrs.push({attr_id:item.attr_id, attr_value:item.attr_vals})
            })

            const {meta} = await reqAddGoods(addGoodsForm)
            if (meta.status !== 201 ) return this.$message.error(meta.msg)
            this.$message.success(meta.msg)
            this.$router.push("/goods")
            console.log(addGoodsForm)
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

     .el-checkbox {
        margin: 0 20px 0 0 !important;
    }

    .addGoods >>> .ql-editor{
        min-height: 300px !important;
    }

    .addBtn{
        margin-top: 15px;
    }



   

</style>