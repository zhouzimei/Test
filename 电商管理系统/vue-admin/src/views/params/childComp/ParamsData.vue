<template>
    <div>
        <el-row>
            <el-col>
                <el-button 
                @click="addAttr"
                type="primary" size="mini"  
                :disabled="selectKeys.length !== 3"
                 style="margin:10px 0">
                    {{isMany ? '添加参数' : '添加属性'}}
                  
                </el-button>
            </el-col>
        </el-row>

        <!--表格-->
        <el-table
            :data="attrList"
            style="width: 100%"
            border
            >
            <el-table-column type="expand">
                <template v-slot="data">
                    
                    <el-tag v-for="(item,index) in data.row.attr_vals" closable @close="closeTag(data.row,index)" :key="index">{{item}}</el-tag>
                    <el-input
                            class="input-new-tag"
                            v-if="data.row.inputVisible"
                            v-model="data.row.inputValue"
                            ref="saveTagInput"
                            size="small"
                            @keyup.enter.native="handleInputConfirm(data.row)"
                            @blur="handleInputConfirm(data.row)"
                            style="width: 90px"
                    >
                    </el-input>
                    <el-button ref="btn" v-else class="button-new-tag" size="small" @click="showInput(data.row)">+ New Tag</el-button>
                </template>
                

            
            </el-table-column>
            <el-table-column type="index"></el-table-column>

            <el-table-column
                :label="isMany ? '参数名称' : '属性名称'"
                prop="attr_name">
            </el-table-column>

            <el-table-column label="操作" >
                <template v-slot="data">
                    <el-button size="mini" type="primary" icon="el-icon-edit" @click="editAttrClick(data.row)">编辑</el-button>
                     <el-button size="mini" type="danger" icon="el-icon-edit" @click="delAttrClick(data.row)">删除</el-button>
                </template>
            </el-table-column>     
        </el-table>

        <!--添加或编辑弹出框-->
        <el-dialog
            :title="dialogTitle"
            :visible.sync="dialogVisible"
            width="50%"
            :close-on-click-modal="false"
            @close="handleDialogClose"
            >
            <el-form ref="attrForm" :model="attrForm" :rules="attrRules" label-width="80px" >
                <el-form-item :label="isMany ? '动态参数' : '静态属性'" prop="attr_name">
                    <el-input v-model="attrForm.attr_name"></el-input>

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
import {reqAddCateAttr,reqEditCateAttr,reqDelCateAttr} from 'network/api'
export default {
    name:'ParamsData',
    props:{
        activeName:{
            type:String
        },
        selectKeys:{
            type:Array,
            default(){
                return []
            }
        },
        attrList:{
            type:Array,
            default(){
                return []
            }
        },
        getCateAttrList:{
            type:Function,
            default(){
                return function(){}
            }
        }
        
    },
    data() {
        return {
            dialogVisible:false,
            attrForm:{
                attr_name:''        //输入框绑定
            },
            attrRules:{
                attr_name:[{required: true, message: '请输入分类名称', trigger: 'blur'}]
            },
            currentAttr:{},     //当前属性
            inputValue:'',
           
        }
    },
    methods:{
        //添加属性
        addAttr(){
            this.currentAttr = {}
            this.attrForm.attr_name = ""
            this.dialogVisible = true
        },
        //编辑属性
        editAttrClick(attrInfo){
            this.currentAttr = attrInfo
            this.attrForm.attr_name = attrInfo.attr_name
            this.dialogVisible = true
        },

        //关闭dialog清空输入框
        handleDialogClose(){
            this.$refs.attrForm.resetFields()
        },

        //点击确定添加或确定编辑
        confirmClick(){
            //进行表单验证
            this.$refs.attrForm.validate(async valid => {
                if (!valid) return
                const id = this.selectKeys[2]
                const {attr_name} = this.attrForm
                const attr_sel = this.activeName    //属性的类型many 或 only
                console.log(this.currentAttr.attr_name)
                if (this.currentAttr.attr_name){
                    //发送编辑请求
                    const attrId = this.currentAttr.attr_id
                    const {meta} = await reqEditCateAttr(id,attrId,{attr_name,attr_sel})
                    if (meta.status !== 200) return this.$message.error(meta.msg)
                    this.$message.success(meta.msg)

                }else{
                    //发送添加请求
                    const {meta} = await reqAddCateAttr(id,{attr_name,attr_sel})
                    if (meta.status !== 201) return this.$message.error(meta.msg)
                    this.$message.success(meta.msg)
                }
                this.getCateAttrList()
                this.dialogVisible = false
            })
        },

        //删除属性
        async delAttrClick(rowInfo){
            const {attr_id:attrId} = rowInfo    //选中的参数id
            const id = this.selectKeys[2]   //分类id
            const {meta} = await reqDelCateAttr(id,attrId)
            if (meta.status !== 200) return this.$message.error(meta.msg)
            this.$message.success(meta.msg)
            //刷新数据
            this.getCateAttrList()
        },

        //失去焦点事件
        //键盘回车后触发
      async handleInputConfirm(rowInfo){
        if (rowInfo.inputValue.trim().length <= 0) return
        //发请求
        rowInfo.attr_vals.push(rowInfo.inputValue)
        const id = this.selectKeys[2]
        let {attr_id:attrId,attr_name,attr_sel,attr_vals} = rowInfo
        attr_vals = attr_vals.join(" ")
        const {meta,data} = await reqEditCateAttr(id,attrId,{attr_name,attr_sel,attr_vals})
        if (meta.status !== 200) return this.$message.error(meta.msg)
        this.$message.success(meta.msg)
        rowInfo.inputValue = ""
        rowInfo.inputVisible = false
      },

         showInput(rowInfo){
            rowInfo.inputVisible = true;
            this.$nextTick(_ => {
            this.$refs.saveTagInput.focus()
        })
      },
       
        //删除标签
       async  closeTag(rowInfo,i){
           //删除标签
           rowInfo.attr_vals.splice(i,1)
           //更新信息
           const id = this.selectKeys[2]
            let {attr_id:attrId,attr_name,attr_sel,attr_vals} = rowInfo
            attr_vals = attr_vals.join(" ")
            const {meta,data} = await reqEditCateAttr(id,attrId,{attr_name,attr_sel,attr_vals})
            if (meta.status !== 200) return this.$message.error(meta.msg)
            this.$message.success(meta.msg)
            rowInfo.inputValue = ""
            rowInfo.inputVisible = false
            
        }

    },
    computed:{
        isMany(){
            //true 动态    false 静态
            return this.activeName === 'many'
        },
        dialogTitle(){
            const {attr_name} = this.currentAttr
            return this.isMany ? (attr_name ? '编辑动态参数' : '添加动态属性') : (attr_name ? '编辑静态参数' : '添加静态属性')
        }

    }
}
</script>
<style scoped>
.el-tag{
    margin: 15px;
}
</style>