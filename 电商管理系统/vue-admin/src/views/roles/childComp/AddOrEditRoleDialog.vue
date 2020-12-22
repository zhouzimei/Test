<template>
    <div>
        <el-dialog
            :title="isEdit ? '编辑角色' : '添加角色'"
            :visible.sync="dialogVisible"
            width="50%"
            @close="closeDialog"

        >
            <el-form :model="roleForm" label-width="80px" :rules="roleRules" ref="roleForm">
                <el-form-item label="角色名称"  prop="roleName" >
                    <el-input v-model="roleForm.roleName"></el-input>
                </el-form-item>
                <el-form-item label="角色描述"  prop="roleDesc" >
                    <el-input v-model="roleForm.roleDesc"></el-input>
                </el-form-item>
            </el-form>

  
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="comfirmClick">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>
<script>
import {reqAddRole,reqEditRole} from "network/api"
export default {
    name:'AddOrEditRoleDialog',
    props:["currentRole"],
    data(){
        return{
            dialogVisible:false,
            roleForm:{
                roleName:'',
                roleDesc:''
            },
            roleRules:{
                roleName:[
                    { required: true, message: '请输入角色名称', trigger: 'blur' },
                ],
                roleDesc:[
                     { required: true, message: '请输入角色描述', trigger: 'blur' },
                ]
            }
        }
    },
    methods:{
        //验证表单
        comfirmClick(){
            this.$refs.roleForm.validate(async (valid) => {
                if(!valid) return
                //发编辑请求
                if(this.isEdit){
                    console.log(this.currentRole.id)
                    const {meta} = await reqEditRole(this.currentRole.id,this.roleForm)
                    if(meta.status !== 200) return this.$message.error(meta.msg)
                    this.$message.success('修改成功')
                }else{
                    //发送添加角色请求
                    const {meta} = await reqAddRole(this.roleForm)
                    if (meta.status !== 201) return this.$message.error(meta.msg)
                    this.$message.success(meta.msg)

                }
                this.dialogVisible = false
                //刷新列表
                this.$parent.getRoleList()
                
            })
        },

        //关闭清空
        closeDialog(){
            this.$refs.roleForm.resetFields()
            if (!this.isEdit) return
            //重新给编辑的dialog赋值
            this.roleForm.roleName = this.currentRole.roleName
            this.roleForm.roleDesc = this.currentRole.roleDesc
        }

    },
    computed:{
        isEdit(){
            return !!this.currentRole.id || !! this.currentRole.roleName
        }
    },
    watch:{
        currentRole(newRoleInfo){
            this.roleForm.roleName = newRoleInfo.roleName
            this.roleForm.roleDesc = newRoleInfo.roleDesc
        }
    }
}
</script>