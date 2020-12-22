<template>
    <div>
        <!--面包屑导航-->
         <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/users' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>权限列表</el-breadcrumb-item>
        </el-breadcrumb>

        <el-card class="box-card">
            <el-row>
                <el-col>
                    <el-button type="primary" @click="addRole">添加角色</el-button>
                </el-col>
            </el-row>

            <el-table
                :data="roleList"
                border
                style="width: 100%">
                <el-table-column type="expand" v-slot="data">
                    <el-row :class="['al_center','bottom_border', index1 === 0 ? 'top_border' : '']"
                    v-for="(item1,index1) in data.row.children" :key="item1.id">
                        <el-col :span="5">
                            <el-tag type="primary" closable @close="closeTagRights(data.row,item1.id)">{{item1.authName}} </el-tag>
                            <i class="el-icon-caret-right"></i>
                        </el-col>
                        <el-col :span="19" >
                            <el-row :class="['al_center',index2 === 0 ? '':'top_border']"
                            v-for="(item2 ,index2) in item1.children" :key="item2.id">
                                <el-col :span="6">
                                    <el-tag type="success" closable @close="closeTagRights(data.row,item2.id)">{{item2.authName}}</el-tag>
                                    <i class="el-icon-caret-right"></i>
                                </el-col>
                                <el-col :span="16">
                                    <el-tag
                                        closable
                                        type="warning"
                                        v-for="item3 in item2.children"
                                        :key="item3.id"
                                        @close="closeTagRights(data.row,item2.id)"
                                    >
                                        {{item3.authName}}

                                    </el-tag>
                                </el-col>
                                
                            </el-row>
                           
                        </el-col>
                    </el-row>

                </el-table-column>
                <el-table-column type="index" label="#"></el-table-column>
                <el-table-column
                label="角色名称"
                prop="roleName">
                </el-table-column>
                <el-table-column
                label="角色描述"
                prop="roleDesc">
                </el-table-column>

                <el-table-column
                label="操作"
                >
                    <template v-slot="data">
                        <el-button type="primary" icon="el-icon-edit" size="mini" @click="eidiClick(data.row)">编辑</el-button>
                        <el-button type="danger" icon="el-icon-delete" size="mini" @click="delRole(data.row)">删除</el-button>
                        <el-button type="warning" icon="el-icon-setting" size="mini" @click="updateRightsClick(data.row)">分配权限</el-button>
                    </template>
                </el-table-column>

            </el-table>
        </el-card>
        <update-rights-dialog ref="rightsDialog" :currentRole="currentRole"></update-rights-dialog>
        
        <add-or-edit-role-dialog ref="addOrEditDialog" :currentRole="currentRole"></add-or-edit-role-dialog>
    </div>
</template>
<script>
import {reqRolesList,reqDelRolesRights,reqDeleRoles} from "network/api"
import UpdateRightsDialog from './childComp/UpdateRightsDialog.vue'
import AddOrEditRoleDialog from './childComp/AddOrEditRoleDialog.vue'

export default {
  components: { UpdateRightsDialog, AddOrEditRoleDialog },
    name:'Roles',
    data(){
        return{
            roleList:[],
            currentRole:{},
            roleId:''
        }
    },
    created(){
        this.getRoleList()
    },
    methods: {
        //获取角色列表
        async getRoleList(){
            const {data,meta} = await reqRolesList()
            if(meta.status !== 200) return this.$message.error(meta.msg)
            this.roleList = data
        },
        //删除权限
        closeTagRights(userInfo,rightId){
            const {id:roleId} = userInfo
            this.$confirm('此操作将永久删除该权限，是否继续？','提示',{
                type:'warning'
            }).then(async () =>{
                const {meta,data} = await reqDelRolesRights(roleId,rightId)
                if(meta.status !== 200) return this.$message.error(meta.msg)
                this.$message.success("删除权限成功")
                userInfo.children = data
            }).catch(()=>{
                this.$message.info("您取消了该操作")
            })
        },

        //点击分配权限
        updateRightsClick(roleInfo){
            this.currentRole = roleInfo
            //获取权限列表数据
            this.getDefaultKeys(roleInfo,this.$refs.rightsDialog.defaultKeys)
            console.log(roleInfo)
            this.$refs.rightsDialog.dialogVisible = true
            //发送请求
            this.$refs.rightsDialog.getRightList()
        },

        //递归调用 获取默认选中keys数组
        getDefaultKeys(node,arr){
            if (!node.children){
                return arr.push(node.id)
            }
            node.children.forEach(item =>{
                this.getDefaultKeys(item,arr)
            })
        },

        //添加角色
        addRole(){
            //清空内容
            this.currentRole = {}
            this.$refs.addOrEditDialog.dialogVisible = true
        },

        //编辑角色
        eidiClick(roleInfo){
         
            this.currentRole = roleInfo
            this.$refs.addOrEditDialog.dialogVisible = true
        },
        //删除角色
        delRole(roleInfor){
            this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(async() => {
          const {meta} = await reqDeleRoles(roleInfor.id)
          if(meta.status !== 200) return this.$message.error(meta.msg)
          this.$message.success(meta.msg)
          //刷新列表
          this.getRoleList()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消删除'
          });          
        });
        },

        

    },
}
</script>
<style scoped>
    .top_border{
        border-top: 1px solid #ddd;
    }
    .bottom_border{
        border-bottom: 1px solid #ddd;
    }
    .el-tag{
        margin: 10px 10px;
    }
    .al_center{
        display: flex;
        align-items: center;
    }
</style>
