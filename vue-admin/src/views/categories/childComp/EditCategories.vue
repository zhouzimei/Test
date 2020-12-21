<template>
    <div>
       <el-dialog
            title="编辑分类"
            :visible.sync="dialogVisible"
            :close-on-click-modal="false"
            width="50%"
            >
                <el-form :model="cateForm" label-width="80px" :rules="cateRules" ref="cateForm">
                <el-form-item label="分类名称"  prop="cat_name" >
                    <el-input v-model="cateForm.cat_name"></el-input>
                </el-form-item>
            </el-form>
          
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="confimClick">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import {reqEditCategories} from "network/api"
export default {
    name:'EditCategories',
    props:{
        currentCate:{
            type:Object
        },
        getCategoriesList:{
           type:Function,
            default(){
                return function(){}
            }
        }
    },
    data() {
        return {
            dialogVisible:false,
            cateForm:{
                cat_name:'',
                
            },
            cateRules:{
                cat_name:[
                    { required: true, message: '请输入分类名称', trigger: 'blur' },
                ],
            },
           

        }
    },
    created(){
        
        
    },
    methods:{
        //发送编辑请求
     async   confimClick(){
         const {meta} = await reqEditCategories(this.currentCate.cat_id,this.cateForm)
         if (meta.status !== 200) return this.$message.error(meta.msg)
         this.$message.success(meta.msg)  
         this.dialogVisible = false
         this.getCategoriesList()
        },
       

    }
}
</script>