<template>
    <div>
        <el-dialog
            title="添加分类"
            :visible.sync="dialogVisible"
            width="50%"
            :close-on-click-modal="false"
            @close="closeDialog"
        >
           <el-form :model="cateForm" label-width="80px" :rules="cateRules" ref="cateForm">
                <el-form-item label="分类名称"  prop="cat_name" >
                    <el-input v-model="cateForm.cat_name"></el-input>
                </el-form-item>

                <el-form-item label="父级分类" >
                    <el-cascader
                        v-model="selectKeys"
                        :options="cateList"
                        :props="props"
                        @change="handleChange"
                        >
                    </el-cascader>
                </el-form-item>

                
            </el-form>
           
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirmClick">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import {reqCategories,reqAddCategories} from "network/api"
export default {
    name:'AddCategories',
    data() {
        return {
            dialogVisible:false,
            cateForm:{
                cat_name:'',
                cat_level:0,       //分类当前层级
                cat_pid:0          //分类父 ID
            },
            cateRules:{
                cat_name:[
                    { required: true, message: '请输入分类名称', trigger: 'blur' },
                ],
            },
            cateList:[], //级联选择器的分类列表
            selectKeys:[],
            props:{
                expandTrigger:'hover',
                label:'cat_name',
                value:'cat_id',
                children:'children',
                checkStrictly:true
            } //级联选择器的配置
        }
    },
    methods:{
        //获取分类列表
         async getCateList(){
             const {meta,data} = await reqCategories({type:2})
             if (meta.status !== 200) return this.$message.error(meta.msg)
             this.cateList = data
             
         },

        //级联选择器发生变化
         handleChange(){
             this.cateForm.cat_pid = this.selectKeys[this.selectKeys.length - 1]       //分类父ID
             this.cateForm.cat_leve = this.selectKeys.length               //分类当前层级
            
         },

         //取消对话框
         closeDialog(){
             //清空级联选择器选项
             this.selectKeys = []
             //清空表单内容
             this.$refs.cateForm.resetFields()
         },

         //点击确定 发送添加请求
            confirmClick(){
                this.$refs.cateForm.validate(async valid => {
                    if (!valid) return
                    //发请求
                    const {data,meta} = await reqAddCategories(this.cateForm)    // eslint-disable-line no-unused-vars
                    if (meta.status !== 201) return this.$message.error(meta.msg)
                    this.$message.success(meta.msg)
                    this.$parent.getCategoriesList()
                    this.dialogVisible = false
                })

         
         }



    }
}
</script>