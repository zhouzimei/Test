<template>
  <div>
      <el-dialog
        title="分配角色"
        :visible.sync="dialogVisible"
        width="50%"
        :close-on-click-model="false"
        
    >
        <!--表单-->
        <el-row>
            <el-col>
                当前用户是：{{currentUser.username}}
            </el-col>
        </el-row>
        <br>
         <el-row>
            <el-col>
                当前角色是：{{currentUser.role_name}}
            </el-col>
        </el-row>
        <br>
         <el-row>
            <el-col>
                分配新角色：
                <el-select v-model="seteleValue" placeholder="请选择">
                    <el-option
                    v-for="item in  rolesList"
                    :key="item.id"
                    :label="item.roleName"
                    :value="item.id">
                    </el-option>
                </el-select>
            </el-col>
        </el-row>

  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="confirmClick">确 定</el-button>
  </span>
</el-dialog>
  </div>
</template>
<script>
import {reqRolesList,reqUpdateRole} from "network/api"
export default {
    name:'RolesDialog',
    props:["currentUser"],
    data() {
        return {
            dialogVisible:false,
            rolesList:[],
            seteleValue:''
        }
    },
    created(){
        this.getRoles()
    },
    methods:{
        //获取角色列表
        async getRoles(){
            const {meta,data} = await reqRolesList()
            if(meta.status !== 200) return this.$message.error(meta.msg)
            this.rolesList = data
            
        },

        //更新角色信息
        async confirmClick(){
            if (this.seteleValue === "") return this.$message.error("请选择角色")
            const {seteleValue:rid} = this
            const {id} = this.currentUser
            const {meta} = await reqUpdateRole(id,rid)
            if (meta.status !== 200) return this.$message.error(meta.msg)
            this.$message.success(meta.msg)
            this.dialogVisible = false
            //刷新列表
            this.$parent.getUsersList()
        }
    }
}
</script>