<template>
    <div>
        <!--面包屑导航-->
         <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/users' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>参数列表</el-breadcrumb-item>
        </el-breadcrumb>

        <el-card class="box-card">
            <!--Alert警告-->
             <el-alert
                title="注意：只允许为第三级设置相关参数！"
                type="warning"
                show-icon>
            </el-alert>

            <!--级联选择器-->
            <el-row style="margin:15px 0">
                <el-col>
                    <span>选择商品分类:</span>
                    <el-cascader
                        v-model="selectKeys"
                        :options="cateList"
                        :props="props"
                        style="margin-left:15px"
                        @change="cascaderChange"
                        >
                    </el-cascader>

                </el-col>
            </el-row>

            <!--标签页-->
             <el-tabs v-model="activeName" @tab-click="tabsHandleClick">
                <el-tab-pane label="动态参数" name="many">
                  
                  <!--传递参数-->
                   <params-data
                    :activeName= "activeName"
                    :attrList = "attrList"
                    :selectKeys = "selectKeys"
                    :getCateAttrList = "getCateAttrList"
                   >
                   </params-data>
                </el-tab-pane>
                <el-tab-pane label="静态属性" name="only">
                    <params-data
                        :activeName= "activeName"
                        :selectKeys = "selectKeys"
                        :attrList = "attrList"
                        :getCateAttrList = "getCateAttrList"
                    >
                    </params-data>
                </el-tab-pane>
                
            </el-tabs>

            

        </el-card>
        
    </div>
</template>
<script>
import {reqCategories,reqAttrList} from "network/api"
import ParamsData from './childComp/ParamsData.vue'




export default {
  components: { ParamsData },


    name:'Params',
    data() {
        return {
            cateList:[],
            selectKeys:[],
            props:{
                expandTrigger:'hover',
                label:'cat_name',
                value:'cat_id',
                children:'children',
                
            }, //级联选择器的配置
            activeName:'many',   //默认项
            attrList:[],
        }
    },
    created(){
        this.getCatList()
    },
    methods:{
        //级联表参数
        async getCatList(){
            const {data,meta} = await reqCategories({type:3})
            if (meta.status !== 200) return this.$message.error(meta.msg)
            this.cateList = data
            
        },

        //获取动态参数或者静态属性的参数
        async getCateAttrList(){
            //选中的参数
            const {selectKeys} = this
            const {data,meta} = await reqAttrList(selectKeys[2],this.activeName)
            if (meta.status !== 200) return this.$message.error(meta.msg)

            //遍历对象
            data.forEach(item =>{
                //分割数组
                item.attr_vals = item.attr_vals.length <= 0 ? [] : item.attr_vals.split(" ")
                item.inputVisible = false
                item.inputValue = ""
            })
           
            this.attrList = data
        },

        //级联选择器发生变化
        cascaderChange(){
            //只允许设置第三级的参数
            if (this.selectKeys.length !== 3){
                //将选中的keys赋值为空
                this.selectKeys = []
                //参数也赋值为空
                this.attrList = []
            }
            //获取参数
            this.getCateAttrList()
        },

        //切换tabs触发
        tabsHandleClick(){
            if (this.selectKeys.length !== 3) return
            this.getCateAttrList()
        }


    },
   
}
</script>